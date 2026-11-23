

export const STORAGE_KEYS = {
  MANDI_CACHE: 'cp_offline_mandi_cache',
  CROP_GUIDANCE: 'cp_offline_crop_guidance',
  SYNC_QUEUE: 'cp_offline_sync_queue',
  LAST_SYNCED: 'cp_offline_last_synced',
  COMMUNITY_STORIES: 'cp_farmer_community_stories',
  SAVINGS_HISTORY: 'cp_savings_calc_history'
};

export const DEFAULT_OFFLINE_MANDI = [
  {
    commodity: 'Wheat',
    commodityHi: 'गेहूँ',
    msp: 2275,
    records: [
      { market: 'Khanna (Punjab)', district: 'Ludhiana', state: 'Punjab', minPrice: 2320, maxPrice: 2480, modalPrice: 2410, trend: 'up' },
      { market: 'Indore APMC', district: 'Indore', state: 'Madhya Pradesh', minPrice: 2400, maxPrice: 2750, modalPrice: 2620, trend: 'up' },
      { market: 'Karnal Mandi', district: 'Karnal', state: 'Haryana', minPrice: 2280, maxPrice: 2420, modalPrice: 2360, trend: 'stable' },
      { market: 'Kota APMC', district: 'Kota', state: 'Rajasthan', minPrice: 2300, maxPrice: 2510, modalPrice: 2430, trend: 'up' },
      { market: 'Varanasi PACS', district: 'Varanasi', state: 'Uttar Pradesh', minPrice: 2275, maxPrice: 2350, modalPrice: 2310, trend: 'stable' }
    ]
  },
  {
    commodity: 'Rice / Paddy',
    commodityHi: 'धान (चावल)',
    msp: 2183,
    records: [
      { market: 'Gondia APMC', district: 'Gondia', state: 'Maharashtra', minPrice: 2250, maxPrice: 2580, modalPrice: 2460, trend: 'up' },
      { market: 'Burdwan Mandi', district: 'Purba Bardhaman', state: 'West Bengal', minPrice: 2200, maxPrice: 2420, modalPrice: 2350, trend: 'up' },
      { market: 'Karnal Mandi', district: 'Karnal', state: 'Haryana', minPrice: 2300, maxPrice: 3800, modalPrice: 3500, trend: 'up' }, 
      { market: 'Bhatapara APMC', district: 'Baloda Bazar', state: 'Chhattisgarh', minPrice: 2183, maxPrice: 2340, modalPrice: 2280, trend: 'stable' }
    ]
  },
  {
    commodity: 'Mustard',
    commodityHi: 'सरसों',
    msp: 5650,
    records: [
      { market: 'Bharatpur APMC', district: 'Bharatpur', state: 'Rajasthan', minPrice: 5750, maxPrice: 6200, modalPrice: 6020, trend: 'up' },
      { market: 'Alwar Mandi', district: 'Alwar', state: 'Rajasthan', minPrice: 5700, maxPrice: 6150, modalPrice: 5980, trend: 'up' },
      { market: 'Morena Mandi', district: 'Morena', state: 'Madhya Pradesh', minPrice: 5650, maxPrice: 6050, modalPrice: 5890, trend: 'stable' }
    ]
  },
  {
    commodity: 'Cotton',
    commodityHi: 'कपास (नरमा)',
    msp: 6620,
    records: [
      { market: 'Rajkot APMC', district: 'Rajkot', state: 'Gujarat', minPrice: 7100, maxPrice: 7850, modalPrice: 7520, trend: 'up' },
      { market: 'Abohar Mandi', district: 'Fazilka', state: 'Punjab', minPrice: 6900, maxPrice: 7600, modalPrice: 7350, trend: 'up' },
      { market: 'Warangal Mandi', district: 'Warangal', state: 'Telangana', minPrice: 6800, maxPrice: 7450, modalPrice: 7210, trend: 'stable' }
    ]
  },
  {
    commodity: 'Soybean',
    commodityHi: 'सोयाबीन',
    msp: 4600,
    records: [
      { market: 'Indore APMC', district: 'Indore', state: 'Madhya Pradesh', minPrice: 4700, maxPrice: 5100, modalPrice: 4890, trend: 'up' },
      { market: 'Ujjain Mandi', district: 'Ujjain', state: 'Madhya Pradesh', minPrice: 4650, maxPrice: 5020, modalPrice: 4840, trend: 'up' },
      { market: 'Latur APMC', district: 'Latur', state: 'Maharashtra', minPrice: 4680, maxPrice: 5080, modalPrice: 4910, trend: 'up' }
    ]
  },
  {
    commodity: 'Potato',
    commodityHi: 'आलू',
    msp: 1100,
    records: [
      { market: 'Agra Mandi', district: 'Agra', state: 'Uttar Pradesh', minPrice: 1250, maxPrice: 1650, modalPrice: 1480, trend: 'up' },
      { market: 'Jalandhar APMC', district: 'Jalandhar', state: 'Punjab', minPrice: 1150, maxPrice: 1550, modalPrice: 1390, trend: 'stable' },
      { market: 'Hooghly Mandi', district: 'Hooghly', state: 'West Bengal', minPrice: 1300, maxPrice: 1720, modalPrice: 1540, trend: 'up' }
    ]
  }
];

