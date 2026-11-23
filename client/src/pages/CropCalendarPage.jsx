import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  CalendarDays,
  Sprout,
  Sun,
  CloudRain,
  ThermometerSun,
  Droplets,
  Layers,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  Clock,
  RotateCw,
  Search,
  Filter
} from 'lucide-react';

const CROPS_CALENDAR = [
  {
    id: 'wheat',
    season: 'rabi',
    seasonNameEn: 'Rabi (Winter)',
    seasonNameHi: 'रबी (शीतकालीन)',
    nameEn: 'Wheat (HD-2967 / PBW-502)',
    nameHi: 'गेहूँ (एचडी-2967 / पीबीडब्ल्यू-502)',
    category: 'Cereal',
    categoryHi: 'अनाज',
    sowingWindowEn: '25 October – 25 November',
    sowingWindowHi: '25 अक्टूबर – 25 नवंबर',
    harvestWindowEn: '25 March – 20 April',
    harvestWindowHi: '25 मार्च – 20 अप्रैल',
    durationDays: '120 - 135 days',
    durationDaysHi: '120 - 135 दिन',
    waterRequirementEn: '4 - 6 irrigations (Critical: CRI stage at 21 days)',
    waterRequirementHi: '4 - 6 सिंचाई (मुख्य: 21 दिन पर कल्ले फूटने पर CRI)',
    tempRange: '15°C - 25°C',
    soilTypeEn: 'Well-drained Fertile Loam / Clay Loam',
    soilTypeHi: 'उचित जल निकासी वाली दोमट / बलुई दोमट मिट्टी',
    fertilizerDoseEn: 'Urea: 3 bags, DAP: 1 bag, MOP: 0.5 bag / acre',
    fertilizerDoseHi: 'यूरिया: 3 बोरी, डीएपी: 1 बोरी, पोटाश: 0.5 बोरी प्रति एकड़',
    yieldEn: '18 - 22 Quintals / Acre',
    yieldHi: '18 - 22 क्विंटल प्रति एकड़',
    rotationPartnerEn: 'Paddy → Wheat → Green Gram (Moong) (Restores Soil Nitrogen)',
    rotationPartnerHi: 'धान → गेहूँ → मूंग (दाल से जमीन की उर्वरता पुनर्जीवित होती है)',
    criticalAlertEn: 'Watch for Yellow Rust & early aphids in late December.',
    criticalAlertHi: 'दिसंबर अंत में पीला रतुआ एवं माहू कीट की नियमित निगरानी करें।'
  },
  {
    id: 'mustard',
    season: 'rabi',
    seasonNameEn: 'Rabi (Winter)',
    seasonNameHi: 'रबी (शीतकालीन)',
    nameEn: 'Mustard / Rapeseed (Pusa Jai Kisan)',
    nameHi: 'सरसों / राई (पूसा जय किसान)',
    category: 'Oilseed',
    categoryHi: 'तिलहन',
    sowingWindowEn: '01 October – 31 October',
    sowingWindowHi: '01 अक्टूबर – 31 अक्टूबर',
    harvestWindowEn: '15 February – 15 March',
    harvestWindowHi: '15 फरवरी – 15 मार्च',
    durationDays: '105 - 120 days',
    durationDaysHi: '105 - 120 दिन',
    waterRequirementEn: '2 - 3 irrigations (Pre-flowering & siliqua development)',
    waterRequirementHi: '2 - 3 हल्की सिंचाई (फूल आने से पूर्व एवं फली बनते समय)',
    tempRange: '12°C - 22°C',
    soilTypeEn: 'Light Loam to Sandy Loam with good aeration',
    soilTypeHi: 'हल्की दोमट से बलुई दोमट मिट्टी',
    fertilizerDoseEn: 'Urea: 1.5 bags, SSP: 2 bags (high Sulphur), MOP: 0.5 bag',
    fertilizerDoseHi: 'यूरिया: 1.5 बोरी, एसएसपी: 2 बोरी (सल्फर युक्त), पोटाश: 0.5 बोरी',
    yieldEn: '8 - 11 Quintals / Acre',
    yieldHi: '8 - 11 क्विंटल प्रति एकड़',
    rotationPartnerEn: 'Maize / Bajra → Mustard → Summer Cowpea',
    rotationPartnerHi: 'मक्का/बाजरा → सरसों → जायद लोबिया',
    criticalAlertEn: 'Aphid attack common in cloudy weather; spray Neem oil or Imidacloprid.',
    criticalAlertHi: 'बादल छाने पर चेपा/माहू का प्रकोप बढ़ता है, नीम तेल या कीटनाशक स्प्रे करें।'
  },
  {
    id: 'chana',
    season: 'rabi',
    seasonNameEn: 'Rabi (Winter)',
    seasonNameHi: 'रबी (शीतकालीन)',
    nameEn: 'Bengal Gram / Chickpea (JG-11 / Radhey)',
    nameHi: 'चना / देशी चना (जेजी-11 / राधे)',
    category: 'Pulse',
    categoryHi: 'दलहन',
    sowingWindowEn: '15 October – 15 November',
    sowingWindowHi: '15 अक्टूबर – 15 नवंबर',
    harvestWindowEn: '15 March – 10 April',
    harvestWindowHi: '15 मार्च – 10 अप्रैल',
    durationDays: '110 - 125 days',
    durationDaysHi: '110 - 125 दिन',
    waterRequirementEn: '1 - 2 irrigations only (Waterlogging harms nodulation)',
    waterRequirementHi: '1 - 2 हल्की सिंचाई (अत्यधिक पानी से जड़ सड़न का खतरा)',
    tempRange: '10°C - 24°C',
    soilTypeEn: 'Heavy Black or Clayey Loam with pH 6.0 - 7.5',
    soilTypeHi: 'गहरी काली या दोमट मिट्टी (pH 6.0 - 7.5)',
    fertilizerDoseEn: 'DAP: 1 bag, Rhizobium culture seed coating',
    fertilizerDoseHi: 'डीएपी: 1 बोरी, राइजोबियम कल्चर से बीज उपचार',
    yieldEn: '7 - 10 Quintals / Acre',
    yieldHi: '7 - 10 क्विंटल प्रति एकड़',
    rotationPartnerEn: 'Rice / Jowar → Gram → Fodder Maize (Enriches soil with 40kg N/ha)',
    rotationPartnerHi: 'धान/ज्वार → चना → चारा मक्का (जमीन में 40 किग्रा नाइट्रोजन जोड़ता है)',
    criticalAlertEn: 'Pod borer (सूंडी) alert at pod formation; use pheromone traps.',
    criticalAlertHi: 'फली बनते समय फली छेदक सूंडी का खतरा; फेरोमोन ट्रैप लगाएं।'
  },
  {
    id: 'potato',
    season: 'rabi',
    seasonNameEn: 'Rabi (Winter)',
    seasonNameHi: 'रबी (शीतकालीन)',
    nameEn: 'Potato (Kufri Pukhraj / Chipsona)',
    nameHi: 'आलू (कुफरी पुखराज / चिप्सोना)',
    category: 'Tuber / Vegetable',
    categoryHi: 'कंद / सब्जी',
    sowingWindowEn: '15 October – 10 November',
    sowingWindowHi: '15 अक्टूबर – 10 नवंबर',
    harvestWindowEn: '25 January – 25 February',
    harvestWindowHi: '25 जनवरी – 25 फरवरी',
    durationDays: '90 - 105 days',
    durationDaysHi: '90 - 105 दिन',
    waterRequirementEn: '5 - 7 light irrigations (Keep ridges moist)',
    waterRequirementHi: '5 - 7 हल्की सिंचाई (मेड़ों पर नमी बनाए रखें)',
    tempRange: '16°C - 22°C',
    soilTypeEn: 'Loose sandy loam rich in organic matter',
    soilTypeHi: 'भुरभुरी बलुई दोमट मिट्टी जिसमें जीवांश अधिक हो',
    fertilizerDoseEn: 'Urea: 3.5 bags, DAP: 2 bags, MOP: 1.5 bags (Potash is crucial)',
    fertilizerDoseHi: 'यूरिया: 3.5 बोरी, डीएपी: 2 बोरी, पोटाश: 1.5 बोरी (कंद विकास के लिए पोटाश जरूरी)',
    yieldEn: '100 - 140 Quintals / Acre',
    yieldHi: '100 - 140 क्विंटल प्रति एकड़',
    rotationPartnerEn: 'Paddy → Potato → Summer Moong / Maize',
    rotationPartnerHi: 'धान → आलू → जायद मूंग / मक्का',
    criticalAlertEn: 'Frost and Late Blight (झुलसा रोग) prevention via Mancozeb spray.',
    criticalAlertHi: 'कोहरे व पाले से पिछेती झुलसा रोग से बचाव हेतु मैंकोजेब का छिड़काव करें।'
  },

  {
    id: 'paddy',
    season: 'kharif',
    seasonNameEn: 'Kharif (Monsoon)',
    seasonNameHi: 'खरीफ (मानसून)',
    nameEn: 'Paddy / Basmati Rice (Pusa 1121 / PR-126)',
    nameHi: 'धान / बासमती (पूसा 1121 / पीआर-126)',
    category: 'Cereal',
    categoryHi: 'अनाज',
    sowingWindowEn: '15 June – 15 July (Transplanting)',
    sowingWindowHi: '15 जून – 15 जुलाई (रोपाई)',
    harvestWindowEn: '15 October – 15 November',
    harvestWindowHi: '15 अक्टूबर – 15 नवंबर',
    durationDays: '115 - 140 days',
    durationDaysHi: '115 - 140 दिन',
    waterRequirementEn: 'Continuous shallow standing water during vegetative stage',
    waterRequirementHi: 'कल्ले फूटने तक 2-3 सेमी जलभराव, फिर वैकल्पिक गीला व सूखा',
    tempRange: '24°C - 35°C',
    soilTypeEn: 'Heavy clay or clayey loam that retains moisture',
    soilTypeHi: 'मटियार दोमट या भारी चिकनी मिट्टी जो पानी रोक सके',
    fertilizerDoseEn: 'Urea: 2.5 bags, DAP: 1 bag, Zinc Sulphate: 10 kg / acre',
    fertilizerDoseHi: 'यूरिया: 2.5 बोरी, डीएपी: 1 बोरी, जिंक सल्फेट: 10 किग्रा प्रति एकड़',
    yieldEn: '22 - 28 Quintals / Acre',
    yieldHi: '22 - 28 क्विंटल प्रति एकड़',
    rotationPartnerEn: 'Paddy → Mustard / Potato → Summer Moong',
    rotationPartnerHi: 'धान → सरसों / आलू → जायद मूंग',
    criticalAlertEn: 'Monitor Brown Plant Hopper (BPH) and Bacterial Leaf Blight (BLB).',
    criticalAlertHi: 'भूरा माहू (बीपीएच) एवं जीवाणु झुलसा रोग की समय पर रोकथाम करें।'
  },
  {
    id: 'maize',
    season: 'kharif',
    seasonNameEn: 'Kharif (Monsoon)',
    seasonNameHi: 'खरीफ (मानसून)',
    nameEn: 'Maize / Corn (Pioneer Hybrid / Dekalb)',
    nameHi: 'मक्का / संकर मक्का (पायनियर / डीकाल्ब)',
    category: 'Coarse Cereal',
    categoryHi: 'मोटा अनाज',
    sowingWindowEn: '15 June – 10 July',
    sowingWindowHi: '15 जून – 10 जुलाई',
    harvestWindowEn: '25 September – 25 October',
    harvestWindowHi: '25 सितंबर – 25 अक्टूबर',
    durationDays: '90 - 105 days',
    durationDaysHi: '90 - 105 दिन',
    waterRequirementEn: '3 - 4 irrigations (Tasseling and silking are critical)',
    waterRequirementHi: '3 - 4 सिंचाई (नर मंजरी व भुट्टे में दाने भरते समय पानी की कमी न हो)',
    tempRange: '20°C - 32°C',
    soilTypeEn: 'Well drained, deep, fertile loamy soil',
    soilTypeHi: 'गहरी, उत्तम जल निकासी वाली उपजाऊ दोमट मिट्टी',
    fertilizerDoseEn: 'Urea: 3 bags, DAP: 1.5 bags, MOP: 0.5 bag',
    fertilizerDoseHi: 'यूरिया: 3 बोरी, डीएपी: 1.5 बोरी, पोटाश: 0.5 बोरी',
    yieldEn: '25 - 32 Quintals / Acre',
    yieldHi: '25 - 32 क्विंटल प्रति एकड़',
    rotationPartnerEn: 'Maize → Wheat / Potato → Green Manure',
    rotationPartnerHi: 'मक्का → गेहूँ / आलू → ढैंचा हरी खाद',
    criticalAlertEn: 'Fall Armyworm (FAW) can decimate funnel leaves in first 30 days.',
    criticalAlertHi: 'फॉल आर्मीवर्म (सैनिक कीट) के पोंगा छिद्रों पर पहले 30 दिन विशेष ध्यान दें।'
  },
  {
    id: 'soybean',
    season: 'kharif',
    seasonNameEn: 'Kharif (Monsoon)',
    seasonNameHi: 'खरीफ (मानसून)',
    nameEn: 'Soybean (JS-9560 / JS-2034)',
    nameHi: 'सोयाबीन (जेएस-9560 / जेएस-2034)',
    category: 'Oilseed / Legume',
    categoryHi: 'तिलहन / दलहन',
    sowingWindowEn: '20 June – 15 July',
    sowingWindowHi: '20 जून – 15 जुलाई',
    harvestWindowEn: '25 September – 20 October',
    harvestWindowHi: '25 सितंबर – 20 अक्टूबर',
    durationDays: '85 - 95 days',
    durationDaysHi: '85 - 95 दिन',
    waterRequirementEn: 'Rainfed primarily; 1 critical irrigation at pod filling if dry spell',
    waterRequirementHi: 'मुख्यतः वर्षा आधारित; दाना भरते समय सूखा पड़ने पर 1 जीवन रक्षक सिंचाई',
    tempRange: '22°C - 32°C',
    soilTypeEn: 'Medium to heavy black clayey soil',
    soilTypeHi: 'मध्यम से गहरी काली चिकनी मिट्टी',
    fertilizerDoseEn: 'DAP: 1 bag, SSP: 1.5 bags, Rhizobium inoculation',
    fertilizerDoseHi: 'डीएपी: 1 बोरी, एसएसपी: 1.5 बोरी, राइजोबियम से बीज उपचार',
    yieldEn: '8 - 12 Quintals / Acre',
    yieldHi: '8 - 12 क्विंटल प्रति एकड़',
    rotationPartnerEn: 'Soybean → Wheat / Gram (Boosts next cereal yield by 15%)',
    rotationPartnerHi: 'सोयाबीन → गेहूँ / चना (अगली फसल की पैदावार में 15% वृद्धि)',
    criticalAlertEn: 'Girdle beetle and yellow mosaic virus; control whiteflies.',
    criticalAlertHi: 'गर्डल बीटल एवं पीला मोज़ेक वायरस की रोकथाम हेतु सफेद मक्खी का नियंत्रण करें।'
  },

  {
    id: 'moong',
    season: 'zaid',
    seasonNameEn: 'Zaid (Summer)',
    seasonNameHi: 'जायद (ग्रीष्मकालीन)',
    nameEn: 'Green Gram / Moong (Pusa Vishal / IPM-02-3)',
    nameHi: 'ग्रीष्मकालीन मूंग (पूसा विशाल / आईपीएम-02-3)',
    category: 'Short Duration Pulse',
    categoryHi: 'अल्पकालिक दलहन',
    sowingWindowEn: '10 March – 10 April',
    sowingWindowHi: '10 मार्च – 10 अप्रैल',
    harvestWindowEn: '20 May – 15 June',
    harvestWindowHi: '20 मई – 15 जून',
    durationDays: '60 - 65 days',
    durationDaysHi: '60 - 65 दिन',
    waterRequirementEn: '3 - 4 irrigations at 10-12 day intervals',
    waterRequirementHi: '3 - 4 सिंचाई 10-12 दिन के अंतराल पर',
    tempRange: '28°C - 40°C',
    soilTypeEn: 'Well drained sandy loam to alluvial',
    soilTypeHi: 'अच्छी जल निकासी वाली बलुई दोमट या कछारी मिट्टी',
    fertilizerDoseEn: 'DAP: 0.5 bag, PSB bio-fertilizer',
    fertilizerDoseHi: 'डीएपी: 0.5 बोरी, पीएसबी जैव उर्वरक',
    yieldEn: '4 - 6 Quintals / Acre',
    yieldHi: '4 - 6 क्विंटल प्रति एकड़',
    rotationPartnerEn: 'Wheat Harvest → Summer Moong → Kharif Paddy (Gold standard 3-crop cycle)',
    rotationPartnerHi: 'गेहूँ कटाई → जायद मूंग → धान (वर्ष में 3 फसल लेकर भूमि को नाइट्रोजन प्रदान)',
    criticalAlertEn: 'Yellow Mosaic Virus transmitted by whitefly; spray Dimethoate.',
    criticalAlertHi: 'सफेद मक्खी द्वारा फैलने वाले पीला मोजेक रोग से तुरंत बचाव करें।'
  },
  {
    id: 'watermelon',
    season: 'zaid',
    seasonNameEn: 'Zaid (Summer)',
    seasonNameHi: 'जायद (ग्रीष्मकालीन)',
    nameEn: 'Watermelon / Tarbooz (Sugar Baby / Kiran)',
    nameHi: 'तरबूज / मतीरा (शुगर बेबी / किरण हाइब्रिड)',
    category: 'Cucurbit / Fruit',
    categoryHi: 'जायद फल',
    sowingWindowEn: '15 February – 20 March',
    sowingWindowHi: '15 फरवरी – 20 मार्च',
    harvestWindowEn: '01 May – 15 June',
    harvestWindowHi: '01 मई – 15 जून',
    durationDays: '75 - 90 days',
    durationDaysHi: '75 - 90 दिन',
    waterRequirementEn: 'Drip irrigation recommended; weekly flooding if furrow',
    waterRequirementHi: 'टपक सिंचाई (ड्रिप) सर्वश्रेष्ठ; या नालियों में साप्ताहिक सिंचाई',
    tempRange: '25°C - 38°C',
    soilTypeEn: 'Warm sandy riverbeds or sandy loam with pH 6.5 - 7.5',
    soilTypeHi: 'नदी की रेतीली कछार या बलुई दोमट मिट्टी',
    fertilizerDoseEn: 'Well-rotted FYM: 5 tonnes, 19:19:19 water-soluble via drip',
    fertilizerDoseHi: 'सड़ी गोबर खाद: 5 टन, 19:19:19 घुलनशील खाद ड्रिप द्वारा',
    yieldEn: '120 - 180 Quintals / Acre',
    yieldHi: '120 - 180 क्विंटल प्रति एकड़',
    rotationPartnerEn: 'Vegetable → Cucurbit → Kharif Fodder',
    rotationPartnerHi: 'सब्जी → तरबूज/खीरा → खरीफ चारा',
    criticalAlertEn: 'Downy mildew and fruit fly; use sticky traps.',
    criticalAlertHi: 'मृदुरोमिल फफूंद एवं फल मक्खी से बचाव हेतु स्टिकी ट्रैप लगाएं।'
  }
];

