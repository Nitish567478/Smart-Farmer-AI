import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api, { getErrorMessage } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import FarmerChatBot from '../components/FarmerChatBot';
import {
  Sprout,
  Search,
  Mic,
  MicOff,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Clock,
  CheckCircle2,
  Calendar,
  DollarSign,
  Info,
  Droplets,
  Thermometer,
  Wind,
  Layers,
  ArrowRight,
  MapPin,
  Compass,
  Plus,
  Bot,
  MessageSquare
} from 'lucide-react';

export default function AgricultureDashboard({ defaultTab = 'advisory' }) {
  const { user } = useAuth();
  const { currentLang, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialTab = defaultTab === 'chat' || searchParams.get('tab') === 'chat' ? 'chat' : 'advisory';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (defaultTab === 'chat' || searchParams.get('tab') === 'chat') {
      setActiveTab('chat');
    }
  }, [defaultTab, searchParams]);

  const [farmLocation, setFarmLocation] = useState({
    name: 'New Delhi (Default Zone)',
    lat: 28.6139,
    lon: 77.209,
    isGPS: false
  });
  const [gpsLoading, setGpsLoading] = useState(false);

  const [farmProfile, setFarmProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    cropTypes: 'Wheat, Rice',
    soilType: 'Alluvial Soil',
    area: 5,
    irrigationType: 'Tube Well'
  });

  const [farmWeather, setFarmWeather] = useState(null);

  const [mandiQuery, setMandiQuery] = useState({
    commodity: 'Wheat',
    state: '',
    district: '',
    market: ''
  });
  const [mandiResults, setMandiResults] = useState(null);
  const [mandiLoading, setMandiLoading] = useState(false);

  const [advisoryCrop, setAdvisoryCrop] = useState('Wheat');
  const [customCropInput, setCustomCropInput] = useState('');
  const [advisoryLanguage, setAdvisoryLanguage] = useState(currentLang || 'hi');
  const [advisoryResult, setAdvisoryResult] = useState(null);
  const [advisoryLoading, setAdvisoryLoading] = useState(false);
  const [advisoryError, setAdvisoryError] = useState('');

  useEffect(() => {
    setAdvisoryLanguage(currentLang === 'hi' ? 'hi' : 'en');
  }, [currentLang]);

  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  const CROP_CATALOG = [
    {
      nameEn: 'Wheat',
      nameHi: 'गेहूँ',
      englishName: 'Wheat',
      seasonEn: 'Rabi Season (Oct - Apr)',
      seasonHi: 'रबी मौसम (अक्टूबर - अप्रैल)',
      temp: '15°C - 25°C',
      soilEn: 'Alluvial / Clay Loam',
      soilHi: 'जलोढ़ / चिकनी दोमट',
      waterEn: 'Moderate (4-6 Irrigations)',
      waterHi: 'मध्यम (4-6 सिंचाई)',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80'
    },
    {
      nameEn: 'Rice / Paddy',
      nameHi: 'धान (चावल)',
      englishName: 'Rice',
      seasonEn: 'Kharif Season (Jun - Nov)',
      seasonHi: 'खरीफ मौसम (जून - नवंबर)',
      temp: '22°C - 32°C',
      soilEn: 'Clayey / Deep Silt',
      soilHi: 'मटियार / गहरी गाद',
      waterEn: 'High (Standing water)',
      waterHi: 'अधिक (खड़ा पानी)',
      image: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=600&q=80'
    },
    {
      nameEn: 'Mustard',
      nameHi: 'सरसों',
      englishName: 'Mustard',
      seasonEn: 'Rabi Season (Sep - Mar)',
      seasonHi: 'रबी मौसम (सितंबर - मार्च)',
      temp: '10°C - 25°C',
      soilEn: 'Sandy Loam to Heavy Clay',
      soilHi: 'बलुई दोमट से भारी मिट्टी',
      waterEn: 'Low (Drought tolerant)',
      waterHi: 'कम (सूखा सहनशील)',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'
    },
    {
      nameEn: 'Cotton',
      nameHi: 'कपास',
      englishName: 'Cotton',
      seasonEn: 'Kharif Season (Apr - Jan)',
      seasonHi: 'खरीफ मौसम (अप्रैल - जनवरी)',
      temp: '21°C - 30°C',
      soilEn: 'Deep Black Soil (Regur)',
      soilHi: 'काली रेगुर मिट्टी',
      waterEn: 'Moderate to High',
      waterHi: 'मध्यम से अधिक',
      image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80'
    },
    {
      nameEn: 'Maize',
      nameHi: 'मक्का',
      englishName: 'Maize',
      seasonEn: 'Kharif / Spring (Jun - Oct)',
      seasonHi: 'खरीफ / जायद (जून - अक्टूबर)',
      temp: '18°C - 27°C',
      soilEn: 'Well-drained Loam',
      soilHi: 'उत्तम जल निकासी दोमट',
      waterEn: 'Moderate',
      waterHi: 'मध्यम',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80'
    },
    {
      nameEn: 'Sugarcane',
      nameHi: 'गन्ना',
      englishName: 'Sugarcane',
      seasonEn: 'Annual (Oct - Mar)',
      seasonHi: 'वार्षिक (अक्टूबर - मार्च)',
      temp: '20°C - 35°C',
      soilEn: 'Deep Rich Loamy Soil',
      soilHi: 'गहरी उपजाऊ दोमट',
      waterEn: 'High (Frequent furrow)',
      waterHi: 'अधिक सिंचाई',
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80'
    },
    {
      nameEn: 'Soybean',
      nameHi: 'सोयाबीन',
      englishName: 'Soybean',
      seasonEn: 'Kharif Season (Jun - Oct)',
      seasonHi: 'खरीफ मौसम (जून - अक्टूबर)',
      temp: '20°C - 30°C',
      soilEn: 'Well-drained Fertile Loam',
      soilHi: 'उपजाऊ दोमट मिट्टी',
      waterEn: 'Moderate (2-3 Irrigations)',
      waterHi: 'मध्यम (2-3 सिंचाई)',
      image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=600&q=80'
    },
    {
      nameEn: 'Potato',
      nameHi: 'आलू',
      englishName: 'Potato',
      seasonEn: 'Rabi Season (Oct - Feb)',
      seasonHi: 'रबी मौसम (अक्टूबर - फरवरी)',
      temp: '15°C - 20°C',
      soilEn: 'Sandy Loam with organic matter',
      soilHi: 'जीवांशयुक्त बलुई दोमट',
      waterEn: 'Moderate (Frequent light)',
      waterHi: 'हल्की नियमित सिंचाई',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80'
    },
    {
      nameEn: 'Tomato',
      nameHi: 'टमाटर',
      englishName: 'Tomato',
      seasonEn: 'Rabi / Kharif (Year round)',
      seasonHi: 'रबी / खरीफ (वर्ष भर)',
      temp: '18°C - 28°C',
      soilEn: 'Deep Loam with good drainage',
      soilHi: 'उत्तम निकास वाली दोमट',
      waterEn: 'Regular Drip / Furrow',
      waterHi: 'नियमित ड्रिप / नाली',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
    },
    {
      nameEn: 'Onion',
      nameHi: 'प्याज',
      englishName: 'Onion',
      seasonEn: 'Rabi / Late Kharif (Nov - May)',
      seasonHi: 'रबी / पछेती खरीफ (नवंबर - मई)',
      temp: '13°C - 24°C',
      soilEn: 'Friable Sandy Loam',
      soilHi: 'भुरभुरी बलुई दोमट',
      waterEn: 'Frequent shallow watering',
      waterHi: 'उथली नियमित सिंचाई',
      image: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=80'
    },
    {
      nameEn: 'Gram',
      nameHi: 'चना',
      englishName: 'Gram',
      seasonEn: 'Rabi Season (Oct - Apr)',
      seasonHi: 'रबी मौसम (अक्टूबर - अप्रैल)',
      temp: '15°C - 25°C',
      soilEn: 'Clay Loam to Sandy Loam',
      soilHi: 'दोमट से बलुई दोमट',
      waterEn: 'Low (1-2 Irrigations)',
      waterHi: 'कम (1-2 सिंचाई)',
      image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80'
    },
    {
      nameEn: 'Groundnut',
      nameHi: 'मूंगफली',
      englishName: 'Groundnut',
      seasonEn: 'Kharif Season (May - Sep)',
      seasonHi: 'खरीफ मौसम (मई - सितंबर)',
      temp: '22°C - 30°C',
      soilEn: 'Well-drained Sandy Loam',
      soilHi: 'बलुई दोमट मिट्टी',
      waterEn: 'Low to Moderate',
      waterHi: 'कम से मध्यम',
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80'
    },
    {
      nameEn: 'Pearl Millet',
      nameHi: 'बाजरा',
      englishName: 'Bajra',
      seasonEn: 'Kharif Season (Jun - Nov)',
      seasonHi: 'खरीफ मौसम (जून - नवंबर)',
      temp: '25°C - 35°C',
      soilEn: 'Sandy Soils / Marginal Land',
      soilHi: 'बलुई मिट्टी',
      waterEn: 'Very Low (Rainfed drought hardy)',
      waterHi: 'अति अल्प (वर्षा आधारित)',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80'
    },
    {
      nameEn: 'Barley',
      nameHi: 'जौ',
      englishName: 'Barley',
      seasonEn: 'Rabi Season (Oct - Mar)',
      seasonHi: 'रबी मौसम (अक्टूबर - मार्च)',
      temp: '12°C - 22°C',
      soilEn: 'Alluvial to Saline Loams',
      soilHi: 'जलोढ़ मिट्टी',
      waterEn: 'Low (2-3 Irrigations)',
      waterHi: 'कम (2-3 सिंचाई)',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'
    }
  ];

  useEffect(() => {
    fetchFarmProfile();
    fetchMandiPrices();
    fetchLiveWeather(farmLocation.lat, farmLocation.lon);

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setVoiceSupported(true);
    }
  }, []);

  const fetchLiveWeather = async (lat, lon) => {
    try {
      const res = await api.get(`/weather/current?lat=${lat}&lon=${lon}`);
      if (res.data?.success) {
        setFarmWeather(res.data.data);
      }
    } catch (e) {
    }
  };

  const handleDetectGPSLocation = () => {
    if (!navigator.geolocation) {
      alert(currentLang === 'hi' ? 'आपके ब्राउज़र में जीपीएस समर्थित नहीं है।' : 'Geolocation is not supported by your browser.');
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const formattedName = `${latitude.toFixed(2)}° N, ${longitude.toFixed(2)}° E`;
        setFarmLocation({
          name: currentLang === 'hi' ? `वर्तमान खेत जीपीएस (${formattedName})` : `Current Farm GPS (${formattedName})`,
          lat: latitude,
          lon: longitude,
          isGPS: true
        });
        setGpsLoading(false);
        fetchLiveWeather(latitude, longitude);
      },
      (err) => {
        setGpsLoading(false);
        alert((currentLang === 'hi' ? 'स्थान एक्सेस नहीं हो सका: ' : 'Could not access current location: ') + err.message);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const fetchFarmProfile = async () => {
    try {
      const res = await api.get('/farms/me');
      if (res.data?.success && res.data.farmProfile) {
        const fp = res.data.farmProfile;
        setFarmProfile(fp);
        setProfileForm({
          cropTypes: fp.cropTypes?.join(', ') || '',
          soilType: fp.soilType || '',
          area: fp.area || '',
          irrigationType: fp.irrigationType || ''
        });
      }
    } catch (err) {
    } finally {
      setProfileLoading(false);
    }
  };

  const fetchMandiPrices = async (cropName = advisoryCrop) => {
    try {
      setMandiLoading(true);
      const res = await api.get('/markets/prices', { params: { ...mandiQuery, commodity: cropName } });
      if (res.data?.success) {
        setMandiResults(res.data);
      }
    } catch (err) {
    } finally {
      setMandiLoading(false);
    }
  };

  const handleSelectCrop = (crop) => {
    setAdvisoryCrop(crop.englishName);
    setMandiQuery((prev) => ({ ...prev, commodity: crop.englishName }));
    fetchMandiPrices(crop.englishName);
  };

  const handleAddCustomCrop = (e) => {
    e.preventDefault();
    if (!customCropInput.trim()) return;
    const cropName = customCropInput.trim();
    setAdvisoryCrop(cropName);
    setMandiQuery((prev) => ({ ...prev, commodity: cropName }));
    fetchMandiPrices(cropName);
    setCustomCropInput('');
  };

  const handleGenerateAdvisory = async () => {
    try {
      setAdvisoryLoading(true);
      setAdvisoryError('');
      setAdvisoryResult(null);

      const res = await api.post('/agriculture/advisory', {
        crop: advisoryCrop,
        language: advisoryLanguage,
        latitude: farmLocation.lat,
        longitude: farmLocation.lon,
        locationName: farmLocation.name
      });

      if (res.data?.success) {
        setAdvisoryResult(res.data.advisory);
      } else {
        setAdvisoryError(res.data?.error || (currentLang === 'hi' ? 'सलाह उत्पन्न करने में असमर्थ।' : 'Unable to generate advisory.'));
      }
    } catch (err) {
      setAdvisoryError(getErrorMessage(err));
    } finally {
      setAdvisoryLoading(false);
    }
  };

  const toggleVoiceInput = () => {
    if (!voiceSupported) return;

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = advisoryLanguage === 'hi' ? 'hi-IN' : 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const cleanCrop = transcript.replace(/[^a-zA-Z\s]/g, '').trim();
      setAdvisoryCrop(cleanCrop);
      setMandiQuery((prev) => ({ ...prev, commodity: cleanCrop }));
      fetchMandiPrices(cleanCrop);
      setIsListening(false);
    };

    recognition.start();
  };

  const currentCropMeta = CROP_CATALOG.find((c) => c.englishName.toLowerCase() === advisoryCrop.toLowerCase());
  const activeCropDisplay = currentLang === 'hi' ? (currentCropMeta?.nameHi || advisoryCrop) : (currentCropMeta?.nameEn || advisoryCrop);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-[#123B35] text-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#38BDF8] text-xs font-bold border border-white/10">
            <Sprout className="w-3.5 h-3.5" />
            {currentLang === 'hi' ? 'कृषि मॉड्यूल • स्मार्ट कृषि सलाहकार' : 'Module 01 • Smart Agronomy Assistant'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {t('agri_page_title')}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            {t('agri_page_sub')}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-xs font-medium text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{farmLocation.name}</span>
            </div>
            <button
              onClick={handleDetectGPSLocation}
              disabled={gpsLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#168A70] hover:bg-[#123B35] text-white text-xs font-bold transition border border-[#168A70] disabled:opacity-50"
            >
              <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{gpsLoading ? t('locating') : t('detect_location')}</span>
            </button>
          </div>
        </div>

        {farmWeather && (
          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-xs space-y-2 min-w-[220px]">
            <span className="text-[10px] font-bold text-[#38BDF8] uppercase tracking-wider block">
              {currentLang === 'hi' ? 'खेत का मौसम (Open-Meteo)' : 'Farm Weather (Open-Meteo)'}
            </span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black">{farmWeather.current?.temperature}°C</span>
              <span className="font-semibold text-slate-200">{farmWeather.current?.condition}</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-300 border-t border-white/10 pt-1.5">
              <span>{t('humidity')}: {farmWeather.current?.relativeHumidity}%</span>
              <span>{t('precipitation')}: {farmWeather.current?.precipitation || 0} mm</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('advisory')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition ${
              activeTab === 'advisory'
                ? 'bg-[#123B35] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#172B25] hover:bg-[#F7FAF8]'
            }`}
          >
            <Sprout className="w-4 h-4 text-[#168A70]" />
            <span>{currentLang === 'hi' ? 'खेत सलाह एवं मंडी भाव' : 'Field Advisory & Mandi Rates'}</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition relative ${
              activeTab === 'chat'
                ? 'bg-[#123B35] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#172B25] hover:bg-[#F7FAF8]'
            }`}
          >
            <Bot className="w-4 h-4 text-[#38BDF8]" />
            <span>{currentLang === 'hi' ? 'एआई किसान डॉक्टर (फोटो व चैट)' : 'AI Kisan Doctor (Photo & Chat)'}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#168A70] text-emerald-100 uppercase tracking-wider">
              {currentLang === 'hi' ? 'फोटो रोग जांच' : 'Photo Diagnosis'}
            </span>
          </button>
        </div>

        {activeTab === 'advisory' && (
          <button
            onClick={() => setActiveTab('chat')}
            className="text-xs font-bold text-[#168A70] hover:text-[#123B35] flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-[#168A70]/10 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentLang === 'hi' ? 'फसल की बीमारी है? डॉक्टर से पूछें →' : 'Have a sick crop or leaf photo? Ask AI Doctor →'}</span>
          </button>
        )}
      </div>

      {activeTab === 'chat' ? (
        <FarmerChatBot cropContext={advisoryCrop} />
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-bold text-[#172B25] uppercase tracking-wider">
                {currentLang === 'hi' ? 'सक्रिय फसल:' : 'Active Cultivar:'}
              </span>
              <span className="px-3 py-1 rounded-xl bg-[#168A70]/10 text-[#168A70] font-extrabold text-xs border border-[#168A70]/30">
                {activeCropDisplay}
              </span>
            </div>

            <form onSubmit={handleAddCustomCrop} className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={customCropInput}
                  onChange={(e) => setCustomCropInput(e.target.value)}
                  placeholder={currentLang === 'hi' ? 'फसल खोजें या दर्ज करें...' : 'Search or add custom crop...'}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E2E8F0] text-xs text-[#172B25] focus:outline-none focus:border-[#168A70]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#123B35] hover:bg-[#168A70] text-white font-bold text-xs rounded-xl transition flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{currentLang === 'hi' ? 'फसल चुनें' : 'Set Crop'}</span>
              </button>
            </form>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-[#172B25]">
                  {t('agri_cultivars_title')}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {t('agri_cultivars_sub')}
                </p>
              </div>
              <span className="text-xs font-bold text-[#168A70]">
                {currentLang === 'hi' ? 'फसल पर टैप करें' : 'Tap Any Crop'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
              {CROP_CATALOG.map((crop, idx) => {
                const isSelected = advisoryCrop.toLowerCase() === crop.englishName.toLowerCase();
                const cropName = currentLang === 'hi' ? crop.nameHi : crop.nameEn;
                const cropSeason = currentLang === 'hi' ? crop.seasonHi : crop.seasonEn;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectCrop(crop)}
                    className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'border-[#168A70] bg-[#168A70]/10 ring-2 ring-[#168A70]/30'
                        : 'border-[#E2E8F0] bg-white hover:border-[#168A70]/40'
                    }`}
                  >
                    <div className="h-16 w-full rounded-xl overflow-hidden relative">
                      <img src={crop.image} alt={cropName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-extrabold text-xs text-[#172B25] truncate">{cropName}</p>
                      <p className="text-[10px] text-[#64748B] truncate mt-0.5">{cropSeason}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
              <div>
                <h3 className="font-extrabold text-lg text-[#172B25] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#168A70]" />
                  {t('agri_advisory_title')}
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  {t('agri_advisory_sub')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={advisoryLanguage}
                  onChange={(e) => setAdvisoryLanguage(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#172B25] bg-white focus:outline-none focus:border-[#168A70]"
                >
                  <option value="en">English Advisory</option>
                  <option value="hi">हिन्दी (Hindi Advisory)</option>
                </select>

                {voiceSupported && (
                  <button
                    type="button"
                    onClick={toggleVoiceInput}
                    className={`p-2.5 rounded-xl border transition ${
                      isListening
                        ? 'bg-[#DC2626] text-white animate-pulse border-[#DC2626]'
                        : 'bg-[#F7FAF8] text-[#172B25] border-[#E2E8F0] hover:bg-slate-100'
                    }`}
                    title={isListening ? 'Listening... Speak crop name' : 'Speak crop name'}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                )}

                <button
                  onClick={handleGenerateAdvisory}
                  disabled={advisoryLoading}
                  className="px-5 py-2 rounded-xl bg-[#123B35] hover:bg-[#168A70] text-white font-bold text-xs shadow-sm transition disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                  <span>{advisoryLoading ? t('agri_generating') : t('agri_generate_guidance')}</span>
                </button>
              </div>
            </div>

            {advisoryError && (
              <div className="p-4 rounded-xl bg-[#DC2626]/10 border border-[#DC2626]/20 text-xs text-[#DC2626]">
                {advisoryError}
              </div>
            )}

            {advisoryResult ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#F7FAF8] rounded-xl border border-[#E2E8F0] text-xs">
                  <span className="font-bold text-[#172B25]">
                    {currentLang === 'hi' ? 'फसल:' : 'Cultivar:'} <strong>{activeCropDisplay}</strong>
                  </span>
                  <span className="text-[#64748B]">
                    {currentLang === 'hi' ? 'मृदा प्रकार:' : 'Soil:'} <strong>{advisoryResult.inputDataReferences?.soilType || 'Alluvial'}</strong>
                  </span>
                  <span className="text-[#64748B]">
                    {currentLang === 'hi' ? 'तापमान:' : 'Temp:'} <strong>{advisoryResult.inputDataReferences?.temperatureC}°C</strong>
                  </span>
                  <span className="text-[#64748B]">
                    {currentLang === 'hi' ? 'वर्षा:' : 'Rain:'} <strong>{advisoryResult.inputDataReferences?.rainfallMm} mm</strong>
                  </span>
                </div>

                <div className="p-6 bg-[#F7FAF8] rounded-2xl border border-[#E2E8F0] text-xs sm:text-sm text-[#172B25] leading-relaxed whitespace-pre-line font-medium">
                  {advisoryResult.advisoryText}
                </div>

                <p className="text-[11px] text-[#64748B] italic">
                  {advisoryResult.limitations}
                </p>
              </div>
            ) : advisoryLoading ? (
              <div className="p-8 sm:p-12 bg-[#F7FAF8] rounded-2xl border border-[#168A70]/30 shadow-inner flex flex-col items-center justify-center text-center space-y-5 py-12 sm:py-16">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-[#168A70]/20 animate-ping" />
                  <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-[#168A70] border-r-[#38BDF8] animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#168A70] animate-pulse" />
                  </div>
                </div>

                <div className="space-y-1.5 max-w-md">
                  <h4 className="font-extrabold text-base text-[#172B25]">
                    {currentLang === 'hi'
                      ? `${activeCropDisplay} के लिए सटीक सलाह तैयार की जा रही है...`
                      : `Generating Grounded Advisory for ${activeCropDisplay}...`}
                  </h4>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {currentLang === 'hi'
                      ? 'ओपन-मीटियो लाइव मौसम एवं राष्ट्रीय मंडी भावों के साथ एआई विजन से परामर्श जारी।'
                      : 'Consulting AI Vision with live Open-Meteo observations and official mandi market rates.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white text-[#168A70] border border-[#E2E8F0] shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#168A70] animate-pulse" />
                    Open-Meteo Telemetry
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white text-[#2563EB] border border-[#E2E8F0] shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
                    APMC Mandi Rates
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white text-[#123B35] border border-[#E2E8F0] shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#123B35] animate-pulse" />
                    Multimodal AI Vision
                  </span>
                </div>

                <div className="w-full max-w-md space-y-2 pt-3">
                  <div className="h-2.5 bg-slate-200 rounded-full w-full animate-pulse" />
                  <div className="h-2.5 bg-slate-200 rounded-full w-5/6 mx-auto animate-pulse" />
                  <div className="h-2.5 bg-slate-200 rounded-full w-3/4 mx-auto animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-xs text-[#64748B] bg-[#F7FAF8] rounded-2xl border border-[#E2E8F0]">
                {t('agri_click_generate')} <strong>{activeCropDisplay}</strong>.
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-base text-[#172B25] flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#168A70]" />
                  {t('agri_mandi_section_title')}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {t('agri_mandi_section_sub')} <strong>{activeCropDisplay}</strong>
                </p>
              </div>

              <button
                onClick={() => fetchMandiPrices(advisoryCrop)}
                disabled={mandiLoading}
                className="px-3.5 py-1.5 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#172B25] hover:bg-[#F7FAF8] transition"
              >
                {mandiLoading ? (currentLang === 'hi' ? 'रिफ्रेश हो रहा है...' : 'Refreshing...') : t('refresh_rates')}
              </button>
            </div>

            {mandiResults?.records?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7FAF8] text-[#64748B] uppercase text-[10px] border-b border-[#E2E8F0]">
                    <tr>
                      <th className="p-3">{t('mandi_table_market')}</th>
                      <th className="p-3">{t('mandi_district_label')}</th>
                      <th className="p-3">{currentLang === 'hi' ? 'राज्य' : 'State'}</th>
                      <th className="p-3">{currentLang === 'hi' ? 'फसल' : 'Commodity'}</th>
                      <th className="p-3">{currentLang === 'hi' ? 'किस्म' : 'Variety'}</th>
                      <th className="p-3 text-right">{t('mandi_table_modal')}</th>
                      <th className="p-3 text-right">{t('mandi_table_arrival')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {mandiResults.records.map((rec, idx) => (
                      <tr key={idx} className="hover:bg-[#F7FAF8]/60 transition">
                        <td className="p-3 font-bold text-[#172B25]">{rec.market}</td>
                        <td className="p-3 text-[#64748B]">{rec.district}</td>
                        <td className="p-3 text-[#64748B]">{rec.state}</td>
                        <td className="p-3 font-semibold text-[#172B25]">{rec.commodity}</td>
                        <td className="p-3 text-[#64748B]">{rec.variety}</td>
                        <td className="p-3 font-bold text-[#123B35] text-right">₹{rec.modalPrice}</td>
                        <td className="p-3 text-[#64748B] text-right">{rec.arrivalDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-[#64748B] bg-[#F7FAF8] rounded-xl border border-[#E2E8F0]">
                {t('mandi_empty_title')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
