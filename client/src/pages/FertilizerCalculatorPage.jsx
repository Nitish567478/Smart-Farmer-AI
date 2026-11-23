import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Calculator,
  Sprout,
  Layers,
  Calendar,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Download,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const CROPS_DATA = [
  {
    id: 'wheat',
    nameEn: 'Wheat',
    nameHi: 'गेहूँ',
    seasonEn: 'Rabi Season',
    seasonHi: 'रबी मौसम',
    npk: { n: 50, p: 25, k: 15 },
    ureaBags: 1.8, 
    dapBags: 1.1,  
    mopBags: 0.5,  
    zincKg: 10,
    stagesEn: [
      {
        stage: 'Basal Application (At Sowing)',
        days: 'Day 0',
        action: 'Mix entire DAP (1.1 bags) + entire Potash (0.5 bag) + 1/3 Urea into soil during final ploughing.'
      },
      {
        stage: 'First Irrigation (CRI / Tillering Stage)',
        days: 'Day 21-25',
        action: 'Broadcast 1/3 Urea (approx 25-30 kg) + 10 kg Zinc Sulphate (33%) immediately after first irrigation.'
      },
      {
        stage: 'Second Irrigation (Heading / Booting Stage)',
        days: 'Day 40-45',
        action: 'Broadcast remaining 1/3 Urea. Apply 0:52:34 water-soluble spray when ears emerge.'
      }
    ],
    stagesHi: [
      {
        stage: 'बुवाई के समय',
        days: '0 दिन',
        action: 'पूरा DAP (1.1 बोरी) + पूरा पोटाश (0.5 बोरी) + 1/3 यूरिया खेत की अंतिम जुताई में मिला दें।'
      },
      {
        stage: 'पहली सिंचाई (कल्ले फूटते समय)',
        days: '21-25 दिन बाद',
        action: '1/3 यूरिया (लगभग 25-30 किग्रा) + 10 किग्रा जिंक सल्फेट (33%) सिंचाई के तुरंत बाद छिटकें।'
      },
      {
        stage: 'दूसरी सिंचाई (गाभा बनते समय)',
        days: '40-45 दिन बाद',
        action: 'बचा हुआ 1/3 यूरिया छिड़कें। बालियां निकलते समय 0:52:34 का स्प्रे करें।'
      }
    ]
  },
  {
    id: 'paddy',
    nameEn: 'Paddy / Rice',
    nameHi: 'धान (चावल)',
    seasonEn: 'Kharif Season',
    seasonHi: 'खरीफ मौसम',
    npk: { n: 48, p: 24, k: 20 },
    ureaBags: 2.0,
    dapBags: 1.0,
    mopBags: 0.7,
    zincKg: 12,
    stagesEn: [
      {
        stage: 'Basal Dressing (At Transplanting)',
        days: 'Day 0',
        action: 'Mix full DAP + full Potash + 1/4 Urea into puddle before transplanting seedlings.'
      },
      {
        stage: 'Tillering Stage',
        days: 'Day 20-25',
        action: 'Broadcast 1/2 Urea + 12 kg Zinc Sulphate after field inundation.'
      },
      {
        stage: 'Panicle Initiation',
        days: 'Day 45-50',
        action: 'Apply final 1/4 Urea to enhance panicle length and grain filling.'
      }
    ],
    stagesHi: [
      {
        stage: 'रोपाई के समय',
        days: '0 दिन',
        action: 'पूरा DAP + पूरा पोटाश + 1/4 यूरिया रोपाई से पहले खेत के कीचड़ में मिलाएं।'
      },
      {
        stage: 'कल्ले फूटने की अवस्था',
        days: '20-25 दिन बाद',
        action: '1/2 यूरिया + 12 किग्रा जिंक सल्फेट पानी भरने के बाद डालें।'
      },
      {
        stage: 'गभोट अवस्था',
        days: '45-50 दिन बाद',
        action: 'अंतिम 1/4 यूरिया डालें ताकि बालियां लंबी और दाने चमकदार बनें।'
      }
    ]
  },
  {
    id: 'mustard',
    nameEn: 'Mustard',
    nameHi: 'सरसों',
    seasonEn: 'Rabi Season',
    seasonHi: 'रबी मौसम',
    npk: { n: 35, p: 20, k: 10 },
    ureaBags: 1.3,
    dapBags: 0.9,
    mopBags: 0.3,
    zincKg: 8,
    sulphurKg: 15,
    stagesEn: [
      {
        stage: 'Basal Application',
        days: 'Day 0',
        action: 'Mix full DAP + Potash + 15 kg Sulphur (increases oil content by 3-5%) + half Urea.'
      },
      {
        stage: 'First Irrigation (Pre-Flowering)',
        days: 'Day 30-35',
        action: 'Apply remaining Urea (approx 25 kg) along with irrigation.'
      }
    ],
    stagesHi: [
      {
        stage: 'बुवाई के समय',
        days: '0 दिन',
        action: 'पूरा DAP + पोटाश + 15 किग्रा सल्फर (सल्फर से तेल की मात्रा 3-5% बढ़ती है) + आधी यूरिया।'
      },
      {
        stage: 'पहली सिंचाई (फूल आने से पहले)',
        days: '30-35 दिन बाद',
        action: 'शेष यूरिया (लगभग 25 किग्रा) सिंचाई के साथ दें।'
      }
    ]
  },
  {
    id: 'potato',
    nameEn: 'Potato',
    nameHi: 'आलू',
    seasonEn: 'Rabi Season',
    seasonHi: 'रबी मौसम',
    npk: { n: 60, p: 40, k: 50 },
    ureaBags: 2.4,
    dapBags: 1.8,
    mopBags: 1.7,
    zincKg: 10,
    stagesEn: [
      {
        stage: 'At Planting (Furrow Application)',
        days: 'Day 0',
        action: 'Apply full DAP + 2/3 Potash + 1/3 Urea in furrows 5 cm below seed tubers.'
      },
      {
        stage: 'Earthing Up Stage',
        days: 'Day 30-35',
        action: 'Apply remaining Urea + balance Potash and earth up soil around growing tubers.'
      }
    ],
    stagesHi: [
      {
        stage: 'बुवाई के समय (मेड़ बनाते वक्त)',
        days: '0 दिन',
        action: 'पूरा DAP + 2/3 पोटाश + 1/3 यूरिया कतारों में बीज के 5 सेमी नीचे दें।'
      },
      {
        stage: 'मिट्टी चढ़ाते समय',
        days: '30-35 दिन बाद',
        action: 'बची हुई यूरिया + शेष पोटाश डालकर कंदों पर अच्छी तरह मिट्टी चढ़ाएं।'
      }
    ]
  },
  {
    id: 'cotton',
    nameEn: 'Cotton',
    nameHi: 'कपास',
    seasonEn: 'Kharif Season',
    seasonHi: 'खरीफ मौसम',
    npk: { n: 60, p: 30, k: 30 },
    ureaBags: 2.2,
    dapBags: 1.3,
    mopBags: 1.0,
    zincKg: 10,
    stagesEn: [
      {
        stage: 'Basal Application',
        days: 'Day 0',
        action: 'Incorporate entire DAP and half Potash deeply into the soil.'
      },
      {
        stage: 'Square Formation Stage',
        days: 'Day 40-45',
        action: 'Broadcast 1/2 Urea + apply Boron foliar spray.'
      },
      {
        stage: 'Boll Development Stage',
        days: 'Day 70-80',
        action: 'Apply remaining Urea + remaining Potash with 13:00:45 foliar feed.'
      }
    ],
    stagesHi: [
      {
        stage: 'बुवाई के समय',
        days: '0 दिन',
        action: 'पूरा DAP और आधा पोटाश मिट्टी में गहरा डालें।'
      },
      {
        stage: 'शाखाएं बनते समय',
        days: '40-45 दिन बाद',
        action: '1/2 यूरिया + बोरॉन का छिड़काव करें।'
      },
      {
        stage: 'फूल और टिंडे बनते समय',
        days: '70-80 दिन बाद',
        action: 'शेष यूरिया + शेष पोटाश और 13:00:45 का पर्णीय स्प्रे करें।'
      }
    ]
  },
  {
    id: 'maize',
    nameEn: 'Maize',
    nameHi: 'मक्का',
    seasonEn: 'Kharif / Spring',
    seasonHi: 'खरीफ / जायद',
    npk: { n: 50, p: 25, k: 20 },
    ureaBags: 1.9,
    dapBags: 1.1,
    mopBags: 0.7,
    zincKg: 10,
    stagesEn: [
      {
        stage: 'Basal Application',
        days: 'Day 0',
        action: 'Apply full DAP + full Potash + 1/3 Urea along seeding rows.'
      },
      {
        stage: 'Knee High Stage',
        days: 'Day 30',
        action: 'Top dress 1/3 Urea and spray Zinc Sulphate.'
      },
      {
        stage: 'Tasseling Stage',
        days: 'Day 50-55',
        action: 'Broadcast final 1/3 Urea followed by immediate irrigation.'
      }
    ],
    stagesHi: [
      {
        stage: 'बुवाई के समय',
        days: '0 दिन',
        action: 'पूरा DAP + पूरा पोटाश + 1/3 यूरिया कतारों में डालें।'
      },
      {
        stage: 'घुटने की ऊंचाई पर',
        days: '30 दिन बाद',
        action: '1/3 यूरिया + जिंक सल्फेट का छिड़काव।'
      },
      {
        stage: 'नर मंजरी निकलते समय',
        days: '50-55 दिन बाद',
        action: 'अंतिम 1/3 यूरिया देकर सिंचाई करें।'
      }
    ]
  }
];