export const DEFAULT_OFFLINE_GUIDANCE = [
  {
    id: 'wheat-yellow-rust',
    crop: 'Wheat',
    cropHi: 'गेहूँ',
    disease: 'Yellow Rust (Puccinia striiformis)',
    diseaseHi: 'पीला रतुआ (हल्दी रोग)',
    symptoms: 'Bright yellow powdery pustules arranged in linear stripes along leaf veins. Dust rubs off on fingers like turmeric powder.',
    symptomsHi: 'पत्तियों की नसों पर पीले रंग की धारियां और हल्दी जैसा पाउडर बनता है जो उंगली लगाने पर छूटता है।',
    chemicalCure: 'Propiconazole 25% EC (Tilt) @ 1 ml per litre of water (200 ml in 200L water per acre). Repeat after 15 days if required.',
    chemicalCureHi: 'प्रोपिकोनाज़ोल 25% EC (टिल्ट) @ 1 मिली प्रति लीटर पानी (200 मिली प्रति एकड़ 200 लीटर पानी में)। 15 दिन बाद आवश्यकता पड़ने पर दोहराएं।',
    organicCure: 'Spray 5% Neem Seed Kernel Extract (NSKE) or Sour Buttermilk (5L fermented buttermilk + 150L water) during early symptom onset.',
    organicCureHi: '5% नीम के बीज का अर्क (NSKE) या खट्टी छाछ (5 लीटर 5 दिन पुरानी छाछ + 150 लीटर पानी) का छिड़काव करें।',
    urgency: 'CRITICAL',
    urgencyHi: 'अति-गंभीर',
    savingsImpact: '₹4,500 - ₹8,000 / एकड़ फसल बर्बादी से बचाव'
  },
  {
    id: 'paddy-blast',
    crop: 'Paddy / Rice',
    cropHi: 'धान (चावल)',
    disease: 'Leaf Blast & Neck Blast (Magnaporthe oryzae)',
    diseaseHi: 'झुलसा रोग (ब्लास्ट / गर्दन तोड़)',
    symptoms: 'Spindle-shaped elliptical lesions with brown borders and grayish-white centers on leaves. Blackening at the panicle neck causes hanging grains.',
    symptomsHi: 'पत्तियों पर नाव के आकार के बीच में धूसर और किनारों पर भूरे धब्बे। बालियों की गर्दन काली पड़कर लटक जाती है।',
    chemicalCure: 'Tricyclazole 75% WP (Baan) @ 0.6 g/L or Azoxystrobin + Difenoconazole @ 1 ml/L. Spray at boot leaf stage.',
    chemicalCureHi: 'ट्राइसाइक्लाज़ोल 75% WP (बान) @ 0.6 ग्राम प्रति लीटर या एज़ोक्सीस्ट्रोबिन + डिफेनोकोनाज़ोल @ 1 मिली प्रति लीटर।',
    organicCure: 'Seed treatment with Pseudomonas fluorescens @ 10 g/kg seed. Foliar spray of cow urine formulation (1:10 ratio with water).',
    organicCureHi: 'स्यूडोमोनास फ्लोरोसेंस @ 10 ग्राम/किग्रा बीज उपचार। गोमूत्र का 10% घोल बनाकर पत्तियों पर छिड़कें।',
    urgency: 'HIGH',
    urgencyHi: 'गंभीर',
    savingsImpact: '₹5,000 - ₹9,500 / एकड़ उपज सुरक्षा'
  },
  {
    id: 'cotton-pink-bollworm',
    crop: 'Cotton',
    cropHi: 'कपास',
    disease: 'Pink Bollworm (Pectinophora gossypiella)',
    diseaseHi: 'गुलाबी सुंडी (पिंक बॉलवर्म)',
    symptoms: 'Rosetted flowers (petals twist together), bore holes in developing bolls plugged with excreta, stained lint and damaged seeds.',
    symptomsHi: 'फूल गुलाब की कली की तरह बंद हो जाते हैं (रोसेट फूल), टिंडों में छेद करके सुंडी अंदर घुसती है और कपास की रुई खराब होती है।',
    chemicalCure: 'Profenofos 50% EC @ 2 ml/L or Emamectin Benzoate 5% SG @ 5 g/10L water. Install 5 Pheromone traps per acre.',
    chemicalCureHi: 'प्रोफेनोफॉस 50% EC @ 2 मिली/लीटर या इमामेक्टिन बेंजोएट 5% SG @ 5 ग्राम/10 लीटर। 5 फेरोमोन ट्रैप प्रति एकड़ लगाएं।',
    organicCure: 'Release Trichogramma bactrae egg parasitoids @ 60,000/acre at weekly intervals. Spray Neem Oil 10,000 PPM @ 2 ml/L.',
    organicCureHi: 'ट्राइकोग्रामा बैक्ट्रे परजीवी कीट @ 60,000 प्रति एकड़ छोड़ें। 10,000 PPM नीम तेल @ 2 मिली/लीटर का छिड़काव करें।',
    urgency: 'CRITICAL',
    urgencyHi: 'अति-गंभीर',
    savingsImpact: '₹8,000 - ₹15,000 / एकड़ फसल सुरक्षा'
  },
  {
    id: 'potato-late-blight',
    crop: 'Potato',
    cropHi: 'आलू',
    disease: 'Late Blight (Phytophthora infestans)',
    diseaseHi: 'पछेती झुलसा (लेट ब्लाइट)',
    symptoms: 'Water-soaked irregular black/brown patches on leaf tips and margins. White cottony fungal growth on underside during humid mornings.',
    symptomsHi: 'पत्तियों के किनारों पर पानी से भीगे हुए काले-भूरे धब्बे। सुबह के समय पत्तियों की निचली सतह पर सफेद फफूंद दिखती है।',
    chemicalCure: 'Cymoxanil 8% + Mancozeb 64% (Curzate) @ 2.5 g/L or Dimethomorph 50% WP @ 1 g/L. Spray immediately before foggy weather.',
    chemicalCureHi: 'साइमोक्सानिल 8% + मैंकोज़ेब 64% @ 2.5 ग्राम प्रति लीटर या डाइमेथोमॉर्फ 50% WP @ 1 ग्राम प्रति लीटर। कोहरा पड़ने से पहले स्प्रे करें।',
    organicCure: 'Spray Copper Oxychloride 50% WP @ 2.5 g/L or Trichoderma viride enriched compost applied at tuber planting.',
    organicCureHi: 'कॉपर ऑक्सीक्लोराइड 50% WP @ 2.5 ग्राम/लीटर या ट्राइकोडर्मा विरिडी मिश्रित गोबर खाद का प्रयोग करें।',
    urgency: 'CRITICAL',
    urgencyHi: 'अति-गंभीर',
    savingsImpact: '₹12,000 - ₹25,000 / एकड़ कंद बर्बादी से बचाव'
  },
  {
    id: 'mustard-aphid',
    crop: 'Mustard',
    cropHi: 'सरसों',
    disease: 'Mustard Aphid / Mahu (Lipaphis erysimi)',
    diseaseHi: 'माहू / चेपा कीट (एफिड)',
    symptoms: 'Dense colonies of tiny greenish-black insects clustering on tender shoots, flowers, and pods, sucking sap and causing curled leaves.',
    symptomsHi: 'कोमल टहनियों, फूलों और फलियों पर छोटे हरे-काले कीड़ों का झुंड रस चूसता है, जिससे पत्तियां मुड़ जाती हैं और फलियां सूखती हैं।',
    chemicalCure: 'Dimethoate 30% EC (Rogor) @ 1.5 ml/L or Thiamethoxam 25% WG @ 1 g per 4L water. Spray in late afternoon to protect bees.',
    chemicalCureHi: 'डाइमेथोएट 30% EC (रोगोर) @ 1.5 मिली/लीटर या थायामेथोक्सम 25% WG @ 1 ग्राम प्रति 4 लीटर। शाम को छिड़कें ताकि मधुमक्खियां सुरक्षित रहें।',
    organicCure: 'Yellow Sticky Traps (10 per acre). Spray soap-oil solution (5 ml liquid soap + 5 ml neem oil per litre of water).',
    organicCureHi: 'पीले चिपचिपे कार्ड (10 प्रति एकड़ लगाएं)। 5 मिली लिक्विड साबुन + 5 मिली नीम तेल प्रति लीटर पानी का घोल बनाकर छिड़कें।',
    urgency: 'HIGH',
    urgencyHi: 'गंभीर',
    savingsImpact: '₹3,500 - ₹6,000 / एकड़ तेल व बीज सुरक्षा'
  },
  {
    id: 'tomato-leaf-curl',
    crop: 'Tomato / Vegetables',
    cropHi: 'टमाटर व सब्जियां',
    disease: 'Tomato Leaf Curl Virus (ToLCV)',
    diseaseHi: 'पर्ण कुंचन विषाणु (पत्ता मरोड़ / चुर्रा रोग)',
    symptoms: 'Severe stunting, upward curling and puckering of leaves, thick leathery texture, yellowing of interveinal areas, zero fruit setting.',
    symptomsHi: 'पौधे की बढ़वार रुकना, पत्तियों का ऊपर की तरफ मुड़ना (कटोरीनुमा), पत्तियां मोटी व खुरदरी होना और फूल-फल न लगना।',
    chemicalCure: 'Control whitefly vector with Acetamiprid 20% SP @ 0.5 g/L or Spiromesifen 22.9% SC @ 1 ml/L. Uproot heavily infected plants.',
    chemicalCureHi: 'सफेद मक्खी पर नियंत्रण हेतु एसिटामिप्रिड 20% SP @ 0.5 ग्राम/लीटर या स्पाइरोमेसिफेन 22.9% SC @ 1 मिली/लीटर। गंभीर ग्रसित पौधे उखाड़ दें।',
    organicCure: 'Install Yellow Sticky Traps @ 15/acre. Spray Verticillium lecanii bio-fungicide @ 5 g/L during evening hours.',
    organicCureHi: 'पीले स्टिकी कार्ड @ 15 प्रति एकड़। जैविक कीटनाशक वर्टिसिलियम लेकानी @ 5 ग्राम प्रति लीटर शाम के समय छिड़कें।',
    urgency: 'HIGH',
    urgencyHi: 'गंभीर',
    savingsImpact: '₹10,000 - ₹20,000 / एकड़ सब्जी नुकसान से बचाव'
  }
];

