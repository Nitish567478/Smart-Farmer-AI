import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { getErrorMessage } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { useLanguage } from '../context/LanguageContext';
import {
  CloudSun,
  AlertTriangle,
  LifeBuoy,
  Cpu,
  Truck,
  ArrowUpRight,
  MapPin,
  Clock,
  Thermometer,
  Droplets,
  Wind,
  CheckCircle,
  ExternalLink,
  Flame,
  ShieldCheck,
  ChevronRight,
  Sun,
  Navigation,
  Languages,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Layers,
  Sprout,
  Calculator,
  Award,
  RefreshCw,
  Compass,
  Radio,
  Zap,
  BatteryCharging,
  Siren,
  Users,
  Activity,
  CheckCircle2,
  PhoneCall,
  Search,
  Building2,
  SlidersHorizontal
} from 'lucide-react';

const CITIES = [
  { name: 'New Delhi', lat: 28.6139, lon: 77.209 },
  { name: 'Mumbai (Maharashtra)', lat: 19.076, lon: 72.8777 },
  { name: 'Bengaluru (Karnataka)', lat: 12.9716, lon: 77.5946 },
  { name: 'Ludhiana (Punjab)', lat: 30.901, lon: 75.8573 },
  { name: 'Indore (Madhya Pradesh)', lat: 22.7196, lon: 75.8577 },
  { name: 'Ahmedabad (Gujarat)', lat: 23.0225, lon: 72.5714 },
  { name: 'Jaipur (Rajasthan)', lat: 26.9124, lon: 75.7873 },
  { name: 'Patna (Bihar)', lat: 25.5941, lon: 85.1376 },
  { name: 'Ranchi (Jharkhand)', lat: 23.3441, lon: 85.3096 },
  { name: 'Puri (Odisha)', lat: 19.8135, lon: 85.8312 }
];

const COMMODITY_HI_MAP = {
  'Wheat': 'गेहूँ',
  'Rice': 'धान (चावल)',
  'Rice / Paddy': 'धान',
  'Mustard': 'सरसों',
  'Cotton': 'कपास',
  'Maize': 'मक्का',
  'Potato': 'आलू',
  'Onion': 'प्याज',
  'Tomato': 'टमाटर',
  'Soybean': 'सोयाबीन',
  'Gram': 'चना',
  'Groundnut': 'मूंगफली'
};

