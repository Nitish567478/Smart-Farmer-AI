import React, { useState, useEffect } from 'react';
import api, { getErrorMessage } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useOffline } from '../context/OfflineContext';
import {
  DollarSign,
  Search,
  Filter,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  MapPin,
  Calendar,
  AlertCircle,
  Sprout,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Sparkles,
  Building2,
  Database,
  WifiOff
} from 'lucide-react';

const POPULAR_COMMODITIES = [
  { en: 'Wheat', hi: 'गेहूँ', pa: 'ਕਣਕ' },
  { en: 'Rice / Paddy', hi: 'धान / चावल', pa: 'ਝੋਨਾ / ਚਾਵਲ' },
  { en: 'Mustard', hi: 'सरसों', pa: 'ਸਰ੍ਹੋਂ' },
  { en: 'Cotton', hi: 'कपास', pa: 'ਕਪਾਹ / ਨਰਮਾ' },
  { en: 'Maize', hi: 'मक्का', pa: 'ਮੱਕੀ' },
  { en: 'Potato', hi: 'आलू', pa: 'ਆਲੂ' },
  { en: 'Onion', hi: 'प्याज', pa: 'ਪਿਆਜ਼' },
  { en: 'Tomato', hi: 'टमाटर', pa: 'ਟਮਾਟਰ' },
  { en: 'Soybean', hi: 'सोयाबीन', pa: 'ਸੋਇਆਬੀਨ' },
  { en: 'Gram', hi: 'चना', pa: 'ਛੋਲੇ' },
  { en: 'Groundnut', hi: 'मूंगफली', pa: 'ਮੂੰਗਫਲੀ' },
  { en: 'Sugarcane', hi: 'गन्ना', pa: 'ਗੰਨਾ' },
  { en: 'Chilli', hi: 'मिर्च', pa: 'ਮਿਰਚ' },
  { en: 'Bajra', hi: 'बाजरा', pa: 'ਬਾਜਰਾ' },
  { en: 'Jowar', hi: 'ज्वार', pa: 'ਜਵਾਰ' },
  { en: 'Moong', hi: 'मूंग दाल', pa: 'ਮੂੰਗੀ ਦਾਲ' },
  { en: 'Urad', hi: 'उड़द दाल', pa: 'ਮਾਂਹ ਦਾਲ' },
  { en: 'Arhar', hi: 'अरहर / तुअर', pa: 'ਅਰਹਰ ਦਾਲ' },
  { en: 'Garlic', hi: 'लहसुन', pa: 'ਲਸਣ' },
  { en: 'Ginger', hi: 'अदरक', pa: 'ਅਦਰਕ' },
  { en: 'Turmeric', hi: 'हल्दी', pa: 'ਹਲਦੀ' },
  { en: 'Banana', hi: 'केला', pa: 'ਕੇਲਾ' },
  { en: 'Mango', hi: 'आम', pa: 'ਅੰਬ' },
  { en: 'Apple', hi: 'सेब', pa: 'ਸੇਬ' }
];

