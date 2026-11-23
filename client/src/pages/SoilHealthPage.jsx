import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  FileText,
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Printer,
  Download,
  RotateCcw,
  Sparkles,
  Info,
  Droplet,
  Layers,
  Thermometer,
  ShieldAlert
} from 'lucide-react';

const PRESET_SOILS = [
  {
    id: 'alluvial',
    nameEn: 'Indo-Gangetic Alluvial (दोमट)',
    nameHi: 'सिंधु-गंगा जलोढ़ दोमट मिट्टी',
    pH: 7.2,
    ec: 0.42,
    oc: 0.58,
    nitrogen: 240, 
    phosphorus: 18.5, 
    potassium: 290, 
    sulphur: 12.0, 
    zinc: 0.72, 
    iron: 5.4, 
    boron: 0.45 
  },
  {
    id: 'black',
    nameEn: 'Deccan Black Soil (काली रेगुर)',
    nameHi: 'दक्कन काली रेगुर मिट्टी',
    pH: 8.1, 
    ec: 0.55,
    oc: 0.65,
    nitrogen: 210,
    phosphorus: 11.2,
    potassium: 360,
    sulphur: 8.5,
    zinc: 0.48,
    iron: 4.1,
    boron: 0.38
  },
  {
    id: 'red',
    nameEn: 'Red & Yellow Sandy Loam (लाल-पीली)',
    nameHi: 'लाल-पीली बलुई मिट्टी',
    pH: 6.1, 
    ec: 0.28,
    oc: 0.35, 
    nitrogen: 180,
    phosphorus: 9.0,
    potassium: 160,
    sulphur: 7.1,
    zinc: 0.41,
    iron: 8.5,
    boron: 0.32
  },
  {
    id: 'acidic_hill',
    nameEn: 'Acidic Laterite / Hill Soil (अम्लीय मिट्टी)',
    nameHi: 'अम्लीय लेटराइट / पहाड़ी मिट्टी',
    pH: 5.2, 
    ec: 0.22,
    oc: 0.82,
    nitrogen: 310,
    phosphorus: 6.8,
    potassium: 140,
    sulphur: 14.0,
    zinc: 0.52,
    iron: 15.2,
    boron: 0.25
  }
];