export default function MainDashboard() {
  const { user } = useAuth();
  const { liveEvents, latestMandiTick, telemetryJitter } = useSocket();
  const { currentLang, setLanguage, t, lt, languages } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      navigate('/', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  const [data, setData] = useState(null);
  const [riskData, setRiskData] = useState(null);
  const [mandiRates, setMandiRates] = useState([]);
  const [mandiLoading, setMandiLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCity, setSelectedCity] = useState({
    name: 'New Delhi',
    lat: 28.6139,
    lon: 77.209,
    isLiveGps: false
  });
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    requestUserLocation();
  }, []);

  const requestUserLocation = () => {
    if (!('geolocation' in navigator)) {
      setLocationError(currentLang === 'hi' ? 'आपके ब्राउज़र में जीपीएस समर्थित नहीं है।' : 'Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const lat = parseFloat(latitude.toFixed(4));
        const lon = parseFloat(longitude.toFixed(4));

        try {
          const reverseUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`;
          const geoRes = await fetch(reverseUrl, { headers: { 'User-Agent': 'ClimatePulseAI/1.0' } })
            .then((r) => r.json())
            .catch(() => null);

          const city =
            geoRes?.address?.city ||
            geoRes?.address?.state_district ||
            geoRes?.address?.district ||
            geoRes?.address?.town ||
            geoRes?.address?.county ||
            (currentLang === 'hi' ? 'मेरी लाइव लोकेशन' : 'My Live Location');
          const state = geoRes?.address?.state || '';
          const fullLabel = state ? `${city}, ${state}` : city;

          setSelectedCity({
            name: fullLabel,
            lat,
            lon,
            isLiveGps: true
          });
        } catch (e) {
          setSelectedCity({
            name: `Live GPS (${lat}, ${lon})`,
            lat,
            lon,
            isLiveGps: true
          });
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        console.warn('Geolocation access declined or timed out:', err.message);
        setIsLocating(false);
        setLocationError(currentLang === 'hi' ? 'जीपीएस अनुमति नहीं मिली। केंद्रीय क्षेत्र दिखाया जा रहा है।' : 'GPS permission declined. Showing central monitored territory.');
      },
      { timeout: 9000, enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    fetchDashboardSummary();
  }, [selectedCity.lat, selectedCity.lon]);

  useEffect(() => {
    fetchLiveMandiPrices();
  }, []);

  const fetchDashboardSummary = async () => {
    try {
      setLoading(true);
      setError('');
      const [sumRes, riskRes] = await Promise.allSettled([
        api.get(`/dashboard/summary?lat=${selectedCity.lat}&lon=${selectedCity.lon}`),
        api.get(`/climate/risks?lat=${selectedCity.lat}&lon=${selectedCity.lon}`)
      ]);

      if (sumRes.status === 'fulfilled' && sumRes.value.data?.success) {
        setData(sumRes.value.data);
      }
      if (riskRes.status === 'fulfilled' && riskRes.value.data?.success) {
        setRiskData(riskRes.value.data);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const fetchLiveMandiPrices = async () => {
    try {
      setMandiLoading(true);
      const res = await api.get('/markets/prices?limit=8');
      if (res.data?.records) {
        setMandiRates(res.data.records);
      }
    } catch (err) {
      console.warn('Could not fetch mandi rates:', err.message);
    } finally {
      setMandiLoading(false);
    }
  };

  const weather = data?.weather;
  const stats = data?.stats;
  const indicators = riskData?.indicators;

  const displayTemp = weather?.current?.temperature != null
    ? (parseFloat(weather.current.temperature) + (telemetryJitter || 0)).toFixed(1)
    : '--';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      <div className="bg-[#123B35] border-[#123B35] text-white px-5 sm:px-6 py-4 sm:py-5 min-h-[64px] rounded-3xl flex items-center justify-between gap-4 shadow-sm border">
        <div className="flex items-center gap-3 overflow-hidden w-full">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-black text-xs uppercase shrink-0 shadow-xs bg-[#168A70] text-[#38BDF8]">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>{t('realtime_stream')}</span>
          </span>
          <div className="text-xs sm:text-sm font-medium truncate flex-1">
            {latestMandiTick ? (
              <span className="flex items-center gap-2 flex-wrap text-emerald-100">
                <span>🌾 <strong>{latestMandiTick.commodity}</strong> ({latestMandiTick.market}):</span>{' '}
                <strong className="text-white text-sm sm:text-base">₹{latestMandiTick.modalPrice}/Qtl</strong>{' '}
                <span className={`font-bold px-2 py-0.5 rounded-md text-xs ${
                  latestMandiTick.trend === 'up' ? 'bg-emerald-800 text-emerald-200' : 'bg-rose-800 text-rose-200'
                }`}>
                  [{latestMandiTick.change}]
                </span>
                <span className="text-slate-300 text-xs">
                  • {new Date(latestMandiTick.timestamp).toLocaleTimeString()}
                </span>
              </span>
            ) : (
              <span className="leading-relaxed text-emerald-100">
                {t('realtime_status_msg')}
              </span>
            )}
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#168A70]">
            <MapPin className="w-4 h-4 text-[#168A70]" />
            <span>{t('monitored_territory')}:</span>

            
            <select
              value={selectedCity.name}
              onChange={(e) => {
                const found = CITIES.find((c) => c.name === e.target.value);
                if (found) {
                  setSelectedCity({ ...found, isLiveGps: false });
                }
              }}
              className="bg-emerald-50 text-[#123B35] font-black px-3 py-1 rounded-xl border border-emerald-200 text-xs focus:outline-none cursor-pointer"
            >
              {selectedCity.isLiveGps && (
                <option value={selectedCity.name}>
                  📍 {selectedCity.name} ({currentLang === 'hi' ? 'लाइव जीपीएस' : 'Live GPS'})
                </option>
              )}
              {CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            
            <button
              onClick={requestUserLocation}
              disabled={isLocating}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition border ${
                selectedCity.isLiveGps
                  ? 'bg-[#168A70] text-white border-emerald-600 shadow-2xs'
                  : 'bg-emerald-50/80 hover:bg-emerald-100 text-[#123B35] border-emerald-200'
              }`}
            >
              <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>
                {isLocating
                  ? t('locating')
                  : selectedCity.isLiveGps
                  ? t('live_gps_active')
                  : t('detect_location')}
              </span>
            </button>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-[#172B25] tracking-tight mt-1">
            {t('title_farmer')}
          </h1>
          <p className="text-xs text-[#64748B]">
            {t('dashboard_subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition border border-slate-200"
            title={lt('होमपेज पर जाएं', 'Back to Home', 'ਹੋਮਪੇਜ ਤੇ ਜਾਓ')}
          >
            <span>← {lt('होमपेज', 'Home', 'ਹੋਮਪੇਜ')}</span>
          </Link>

          {weather && (
            <div className="text-right text-xs text-[#64748B] flex items-center gap-2 bg-[#F7FAF8] px-3.5 py-2 rounded-xl border border-[#E2E8F0]">
              <Clock className="w-3.5 h-3.5 text-[#168A70]" />
              <span>
                {t('observed_at')}:{' '}
                <strong className="text-[#172B25]">
                  {new Date(weather.observedAt || Date.now()).toLocaleTimeString()}
                </strong>{' '}
                ({weather.provider || 'Open-Meteo'})
              </span>
            </div>
          )}
        </div>
      </div>

      {locationError && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{locationError}</span>
        </div>
      )}

      <div className="space-y-6">
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
            <span className="text-[10px] font-bold text-emerald-800 uppercase">{t('active_crop')}</span>
            <p className="text-xl font-black text-emerald-950">{t('active_crop_name')}</p>
            <p className="text-[10px] text-emerald-700">{t('active_crop_desc')}</p>
          </div>

          <div className="p-4 rounded-3xl bg-sky-50/70 border border-sky-200/80 space-y-1">
            <span className="text-[10px] font-bold text-sky-800 uppercase">{t('soil_moisture_label')}</span>
            <p className="text-xl font-black text-sky-950">34.2 %</p>
            <p className="text-[10px] text-sky-700">{t('soil_moisture_status')}</p>
          </div>

          <div className="p-4 rounded-3xl bg-amber-50/70 border border-amber-200/80 space-y-1">
            <span className="text-[10px] font-bold text-amber-800 uppercase">{t('govt_msp_label')}</span>
            <p className="text-xl font-black text-amber-950">₹2,425 /Q</p>
            <p className="text-[10px] text-emerald-700 font-bold">{t('mandi_spread_status')}</p>
          </div>

          <div className="p-4 rounded-3xl bg-purple-50/70 border border-purple-200/80 space-y-1">
            <span className="text-[10px] font-bold text-purple-800 uppercase">{t('pm_kisan_label')}</span>
            <p className="text-xl font-black text-purple-950">₹2,000 Verified</p>
            <p className="text-[10px] text-purple-700">{t('pm_kisan_status')}</p>
          </div>
        </div>

        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <Link
            to="/kisan-doctor"
            className="p-5 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-white transition space-y-2 block shadow-xs"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
              🩺
            </div>
            <h4 className="font-black text-sm">{t('tool_doctor_title')}</h4>
            <p className="text-[11px] text-emerald-100">{t('tool_doctor_desc')}</p>
          </Link>

          <Link
            to="/mandi-rates"
            className="p-5 rounded-3xl bg-[#123B35] hover:bg-[#168A70] text-white transition space-y-2 block shadow-xs"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
              📊
            </div>
            <h4 className="font-black text-sm">{t('tool_mandi_title')}</h4>
            <p className="text-[11px] text-emerald-100">{t('tool_mandi_desc')}</p>
          </Link>

          <Link
            to="/fertilizer-calc"
            className="p-5 rounded-3xl bg-sky-700 hover:bg-sky-800 text-white transition space-y-2 block shadow-xs"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
              ⚖️
            </div>
            <h4 className="font-black text-sm">{t('tool_fertilizer_title')}</h4>
            <p className="text-[11px] text-sky-100">{t('tool_fertilizer_desc')}</p>
          </Link>

          <Link
            to="/schemes"
            className="p-5 rounded-3xl bg-purple-700 hover:bg-purple-800 text-white transition space-y-2 block shadow-xs"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
              🏛️
            </div>
            <h4 className="font-black text-sm">{t('tool_schemes_title')}</h4>
            <p className="text-[11px] text-purple-100">{t('tool_schemes_desc')}</p>
          </Link>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/savings-calculator"
            className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#0c2e26] to-[#123B35] text-white hover:from-[#0e3b31] hover:to-[#164e43] transition border border-emerald-500/40 shadow-sm flex items-center justify-between gap-4 group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                💰
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                    {lt('वित्तीय बचत गणक', 'AI Farm Savings Calc', 'ਵਿੱਤੀ ਬੱਚਤ ਗਣਕ')}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-200 text-[9px] font-black">
                    ROI Matrix
                  </span>
                </div>
                <h4 className="font-black text-sm sm:text-base text-white truncate block">
                  {lt('अपनी फसल की शुद्ध बचत निकालें', 'Calculate Your Farm Net Savings', 'ਆਪਣੀ ਫ਼ਸਲ ਦੀ ਸ਼ੁੱਧ ਬੱਚਤ ਕੱਢੋ')}
                </h4>
                <p className="text-xs text-emerald-100/80 truncate font-medium">
                  {lt('खाद व कीटनाशक में ~₹18,500/एकड़ तक बचत का अनुमान', 'Save up to ₹18,500/acre on fertilizer & sprays', 'ਖਾਦ ਤੇ ਕੀਟਨਾਸ਼ਕਾਂ ਵਿੱਚ ~₹18,500/ਏਕੜ ਤੱਕ ਬੱਚਤ ਦਾ ਅੰਦਾਜ਼ਾ')}
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
          </Link>

          <Link
            to="/community-stories"
            className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#07241E] to-[#0A332B] text-white hover:from-[#0b2f27] hover:to-[#0e4439] transition border border-teal-500/40 shadow-sm flex items-center justify-between gap-4 group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                🏆
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-teal-400 tracking-wider">
                    {lt('किसान सफलता कहानियां', 'Farmer Community Proof', 'ਕਿਸਾਨ ਸਫ਼ਲਤਾ ਕਹਾਣੀਆਂ')}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-teal-500/30 text-teal-200 text-[9px] font-black">
                    Verified
                  </span>
                </div>
                <h4 className="font-black text-sm sm:text-base text-white truncate block">
                  {lt('वास्तविक किसानों का प्रभाव प्रमाण', 'Real Farmers Verified Case Studies', 'ਅਸਲ ਕਿਸਾਨਾਂ ਦੀਆਂ ਸਫ਼ਲ ਕਹਾਣੀਆਂ')}
                </h4>
                <p className="text-xs text-teal-100/80 truncate font-medium">
                  {lt('₹3.84 Cr+ कुल बचत • 52,400+ किसानों का विश्वास', '₹3.84 Cr+ saved across 52,400+ farmers', '₹3.84 Cr+ ਕੁੱਲ ਬੱਚਤ • 52,400+ ਕਿਸਾਨਾਂ ਦਾ ਭਰੋਸਾ')}
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
          </Link>
        </div>
      </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 rounded-3xl bg-[#123B35] text-white p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6 border border-[#123B35]">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-[#38BDF8] uppercase tracking-wider flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-[#38BDF8]" />
                {t('live_weather')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1.5">
                {selectedCity.name}
              </h2>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                {weather?.current?.condition || (currentLang === 'hi' ? 'साफ आसमान' : 'Clear Sky')}
              </p>
            </div>
            <div className="text-right">
              <span className="text-4xl sm:text-5xl font-black tracking-tight">
                {displayTemp}°C
              </span>
              <p className="text-xs text-slate-300 font-medium mt-1">
                {t('feels_like')} {weather?.current?.apparentTemperature ?? '--'}°C
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-[#38BDF8]">
                <Droplets className="w-4 h-4" />
                <span className="text-[11px] text-slate-300">{t('humidity')}</span>
              </div>
              <p className="text-base font-bold">{weather?.current?.relativeHumidity ?? '--'}%</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-[#38BDF8]">
                <Wind className="w-4 h-4" />
                <span className="text-[11px] text-slate-300">{t('wind_speed')}</span>
              </div>
              <p className="text-base font-bold">{weather?.current?.windSpeed ?? '--'} km/h</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-[#38BDF8]">
                <Thermometer className="w-4 h-4" />
                <span className="text-[11px] text-slate-300">{t('precipitation')}</span>
              </div>
              <p className="text-base font-bold">{weather?.current?.precipitation ?? 0} mm</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-2">
            <span className="text-slate-300 text-[11px]">
              WMO: <strong>{weather?.current?.weatherCode ?? 0}</strong> • GPS: {selectedCity.lat}, {selectedCity.lon}
            </span>
            <Link
              to="/weather"
              className="inline-flex items-center gap-1 font-bold text-[#38BDF8] hover:text-white transition"
            >
              {t('forecast_link')}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E2E8F0]">
              <h3 className="font-extrabold text-sm text-[#172B25] flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#F59E0B]" />
                {t('drought_risk')}
              </h3>
              <span className="text-[10px] font-bold text-[#64748B] uppercase">NOAA Formula</span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#F7FAF8] border border-[#E2E8F0] space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#172B25]">{t('heat_stress')}</span>
                  <span className="font-bold text-[#F59E0B]">
                    {indicators?.heatHazard?.heatIndexC ?? '--'}°C
                  </span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#F59E0B] h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, ((indicators?.heatHazard?.heatIndexC || 25) / 50) * 100)}%` }}
                  />
                </div>
                <p className="text-[10px] text-[#64748B] leading-tight">
                  {indicators?.heatHazard?.description || (currentLang === 'hi' ? 'सामान्य आराम स्तर' : 'Normal Comfort Level')}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7FAF8] border border-[#E2E8F0] space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#172B25]">{t('rainfall_threat')}</span>
                  <span className="font-bold text-[#2563EB]">
                    {indicators?.rainfallAndFlood?.severity ?? (currentLang === 'hi' ? 'कम' : 'Low')}
                  </span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#2563EB] h-full rounded-full transition-all"
                    style={{
                      width:
                        indicators?.rainfallAndFlood?.severity === 'Critical'
                          ? '90%'
                          : indicators?.rainfallAndFlood?.severity === 'High'
                          ? '65%'
                          : '20%'
                    }}
                  />
                </div>
                <p className="text-[10px] text-[#64748B] leading-tight">
                  {indicators?.rainfallAndFlood?.description || (currentLang === 'hi' ? 'सामान्य वर्षा स्तर' : 'Normal precipitation levels')}
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/map"
            className="w-full py-2.5 rounded-2xl bg-[#123B35] hover:bg-[#168A70] text-white font-bold text-xs text-center transition block shadow-2xs"
          >
            {t('climate_map_btn')}
          </Link>
        </div>
      </div>

      
      <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-[#168A70]">
              <DollarSign className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-black text-base text-[#172B25]">
                {t('mandi_rates_title')}
              </h3>
              <p className="text-xs text-[#64748B]">
                {t('mandi_rates_sub')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLiveMandiPrices}
              disabled={mandiLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7FAF8] hover:bg-slate-100 text-[#172B25] text-xs font-bold border border-[#E2E8F0] transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#168A70] ${mandiLoading ? 'animate-spin' : ''}`} />
              <span>{t('refresh_rates')}</span>
            </button>
            <Link
              to="/mandi-rates"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#123B35] hover:bg-[#168A70] text-white text-xs font-black transition shadow-2xs"
            >
              <span>{t('view_all_mandi')}</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {mandiRates.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#E2E8F0] hover:border-[#168A70]/40 transition space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-xs text-[#123B35]">
                  {currentLang === 'hi' && COMMODITY_HI_MAP[item.commodity]
                    ? COMMODITY_HI_MAP[item.commodity]
                    : item.commodity}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${
                    item.trend === 'up'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.trend === 'down'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {item.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : item.trend === 'down' ? <TrendingDown className="w-3 h-3" /> : null}
                  {item.change ? (item.change > 0 ? `+₹${item.change}` : `₹${item.change}`) : 'MSP'}
                </span>
              </div>

              <div className="space-y-0.5">
                <p className="text-[11px] font-bold text-[#172B25] truncate">
                  {item.market} ({item.district})
                </p>
                <p className="text-[10px] text-[#64748B]">{item.state}</p>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0] flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-[#64748B] block">{t('modal_price')}</span>
                  <span className="text-lg font-black text-[#172B25]">₹{item.modalPrice}</span>
                  <span className="text-[10px] text-[#64748B]"> {t('per_quintal')}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-700 font-bold block">
                    {t('govt_msp_prefix')} ₹{item.govtMsp || 2425}
                  </span>
                  <span className="text-[10px] text-[#64748B]">
                    {item.minPrice} - {item.maxPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