const INDIAN_STATES_MAP = [
  { en: 'All States', hi: 'सभी राज्य', pa: 'ਸਾਰੇ ਰਾਜ' },
  { en: 'Andhra Pradesh', hi: 'आंध्र प्रदेश', pa: 'ਆਂਧਰਾ ਪ੍ਰਦੇਸ਼' },
  { en: 'Arunachal Pradesh', hi: 'अरुणाचल प्रदेश', pa: 'ਅਰੁਣਾਚਲ ਪ੍ਰਦੇਸ਼' },
  { en: 'Assam', hi: 'असम', pa: 'ਅਸਾਮ' },
  { en: 'Bihar', hi: 'बिहार', pa: 'ਬਿਹਾਰ' },
  { en: 'Chhattisgarh', hi: 'छत्तीसगढ़', pa: 'ਛੱਤੀਸਗੜ੍ਹ' },
  { en: 'Delhi', hi: 'दिल्ली', pa: 'ਦਿੱਲੀ' },
  { en: 'Goa', hi: 'गोवा', pa: 'ਗੋਆ' },
  { en: 'Gujarat', hi: 'गुजरात', pa: 'ਗੁਜਰਾਤ' },
  { en: 'Haryana', hi: 'हरियाणा', pa: 'ਹਰਿਆਣਾ' },
  { en: 'Himachal Pradesh', hi: 'हिमाचल प्रदेश', pa: 'ਹਿਮਾਚਲ ਪ੍ਰਦੇਸ਼' },
  { en: 'Jammu and Kashmir', hi: 'जम्मू और कश्मीर', pa: 'ਜੰਮੂ ਅਤੇ ਕਸ਼ਮੀਰ' },
  { en: 'Jharkhand', hi: 'झारखंड', pa: 'ਝਾਰਖੰਡ' },
  { en: 'Karnataka', hi: 'कर्नाटक', pa: 'ਕਰਨਾਟਕ' },
  { en: 'Kerala', hi: 'केरल', pa: 'ਕੇਰਲਾ' },
  { en: 'Ladakh', hi: 'लद्दाख', pa: 'ਲਦਾਖ' },
  { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश', pa: 'ਮੱਧ ਪ੍ਰਦੇਸ਼' },
  { en: 'Maharashtra', hi: 'महाराष्ट्र', pa: 'ਮਹਾਰਾਸ਼ਟਰ' },
  { en: 'Manipur', hi: 'मणिपुर', pa: 'ਮਣੀਪੁਰ' },
  { en: 'Meghalaya', hi: 'मेघालय', pa: 'ਮੇਘਾਲਿਆ' },
  { en: 'Mizoram', hi: 'मिजोरम', pa: 'ਮਿਜ਼ੋਰਮ' },
  { en: 'Nagaland', hi: 'नागालैंड', pa: 'ਨਾਗਾਲੈਂਡ' },
  { en: 'Odisha', hi: 'ओडिशा', pa: 'ਓਡੀਸ਼ਾ' },
  { en: 'Punjab', hi: 'पंजाब', pa: 'ਪੰਜਾਬ' },
  { en: 'Rajasthan', hi: 'राजस्थान', pa: 'ਰਾਜਸਥਾਨ' },
  { en: 'Sikkim', hi: 'सिक्किम', pa: 'ਸਿੱਕਿਮ' },
  { en: 'Tamil Nadu', hi: 'तमिलनाडु', pa: 'ਤਾਮਿਲਨਾਡੂ' },
  { en: 'Telangana', hi: 'तेलंगाना', pa: 'ਤੇਲੰਗਾਨਾ' },
  { en: 'Tripura', hi: 'त्रिपुरा', pa: 'ਤ੍ਰਿਪੁਰਾ' },
  { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश', pa: 'ਉੱਤਰ ਪ੍ਰਦੇਸ਼' },
  { en: 'Uttarakhand', hi: 'उत्तराखंड', pa: 'ਉੱਤਰਾਖੰਡ' },
  { en: 'West Bengal', hi: 'पश्चिम बंगाल', pa: 'ਪੱਛਮੀ ਬੰਗਾਲ' },
  { en: 'Chandigarh', hi: 'चंडीगढ़', pa: 'ਚੰਡੀਗੜ੍ਹ' },
  { en: 'Puducherry', hi: 'पुडुचेरी', pa: 'ਪੁਡੂਚੇਰੀ' },
  { en: 'Dadra and Nagar Haveli and Daman and Diu', hi: 'दादरा एवं नगर हवेली', pa: 'ਦਾਦਰਾ ਅਤੇ ਨਗਰ ਹਵੇਲੀ' },
  { en: 'Andaman and Nicobar Islands', hi: 'अंडमान और निकोबार', pa: 'ਅੰਡੇਮਾਨ ਅਤੇ ਨਿਕੋਬਾਰ' },
  { en: 'Lakshadweep', hi: 'लक्षद्वीप', pa: 'ਲਕਸ਼ਦੀਪ' }
];

const GOVT_MSP_REF = {
  'Wheat': { msp: 2425, hindi: 'गेहूँ', pa: 'ਕਣਕ', seasonEn: 'Rabi 2024-25', seasonHi: 'रबी 2024-25', seasonPa: 'ਹਾੜ੍ਹੀ 2024-25', agency: 'FCI / CACP' },
  'Rice / Paddy': { msp: 2300, hindi: 'धान / चावल', pa: 'ਝੋਨਾ / ਚਾਵਲ', seasonEn: 'Kharif 2024-25', seasonHi: 'खरीफ 2024-25', seasonPa: 'ਸਾਉਣੀ 2024-25', agency: 'FCI / CACP' },
  'Rice': { msp: 2300, hindi: 'धान (चावल)', pa: 'ਝੋਨਾ (ਚਾਵਲ)', seasonEn: 'Kharif 2024-25', seasonHi: 'खरीफ 2024-25', seasonPa: 'ਸਾਉਣੀ 2024-25', agency: 'FCI / CACP' },
  'Mustard': { msp: 5650, hindi: 'सरसों', pa: 'ਸਰ੍ਹੋਂ', seasonEn: 'Rabi 2024-25', seasonHi: 'रबी 2024-25', seasonPa: 'ਹਾੜ੍ਹੀ 2024-25', agency: 'NAFED / CACP' },
  'Cotton': { msp: 7121, hindi: 'कपास', pa: 'ਕਪਾਹ / ਨਰਮਾ', seasonEn: 'Kharif 2024-25', seasonHi: 'खरीफ 2024-25', seasonPa: 'ਸਾਉਣੀ 2024-25', agency: 'CCI / CACP' },
  'Maize': { msp: 2225, hindi: 'मक्का', pa: 'ਮੱਕੀ', seasonEn: 'Kharif 2024-25', seasonHi: 'खरीफ 2024-25', seasonPa: 'ਸਾਉਣੀ 2024-25', agency: 'NAFED / CACP' },
  'Soybean': { msp: 4892, hindi: 'सोयाबीन', pa: 'ਸੋਇਆਬੀਨ', seasonEn: 'Kharif 2024-25', seasonHi: 'खरीफ 2024-25', seasonPa: 'ਸਾਉਣੀ 2024-25', agency: 'NAFED / CACP' },
  'Gram': { msp: 5440, hindi: 'चना', pa: 'ਛੋਲੇ', seasonEn: 'Rabi 2024-25', seasonHi: 'रबी 2024-25', seasonPa: 'ਹਾੜ੍ਹੀ 2024-25', agency: 'NAFED / CACP' },
  'Groundnut': { msp: 6783, hindi: 'मूंगफली', pa: 'ਮੂੰਗਫਲੀ', seasonEn: 'Kharif 2024-25', seasonHi: 'खरीफ 2024-25', seasonPa: 'ਸਾਉਣੀ 2024-25', agency: 'NAFED / CACP' },
  'Sugarcane': { msp: 340, hindi: 'गन्ना (FRP)', pa: 'ਗੰਨਾ (FRP)', seasonEn: 'Annual 2024-25', seasonHi: 'वार्षिक FRP', seasonPa: 'ਸਾਲਾਨਾ FRP', agency: 'CACP / Sugar Mills' },
  'Bajra': { msp: 2625, hindi: 'बाजरा', pa: 'ਬਾਜਰਾ', seasonEn: 'Kharif 2024-25', seasonHi: 'खरीफ 2024-25', seasonPa: 'ਸਾਉਣੀ 2024-25', agency: 'FCI / CACP' },
  'Jowar': { msp: 3371, hindi: 'ज्वार', pa: 'ਜਵਾਰ', seasonEn: 'Kharif 2024-25', seasonHi: 'खरीफ 2024-25', seasonPa: 'ਸਾਉਣੀ 2024-25', agency: 'FCI / CACP' },
  'Moong': { msp: 8682, hindi: 'मूंग दाल', pa: 'ਮੂੰਗੀ ਦਾਲ', seasonEn: 'Kharif 2024-25', seasonHi: 'खरीफ 2024-25', seasonPa: 'ਸਾਉਣੀ 2024-25', agency: 'NAFED / CACP' },
  'Urad': { msp: 7400, hindi: 'उड़द दाल', pa: 'ਮਾਂਹ ਦਾਲ', seasonEn: 'Kharif 2024-25', seasonHi: 'खरीफ 2024-25', seasonPa: 'ਸਾਉਣੀ 2024-25', agency: 'NAFED / CACP' },
  'Arhar': { msp: 7550, hindi: 'अरहर / तुअर', pa: 'ਅਰਹਰ ਦਾਲ', seasonEn: 'Kharif 2024-25', seasonHi: 'खरीफ 2024-25', seasonPa: 'ਸਾਉਣੀ 2024-25', agency: 'NAFED / CACP' },
  'Potato': { msp: 1350, hindi: 'आलू', pa: 'ਆਲੂ', seasonEn: 'Horticulture Benchmark', seasonHi: 'उद्यानिकी संदर्भ भाव', seasonPa: 'ਬਾਗਬਾਨੀ ਸੰਦਰਭ ਭਾਅ', agency: 'State Horticulture' },
  'Tomato': { msp: 1600, hindi: 'टमाटर', pa: 'ਟਮਾਟਰ', seasonEn: 'TOP Benchmark', seasonHi: 'टीओपी संदर्भ भाव', seasonPa: 'ਟੀਓਪੀ ਸੰਦਰਭ ਭਾਅ', agency: 'MoFPI' },
  'Onion': { msp: 2100, hindi: 'प्याज', pa: 'ਪਿਆਜ਼', seasonEn: 'Buffer Benchmark', seasonHi: 'बफर संदर्भ भाव', seasonPa: 'ਬਫਰ ਸੰਦਰਭ ਭਾਅ', agency: 'NAFED / NCCF' },
  'Garlic': { msp: 6500, hindi: 'लहसुन', pa: 'ਲਸਣ', seasonEn: 'Spice Benchmark', seasonHi: 'मसाला संदर्भ भाव', seasonPa: 'ਮਸਾਲਾ ਸੰਦਰਭ ਭਾਅ', agency: 'Spices Board' },
  'Ginger': { msp: 5800, hindi: 'अदरक', pa: 'ਅਦਰਕ', seasonEn: 'Spice Benchmark', seasonHi: 'मसाला संदर्भ भाव', seasonPa: 'ਮਸਾਲਾ ਸੰਦਰਭ ਭਾਅ', agency: 'Spices Board' },
  'Turmeric': { msp: 8200, hindi: 'हल्दी', pa: 'ਹਲਦੀ', seasonEn: 'Spice Benchmark', seasonHi: 'मसाला संदर्भ भाव', seasonPa: 'ਮਸਾਲਾ ਸੰਦਰਭ ਭਾਅ', agency: 'Spices Board' },
  'Chilli': { msp: 9500, hindi: 'मिर्च', pa: 'ਮਿਰਚ', seasonEn: 'Commercial Benchmark', seasonHi: 'व्यापारिक संदर्भ भाव', seasonPa: 'ਵਪਾਰਕ ਸੰਦਰਭ ਭਾਅ', agency: 'Spices Board' },
  'Banana': { msp: 1800, hindi: 'केला', pa: 'ਕੇਲਾ', seasonEn: 'Fruit Benchmark', seasonHi: 'फल संदर्भ भाव', seasonPa: 'ਫਲ ਸੰਦਰਭ ਭਾਅ', agency: 'NHB' },
  'Mango': { msp: 3200, hindi: 'आम', pa: 'ਅੰਬ', seasonEn: 'Fruit Benchmark', seasonHi: 'फल संदर्भ भाव', seasonPa: 'ਫਲ ਸੰਦਰਭ ਭਾਅ', agency: 'NHB' },
  'Apple': { msp: 5500, hindi: 'सेब', pa: 'ਸੇਬ', seasonEn: 'HPMC Benchmark', seasonHi: 'एचपीएमसी संदर्भ भाव', seasonPa: 'ਐਚਪੀਐਮਸੀ ਸੰਦਰਭ ਭਾਅ', agency: 'HPMC / NHB' }
};

export default function MandiRatesPage() {
  const { currentLang, t, lt } = useLanguage();
  const { isOnline, getCachedMandiRates, cacheMandiRates } = useOffline();
  const [selectedCommodity, setSelectedCommodity] = useState('Wheat');
  const [selectedState, setSelectedState] = useState('All States');
  const [districtQuery, setDistrictQuery] = useState('');
  const [mandiData, setMandiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFromCache, setIsFromCache] = useState(false);

  const fetchRates = async (commodity = selectedCommodity, state = selectedState) => {
    try {
      setLoading(true);
      setError('');
      const cleanState = state.replace('All States', '').trim();
      const params = { commodity };
      if (cleanState) params.state = cleanState;
      if (districtQuery.trim()) params.district = districtQuery.trim();

      const res = await api.get('/markets/prices', { params });
      if (res.data?.success) {
        setMandiData(res.data);
        setIsFromCache(false);
        if (res.data.records) {
          cacheMandiRates(commodity, res.data.records);
        }
      } else {
        throw new Error(res.data?.error || 'Failed to fetch mandi rates');
      }
    } catch (err) {
      console.warn('Network error or offline, fallback to cached mandi rates:', err);
      const cached = getCachedMandiRates(commodity);
      if (cached && cached.records && cached.records.length > 0) {
        setMandiData({
          success: true,
          commodity: cached.commodity || commodity,
          source: 'Offline Local Cache (Agmarknet Offline Mirror)',
          records: cached.records
        });
        setIsFromCache(true);
        setError('');
      } else {
        setError(getErrorMessage(err));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates(selectedCommodity, selectedState);
  }, [selectedCommodity, selectedState]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchRates();
  };

  const currentMsp = GOVT_MSP_REF[selectedCommodity] || GOVT_MSP_REF['Wheat'];
  const commodityDisplayName = lt(currentMsp.hindi, selectedCommodity, currentMsp.pa || currentMsp.hindi);
  const stateItem = INDIAN_STATES_MAP.find((s) => s.en === selectedState);
  const stateDisplayName = stateItem ? lt(stateItem.hi, stateItem.en, stateItem.pa || stateItem.hi) : selectedState;

  const avgModalPrice = mandiData?.records?.length
    ? Math.round(
        mandiData.records.reduce((acc, r) => acc + (r.modalPrice || 0), 0) / mandiData.records.length
      )
    : currentMsp.msp;

  const mspSpread = avgModalPrice - currentMsp.msp;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      <div className="rounded-3xl bg-[#123B35] text-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-[#123B35]">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#38BDF8] text-xs font-bold border border-white/10">
            <DollarSign className="w-3.5 h-3.5 text-[#38BDF8]" />
            {lt('दैनिक राष्ट्रीय मंडी भाव • Agmarknet लाइव फीड', 'Daily National Mandi Rates • Agmarknet Live Feed', 'ਰੋਜ਼ਾਨਾ ਕੌਮੀ ਮੰਡੀ ਭਾਅ • Agmarknet ਲਾਈਵ ਫੀਡ')}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {t('mandi_page_title')}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            {t('mandi_page_subtitle')}
          </p>
        </div>

        <button
          onClick={() => fetchRates()}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#168A70] hover:bg-[#168A70]/80 text-white font-black text-xs transition border border-[#38BDF8]/30 shadow-xs cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{t('refresh_rates')}</span>
        </button>
      </div>

      
      {(isFromCache || !isOnline) && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0 border border-amber-400/40">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold block text-amber-950">
                {lt(
                  '📦 ऑफ़लाइन मोड सक्रिय: सुरक्षित स्थानीय कैश से APMC मंडी भाव दिखाए जा रहे हैं',
                  '📦 Offline Mode Active: Displaying verified APMC Mandi rates from local offline cache',
                  '📦 ਆਫ਼ਲਾਈਨ ਮੋਡ ਸਰਗਰਮ: ਸਥਾਨਕ ਕੈਸ਼ ਤੋਂ APMC ਮੰਡੀ ਭਾਅ ਵਿਖਾਏ ਜਾ ਰਹੇ ਹਨ'
                )}
              </span>
              <span className="text-[10px] text-amber-700 block font-medium">
                {lt(
                  'इंटरनेट न होने पर भी आप फसलों के ताजा सरकारी थोक भाव और MSP जांच सकते हैं।',
                  'You can check official wholesale prices & MSP benchmarks even with zero internet connectivity.',
                  'ਬਿਨਾਂ ਇੰਟਰਨੈੱਟ ਦੇ ਵੀ ਤੁਸੀਂ ਫ਼ਸਲਾਂ ਦੇ ਤਾਜ਼ਾ ਸਰਕਾਰੀ ਥੋਕ ਭਾਅ ਅਤੇ MSP ਵੇਖ ਸਕਦੇ ਹੋ।'
                )}
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-amber-200 text-amber-900 text-[10px] font-black uppercase tracking-wider shrink-0 self-start sm:self-auto">
            {lt('ऑफलाइन कैश्ड', 'Offline Cached', 'ਆਫ਼ਲਾਈਨ ਕੈਸ਼')}
          </span>
        </div>
      )}

      
      <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 border border-emerald-300 text-emerald-800 flex items-center justify-center font-black text-xl shadow-xs">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                  {t('mandi_govt_msp_badge')}
                </span>
                <span className="text-xs text-[#64748B] font-semibold">
                  {lt(currentMsp.seasonHi, currentMsp.seasonEn, currentMsp.seasonPa || currentMsp.seasonHi)} • {currentMsp.agency}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-[#172B25] mt-1">
                {lt(
                  `${commodityDisplayName} का सरकारी न्यूनतम समर्थन मूल्य (MSP)`,
                  `${selectedCommodity} Official Minimum Support Price (MSP)`,
                  `${commodityDisplayName} ਦਾ ਸਰਕਾਰੀ ਘੱਟੋ-ਘੱਟ ਸਮਰਥਨ ਮੁੱਲ (MSP)`
                )}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-bold text-[#64748B] block">
                {t('mandi_guaranteed_price')}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#123B35]">
                ₹{currentMsp.msp}
              </span>
              <span className="text-xs font-bold text-[#64748B]"> {t('per_quintal')}</span>
            </div>

            <div
              className={`px-3 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 ${
                mspSpread >= 0
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {mspSpread >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>
                {mspSpread >= 0
                  ? `+₹${mspSpread} ${t('above_msp')}`
                  : `-₹${Math.abs(mspSpread)} ${t('below_msp')}`}
              </span>
            </div>
          </div>
        </div>

        
        <div>
          <span className="text-xs font-black text-[#172B25] uppercase tracking-wider block mb-2.5">
            {t('mandi_select_commodity')}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {POPULAR_COMMODITIES.map((crop) => {
              const label = lt(crop.hi, crop.en, crop.pa || crop.hi);
              const isSelected = selectedCommodity === crop.en;
              return (
                <button
                  key={crop.en}
                  onClick={() => setSelectedCommodity(crop.en)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#123B35] text-white shadow-xs'
                      : 'bg-[#F7FAF8] text-[#172B25] hover:bg-slate-200 border border-[#E2E8F0]'
                  }`}
                >
                  <span>{label}</span>
                  {GOVT_MSP_REF[crop.en] && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                        isSelected
                          ? 'bg-emerald-700 text-emerald-100'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      ₹{GOVT_MSP_REF[crop.en].msp}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-2xs flex flex-wrap items-center gap-4"
      >
        
        <div className="flex-1 min-w-[220px]">
          <label className="block text-xs font-black text-[#172B25] mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#168A70]" />
            <span>{t('mandi_state_label')}</span>
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F7FAF8] border border-[#E2E8F0] text-xs font-bold text-[#172B25] focus:outline-none focus:ring-2 focus:ring-[#168A70] cursor-pointer"
          >
            {INDIAN_STATES_MAP.map((st) => (
              <option key={st.en} value={st.en}>
                {lt(st.hi, st.en, st.pa || st.hi)}
              </option>
            ))}
          </select>
        </div>

        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-black text-[#172B25] mb-1.5">{t('mandi_district_label')}</label>
          <div className="relative">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
            <input
              type="text"
              value={districtQuery}
              onChange={(e) => setDistrictQuery(e.target.value)}
              placeholder={t('mandi_district_placeholder')}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-[#F7FAF8] border border-[#E2E8F0] text-xs font-semibold text-[#172B25] focus:outline-none focus:ring-2 focus:ring-[#168A70]"
            />
          </div>
        </div>

        <div className="pt-5">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#123B35] hover:bg-[#168A70] text-white font-black text-xs rounded-2xl transition shadow-xs flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>{t('mandi_search_btn')}</span>
          </button>
        </div>
      </form>

      
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-4">
          <div>
            <h3 className="font-black text-base text-[#172B25] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#168A70]" />
              {lt(
                `${commodityDisplayName} के लाइव मंडी भाव (${stateDisplayName})`,
                `Live Mandi Rates for ${selectedCommodity} (${stateDisplayName})`,
                `${commodityDisplayName} ਦੇ ਲਾਈਵ ਮੰਡੀ ਭਾਅ (${stateDisplayName})`
              )}
            </h3>
            <p className="text-xs text-[#64748B]">
              {lt(
                'दैनिक न्यूनतम, अधिकतम, मॉडल भाव और सरकारी समर्थन मूल्य (MSP) की तुलना',
                'Daily minimum, maximum, modal rates and official Government MSP spread comparison',
                'ਰੋਜ਼ਾਨਾ ਘੱਟੋ-ਘੱਟ, ਵੱਧ ਤੋਂ ਵੱਧ, ਮਾਡਲ ਭਾਅ ਅਤੇ ਸਰਕਾਰੀ MSP ਦੀ ਤੁਲਨਾ'
              )}
            </p>
          </div>

          <span className="text-xs font-black text-[#168A70] bg-[#168A70]/10 px-3.5 py-1.5 rounded-full border border-emerald-200">
            {mandiData?.records?.length || 0} {t('mandi_records_recorded')}
          </span>
        </div>

        {loading ? (
          <div className="py-16 text-center space-y-3">
            <RefreshCw className="w-6 h-6 text-[#168A70] animate-spin mx-auto" />
            <p className="text-xs text-[#64748B]">{t('mandi_loading')}</p>
          </div>
        ) : mandiData?.records?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7FAF8] text-[#64748B] uppercase text-[10px] font-black border-b border-[#E2E8F0]">
                <tr>
                  <th className="p-3.5">{t('mandi_table_market')}</th>
                  <th className="p-3.5">{t('mandi_table_district_state')}</th>
                  <th className="p-3.5">{t('mandi_table_commodity_var')}</th>
                  <th className="p-3.5 text-right font-black text-emerald-800">{t('mandi_table_govt_msp')}</th>
                  <th className="p-3.5 text-right">{t('mandi_table_min')}</th>
                  <th className="p-3.5 text-right">{t('mandi_table_max')}</th>
                  <th className="p-3.5 text-right font-black text-[#123B35]">{t('mandi_table_modal')}</th>
                  <th className="p-3.5 text-center">{t('mandi_table_spread')}</th>
                  <th className="p-3.5 text-right">{t('mandi_table_arrival')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {mandiData.records.map((rec, idx) => {
                  const mspVal = rec.govtMsp || currentMsp.msp;
                  const diff = rec.modalPrice - mspVal;
                  const isAbove = diff >= 0;

                  return (
                    <tr key={idx} className="hover:bg-[#F7FAF8] transition">
                      <td className="p-3.5 font-bold text-[#172B25] flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#168A70] shrink-0" />
                        <span>{rec.market}</span>
                      </td>
                      <td className="p-3.5 text-[#172B25]">
                        <span className="font-semibold block">{rec.district}</span>
                        <span className="text-[10px] text-[#64748B]">{rec.state}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-[#172B25] block">
                          {lt(
                            GOVT_MSP_REF[rec.commodity]?.hindi,
                            rec.commodity,
                            GOVT_MSP_REF[rec.commodity]?.pa || GOVT_MSP_REF[rec.commodity]?.hindi
                          )}
                        </span>
                        <span className="text-[10px] text-[#64748B]">{rec.variety || 'FAQ'}</span>
                      </td>
                      <td className="p-3.5 text-right font-black text-emerald-800">
                        ₹{mspVal}
                      </td>
                      <td className="p-3.5 text-right text-slate-500 font-semibold">₹{rec.minPrice}</td>
                      <td className="p-3.5 text-right text-slate-500 font-semibold">₹{rec.maxPrice}</td>
                      <td className="p-3.5 text-right font-black text-sm text-[#123B35]">
                        ₹{rec.modalPrice}
                      </td>
                      <td className="p-3.5 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                            isAbove
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}
                        >
                          {isAbove
                            ? `+₹${diff} ${t('above_msp')}`
                            : `-₹${Math.abs(diff)} ${t('below_msp')}`}
                        </span>
                      </td>
                      <td className="p-3.5 text-right text-[#64748B] font-medium">
                        {rec.arrivalDate || lt('आज', 'Today', 'ਅੱਜ')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-[#64748B] bg-[#F7FAF8] rounded-2xl border border-[#E2E8F0] space-y-2">
            <p className="font-bold text-sm text-[#172B25]">{t('mandi_empty_title')}</p>
            <p>{t('mandi_empty_desc')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