export default function CropCalendarPage() {
  const { currentLang, lt } = useLanguage();
  const isHi = currentLang === 'hi' || currentLang === 'pa';

  const [activeSeason, setActiveSeason] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(CROPS_CALENDAR[0]);

  const filteredCrops = CROPS_CALENDAR.filter((crop) => {
    const matchesSeason = activeSeason === 'all' || crop.season === activeSeason;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      crop.nameEn.toLowerCase().includes(query) ||
      crop.nameHi.toLowerCase().includes(query) ||
      crop.category.toLowerCase().includes(query);
    return matchesSeason && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      <div className="bg-gradient-to-r from-[#123B35] to-[#168A70] text-white rounded-2xl p-6 shadow-sm border border-emerald-900/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-200">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>{isHi ? 'भारतीय कृषि कैलेंडर एवं फसल चक्र योजना' : 'National Agri Sowing Calendar & Crop Rotation Engine'}</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
              {isHi ? '📅 फसल चक्र एवं बुवाई कैलेंडर' : '📅 Crop Calendar & Rotation Planner'}
            </h1>
            <p className="text-sm text-emerald-100 max-w-2xl">
              {isHi
                ? 'रबी, खरीफ एवं जायद मौसम की फसलों की वैज्ञानिक बुवाई समय सारणी, सिंचाई चरण, खाद की मात्रा और मिट्टी की उर्वरता बनाए रखने वाले फसल चक्र।'
                : 'Scientific sowing schedules, irrigation stages, fertilizer dosage, and soil-enriching crop rotations across Rabi, Kharif, and Zaid seasons.'}
            </p>
          </div>

          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 text-xs text-white space-y-1.5 flex-shrink-0">
            <div className="flex items-center gap-2 text-emerald-300 font-bold">
              <Clock className="w-4 h-4" />
              <span>{isHi ? 'वर्तमान बुवाई सीजन' : 'Current Active Season'}</span>
            </div>
            <p className="font-extrabold text-sm text-white">
              {isHi ? '❄️ रबी बुवाई का मुख्य समय (नवंबर - दिसंबर)' : '❄️ Rabi Sowing Window (Nov - Dec)'}
            </p>
            <p className="text-[11px] text-emerald-100">
              {isHi ? 'गेहूँ, सरसों, चना एवं आलू की बुवाई हेतु आदर्श तापमान।' : 'Optimal soil moisture & temp for Wheat, Mustard, Gram & Potato.'}
            </p>
          </div>
        </div>
      </div>

      
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
        
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', labelEn: 'All Seasons (सब)', labelHi: 'सभी मौसम' },
            { id: 'rabi', labelEn: '❄️ Rabi (रबी)', labelHi: '❄️ रबी (शीतकालीन)' },
            { id: 'kharif', labelEn: '🌧️ Kharif (खरीफ)', labelHi: '🌧️ खरीफ (मानसून)' },
            { id: 'zaid', labelEn: '☀️ Zaid (जायद)', labelHi: '☀️ जायद (ग्रीष्मकालीन)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSeason(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                activeSeason === tab.id
                  ? 'bg-[#123B35] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isHi ? tab.labelHi : tab.labelEn}
            </button>
          ))}
        </div>

        
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isHi ? 'फसल या प्रजाति खोजें...' : 'Search crop or variety...'}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#168A70]"
          />
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {isHi ? `उपलब्ध फसलें (${filteredCrops.length})` : `Available Crops (${filteredCrops.length})`}
          </p>

          <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
            {filteredCrops.map((crop) => {
              const isSelected = selectedCrop?.id === crop.id;
              return (
                <div
                  key={crop.id}
                  onClick={() => setSelectedCrop(crop)}
                  className={`p-4 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'border-[#168A70] bg-emerald-50/70 shadow-sm ring-1 ring-[#168A70]'
                      : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-slate-900">
                          {isHi ? crop.nameHi : crop.nameEn}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {isHi ? crop.categoryHi : crop.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-800 font-semibold mt-1">
                        {isHi ? crop.seasonNameHi : crop.seasonNameEn}
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {isHi ? crop.durationDaysHi : crop.durationDays}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-white/80 p-2 rounded-lg border border-slate-100">
                    <div>
                      <span className="text-slate-400 text-[10px] block">{isHi ? 'बुवाई खिड़की:' : 'Sowing Window:'}</span>
                      <span className="font-semibold text-slate-800">{isHi ? crop.sowingWindowHi : crop.sowingWindowEn}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">{isHi ? 'अनुमानित उपज:' : 'Exp. Yield:'}</span>
                      <span className="font-bold text-emerald-700">{isHi ? crop.yieldHi : crop.yieldEn}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        
        <div className="lg:col-span-7">
          {selectedCrop ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 sticky top-20">
              
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                    {isHi ? selectedCrop.seasonNameHi : selectedCrop.seasonNameEn}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {isHi ? 'समय चक्र: ' : 'Duration: '}
                    <strong className="text-slate-800">{isHi ? selectedCrop.durationDaysHi : selectedCrop.durationDays}</strong>
                  </span>
                </div>
                <h2 className="text-xl font-black text-slate-900 mt-2">
                  {isHi ? selectedCrop.nameHi : selectedCrop.nameEn}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isHi ? `वर्ग: ${selectedCrop.categoryHi}` : `Category: ${selectedCrop.category}`} • {isHi ? 'आदर्श तापमान: ' : 'Optimal Temp: '}
                  <strong>{selectedCrop.tempRange}</strong>
                </p>
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <div className="flex items-center gap-2 text-amber-800 text-xs font-bold">
                    <Sun className="w-4 h-4 text-amber-600" />
                    <span>{isHi ? '1. बुवाई खिड़की (Sowing Window)' : '1. Sowing Window'}</span>
                  </div>
                  <p className="text-sm font-black text-slate-900 mt-1">
                    {isHi ? selectedCrop.sowingWindowHi : selectedCrop.sowingWindowEn}
                  </p>
                  <p className="text-[11px] text-amber-900/80 mt-1">
                    {isHi ? 'अगेती या पछेती बुवाई से उपज पर 20-30% असर पड़ सकता है।' : 'Timely sowing avoids heat stress during grain filling stage.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                  <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
                    <Sprout className="w-4 h-4 text-emerald-600" />
                    <span>{isHi ? '2. कटाई समय (Harvest Window)' : '2. Harvest Window'}</span>
                  </div>
                  <p className="text-sm font-black text-slate-900 mt-1">
                    {isHi ? selectedCrop.harvestWindowHi : selectedCrop.harvestWindowEn}
                  </p>
                  <p className="text-[11px] text-emerald-900/80 mt-1">
                    {isHi ? `अपेक्षित पैदावार: ${selectedCrop.yieldHi}` : `Expected Harvest Yield: ${selectedCrop.yieldEn}`}
                  </p>
                </div>
              </div>

              
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                  {isHi ? 'मिट्टी एवं सिंचाई प्रबंधन' : 'Soil & Irrigation Management'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">{isHi ? 'उपयुक्त मिट्टी' : 'Soil Type'}</span>
                    <p className="font-semibold text-slate-800 mt-0.5">
                      {isHi ? selectedCrop.soilTypeHi : selectedCrop.soilTypeEn}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">{isHi ? 'सिंचाई की आवश्यकता' : 'Water Needs'}</span>
                    <p className="font-semibold text-slate-800 mt-0.5">
                      {isHi ? selectedCrop.waterRequirementHi : selectedCrop.waterRequirementEn}
                    </p>
                  </div>
                </div>
              </div>

              
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/70 text-xs space-y-1">
                <div className="flex items-center gap-2 text-blue-900 font-bold">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span>{isHi ? 'अनुशंसित खाद व उर्वरक खुराक (प्रति एकड़)' : 'Recommended Fertilizer Dosage (Per Acre)'}</span>
                </div>
                <p className="font-semibold text-slate-800 text-[13px]">
                  {isHi ? selectedCrop.fertilizerDoseHi : selectedCrop.fertilizerDoseEn}
                </p>
              </div>

              
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#123B35] font-extrabold text-sm">
                  <RotateCw className="w-4 h-4 text-emerald-600" />
                  <span>{isHi ? 'मिट्टी पुनर्जनन फसल चक्र (Crop Rotation Cycle)' : 'Soil Regeneration Crop Rotation Cycle'}</span>
                </div>
                <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                  {isHi ? selectedCrop.rotationPartnerHi : selectedCrop.rotationPartnerEn}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>
                    {isHi
                      ? 'दलहनी फसलों का चक्र अपनाने से यूरिया की 25% बचत और खरपतवार में 40% कमी होती है।'
                      : 'Leguminous rotation fixes up to 40 kg atmospheric nitrogen per hectare and breaks monoculture pests.'}
                  </span>
                </div>
              </div>

              
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-1">
                <div className="flex items-center gap-2 text-rose-800 font-bold">
                  <Info className="w-4 h-4 text-rose-600" />
                  <span>{isHi ? 'कृषि वैज्ञानिक सतर्कता चेतावनी (Pest & Disease Watch)' : 'Agronomist Advisory & Pest Warning'}</span>
                </div>
                <p className="text-slate-700">
                  {isHi ? selectedCrop.criticalAlertHi : selectedCrop.criticalAlertEn}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
              <Sprout className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="text-sm font-semibold">{isHi ? 'विवरण देखने के लिए किसी फसल पर क्लिक करें।' : 'Select a crop from the list to view its complete agronomic schedule.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
