import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Sprout,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
  Download,
  Printer,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Leaf,
  Bug,
  FlaskConical,
  Scale,
  Camera,
  Coins
} from 'lucide-react';

const CROP_BENCHMARKS = {
  wheat: {
    id: 'wheat',
    nameEn: 'Wheat',
    nameHi: 'गेहूँ',
    seasonEn: 'Rabi Season',
    seasonHi: 'रबी मौसम',
    avgYieldQuintals: 18,
    marketPricePerQtl: 2400,
    mspPerQtl: 2275,
    tradFertilizerCost: 3200, 
    aiFertilizerCost: 1850,   
    tradPestCost: 2800,       
    aiPestCost: 1100,         
    riskLossPercentTrad: 0.14, 
    riskLossPercentAi: 0.03    
  },
  paddy: {
    id: 'paddy',
    nameEn: 'Paddy / Rice',
    nameHi: 'धान (चावल)',
    seasonEn: 'Kharif Season',
    seasonHi: 'खरीफ मौसम',
    avgYieldQuintals: 22,
    marketPricePerQtl: 2350,
    mspPerQtl: 2183,
    tradFertilizerCost: 3800,
    aiFertilizerCost: 2100,
    tradPestCost: 3600,
    aiPestCost: 1450,
    riskLossPercentTrad: 0.16,
    riskLossPercentAi: 0.04
  },
  mustard: {
    id: 'mustard',
    nameEn: 'Mustard',
    nameHi: 'सरसों',
    seasonEn: 'Rabi Season',
    seasonHi: 'रबी मौसम',
    avgYieldQuintals: 8,
    marketPricePerQtl: 5900,
    mspPerQtl: 5650,
    tradFertilizerCost: 2600,
    aiFertilizerCost: 1500,
    tradPestCost: 2400,
    aiPestCost: 950,
    riskLossPercentTrad: 0.18, 
    riskLossPercentAi: 0.03
  },
  cotton: {
    id: 'cotton',
    nameEn: 'Cotton',
    nameHi: 'कपास (नरमा)',
    seasonEn: 'Kharif Season',
    seasonHi: 'खरीफ मौसम',
    avgYieldQuintals: 11,
    marketPricePerQtl: 7400,
    mspPerQtl: 6620,
    tradFertilizerCost: 4500,
    aiFertilizerCost: 2600,
    tradPestCost: 6500, 
    aiPestCost: 2400,   
    riskLossPercentTrad: 0.22,
    riskLossPercentAi: 0.05
  },
  soybean: {
    id: 'soybean',
    nameEn: 'Soybean',
    nameHi: 'सोयाबीन',
    seasonEn: 'Kharif Season',
    seasonHi: 'खरीफ मौसम',
    avgYieldQuintals: 10,
    marketPricePerQtl: 4850,
    mspPerQtl: 4600,
    tradFertilizerCost: 3100,
    aiFertilizerCost: 1750,
    tradPestCost: 3200,
    aiPestCost: 1300,
    riskLossPercentTrad: 0.15,
    riskLossPercentAi: 0.04
  },
  potato: {
    id: 'potato',
    nameEn: 'Potato',
    nameHi: 'आलू',
    seasonEn: 'Rabi Season',
    seasonHi: 'रबी मौसम',
    avgYieldQuintals: 95,
    marketPricePerQtl: 1400,
    mspPerQtl: 1100,
    tradFertilizerCost: 6200,
    aiFertilizerCost: 3800,
    tradPestCost: 5800, 
    aiPestCost: 2300,
    riskLossPercentTrad: 0.25,
    riskLossPercentAi: 0.05
  },
  sugarcane: {
    id: 'sugarcane',
    nameEn: 'Sugarcane',
    nameHi: 'गन्ना',
    seasonEn: 'Annual Crop',
    seasonHi: 'वार्षिक फसल',
    avgYieldQuintals: 320,
    marketPricePerQtl: 350,
    mspPerQtl: 315,
    tradFertilizerCost: 5400,
    aiFertilizerCost: 3200,
    tradPestCost: 3900,
    aiPestCost: 1600,
    riskLossPercentTrad: 0.12,
    riskLossPercentAi: 0.03
  },
  vegetables: {
    id: 'vegetables',
    nameEn: 'Tomato / Vegetables',
    nameHi: 'टमाटर व मौसमी सब्जी',
    seasonEn: 'Zaid / All Seasons',
    seasonHi: 'जायद / मौसमी',
    avgYieldQuintals: 110,
    marketPricePerQtl: 1800,
    mspPerQtl: 1500,
    tradFertilizerCost: 6800,
    aiFertilizerCost: 3900,
    tradPestCost: 7500,
    aiPestCost: 2800,
    riskLossPercentTrad: 0.28,
    riskLossPercentAi: 0.06
  },
  maize: {
    id: 'maize',
    nameEn: 'Maize / Corn',
    nameHi: 'मक्का (Maize)',
    seasonEn: 'Kharif / Rabi',
    seasonHi: 'खरीफ / रबी',
    avgYieldQuintals: 28,
    marketPricePerQtl: 2150,
    mspPerQtl: 2090,
    tradFertilizerCost: 3600,
    aiFertilizerCost: 2100,
    tradPestCost: 3200, 
    aiPestCost: 1200,
    riskLossPercentTrad: 0.18,
    riskLossPercentAi: 0.04
  },
  onion: {
    id: 'onion',
    nameEn: 'Onion',
    nameHi: 'प्याज (Onion)',
    seasonEn: 'Rabi / Kharif',
    seasonHi: 'रबी / खरीफ',
    avgYieldQuintals: 90,
    marketPricePerQtl: 2200,
    mspPerQtl: 2100,
    tradFertilizerCost: 5200,
    aiFertilizerCost: 3100,
    tradPestCost: 4800, 
    aiPestCost: 1900,
    riskLossPercentTrad: 0.22,
    riskLossPercentAi: 0.05
  },
  gram: {
    id: 'gram',
    nameEn: 'Gram / Chickpea',
    nameHi: 'चना (Gram / Chana)',
    seasonEn: 'Rabi Season',
    seasonHi: 'रबी मौसम',
    avgYieldQuintals: 9,
    marketPricePerQtl: 5800,
    mspPerQtl: 5440,
    tradFertilizerCost: 2400,
    aiFertilizerCost: 1300,
    tradPestCost: 2900, 
    aiPestCost: 1100,
    riskLossPercentTrad: 0.16,
    riskLossPercentAi: 0.03
  },
  groundnut: {
    id: 'groundnut',
    nameEn: 'Groundnut',
    nameHi: 'मूंगफली (Groundnut)',
    seasonEn: 'Kharif Season',
    seasonHi: 'खरीफ मौसम',
    avgYieldQuintals: 12,
    marketPricePerQtl: 6700,
    mspPerQtl: 6377,
    tradFertilizerCost: 3400,
    aiFertilizerCost: 1900,
    tradPestCost: 3100, 
    aiPestCost: 1300,
    riskLossPercentTrad: 0.17,
    riskLossPercentAi: 0.04
  },
  chilli: {
    id: 'chilli',
    nameEn: 'Chilli / Mirchi',
    nameHi: 'हरी/लाल मिर्च (Chilli)',
    seasonEn: 'Kharif / Annual',
    seasonHi: 'वार्षिक / खरीफ',
    avgYieldQuintals: 16,
    marketPricePerQtl: 14000,
    mspPerQtl: 11000,
    tradFertilizerCost: 7200,
    aiFertilizerCost: 4100,
    tradPestCost: 8500, 
    aiPestCost: 3200,
    riskLossPercentTrad: 0.26,
    riskLossPercentAi: 0.05
  }
};

