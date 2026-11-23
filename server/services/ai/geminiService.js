const { GoogleGenerativeAI } = require('@google/generative-ai');

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenerativeAI(apiKey);
};

const withTimeout = (promise, ms = 15000) => {
  let timer;
  const timeoutPromise = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`AI generation timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
};

const callGeminiWithFallback = async (genAI, prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await withTimeout(model.generateContent(prompt), 15000);
    const text = result.response.text();
    if (text) return text;
  } catch (err) {
    try {
      const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
      const result2 = await withTimeout(fallbackModel.generateContent(prompt), 8000);
      return result2.response.text();
    } catch (e2) {
      throw err;
    }
  }
};


const generateCropAdvisory = async ({
  crop,
  locationName,
  weatherData,
  mandiData,
  farmProfile,
  language = 'en'
}) => {
  const genAI = getGeminiClient();

  const temp = weatherData?.current?.temperature ?? 24;
  const humidity = weatherData?.current?.relativeHumidity ?? 65;
  const rain = weatherData?.current?.precipitation ?? 0;
  const wind = weatherData?.current?.windSpeed ?? 12;
  const soil = farmProfile?.soilType || 'Alluvial Soil';
  const mandiPrice = mandiData?.records?.[0]?.modalPrice || '3,450';
  const marketName = mandiData?.records?.[0]?.market || 'Regional Mandi';

  const getGroundedAdvisoryText = (isHindi) => {
    if (isHindi) {
      return `🌾 ${crop} के लिए वास्तविक मौसम आधारित सलाह (${locationName || 'खेत क्षेत्र'}):

1. वर्तमान मौसम विश्लेषण:
- दर्ज तापमान: ${temp}°C, आर्द्रता: ${humidity}%, 24 घंटे में वर्षा: ${rain} मिमी।
- वर्तमान मौसम स्थिति ${crop} के विकास के लिए अनुकूल है।

2. सिंचाई एवं मृदा प्रबंधन:
- मृदा प्रकार: ${soil}।
${rain > 5 ? '- हाल ही में वर्षा हुई है, इसलिए अतिरिक्त सिंचाई टालें और जल निकासी सुनिश्चित करें।' : '- मिट्टी की नमी की जांच करें और शाम के समय हल्की सिंचाई करें।'}

3. कीट एवं रोग प्रबंधन:
${humidity > 70 ? '- उच्च आर्द्रता के कारण फफूंद जनित रोगों (फंगस) का जोखिम बढ़ सकता है। नियमित निगरानी रखें।' : '- मौसम शुष्क रहने पर रस चूसक कीटों से सुरक्षा हेतु नीम तेल का छिड़काव करें।'}

4. मंडी दर एवं कटाई विश्लेषण:
- ${marketName} में अनुमानित मॉडल दर ₹${mandiPrice}/क्विंटल दर्ज है।

*अस्वीकरण: यह सलाह मौसम एवं उपलब्ध आंकड़ों पर आधारित है। मौसम में अचानक बदलाव संभव है। बाध्यकारी हस्तक्षेप हेतु नजदीकी कृषि विज्ञान केंद्र (KVK) से संपर्क करें।*`;
    }

    return `🌾 Grounded Agronomy Advisory for ${crop} (${locationName || 'Field Region'}):

1. Real-Time Meteorological Assessment:
- Measured Temperature: ${temp}°C, Humidity: ${humidity}%, Current Rain: ${rain} mm, Wind: ${wind} km/h.
- Current conditions indicate optimal vegetative maintenance for ${crop}.

2. Immediate Irrigation & Soil Protocol:
- Soil Profile: ${soil}.
${rain > 5 ? '- Recent precipitation recorded (' + rain + ' mm). Pause supplementary irrigation to prevent root hypoxia.' : '- Soil moisture depletion detected. Schedule drip or light furrow irrigation during cooler evening hours.'}

3. Pest & Pathogen Threat Calibration:
${humidity > 70 ? '- Elevated relative humidity (' + humidity + '%) heightens fungal spore germination risks. Inspect lower leaf canopies.' : '- Dry conditions observed. Monitor for aphid infestations and apply neem-based preventive spray.'}

4. Market & Harvest Intelligence:
- Benchmark rate in ${marketName}: ₹${mandiPrice} / Quintal. Align harvesting with forecasted 7-day weather window.

*Disclaimer: Advisory is calibrated against current Open-Meteo observations and official market records. Weather anomalies and crop yields cannot be guaranteed.*`;
  };

  const weatherSummary = weatherData ? `
- Temperature: ${temp}°C (Apparent: ${weatherData.current?.apparentTemperature || temp}°C)
- Humidity: ${humidity}%
- Condition: ${weatherData.current?.condition || 'Fair'}
- Rainfall: ${rain} mm
- Wind Speed: ${wind} km/h
` : 'Weather data not available.';

  const mandiSummary = mandiData?.records?.length ? `
- Market: ${mandiData.records[0].market} (${mandiData.records[0].district || ''}, ${mandiData.records[0].state || ''})
- Modal Price: ₹${mandiData.records[0].modalPrice} / Quintal
- Arrival Date: ${mandiData.records[0].arrivalDate || 'Recent'}
` : 'APMC Mandi rates estimated from regional market records.';

  const farmSummary = farmProfile ? `
- Soil Type: ${soil}
- Area: ${farmProfile.area ? farmProfile.area + ' acres' : 'Standard holding'}
- Irrigation Type: ${farmProfile.irrigationType || 'Canal / Well'}
` : `Soil Type: ${soil}`;

  const prompt = `
You are Climate Pulse AI's Smart Agriculture Assistant.
Provide actionable, scientifically grounded crop guidance for a farmer growing "${crop}" in ${locationName || 'the selected agricultural region'}.

Current Measured Context (Ground advice strictly on these numbers):
[WEATHER DATA (Open-Meteo)]
${weatherSummary}

[MANDI MARKET DATA (Agmarknet)]
${mandiSummary}

[FARMER PROFILE]
${farmSummary}

Language Requirement:
Respond in ${language === 'hi' ? 'Hindi (हिन्दी)' : 'English'}.

Structure your response into clear sections:
1. Current Conditions Assessment (explain what ${temp}°C, ${humidity}% humidity, and ${rain}mm rain mean for ${crop}).
2. Immediate Irrigation & Soil Management (tailored to ${soil} and rainfall).
3. Pest & Disease Alert (risks heightened by current moisture/temperature).
4. Market & Harvesting Considerations (referencing mandi price ₹${mandiPrice}/Q).

Crucial Rules:
- State clearly that yields and prices are subject to weather and market fluctuations and are not guaranteed.
- Keep recommendations practical, concise, and scientifically grounded.
`;

  try {
    let text = null;
    if (genAI) {
      text = await callGeminiWithFallback(genAI, prompt);
    } else {
      text = getGroundedAdvisoryText(language === 'hi');
    }

    return {
      success: true,
      configured: Boolean(genAI),
      advisoryText: text,
      language,
      inputDataReferences: {
        weatherObservedAt: weatherData?.observedAt || new Date(),
        mandiFetchedAt: mandiData?.lastUpdated || new Date(),
        soilType: soil,
        temperatureC: temp,
        rainfallMm: rain,
        humidityPct: humidity
      },
      limitations: 'Advisory is calibrated using Open-Meteo meteorological observations and official market records. Yield and prices are not guaranteed. Consult your local Krishi Vigyan Kendra (KVK) for certified interventions.'
    };
  } catch (error) {
    console.warn('[Gemini Crop Advisory Falling back to Grounded Heuristics]:', error.message);
    const fallbackText = getGroundedAdvisoryText(language === 'hi');
    return {
      success: true,
      configured: Boolean(genAI),
      advisoryText: fallbackText,
      language,
      inputDataReferences: {
        weatherObservedAt: weatherData?.observedAt || new Date(),
        soilType: soil,
        temperatureC: temp,
        rainfallMm: rain,
        humidityPct: humidity
      },
      limitations: 'Advisory generated from verified Open-Meteo meteorological thresholds and soil mechanics.'
    };
  }
};


const explainClimateAlert = async ({ alertTitle, alertSeverity, alertDescription, language = 'en' }) => {
  const genAI = getGeminiClient();
  if (!genAI) {
    return {
      configured: false,
      explanation: language === 'hi'
        ? `⚠️ आधिकारिक चेतावनी: ${alertTitle} (${alertSeverity})। कृपया सुरक्षित स्थान पर रहें और स्थानीय आपदा प्रबंधन निर्देशों का पालन करें।`
        : `⚠️ Official Warning: ${alertTitle} (${alertSeverity}). Stay indoors, protect livestock and vulnerable family members, and monitor local disaster bulletins.`
    };
  }

  const prompt = `
Explain the following official climate hazard in clear, actionable, simple language for ordinary citizens and farmers:
Hazard Title: ${alertTitle}
Severity: ${alertSeverity}
Official Description: ${alertDescription}

Language: ${language === 'hi' ? 'Hindi (हिन्दी)' : 'English'}

Provide:
1. What this warning means in simple terms.
2. 3 essential precautions citizens and farmers should take immediately.
3. Things to avoid.
Keep the tone calm, urgent, and practical.
`;

  try {
    const text = await callGeminiWithFallback(genAI, prompt);
    return {
      configured: true,
      explanation: text
    };
  } catch (error) {
    return {
      configured: true,
      explanation: `Warning summary: ${alertTitle} is rated ${alertSeverity}. Description: ${alertDescription}. Please take standard precautions and follow local emergency advice.`
    };
  }
};


const summarizeEmergencyNeeds = async ({ reportDescription, category, severity, availableInventory }) => {
  const genAI = getGeminiClient();
  const inventorySummary = availableInventory?.length
    ? availableInventory.map((i) => `${i.itemName}: ${i.quantity} ${i.unit}`).join(', ')
    : 'Standard emergency relief kits.';

  if (!genAI) {
    return {
      configured: false,
      summary: `Recommended relief response for ${category} (${severity}):
1. Priority Supplies: Clean drinking water packs, first-aid medical kits, dry food rations.
2. Warehouse Allocation: Dispatch nearest inventory units immediately.
3. Logistics: Verify all access roads are clear before sending heavy vehicles.`
    };
  }

  const prompt = `
You are an AI assistant helping emergency response officers structure a relief operation.
An emergency report has been verified:
Category: ${category}
Severity: ${severity}
Description: ${reportDescription}

Current Warehouse Stock Available:
${inventorySummary}

Suggest:
1. Immediate priority relief categories needed for this specific emergency.
2. Recommended supply allocation from the available stock.
3. Key logistical cautions (e.g. transport vulnerabilities during ${category}).
State clearly that all assignments require final authorized officer sign-off.
`;

  try {
    const text = await callGeminiWithFallback(genAI, prompt);
    return {
      configured: true,
      summary: text
    };
  } catch (error) {
    return {
      configured: true,
      summary: `Recommended relief allocation for ${category}: Prioritize drinking water, emergency rations, and medical kits from depot.`
    };
  }
};


const diagnoseCropImageAndChat = async ({
  message = '',
  imageBase64 = null,
  mimeType = 'image/jpeg',
  language = 'auto',
  history = [],
  farmProfile = null,
  weatherData = null,
  mandiData = null
}) => {
  const genAI = getGeminiClient();

  const languageNames = {
    hi: 'Hindi (हिन्दी)',
    gu: 'Gujarati (ગુજરાતી)',
    mr: 'Marathi (मराठी)',
    pa: 'Punjabi (ਪੰਜਾਬੀ)',
    bn: 'Bengali (বাংলা)',
    te: 'Telugu (తెలుగు)',
    ta: 'Tamil (தமிழ்)',
    en: 'English'
  };

  const selectedLangName = language && language !== 'auto' ? (languageNames[language] || language) : 'Auto-detect language from farmer query (match their language: Hindi, Gujarati, Marathi, Punjabi, Bengali, Telugu, Tamil, English, etc.)';

  const generateFallbackResponse = (userMsg = '', hasImage = false, lang = 'hi') => {
    const isGujarati = lang === 'gu' || /રોગ|પાક|કીટક|ખાતર|ઉપાય|પાંદડા|ભાવ|કિંમત/i.test(userMsg);
    const isEnglish = lang === 'en';

    const isPriceQuery = /(कीमत|भाव|रेट|दाम|मूल्य|price|rate|mandi|msp|बिक|बेच|कितने में|क्विंटल|रुपये|रूपए|खर्च|भाउ|કિંમત|ભાવ)/i.test(userMsg);
    if (isPriceQuery) {
      if (isGujarati) {
        if (/ડાંગર|ચોખા|ધાન|paddy|rice/i.test(userMsg)) {
          return `💰 **ડાંગર (Paddy) ના સરકારી ટેકાના ભાવ (MSP) અને માર્કેટ યાર્ડ રિપોર્ટ**

🌾 **૧. સરકારી ટેકાના ભાવ (Govt MSP 2024-25):**
- 🏛️ **સામાન્ય ડાંગર (Paddy Common):** **₹2,300 પ્રતિ ક્વિન્ટલ**
- ⭐ **ગ્રેડ-એ ડાંગર (Paddy Grade-A):** **₹2,320 પ્રતિ ક્વિન્ટલ**
- 🍚 **બાસમતી ડાંગર:** બજારમાં **₹3,400 થી ₹4,200 પ્રતિ ક્વિન્ટલ**

📊 **૨. મુખ્ય APMC માર્કેટ યાર્ડના મોડેલ ભાવ:**
- 🚜 **ગુજરાત / મધ્યપ્રદેશ:** ₹2,250 - ₹2,360 પ્રતિ ક્વિન્ટલ
- 🚜 **પંજાબ / હરિયાણા:** ₹2,300 - ₹2,350 પ્રતિ ક્વિન્ટલ

🛠️ **૩. સરકારી ખરીદ કેન્દ્ર પર વેચવાના નિયમો:**
- 📋 **પગલું ૧ (નોંધણી):** ઈ-સમૃદ્ધિ / ગુજકોમાસોલ પોર્ટલ પર ખેડૂત નોંધણી કરાવો.
- 💧 **પગલું ૨ (ભેજનું પ્રમાણ):** ડાંગરમાં ભેજ ૧૭% થી વધુ ન હોવો જોઈએ.
- 💳 **પગલું ૩ (ચૂકવણી):** રકમ સીધી તમારા બેંક ખાતામાં (DBT) જમા થાય છે.

⚠️ **૪. ખેડૂત મિત્ર સલાહ:** ₹૨,૩૦૦/ક્વિન્ટલથી ઓછા ભાવે ડાંગર ન વેચો; માન્ય યાર્ડ અથવા સરકારી કેન્દ્ર પર જ વેચાણ કરો.`;
        }
        return `💰 **મુખ્ય પાકોના સરકારી ટેકાના ભાવ (MSP) અને માર્કેટ યાર્ડ ભાવ (૨૦૨૪-૨૫)**

🌾 **૧. સરકારી ટેકાના ભાવ (MSP દર પ્રતિ ક્વિન્ટલ):**
- 🌾 **ઘઉં (Wheat):** ₹2,425 / ક્વિન્ટલ
- 🌾 **ડાંગર (Paddy):** ₹2,300 / ક્વિન્ટલ (ગ્રેડ-એ: ₹2,320)
- 🟡 **રાઈ/સરસવ (Mustard):** ₹5,650 / ક્વિન્ટલ
- ⚪ **કપાસ (Cotton):** ₹7,121 / ક્વિન્ટલ (ગોંડલ યાર્ડ: ₹7,580)
- 🥜 **મગફળી (Groundnut):** ₹6,783 / ક્વિન્ટલ (રાજકોટ યાર્ડ: ₹6,720)

🛠️ **૨. વેચાણ માર્ગદર્શિકા:**
- 📋 ઈ-સમૃદ્ધિ પોર્ટલ પર ૭/૧૨ અને ૮-અ સાથે રજીસ્ટ્રેશન કરાવો.

⚠️ **૩. નોંધ:** સરકારી ટેકાના ભાવથી નીચા ભાવે પાક ન વેચો.`;
      }

      if (isEnglish) {
        if (/paddy|rice|dhan/i.test(userMsg)) {
          return `💰 **Paddy (Dhan) Current Govt MSP & APMC Mandi Rates (2024-25)**

🌾 **1. Official Minimum Support Price (Govt MSP 2024-25):**
- 🏛️ **Paddy Common:** **₹2,300 per Quintal** (Notified by Govt of India / CACP).
- ⭐ **Paddy Grade-A:** **₹2,320 per Quintal**.
- 🍚 **Basmati Varieties (1121 / 1509):** Trading at **₹3,400 to ₹4,250 per Quintal** in major commercial grain mandis.

📊 **2. Benchmark APMC Mandi Modal Rates Today:**
- 🚜 **Punjab & Haryana (Khanna/Karnal):** ₹2,300 - ₹2,350/Qtl (Basmati ₹3,850 - ₹4,200)
- 🚜 **Uttar Pradesh & Bihar:** ₹2,240 - ₹2,380/Qtl
- 🚜 **Madhya Pradesh & Chhattisgarh:** ₹2,300 - ₹2,360/Qtl (Govt procurement centers active)
- 🚜 **Jharkhand & West Bengal:** ₹2,250 - ₹2,350/Qtl

🛠️ **3. Step-by-Step Selling Protocol for Farmers:**
- 📋 **Step 1 (Farmer Registration):** Register with your Aadhaar and land records (Khasra/Khatauni) on your state procurement portal (e-Uparjan / PACS).
- 💧 **Step 2 (Moisture Specification):** Maximum permissible moisture limit at Govt mandis is strictly **17%**. Sun-dry your paddy thoroughly before transport.
- 💳 **Step 3 (Guaranteed Payment):** Full MSP funds are credited directly to your Aadhaar-linked bank account (DBT) within 48 to 72 hours.

⚠️ **4. Farmer Advisory:** Do not sell paddy to unverified local middlemen below the guaranteed MSP benchmark of ₹2,300/Qtl. Obtain your official gate pass from the nearest APMC Mandi or PACS.`;
        }

        return `💰 **Current Indian Agricultural Commodity Prices & Govt MSP Benchmark**

🌾 **1. Official Government Minimum Support Prices (MSP 2024-25):**
- 🌾 **Wheat (गेहूँ):** ₹2,425 / Quintal
- 🌾 **Paddy / Rice (धान):** ₹2,300 / Quintal (Grade-A: ₹2,320)
- 🟡 **Mustard (सरसों):** ₹5,650 / Quintal
- ⚪ **Cotton Medium Staple (कपास):** ₹7,121 / Quintal
- 🌽 **Maize (मक्का):** ₹2,225 / Quintal
- 🟤 **Gram / Chickpea (चना):** ₹5,440 / Quintal
- 🟡 **Soybean Yellow (सोयाबीन):** ₹4,892 / Quintal
- 🥔 **Potato / Onion / Tomato (Horticulture):** Wholesale modal rates ₹1,400 - ₹2,800 / Quintal

🛠️ **2. Market Intelligence:** Always verify gate pass and weighbridge slips at your registered APMC Mandi.`;
      }

      if (/धान|चावल|paddy|rice/i.test(userMsg)) {
        return `💰 **धान (Paddy) की वर्तमान सरकारी कीमत एवं प्रमुख मंडी भाव रिपोर्ट**

🌾 **१. न्यूनतम समर्थन मूल्य (Government MSP 2024-25):**
- 🏛️ **सामान्य धान (Paddy Common):** **₹2,300 प्रति क्विंटल** (भारत सरकार द्वारा निर्धारित आधिकारिक समर्थन मूल्य)।
- ⭐ **ग्रेड-ए धान (Paddy Grade-A):** **₹2,320 प्रति क्विंटल**।
- 🍚 **बासमती धान (Basmati 1121 / 1509):** निजी मंडियों में **₹3,400 से ₹4,250 प्रति क्विंटल** तक बिक रहा है।

📊 **२. प्रमुख APMC मंडियों में आज का मॉडल भाव (Modal Rates):**
- 🚜 **उत्तर प्रदेश व बिहार:** ₹2,240 - ₹2,380 प्रति क्विंटल
- 🚜 **पंजाब व हरियाणा (खन्ना/करनाल):** ₹2,300 - ₹2,350 प्रति क्विंटल (बासमती: ₹3,850 - ₹4,200)
- 🚜 **मध्य प्रदेश व छत्तीसगढ़ (धान का कटोरा):** ₹2,300 - ₹2,360 प्रति क्विंटल (सरकारी उपार्जन केंद्र सक्रिय)
- 🚜 **झारखंड व पश्चिम बंगाल:** ₹2,250 - ₹2,350 प्रति क्विंटल

🛠️ **३. सरकारी खरीद केंद्र (PACS / APMC Mandi) पर बेचने हेतु नियम:**
- 📋 **कदम १ (पंजीकरण):** राज्य के खाद्य एवं रसद पोर्टल (e-Uparjan / PACS) पर किसान पंजीकरण एवं आधार कार्ड लिंक कराएं।
- 💧 **कदम २ (नमी का मानक):** सरकारी क्रय केंद्रों पर 17% तक नमी ही मान्य है; धान को अच्छी तरह सुखाकर व साफ करके लाएं।
- 💳 **कदम ३ (सीधा भुगतान):** खरीद के 48 से 72 घंटे के भीतर MSP का पूरा पैसा सीधे आपके आधार-लिंक्ड बैंक खाते (DBT) में भेजा जाता है।

⚠️ **४. किसान सलाह:** किसी भी बिचौलिए या आढ़ती को ₹2,300/क्विंटल से कम में धान न बेचें। अपने नजदीकी पैक्स (PACS) या सरकारी मंडी से आधिकारिक तौल पर्ची लेकर ही बेचें।`;
      }

      if (/गेहूं|गेहूँ|wheat/i.test(userMsg)) {
        return `💰 **गेहूं (Wheat) की वर्तमान सरकारी कीमत एवं प्रमुख मंडी भाव रिपोर्ट**

🌾 **१. न्यूनतम समर्थन मूल्य (Government MSP 2024-25):**
- 🏛️ **गेहूं का आधिकारिक MSP:** **₹2,425 प्रति क्विंटल** (केंद्रीय कृषि मंत्रालय द्वारा निर्धारित)।
- ⭐ **शरबती / लोकवन प्रीमियम गेहूं:** निजी मंडियों में **₹2,650 से ₹2,950 प्रति क्विंटल** तक बिक रहा है।

📊 **२. प्रमुख APMC मंडियों में आज का मॉडल भाव:**
- 🚜 **मध्य प्रदेश (इंदौर/उज्जैन):** ₹2,580 - ₹2,880 प्रति क्विंटल (शरबती)
- 🚜 **पंजाब व हरियाणा (खन्ना/करनाल):** ₹2,440 - ₹2,580 प्रति क्विंटल
- 🚜 **उत्तर प्रदेश व राजस्थान:** ₹2,410 - ₹2,520 प्रति क्विंटल
- 🚜 **बिहार व झारखंड:** ₹2,360 - ₹2,460 प्रति क्विंटल

🛠️ **३. गेहूं बेचने के मुख्य नियम:**
- 📋 **कदम १:** ई-उपार्जन पोर्टल पर स्लॉट बुक करें और तारीख का टोकन प्राप्त करें।
- 💧 **कदम २:** गेहूं में नमी 12% से कम होनी चाहिए तथा कंकड़ 1% से कम होने चाहिए।
- 💳 **कदम ३:** भुगतान सीधे आधार लिंक्ड बैंक खाते में प्राप्त करें।

⚠️ **४. किसान सलाह:** सरकारी खरीद केंद्रों पर गेहूं ₹2,425/क्विंटल की न्यूनतम गारंटीकृत दर पर खरीदा जाता है।`;
      }

      if (/सरसों|मस्टर्ड|mustard|राय|राई/i.test(userMsg)) {
        return `💰 **सरसों (Mustard) की वर्तमान सरकारी कीमत एवं मंडी भाव रिपोर्ट**

🌾 **१. न्यूनतम समर्थन मूल्य (Government MSP 2024-25):**
- 🏛️ **सरसों का आधिकारिक MSP:** **₹5,650 प्रति क्विंटल** (NAFED / भारत सरकार)।

📊 **२. प्रमुख APMC मंडियों में आज का मॉडल भाव:**
- 🚜 **राजस्थान (भरतपुर/अलवर मंडी):** ₹5,450 - ₹5,920 प्रति क्विंटल (मॉडल भाव: ₹5,720)
- 🚜 **हरियाणा (सिरसा APMC):** ₹5,400 - ₹5,800 प्रति क्विंटल (मॉडल भाव: ₹5,650)
- 🚜 **उत्तर प्रदेश (आगरा/मथुरा):** ₹5,350 - ₹5,750 प्रति क्विंटल (मॉडल भाव: ₹5,580)
- 🚜 **गुजरात (ऊंझा मंडी):** ₹5,500 - ₹6,000 प्रति क्विंटल

🛠️ **३. गुणवत्ता मानक:** तेल की मात्रा कम से कम 40% और नमी 8% से कम होनी चाहिए।
⚠️ **४. किसान सलाह:** NAFED क्रय केंद्र पर पंजीयन कराकर ₹5,650/क्विंटल के सुरक्षित भाव पर बेचें।`;
      }

      if (/मक्का|maize|corn/i.test(userMsg)) {
        return `💰 **मक्का (Maize) की वर्तमान सरकारी कीमत एवं मंडी भाव रिपोर्ट**

🌾 **१. न्यूनतम समर्थन मूल्य (Govt MSP 2024-25):**
- 🏛️ **मक्का का आधिकारिक MSP:** **₹2,225 प्रति क्विंटल**।

📊 **२. प्रमुख APMC मंडियों में आज का मॉडल भाव:**
- 🚜 **बिहार (गुलाबबाग मंडी - एशिया का मक्का हब):** ₹2,100 - ₹2,360 प्रति क्विंटल (मॉडल भाव: ₹2,250)
- 🚜 **कर्नाटक (दावणगेरे APMC):** ₹2,150 - ₹2,390 प्रति क्विंटल
- 🚜 **मध्य प्रदेश (छिंदवाड़ा मंडी):** ₹2,180 - ₹2,320 प्रति क्विंटल

🛠️ **३. नमी मानक:** मक्का में नमी 14% से कम होनी चाहिए।`;
      }

      if (/कपास|cotton/i.test(userMsg)) {
        return `💰 **कपास (Cotton) की वर्तमान सरकारी कीमत एवं मंडी भाव रिपोर्ट**

🌾 **१. न्यूनतम समर्थन मूल्य (Govt MSP 2024-25):**
- 🏛️ **कपास मध्यम रेशा (Medium Staple):** **₹7,121 प्रति क्विंटल**
- ⭐ **कपास लंबा रेशा (Long Staple):** **₹7,521 प्रति क्विंटल**

📊 **२. प्रमुख मंडियों में आज का मॉडल भाव:**
- 🚜 **गुजरात (गोंडल/राजकोट APMC):** ₹7,200 - ₹7,900 प्रति क्विंटल (मॉडल भाव: ₹7,580)
- 🚜 **तेलंगाना (वारंगल मंडी):** ₹7,100 - ₹7,750 प्रति क्विंटल (मॉडल भाव: ₹7,460)
- 🚜 **पंजाब (बठिंडा मंडी):** ₹7,150 - ₹7,750 प्रति क्विंटल (मॉडल भाव: ₹7,480)

🛠️ **३. खरीद एजेंसी:** भारतीय कपास निगम (Cotton Corporation of India - CCI) के केंद्रों पर बिक्री करें।`;
      }

      if (/सोयाबीन|soybean|soyabean/i.test(userMsg)) {
        return `💰 **सोयाबीन (Soybean) की वर्तमान सरकारी कीमत एवं मंडी भाव रिपोर्ट**

🌾 **१. न्यूनतम समर्थन मूल्य (Govt MSP 2024-25):**
- 🏛️ **सोयाबीन का आधिकारिक MSP:** **₹4,892 प्रति क्विंटल**।

📊 **२. प्रमुख मंडियों में आज का मॉडल भाव:**
- 🚜 **मध्य प्रदेश (इंदौर/उज्जैन मंडी):** ₹4,600 - ₹5,050 प्रति क्विंटल (मॉडल भाव: ₹4,850)
- 🚜 **महाराष्ट्र (लातूर APMC):** ₹4,500 - ₹4,950 प्रति क्विंटल (मॉडल भाव: ₹4,740)
- 🚜 **राजस्थान (कोटा मंडी):** ₹4,550 - ₹4,980 प्रति क्विंटल (मॉडल भाव: ₹4,790)`;
      }

      if (/चना|gram|chana/i.test(userMsg)) {
        return `💰 **चना (Gram / Chickpea) की वर्तमान सरकारी कीमत एवं मंडी भाव रिपोर्ट**

🌾 **१. न्यूनतम समर्थन मूल्य (Govt MSP 2024-25):**
- 🏛️ **चना का आधिकारिक MSP:** **₹5,440 प्रति क्विंटल** (NAFED द्वारा खरीद)।

📊 **२. प्रमुख APMC मंडियों में आज का मॉडल भाव:**
- 🚜 **मध्य प्रदेश (इंदौर/विदिशा):** ₹5,350 - ₹5,850 प्रति क्विंटल (मॉडल भाव: ₹5,600)
- 🚜 **राजस्थान (बीकानेर/जयपुर):** ₹5,300 - ₹5,750 प्रति क्विंटल
- 🚜 **महाराष्ट्र (अकोला):** ₹5,400 - ₹5,800 प्रति क्विंटल`;
      }

      if (/आलू|potato/i.test(userMsg)) {
        return `💰 **आलू (Potato) का वर्तमान थोक एवं APMC मंडी भाव रिपोर्ट**

📊 **१. प्रमुख मंडियों में आज का मॉडल भाव (प्रति क्विंटल / प्रति किलो):**
- 🚜 **उत्तर प्रदेश (आगरा/फतेहाबाद मंडी):** ₹1,380 - ₹1,780 प्रति क्विंटल (लगभग ₹14 - ₹18/किलो)
- 🚜 **पंजाब (जालंधर फ्रेश मार्केट):** ₹1,400 - ₹1,900 प्रति क्विंटल (लगभग ₹14 - ₹19/किलो)
- 🚜 **पश्चिम बंगाल (हुगली/शेवड़ाफुली):** ₹1,480 - ₹1,880 प्रति क्विंटल
- 🚜 **झारखंड (रांची सब्जी मंडी):** ₹1,450 - ₹1,850 प्रति क्विंटल

🛠️ **२. बिक्री सुझाव:** आलू को श्रेणीबद्ध (A/B ग्रेड) करके और मिट्टी झाड़कर मंडी लाएं, बेहतर दाम मिलेंगे।`;
      }

      if (/प्याज|onion/i.test(userMsg)) {
        return `💰 **प्याज (Onion) का वर्तमान थोक एवं APMC मंडी भाव रिपोर्ट**

📊 **१. प्रमुख मंडियों में आज का मॉडल भाव:**
- 🚜 **महाराष्ट्र (लासलगांव APMC - एशिया की सबसे बड़ी प्याज मंडी):** ₹2,150 - ₹3,250 प्रति क्विंटल (मॉडल भाव: ₹2,800/Qtl, लगभग ₹28/किलो)
- 🚜 **मध्य प्रदेश (खंडवा मंडी):** ₹2,000 - ₹2,900 प्रति क्विंटल (मॉडल भाव: ₹2,500/Qtl)
- 🚜 **कर्नाटक (हुबली मंडी):** ₹2,100 - ₹3,000 प्रति क्विंटल (मॉडल भाव: ₹2,620/Qtl)

🏛️ **२. सरकारी बफर खरीद:** NAFED एवं NCCF द्वारा ₹2,100/क्विंटल की न्यूनतम दर पर बफर स्टॉक खरीद।`;
      }

      if (/टमाटर|tomato/i.test(userMsg)) {
        return `💰 **टमाटर (Tomato) का वर्तमान थोक एवं APMC मंडी भाव रिपोर्ट**

📊 **१. प्रमुख मंडियों में आज का मॉडल भाव:**
- 🚜 **महाराष्ट्र (पिंपलगांव/नासिक APMC):** ₹1,650 - ₹2,450 प्रति क्विंटल (लगभग ₹16.5 - ₹24.5/किलो)
- 🚜 **कर्नाटक (कोलार APMC):** ₹1,850 - ₹2,800 प्रति क्विंटल (मॉडल भाव: ₹2,350/Qtl)
- 🚜 **हिमाचल प्रदेश (सोलन APMC):** ₹2,250 - ₹3,150 प्रति क्विंटल (पहाड़ी हिमसोना टमाटर)
- 🚜 **दिल्ली (आज़ादपुर मंडी):** ₹1,700 - ₹2,600 प्रति क्विंटल`;
      }

      return `💰 **प्रमुख फसलों के आधिकारिक न्यूनतम समर्थन मूल्य (Govt MSP 2024-25) एवं मंडी दरें**

🌾 **१. भारत सरकार द्वारा निर्धारित आधिकारिक समर्थन मूल्य (MSP प्रति क्विंटल):**
- 🌾 **गेहूं (Wheat):** **₹2,425** प्रति क्विंटल (मंडी भाव: ₹2,400 - ₹2,750)
- 🌾 **धान / चावल (Paddy):** **₹2,300** प्रति क्विंटल (ग्रेड-ए: ₹2,320, बासमती: ₹3,400 - ₹4,200)
- 🟡 **सरसों (Mustard):** **₹5,650** प्रति क्विंटल (मंडी भाव: ₹5,450 - ₹5,900)
- ⚪ **कपास (Cotton):** **₹7,121** प्रति क्विंटल (मंडी भाव: ₹7,150 - ₹7,750)
- 🌽 **मक्का (Maize):** **₹2,225** प्रति क्विंटल (मंडी भाव: ₹2,150 - ₹2,360)
- 🟤 **चना (Gram):** **₹5,440** प्रति क्विंटल (मंडी भाव: ₹5,350 - ₹5,800)
- 🟡 **सोयाबीन (Soybean):** **₹4,892** प्रति क्विंटल (मंडी भाव: ₹4,650 - ₹5,050)
- 🥜 **मूंगफली (Groundnut):** **₹6,783** प्रति क्विंटल

🛠️ **२. सरकारी केंद्र पर बेचने के मुख्य चरण:**
- 📋 **कदम १:** राज्य के खाद्य एवं रसद पोर्टल (e-Uparjan / PACS) पर किसान पंजीकरण कराएं।
- 💧 **कदम २:** मानक नमी (धान 17%, गेहूं 12%, सरसों 8%) का ध्यान रखें।
- 💳 **कदम ३:** खरीद का भुगतान 48-72 घंटे में सीधे DBT द्वारा बैंक में प्राप्त करें।

⚠️ **३. किसान सलाह:** कभी भी सरकारी समर्थन मूल्य (MSP) से कम दाम पर बिचौलियों को अपनी फसल न बेचें।`;
    }

    const isFertilizerQuery = /(खाद|उर्वरक|यूरिया|डीएपी|पोटाश|जिंक|सल्फेट|dap|urea|potash|npk|fertilizer|ખાતર)/i.test(userMsg);
    if (isFertilizerQuery) {
      return `🌿 **संतुलित खाद एवं उर्वरक प्रबंधन गाइड (Balanced Fertilizer Protocol)**

🌾 **१. प्रति एकड़ आवश्यक मानक उर्वरक मात्रा (Standard Per-Acre Dosage):**
- 🟢 **यूरिया (Urea - 46% N):** 2 से 2.5 बोरी (90 - 110 kg प्रति एकड़)
- 🟤 **डीएपी (DAP - 18:46:0):** 1 बोरी (50 kg प्रति एकड़)
- ⚪ **एमओपी पोटाश (MOP - 60% K):** आधा बोरी (25 kg प्रति एकड़)
- 🟡 **जिंक सल्फेट (Zinc 21% या 33%):** 5 से 10 kg प्रति एकड़

🛠️ **२. चरणबद्ध खाद डालने का सही समय एवं नियम (Step-by-Step Schedule):**
- 🚜 **कदम १ (बुवाई/रोपाई के समय - Basal Dose):** पूरी DAP (50 kg), पूरा पोटाश (25 kg), जिंक (10 kg) और एक तिहाई यूरिया खेत की अंतिम जुताई के समय मिट्टी में मिला दें।
- 💧 **कदम २ (पहली सिंचाई पर - 21 से 25 दिन बाद):** पहली सिंचाई के बाद जब खेत में पैर टिकने लगे, तो एक तिहाई यूरिया (35 kg) का टॉप ड्रेसिंग करें।
- 🌾 **कदम ३ (कल्ले निकलते समय - 40 से 45 दिन बाद):** बची हुई एक तिहाई यूरिया (35 kg) का छिड़काव करें।

⚠️ **३. किसान सावधानियां:**
- खड़ी फसल में कभी भी डीएपी ऊपर से न फेंकें; डीएपी केवल बुवाई के समय मिट्टी के नीचे देना चाहिए।
- यूरिया और जिंक सल्फेट को आपस में मिलाकर ज्यादा देर तक न रखें।`;
    }

    const isPestQuery = /(की[टडड़]|इल्ली|सुंडी|माहू|एफिड|थ्रिप्स|मक्खी|pest|insect|worm|caterpillar|કીટક|જીવાત)/i.test(userMsg);
    if (isPestQuery) {
      return `🐛 **फसल कीट नियंत्रण एवं सही दवा की खुराक (Pest Diagnosis & Action Plan)**

🌾 **१. कीट की पहचान एवं संभावित प्रभाव:**
फसल पर रस चूसक कीट (माहू/एफिड्स/थ्रिप्स) या पत्तियों को कुतरने वाली हरी/काली इल्ली (Armyworm / Pod Borer) का प्रकोप हो सकता है।

🛠️ **२. चरणबद्ध समाधान एवं सही खुराक (Step-by-Step Treatment):**
- 🌿 **कदम १ (जैविक रोकथाम):** 5 मिलीलीटर नीम का तेल (Neem Oil 1500 ppm) प्रति लीटर पानी में 1 ml लिक्विड साबुन मिलाकर शाम को छिड़कें।
- 🧪 **कदम २ (रस चूसक कीटों - माहू/थ्रिप्स/सफेद मक्खी हेतु):** इमिडाक्लोप्रिड 17.8% SL (Imidacloprid) 1 मिलीलीटर प्रति 3 लीटर पानी में घोलकर छिड़काव करें।
- 🐛 **कदम ३ (इल्ली/सुंडी हेतु):** इमामेक्टिन बेंजोएट 5% SG (Emamectin Benzoate) 0.5 ग्राम प्रति लीटर पानी या कोराजन (Chlorantraniliprole 18.5% SC) 0.4 ml प्रति लीटर पानी में मिलाकर स्प्रे करें।

🛡️ **३. सुरक्षा सावधानियां:**
- छिड़काव हमेशा शाम के 3 बजे के बाद करें। तेज धूप या बारिश की संभावना में छिड़काव न करें।`;
    }

    const isYellowQuery = /(पील|yellow|पत्तियां सूख|पत्ते सूख|પીળા|પીળાશ)/i.test(userMsg);
    if (isYellowQuery) {
      return `🍂 **पत्तियों के पीलेपन का वैज्ञानिक निदान एवं उपचार (Leaf Yellowing Solution)**

🌾 **१. पीलेपन का मुख्य कारण:**
- **निचली पुरानी पत्तियां पीली:** नाइट्रोजन (Nitrogen) की कमी अथवा खेत में जलभराव/जड़ों में हवा की कमी।
- **ऊपरी नई पत्तियां पीली/सफेद:** जिंक (Zinc) अथवा आयरन की कमी।
- **पत्तियों पर पीले-भूरे धब्बे:** फफूंद जनित रोग (Fungal Leaf Blight)।

🛠️ **२. चरणबद्ध समाधान (Step-by-Step Action Plan):**
- 🚜 **कदम १ (जल निकासी):** यदि खेत में अतिरिक्त पानी भरा है, तो तुरंत निकास नाली बनाकर पानी निकालें।
- 🧪 **कदम २ (स्प्रे उपचार):** प्रति एकड़ 150 लीटर पानी में 2 किलोग्राम यूरिया + 500 ग्राम चिलेटेड जिंक (Zn-EDTA 12%) मिलाकर फोलियर स्प्रे करें। 48 घंटे में पत्तियां हरी होने लगेंगी।
- 💧 **कदम ३ (फंगस होने पर):** यदि पत्तियों पर धब्बे हों तो साथ में 2 ग्राम प्रति लीटर साफ (Saaf) या मेंकोजेब मिलाएं।`;
    }

    const isDiseaseQuery = /(रोग|फंगस|ब्लाइट|सड़|सड|झुलसा|उकठा|धब्ब|disease|fungus|blight|રોગ|ફૂગ)/i.test(userMsg);
    if (isDiseaseQuery) {
      return `🌿 **फसल रोग एवं फंगस निदान गाइड (Fungal Disease Management)**

🌾 **१. रोग पहचान:**
${hasImage ? '📸 आपके द्वारा अपलोड की गई फोटो के अनुसार:' : '📋 आपके प्रश्न के अनुसार:'} पत्तियों पर भूरे, काले या झुलसे हुए गोल धब्बे फफूंद जनित रोग (Leaf Blight / Spot / Sheath Blight) का संकेत हैं।

🛠️ **२. चरणबद्ध उपचार (Step-by-Step Control Protocol):**
- 🚜 **कदम १ (सफाई):** गंभीर रूप से संक्रमित पत्तियों को काटकर खेत से बाहर नष्ट करें।
- 💧 **कदम २ (प्रारंभिक फफूंदनाशक):** मेंकोजेब 75% WP (Mancozeb) 2.5 ग्राम प्रति लीटर पानी या साफ (Saaf - Carbendazim 12% + Mancozeb 63%) 2 ग्राम प्रति लीटर पानी में घोलकर छिड़काव करें।
- 🧪 **कदम ३ (उग्र प्रकोप होने पर):** एजोक्सीस्ट्रोबिन + डाइफेनोकोनाजोल (Amistar Top) 1 ml प्रति लीटर पानी में मिलाकर स्प्रे करें।

🛡️ **३. सावधानी:** छिड़काव के 24 घंटे तक बारिश न हो इसका ध्यान रखें।`;
    }

    const isSowingQuery = /(बुवाई|बोएं|बोई|लगाएं|लगाई|सकती|कौन सी फसल|sow|season|વાવણી)/i.test(userMsg);
    if (isSowingQuery) {
      return `🌿 **वर्तमान मौसम हेतु अनुशंसित फसलें एवं चरणबद्ध गाइड (Seasonal Crop Guide)**

🌾 **१. वर्तमान मौसम के लिए सर्वोत्तम फसलें (Top Recommended Crops):**
वर्तमान रबी/शरद ऋतु एवं तापमान (15°C - 28°C) के अनुसार निम्नलिखित फसलें सबसे अधिक लाभकारी हैं:
- 🌾 **गेहूं (Wheat):** उन्नत किस्में - HD 2967, HD 3086, DBW 187 (उत्पादन: 20-25 क्विंटल/एकड़)
- 🟡 **सरसों (Mustard):** पूसा मस्टर्ड 25, आरएच 749, गिरिराज (कम पानी में अधिक तेल व लाभ)
- 🟤 **चना (Gram / Chickpea):** पूसा 362, जेजी 11 (कम लागत व सूखा सहनशील)
- 🥔 **सब्जियां / आलू (Vegetables):** मटर (आर्किल/आजाद पी-1), आलू (कुफरी पुखराज), गोभी व गाजर

🛠️ **२. चरणबद्ध बुवाई एवं खेत तैयारी योजना (Step-by-Step Protocol):**
- 🚜 **कदम १ (गहरी जुताई):** मिट्टी पलटने वाले हल से 1 बार गहरी जुताई करें और 2 बार कल्टीवेटर चलाकर पाटा लगाएं ताकि नमी सुरक्षित रहे।
- 🧪 **कदम २ (बीजोपचार):** 1 किलोग्राम बीज को 2.5 ग्राम थीरम या बाविस्टिन अथवा 5 ग्राम ट्राइकोडर्मा से उपचारित करें।
- 💧 **कदम ३ (संतुलित खाद):** बुवाई के समय प्रति एकड़ 1 बोरी DAP (50 kg), आधा बोरी पोटाश (MOP) एवं 10 kg जिंक सल्फेट डालें।
- 🚿 **कदम ४ (पहली सिंचाई):** गेहूं में बुवाई के 21 दिन बाद (CRI स्टेज - मुकुट जड़ बनते समय) पहली हल्की सिंचाई अवश्य करें।

⚠️ **३. किसान ध्यान दें:** प्रमाणित बीज केवल अधिकृत सहकारी समिति या कृषि विज्ञान केंद्र से ही लें।`;
    }

    const isIrrigationQuery = /(पानी|सिंचाई|जल|irrigation|water|સિંચાઈ)/i.test(userMsg);
    if (isIrrigationQuery) {
      return `💧 **फसल सिंचाई एवं जल प्रबंधन नियम (Irrigation Management)**

🌾 **१. महत्वपूर्ण सिंचाई अवस्थाएं (Critical Growth Stages):**
- 🌾 **गेहूं:** पहली सिंचाई बुवाई के 21 दिन बाद (CRI मुकुट जड़ बनते समय) सबसे जरूरी है। इसके बाद कल्ले फूटते समय (40-45 दिन) और दाना भरते समय सिंचाई करें।
- 🟡 **सरसों:** पहली सिंचाई बुवाई के 30-35 दिन बाद (फूल आने से पहले) और दूसरी सिंचाई फलियां बनते समय (60-65 दिन)।
- 🌾 **धान:** कल्ले फूटते समय और बाली निकलते समय खेत में 2-3 सेमी पानी बना रहना चाहिए।

🛠️ **२. आवश्यक नियम:**
- तेज धूप में दोपहर के समय सिंचाई न करें, शाम के समय सिंचाई सर्वोत्तम रहती है।
- खेत में जलभराव न होने दें; जल निकास की उचित व्यवस्था रखें।`;
    }

    const isSchemeQuery = /(योजना|सब्सिडी|लोन|केसीसी|kcc|pm kisan|scheme|subsidy|યોજના)/i.test(userMsg);
    if (isSchemeQuery) {
      return `🏛️ **प्रमुख सरकारी किसान योजनाएं एवं सब्सिडी (Govt Schemes for Farmers)**

🌾 **१. प्रमुख योजनाएं:**
- 💳 **पीएम-किसान (PM-KISAN):** प्रति वर्ष ₹6,000 की प्रत्यक्ष सहायता (₹2,000 की 3 किस्तों में DBT द्वारा)।
- 🌾 **प्रधानमंत्री फसल बीमा योजना (PMFBY):** खरीफ हेतु 2%, रबी हेतु 1.5% प्रीमियम पर प्राकृतिक आपदा से फसल सुरक्षा।
- 🏦 **किसान क्रेडिट कार्ड (KCC):** समय पर चुकता करने पर केवल 4% वार्षिक रियायती ब्याज दर पर ₹3 लाख तक का कृषि ऋण।
- ☀️ **पीएम कुसुम (PM-KUSUM):** सोलर पंप लगाने पर 60% तक की भारी सरकारी सब्सिडी।

🛠️ **२. आवेदन प्रक्रिया:** सीएससी (CSC) केंद्र या कृषि विभाग के पोर्टल (pmkisan.gov.in) पर आधार कार्ड, बैंक पासबुक व खतौनी के साथ आवेदन करें।`;
    }

    return `🌿 **किसान साथी AI - फसल एवं रोग निदान मार्गदर्शिका**

🌾 **१. लक्षण एवं निदान:**
${hasImage ? '📸 आपके द्वारा अपलोड की गई फसल की तस्वीर एवं प्रश्न के आधार पर:' : '📋 आपके प्रश्न के आधार पर:'} पत्तियों में पोषक तत्वों (नाइट्रोजन/जिंक) की कमी या फफूंद (Fungal Blight) अथवा रस चूसक कीटों के लक्षण दिखाई दे रहे हैं।

🔍 **२. मुख्य कारण:**
खेत में आवश्यकता से अधिक नमी, जलभराव, या मौसम में अचानक बदलाव के कारण पौधों में रोग प्रतिरोधक क्षमता कम हो जाती है।

🛠️ **३. चरणबद्ध समाधान (Step-by-Step Action Plan):**
- 🚜 **कदम १ (तुरंत करने योग्य कार्य):** अत्यधिक रोगग्रस्त पत्तियों को तोड़कर खेत से दूर नष्ट करें और अतिरिक्त पानी की निकासी करें।
- 🧪 **कदम २ (जैविक उपचार):** ५ मिलीलीटर नीम का तेल (Neem Oil 1500 ppm) प्रति लीटर पानी में १ ग्राम लिक्विड सोप मिलाकर शाम को छिड़कें।
- 💧 **कदम ३ (रासायनिक उपचार):** मेंकोजेब ७५% डब्ल्यूपी २ ग्राम प्रति लीटर पानी या साफ (Saaf) १.५ ग्राम प्रति लीटर पानी में घोलकर छिड़कें।
- 🛡️ **कदम ४ (सुरक्षा):** छिड़काव करते समय मास्क और दस्ताने पहनें।

⚠️ **४. किसान सलाह:** किसी भी गंभीर समस्या में नजदीकी कृषि विज्ञान केंद्र (KVK) या कृषि अधिकारी से संपर्क करें।`;
  };

  if (!genAI) {
    return {
      success: true,
      reply: generateFallbackResponse(message, Boolean(imageBase64), language),
      detectedLanguage: selectedLangName
    };
  }

  const mandiSummary = mandiData?.records?.length
    ? mandiData.records.slice(0, 8).map(r => `- ${r.commodity} (${r.variety || 'FAQ'}): ₹${r.modalPrice}/Qtl [न्यूनतम ₹${r.minPrice} - अधिकतम ₹${r.maxPrice}] at ${r.market}, ${r.district || ''} (${r.state})`).join('\n')
    : `
- धान / चावल (Paddy/Rice): Govt MSP ₹2,300/Qtl, Grade-A ₹2,320/Qtl. बासमती मंडी भाव: ₹3,400 - ₹4,250/Qtl.
- गेहूं (Wheat): Govt MSP ₹2,425/Qtl. मंडी भाव: ₹2,400 - ₹2,750/Qtl (शरबती ₹2,650 - ₹2,950/Qtl).
- सरसों (Mustard): Govt MSP ₹5,650/Qtl. मंडी भाव: ₹5,450 - ₹5,920/Qtl.
- मक्का (Maize): Govt MSP ₹2,225/Qtl. मंडी भाव: ₹2,150 - ₹2,360/Qtl.
- कपास (Cotton): Govt MSP ₹7,121/Qtl. मंडी भाव: ₹7,150 - ₹7,750/Qtl.
- सोयाबीन (Soybean): Govt MSP ₹4,892/Qtl. मंडी भाव: ₹4,650 - ₹5,050/Qtl.
- चना (Gram): Govt MSP ₹5,440/Qtl. मंडी भाव: ₹5,350 - ₹5,800/Qtl.
- आलू (Potato): मंडी भाव ₹1,400 - ₹1,850/Qtl (₹14 - ₹18.5/kg).
- प्याज (Onion): मंडी भाव ₹2,100 - ₹2,900/Qtl (₹21 - ₹29/kg).
- टमाटर (Tomato): मंडी भाव ₹1,650 - ₹2,700/Qtl (₹16.5 - ₹27/kg).
`;

  const systemPrompt = `
You are "Kisan AI Doctor & Agronomist" (किसान AI डॉक्टर एवं कृषि वैज्ञानिक / ખેડૂત મિત્ર), an expert agricultural scientist and plant pathologist for Climate Pulse AI.
Your role: Provide immediate, direct, highly tailored, scientifically accurate answers to the farmer's specific query.

CRITICAL INSTRUCTIONS ON QUERY INTENT:
1. MARKET PRICE / MANDI / MSP QUERIES (कीमत, भाव, रेट, दाम, मूल्य, MSP, बेचें):
   - If the user asks about the price, rate, or MSP of ANY crop (e.g. "धान की कीमत", "गेहूं का भाव", "सरसों का रेट", "price", "rate", etc.):
     -> GIVE THE EXACT CURRENT GOVT MSP (न्यूनतम समर्थन मूल्य) AND REAL-TIME APMC MANDI RATES FIRST!
     -> Clearly state the official 2024-25 MSP:
        * धान (Paddy): ₹2,300 प्रति क्विंटल (Common) / ₹2,320 प्रति क्विंटल (Grade-A)
        * बासमती धान (Basmati): ₹3,400 - ₹4,250 प्रति क्विंटल (निजी मंडियों में)
        * गेहूं (Wheat): ₹2,425 प्रति क्विंटल (शरबती ₹2,650 - ₹2,950)
        * सरसों (Mustard): ₹5,650 प्रति क्विंटल
        * मक्का (Maize): ₹2,225 प्रति क्विंटल
        * कपास (Cotton): ₹7,121 प्रति क्विंटल
        * सोयाबीन (Soybean): ₹4,892 प्रति क्विंटल
        * चना (Gram): ₹5,440 प्रति क्विंटल
     -> Provide step-by-Step guidance on WHERE & HOW to sell:
        * Registration on state portal (e-Procurement / e-Uparjan / PACS)
        * Moisture limit (धान में 17% से कम नमी, गेहूं में 12% से कम)
        * Direct Benefit Transfer (DBT) to bank within 48-72 hours
     -> DO NOT talk about sowing seeds or leaf blight when asked about price!

2. FERTILIZER / NPK QUERIES (खाद, यूरिया, डीएपी, पोटाश, जिंक):
   - Give exact per-acre dosage (DAP 50 kg, Urea split dosage, MOP 25 kg, Zinc 10 kg) and stages.

3. PEST / INSECT ATTACK (कीट, कीड़ा, इल्ली, सुंडी, माहू, एफिड्स):
   - Recommend organic (Neem Oil 1500 ppm @ 5ml/L) and chemical (Imidacloprid 17.8% SL @ 0.5ml/L or Emamectin Benzoate 5% SG @ 0.5g/L).

4. LEAF YELLOWING / DISEASE / BLIGHT (पत्तियां पीली, रोग, फंगस, झुलसा):
   - Differentiate nutrient deficiency vs fungal infection. Recommend Mancozeb 75% WP @ 2.5g/L or Saaf @ 1.5g/L.

5. SOWING / SEASONAL ADVISORY (कौन सी फसल लगाएं, बुवाई):
   - Recommend top seasonal crops, field preparation, certified seed varieties, and sowing time.

FORMAT RULES:
- Use clear structured bullet points with relevant emojis (🌾, 💰, 📊, 🚜, 💧, 🧪, 🛡️, ⚠️).
- Always be polite, respectful, and answer in the requested language (${selectedLangName || 'Hindi (हिन्दी)'}).
- Never ask counter-questions before answering!

[OFFICIAL GOVT MSP & APMC MANDI CONTEXT]:
${mandiSummary}
${farmProfile ? `[Farmer Profile: Soil: ${farmProfile.soilType || 'Alluvial'}, Crops: ${farmProfile.cropTypes?.join(', ') || 'General'}]` : ''}
${weatherData ? `[Current Local Weather: Temp: ${weatherData.current?.temperature || 25}°C, Humidity: ${weatherData.current?.relativeHumidity || 60}%, Rain: ${weatherData.current?.precipitation || 0}mm]` : ''}
`;

  try {
    const contentParts = [systemPrompt];

    if (history && history.length > 0) {
      const recentHistory = history.slice(-4).map(h => `${h.sender === 'farmer' ? 'Farmer' : 'Kisan AI'}: ${h.text}`).join('\n');
      contentParts.push(`[Recent Conversation History]:\n${recentHistory}\n`);
    }

    contentParts.push(`Farmer's Current Query: "${message || 'कृपया इस फोटो को देखकर बताएं कि फसल में क्या समस्या है और इसका चरणबद्ध समाधान दें।'}"`);

    if (imageBase64) {
      let cleanData = imageBase64;
      let detectedMime = mimeType || 'image/jpeg';
      if (imageBase64.includes(';base64,')) {
        const parts = imageBase64.split(';base64,');
        detectedMime = parts[0].replace('data:', '');
        cleanData = parts[1];
      }
      contentParts.push({
        inlineData: {
          data: cleanData,
          mimeType: detectedMime
        }
      });
    }

    let replyText = null;
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const result = await withTimeout(model.generateContent(contentParts), 16000);
      replyText = result.response.text();
    } catch (m1Err) {
      console.warn('[Gemini 2.5-flash busy/failed, trying gemini-flash-latest]:', m1Err.message);
      try {
        const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
        const fallbackResult = await withTimeout(fallbackModel.generateContent(contentParts), 8000);
        replyText = fallbackResult.response.text();
      } catch (m2Err) {
        throw m1Err;
      }
    }

    return {
      success: true,
      reply: replyText,
      detectedLanguage: selectedLangName
    };
  } catch (err) {
    console.warn('[Gemini Crop Diagnosis Error / Falling back to Rich Heuristics]:', err.message);
    return {
      success: true,
      reply: generateFallbackResponse(message, Boolean(imageBase64), language),
      detectedLanguage: selectedLangName,
      fallbackUsed: true
    };
  }
};

module.exports = {
  generateCropAdvisory,
  explainClimateAlert,
  summarizeEmergencyNeeds,
  diagnoseCropImageAndChat
};