export const offlineStorage = {
  initializeCache: () => {
    try {
      if (!localStorage.getItem(STORAGE_KEYS.MANDI_CACHE)) {
        localStorage.setItem(STORAGE_KEYS.MANDI_CACHE, JSON.stringify(DEFAULT_OFFLINE_MANDI));
      }
      if (!localStorage.getItem(STORAGE_KEYS.CROP_GUIDANCE)) {
        localStorage.setItem(STORAGE_KEYS.CROP_GUIDANCE, JSON.stringify(DEFAULT_OFFLINE_GUIDANCE));
      }
      if (!localStorage.getItem(STORAGE_KEYS.LAST_SYNCED)) {
        localStorage.setItem(STORAGE_KEYS.LAST_SYNCED, new Date().toISOString());
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or quota exceeded:', e);
    }
  },

  cacheMandiRates: (commodity, records) => {
    try {
      const current = offlineStorage.getCachedMandiRates();
      const existingIdx = current.findIndex(
        (c) => c.commodity.toLowerCase() === commodity.toLowerCase()
      );
      if (existingIdx >= 0) {
        current[existingIdx].records = records;
      } else {
        current.push({ commodity, records });
      }
      localStorage.setItem(STORAGE_KEYS.MANDI_CACHE, JSON.stringify(current));
      localStorage.setItem(STORAGE_KEYS.LAST_SYNCED, new Date().toISOString());
    } catch (e) {
      console.warn('Failed to cache mandi rates:', e);
    }
  },

  getCachedMandiRates: (filterCommodity = null) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.MANDI_CACHE);
      const data = raw ? JSON.parse(raw) : DEFAULT_OFFLINE_MANDI;
      if (!filterCommodity) return data;
      return (
        data.find(
          (c) =>
            c.commodity.toLowerCase().includes(filterCommodity.toLowerCase()) ||
            c.commodityHi?.includes(filterCommodity)
        ) || data[0]
      );
    } catch (e) {
      return DEFAULT_OFFLINE_MANDI;
    }
  },

  searchCropGuidanceOffline: (query) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CROP_GUIDANCE);
      const list = raw ? JSON.parse(raw) : DEFAULT_OFFLINE_GUIDANCE;
      if (!query || query.trim() === '') return list;

      const q = query.toLowerCase().trim();
      const matches = list.filter(
        (g) =>
          g.crop.toLowerCase().includes(q) ||
          g.cropHi.includes(q) ||
          g.disease.toLowerCase().includes(q) ||
          g.diseaseHi.includes(q) ||
          g.symptoms.toLowerCase().includes(q) ||
          g.symptomsHi.includes(q)
      );

      return matches.length > 0 ? matches : list;
    } catch (e) {
      return DEFAULT_OFFLINE_GUIDANCE;
    }
  },

  queueOfflineAction: (actionType, payload) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE);
      const queue = raw ? JSON.parse(raw) : [];
      queue.push({
        id: `sync_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        actionType,
        payload,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(queue));
      return queue.length;
    } catch (e) {
      return 0;
    }
  },

  getOfflineQueue: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  clearOfflineQueue: () => {
    try {
      localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.LAST_SYNCED, new Date().toISOString());
    } catch (e) {
    }
  },

  getLastSyncedTime: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.LAST_SYNCED) || new Date().toISOString();
    } catch (e) {
      return new Date().toISOString();
    }
  }
};