export default function SoilHealthPage() {
  const { currentLang, lt } = useLanguage();
  const isHi = currentLang === 'hi' || currentLang === 'pa';

  const [selectedPreset, setSelectedPreset] = useState(PRESET_SOILS[0]);
  const [soilData, setSoilData] = useState(PRESET_SOILS[0]);
  const [farmerName, setFarmerName] = useState('Nitish Yadav');
  const [plotSize, setPlotSize] = useState('2.5'); 

  const handlePresetChange = (preset) => {
    setSelectedPreset(preset);
    setSoilData({ ...preset });
  };

  const handleParamChange = (field, value) => {
    setSoilData((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const getNitrogenStatus = (n) => {
    if (n < 280) return { status: isHi ? 'निम्न (कमी)' : 'Low (Deficient)', color: 'text-amber-600 bg-amber-50', level: 'low' };
    if (n <= 560) return { status: isHi ? 'मध्यम (पर्याप्त)' : 'Medium (Adequate)', color: 'text-emerald-600 bg-emerald-50', level: 'med' };
    return { status: isHi ? 'उच्च (अधिक)' : 'High (Excess)', color: 'text-blue-600 bg-blue-50', level: 'high' };
  };

  const getPhosphorusStatus = (p) => {
    if (p < 10) return { status: isHi ? 'निम्न' : 'Low', color: 'text-rose-600 bg-rose-50', level: 'low' };
    if (p <= 25) return { status: isHi ? 'मध्यम' : 'Medium', color: 'text-emerald-600 bg-emerald-50', level: 'med' };
    return { status: isHi ? 'उच्च' : 'High', color: 'text-blue-600 bg-blue-50', level: 'high' };
  };

  const getPotassiumStatus = (k) => {
    if (k < 140) return { status: isHi ? 'निम्न' : 'Low', color: 'text-rose-600 bg-rose-50', level: 'low' };
    if (k <= 280) return { status: isHi ? 'मध्यम' : 'Medium', color: 'text-emerald-600 bg-emerald-50', level: 'med' };
    return { status: isHi ? 'उच्च' : 'High', color: 'text-blue-600 bg-blue-50', level: 'high' };
  };

  const getPHStatus = (ph) => {
    if (ph < 6.5) return { label: isHi ? 'अम्लीय (Acidic)' : 'Acidic', color: 'text-rose-600 bg-rose-50', advice: isHi ? 'चूना (Lime) का प्रयोग आवश्यक' : 'Apply Agricultural Lime' };
    if (ph <= 7.8) return { label: isHi ? 'अनुकूल (Normal/Neutral)' : 'Optimal/Neutral', color: 'text-emerald-600 bg-emerald-50', advice: isHi ? 'उचित पोषक तत्व उपलब्धता' : 'Optimal Nutrient Uptake' };
    return { label: isHi ? 'क्षारीय (Alkaline)' : 'Alkaline', color: 'text-amber-600 bg-amber-50', advice: isHi ? 'जिप्सम (Gypsum) का प्रयोग आवश्यक' : 'Apply Gypsum for Reclamation' };
  };

  const getOCStatus = (oc) => {
    if (oc < 0.5) return { label: isHi ? 'निम्न जीवांश (<0.5%)' : 'Deficient (<0.5%)', color: 'text-rose-600' };
    if (oc <= 0.75) return { label: isHi ? 'मध्यम जीवांश (0.5-0.75%)' : 'Medium (0.5-0.75%)', color: 'text-amber-600' };
    return { label: isHi ? 'उत्तम जीवांश (>0.75%)' : 'Rich (>0.75%)', color: 'text-emerald-600' };
  };

  const calculateScore = () => {
    let score = 50;
    if (soilData.pH >= 6.5 && soilData.pH <= 7.8) score += 15;
    else score -= 10;
    if (soilData.oc >= 0.6) score += 15;
    else if (soilData.oc < 0.4) score -= 10;
    if (soilData.nitrogen >= 250) score += 10;
    if (soilData.phosphorus >= 12) score += 10;
    if (soilData.potassium >= 150) score += 10;
    if (soilData.zinc >= 0.6) score += 5;
    if (soilData.sulphur >= 10) score += 5;
    return Math.max(20, Math.min(100, score));
  };

  const healthScore = calculateScore();

  return (
    <div className="space-y-6">
      
      <div className="bg-gradient-to-r from-[#123B35] to-[#168A70] text-white rounded-2xl p-6 shadow-sm border border-emerald-900/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-200">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>{isHi ? 'कृषि एवं किसान कल्याण मंत्रालय — मृदा स्वास्थ्य परीक्षण' : 'Govt of India — Soil Health Card Diagnostics'}</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
              {isHi ? '🧪 किसान मृदा स्वास्थ्य कार्ड (Soil Health Card)' : '🧪 Kisan Soil Health Card & Lab Diagnostics'}
            </h1>
            <p className="text-sm text-emerald-100 max-w-2xl">
              {isHi
                ? 'अपनी मिट्टी के 12 पोषक तत्वों (NPK, pH, जैविक कार्बन, जिंक, सल्फर) का वैज्ञानिक विश्लेषण और संतुलित उर्वरक खुराक प्राप्त करें।'
                : 'Scientific testing and balanced fertilizer recommendations for 12 essential soil parameters based on official ICAR standards.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-[#123B35] hover:bg-slate-100 transition shadow-sm"
            >
              <Printer className="w-4 h-4 text-emerald-700" />
              <span>{isHi ? 'कार्ड प्रिंट करें' : 'Print Card'}</span>
            </button>
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {isHi ? 'नमूना मिट्टी प्रकार चुनें (या मान बदलें)' : 'Select Reference Soil Profile (Or adjust values below):'}
          </span>
          <span className="text-xs text-emerald-700 font-semibold">
            {isHi ? 'प्रयोगशाला मानक: ICAR / IARI' : 'Lab Standard: ICAR / IARI Standards'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {PRESET_SOILS.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handlePresetChange(preset)}
                className={`p-3 rounded-xl border text-left transition ${
                  isSelected
                    ? 'border-[#168A70] bg-emerald-50/70 text-slate-900 ring-2 ring-[#168A70]'
                    : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <p className="font-extrabold text-xs">{isHi ? preset.nameHi : preset.nameEn}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  pH: {preset.pH} • OC: {preset.oc}%
                </p>
              </button>
            );
          })}
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0 ${
              healthScore >= 75
                ? 'bg-emerald-100 text-emerald-800'
                : healthScore >= 50
                ? 'bg-amber-100 text-amber-800'
                : 'bg-rose-100 text-rose-800'
            }`}
          >
            {healthScore}
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {isHi ? 'मृदा स्वास्थ्य सूचकांक' : 'Soil Health Index'}
            </span>
            <p className="text-base font-extrabold text-slate-900 mt-0.5">
              {healthScore >= 75
                ? isHi ? 'उत्कृष्ट एवं उपजाऊ' : 'Fertile & Balanced'
                : healthScore >= 50
                ? isHi ? 'मध्यम — सुधारात्मक खुराक आवश्यक' : 'Moderate — Needs Corrections'
                : isHi ? 'कमजोर — तत्काल उपचार जरूरी' : 'Critical — Immediate Reclamation'}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {isHi ? '100 में से समग्र उर्वरता स्कोर' : 'Overall fertility composite out of 100'}
            </p>
          </div>
        </div>

        
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-800 flex flex-col items-center justify-center font-black text-xl flex-shrink-0 border border-teal-200">
            <span>{soilData.pH}</span>
            <span className="text-[9px] font-bold text-teal-600 uppercase">pH</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {isHi ? 'मिट्टी का पीएच मान' : 'Soil Reaction (pH)'}
            </span>
            <p className="text-sm font-extrabold text-slate-900 mt-0.5">
              {getPHStatus(soilData.pH).label}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {getPHStatus(soilData.pH).advice}
            </p>
          </div>
        </div>

        
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-900 flex flex-col items-center justify-center font-black text-xl flex-shrink-0 border border-amber-200">
            <span>{soilData.oc}%</span>
            <span className="text-[9px] font-bold text-amber-700 uppercase">OC</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {isHi ? 'जैविक कार्बन (Organic Carbon)' : 'Organic Carbon (OC)'}
            </span>
            <p className="text-sm font-extrabold text-slate-900 mt-0.5">
              {getOCStatus(soilData.oc).label}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {isHi ? 'आदर्श स्तर > 0.75% होना चाहिए' : 'Benchmark level > 0.75%'}
            </p>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                {isHi ? 'मृदा पोषक तत्व परीक्षण परिणाम' : 'Soil Nutrient Test Results & Ratings'}
              </h2>
              <p className="text-xs text-slate-500">
                {isHi ? 'मानक प्रयोगशाला परीक्षण सीमा के अनुसार स्थिति' : 'Rated against ICAR Standard Fertility Thresholds'}
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {isHi ? 'सरकारी प्रारूप (SHC)' : 'Govt SHC Format'}
            </span>
          </div>

          
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isHi ? '1. प्राथमिक पोषक तत्व (NPK)' : '1. Primary Macro Nutrients (NPK)'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800">Nitrogen (N)</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${getNitrogenStatus(soilData.nitrogen).color}`}>
                    {getNitrogenStatus(soilData.nitrogen).status}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-black text-slate-900">{soilData.nitrogen}</span>
                  <span className="text-[11px] text-slate-500 font-medium">kg / hectare</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="600"
                  value={soilData.nitrogen}
                  onChange={(e) => handleParamChange('nitrogen', e.target.value)}
                  className="w-full accent-[#168A70] cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">{isHi ? 'मानक: <280 कम, >560 उच्च' : 'Range: <280 Low, >560 High'}</span>
              </div>

              
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800">Phosphorus (P)</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${getPhosphorusStatus(soilData.phosphorus).color}`}>
                    {getPhosphorusStatus(soilData.phosphorus).status}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-black text-slate-900">{soilData.phosphorus}</span>
                  <span className="text-[11px] text-slate-500 font-medium">kg / hectare</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="45"
                  step="0.5"
                  value={soilData.phosphorus}
                  onChange={(e) => handleParamChange('phosphorus', e.target.value)}
                  className="w-full accent-[#168A70] cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">{isHi ? 'मानक: <10 कम, 10-25 मध्यम' : 'Range: <10 Low, 10-25 Medium'}</span>
              </div>

              
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800">Potassium (K)</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${getPotassiumStatus(soilData.potassium).color}`}>
                    {getPotassiumStatus(soilData.potassium).status}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-black text-slate-900">{soilData.potassium}</span>
                  <span className="text-[11px] text-slate-500 font-medium">kg / hectare</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="450"
                  value={soilData.potassium}
                  onChange={(e) => handleParamChange('potassium', e.target.value)}
                  className="w-full accent-[#168A70] cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">{isHi ? 'मानक: <140 कम, 140-280 मध्यम' : 'Range: <140 Low, >280 High'}</span>
              </div>
            </div>
          </div>

          
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-2">
              <FlaskConical className="w-3.5 h-3.5 text-teal-600" />
              <span>{isHi ? '2. सूक्ष्म पोषक तत्व (Micronutrients)' : '2. Secondary & Micronutrients'}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">Sulphur (S)</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${soilData.sulphur < 10 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {soilData.sulphur < 10 ? (isHi ? 'कमी' : 'Deficient') : (isHi ? 'पर्याप्त' : 'Sufficient')}
                  </span>
                </div>
                <p className="text-base font-black text-slate-900 mt-1">{soilData.sulphur} <span className="text-[10px] text-slate-400 font-normal">ppm</span></p>
                <span className="text-[9px] text-slate-400 block mt-0.5">{isHi ? 'मानक: >10 ppm' : 'Benchmark: >10 ppm'}</span>
              </div>

              
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">Zinc (Zn)</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${soilData.zinc < 0.6 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {soilData.zinc < 0.6 ? (isHi ? 'कमी' : 'Deficient') : (isHi ? 'पर्याप्त' : 'Sufficient')}
                  </span>
                </div>
                <p className="text-base font-black text-slate-900 mt-1">{soilData.zinc} <span className="text-[10px] text-slate-400 font-normal">ppm</span></p>
                <span className="text-[9px] text-slate-400 block mt-0.5">{isHi ? 'मानक: >0.6 ppm' : 'Benchmark: >0.6 ppm'}</span>
              </div>

              
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">Iron (Fe)</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {isHi ? 'पर्याप्त' : 'Sufficient'}
                  </span>
                </div>
                <p className="text-base font-black text-slate-900 mt-1">{soilData.iron} <span className="text-[10px] text-slate-400 font-normal">ppm</span></p>
                <span className="text-[9px] text-slate-400 block mt-0.5">{isHi ? 'मानक: >4.5 ppm' : 'Benchmark: >4.5 ppm'}</span>
              </div>

              
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">Boron (B)</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${soilData.boron < 0.5 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {soilData.boron < 0.5 ? (isHi ? 'हल्की कमी' : 'Low') : (isHi ? 'पर्याप्त' : 'Sufficient')}
                  </span>
                </div>
                <p className="text-base font-black text-slate-900 mt-1">{soilData.boron} <span className="text-[10px] text-slate-400 font-normal">ppm</span></p>
                <span className="text-[9px] text-slate-400 block mt-0.5">{isHi ? 'मानक: >0.5 ppm' : 'Benchmark: >0.5 ppm'}</span>
              </div>
            </div>
          </div>
        </div>

        
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#123B35]">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h3 className="font-extrabold text-sm">
                {isHi ? 'वैज्ञानिक सुधार नुस्खा (Prescription)' : 'Soil Amendment Prescription'}
              </h3>
            </div>

            
            {soilData.pH < 6.5 ? (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-1">
                <span className="font-bold text-rose-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  {isHi ? 'अम्लता सुधार: कृषि चूना (Lime)' : 'Acidity Reclamation: Lime'}
                </span>
                <p className="text-slate-700">
                  {isHi
                    ? 'मिट्टी अत्यधिक अम्लीय है। प्रति एकड़ 200-300 किग्रा बुझा हुआ चूना (Agri-Lime) जुताई के समय मिलाएं।'
                    : 'Soil is acidic. Apply 250 kg/acre Agricultural Lime during summer ploughing to raise pH.'}
                </p>
              </div>
            ) : soilData.pH > 7.8 ? (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  {isHi ? 'क्षारीयता सुधार: जिप्सम (Gypsum)' : 'Alkalinity Reclamation: Gypsum'}
                </span>
                <p className="text-slate-700">
                  {isHi
                    ? 'मिट्टी क्षारीय है जिससे फॉस्फोरस व जिंक का अवशोषण रुकता है। प्रति एकड़ 400 किग्रा कृषि जिप्सम डालें।'
                    : 'Soil is alkaline. Apply 400 kg/acre Agricultural Gypsum to displace sodium and normalize pH.'}
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {isHi ? 'पीएच मान उत्तम (Balanced pH)' : 'Optimal pH (No Lime/Gypsum needed)'}
                </span>
                <p className="text-slate-700">
                  {isHi
                    ? 'पीएच मान 6.5 से 7.8 के बीच है, जो अधिकांश फसलों के लिए आदर्श है।'
                    : 'Soil pH is in the ideal range. All macro & micronutrients are bioavailable.'}
                </p>
              </div>
            )}

            
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs space-y-1">
              <span className="font-bold text-teal-900 flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-teal-600" />
                {isHi ? 'जैविक कार्बन सुधार (Organic Matter)' : 'Organic Carbon Management'}
              </span>
              <p className="text-slate-700">
                {isHi
                  ? 'प्रति एकड़ 4-5 ट्रॉली अच्छी सड़ी गोबर खाद या वर्मीकम्पोस्ट (केंचुआ खाद) डालें। खरीफ से पूर्व ढैंचा की हरी खाद सर्वोत्तम है।'
                  : 'Incorporate 4-5 tonnes well-decomposed FYM or Vermicompost. Practice Green Manuring (Sesbania/Dhaincha).'}
              </p>
            </div>

            
            {soilData.zinc < 0.6 && (
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs space-y-1">
                <span className="font-bold text-blue-900 flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5 text-blue-600" />
                  {isHi ? 'जिंक की कमी (खैरा रोग से बचाव)' : 'Zinc Deficiency Correction'}
                </span>
                <p className="text-slate-700">
                  {isHi
                    ? 'बुवाई के समय 10 किग्रा जिंक सल्फेट (21%) या खड़ी फसल में 0.5% जिंक सल्फेट + 2% यूरिया का पर्णीय छिड़काव करें।'
                    : 'Apply 10 kg Zinc Sulphate (21%) per acre at basal sowing, or foliar spray 0.5% ZnSO4 + 2% Urea.'}
                </p>
              </div>
            )}

            {soilData.sulphur < 10 && (
              <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-xs space-y-1">
                <span className="font-bold text-yellow-900 flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5 text-yellow-600" />
                  {isHi ? 'सल्फर / गंधक की कमी (तिलहन हेतु)' : 'Sulphur Deficiency (For Oilseeds)'}
                </span>
                <p className="text-slate-700">
                  {isHi
                    ? 'सरसों, मूंगफली और दालों के लिए एसएसपी (Single Super Phosphate) या बेंटोनाइट सल्फर 10 किग्रा प्रति एकड़ डालें।'
                    : 'Apply SSP (Single Super Phosphate) or 10 kg Bentonite Sulphur per acre to boost oil content.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
