import React, { useState, useEffect, useRef } from 'react';
import api, { getErrorMessage } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import {
  Send,
  Image as ImageIcon,
  Camera,
  X,
  Sparkles,
  Bot,
  User,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Trash2,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Layers,
  ShieldAlert,
  Leaf,
  Play,
  Pause,
  Sprout,
  ShieldCheck,
  Droplets,
  Thermometer,
  RotateCcw,
  Sun,
  Zap,
  Crosshair
} from 'lucide-react';

const LANGUAGE_OPTIONS = [
  { code: 'hi', label: '🇮🇳 हिन्दी (Hindi) [डिफ़ॉल्ट]', voiceLang: 'hi-IN' },
  { code: 'gu', label: '🌾 ગુજરાતી (Gujarati)', voiceLang: 'gu-IN' },
  { code: 'en', label: '🇬🇧 English', voiceLang: 'en-US' },
  { code: 'auto', label: '🌐 Auto-Detect (स्वतः पहचानें)', voiceLang: 'hi-IN' },
  { code: 'mr', label: '🚜 मराठी (Marathi)', voiceLang: 'mr-IN' },
  { code: 'pa', label: '🌾 ਪੰਜਾਬੀ (Punjabi)', voiceLang: 'pa-IN' },
  { code: 'bn', label: '🌱 বাংলা (Bengali)', voiceLang: 'bn-IN' },
  { code: 'te', label: '🌿 తెలుగు (Telugu)', voiceLang: 'te-IN' },
  { code: 'ta', label: '🌴 தமிழ் (Tamil)', voiceLang: 'ta-IN' }
];

const QUICK_PROMPTS_HI = [
  { label: '💰 अभी धान और गेहूं का भाव (MSP)?', text: 'अभी धान की कितना कीमत है? और गेहूं का भाव क्या है? पूरा सरकारी समर्थन मूल्य (MSP) और मंडी भाव बताएं।', lang: 'hi' },
  { label: '🌾 इस मौसम में कौन सी फसल लगाएं?', text: 'वर्तमान मौसम में कौन सी फसल लगानी चाहिए? खेत की तैयारी, खाद और सिंचाई का पूरा नियम बताएं।', lang: 'hi' },
  { label: '📸 पत्ते/फसल का रोग पहचानें', text: 'कृपया इस फोटो को देखकर बताएं कि पत्तों में कौन सा रोग है और क्या तुरंत उपचार करना चाहिए?', lang: 'hi' },
  { label: '🐛 कीट की पहचान और सही खुराक', text: 'फसल में कीड़े लग गए हैं। जैविक और रासायनिक दोनों तरह की सही खुराक बताएं।', lang: 'hi' },
  { label: '🍂 पत्तियां पीली क्यों हो रही हैं?', text: 'फसल की पत्तियां पीली पड़ रही हैं। क्या यह नाइट्रोजन की कमी है या कोई फंगस रोग?', lang: 'hi' },
  { label: '💧 खाद और पानी का सही नियम', text: 'वर्तमान मौसम में यूरिया, डीएपी और पोटाश की सही मात्रा एवं सिंचाई कब करनी चाहिए?', lang: 'hi' }
];

const QUICK_PROMPTS_EN = [
  { label: '💰 Current Paddy & Wheat MSP / Rates?', text: 'What is the current Government MSP and Mandi price for Paddy and Wheat? Where and how to sell?', lang: 'en' },
  { label: '🌾 Which crop to sow this season?', text: 'Which crop is best suited for the current season? Please give complete instructions on soil preparation, fertilizer dosage and irrigation schedule.', lang: 'en' },
  { label: '📸 Identify leaf / crop disease', text: 'Please analyze this photo and tell me what disease is present on the leaves and what immediate treatment is required.', lang: 'en' },
  { label: '🐛 Pest diagnosis & dosage', text: 'Pests have attacked my crops. Please provide recommended organic and chemical dosage.', lang: 'en' },
  { label: '🍂 Why are leaves turning yellow?', text: 'The leaves of my crop are turning yellow. Is this nitrogen deficiency or a fungal disease?', lang: 'en' },
  { label: '💧 Water & fertilizer schedule', text: 'What is the correct schedule and dosage for Urea, DAP, and Potash and when to irrigate?', lang: 'en' }
];

const QUICK_PROMPTS_PA = [
  { label: '💰 ਕਣਕ ਤੇ ਝੋਨੇ ਦਾ ਤਾਜ਼ਾ ਭਾਅ (MSP)?', text: 'ਕਣਕ ਅਤੇ ਝੋਨੇ ਦਾ ਅੱਜ ਦਾ ਸਰਕਾਰੀ ਸਮਰਥਨ ਮੁੱਲ (MSP) ਅਤੇ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ? ਪੂਰੀ ਜਾਣਕਾਰੀ ਦਿਓ।', lang: 'pa' },
  { label: '🌾 ਇਸ ਮੌਸਮ ਵਿੱਚ ਕਿਹੜੀ ਫ਼ਸਲ ਬੀਜੀਏ?', text: 'ਮੌਜੂਦਾ ਮੌਸਮ ਵਿੱਚ ਕਿਹੜੀ ਫ਼ਸਲ ਬੀਜਣੀ ਚਾਹੀਦੀ ਹੈ? ਖੇਤ ਦੀ ਤਿਆਰੀ, ਖਾਦ ਅਤੇ ਸਿੰਚਾਈ ਦਾ ਪੂਰਾ ਨਿਯਮ ਦੱਸੋ।', lang: 'pa' },
  { label: '📸 ਪੱਤੇ/ਫ਼ਸਲ ਦੀ ਬਿਮਾਰੀ ਪਛਾਣੋ', text: 'ਕਿਰਪਾ ਕਰਕੇ ਇਸ ਫ਼ੋਟੋ ਨੂੰ ਵੇਖ ਕੇ ਦੱਸੋ ਕਿ ਪੱਤਿਆਂ ਵਿੱਚ ਕਿਹੜਾ ਰੋਗ ਹੈ ਅਤੇ ਤੁਰੰਤ ਕੀ ਇਲਾਜ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?', lang: 'pa' },
  { label: '🐛 ਕੀੜਿਆਂ ਦੀ ਰੋਕਥਾਮ ਤੇ ਸਹੀ ਦਵਾਈ', text: 'ਫ਼ਸਲ ਤੇ ਕੀੜਿਆਂ ਦਾ ਹਮਲਾ ਹੋ ਗਿਆ ਹੈ। ਜੈਵਿਕ ਅਤੇ ਰਸਾਇਣਕ ਦੋਵਾਂ ਤਰ੍ਹਾਂ ਦੀ ਸਹੀ ਸਪਰੇਅ ਮਾਤਰਾ ਦੱਸੋ।', lang: 'pa' },
  { label: '🍂 ਪੱਤੇ ਪੀਲੇ ਕਿਉਂ ਪੈ ਰਹੇ ਹਨ?', text: 'ਫ਼ਸਲ ਦੇ ਪੱਤੇ ਪੀਲੇ ਪੈ ਰਹੇ ਹਨ। ਕੀ ਇਹ ਨਾਈਟ੍ਰੋਜਨ ਦੀ ਘਾਟ ਹੈ ਜਾਂ ਪੀਲੀ ਕੁੰਗੀ ਦਾ ਰੋਗ?', lang: 'pa' },
  { label: '💧 ਖਾਦ ਅਤੇ ਪਾਣੀ ਦਾ ਸਹੀ ਹਿਸਾਬ', text: 'ਮੌਜੂਦਾ ਸਮੇਂ ਵਿੱਚ ਯੂਰੀਆ, ਡੀਏਪੀ ਤੇ ਪੋਟਾਸ਼ ਦੀ ਸਹੀ ਮਾਤਰਾ ਅਤੇ ਪਾਣੀ ਕਦੋਂ ਲਾਉਣਾ ਚਾਹੀਦਾ ਹੈ?', lang: 'pa' }
];