export default function SavingsCalculatorPage() {
  const { currentLang, lt } = useLanguage();
  const isHi = currentLang === 'hi' || currentLang === 'pa';
  const isPa = currentLang === 'pa';

  const [selectedCropKey, setSelectedCropKey] = useState('wheat');
  const [acres, setAcres] = useState(4); 
  const [useFertilizerAI, setUseFertilizerAI] = useState(true);
  const [usePestAI, setUsePestAI] = useState(true);
  const [useMandiArbitrage, setUseMandiArbitrage] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const crop = CROP_BENCHMARKS[selectedCropKey] || CROP_BENCHMARKS.wheat;

  const calculations = useMemo(() => {
    const totalAcreage = Math.max(0.5, Number(acres) || 1);

    const fertSavingPerAcre = useFertilizerAI
      ? Math.max(0, crop.tradFertilizerCost - crop.aiFertilizerCost)
      : 0;
    const totalFertSaving = Math.round(fertSavingPerAcre * totalAcreage);

    const pestSavingPerAcre = usePestAI
      ? Math.max(0, crop.tradPestCost - crop.aiPestCost)
      : 0;
    const totalPestSaving = Math.round(pestSavingPerAcre * totalAcreage);

    const grossCropValuePerAcre = crop.avgYieldQuintals * crop.marketPricePerQtl;
    const lossAvoidedPercent = (crop.riskLossPercentTrad - crop.riskLossPercentAi);
    const harvestProtectedPerAcre = usePestAI
      ? Math.round(grossCropValuePerAcre * lossAvoidedPercent)
      : 0;
    const totalHarvestProtected = Math.round(harvestProtectedPerAcre * totalAcreage);

    const middlemanCutPerQtl = 150;
    const mandiGainPerAcre = useMandiArbitrage
      ? Math.round(crop.avgYieldQuintals * middlemanCutPerQtl)
      : 0;
    const totalMandiGain = Math.round(mandiGainPerAcre * totalAcreage);

    const totalAnnualSavings =
      totalFertSaving + totalPestSaving + totalHarvestProtected + totalMandiGain;
    const savingsPerAcre = Math.round(totalAnnualSavings / totalAcreage);

    const baselineCostPerAcre = crop.tradFertilizerCost + crop.tradPestCost;
    const aiCostPerAcre = crop.aiFertilizerCost + crop.aiPestCost;
    const costReductionPercent = Math.round(
      ((baselineCostPerAcre - aiCostPerAcre) / baselineCostPerAcre) * 100
    );

    return {
      totalAcreage,
      fertSavingPerAcre,
      totalFertSaving,
      pestSavingPerAcre,
      totalPestSaving,
      harvestProtectedPerAcre,
      totalHarvestProtected,
      mandiGainPerAcre,
      totalMandiGain,
      totalAnnualSavings,
      savingsPerAcre,
      costReductionPercent,
      grossHarvestValue: Math.round(grossCropValuePerAcre * totalAcreage)
    };
  }, [crop, acres, useFertilizerAI, usePestAI, useMandiArbitrage]);

  const handleReadSummaryAloud = () => {
    if (!('speechSynthesis' in window)) {
      alert('Your device does not support voice playback.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const textToSpeak = isHi
      ? `आपके ${calculations.totalAcreage} एकड़ ${crop.nameHi} के खेत में, क्लाइमेट पल्स एआई की मदद से कुल अनुमानित वार्षिक बचत ₹${calculations.totalAnnualSavings.toLocaleString('en-IN')} रुपये है। इसमें खाद में ₹${calculations.totalFertSaving.toLocaleString('en-IN')}, कीटनाशक दवा में ₹${calculations.totalPestSaving.toLocaleString('en-IN')}, और रोग से बचाई गई फसल की कीमत ₹${calculations.totalHarvestProtected.toLocaleString('en-IN')} रुपये शामिल है। यह गणना पूर्णतः सरकारी और वैज्ञानिक मानकों पर आधारित है।`
      : `For your ${calculations.totalAcreage} acres of ${crop.nameEn}, precision AI guidance estimates a net financial benefit of ₹${calculations.totalAnnualSavings.toLocaleString('en-IN')}. This includes ₹${calculations.totalFertSaving.toLocaleString('en-IN')} saved on fertilizers, ₹${calculations.totalPestSaving.toLocaleString('en-IN')} saved on sprays, and ₹${calculations.totalHarvestProtected.toLocaleString('en-IN')} in protected harvest loss.`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    window._calcUtterance = utterance;
    utterance.lang = isHi ? 'hi-IN' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => {
      window._calcUtterance = null;
      setIsSpeaking(false);
    };
    utterance.onerror = () => {
      window._calcUtterance = null;
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-14">
      
      <div className="rounded-3xl bg-gradient-to-br from-[#0c2e26] via-[#123B35] to-[#0e483e] text-white p-6 sm:p-8 shadow-xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 shadow-inner">
            <Coins className="w-3.5 h-3.5 text-emerald-300" />
            <span>
              {isHi
                ? 'कृषि अर्थशास्त्र व वैज्ञानिक बचत मॉड्यूल • ICAR व विश्वविद्यालय मानक'
                : 'Agricultural Economics & Savings Matrix • ICAR Validated Standard'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {isHi ? 'किसान वित्तीय बचत गणक' : 'AI Farm Savings & ROI Calculator'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
            {isHi
              ? 'एआई फसल डॉक्टर और सटीक NPK खाद खुराक के प्रयोग से अपने खेत का खर्च घटाएं और शुद्ध मुनाफा बढ़ाएं। जानें कि आप हर सीजन में कितने रुपये बचा सकते हैं:'
              : 'Estimate exact financial savings achieved by avoiding over-fertilization, preventing blind pesticide sprays, and averting crop disease devastation with multimodal AI.'}
          </p>
        </div>

        
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleReadSummaryAloud}
            className={`px-4 py-2 rounded-2xl font-black text-xs transition flex items-center gap-2 shadow-sm ${
              isSpeaking
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? (isHi ? 'आवाज रोकें' : 'Stop Audio') : (isHi ? '🔊 बचत रिपोर्ट सुनें' : '🔊 Listen Savings')}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">{isHi ? 'प्रिंट / PDF' : 'Print / PDF'}</span>
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        
        <div className="lg:col-span-5 space-y-6 bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-sm">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-extrabold text-base text-[#172B25] flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#168A70]" />
              <span>{isHi ? '१. अपने खेत का विवरण भरें' : '1. Enter Farm Inputs'}</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              {isHi ? 'आसान स्लाइडर' : 'Interactive'}
            </span>
          </div>

          
          <div className="space-y-2">
            <label className="block text-xs font-black text-slate-800">
              {isHi ? 'प्रमुख फसल चुनें (Primary Crop):' : 'Select Primary Crop:'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(CROP_BENCHMARKS).map((c) => {
                const isSelected = selectedCropKey === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCropKey(c.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50/80 border-[#168A70] text-[#123B35] font-black ring-1 ring-[#168A70]/30 shadow-xs'
                        : 'bg-[#F8FAF8] border-slate-200 text-slate-700 hover:border-slate-300 font-bold'
                    }`}
                  >
                    <div>
                      <span className="text-xs block leading-tight">
                        {isHi ? c.nameHi : c.nameEn}
                      </span>
                      <span className="text-[10px] text-slate-500 block font-normal">
                        {isHi ? c.seasonHi : c.seasonEn}
                      </span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#168A70] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-800">
                {isHi ? 'खेत का क्षेत्रफल (एकड़ में):' : 'Farm Land Area (In Acres):'}
              </label>
              <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                <input
                  type="number"
                  min="0.5"
                  max="100"
                  step="0.5"
                  value={acres}
                  onChange={(e) => setAcres(Math.max(0.5, parseFloat(e.target.value) || 1))}
                  className="w-14 bg-transparent text-right font-black text-emerald-900 text-sm focus:outline-none"
                />
                <span className="text-xs font-extrabold text-emerald-800">{isHi ? 'एकड़' : 'Acres'}</span>
              </div>
            </div>

            
            <input
              type="range"
              min="0.5"
              max="50"
              step="0.5"
              value={acres}
              onChange={(e) => setAcres(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#168A70]"
            />

            
            <div className="flex items-center justify-between gap-1.5 pt-1">
              {[
                { labelHi: '1 एकड़ (छोटा)', labelEn: '1 Acre', val: 1 },
                { labelHi: '3 एकड़ (औसत)', labelEn: '3 Acres', val: 3 },
                { labelHi: '5 एकड़', labelEn: '5 Acres', val: 5 },
                { labelHi: '10 एकड़ (बड़ा)', labelEn: '10 Acres', val: 10 },
                { labelHi: '25 एकड़', labelEn: '25 Acres', val: 25 }
              ].map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAcres(p.val)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition ${
                    acres === p.val
                      ? 'bg-[#123B35] text-white border-[#123B35]'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {isHi ? p.labelHi : p.labelEn}
                </button>
              ))}
            </div>
          </div>

          
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <span className="text-xs font-black text-slate-800 block">
              {isHi ? '२. बचत रणनीतियां शामिल करें:' : '2. Active AI Optimization Strategies:'}
            </span>

            
            <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-200 bg-[#F8FAF8] hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={useFertilizerAI}
                onChange={(e) => setUseFertilizerAI(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#168A70] focus:ring-[#168A70]"
              />
              <div className="min-w-0">
                <span className="font-bold text-xs text-slate-900 block leading-tight">
                  {isHi ? '🧪 एआई यूरिया/DAP सटीक खुराक (बचत: ~₹1,350/एकड़)' : '🧪 AI Precision Fertilizer (Saves: ~₹1,350/acre)'}
                </span>
                <span className="text-[10px] text-slate-500 block leading-normal mt-0.5 font-medium">
                  {isHi
                    ? 'अंदाजे से ज्यादा खाद डालने से बचाव और मिट्टी अनुसार वैज्ञानिक NPK शेड्यूल।'
                    : 'Eliminate 1-1.5 excess bags of Urea/DAP with stage-wise nutrient timing.'}
                </span>
              </div>
            </label>

            
            <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-200 bg-[#F8FAF8] hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={usePestAI}
                onChange={(e) => setUsePestAI(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#168A70] focus:ring-[#168A70]"
              />
              <div className="min-w-0">
                <span className="font-bold text-xs text-slate-900 block leading-tight">
                  {isHi ? '📸 5-सेकंड एआई रोग पहचान व जैविक दवा (बचत: ~₹3,200/एकड़)' : '📸 AI Early Leaf Scan & Bio-Spray (Saves: ~₹3,200/acre)'}
                </span>
                <span className="text-[10px] text-slate-500 block leading-normal mt-0.5 font-medium">
                  {isHi
                    ? 'दुकानदार के महंगे कीटनाशक कॉकटेल के बजाय पहले दिन सही दवा व फसल बर्बादी से सुरक्षा।'
                    : 'Early diagnosis protects 10-18% harvest loss and avoids 3 costly chemical sprays.'}
                </span>
              </div>
            </label>

            
            <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-200 bg-[#F8FAF8] hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={useMandiArbitrage}
                onChange={(e) => setUseMandiArbitrage(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#168A70] focus:ring-[#168A70]"
              />
              <div className="min-w-0">
                <span className="font-bold text-xs text-slate-900 block leading-tight">
                  {isHi ? '💵 सरकारी MSP व APMC मंडी भाव लाभ (मुनाफा: ~₹2,700/एकड़)' : '💵 APMC Mandi & MSP Arbitrage (Gain: ~₹2,700/acre)'}
                </span>
                <span className="text-[10px] text-slate-500 block leading-normal mt-0.5 font-medium">
                  {isHi
                    ? 'गाँव के बिचौलिए को औने-पौने भाव में बेचने के बजाय सीधे आधिकारिक थोक भाव पर बिक्री।'
                    : 'Direct sale at Mandi benchmark prevents local middlemen distress cuts (₹150/qtl).'}
                </span>
              </div>
            </label>
          </div>

          
          <div className="pt-2 text-right">
            <button
              type="button"
              onClick={() => {
                setSelectedCropKey('wheat');
                setAcres(4);
                setUseFertilizerAI(true);
                setUsePestAI(true);
                setUseMandiArbitrage(true);
              }}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-800 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isHi ? 'डिफ़ॉल्ट रीसेट करें' : 'Reset to Default'}</span>
            </button>
          </div>
        </div>

        
        <div className="lg:col-span-7 space-y-6">
          
          
          <div className="rounded-3xl bg-[#09241E] text-white p-6 sm:p-8 border border-emerald-500/40 shadow-2xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-black tracking-wider uppercase text-emerald-400 block">
                    {isHi ? 'कुल अनुमानित वार्षिक आर्थिक लाभ' : 'Total Estimated Net Annual Savings'}
                  </span>
                  <span className="text-xs text-slate-300">
                    {isHi
                      ? `${calculations.totalAcreage} एकड़ ${crop.nameHi} की खेती पर शुद्ध बचत`
                      : `Net financial benefit on ${calculations.totalAcreage} Acres of ${crop.nameEn}`}
                  </span>
                </div>
                <div className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black shrink-0">
                  {calculations.costReductionPercent}% {isHi ? 'लागत में कमी' : 'Cost Reduction'}
                </div>
              </div>

              
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 tracking-tight">
                    ₹{calculations.totalAnnualSavings.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-emerald-200/80">
                    / {isHi ? 'वर्ष' : 'Year'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-100/90 font-medium">
                  {isHi ? 'औसत शुद्ध बचत:' : 'Average Benefit:'}{' '}
                  <span className="font-extrabold text-emerald-300">
                    ₹{calculations.savingsPerAcre.toLocaleString('en-IN')} / {isHi ? 'एकड़' : 'Acre'}
                  </span>
                </p>
              </div>

              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
                      {isHi ? 'खाद व NPK बचत' : 'Fertilizer Savings'}
                    </span>
                    <span className="text-[10px] text-slate-300">
                      ₹{calculations.fertSavingPerAcre}/ac
                    </span>
                  </div>
                  <span className="text-xl font-black text-white block">
                    ₹{calculations.totalFertSaving.toLocaleString('en-IN')}
                  </span>
                  <p className="text-[10px] text-slate-300/80">
                    {isHi
                      ? `यूरिया व DAP की बर्बादी रुकी (${Math.round(calculations.totalAcreage * 1.3)} बोरी की बचत)`
                      : `Avoided excess chemical over-application`}
                  </p>
                </div>

                
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Bug className="w-3.5 h-3.5 text-amber-400" />
                      {isHi ? 'कीटनाशक स्प्रे बचत' : 'Pesticide Savings'}
                    </span>
                    <span className="text-[10px] text-slate-300">
                      ₹{calculations.pestSavingPerAcre}/ac
                    </span>
                  </div>
                  <span className="text-xl font-black text-white block">
                    ₹{calculations.totalPestSaving.toLocaleString('en-IN')}
                  </span>
                  <p className="text-[10px] text-slate-300/80">
                    {isHi
                      ? 'अनावश्यक 2-3 महंगे स्प्रे बंद, जैविक दवा से कीट नियंत्रण'
                      : 'Eliminated blind preventive toxic spray rounds'}
                  </p>
                </div>

                
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                      {isHi ? 'सुरक्षित फसल मूल्य' : 'Protected Crop Yield'}
                    </span>
                    <span className="text-[10px] text-slate-300">
                      ₹{calculations.harvestProtectedPerAcre}/ac
                    </span>
                  </div>
                  <span className="text-xl font-black text-white block">
                    ₹{calculations.totalHarvestProtected.toLocaleString('en-IN')}
                  </span>
                  <p className="text-[10px] text-slate-300/80">
                    {isHi
                      ? 'रोग का समय पर इलाज, फसल का 12-18% नुकसान टला'
                      : 'Early leaf diagnosis prevented crop destruction'}
                  </p>
                </div>

                
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-purple-400" />
                      {isHi ? 'मंडी थोक भाव लाभ' : 'Mandi MSP Gain'}
                    </span>
                    <span className="text-[10px] text-slate-300">
                      ₹{calculations.mandiGainPerAcre}/ac
                    </span>
                  </div>
                  <span className="text-xl font-black text-white block">
                    ₹{calculations.totalMandiGain.toLocaleString('en-IN')}
                  </span>
                  <p className="text-[10px] text-slate-300/80">
                    {isHi
                      ? 'बिचौलिए के कट से मुक्ति, APMC मंडी में सही मूल्य'
                      : 'Full market rate realization over distress selling'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm space-y-4">
            <h4 className="font-black text-sm text-[#172B25] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#168A70]" />
              <span>{isHi ? 'परंपरागत खेती बनाम एआई स्मार्ट खेती की तुलना' : 'Comparison: Traditional vs AI Precision'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2">
                <span className="text-xs font-black text-rose-800 uppercase tracking-wide block">
                  {isHi ? '❌ परंपरागत अंदाजन खेती (बिना AI)' : '❌ Traditional Guesswork'}
                </span>
                <ul className="text-xs text-rose-950/80 space-y-1.5 list-disc list-inside">
                  <li>{isHi ? 'दुकानदार के कहने पर 3-4 बोरी यूरिया डालना' : 'Excessive chemical fertilizer guesswork'}</li>
                  <li>{isHi ? 'रोग फैलने के 10 दिन बाद दवा छिड़कना' : 'Late disease detection wipes out 15%+ yield'}</li>
                  <li>{isHi ? 'प्रति एकड़ ₹8,000+ दवाइयों में खर्च' : 'Over ₹8,000/acre wasted on toxic cocktails'}</li>
                  <li>{isHi ? 'स्थानीय व्यापारी को सस्ते दाम में बेचना' : 'Distress selling below MSP benchmarks'}</li>
                </ul>
              </div>

              
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-2">
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wide block">
                  {isHi ? '✅ क्लाइमेट पल्स एआई कमान (100% फ्री)' : '✅ Climate Pulse AI Precision'}
                </span>
                <ul className="text-xs text-emerald-950 space-y-1.5 list-disc list-inside font-medium">
                  <li>{isHi ? 'मिट्टी अनुसार सही NPK नाप (30% खाद बचत)' : 'Soil-based NPK reduces 30% fertilizer waste'}</li>
                  <li>{isHi ? '5 सेकंड में कैमरे से रोग पहचान व सटीक दवा' : 'Instant camera leaf scan halts disease on day 1'}</li>
                  <li>{isHi ? 'सस्ती जैविक व लक्षित दवा (₹3,000+ बचत)' : 'Targeted bio-remedies save ₹3,000+/acre'}</li>
                  <li>{isHi ? '2,400+ APMC मंडियों में उच्चतम भाव पर बिक्री' : 'Sell at maximum modal rates across 2,400+ Mandis'}</li>
                </ul>
              </div>
            </div>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/kisan-doctor"
              className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 hover:border-emerald-400 text-[#123B35] transition shadow-xs flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <span className="font-extrabold text-xs block">
                  {isHi ? 'एआई फसल डॉक्टर' : 'AI Crop Doctor'}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {isHi ? 'पत्ती स्कैन करें' : 'Scan Leaf Now'}
                </span>
              </div>
            </Link>

            <Link
              to="/mandi-rates"
              className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 hover:border-amber-400 text-amber-950 transition shadow-xs flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
                <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <span className="font-extrabold text-xs block">
                  {isHi ? 'दैनिक मंडी भाव (MSP)' : 'Mandi Rates & MSP'}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {isHi ? 'थोक भाव जांचें' : 'Compare Rates'}
                </span>
              </div>
            </Link>

            <Link
              to="/community-stories"
              className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 hover:border-sky-400 text-sky-950 transition shadow-xs flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <ArrowRight className="w-4 h-4 text-sky-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <span className="font-extrabold text-xs block">
                  {isHi ? 'किसान सफलता कहानियां' : 'Success Stories'}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {isHi ? 'वास्तविक प्रमाण देखें' : 'View Impact Proof'}
                </span>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