export default function FertilizerCalculatorPage() {
  const { currentLang, t } = useLanguage();
  const [selectedCropId, setSelectedCropId] = useState('wheat');
  const [landArea, setLandArea] = useState('2');
  const [unit, setUnit] = useState('acre');
  const [soilType, setSoilType] = useState('loam');

  const activeCrop = CROPS_DATA.find((c) => c.id === selectedCropId) || CROPS_DATA[0];

  const getAcreEquivalent = () => {
    const val = parseFloat(landArea) || 0;
    if (unit === 'acre') return val;
    if (unit === 'bigha') return val * 0.4;
    if (unit === 'hectare') return val * 2.47;
    return val;
  };

  const totalAcres = Math.max(0.1, getAcreEquivalent());

  const getSoilFactor = () => {
    if (soilType === 'sandy') return 1.15;
    if (soilType === 'clay') return 0.95;
    return 1.0;
  };

  const soilFactor = getSoilFactor();

  const ureaBags = (activeCrop.ureaBags * totalAcres * soilFactor).toFixed(1);
  const dapBags = (activeCrop.dapBags * totalAcres).toFixed(1);
  const mopBags = (activeCrop.mopBags * totalAcres).toFixed(1);
  const zincKg = (activeCrop.zincKg * totalAcres).toFixed(0);
  const sulphurKg = activeCrop.sulphurKg ? (activeCrop.sulphurKg * totalAcres).toFixed(0) : null;

  const cropName = currentLang === 'hi' ? activeCrop.nameHi : activeCrop.nameEn;
  const stages = currentLang === 'hi' ? activeCrop.stagesHi : activeCrop.stagesEn;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      <div className="bg-[#123B35] text-white p-6 rounded-3xl shadow-sm border border-[#123B35] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#168A70]/30 border border-[#38BDF8]/40 text-[#38BDF8] text-xs font-bold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>{currentLang === 'hi' ? 'वैज्ञानिक खाद एवं उर्वरक गणक (ICAR आधारित)' : 'Scientific NPK Dosage Calculator (ICAR Grounded)'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            {t('fert_page_title')}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/90 mt-1 max-w-2xl">
            {t('fert_page_sub')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setLandArea('1');
              setSelectedCropId('wheat');
              setUnit('acre');
              setSoilType('loam');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition border border-white/10"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{currentLang === 'hi' ? 'रीसेट करें' : 'Reset'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-2xs space-y-5">
          <h2 className="text-base font-extrabold text-[#172B25] flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
            <Sprout className="w-5 h-5 text-[#168A70]" />
            <span>{currentLang === 'hi' ? 'खेत और फसल की जानकारी' : 'Field & Cultivar Parameters'}</span>
          </h2>

          
          <div>
            <label className="block text-xs font-bold text-[#172B25] mb-2">
              {currentLang === 'hi' ? '1. फसल चुनें:' : '1. Select Cultivar:'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CROPS_DATA.map((crop) => {
                const label = currentLang === 'hi' ? crop.nameHi : crop.nameEn;
                const season = currentLang === 'hi' ? crop.seasonHi : crop.seasonEn;
                return (
                  <button
                    key={crop.id}
                    onClick={() => setSelectedCropId(crop.id)}
                    className={`p-2.5 rounded-2xl text-left border transition text-xs font-bold flex flex-col justify-between ${
                      selectedCropId === crop.id
                        ? 'bg-[#123B35] text-white border-[#123B35] shadow-xs'
                        : 'bg-[#F7FAF8] hover:bg-slate-100 text-[#172B25] border-[#E2E8F0]'
                    }`}
                  >
                    <span>{label}</span>
                    <span className={`text-[10px] font-medium mt-1 ${selectedCropId === crop.id ? 'text-emerald-300' : 'text-[#64748B]'}`}>
                      {season}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          
          <div>
            <label className="block text-xs font-bold text-[#172B25] mb-2">
              {currentLang === 'hi' ? '2. खेत का क्षेत्रफल:' : '2. Farm Land Area:'}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0.1"
                step="0.5"
                value={landArea}
                onChange={(e) => setLandArea(e.target.value)}
                placeholder={currentLang === 'hi' ? 'उदा. 2' : 'e.g. 2'}
                className="flex-1 px-4 py-2.5 rounded-2xl border border-[#E2E8F0] bg-[#F7FAF8] text-[#172B25] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#168A70]"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="px-3 py-2.5 rounded-2xl border border-[#E2E8F0] bg-[#F7FAF8] text-[#172B25] font-bold text-xs focus:outline-none focus:ring-2 focus:ring-[#168A70] cursor-pointer"
              >
                <option value="acre">{currentLang === 'hi' ? 'एकड़' : 'Acre'}</option>
                <option value="bigha">{currentLang === 'hi' ? 'बीघा' : 'Bigha'}</option>
                <option value="hectare">{currentLang === 'hi' ? 'हेक्टेयर' : 'Hectare'}</option>
              </select>
            </div>
            <p className="text-[11px] text-[#64748B] mt-1.5">
              = {currentLang === 'hi' ? 'कुल क्षेत्रफल लगभग' : 'Effective area approx'} <strong>{totalAcres.toFixed(2)} {currentLang === 'hi' ? 'एकड़' : 'Acres'}</strong>
            </p>
          </div>

          
          <div>
            <label className="block text-xs font-bold text-[#172B25] mb-2">
              {currentLang === 'hi' ? '3. मिट्टी का प्रकार:' : '3. Soil Profile:'}
            </label>
            <div className="space-y-1.5">
              {[
                {
                  id: 'loam',
                  nameEn: 'Loamy Soil',
                  nameHi: 'दोमट मिट्टी',
                  descEn: 'Optimal nutrient retention',
                  descHi: 'संतुलित उर्वरकता'
                },
                {
                  id: 'sandy',
                  nameEn: 'Sandy Soil',
                  nameHi: 'बलुई / रेतीली मिट्टी',
                  descEn: 'Higher leaching risk (+15% Urea)',
                  descHi: 'नाइट्रोजन तेजी से बहती है (+15% यूरिया)'
                },
                {
                  id: 'clay',
                  nameEn: 'Clayey Soil',
                  nameHi: 'काली / मटियारी मिट्टी',
                  descEn: 'High phosphorus retention',
                  descHi: 'नमी व फास्फोरस संचित रखती है'
                }
              ].map((s) => (
                <label
                  key={s.id}
                  onClick={() => setSoilType(s.id)}
                  className={`p-2.5 rounded-2xl border flex items-center justify-between cursor-pointer transition text-xs ${
                    soilType === s.id
                      ? 'bg-emerald-50 border-[#168A70] text-[#123B35] font-bold'
                      : 'bg-[#F7FAF8] border-[#E2E8F0] text-[#64748B]'
                  }`}
                >
                  <div>
                    <p className="text-xs text-[#172B25] font-bold">
                      {currentLang === 'hi' ? s.nameHi : s.nameEn}
                    </p>
                    <p className="text-[10px] text-[#64748B]">
                      {currentLang === 'hi' ? s.descHi : s.descEn}
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="soil"
                    checked={soilType === s.id}
                    onChange={() => setSoilType(s.id)}
                    className="accent-[#168A70]"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-2xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <h3 className="text-base font-extrabold text-[#172B25]">
                  {currentLang === 'hi' ? 'कुल अनुशंसित खाद मात्रा' : 'Total Recommended Fertilizer Dosage'}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {currentLang === 'hi'
                    ? `${cropName} के लिए ${landArea} ${unit === 'acre' ? 'एकड़' : unit === 'bigha' ? 'बीघा' : 'हेक्टेयर'} में आवश्यक खाद`
                    : `Total dosage for ${cropName} across ${landArea} ${unit}`}
                </p>
              </div>
              <span className="text-[11px] font-black px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                ICAR Benchmark
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-800">
                  {currentLang === 'hi' ? 'यूरिया (46% N)' : 'Urea (46% N)'}
                </span>
                <p className="text-2xl sm:text-3xl font-black text-amber-900">{ureaBags}</p>
                <p className="text-[11px] text-amber-700 font-medium">
                  {currentLang === 'hi' ? 'बोरी (45 किग्रा)' : 'Bags (45 kg)'}
                </p>
                <div className="text-[10px] text-amber-600 font-semibold pt-1">
                  ≈ {(parseFloat(ureaBags) * 45).toFixed(0)} kg {currentLang === 'hi' ? 'कुल' : 'Total'}
                </div>
              </div>

              
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-800">
                  {currentLang === 'hi' ? 'डीएपी (18:46)' : 'DAP (18:46)'}
                </span>
                <p className="text-2xl sm:text-3xl font-black text-emerald-950">{dapBags}</p>
                <p className="text-[11px] text-emerald-700 font-medium">
                  {currentLang === 'hi' ? 'बोरी (50 किग्रा)' : 'Bags (50 kg)'}
                </p>
                <div className="text-[10px] text-emerald-600 font-semibold pt-1">
                  ≈ {(parseFloat(dapBags) * 50).toFixed(0)} kg {currentLang === 'hi' ? 'कुल' : 'Total'}
                </div>
              </div>

              
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-rose-800">
                  {currentLang === 'hi' ? 'पोटाश (60% K)' : 'Potash (60% K)'}
                </span>
                <p className="text-2xl sm:text-3xl font-black text-rose-950">{mopBags}</p>
                <p className="text-[11px] text-rose-700 font-medium">
                  {currentLang === 'hi' ? 'बोरी (50 किग्रा)' : 'Bags (50 kg)'}
                </p>
                <div className="text-[10px] text-rose-600 font-semibold pt-1">
                  ≈ {(parseFloat(mopBags) * 50).toFixed(0)} kg {currentLang === 'hi' ? 'कुल' : 'Total'}
                </div>
              </div>

              
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-sky-800">
                  {currentLang === 'hi' ? 'जिंक सल्फेट (33%)' : 'Zinc Sulphate (33%)'}
                </span>
                <p className="text-2xl sm:text-3xl font-black text-sky-950">{zincKg}</p>
                <p className="text-[11px] text-sky-700 font-medium">
                  {currentLang === 'hi' ? 'किलोग्राम (Kg)' : 'Kilograms (Kg)'}
                </p>
                {sulphurKg && (
                  <div className="text-[10px] text-sky-600 font-semibold pt-1">
                    + {sulphurKg} kg {currentLang === 'hi' ? 'सल्फर' : 'Sulphur'}
                  </div>
                )}
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-2xs space-y-4">
            <h3 className="text-base font-extrabold text-[#172B25] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#168A70]" />
              <span>{t('fert_schedule_title')}</span>
            </h3>

            <div className="space-y-3">
              {stages.map((stg, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#E2E8F0] hover:border-[#168A70]/40 transition space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#123B35] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#168A70] text-white text-[10px] flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      {stg.stage}
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-[#172B25]">
                      {stg.days}
                    </span>
                  </div>
                  <p className="text-xs text-[#172B25] pl-7 leading-relaxed font-medium">
                    {stg.action}
                  </p>
                </div>
              ))}
            </div>

            
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#168A70] shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-950 space-y-1">
                <p className="font-extrabold">
                  {currentLang === 'hi' ? 'विशेष कृषि वैज्ञानिक सलाह (KVK Golden Rule):' : 'KVK Agronomy Best Practice:'}
                </p>
                <p className="text-[11px] leading-relaxed text-emerald-800">
                  {currentLang === 'hi'
                    ? 'कभी भी पूरा यूरिया बुवाई के समय एक साथ न डालें। यूरिया को 2 से 3 भागों में बांटकर देने से पौधे 80% नाइट्रोजन ग्रहण करते हैं और खाद की बर्बादी नहीं होती। खेत में गोबर की सड़ी खाद (FYM) अवश्य मिलाएं।'
                    : 'Never apply full urea dose at sowing. Splitting urea into 2-3 split applications increases nitrogen uptake efficiency up to 80% and prevents nutrient leaching.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