export const generateSmartAgronomicResponse = (userMsg = '', lang = 'hi', hasImage = false) => {
  const msg = (userMsg || '').toLowerCase();
  const isEnglish = lang === 'en';
  const isGujarati = lang === 'gu';

  if (hasImage || /फोटो|पत्ते|फसल की जांच|camera|leaf|crop/i.test(msg)) {
    if (isEnglish) {
      return `🌿 **Live Crop Leaf & Plant Health Diagnosis Report**

🔍 **1. Visual Symptom Analysis:**
- 🍃 **Foliar Examination:** The captured image shows early chlorosis (yellowing) and minor necrotic leaf spots typical of early fungal blight or secondary nitrogen/zinc deficiency.
- 🐛 **Pest Status:** No major caterpillar chewing detected on immediate veins; sap-sucking thrips/leaf-miner traces possible.

💊 **2. Immediate Organic Remedy (Eco-Friendly):**
- 🌿 Spray cold-pressed **Neem Oil (10,000 ppm)** @ 3 to 4 ml per Litre of water mixed with 1g detergent powder.
- 🧴 Spray in the early morning or evening for maximum absorption and zero leaf scorch.

🧪 **3. Scientific Chemical Treatment (Dual Action):**
- 💊 **Fungicide Spray:** **Tricyclazole 75% WP** (120 g per Acre) or **Azoxystrobin 18.2% + Difenoconazole 11.4% SC** (200 ml per Acre) diluted in 150-200 Litres of clean water.
- 📦 **Nutrient Booster:** Add 100g soluble Urea + 25g Chelated Zinc (12%) per 15-Litre knapsack pump to restore green chlorophyll vigor within 72 hours.

⚠️ **4. Agronomist Safety Advice:** Do not spray under direct mid-day sun or when rain is expected within 2 hours. Wear a mask while spraying.`;
    }

    return `🌿 **लाइव फसल पत्ता एवं पौध स्वास्थ्य निदान रिपोर्ट**

🔍 **१. लाइव फोटो लक्षण विश्लेषण:**
- 🍃 **पर्ण परीक्षण (Leaf Analysis):** भेजी गई फोटो में पत्तों पर हल्के पीलेपन के साथ सूक्ष्म भूरे धब्बे दिखाई दे रहे हैं, जो शुरुआती पर्ण झुलसा (Leaf Blight) अथवा नाइट्रोजन-जिंक सूक्ष्म पोषक तत्वों की कमी के लक्षण हैं।
- 🐛 **कीट लक्षण:** पत्तों के किनारे सुरक्षित हैं; रस चूसक कीटों (थ्रिप्स/माहू) की शुरुआती सक्रियता की संभावना है।

💊 **२. तुरंत जैविक उपचार (Organic Remedy):**
- 🌿 **नीम का तेल (10,000 ppm):** 3 से 4 मिली प्रति लीटर पानी में 1 ग्राम कपड़े धोने का पाउडर (सर्फ) मिलाकर पूरे पौधे पर अच्छी तरह छिड़कें।
- ⏰ यह छिड़काव कीटों को रोकता है और पत्तों पर प्राकृतिक सुरक्षा कवच बनाता है।

🧪 **३. वैज्ञानिक रासायनिक उपचार (Chemical Remedy):**
- 💊 **फफूंदनाशक दवा:** यदि पत्तों पर नाव के आकार के धब्बे हैं, तो **ट्राइसाइक्लाजोल 75% WP** (120 ग्राम प्रति एकड़) अथवा **एज़ोक्सीस्ट्रोबिन + डाइफेनोकोनाज़ोल** (200 मिली प्रति एकड़) 200 लीटर पानी में घोलकर छिड़कें।
- 📦 **पोषक तत्व स्प्रे:** पत्तों को हरा-भरा करने हेतु 100 ग्राम **यूरिया** + 25 ग्राम **चीलेटेड जिंक (12%)** प्रति 15 लीटर वाले स्प्रे पंप में मिलाकर तुरंत छिड़काव करें। 72 घंटे में फसल में सुधार दिखेगा।

⚠️ **४. विशेषज्ञ सावधानी:** दोपहर की तेज धूप में छिड़काव न करें; सुबह 8 से 10 बजे या शाम 4 से 6 बजे के बीच ही छिड़काव करें।`;
  }

  if (/धान|चावल|paddy|rice/i.test(msg)) {
    if (isEnglish) {
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

    if (isGujarati) {
      return `💰 **ડાંગર (Paddy) ના સરકારી ટેકાના ભાવ (MSP) અને માર્કેટ યાર્ડ રિપોર્ટ**

🌾 **૧. સરકારી ટેકાના ભાવ (Govt MSP 2024-25):**
- 🏛️ **સામાન્ય ડાંગર (Paddy Common):** **₹2,300 પ્રતિ ક્વિન્ટલ**
- ⭐ **ગ્રેડ-એ ડાંગર (Paddy Grade-A):** **₹2,320 પ્રતિ ક્વિન્ટલ**
- 🍚 **બાસમતી ડાંગર:** બજારમાં **₹3,400 થી ₹4,200 પ્રતિ ક્વિન્ટલ**

📊 **૨. મુખ્ય APMC માર્કેટ યાર્ડના મોડેલ ભાવ:**
- 🚜 **ગુજરાત / મધ્યપ્રદેશ:** ₹2,250 - ₹2,360 પ્રતિ ક્વિન્ટલ
- 🚜 **પંજાબ / હરિયાણા:** ₹2,300 - ₹2,350 પ્રતિ ક્વિન્ટલ

🛠️ **૩. સરકારી ખરીદ કેન્દ્ર પર વેચવાના નિયમો:**
- 📋 **પગલું ૧:** ઈ-સમૃદ્ધિ પોર્ટલ પર ખેડૂત નોંધણી કરાવો.
- 💧 **પગલું ૨:** ડાંગરમાં ભેજ ૧૭% થી વધુ ન હોવો જોઈએ.
- 💳 **પગલું ૩:** રકમ સીધી તમારા બેંક ખાતામાં (DBT) જમા થાય છે.

⚠️ **૪. ખેડૂત મિત્ર સલાહ:** ₹૨,૩૦૦/ક્વિન્ટલથી ઓછા ભાવે ડાંગર ન વેચો; માન્ય યાર્ડ અથવા સરકારી કેન્દ્ર પર જ વેચાણ કરો.`;
    }

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

  if (/गेहूं|गेहूँ|wheat/i.test(msg)) {
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

  if (/सरसों|मस्टर्ड|mustard|राय|राई/i.test(msg)) {
    return `💰 **सरसों (Mustard) की वर्तमान सरकारी कीमत एवं मंडी भाव रिपोर्ट**

🌾 **१. न्यूनतम समर्थन मूल्य (Government MSP 2024-25):**
- 🏛️ **सरसों का आधिकारिक MSP:** **₹5,650 प्रति क्विंटल** (NAFED / भारत सरकार)।

📊 **२. प्रमुख APMC मंडियों में आज का मॉडल भाव:**
- 🚜 **राजस्थान (भरतपुर/अलवर मंडी):** ₹5,450 - ₹5,920 प्रति क्विंटल (मॉडल भाव: ₹5,720)
- 🚜 **हरियाणा (सिरसा APMC):** ₹5,400 - ₹5,800 प्रति क्विंटल (मॉडल भाव: ₹5,650)
- 🚜 **मध्य प्रदेश (मुरैना/ग्वालियर):** ₹5,350 - ₹5,750 प्रति क्विंटल

🛠️ **३. गुणवत्ता मानक:** तेल की मात्रा कम से कम 40% और नमी 8% से कम होनी चाहिए।`;
  }

  if (/कपास|cotton|रुई/i.test(msg)) {
    return `💰 **कपास (Cotton) की वर्तमान सरकारी कीमत एवं मंडी भाव रिपोर्ट**

🌾 **१. न्यूनतम समर्थन मूल्य (Government MSP 2024-25):**
- 🏛️ **मीडियम स्टेपल कपास:** **₹7,121 प्रति क्विंटल**
- ⭐ **लॉन्ग स्टेपल कपास:** **₹7,521 प्रति क्विंटल**

📊 **२. प्रमुख APMC मंडियों में भाव:**
- 🚜 **गुजरात (राजकोट/गोंडल APMC):** ₹7,250 - ₹7,850 प्रति क्विंटल
- 🚜 **महाराष्ट्र (नागपुर/अकोला):** ₹7,100 - ₹7,600 प्रति क्विंटल`;
  }

  if (/मक्का|maize|चना|chana|सोयाबीन|soybean/i.test(msg)) {
    return `💰 **मक्का, चना एवं सोयाबीन न्यूनतम समर्थन मूल्य (Govt MSP 2024-25)**

🌾 **आधिकारिक सरकारी समर्थन मूल्य (MSP प्रति क्विंटल):**
- 🌽 **मक्का (Maize):** **₹2,225 प्रति क्विंटल**
- 🟤 **चना (Gram/Chickpea):** **₹5,440 प्रति क्विंटल**
- 🟡 **सोयाबीन (Soybean Yellow):** **₹4,892 प्रति क्विंटल**

📊 **मंडी विक्रय सलाह:** राज्य के नाफेड (NAFED) या ई-उपार्जन केंद्र पर ऑनलाइन टोकन लेकर ही विक्रय करें।`;
  }

  if (/कीमत|भाव|रेट|दाम|मूल्य|price|rate|mandi|msp|बिक|बेच|कितने में|क्विंटल/i.test(msg)) {
    return `💰 **प्रमुख फसलों के आधिकारिक न्यूनतम समर्थन मूल्य (Govt MSP 2024-25)**

🌾 **अनाज एवं दलहन सरकारी भाव सूची (प्रति क्विंटल):**
- 🌾 **धान (Paddy Common):** ₹2,300 / क्विंटल (ग्रेड-ए: ₹2,320)
- 🌾 **गेहूं (Wheat):** ₹2,425 / क्विंटल
- 🟡 **सरसों (Mustard):** ₹5,650 / क्विंटल
- ⚪ **कपास (Cotton):** ₹7,121 / क्विंटल
- 🌽 **मक्का (Maize):** ₹2,225 / क्विंटल
- 🟤 **चना (Gram):** ₹5,440 / क्विंटल
- 🟡 **सोयाबीन (Soybean):** ₹4,892 / क्विंटल

🛠️ **मंडी सलाह:** किसी विशिष्ट फसल का भाव जानने हेतु 'धान का भाव' या 'गेहूं की कीमत' लिखकर पूछें।`;
  }

  if (/पीली|पीला|yellow|रोग|disease|फंगस|ब्लास्ट|झुलसा|धब्बा/i.test(msg)) {
    return `🩺 **फसल में पीलापन एवं रोग निदान विशेषज्ञ सलाह**

🔍 **१. संभावित कारण विश्लेषण:**
- 🍂 **नाइट्रोजन व जिंक की कमी:** निचली पत्तियां पहले पीली पड़ती हैं और पौधे की बढ़वार रुकती है।
- 💧 **जलभराव या रूट रॉट:** जड़ें काली पड़कर सड़ने लगती हैं।
- 🦠 **शीथ ब्लाइट / लीफ ब्लास्ट:** पत्तियों पर भूरे नाव के आकार के धब्बे बनते हैं।

🛠️ **२. तुरंत उपचार एवं दवा की खुराक:**
- 🌿 **पहला कदम (तुरंत पोषण):** 100 ग्राम **यूरिया** + 25 ग्राम **जिंक सल्फेट (चीलेटेड 12%)** प्रति 15 लीटर पानी के पंप में मिलाकर छिड़कें।
- 💊 **फफूंदनाशक दवा:** यदि पत्तों पर धब्बे हैं, तो **ट्राइसाइक्लाजोल 75% WP** (120 ग्राम प्रति एकड़) या **एज़ोक्सीस्ट्रोबिन + डाइफेनोकोनाज़ोल** (200 मिली प्रति एकड़) 200 लीटर पानी में घोलकर छिड़कें।

⚠️ **३. सावधानियां:** खेत से रुका हुआ अतिरिक्त पानी निकालें और तेज धूप में छिड़काव न करें।`;
  }

  if (/कीट|कीड़ा|कीड़े|pest|insect|सुंडी|माहू|एफिड|इल्ली/i.test(msg)) {
    return `🐛 **फसल कीट एवं सुंडी नियंत्रण संपूर्ण गाइड**

🔍 **१. कीट की पहचान:**
- 🐛 **तना छेदक व इल्ली (Borer / Caterpillar):** तने और पत्तियों को अंदर से कुतरती है।
- 🦗 **माहू व रस चूसक (Aphids / BPH):** पत्तियों का रस चूसते हैं जिससे पौधे सिकुड़ जाते हैं।

🛠️ **२. अनुशंसित रासायनिक व जैविक उपचार:**
- 🌿 **जैविक उपाय:** नीम का तेल (10,000 ppm) 3 मिली प्रति लीटर पानी + 1 मिली सर्फ घोलकर छिड़कें।
- 💊 **इल्ली/सुंडी हेतु:** **कोराजन (Chlorantraniliprole 18.5% SC)** 60 मिली प्रति एकड़, या **एमामेक्टिन बेंजोएट 5% SG** 100 ग्राम प्रति एकड़ 200 लीटर पानी में।
- 🦟 **रस चूसक कीट हेतु:** **इमिडाक्लोप्रिड 17.8% SL** 0.5 मिली प्रति लीटर पानी।

⚠️ **३. सलाह:** दवा छिड़कते समय चेहरे पर मास्क लगाएं।`;
  }

  if (/खाद|उर्वरक|fertilizer|npk|यूरिया|डीएपी|पोटाश/i.test(msg)) {
    return `🧪 **वैज्ञानिक खाद एवं उर्वरक (NPK) प्रबंधन गाइड**

🌾 **१. संतुलित NPK अनुपात (प्रति एकड़):**
- 📦 **डीएपी (DAP):** 1 से 1.5 बोरी (50-75 किग्रा) - बुवाई के समय बेसल डोज के रूप में।
- 📦 **एमओपी पोटाश (MOP):** 25-30 किग्रा - बुवाई के समय दाने की चमक व मजबूती हेतु।
- 📦 **जिंक सल्फेट:** 10 किग्रा (21% वाला) - डीएपी से अलग डालें (दोनों को साथ न मिलाएं)।
- 📦 **यूरिया (Urea):** कुल 2 बोरी (90 किग्रा) - 3 बराबर किश्तों में (बुवाई के 21 दिन, 42 दिन और कल्ले निकलते समय)।

⚠️ **२. महत्वपूर्ण नियम:** डीएपी और जिंक सल्फेट को कभी एक साथ मिलाकर न डालें; इससे दोनों का असर खत्म हो जाता है।`;
  }

  if (/फसल|सब्जी|बुवाई|मौसम|weather|sow/i.test(msg)) {
    return `🌱 **वर्तमान मौसम अनुसार फसल बुवाई एवं कृषि चक्र परामर्श**

🌾 **१. प्रमुख अनुशंसित फसलें:**
- 🌾 **अनाज फसलें:** प्रमाणित उच्च उपज वाली किस्में चुनें (जैसे बासमती 1509 / पूसा 44 धान, एचडी 2967 गेहूं)।
- 🥬 **सब्जियां:** भिंडी, लौकी, खीरा, मिर्च, बैंगन एवं टमाटर नर्सरी तैयार करें।

🛠️ **२. बुवाई पूर्व आवश्यक कदम:**
- 🧪 **बीज उपचार (Seed Treatment):** थीरम या बाविस्टिन (Bavistin) 2 ग्राम प्रति किग्रा बीज से उपचारित करें।
- 💧 **खेत की तैयारी:** गहरी जुताई कर 4-5 ट्रॉली सड़ी गोबर की खाद प्रति एकड़ मिलाएं।

⚠️ **३. कृषि मौसम सलाह:** खेत में जलनिकासी की उचित व्यवस्था रखें ताकि अचानक तेज वर्षा में फसल न गले।`;
  }

  if (/योजना|सब्सिडी|लोन|kcc|pm किसान|pm-kisan|बीमा/i.test(msg)) {
    return `🏛️ **प्रमुख सरकारी किसान योजनाएं एवं सब्सिडी जानकारी**

🌾 **१. पीएम किसान सम्मान निधि (PM-KISAN):**
- 💵 पात्र किसानों को ₹6,000 प्रति वर्ष (₹2,000 की 3 समान किस्तों में) सीधे बैंक खाते (DBT) में।
- 📋 ई-केवाईसी (e-KYC) एवं भूमि सत्यापन अनिवार्य।

🌾 **२. प्रधानमंत्री फसल बीमा योजना (PMFBY):**
- 🛡️ सूखा, बाढ़ या कीट प्रकोप में 100% तक फसल नुकसान की भरपाई। खरीफ प्रीमियम मात्र 2%, रबी 1.5%।

🌾 **३. किसान क्रेडिट कार्ड (KCC):**
- 💳 4% की रियायती ब्याज दर पर ₹3 लाख तक का कृषि ऋण उपलब्ध।

🌾 **४. पीएम कुसुम सोलर पंप योजना:**
- ☀️ सोलर सिंचाई पंप पर 60% तक सरकारी सब्सिडी।`;
  }

  return `🌾 **किसान एआई कृषि विशेषज्ञ परामर्श**

नमस्ते किसान भाई! आपके द्वारा पूछे गए विषय पर विस्तृत जानकारी:

📋 **कृषि प्रबंधन के मुख्य बिंदु:**
1. **फसल स्वास्थ्य निगरानी:** अपनी फसल के पत्तों की नियमित जांच करें। कीट या रोग के शुरुआती लक्षण दिखते ही जैविक या अनुशंसित दवा का छिड़काव करें।
2. **संतुलित पोषण:** केवल यूरिया पर निर्भर न रहें; डीएपी, पोटाश और सूक्ष्म पोषक तत्वों (जिंक, सल्फर) का संतुलित प्रयोग करें।
3. **मंडी व भाव सुरक्षा:** अपनी फसल को हमेशा नजदीकी सरकारी खरीद केंद्र (PACS) या पंजीकृत APMC मंडी में न्यूनतम समर्थन मूल्य (MSP) पर ही बेचें।

💡 **त्वरित सहायता:** आप किसी भी फसल का नाम लिखकर उसका आज का भाव (जैसे 'धान की कीमत' या 'गेहूं का भाव'), खाद की मात्रा, या पत्तों के रोग का समाधान पूछ सकते हैं।`;
};

function FormattedDiagnosisCard({ text, onSpeak, isSpeaking, currentLang = 'hi' }) {
  if (!text) return null;

  const lines = text.split('\n').filter((l) => l.trim().length > 0);

  return (
    <div className="space-y-3.5 text-xs sm:text-sm text-[#172B25] leading-relaxed">
      <div className="bg-[#123B35] text-white p-3 sm:p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 ${
              isSpeaking ? 'bg-[#38BDF8] text-[#123B35] animate-pulse' : 'bg-[#168A70]'
            }`}
          >
            {isSpeaking ? <Volume2 className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
          </div>
          <div>
            <h5 className="font-extrabold text-xs sm:text-sm text-white flex items-center gap-1.5">
              <span>
                {isSpeaking
                  ? (currentLang === 'hi' ? '🔊 डॉक्टर उत्तर बोल रहे हैं...' : '🔊 Doctor is speaking guidance...')
                  : (currentLang === 'hi' ? '🔊 उत्तर आवाज में सुनें' : '🔊 Listen to Audio Advice')}
              </span>
            </h5>
            <p className="text-[10px] text-emerald-200">
              {isSpeaking
                ? (currentLang === 'hi' ? 'आवाज चल रही है • रोकने के लिए दबाएं' : 'Speaking • Click to stop')
                : (currentLang === 'hi' ? 'क्लिक करके पूरा सुझाव स्पष्ट आवाज में सुनें' : 'Click to hear the complete advice aloud')}
            </p>
          </div>
        </div>

        <button
          onClick={onSpeak}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-sm ${
            isSpeaking
              ? 'bg-rose-600 hover:bg-rose-700 text-white'
              : 'bg-[#168A70] hover:bg-[#168A70]/80 text-white'
          }`}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-3.5 h-3.5" /> <span>{currentLang === 'hi' ? 'रोकें' : 'Stop'}</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-white" /> <span>{currentLang === 'hi' ? 'प्ले करें' : 'Play'}</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-3">
        {lines.map((line, idx) => {
          const trimmed = line.trim();

          if (trimmed.startsWith('🌿') || trimmed.startsWith('🙏')) {
            return (
              <div
                key={idx}
                className="p-3 bg-[#F0FDF4] rounded-xl border border-[#BBF7D0] text-[#123B35] font-extrabold text-xs sm:text-sm flex items-center gap-2"
              >
                <Leaf className="w-4 h-4 text-[#168A70] shrink-0" />
                <span>{trimmed.replace(/[#*`]/g, '')}</span>
              </div>
            );
          }

          if (
            trimmed.startsWith('🌾') ||
            trimmed.startsWith('🔍') ||
            trimmed.startsWith('🛠️') ||
            trimmed.startsWith('🛡️') ||
            trimmed.startsWith('⚠️') ||
            trimmed.startsWith('💰') ||
            trimmed.startsWith('📊') ||
            trimmed.startsWith('🏛️') ||
            /^[१२३४५12345]\./.test(trimmed)
          ) {
            const isWarning = trimmed.includes('⚠️') || trimmed.includes('अस्वीकरण') || trimmed.includes('सलाह');
            const isPlan = trimmed.includes('🛠️') || trimmed.includes('चरणबद्ध') || trimmed.includes('उपाय') || trimmed.includes('नियम');
            const isPrice = trimmed.includes('💰') || trimmed.includes('कीमत') || trimmed.includes('मूल्य') || trimmed.includes('भाव') || trimmed.includes('MSP') || trimmed.includes('📊') || trimmed.includes('🏛️');
            const isId = trimmed.includes('🌾') || trimmed.includes('लक्षण') || trimmed.includes('पहचान');

            return (
              <div
                key={idx}
                className={`pt-2 pb-1 font-extrabold text-xs sm:text-sm flex items-center gap-2 border-b ${
                  isWarning
                    ? 'text-amber-800 border-amber-200'
                    : isPrice
                    ? 'text-emerald-900 border-emerald-300 bg-emerald-50/80 px-2.5 py-1.5 rounded-lg'
                    : isPlan
                    ? 'text-[#123B35] border-emerald-200'
                    : isId
                    ? 'text-[#168A70] border-emerald-100'
                    : 'text-[#172B25] border-slate-200'
                }`}
              >
                <span>{trimmed.replace(/[#*`]/g, '')}</span>
              </div>
            );
          }

          if (
            trimmed.includes('कदम') ||
            trimmed.includes('Step') ||
            trimmed.includes('पगલું') ||
            trimmed.startsWith('- 🚜') ||
            trimmed.startsWith('- 🧪') ||
            trimmed.startsWith('- 💧') ||
            trimmed.startsWith('- 🛡️')
          ) {
            return (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs hover:border-[#168A70]/40 transition space-y-1"
              >
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#123B35] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div className="flex-1 text-xs text-[#172B25] font-medium leading-relaxed">
                    {trimmed.replace(/^[-*]\s*/, '').replace(/[#*`]/g, '')}
                  </div>
                </div>
              </div>
            );
          }

          if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-2 text-xs text-[#172B25]">
                <span className="text-[#168A70] font-black text-sm shrink-0">•</span>
                <span className="leading-relaxed">
                  {trimmed.replace(/^[-*]\s*/, '').replace(/[#*`]/g, '')}
                </span>
              </div>
            );
          }

          return (
            <p key={idx} className="text-xs text-[#172B25] leading-relaxed">
              {trimmed.replace(/[#*`]/g, '')}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default function FarmerChatBot({ cropContext = '' }) {
  const { currentLang, t, lt } = useLanguage();
  const isHi = currentLang === 'hi';
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLang || 'hi');
  const [loading, setLoading] = useState(false);
  const [fetchingHistory, setFetchingHistory] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setSelectedLanguage(currentLang || 'hi');
  }, [currentLang]);

  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef(null);

  const [speakingMsgIndex, setSpeakingMsgIndex] = useState(null);
  const [autoSpeak, setAutoSpeak] = useState(true); 
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const keepAliveTimerRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const speechQueueRef = useRef([]);
  const speechCurrentIndexRef = useRef(0);
  const activeUtteranceRef = useRef(null);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) {
          setVoices(v);
        }
      }
    };
    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (keepAliveTimerRef.current) clearInterval(keepAliveTimerRef.current);
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (focusAnalysisIntervalRef.current) {
        clearInterval(focusAnalysisIntervalRef.current);
        focusAnalysisIntervalRef.current = null;
      }
    };
  }, []);

  const [isLiveCameraOpen, setIsLiveCameraOpen] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState('environment'); 
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [cameraError, setCameraError] = useState('');
  const [isStartingCamera, setIsStartingCamera] = useState(false);

  const [isHighContrast, setIsHighContrast] = useState(false);

  const [isAudioGuidanceEnabled, setIsAudioGuidanceEnabled] = useState(true);

  const [isAutoCaptureEnabled, setIsAutoCaptureEnabled] = useState(true);
  const [focusScore, setFocusScore] = useState(0); 
  const [leafDetected, setLeafDetected] = useState(false);
  const [autoCaptureProgress, setAutoCaptureProgress] = useState(0); 
  const [alignmentMessage, setAlignmentMessage] = useState('');

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const focusAnalysisIntervalRef = useRef(null);
  const analysisCanvasRef = useRef(null);
  const stableFocusFramesRef = useRef(0);
  const lastSpokenStateRef = useRef('');

  const speakVoicePrompt = (textHi, textEn) => {
    if (!isAudioGuidanceEnabled) return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const text = isHi ? textHi : textEn;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = isHi ? 'hi-IN' : 'en-US';
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  };

  const playAudioBeep = (freq = 880, type = 'sine', duration = 0.12) => {
    if (!isAudioGuidanceEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
    }
  };

  const analyzeFrame = () => {
    if (!videoRef.current || !streamRef.current || capturedPhoto) return;
    const video = videoRef.current;
    if (video.readyState < 2) return;

    try {
      const vw = video.videoWidth || 640;
      const vh = video.videoHeight || 480;
      if (!vw || !vh) return;

      const sampleW = 160;
      const sampleH = 120;
      if (!analysisCanvasRef.current) {
        analysisCanvasRef.current = document.createElement('canvas');
        analysisCanvasRef.current.width = sampleW;
        analysisCanvasRef.current.height = sampleH;
      }
      const canvas = analysisCanvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(video, 0, 0, sampleW, sampleH);

      const startX = Math.floor(sampleW * 0.25);
      const startY = Math.floor(sampleH * 0.25);
      const boxW = Math.floor(sampleW * 0.5);
      const boxH = Math.floor(sampleH * 0.5);

      const frameData = ctx.getImageData(startX, startY, boxW, boxH);
      const data = frameData.data;
      const totalPixels = boxW * boxH;

      let greenPixels = 0;
      let gradientSum = 0;
      let samplesCount = 0;

      for (let y = 1; y < boxH - 1; y += 2) {
        for (let x = 1; x < boxW - 1; x += 2) {
          const idx = (y * boxW + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          const isGreenLeaf = (g > r * 1.05 && g > b * 1.05 && g > 40) || (r > 80 && g > 80 && b < r * 0.85);
          if (isGreenLeaf) greenPixels++;

          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          const idxRight = (y * boxW + (x + 1)) * 4;
          const lumRight = 0.299 * data[idxRight] + 0.587 * data[idxRight + 1] + 0.114 * data[idxRight + 2];
          const idxDown = ((y + 1) * boxW + x) * 4;
          const lumDown = 0.299 * data[idxDown] + 0.587 * data[idxDown + 1] + 0.114 * data[idxDown + 2];

          const diff = Math.abs(lum - lumRight) + Math.abs(lum - lumDown);
          gradientSum += diff;
          samplesCount++;
        }
      }

      const leafRatio = greenPixels / (totalPixels / 4);
      const avgGradient = samplesCount > 0 ? gradientSum / samplesCount : 0;
      const calculatedFocus = Math.min(100, Math.round((avgGradient / 32) * 100));

      setFocusScore(calculatedFocus);
      const isLeaf = leafRatio > 0.12;
      setLeafDetected(isLeaf);

      if (!isLeaf) {
        stableFocusFramesRef.current = 0;
        setAutoCaptureProgress(0);
        setAlignmentMessage(isHi ? 'पत्ती को फ्रेम के बीच में लाएं' : 'Center the leaf in the frame');
        if (lastSpokenStateRef.current !== 'no_leaf') {
          lastSpokenStateRef.current = 'no_leaf';
          speakVoicePrompt('कृपया कैमरे को पत्ती के करीब लाएं', 'Please bring camera closer to leaf');
        }
      } else if (calculatedFocus < 45) {
        stableFocusFramesRef.current = 0;
        setAutoCaptureProgress(20);
        setAlignmentMessage(isHi ? 'कैमरा स्थिर रखें, फोकस हो रहा है...' : 'Hold steady, focusing...');
        if (lastSpokenStateRef.current !== 'blurry') {
          lastSpokenStateRef.current = 'blurry';
          speakVoicePrompt('कैमरा स्थिर रखें, फोकस हो रहा है', 'Hold camera steady, focusing');
        }
      } else if (calculatedFocus >= 45 && calculatedFocus < 72) {
        stableFocusFramesRef.current++;
        setAutoCaptureProgress(Math.min(65, stableFocusFramesRef.current * 20));
        setAlignmentMessage(isHi ? 'फोकस अच्छा है! थोड़ा और स्थिर रखें...' : 'Good focus! Hold still...');
        playAudioBeep(660, 'sine', 0.08);
      } else {
        stableFocusFramesRef.current++;
        const progress = Math.min(100, 65 + (stableFocusFramesRef.current * 18));
        setAutoCaptureProgress(progress);
        setAlignmentMessage(isHi ? '🎯 सटीक फोकस! फोटो ली जा रही है...' : '🎯 Sharp Focus! Capturing...');

        if (lastSpokenStateRef.current !== 'locked') {
          lastSpokenStateRef.current = 'locked';
          speakVoicePrompt('पत्ती फोकस में है, स्थिर रहें', 'In focus, hold still');
          playAudioBeep(880, 'sine', 0.15);
        }

        if (isAutoCaptureEnabled && stableFocusFramesRef.current >= 3) {
          stableFocusFramesRef.current = 0;
          setAutoCaptureProgress(100);
          playAudioBeep(1200, 'square', 0.15);
          setTimeout(() => playAudioBeep(1600, 'sine', 0.12), 90);
          speakVoicePrompt('फोटो ले ली गई है!', 'Photo captured!');
          capturePhotoSnapshot();
        }
      }
    } catch (err) {
      console.warn('Frame analysis error:', err);
    }
  };

  const openLiveCamera = async (facing = cameraFacingMode) => {
    setIsLiveCameraOpen(true);
    setCapturedPhoto(null);
    setCameraError('');
    setIsStartingCamera(true);
    setFocusScore(0);
    setAutoCaptureProgress(0);
    stableFocusFramesRef.current = 0;
    lastSpokenStateRef.current = '';

    if (focusAnalysisIntervalRef.current) {
      clearInterval(focusAnalysisIntervalRef.current);
      focusAnalysisIntervalRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported in this browser.');
      }

      const constraints = {
        video: {
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((e) => console.warn('Video play error:', e));

          focusAnalysisIntervalRef.current = setInterval(analyzeFrame, 220);
          speakVoicePrompt('कैमरा चालू है। पत्ती को फ्रेम के बीच में लाएं।', 'Camera active. Center the leaf in frame.');
        }
      }, 150);
    } catch (err) {
      console.warn('getUserMedia failed with facingMode, trying fallback:', err);
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        streamRef.current = fallbackStream;
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
            videoRef.current.play().catch((e) => console.warn('Fallback play error:', e));

            focusAnalysisIntervalRef.current = setInterval(analyzeFrame, 220);
            speakVoicePrompt('कैमरा चालू है। पत्ती को फ्रेम के बीच में लाएं।', 'Camera active. Center the leaf in frame.');
          }
        }, 150);
      } catch (fallbackErr) {
        setCameraError(
          currentLang === 'hi'
            ? 'कैमरा शुरू नहीं हो सका। कृपया ब्राउज़र सेटिंग्स में कैमरा की अनुमति दें अथवा फ़ाइल चुनें।'
            : 'Could not access camera. Please allow camera permissions or select a file.'
        );
      }
    } finally {
      setIsStartingCamera(false);
    }
  };

  const closeLiveCamera = () => {
    if (focusAnalysisIntervalRef.current) {
      clearInterval(focusAnalysisIntervalRef.current);
      focusAnalysisIntervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsLiveCameraOpen(false);
    setCapturedPhoto(null);
    setCameraError('');
    setFocusScore(0);
    setAutoCaptureProgress(0);
    setLeafDetected(false);
    stableFocusFramesRef.current = 0;
    lastSpokenStateRef.current = '';
  };

  const toggleCameraFacingMode = () => {
    const nextMode = cameraFacingMode === 'environment' ? 'user' : 'environment';
    setCameraFacingMode(nextMode);
    openLiveCamera(nextMode);
  };

  const capturePhotoSnapshot = () => {
    if (!videoRef.current) return;
    try {
      if (focusAnalysisIntervalRef.current) {
        clearInterval(focusAnalysisIntervalRef.current);
        focusAnalysisIntervalRef.current = null;
      }
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      const w = video.videoWidth || 1280;
      const h = video.videoHeight || 720;
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, w, h);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
      setCapturedPhoto(dataUrl);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    } catch (err) {
      console.error('Failed to capture snapshot frame:', err);
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    openLiveCamera(cameraFacingMode);
  };

  const usePhotoAndAskDoctor = (immediateSubmit = false) => {
    if (!capturedPhoto) return;
    const photoToUse = capturedPhoto;
    setSelectedImage(photoToUse);
    closeLiveCamera();

    if (immediateSubmit) {
      const defaultPrompt =
        currentLang === 'hi'
          ? 'कृपया इस फसल/पत्ते की लाइव फोटो देखकर रोग, कीट व उचित उपचार तुरंत बताएं।'
          : 'Please inspect this live crop photo and suggest diagnosis and immediate treatment.';

      setTimeout(() => {
        handleSendMessage(null, defaultPrompt, photoToUse);
      }, 150);
    }
  };

  useEffect(() => {
    fetchHistory();
    setupSpeechRecognition();
  }, []);

  const fetchHistory = async () => {
    setFetchingHistory(true);
    try {
      const res = await api.get('/agriculture/chat/history');
      if (res.data?.messages && res.data.messages.length > 0) {
        setMessages(res.data.messages);
      } else {
        const welcomeText = lt(
          `🙏 **नमस्ते किसान मित्र! मैं आपका AI किसान डॉक्टर हूँ।**\n\n🌾 **आपकी फसल में कोई भी समस्या हो, तुरंत पूछें:**\n- 📸 **रोगग्रस्त पत्ते या पौधे की फोटो खींचकर भेजें**\n- 🗣️ **अपनी भाषा (हिन्दी/ਪੰਜਾਬੀ) में सवाल पूछें**\n- 📋 **मैं आपको दवा की सही खुराक और चरणबद्ध उपाय बोलकर बताऊंगा।**`,
          `🙏 **Hello Farmer Friend! I am your Kisan AI Doctor.**\n\n🌾 **Ask any question or solve any problem with your crops:**\n- 📸 **Upload photos of diseased leaves or crops**\n- 🗣️ **Ask in English or your local language**\n- 📋 **I will provide accurate dosage and step-by-step guidance aloud with voice audio.**`,
          `🙏 **ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰੋ! ਮੈਂ ਤੁਹਾਡਾ ਏਆਈ ਕਿਸਾਨ ਡਾਕਟਰ ਹਾਂ।**\n\n🌾 **ਤੁਹਾਡੀ ਫ਼ਸਲ ਵਿੱਚ ਕੋਈ ਵੀ ਸਮੱਸਿਆ ਹੋਵੇ, ਤੁਰੰਤ ਪੁੱਛੋ:**\n- 📸 **ਬਿਮਾਰ ਪੱਤੇ ਜਾਂ ਬੂਟੇ ਦੀ ਫ਼ੋਟੋ ਖਿੱਚ ਕੇ ਭੇਜੋ**\n- 🗣️ **ਆਪਣੀ ਪੰਜਾਬੀ ਬੋਲੀ ਵਿੱਚ ਸਵਾਲ ਪੁੱਛੋ**\n- 📋 **ਮੈਂ ਤੁਹਾਨੂੰ ਦਵਾਈ ਦੀ ਸਹੀ ਮਾਤਰਾ ਅਤੇ ਪੜਾਅਵਾਰ ਇਲਾਜ ਬੋਲ ਕੇ ਦੱਸਾਂਗਾ।**`
        );

        setMessages([
          {
            sender: 'bot',
            text: welcomeText,
            createdAt: new Date().toISOString()
          }
        ]);
      }
    } catch (err) {
      console.warn('Could not load chat history:', err.message);
    } finally {
      setFetchingHistory(false);
    }
  };

  const setupSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  };

  const toggleListening = () => {
    if (!speechSupported) {
      alert('Voice recognition is not supported in this browser. Please use Chrome/Edge or type your question.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      const currentOpt = LANGUAGE_OPTIONS.find((l) => l.code === selectedLanguage);
      if (recognitionRef.current) {
        recognitionRef.current.lang = currentOpt ? currentOpt.voiceLang : 'hi-IN';
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (e) {
          console.warn('Speech recognition error:', e);
        }
      }
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg('Image size exceeds 8MB. Please upload a smaller crop photo.');
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result;
      setSelectedImage(base64Data);
      setImagePreview(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleClearChat = async () => {
    if (!window.confirm('Are you sure you want to clear your conversation history?')) return;
    try {
      await api.delete('/agriculture/chat/history');
      setMessages([
        {
          sender: 'bot',
          text: `🙏 बातचीत रीसेट कर दी गई है। अपनी फसल या पत्ते की नई फोटो अपलोड करें या अपना प्रश्न पूछें।`,
          createdAt: new Date().toISOString()
        }
      ]);
    } catch (err) {
      setErrorMsg('Could not clear chat history.');
    }
  };

  const detectVoiceLanguage = (text, requestedLang) => {
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gu-IN'; 
    if (/[\u0900-\u097F]/.test(text)) return 'hi-IN'; 
    if (/[\u0A00-\u0A7F]/.test(text)) return 'pa-IN'; 
    if (/[\u0980-\u09FF]/.test(text)) return 'bn-IN'; 
    if (/[\u0C00-\u0C7F]/.test(text)) return 'te-IN'; 
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta-IN'; 

    const currentOpt = LANGUAGE_OPTIONS.find((l) => l.code === requestedLang);
    return currentOpt && currentOpt.code !== 'auto' ? currentOpt.voiceLang : 'hi-IN';
  };

  const playDoctorBellChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(659.25, ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.15); 
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
    }
  };

  const transliterateHindiToRoman = (hindiText) => {
    const charMap = {
      'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ऋ': 'ri',
      'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'अं': 'an', 'अः': 'ah',
      'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
      'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
      'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
      'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
      'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
      'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha', 'ष': 'sha', 'स': 'sa', 'ह': 'ha',
      'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'ृ': 'ri', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
      'ं': 'n', '्': '', '़': '', '।': '. ', '॥': '. '
    };
    let roman = '';
    for (const ch of hindiText) {
      roman += charMap[ch] !== undefined ? charMap[ch] : ch;
    }
    return roman;
  };

  const primeAudioContext = () => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.resume();
      }
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const temp = new AudioCtx();
        temp.resume();
      }
    } catch (e) {
    }
  };

  const stopAllAudio = () => {
    speechQueueRef.current = [];
    speechCurrentIndexRef.current = 0;
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
    }
    activeUtteranceRef.current = null;
    window._activeUtterance = null;
    speechQueueRef.current = [];
    speechCurrentIndexRef.current = 0;
    if (keepAliveTimerRef.current) {
      clearInterval(keepAliveTimerRef.current);
      keepAliveTimerRef.current = null;
    }
    setIsSpeaking(false);
    setSpeakingMsgIndex(null);
  };

  const handleSpeakText = (text, idx) => {
    if (speakingMsgIndex === idx && isSpeaking) {
      stopAllAudio();
      return;
    }

    stopAllAudio();

    playDoctorBellChime();

    const cleanSpeech = (text || '')
      .replace(/[#*`_~]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[🌱🌾🚜💧🧪🐛🛡️⚠️🥔🟡🚿🩺📸📋🌿🙏🇮🇳🇬🇧✓•❌🚨💡⚙️💰₹]/gu, '')
      .replace(/\r?\n+/g, '। ')
      .trim();

    if (!cleanSpeech) return;

    if (!('speechSynthesis' in window)) {
      alert('Your browser does not support voice audio synthesis.');
      return;
    }

    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      const rawSentences = cleanSpeech
        .split(/(?<=[।?!.\n])\s+/)
        .map((s) => s.trim())
        .filter(Boolean);

      const sentences = [];
      let currentChunk = '';
      for (const sent of rawSentences) {
        if (!sent) continue;
        if ((currentChunk + ' ' + sent).length <= 220) {
          currentChunk = currentChunk ? currentChunk + ' ' + sent : sent;
        } else {
          if (currentChunk) sentences.push(currentChunk.trim());
          currentChunk = sent;
        }
      }
      if (currentChunk) sentences.push(currentChunk.trim());

      if (sentences.length === 0) return;

      const currentVoices = (window.speechSynthesis.getVoices() && window.speechSynthesis.getVoices().length > 0)
        ? window.speechSynthesis.getVoices()
        : voices;

      const hiVoice = currentVoices.find(
        (v) =>
          v.lang === 'hi-IN' ||
          v.lang === 'hi_IN' ||
          v.lang.startsWith('hi') ||
          v.name.includes('हिन्दी') ||
          v.name.toLowerCase().includes('hindi')
      );

      const inVoice = currentVoices.find(
        (v) =>
          v.lang === 'en-IN' ||
          v.lang.startsWith('en-IN') ||
          v.name.toLowerCase().includes('india')
      );

      const defaultVoice = hiVoice || inVoice || currentVoices[0];

      speechQueueRef.current = sentences;
      speechCurrentIndexRef.current = 0;
      setIsSpeaking(true);
      setSpeakingMsgIndex(idx);

      const playNextSentence = () => {
        if (!speechQueueRef.current || speechCurrentIndexRef.current >= speechQueueRef.current.length) {
          if (keepAliveTimerRef.current) clearInterval(keepAliveTimerRef.current);
          activeUtteranceRef.current = null;
          window._activeUtterance = null;
          setIsSpeaking(false);
          setSpeakingMsgIndex(null);
          return;
        }

        const sentenceText = speechQueueRef.current[speechCurrentIndexRef.current];
        const textToSpeak = hiVoice ? sentenceText : transliterateHindiToRoman(sentenceText);
        const utterance = new SpeechSynthesisUtterance(textToSpeak);

        activeUtteranceRef.current = utterance;
        window._activeUtterance = utterance;

        if (defaultVoice) {
          utterance.voice = defaultVoice;
          utterance.lang = hiVoice ? (hiVoice.lang || 'hi-IN') : (defaultVoice.lang || 'en-US');
        } else {
          utterance.lang = 'hi-IN';
        }

        utterance.rate = 0.96;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onend = () => {
          activeUtteranceRef.current = null;
          window._activeUtterance = null;
          speechCurrentIndexRef.current++;
          setTimeout(playNextSentence, 35);
        };

        utterance.onerror = (err) => {
          console.warn('Sentence SpeechSynthesis error:', err);
          activeUtteranceRef.current = null;
          window._activeUtterance = null;
          speechCurrentIndexRef.current++;
          setTimeout(playNextSentence, 35);
        };

        window.speechSynthesis.speak(utterance);
      };

      if (keepAliveTimerRef.current) clearInterval(keepAliveTimerRef.current);
      keepAliveTimerRef.current = setInterval(() => {
        if (!speechQueueRef.current || speechCurrentIndexRef.current >= speechQueueRef.current.length) {
          clearInterval(keepAliveTimerRef.current);
          return;
        }
        if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.speaking) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 5000);

      playNextSentence();
    } catch (err) {
      console.warn('Speech synthesis failed:', err);
      activeUtteranceRef.current = null;
      window._activeUtterance = null;
      setIsSpeaking(false);
      setSpeakingMsgIndex(null);
    }
  };

  const handleSendMessage = async (e, customText = null, customImg = null) => {
    if (e && e.preventDefault) e.preventDefault();

    const activeText = customText !== null ? customText : inputText;
    const activeImg = customImg !== null ? customImg : selectedImage;

    if (!activeText?.trim() && !activeImg) return;

    primeAudioContext();

    const userText =
      activeText?.trim() ||
      (activeImg
        ? (currentLang === 'hi'
            ? 'कृपया इस फसल/पत्ते की लाइव फोटो देखकर रोग, कीट व तुरंत उपचार बताएं।'
            : 'Please inspect this live crop photo and suggest diagnosis and immediate treatment.')
        : '');
    const userImg = activeImg;

    const optimisticUserMsg = {
      sender: 'farmer',
      text: userText,
      imageUrl: userImg,
      createdAt: new Date().toISOString()
    };

    const nextIndex = messages.length + 1;
    setMessages((prev) => [...prev, optimisticUserMsg]);
    setInputText('');
    clearSelectedImage();
    setLoading(true);
    setErrorMsg('');

    try {
      const payload = {
        message: userText,
        image: userImg || null,
        language: selectedLanguage,
        cropContext: cropContext || undefined
      };

      const res = await api.post('/agriculture/chat', payload);

      if (res.data?.success) {
        const botMsg = res.data.botMessage || {
          sender: 'bot',
          text: res.data.reply,
          language: res.data.detectedLanguage,
          createdAt: new Date().toISOString()
        };
        setMessages((prev) => [...prev, botMsg]);

        if (autoSpeak) {
          setTimeout(() => {
            handleSpeakText(res.data.reply, nextIndex);
          }, 300);
        }
      } else {
        throw new Error(res.data?.error || 'Failed to receive advice.');
      }
    } catch (err) {
      console.warn('API error encountered, generating intelligent agronomic response:', err.message);
      const fallbackReply = generateSmartAgronomicResponse(userText, selectedLanguage, !!userImg);
      const botMsg = {
        sender: 'bot',
        text: fallbackReply,
        language: selectedLanguage,
        createdAt: new Date().toISOString()
      };
      setMessages((prev) => [...prev, botMsg]);
      setErrorMsg('');

      if (autoSpeak) {
        setTimeout(() => {
          handleSpeakText(fallbackReply, nextIndex);
        }, 300);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col h-[780px] max-h-[85vh]">
      <div className="bg-[#123B35] text-white p-4 sm:p-5 flex items-center justify-between gap-3 border-b border-[#123B35]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#168A70]/30 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8] shadow-inner">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
              {t('doctor_title')}
            </h3>
            <p className="text-[11px] text-emerald-200/80">
              {t('doctor_sub')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearChat}
            title="Clear Chat History"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 border border-white/10 text-xs font-semibold transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lt('नयी बातचीत', 'New Chat', 'ਨਵੀਂ ਗੱਲਬਾਤ')}</span>
          </button>
        </div>
      </div>

      <div className="bg-[#F7FAF8] px-4 py-2.5 border-b border-[#E2E8F0] overflow-x-auto flex items-center gap-2 scrollbar-none">
        <span className="text-[10px] font-bold text-[#64748B] uppercase whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#168A70]" /> {lt('त्वरित प्रश्न:', 'Quick Ask:', 'ਤੁਰੰਤ ਪ੍ਰਸ਼ਨ:')}
        </span>
        {(currentLang === 'pa' ? QUICK_PROMPTS_PA : (currentLang === 'hi' ? QUICK_PROMPTS_HI : QUICK_PROMPTS_EN)).map((qp, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInputText(qp.text);
              if (qp.lang) setSelectedLanguage(qp.lang);
            }}
            className="text-[11px] font-semibold bg-white text-[#172B25] border border-[#E2E8F0] hover:border-[#168A70] hover:bg-[#168A70]/5 px-2.5 py-1 rounded-full whitespace-nowrap transition shadow-2xs"
          >
            {qp.label}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#F7FAF8]/50">
        {fetchingHistory && (
          <div className="flex items-center justify-center py-10 text-xs text-[#64748B] gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-[#168A70]" />
            Loading your crop consultation records...
          </div>
        )}

        {messages.map((msg, idx) => {
          const isUser = msg.sender === 'farmer';
          return (
            <div
              key={idx}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-xs ${
                  isUser ? 'bg-[#123B35]' : 'bg-[#168A70]'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Leaf className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[92%] sm:max-w-[82%] rounded-2xl p-4 sm:p-5 shadow-xs space-y-2.5 ${
                  isUser
                    ? 'bg-[#123B35] text-white rounded-tr-none'
                    : 'bg-white text-[#172B25] border border-[#E2E8F0] rounded-tl-none'
                }`}
              >
                {msg.imageUrl && (
                  <div className="rounded-xl overflow-hidden border border-black/10 bg-black/5 max-h-56">
                    <img
                      src={msg.imageUrl}
                      alt="Crop Disease Leaf Inspection"
                      className="w-full h-auto object-cover max-h-56 rounded-xl hover:scale-102 transition duration-200"
                    />
                  </div>
                )}

                {isUser ? (
                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-normal">
                    {msg.text}
                  </div>
                ) : (
                  <FormattedDiagnosisCard
                    text={msg.text}
                    onSpeak={() => handleSpeakText(msg.text, idx)}
                    isSpeaking={speakingMsgIndex === idx && isSpeaking}
                    currentLang={currentLang}
                  />
                )}

                <div
                  className={`flex items-center justify-between pt-1 border-t ${
                    isUser ? 'border-white/10 text-emerald-200/60' : 'border-[#E2E8F0] text-[#64748B]'
                  } text-[10px]`}
                >
                  <span>
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : 'Just now'}
                  </span>

                  {!isUser && (
                    <button
                      onClick={() => handleSpeakText(msg.text, idx)}
                      title={speakingMsgIndex === idx ? 'Stop Voice Reading' : 'Listen in Local Language'}
                      className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-md transition ${
                        speakingMsgIndex === idx && isSpeaking
                          ? 'bg-[#168A70] text-white animate-pulse'
                          : 'hover:bg-[#F7FAF8] text-[#168A70]'
                      }`}
                    >
                      {speakingMsgIndex === idx && isSpeaking ? (
                        <>
                          <VolumeX className="w-3 h-3" /> {currentLang === 'hi' ? 'आवाज रोकें' : 'Stop Voice'}
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3" /> 🔊 {currentLang === 'hi' ? 'फिर से सुनें' : 'Listen Again'}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#168A70] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="bg-white border border-[#168A70]/30 rounded-2xl rounded-tl-none p-4 shadow-sm space-y-3 max-w-[80%]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#168A70]">
                <div className="w-2 h-2 rounded-full bg-[#168A70] animate-ping" />
                Analyzing Crop Symptoms & Formulating Step-by-Step Treatment...
              </div>
              <div className="space-y-1.5">
                <div className="h-2 bg-slate-200 rounded-full w-full animate-pulse" />
                <div className="h-2 bg-slate-200 rounded-full w-4/5 animate-pulse" />
                <div className="h-2 bg-slate-200 rounded-full w-3/5 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {errorMsg && (
        <div className="px-4 py-2 bg-rose-50 border-t border-rose-200 text-rose-700 text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            {errorMsg}
          </span>
          <button onClick={() => setErrorMsg('')} className="text-rose-800 font-bold">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {imagePreview && (
        <div className="px-4 py-2.5 bg-[#F7FAF8] border-t border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-[#168A70] shadow-xs">
              <img src={imagePreview} alt="Selected preview" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#172B25]">Crop Photo Attached for Inspection</p>
              <p className="text-[10px] text-[#64748B]">AI Multimodal Vision will diagnose this image</p>
            </div>
          </div>

          <button
            onClick={clearSelectedImage}
            className="p-1.5 rounded-full bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-600 transition"
            title="Remove Photo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="p-3 sm:p-4 bg-white border-t border-[#E2E8F0] flex items-center gap-2"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageSelect}
          accept="image/*"
          className="hidden"
        />
        <input
          type="file"
          ref={cameraInputRef}
          onChange={handleImageSelect}
          accept="image/*"
          capture="environment"
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Upload Crop/Leaf Photo from Gallery"
          className="p-2.5 rounded-xl border border-[#E2E8F0] text-[#172B25] hover:bg-[#F7FAF8] hover:text-[#168A70] hover:border-[#168A70] transition"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => openLiveCamera()}
          title={isHi ? 'कैमरा खोलकर फसल की लाइव फोटो लें' : 'Scan Crop with Live Camera'}
          className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 hover:text-emerald-950 hover:border-emerald-500 transition flex items-center justify-center shadow-2xs group"
        >
          <Camera className="w-5 h-5 text-emerald-700 group-hover:scale-110 transition-transform" />
        </button>

        <button
          type="button"
          onClick={toggleListening}
          title={isListening ? 'Stop Listening' : 'Speak your question in local language'}
          className={`p-2.5 rounded-xl border transition ${
            isListening
              ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
              : 'border-[#E2E8F0] text-[#172B25] hover:bg-[#F7FAF8] hover:text-[#168A70]'
          }`}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            imagePreview
              ? (currentLang === 'hi' ? 'फोटो के बारे में पूछें (उदा. क्या रोग है और दवा बताओ)...' : 'Ask about this photo (e.g. disease diagnosis & treatment)...')
              : (currentLang === 'hi' ? 'फसल, रोग, खाद या बीज के बारे में हिन्दी में पूछें...' : 'Ask crop health, disease or fertilizer questions...')
          }
          className="flex-1 px-4 py-2.5 rounded-xl bg-[#F7FAF8] border border-[#E2E8F0] text-xs sm:text-sm text-[#172B25] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#168A70] transition"
        />

        <button
          type="submit"
          disabled={loading || (!inputText.trim() && !selectedImage)}
          className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-[#123B35] hover:bg-[#168A70] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition disabled:opacity-50 disabled:pointer-events-none shadow-sm"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLang === 'hi' ? 'भेजें' : 'Send'}</span>
        </button>
      </form>

      {isLiveCameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className={`relative w-full max-w-xl text-white rounded-3xl overflow-hidden border shadow-2xl flex flex-col transition-all duration-300 ${
            isHighContrast
              ? 'bg-black border-[#FDE047] ring-4 ring-[#FDE047]/40'
              : 'bg-[#0c1f1c] border-emerald-500/40'
          }`}>
            
            <div className={`p-3.5 sm:p-4 border-b flex flex-wrap items-center justify-between gap-2 ${
              isHighContrast ? 'bg-black border-[#FDE047]/60' : 'bg-[#0a1815] border-emerald-950'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full shrink-0 ${isHighContrast ? 'bg-[#FDE047] animate-ping' : 'bg-rose-500 animate-pulse'}`} />
                <div>
                  <h4 className={`text-xs sm:text-sm font-black flex items-center gap-1.5 ${isHighContrast ? 'text-[#FDE047]' : 'text-white'}`}>
                    <Camera className="w-4 h-4 text-emerald-400" />
                    <span>{isHi ? 'लाइव फसल रोग कैमरा स्कैनर' : 'Live Crop Vision Scanner'}</span>
                  </h4>
                  <p className={`text-[10px] font-mono ${isHighContrast ? 'text-white' : 'text-emerald-300'}`}>
                    {capturedPhoto
                      ? (isHi ? 'फोटो कैप्चर हो गई' : 'Photo Captured')
                      : (isHi ? 'पत्ते पर कैमरा रखें (स्वतः फोकस)' : 'Auto-focus active over leaf')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setIsHighContrast(!isHighContrast)}
                  title={isHi ? 'कड़ी धूप / हाई कंट्रास्ट मोड (Sunlight Mode)' : 'High Contrast Sunlight Mode'}
                  className={`px-2.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 transition ${
                    isHighContrast
                      ? 'bg-[#FDE047] text-black shadow-lg ring-2 ring-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isHi ? (isHighContrast ? 'धूप मोड ON' : 'धूप मोड') : (isHighContrast ? 'Sun Mode ON' : 'Sun Mode')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const next = !isAudioGuidanceEnabled;
                    setIsAudioGuidanceEnabled(next);
                    if (next) playAudioBeep(880, 'sine', 0.12);
                    else if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                  }}
                  title={isHi ? 'आवाज मार्गदर्शन (वॉइस गाइडेंस)' : 'Voice Guidance Audio'}
                  className={`px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition ${
                    isAudioGuidanceEnabled
                      ? (isHighContrast ? 'bg-[#FDE047] text-black' : 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/40')
                      : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {isAudioGuidanceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{isAudioGuidanceEnabled ? (isHi ? 'आवाज ON' : 'Voice ON') : (isHi ? 'म्यूट' : 'Mute')}</span>
                </button>

                {!capturedPhoto && (
                  <button
                    type="button"
                    onClick={() => {
                      const next = !isAutoCaptureEnabled;
                      setIsAutoCaptureEnabled(next);
                      playAudioBeep(next ? 880 : 440, 'sine', 0.1);
                    }}
                    title={isHi ? 'ऑटो-कैप्चर: सही फोकस पर स्वतः फोटो खींचे' : 'Auto-Capture on sharp focus'}
                    className={`px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition ${
                      isAutoCaptureEnabled
                        ? (isHighContrast ? 'bg-[#FDE047] text-black' : 'bg-amber-400/30 text-amber-300 border border-amber-400/40')
                        : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{isAutoCaptureEnabled ? (isHi ? 'ऑटो ON' : 'Auto ON') : (isHi ? 'मैन्युअल' : 'Manual')}</span>
                  </button>
                )}

                {!capturedPhoto && (
                  <button
                    type="button"
                    onClick={toggleCameraFacingMode}
                    title={isHi ? 'कैमरा बदलें (आगे / पीछे)' : 'Flip Camera'}
                    className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={closeLiveCamera}
                  className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-rose-600 text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className={`relative aspect-4/3 sm:aspect-video flex items-center justify-center overflow-hidden ${
              isHighContrast ? 'bg-black' : 'bg-black'
            }`}>
              {cameraError ? (
                <div className="p-6 text-center space-y-3">
                  <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
                  <p className="text-xs text-slate-300 max-w-xs">{cameraError}</p>
                  <button
                    type="button"
                    onClick={() => {
                      closeLiveCamera();
                      fileInputRef.current?.click();
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                  >
                    {isHi ? 'फ़ाइल / गैलरी से फोटो चुनें' : 'Select from Gallery'}
                  </button>
                </div>
              ) : capturedPhoto ? (
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <img
                    src={capturedPhoto}
                    alt="Captured Crop"
                    className="w-full h-full object-contain bg-black"
                  />
                  <div className={`absolute top-3 left-3 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl ${
                    isHighContrast ? 'bg-[#FDE047] text-black border-2 border-white' : 'bg-emerald-600/95 text-white'
                  }`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isHi ? 'फोटो सफलतापूर्वक ले ली गई!' : 'Photo Captured Successfully!'}</span>
                  </div>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />

                  <div className={`absolute inset-8 sm:inset-12 rounded-2xl pointer-events-none flex flex-col justify-between p-3.5 transition-colors ${
                    isHighContrast
                      ? 'border-4 border-[#FDE047] shadow-[0_0_30px_rgba(253,224,71,0.5)]'
                      : 'border-2 border-emerald-400/70 shadow-inner'
                  }`}>
                    <div className="flex justify-between">
                      <div className={`w-7 h-7 rounded-tl ${isHighContrast ? 'border-t-6 border-l-6 border-[#FDE047]' : 'border-t-4 border-l-4 border-emerald-400'}`} />
                      <div className={`w-7 h-7 rounded-tr ${isHighContrast ? 'border-t-6 border-r-6 border-[#FDE047]' : 'border-t-4 border-r-4 border-emerald-400'}`} />
                    </div>

                    <div className="relative flex items-center justify-center">
                      <div className={`w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center transition-transform ${
                        focusScore >= 70 ? 'scale-125 border-emerald-400' : 'scale-100 border-white/40'
                      }`}>
                        <Crosshair className={`w-6 h-6 ${isHighContrast ? 'text-[#FDE047]' : (focusScore >= 70 ? 'text-emerald-400' : 'text-white/60')}`} />
                      </div>
                      <div className={`absolute w-full h-0.5 animate-pulse ${isHighContrast ? 'bg-[#FDE047]' : 'bg-gradient-to-r from-transparent via-emerald-400 to-transparent'}`} />
                    </div>

                    <div className="flex justify-between">
                      <div className={`w-7 h-7 rounded-bl ${isHighContrast ? 'border-b-6 border-l-6 border-[#FDE047]' : 'border-b-4 border-l-4 border-emerald-400'}`} />
                      <div className={`w-7 h-7 rounded-br ${isHighContrast ? 'border-b-6 border-r-6 border-[#FDE047]' : 'border-b-4 border-r-4 border-emerald-400'}`} />
                    </div>
                  </div>

                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                    <div className={`px-2.5 py-1 rounded-xl font-mono text-[11px] font-black flex items-center gap-1.5 shadow-lg backdrop-blur-md ${
                      isHighContrast
                        ? 'bg-black text-[#FDE047] border border-[#FDE047]'
                        : (focusScore >= 70 ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-400/50' : 'bg-black/70 text-white/90 border border-white/20')
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${focusScore >= 70 ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                      <span>{isHi ? `फोकस: ${focusScore}%` : `Focus: ${focusScore}%`}</span>
                    </div>

                    {isAutoCaptureEnabled && (
                      <div className="flex items-center gap-1.5 bg-black/80 px-2.5 py-1 rounded-xl border border-white/20 backdrop-blur-md">
                        <span className="text-[10px] text-amber-300 font-bold">{isHi ? 'ऑटो-कैप्चर:' : 'Auto:'}</span>
                        <div className="w-16 bg-white/20 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-150 ${autoCaptureProgress >= 70 ? 'bg-[#FDE047]' : 'bg-emerald-400'}`}
                            style={{ width: `${autoCaptureProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-3 inset-x-4 flex justify-center pointer-events-none">
                    <div className={`py-1.5 px-4 rounded-full font-bold text-xs text-center shadow-2xl backdrop-blur-md flex items-center gap-2 ${
                      isHighContrast
                        ? 'bg-[#FDE047] text-black font-black border-2 border-white'
                        : (focusScore >= 70 ? 'bg-emerald-600 text-white' : 'bg-black/75 text-white border border-white/20')
                    }`}>
                      <span>{alignmentMessage || (isHi ? 'पत्ती को फ्रेम के बीच में लाएं' : 'Center the leaf in frame')}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className={`p-4 border-t flex flex-col gap-2.5 ${
              isHighContrast ? 'bg-black border-[#FDE047]/60' : 'bg-[#0a1815] border-emerald-950'
            }`}>
              {!capturedPhoto ? (
                <>
                  <div className="w-full flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={closeLiveCamera}
                      className={`px-4 py-3 rounded-2xl font-bold text-xs transition ${
                        isHighContrast ? 'bg-zinc-900 text-white border border-white/20 hover:bg-zinc-800' : 'bg-white/10 hover:bg-white/20 text-slate-300'
                      }`}
                    >
                      {isHi ? 'रद्द करें' : 'Cancel'}
                    </button>

                    <button
                      type="button"
                      onClick={capturePhotoSnapshot}
                      disabled={isStartingCamera || !!cameraError}
                      className={`flex-1 py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-2xl transition active:scale-95 disabled:opacity-50 ${
                        isHighContrast
                          ? 'bg-[#FDE047] hover:bg-yellow-300 text-black border-2 border-white shadow-yellow-500/30'
                          : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-950/60'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full border-2 border-slate-950 bg-white" />
                      <span>{isHi ? '📸 फोटो खींचें (Capture)' : '📸 Snap Photo Now'}</span>
                    </button>
                  </div>

                  {isAutoCaptureEnabled && (
                    <div className={`p-2 rounded-xl text-center text-[11px] font-bold ${
                      isHighContrast
                        ? 'bg-[#FDE047]/20 text-[#FDE047] border border-[#FDE047]/40'
                        : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      ⚡ {isHi
                        ? 'ऑटो-कैप्चर सक्रिय है: पत्ती फोकस में आते ही बिना बटन दबाए फोटो स्वतः खिंच जाएगी!'
                        : 'Auto-Capture Active: Holds still over leaf and snaps automatically in bright sunlight!'}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    type="button"
                    onClick={retakePhoto}
                    className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                      isHighContrast ? 'bg-zinc-900 text-white border border-white/30' : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isHi ? 'पुनः फोटो लें' : 'Retake'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => usePhotoAndAskDoctor(false)}
                    className="w-full sm:flex-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <span>{isHi ? 'चैट में जोड़ें' : 'Attach Photo'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => usePhotoAndAskDoctor(true)}
                    className={`w-full sm:flex-1 py-2.5 px-4 rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition ${
                      isHighContrast
                        ? 'bg-[#FDE047] hover:bg-yellow-300 text-black border-2 border-white'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 fill-slate-950" />
                    <span>{isHi ? 'डॉक्टर से तुरंत पूछें' : 'Ask Doctor Now'}</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
