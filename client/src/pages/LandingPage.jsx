import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Sprout,
  Camera,
  DollarSign,
  CloudSun,
  CalendarDays,
  PhoneCall,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Bot,
  Flame,
  CloudRain,
  Sun,
  Layers,
  ArrowUpRight,
  ChevronRight,
  Home,
  Check,
  Star,
  Quote,
  HelpCircle,
  ChevronDown,
  Users,
  Calculator,
  Award,
  Languages
} from 'lucide-react';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const { currentLang, setLanguage, languages, t, lt } = useLanguage();
  const isHi = currentLang === 'hi';

  const [activeTab, setActiveTab] = useState('doctor'); 
  const [openFaq, setOpenFaq] = useState(0); 

  const stats = [
    {
      value: '50,000+',
      valueEn: '50,000+',
      labelHi: 'पंजीकृत किसान',
      labelEn: 'Active Farmers',
      labelPa: 'ਸਰਗਰਮ ਕਿਸਾਨ',
      labelGu: 'નોંધાયેલા ખેડૂતો',
      labelMr: 'नोंदणीकृत शेतकरी',
      labelBn: 'নিবন্ধিত কৃষক'
    },
    {
      value: '2,400+',
      valueEn: '2,400+',
      labelHi: 'सरकारी APMC मंडियां',
      labelEn: 'APMC Mandis',
      labelPa: 'ਸਰਕਾਰੀ ਮੰਡੀਆਂ',
      labelGu: 'સરકારી યાર્ડ',
      labelMr: 'शासकीय बाजार समित्या',
      labelBn: 'সরকারি APMC মাণ্ডি'
    },
    {
      value: '100%',
      valueEn: '100%',
      labelHi: 'निःशुल्क किसान सेवा',
      labelEn: 'Free for Farmers',
      labelPa: 'ਕਿਸਾਨਾਂ ਲਈ ਮੁਫ਼ਤ',
      labelGu: 'ખેડૂતો માટે મફત',
      labelMr: 'शेतकऱ्यांसाठी मोफत',
      labelBn: 'কৃষকদের জন্য বিনামূল্যে'
    },
    {
      value: '1551',
      valueEn: '1551',
      labelHi: 'किसान कॉल सेंटर',
      labelEn: 'Kisan Call Center',
      labelPa: 'ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ',
      labelGu: 'કિસાન કોલ સેન્ટર',
      labelMr: 'किसान कॉल सेंटर',
      labelBn: 'কৃষক কল সেন্টার'
    }
  ];

  const quickFeatures = [
    {
      id: 'doctor',
      icon: Camera,
      titleHi: 'एआई फसल डॉक्टर',
      titleEn: 'AI Crop Doctor',
      titlePa: 'ਏਆਈ ਫ਼ਸਲ ਡਾਕਟਰ',
      titleGu: 'એઆઈ પાક ડોક્ટર',
      titleMr: 'एआय पीक डॉक्टर',
      titleBn: 'এআই ফসল ডাক্তার',
      subtitleHi: 'कैमरे से पत्ती जांचें व रोग पहचानें',
      subtitleEn: 'Scan sick leaf with live camera',
      subtitlePa: 'ਕੈਮਰੇ ਨਾਲ ਪੱਤਾ ਜਾਂਚੋ ਤੇ ਬਿਮਾਰੀ ਪਛਾਣੋ',
      subtitleGu: 'કેમેરાથી પાંદડું તપાસો અને રોગ ઓળખો',
      subtitleMr: 'कॅमेऱ्याने पान तपासा आणि रोग ओळखा',
      subtitleBn: 'ক্যামেরা দিয়ে পাতা স্ক্যান করে রোগ জানুন',
      tagHi: 'लाइव स्कैनर',
      tagEn: 'Live Scanner',
      tagPa: 'ਲਾਈਵ ਸਕੈਨਰ',
      tagGu: 'લાઇવ સ્કેનર',
      tagMr: 'थेट स्कॅनर',
      tagBn: 'লাইভ স্ক্যানার',
      link: '/kisan-doctor',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'mandi',
      icon: DollarSign,
      titleHi: 'दैनिक मंडी भाव',
      titleEn: 'Live Mandi Rates',
      titlePa: 'ਰੋਜ਼ਾਨਾ ਮੰਡੀ ਭਾਅ',
      titleGu: 'દૈનિક યાર્ડ ભાવ',
      titleMr: 'दैनिक बाजार भाव',
      titleBn: 'দৈনিক মাণ্ডি দর',
      subtitleHi: 'आज का थोक रेट व सरकारी MSP',
      subtitleEn: 'Today\'s wholesale prices & MSP',
      subtitlePa: 'ਅੱਜ ਦਾ ਥੋਕ ਰੇਟ ਤੇ ਸਰਕਾਰੀ ਐਮਐਸਪੀ',
      subtitleGu: 'આજનો જથ્થાબંધ ભાવ અને સરકારી MSP',
      subtitleMr: 'आजचा घाऊक भाव आणि शासकीय MSP',
      subtitleBn: 'আজকের পাইকারি দর ও সরকারি MSP',
      tagHi: 'ताजा भाव',
      tagEn: 'Live Rates',
      tagPa: 'ਤਾਜ਼ਾ ਭਾਅ',
      tagGu: 'તાજા ભાવ',
      tagMr: 'ताजे दर',
      tagBn: 'লাইভ রেট',
      link: '/mandi-rates',
      color: 'bg-amber-50 text-amber-700 border-amber-200 group-hover:bg-amber-600 group-hover:text-white',
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'weather',
      icon: CloudSun,
      titleHi: 'बारिश व मौसम रडार',
      titleEn: 'Rain & Weather Radar',
      titlePa: 'ਮੀਂਹ ਤੇ ਮੌਸਮ ਰਡਾਰ',
      titleGu: 'વરસાદ અને હવામાન રડાર',
      titleMr: 'पाऊस व हवामान रडार',
      titleBn: 'বৃষ্টি ও আবহাওয়া রাডার',
      subtitleHi: '७ दिन का उपग्रह पूर्वानुमान',
      subtitleEn: '7-day hourly satellite forecast',
      subtitlePa: '7 ਦਿਨਾਂ ਦਾ ਸੈਟੇਲਾਈਟ ਮੌਸਮ ਅੰਦਾਜ਼ਾ',
      subtitleGu: '૭ દિવસની સેટેલાઇટ આગાહી',
      subtitleMr: '७ दिवसांचा उपग्रह अंदाज',
      subtitleBn: '৭ দিনের উপগ্রহ পূর্বাভাস',
      tagHi: 'मौसम अलर्ट',
      tagEn: 'Weather Alert',
      tagPa: 'ਮੌਸਮ ਅਲਰਟ',
      tagGu: 'હવામાન ચેતવણી',
      tagMr: 'हवामान इशारा',
      tagBn: 'আবহাওয়া সতর্কতা',
      link: '/weather',
      color: 'bg-sky-50 text-sky-700 border-sky-200 group-hover:bg-sky-600 group-hover:text-white',
      badgeColor: 'bg-sky-100 text-sky-800'
    },
    {
      id: 'fertilizer',
      icon: CalendarDays,
      titleHi: 'खाद गणक व बुवाई',
      titleEn: 'NPK & Sowing Matrix',
      titlePa: 'ਖਾਦ ਗਣਕ ਤੇ ਬਿਜਾਈ',
      titleGu: 'ખાતર ગણક અને વાવણી',
      titleMr: 'खत गणक व पेरणी',
      titleBn: 'সার গণক ও বপন চক্র',
      subtitleHi: 'यूरिया/DAP की सही खुराक निकालें',
      subtitleEn: 'Calculate exact fertilizer dosage',
      subtitlePa: 'ਯੂਰੀਆ/ਡੀਏਪੀ ਦੀ ਸਟੀਕ ਮਾਤਰਾ ਕੱਢੋ',
      subtitleGu: 'યુરિયા/DAP ની સાચી માત્રા ગણો',
      subtitleMr: 'युरिया/DAP ची अचूक मात्रा काढा',
      subtitleBn: 'ইউরিয়া ও ডিএপির সঠিক মাত্রা জানুন',
      tagHi: 'वैज्ञानिक खेती',
      tagEn: 'Scientific Matrix',
      tagPa: 'ਵਿਗਿਆਨਕ ਖੇਤੀ',
      tagGu: 'વૈજ્ઞાનિક ખેતી',
      tagMr: 'वैज्ञानिक शेती',
      tagBn: 'বৈজ্ঞানিক কৃষি',
      link: '/crop-calendar',
      color: 'bg-purple-50 text-purple-700 border-purple-200 group-hover:bg-purple-600 group-hover:text-white',
      badgeColor: 'bg-purple-100 text-purple-800'
    }
  ];

  const howToUseSteps = [
    {
      step: '01',
      icon: Camera,
      titleHi: 'पत्ती की फोटो खींचें',
      titleEn: 'Snap Sick Leaf Photo',
      titlePa: 'ਪੱਤੇ ਦੀ ਫ਼ੋਟੋ ਖਿੱਚੋ',
      titleGu: 'પાંદડાનો ફોટો પાડો',
      titleMr: 'पानाचा फोटो काढा',
      titleBn: 'পাতার ছবি তুলুন',
      descHi: 'खेत में खड़े होकर संक्रमित पौधे या पत्ती की कैमरे से फोटो लें। एआई डॉक्टर 5 सेकंड में रोग पहचान कर तुरंत सटीक दवा और छिड़काव की खुराक बताएगा।',
      descEn: 'Point your camera at the diseased leaf. Multimodal AI detects fungal, bacterial and pest attacks in seconds with exact cure and spray dosages.',
      descPa: 'ਖੇਤ ਵਿੱਚ ਖੜ੍ਹੇ ਹੋ ਕੇ ਬਿਮਾਰ ਪੱਤੇ ਦੀ ਫ਼ੋਟੋ ਲਵੋ। ਏਆਈ ਡਾਕਟਰ 5 ਸਕਿੰਟਾਂ ਵਿੱਚ ਰੋਗ ਪਛਾਣ ਕੇ ਤੁਰੰਤ ਸਹੀ ਦਵਾਈ ਤੇ ਛਿੜਕਾਅ ਦੀ ਮਾਤਰਾ ਦੱਸੇਗਾ।',
      descGu: 'ખેતરમાં ઉભા રહીને રોગગ્રસ્ત પાંદડાનો ફોટો પાડો. એઆઈ ડોક્ટર ૫ સેકન્ડમાં રોગ ઓળખીને તરત જ સાચી દવા અને છંટકાવની માત્રા જણાવશે.',
      descMr: 'शेतात उभे राहून बाधित पानाचा फोटो काढा. एआय डॉक्टर ५ सेकंदात रोग ओळखून लगेच अचूक औषध व फवारणीची मात्रा सांगेल.',
      descBn: 'জমিতে দাঁড়িয়ে রোগাক্রান্ত পাতা বা উদ্ভিদের ছবি তুলুন। এআই ডাক্তার ৫ সেকেন্ডের মধ্যে রোগ শনাক্ত করে সঠিক ওষুধ ও স্প্রে করার মাত্রা জানাবে।',
      link: '/kisan-doctor',
      btnHi: '📸 फसल डॉक्टर खोलें',
      btnEn: 'Open Crop Doctor',
      btnPa: '📸 ਫ਼ਸਲ ਡਾਕਟਰ ਖੋਲ੍ਹੋ',
      btnGu: '📸 પાક ડોક્ટર ખોલો',
      btnMr: '📸 पीक डॉक्टर उघडा',
      btnBn: '📸 ফসল ডাক্তার খুলুন',
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      step: '02',
      icon: DollarSign,
      titleHi: 'दैनिक मंडी भाव व MSP जांचें',
      titleEn: 'Compare Mandi & MSP',
      titlePa: 'ਰੋਜ਼ਾਨਾ ਮੰਡੀ ਭਾਅ ਤੇ MSP ਪਰਖੋ',
      titleGu: 'યાર્ડ ભાવ અને MSP ચકાસો',
      titleMr: 'बाजार भाव व MSP तपासा',
      titleBn: 'মাণ্ডি দর ও MSP তুলনা করুন',
      descHi: 'फसल बेचने से पहले अपनी नजदीकी APMC मंडी का आज का थोक भाव देखें और सरकारी न्यूनतम समर्थन मूल्य (MSP) से मिलाकर अधिक मुनाफे पर बेचें।',
      descEn: 'Check real-time wholesale mandi rates across 2,400+ APMCs before selling to local buyers. Ensure you never sell below official MSP benchmarks.',
      descPa: 'ਫ਼ਸਲ ਵੇਚਣ ਤੋਂ ਪਹਿਲਾਂ ਨੇੜਲੀ ਮੰਡੀ ਦਾ ਅੱਜ ਦਾ ਥੋਕ ਭਾਅ ਵੇਖੋ ਅਤੇ ਸਰਕਾਰੀ ਸਮਰਥਨ ਮੁੱਲ (MSP) ਨਾਲ ਮਿਲਾ ਕੇ ਵੱਧ ਮੁਨਾਫ਼ੇ ਉੱਤੇ ਵੇਚੋ।',
      descGu: 'પાક વેચતા પહેલા નજીકના માર્કેટ યાર્ડનો આજનો જથ્થાબંધ ભાવ જુઓ અને સરકારી ટેકાના ભાવ (MSP) સાથે મેળવીને વધુ નફામાં વેચો.',
      descMr: 'पीक विकण्यापूर्वी जवळच्या बाजार समितीचा आजचा घाऊक दर पहा आणि शासकीय हमीभावाशी तुलना करून जास्त नफ्यात विका.',
      descBn: 'ফসল বিক্রির আগে আপনার নিকটবর্তী APMC মাণ্ডির পাইকারি দর দেখুন এবং সরকারি MSP এর সাথে তুলনা করে সর্বোচ্চ লাভে বিক্রি করুন।',
      link: '/mandi-rates',
      btnHi: '💵 मंडी भाव देखें',
      btnEn: 'Check Mandi Rates',
      btnPa: '💵 ਮੰਡੀ ਭਾਅ ਵੇਖੋ',
      btnGu: '💵 યાર્ડ ભાવ જુઓ',
      btnMr: '💵 बाजार भाव पहा',
      btnBn: '💵 মাণ্ডি দর দেখুন',
      color: 'from-amber-500 to-orange-600',
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      step: '03',
      icon: CloudSun,
      titleHi: 'मौसम रडार व बुवाई कैलेंडर',
      titleEn: 'Weather Radar & Matrix',
      titlePa: 'ਮੌਸਮ ਰਡਾਰ ਤੇ ਬਿਜਾਈ ਕੈਲੰਡਰ',
      titleGu: 'હવામાન રડાર અને વાવણી કેલેન્ડર',
      titleMr: 'हवामान रडार व पेरणी कॅलेंडर',
      titleBn: 'আবহাওয়া রাডার ও সার ক্যালকুলেটর',
      descHi: '७ दिनों की बारिश, आंधी और तापमान का सटीक उपग्रह पूर्वानुमान देखें। अपनी मिट्टी और फसल के अनुसार यूरिया व DAP खाद की वैज्ञानिक खुराक निकालें।',
      descEn: 'Track 7-day hourly satellite rainfall forecasts and severe weather alerts. Calculate exact NPK fertilizer requirements tailored to your acreage.',
      descPa: '7 ਦਿਨਾਂ ਦੇ ਮੀਂਹ, ਤੂਫ਼ਾਨ ਤੇ ਤਾਪਮਾਨ ਦਾ ਸਟੀਕ ਸੈਟੇਲਾਈਟ ਅੰਦਾਜ਼ਾ ਵੇਖੋ। ਆਪਣੀ ਮਿੱਟੀ ਤੇ ਫ਼ਸਲ ਅਨੁਸਾਰ ਯੂਰੀਆ ਤੇ ਡੀਏਪੀ ਦੀ ਵਿਗਿਆਨਕ ਮਾਤਰਾ ਜਾਣੋ।',
      descGu: '૭ દિવસના વરસાદ, વાવાઝોડા અને તાપમાનની ચોક્કસ સેટેલાઇટ આગાહી જુઓ. જમીન અને પાક મુજબ યુરિયા અને ડીએપીની વૈજ્ઞાનિક માત્રા ગણો.',
      descMr: '७ दिवसांचा पाऊस, वादळ आणि तापमानाचा अचूक उपग्रह अंदाज पहा. आपल्या जमिनीनुसार युरिया व डीएपी खताची वैज्ञानिक मात्रा काढा.',
      descBn: '৭ দিনের বৃষ্টিপাত ও ঝড়ের সঠিক উপগ্রহ পূর্বাভাস দেখুন। আপনার জমি ও ফসলের পরিমাণ অনুযায়ী ইউরিয়া ও ডিএপি সারের বৈজ্ঞানিক মাত্রা নির্ণয় করুন।',
      link: '/weather',
      btnHi: '🌦️ मौसम रडार खोलें',
      btnEn: 'Open Weather Radar',
      btnPa: '🌦️ ਮੌਸਮ ਰਡਾਰ ਖੋਲ੍ਹੋ',
      btnGu: '🌦️ હવામાન રડાર ખોલો',
      btnMr: '🌦️ हवामान रडार उघडा',
      btnBn: '🌦️ আবহাওয়া রাডার খুলুন',
      color: 'from-sky-500 to-blue-600',
      badgeColor: 'bg-sky-100 text-sky-800'
    },
    {
      step: '04',
      icon: PhoneCall,
      titleHi: '1551 पर विशेषज्ञ से मुफ्त सलाह',
      titleEn: 'Call 1551 Toll-Free',
      titlePa: '1551 ਤੇ ਮੁਫ਼ਤ ਕਿਸਾਨ ਸਲਾਹ',
      titleGu: '૧૫૫૧ પર નિષ્ણાત સાથે મફત સલાહ',
      titleMr: '१५५१ वर तज्ज्ञांशी मोफत चर्चा',
      titleBn: '১৫৫১ নম্বরে বিনামূল্যে বিশেষজ্ঞের পরামর্শ',
      descHi: 'किसी भी गंभीर कीट प्रकोप, फसल क्षति, सरकारी योजना या सब्सिडी की जानकारी के लिए एक क्लिक में सीधे सरकारी कृषि वैज्ञानिकों से 24x7 मुफ्त बात करें।',
      descEn: 'Connect 24x7 with official government agricultural scientists and extension officers for crop insurance, seed subsidies, and crisis support.',
      descPa: 'ਕਿਸੇ ਵੀ ਗੰਭੀਰ ਕੀੜੇ-ਮਕੌੜੇ, ਫ਼ਸਲ ਨੁਕਸਾਨ ਜਾਂ ਸਰਕਾਰੀ ਸਕੀਮ ਲਈ ਸਿੱਧੇ ਸਰਕਾਰੀ ਖੇਤੀ ਵਿਗਿਆਨੀਆਂ ਨਾਲ 24x7 ਮੁਫ਼ਤ ਗੱਲ ਕਰੋ।',
      descGu: 'કોઈપણ ગંભીર જીવાત, પાક નુકસાન, સરકારી યોજના અથવા સબસિડી માટે સીધા સરકારી કૃષિ વૈજ્ઞાનિકો સાથે ૨૪x૭ મફત વાત કરો.',
      descMr: 'कोणतीही गंभीर कीड, पीक नुकसान, शासकीय योजना किंवा सबसिडीच्या माहितीसाठी थेट कृषी शास्त्रज्ञांशी २४x७ मोफत बोला.',
      descBn: 'যেকোনো কীটপতঙ্গের আক্রমণ, ফসল ক্ষয়ক্ষতি বা সরকারি প্রকল্প ও সহায়তার তথ্যের জন্য সরাসরি সরকারি কৃষি বিজ্ঞানীদের সাথে ২৪x৭ বিনামূল্যে কথা বলুন।',
      link: 'tel:1551',
      btnHi: '📞 1551 पर कॉल करें',
      btnEn: 'Call 1551 Toll-Free',
      btnPa: '📞 1551 ਤੇ ਕਾਲ ਕਰੋ',
      btnGu: '📞 ૧૫૫૧ પર કોલ કરો',
      btnMr: '📞 १५५१ वर कॉल करा',
      btnBn: '📞 ১৫৫১ নম্বরে কল করুন',
      color: 'from-purple-500 to-indigo-600',
      badgeColor: 'bg-purple-100 text-purple-800'
    }
  ];

  const testimonials = [
    {
      nameHi: 'सरदार गुरप्रीत सिंह',
      nameEn: 'Sardar Gurpreet Singh',
      namePa: 'ਸਰਦਾਰ ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ',
      nameGu: 'સરદાર ગુરપ્રીત સિંહ',
      nameMr: 'सरदार गुरप्रीत सिंग',
      nameBn: 'সরদার গুরপ্রীত সিং',
      locationHi: 'भटिंडा, पंजाब',
      locationEn: 'Bhatinda, Punjab',
      locationPa: 'ਬਠਿੰਡਾ, ਪੰਜਾਬ',
      locationGu: 'ભટિંડા, પંજાબ',
      locationMr: 'भटिंडा, पंजाब',
      locationBn: 'ভাটিণ্ডা, পাঞ্জাব',
      cropHi: 'गेहूं व सरसों किसान (12 एकड़)',
      cropEn: 'Wheat & Mustard Farmer (12 Acres)',
      cropPa: 'ਕਣਕ ਤੇ ਸਰ੍ਹੋਂ ਕਿਸਾਨ (12 ਏਕੜ)',
      cropGu: 'ઘઉં અને રાઈ ઉત્પાદક (૧૨ એકર)',
      cropMr: 'गहू व मोहरी उत्पादक (१२ एकर)',
      cropBn: 'গম ও সরিষা চাষী (১২ একর)',
      rating: 5,
      impactHi: '₹50,000 की फसल नष्ट होने से बचाई',
      impactEn: 'Saved ₹50,000 Crop Loss',
      impactPa: '₹50,000 ਦੀ ਫ਼ਸਲ ਬਚਾਈ',
      impactGu: '₹૫૦,૦૦૦ નો પાક બચાવ્યો',
      impactMr: '₹५०,००० चे पीक वाचवले',
      impactBn: '₹৫০,০০০ মূল্যের ফসল রক্ষা করেছেন',
      quoteHi: 'मेरी गेहूं की बालियों में पीला रतुआ (Yellow Rust) लग गया था। मैंने मोबाइल से पत्ती की फोटो खींची और एआई डॉक्टर ने तुरंत सही फफूंदनाशक और छिड़काव की खुराक बता दी। 4 दिन में मेरी पूरी फसल स्वस्थ हो गई!',
      quoteEn: 'Yellow rust struck my wheat field. I snapped a leaf photo with the AI Doctor and received the exact fungicide spray dosage in 5 seconds. My entire 12-acre harvest was saved in 4 days!',
      quotePa: 'ਮੇਰੀ ਕਣਕ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ (Yellow Rust) ਲੱਗ ਗਈ ਸੀ। ਮੈਂ ਮੋਬਾਈਲ ਨਾਲ ਪੱਤੇ ਦੀ ਫ਼ੋਟੋ ਖਿੱਚੀ ਅਤੇ ਏਆਈ ਡਾਕਟਰ ਨੇ 5 ਸਕਿੰਟਾਂ ਵਿੱਚ ਸਹੀ ਉੱਲੀਨਾਸ਼ਕ ਦਵਾਈ ਤੇ ਸਪਰੇਅ ਦੀ ਮਾਤਰਾ ਦੱਸ ਦਿੱਤੀ। ਮੇਰੀ 12 ਏਕੜ ਦੀ ਫ਼ਸਲ ਬਚ ਗਈ!',
      quoteGu: 'મારા ઘઉંના પાકમાં પીળો ગેરુ (Yellow Rust) રોગ લાગ્યો હતો. મેં મોબાઈલથી પાંદડાનો ફોટો પાડ્યો અને એઆઈ ડોક્ટરે ૫ સેકન્ડમાં સાચી ફૂગનાશક દવા અને છંટકાવની માત્રા જણાવી. ૪ દિવસમાં મારો ૧૨ એકરનો પાક બચી ગયો!',
      quoteMr: 'माझ्या गव्हाच्या पिकावर पिवळा तांबेरा (Yellow Rust) रोग पडला होता. मी मोबाईलने पानाचा फोटो काढला आणि एआय डॉक्टरने ५ सेकंदात योग्य बुरशीनाशक व फवारणीचे प्रमाण सांगितले. ४ दिवसात माझे १२ एकराचे पीक वाचले!',
      quoteBn: 'আমার গমের জমিতে হলুদ মরিচা (Yellow Rust) রোগ ধরেছিল। আমি মোবাইলে পাতার ছবি তুলতেই এআই ডাক্তার ৫ সেকেন্ডে সঠিক ছত্রাকনাশক ও স্প্রে করার মাত্রা বলে দেয়। ৪ দিনে আমার ১২ একর জমির পুরো ফসল সুস্থ হয়ে যায়!',
      initials: 'GS',
      avatarBg: 'bg-emerald-600'
    },
    {
      nameHi: 'रमेश पटेल',
      nameEn: 'Ramesh Patel',
      namePa: 'ਰਮੇਸ਼ ਪਟੇਲ',
      nameGu: 'રમેશ પટેલ',
      nameMr: 'रमेश पटेल',
      nameBn: 'রমেশ পটেল',
      locationHi: 'इंदौर, मध्य प्रदेश',
      locationEn: 'Indore, Madhya Pradesh',
      locationPa: 'ਇੰਦੌਰ, ਮੱਧ ਪ੍ਰਦੇਸ਼',
      locationGu: 'ઈન્દોર, મધ્ય પ્રદેશ',
      locationMr: 'इंदूर, मध्य प्रदेश',
      locationBn: 'ইন্দোর, মধ্যপ্রদেশ',
      cropHi: 'सोयाबीन व चना उत्पादक (8 एकड़)',
      cropEn: 'Soybean & Gram Grower (8 Acres)',
      cropPa: 'ਸੋਇਆਬੀਨ ਤੇ ਛੋਲੇ (8 ਏਕੜ)',
      cropGu: 'સોયાબીન અને ચણા ઉત્પાદક (૮ એકર)',
      cropMr: 'सोयाबीन व हरभरा उत्पादक (८ एकर)',
      cropBn: 'সয়াবিন ও ছোলা চাষী (৮ একর)',
      rating: 5,
      impactHi: '₹28,000 का अतिरिक्त शुद्ध मुनाफा',
      impactEn: 'Earned ₹28,000 Extra Profit',
      impactPa: '₹28,000 ਦਾ ਵਾਧੂ ਮੁਨਾਫ਼ਾ',
      impactGu: '₹૨૮,૦૦૦ નો વધારાનો નફો મેળવ્યો',
      impactMr: '₹२८,००० चा अतिरिक्त नफा मिळवला',
      impactBn: '₹২৮,০০০ অতিরিক্ত নিট মুনাফা লাভ',
      quoteHi: 'स्थानीय आढ़ती मुझे सोयाबीन का ₹4,150 प्रति क्विंटल का भाव दे रहे थे। मैंने इस वेबसाइट पर इंदौर APMC का आज का भाव देखा जो ₹4,680 था। मैंने सीधे मंडी जाकर माल बेचा और मुझे ₹28,000 का अधिक मुनाफा हुआ!',
      quoteEn: 'Local middlemen offered ₹4,150/quintal for my soybean. I checked Indore APMC rates on Climate Pulse AI and saw it was ₹4,680. Sold directly at the mandi and made ₹28,000 extra profit!',
      quotePa: 'ਆੜ੍ਹਤੀਏ ਮੈਨੂੰ ਸੋਇਆਬੀਨ ਦਾ ₹4,150 ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਭਾਅ ਦੇ ਰਹੇ ਸਨ। ਮੈਂ ਇਸ ਵੈੱਬਸਾਈਟ ਤੇ ਅੱਜ ਦਾ ਇੰਦੌਰ ਮੰਡੀ ਭਾਅ ₹4,680 ਵੇਖਿਆ ਅਤੇ ਸਿੱਧਾ ਮੰਡੀ ਜਾ ਕੇ ਵੇਚਿਆ ਜਿਸ ਨਾਲ ₹28,000 ਦਾ ਵਾਧੂ ਮੁਨਾਫ਼ਾ ਹੋਇਆ!',
      quoteGu: 'સ્થાનિક દલાલો મને સોયાબીન માટે પ્રતિ ક્વિન્ટલ ₹૪,૧૫૦ આપતા હતા. મેં આ વેબસાઇટ પર ઈન્દોર માર્કેટ યાર્ડનો આજનો ભાવ ₹૪,૬૮૦ જોયો અને સીધા યાર્ડમાં જઈને વેચ્યું, જેનાથી ₹૨૮,૦૦૦ નો વધારાનો નફો થયો!',
      quoteMr: 'स्थानिक व्यापारी मला सोयाबीनसाठी प्रति क्विंटल ₹४,१५० चा भाव देत होते. मी या वेबसाइटवर इंदूर बाजार समितीचा आजचा दर ₹४,६८० पाहिला आणि थेट बाजारात विकून ₹२८,००० जास्त नफा मिळवला!',
      quoteBn: 'স্থানীয় দালালরা আমাকে সয়াবিনের জন্য প্রতি কুইন্টাল ₹৪,১৫০ দিচ্ছিল। আমি ক্লাইমেট পালস এআই-তে আজকের ইন্দোর মাণ্ডি দর ₹৪,৬৮০ দেখে সরাসরি মাণ্ডিতে বিক্রি করি এবং ₹২৮,০০০ বেশি লাভ পাই!',
      initials: 'RP',
      avatarBg: 'bg-amber-600'
    },
    {
      nameHi: 'संतोष यादव',
      nameEn: 'Santosh Yadav',
      namePa: 'ਸੰਤੋਸ਼ ਯਾਦਵ',
      nameGu: 'સંતોષ યાદવ',
      nameMr: 'संतोष यादव',
      nameBn: 'সন্তোষ যাদব',
      locationHi: 'वाराणसी, उत्तर प्रदेश',
      locationEn: 'Varanasi, Uttar Pradesh',
      locationPa: 'ਵਾਰਾਣਸੀ, ਉੱਤਰ ਪ੍ਰਦੇਸ਼',
      locationGu: 'વારાણસી, ઉત્તર પ્રદેશ',
      locationMr: 'वाराणसी, उत्तर प्रदेश',
      locationBn: 'বারাণসী, উত্তরপ্রদেশ',
      cropHi: 'धान व मौसमी सब्जी (6 एकड़)',
      cropEn: 'Paddy & Vegetables (6 Acres)',
      cropPa: 'ਝੋਨਾ ਤੇ ਸਬਜ਼ੀਆਂ (6 ਏਕੜ)',
      cropGu: 'ડાંગર અને શાકભાજી ઉત્પાદક (૬ એકર)',
      cropMr: 'भात व भाजीपाला उत्पादक (६ एकर)',
      cropBn: 'ধান ও মৌসুমি সবজি (৬ একর)',
      rating: 5,
      impactHi: 'ओलावृष्टि से पूर्व पूरी फसल सुरक्षित काटी',
      impactEn: 'Harvested Safely Before Hail',
      impactPa: 'ਗੜੇਮਾਰੀ ਤੋਂ ਪਹਿਲਾਂ ਫ਼ਸਲ ਬਚਾਈ',
      impactGu: 'કરા પડતા પહેલા સમગ્ર પાક સુરક્ષિત લણી લીધો',
      impactMr: 'गारपिटीपूर्वी संपूर्ण पीक सुरक्षित कापणी केली',
      impactBn: 'শিলাবৃষ্টির আগেই পুরো ফসল সুরক্ষিত ঘরে তুলেছেন',
      quoteHi: 'मौसम रडार ने मुझे 3 दिन पहले ही बेमौसम तेज बारिश और आंधी-ओलावृष्टि की चेतावनी दे दी। मैंने तुरंत कंबाइन हार्वेस्टर बुलवाकर धान कटवा लिया। मेरे पड़ोसियों का अनाज भीग कर खराब हो गया, लेकिन मेरा पूरा माल सुरक्षित बच गया!',
      quoteEn: 'The satellite radar warned me of unseasonal heavy thunderstorms 3 days ahead. I immediately arranged harvesters and gathered my paddy. Neighbors suffered water logging, but my entire harvest was saved!',
      quotePa: 'ਸੈਟੇਲਾਈਟ ਮੌਸਮ ਰਡਾਰ ਨੇ 3 ਦਿਨ ਪਹਿਲਾਂ ਹੀ ਭਾਰੀ ਮੀਂਹ ਅਤੇ ਗੜਿਆਂ ਦੀ ਚੇਤਾਵਨੀ ਦੇ ਦਿੱਤੀ ਸੀ। ਮੈਂ ਤੁਰੰਤ ਕੰਬਾਈਨ ਨਾਲ ਝੋਨਾ ਕਟਵਾ ਲਿਆ ਅਤੇ ਮੇਰੀ ਸਾਰੀ ਫ਼ਸਲ ਸੁਰੱਖਿਅਤ ਬਚ ਗਈ!',
      quoteGu: 'સેટેલાઇટ રડારે મને ૩ દિવસ પહેલા જ કમોસમી વરસાદ અને કરા પડવાની ચેતવણી આપી દીધી હતી. મેં તરત જ હાર્વેસ્ટર બોલાવીને ડાંગર લણી લીધી. પાડોશીઓનો પાક બગડી ગયો પણ મારો બધો માલ બચી ગયો!',
      quoteMr: 'उपग्रह रडारने मला ३ दिवस आधीच अवकाळी पाऊस आणि गारपिटीचा इशारा दिला होता. मी लगेच हार्वेस्टर बोलावून भाताची कापणी केली. शेजाऱ्यांचे नुकसान झाले, पण माझे संपूर्ण पीक सुरक्षित वाचले!',
      quoteBn: 'স্যাটেলাইট আবহাওয়া রাডার আমাকে ৩ দিন আগেই অসময়ের ভারী বৃষ্টি ও শিলাবৃষ্টির সতর্কবার্তা দিয়েছিল। আমি অবিলম্বে হারভেস্টার ডেকে ধান কেটে নিই। প্রতিবেশীদের ফসল নষ্ট হলেও আমার সমস্ত ধান সুরক্ষিত বাঁচে!',
      initials: 'SY',
      avatarBg: 'bg-sky-600'
    }
  ];

  const faqs = [
    {
      qHi: 'क्या यह प्लेटफॉर्म और एआई फसल डॉक्टर पूरी तरह 100% मुफ्त है?',
      qEn: 'Is this platform and AI Crop Doctor really 100% free?',
      qPa: 'ਕੀ ਇਹ ਪਲੇਟਫਾਰਮ ਅਤੇ ਏਆਈ ਫ਼ਸਲ ਡਾਕਟਰ 100% ਮੁਫ਼ਤ ਹੈ?',
      qGu: 'શું આ પ્લેટફોર્મ અને એઆઈ પાક ડોક્ટર ખરેખર ૧૦૦% મફત છે?',
      qMr: 'हे व्यासपीठ आणि एआय पीक डॉक्टर पूर्णपणे १००% मोफत आहे का?',
      qBn: 'এই প্ল্যাটফর্ম এবং এআই ফসল ডাক্তার কি সম্পূর্ণ ১০০% বিনামূল্যে?',
      aHi: 'हाँ, Climate Pulse AI भारत के प्रत्येक किसान भाई-बहन के लिए 100% निःशुल्क है। इसके लिए कोई भी सब्सक्रिप्शन, पंजीकरण शुल्क या छुपा हुआ चार्ज नहीं लिया जाता। सभी सुविधाएं किसानों की सेवा हेतु खुली हैं।',
      aEn: 'Yes, Climate Pulse AI is 100% free for all Indian farmers. There are no subscriptions, registration fees, or hidden charges. All AI tools and mandi features are freely accessible.',
      aPa: 'ਹਾਂਜੀ, ਕਲਾਈਮੇਟ ਪਲਸ ਏਆਈ ਭਾਰਤ ਦੇ ਹਰ ਕਿਸਾਨ ਲਈ 100% ਮੁਫ਼ਤ ਹੈ। ਇਸ ਲਈ ਕੋਈ ਫੀਸ ਜਾਂ ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਨਹੀਂ ਹੈ।',
      aGu: 'હા, Climate Pulse AI ભારતના દરેક ખેડૂત માટે ૧૦૦% તદ્દન મફત છે. આ માટે કોઈ સબ્સ્ક્રિપ્શન ફી અથવા છુપો ચાર્જ નથી.',
      aMr: 'होय, Climate Pulse AI भारतातील प्रत्येक शेतकऱ्यासाठी १००% विनामूल्य आहे. यासाठी कोणतेही शुल्क किंवा सबस्क्रिप्शन आकारले जात नाही.',
      aBn: 'হ্যাঁ, Climate Pulse AI ভারতের প্রত্যেক কৃষক ভাই-বোনের জন্য ১০০% বিনামূল্যে। এর জন্য কোনো সাবস্ক্রিপশন, রেজিস্ট্রেশন ফি বা গোপন চার্জ নেই। সকল এআই প্রযুক্তি ও মাণ্ডি সেবা বিনামূল্যে ব্যবহারের জন্য উন্মুক্ত।'
    },
    {
      qHi: 'एआई फसल डॉक्टर कैसे काम करता है और फोटो कैसे खींचनी है?',
      qEn: 'How does AI Crop Doctor detect plant diseases and how to snap photos?',
      qPa: 'ਏਆਈ ਫ਼ਸਲ ਡਾਕਟਰ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ ਅਤੇ ਫ਼ੋਟੋ ਕਿਵੇਂ ਖਿੱਚਣੀ ਹੈ?',
      qGu: 'એઆઈ પાક ડોક્ટર કેવી રીતે કામ કરે છે અને ફોટો કેવી રીતે પાડવો?',
      qMr: 'एआय पीक डॉक्टर कसे कार्य करतो आणि फोटो कसा काढायचा?',
      qBn: 'এআই ফসল ডাক্তার কীভাবে কাজ করে এবং কীভাবে ছবি তুলতে হবে?',
      aHi: 'हमारा मल्टीमॉडल विजन एआई मॉडल पत्ती के धब्बों, फंगस, कीट और पोषक तत्वों की कमी की जांच करता है। आपको केवल खेत में खड़े होकर संक्रमित पत्ती की साफ़ रोशनी में फोटो खींचनी होती है। 5 सेकंड में बीमारी का नाम, लक्षण और रासायनिक व जैविक दोनों दवाओं का सटीक नाप मिल जाता है।',
      aEn: 'Our multimodal AI vision engine analyzes leaf discoloration, fungal spots, and pest damage. Simply take a clear photo of the sick leaf in natural daylight. In seconds, it provides diagnosis, symptoms, and exact chemical and organic spray dosages.',
      aPa: 'ਸਾਡਾ ਏਆਈ ਵਿਜ਼ਨ ਮਾਡਲ ਪੱਤੇ ਦੇ ਧੱਬਿਆਂ, ਉੱਲੀ ਤੇ ਕੀੜਿਆਂ ਦੀ ਜਾਂਚ ਕਰਦਾ ਹੈ। ਦਿਨ ਦੀ ਰੌਸ਼ਨੀ ਵਿੱਚ ਖ਼ਰਾਬ ਪੱਤੇ ਦੀ ਫ਼ੋਟੋ ਲਵੋ, 5 ਸਕਿੰਟਾਂ ਵਿੱਚ ਰੋਗ ਤੇ ਦਵਾਈ ਦੀ ਸਹੀ ਮਾਤਰਾ ਮਿਲ ਜਾਵੇਗੀ।',
      aGu: 'અમારું મલ્ટીમોડલ વિઝન એઆઈ પાંદડાના ડાઘ, ફૂગ અને જીવાતની તપાસ કરે છે. ખેતરમાં દિવસના પ્રકાશમાં પાંદડાનો સ્પષ્ટ ફોટો પાડો. ૫ સેકન્ડમાં રોગનું નામ અને દવાની ચોક્કસ માત્રા મળી જશે.',
      aMr: 'आमचे व्हिजन एआय मॉडेल पानांवरील ठिपके, बुरशी आणि किडीचे विश्लेषण करते. दिवसाच्या प्रकाशात पानाचा स्पष्ट फोटो काढा. ५ सेकंदात रोगाचे नाव आणि रासायनिक व सेंद्रिय औषधांची अचूक मात्रा मिळेल.',
      aBn: 'আমাদের মাল্টিমোডাল ভিশন এআই মডেল পাতার দাগ, ছত্রাক, পোকা ও পুষ্টির ঘাটতি বিশ্লেষণ করে। জমিতে দাঁড়িয়ে প্রাকৃতিক আলোতে রোগাক্রান্ত পাতার স্পষ্ট ছবি তুলুন। ৫ সেকেন্ডের মধ্যে রোগের নাম, লক্ষণ এবং রাসায়নিক ও জৈব ওষুধের সঠিক মাত্রা পেয়ে যাবেন।'
    },
    {
      qHi: 'दैनिक मंडी भाव कहां से आते हैं और क्या ये आधिकारिक सरकारी दरें हैं?',
      qEn: 'Where do daily Mandi rates come from and are they official government rates?',
      qPa: 'ਰੋਜ਼ਾਨਾ ਮੰਡੀ ਭਾਅ ਕਿੱਥੋਂ ਆਉਂਦੇ ਹਨ ਅਤੇ ਕੀ ਇਹ ਸਰਕਾਰੀ ਰੇਟ ਹਨ?',
      qGu: 'દૈનિક યાર્ડ ભાવ ક્યાંથી આવે છે અને શું આ સરકારી ભાવ છે?',
      qMr: 'दैनिक बाजार भाव कोठून येतात आणि हे शासकीय दर आहेत का?',
      qBn: 'দৈনিক মাণ্ডি দর কোথা থেকে আসে এবং এগুলো কি সরকারি রেট?',
      aHi: 'सभी 2,400+ मंडियों के थोक भाव भारत सरकार के आधिकारिक AGMARKNET पोर्टल और राज्य कृषि विपणन बोर्ड (APMC) से रियल-टाइम अपडेट होते हैं। आप आधिकारिक न्यूनतम समर्थन मूल्य (MSP) से तुलना करके अपनी फसल का सर्वोत्तम मूल्य प्राप्त कर सकते हैं।',
      aEn: 'All prices across 2,400+ wholesale mandis are synced live with official AGMARKNET and State APMC marketing boards. Farmers can compare live mandi rates directly against Govt Minimum Support Price (MSP).',
      aPa: 'ਸਾਰੀਆਂ 2,400+ ਮੰਡੀਆਂ ਦੇ ਭਾਅ ਭਾਰਤ ਸਰਕਾਰ ਦੇ ਅਧਿਕਾਰਤ AGMARKNET ਪੋਰਟਲ ਅਤੇ ਰਾਜ ਮੰਡੀ ਬੋਰਡ ਤੋਂ ਸਿੱਧੇ ਲਾਈਵ ਆਉਂਦੇ ਹਨ।',
      aGu: 'તમામ ૨,૪૦૦+ માર્કેટ યાર્ડના જથ્થાબંધ ભાવ ભારત સરકારના સત્તાવાર AGMARKNET પોર્ટલ અને રાજ્ય યાર્ડ બોર્ડ સાથે જોડાયેલા છે. તમે સરકારી ટેકાના ભાવ (MSP) સાથે મેળવીને સાચો ભાવ મેળવી શકો છો.',
      aMr: 'सर्व २,४००+ बाजार समित्यांचे घाऊक भाव भारत सरकारच्या अधिकृत AGMARKNET पोर्टल आणि राज्य बाजार समित्यांकडून थेट अपडेट होतात. आपण शासकीय हमीभावाशी (MSP) तुलना करू शकता.',
      aBn: 'সকল ২,৪০০+ মাণ্ডির পাইকারি দর ভারত সরকারের অফিসিয়াল AGMARKNET পোর্টাল এবং রাজ্য কৃষি বিপণন বোর্ড (APMC) থেকে রিয়েল-টাইমে আপডেট হয়। আপনি সরকারি MSP এর সাথে তুলনা করে আপনার ফসলের সর্বোচ্চ দাম পেতে পারেন।'
    },
    {
      qHi: 'क्या यह ऐप धीमे इंटरनेट या साधारण मोबाइल फोन पर भी काम करेगा?',
      qEn: 'Will this platform work on low internet connections or simple mobile phones?',
      qPa: 'ਕੀ ਇਹ ਮੱਠੇ ਇੰਟਰਨੈੱਟ ਜਾਂ ਸਾਧਾਰਨ ਮੋਬਾਈਲ ਤੇ ਚੱਲੇਗਾ?',
      qGu: 'શું આ વેબસાઇટ ધીમા ઇન્ટરનેટ અથવા સાદા ફોન પર પણ ચાલશે?',
      qMr: 'ही वेबसाइट कमी इंटरनेट किंवा साध्या फोनवर चालेल का?',
      qBn: 'এই ওয়েবসাইট কি ধীরগতির ইন্টারনেট বা সাধারণ ফোনেও কাজ করবে?',
      aHi: 'बिल्कुल! हमारी वेबसाइट को बेहद हल्का और मोबाइल-ऑप्टिमाइज़्ड बनाया गया है जो ग्रामीण क्षेत्रों में 2G/3G नेटवर्क पर भी तुरंत लोड होता है। इसके अलावा, यदि आपके पास इंटरनेट नहीं है, तो आप सीधे हमारे 1551 टोल-फ्री किसान कॉल सेंटर पर बिना इंटरनेट के मुफ्त फोन कर सकते हैं।',
      aEn: 'Absolutely! Climate Pulse AI is ultralight and designed for rural mobile devices, loading smoothly on 2G/3G networks. Farmers without internet can simply dial 1551 (Toll-Free) anytime.',
      aPa: 'ਬਿਲਕੁਲ! ਇਹ ਵੈੱਬਸਾਈਟ 2G/3G ਮੋਬਾਈਲ ਨੈੱਟਵਰਕ ਤੇ ਵੀ ਤੇਜ਼ੀ ਨਾਲ ਚੱਲਦੀ ਹੈ। ਬਿਨਾਂ ਇੰਟਰਨੈੱਟ ਦੇ ਤੁਸੀਂ ਸਿੱਧਾ 1551 ਟੋਲ-ਫ੍ਰੀ ਨੰਬਰ ਤੇ ਗੱਲ ਕਰ ਸਕਦੇ ਹੋ।',
      aGu: 'ચોક્કસ! આ વેબસાઇટ ગ્રામીણ ૨G/૩G નેટવર્ક પર પણ ઝડપથી ખુલે છે. જો ઇન્ટરનેટ ન હોય, તો તમે સીધા ૧૫૫૧ ટોલ-ફ્રી નંબર પર મફત કોલ કરી શકો છો.',
      aMr: 'नक्कीच! ही वेबसाइट ग्रामीण २G/३G नेटवर्कवरही वेगाने लोड होते. इंटरनेट नसल्यास आपण थेट १५५૧ टोल-फ्री क्रमांकावर संपर्क करू शकता.',
      aBn: 'অবশ্যই! আমাদের প্ল্যাটফর্মটি অত্যন্ত হালকা ও মোবাইল-অপ্টিমাইজড যা গ্রামীণ ২G/৩G নেটওয়ার্কেও দ্রুত লোড হয়। এছাড়া ইন্টারনেট না থাকলে আপনি সরাসরি আমাদের ১৫৫১ টোল-ফ্রি কৃষক কল সেন্টারে বিনামূল্যে ফোন করতে পারেন।'
    },
    {
      qHi: 'मौसम का पूर्वानुमान कितना सटीक है और कितनी अवधि का दिखता है?',
      qEn: 'How accurate is the 7-day weather radar and what does it track?',
      qPa: 'ਮੌਸਮ ਦਾ ਅੰਦਾਜ਼ਾ ਕਿੰਨਾ ਸਹੀ ਹੈ ਅਤੇ ਕਿੰਨੇ ਦਿਨਾਂ ਦਾ ਦਿਖਦਾ ਹੈ?',
      qGu: 'હવામાન રડાર કેટલું સચોટ છે અને કેટલા દિવસનું દર્શાવે છે?',
      qMr: 'हवामान अंदाज किती अचूक आहे आणि किती दिवसांचा दिसतो?',
      qBn: 'আবহাওয়ার পূর্বাভাস কতটা নির্ভুল এবং কতদিনের তথ্য পাওয়া যায়?',
      aHi: 'मौसम रडार Open-Meteo और वैश्विक उपग्रह (NOAA / IMD) से सीधे जुड़ा हुआ है। यह आपको अगले 7 दिनों का प्रति-घंटे का वर्षा पूर्वानुमान, तापमान, आर्द्रता और तेज हवाओं की चेतावनी देता है ताकि आप बुवाई, सिंचाई और कटाई का सही समय तय कर सकें।',
      aEn: 'The radar is powered by Open-Meteo and global satellite data (IMD/NOAA). It provides 7-day hourly precipitation probability, temperature, wind gusts, and severe storm alerts to plan irrigation and harvesting.',
      aPa: 'ਮੌਸਮ ਰਡਾਰ Open-Meteo ਅਤੇ ਸੈਟੇਲਾਈਟ ਨਾਲ ਜੁੜਿਆ ਹੋਇਆ ਹੈ। ਇਹ ਅਗਲੇ 7 ਦਿਨਾਂ ਦੇ ਮੀਂਹ, ਤਾਪਮਾਨ ਤੇ ਤੂਫ਼ਾਨ ਦੀ ਜਾਣਕਾਰੀ ਦਿੰਦਾ ਹੈ।',
      aGu: 'હવામાન રડાર Open-Meteo અને વૈશ્વિક સેટેલાઇટ સાથે જોડાયેલ છે. તે આગામી ૭ દિવસના વરસાદ, તાપમાન અને વાવાઝોડાની આગાહી આપે છે.',
      aMr: 'हवामान रडार Open-Meteo आणि उपग्रहाशी थेट जोडलेले आहे. हे पुढील ७ दिवसांचा पाऊस, तापमान आणि वादळाचा प्रति तास अचूक अंदाज देते.',
      aBn: 'আবহাওয়া রাডার Open-Meteo এবং উপগ্রহের সাথে যুক্ত। এটি আগামী ৭ দিনের প্রতি ঘণ্টার বৃষ্টিপাতের সম্ভাবনা, তাপমাত্রা ও ঝড়ের পূর্বাভাস দেয় যা সেচ ও ফসল কাটার সঠিক পরিকল্পনা করতে সাহায্য করে।'
    },
    {
      qHi: 'रासायनिक कीटनाशक दवा का छिड़काव करते समय क्या सावधानियां रखनी चाहिए?',
      qEn: 'What precautions should farmers take before applying pesticides/fertilizers?',
      qPa: 'ਕੀਟਨਾਸ਼ਕ ਦਵਾਈਆਂ ਦਾ ਛਿੜਕਾਅ ਕਰਦੇ ਸਮੇਂ ਕਿਹੜੀਆਂ ਸਾਵਧਾਨੀਆਂ ਰੱਖਣੀਆਂ ਚਾਹੀਦੀਆਂ ਹਨ?',
      qGu: 'જંતુનાશક દવા છાંટતી વખતે કઈ કાળજી રાખવી જોઈએ?',
      qMr: 'कीटकनाशक फवारताना कोणती काळजी घेतली पाहिजे?',
      qBn: 'কীটনাশক ওষুধ স্প্রে করার সময় কী কী সতর্কতা অবলম্বন করা উচিত?',
      aHi: 'हमेशा एआई डॉक्टर द्वारा बताई गई निर्धारित मात्रा (जैसे 2 मिली प्रति लीटर पानी) का ही प्रयोग करें। छिड़काव के दौरान मास्क और दस्ताने अवश्य पहनें, हवा की विपरीत दिशा में कभी छिड़काव न करें, और तेज धूप या बारिश की संभावना होने पर दवा न डालें।',
      aEn: 'Always adhere strictly to the recommended dosages (e.g. 2ml per litre of water). Wear face masks and protective gloves, avoid spraying against wind direction, and never spray under scorching midday sun or right before rain.',
      aPa: 'ਹਮੇਸ਼ਾ ਦੱਸੀ ਗਈ ਮਾਤਰਾ ਵਿੱਚ ਹੀ ਦਵਾਈ ਵਰਤੋ। ਮਾਸਕ ਪਾਓ, ਹਵਾ ਦੀ ਉਲਟ ਦਿਸ਼ਾ ਵਿੱਚ ਸਪਰੇਅ ਨਾ ਕਰੋ, ਅਤੇ ਤੇਜ਼ ਧੁੱਪ ਜਾਂ ਮੀਂਹ ਵੇਲੇ ਦਵਾਈ ਨਾ ਛਿੜਕੋ।',
      aGu: 'હંમેશા એઆઈ ડોક્ટરે જણાવેલ માત્રા મુજબ જ દવા વાપરો. માસ્ક પહેરો, પવનની વિરુદ્ધ દિશામાં છંટકાવ ન કરો અને તડકામાં કે વરસાદ પહેલા દવા ન છાંટો.',
      aMr: 'नेहमी एआय डॉक्टरने सुचवलेल्या अचूक प्रमाणातच औषध वापरा. तोंडाला मास्क लावा, वाऱ्याच्या उलट दिशेने फवारणी करू नका आणि भर उन्हात फवारणी टाळा.',
      aBn: 'সর্বদা এআই ডাক্তারের নির্দেশিত সঠিক মাত্রা ব্যবহার করুন। স্প্রে করার সময় মাস্ক ও গ্লাভস পরুন, বাতাসের বিপরীত দিকে স্প্রে করবেন না এবং তীব্র রোদে বা বৃষ্টির আগে ওষুধ স্প্রে করবেন না।'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-slate-900 flex flex-col font-sans pb-16 lg:pb-0">

      <div className="bg-[#051714] text-emerald-200 px-3 sm:px-6 py-1.5 sm:py-2 text-[11px] sm:text-xs border-b border-emerald-950 select-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-1.5 sm:gap-2 font-bold min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            
            <span className="hidden sm:inline truncate">
              {lt(
                '🇮🇳 भारत सरकार डिजिटल कृषि पहल • सभी सेवाएं किसानों हेतु १००% मुफ्त हैं',
                '🇮🇳 Smart Agriculture Initiative • 100% Free Tools for Indian Farmers',
                '🇮🇳 ਭਾਰਤ ਸਰਕਾਰ ਡਿਜੀਟਲ ਖੇਤੀਬਾੜੀ ਪਹਿਲ • ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ ਕਿਸਾਨਾਂ ਲਈ 100% ਮੁਫ਼ਤ ਹਨ',
                '🇮🇳 ભારત સરકાર ડિજિટલ કૃષિ પહેલ • તમામ સેવાઓ ખેડૂતો માટે ૧૦૦% તદ્દન મફત છે',
                '🇮🇳 भारत सरकार डिजिटल कृषी पुढाकार • सर्व सेवा शेतकऱ्यांसाठी १००% मोफत आहेत',
                '🇮🇳 ভারত সরকার ডিজিটাল কৃষি উদ্যোগ • সকল সেবা কৃষকদের জন্য ১০০% বিনামূল্যে'
              )}
            </span>
            
            <span className="sm:hidden text-[10px] font-black text-emerald-300 truncate">
              {lt(
                '🇮🇳 १००% निःशुल्क किसान सेवा',
                '🇮🇳 100% Free Farmer Service',
                '🇮🇳 100% ਮੁਫ਼ਤ ਕਿਸਾਨ ਸੇਵਾ',
                '🇮🇳 ૧૦૦% મફત કિસાન સેવા',
                '🇮🇳 १००% मोफत शेतकरी सेवा',
                '🇮🇳 ১০০% বিনামূল্যে কৃষক সেবা'
              )}
            </span>
          </div>

          
          <a
            href="tel:1551"
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-600/40 hover:bg-emerald-500/60 text-white font-black transition border border-emerald-400/40 text-[10px] sm:text-xs shrink-0 whitespace-nowrap"
            title="Kisan Call Center Toll-Free"
          >
            <PhoneCall className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-300" />
            <span className="hidden sm:inline">1551 (Toll-Free)</span>
            <span className="sm:hidden">1551</span>
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-[#071D18]/95 backdrop-blur-md border-b border-emerald-900/60 px-2.5 sm:px-8 py-2 sm:py-3 transition-all text-white w-full max-w-full overflow-hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4">
          
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2.5 shrink min-w-0 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500 to-[#123B35] flex items-center justify-center text-white shadow-md shadow-emerald-950/40 group-hover:scale-105 transition shrink-0 border border-emerald-400/30">
              <Sprout className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-100" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-white font-black text-xs sm:text-base md:text-lg tracking-tight leading-none truncate">
                Climate Pulse AI
              </span>
              <span className="hidden sm:block text-emerald-400 text-[8px] sm:text-[9px] font-black tracking-wider uppercase mt-1 leading-none whitespace-nowrap">
                {lt('स्मार्ट कृषि कमान', 'KISAN AGRO COMMAND', 'ਸਮਾਰਟ ਖੇਤੀ ਕਮਾਂਡ', 'સ્માર્ટ કૃષિ કમાન', 'स्मार्ट कृषी कमान', 'স্মার্ট কৃষি কমান্ড')}
              </span>
            </div>
          </Link>

          
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            <div className="flex items-center gap-1 bg-emerald-950/90 hover:bg-emerald-900/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-emerald-500/30 transition shadow-inner">
              <Languages className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
              <select
                value={currentLang}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-[11px] sm:text-xs font-black text-emerald-100 focus:outline-none cursor-pointer"
                title={t('select_language')}
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-[#0c2420] text-white">
                    {l.flag} {l.label}
                  </option>
                ))}
              </select>
            </div>

            
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm transition shadow-md shadow-emerald-950/30 flex items-center gap-1 whitespace-nowrap cursor-pointer"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </Link>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  to="/login"
                  className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-[11px] sm:text-xs border border-white/20 hover:border-white/35 transition shadow-xs whitespace-nowrap flex items-center justify-center cursor-pointer"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black text-[11px] sm:text-xs transition shadow-md shadow-emerald-950/40 whitespace-nowrap flex items-center justify-center cursor-pointer border border-emerald-300/40"
                >
                  <span className="sm:hidden">Register</span>
                  <span className="hidden sm:inline">Register Free</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-14 sm:pb-20 border-b border-emerald-950 text-white">
        
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2000&q=85')`
          }}
        />
        
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(3, 18, 14, 0.92) 0%, rgba(5, 28, 22, 0.84) 50%, rgba(3, 18, 14, 0.95) 100%)'
          }}
        />

        
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-8 sm:space-y-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-black shadow-md backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {lt(
                '🌾 भारतीय किसानों के लिए आधुनिक एआई कृषि प्लेटफॉर्म',
                '🌾 AI Crop Vision & Precision Mandi Intelligence for Indian Farmers',
                '🌾 ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ ਆਧੁਨਿਕ ਏਆਈ ਖੇਤੀਬਾੜੀ ਪਲੇਟਫਾਰਮ',
                '🌾 ભારતીય ખેડૂતો માટે આધુનિક એઆઈ કૃષિ પ્લેટફોર્મ',
                '🌾 भारतीय शेतकऱ्यांसाठी आधुनिक एआय कृषी मंच',
                '🌾 ভারতীয় কৃষকদের জন্য আধুনিক এআই কৃষি প্ল্যাটফর্ম'
              )}
            </span>
          </div>

          
          <div className="space-y-6 sm:space-y-8 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.14] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] pb-2 sm:pb-3">
              {lt(
                <>
                  खेती बने आसान, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 drop-shadow-sm">
                    मुनाफा बने दोगुना।
                  </span>
                </>,
                <>
                  Smarter Farming, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 drop-shadow-sm">
                    Higher Harvest Profits.
                  </span>
                </>,
                <>
                  ਖੇਤੀ ਬਣੇ ਆਸਾਨ, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 drop-shadow-sm">
                    ਮੁਨਾਫ਼ਾ ਬਣੇ ਦੁੱਗਣਾ।
                  </span>
                </>,
                <>
                  ખેતી બને સરળ, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 drop-shadow-sm">
                    નફો બને બમણો.
                  </span>
                </>,
                <>
                  शेती बने सोपी, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 drop-shadow-sm">
                    नफा बने दुप्पट.
                  </span>
                </>,
                <>
                  চাষাবাদ হোক সহজ, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 drop-shadow-sm">
                    লাভ হোক দ্বিগুণ।
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-emerald-100 font-semibold leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] max-w-2xl pt-1">
              {lt(
                'यह वेबसाइट आपके खेत के लिए क्या करती है? अपने मोबाइल कैमरे से फसल की पत्ती स्कैन करके तुरंत रोग व दवा जानें, आज का थोक मंडी भाव व सरकारी MSP देखें, और ७ दिनों का सटीक बारिश रडार पाएं।',
                'Scan sick crop leaves with your camera for instant AI disease cure, verify today\'s official APMC mandi prices against Govt MSP, and plan irrigation with 7-day weather radar.',
                'ਕੈਮਰੇ ਨਾਲ ਫ਼ਸਲ ਦਾ ਪੱਤਾ ਸਕੈਨ ਕਰਕੇ ਬਿਮਾਰੀ ਤੇ ਇਲਾਜ ਜਾਣੋ, ਅੱਜ ਦਾ ਸਰਕਾਰੀ ਮੰਡੀ ਭਾਅ ਤੇ MSP ਵੇਖੋ, ਅਤੇ 7 ਦਿਨਾਂ ਦਾ ਮੌਸਮ ਰਡਾਰ ਪਾਓ।',
                'તમારા મોબાઇલ કેમેરા વડે પાકના પાંદડા સ્કેન કરીને રોગ અને દવા જાણો, આજનો માર્કેટ યાર્ડ ભાવ અને સરકારી MSP જુઓ, અને ૭ દિવસનું હવામાન રડાર મેળવો.',
                'तुमच्या मोबाईल कॅमेऱ्याने पिकाचे पान स्कॅन करून त्वरित रोग व औषध जाणून घ्या, आजचे घाऊक बाजार समितीचे भाव व शासकीय MSP तपासा, आणि ७ दिवसांचे हवामान रडार मिळवा.',
                'আপনার মোবাইল ক্যামেরা দিয়ে ফসলের পাতা স্ক্যান করে সঙ্গে সঙ্গে রোগ ও ওষুধ জানুন, আজকের পাইকারি মাণ্ডি দর ও সরকারি MSP দেখুন, এবং ৭ দিনের আবহাওয়া রাডার পান।'
              )}
            </p>
          </div>

          
          <div className="flex flex-wrap items-center gap-3 pt-4 sm:pt-6">
            <Link
              to="/kisan-doctor"
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black text-sm sm:text-base transition transform hover:-translate-y-0.5 active:translate-y-0 shadow-xl shadow-emerald-950/60 flex items-center gap-3 border border-emerald-300/50 group"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-950/20 text-slate-950 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase font-bold text-slate-900/90 tracking-wider">
                  {lt('लाइव कैमरा स्कैनर', 'Live Camera Tool', 'ਲਾਈਵ ਕੈਮਰਾ ਟੂਲ', 'લાઇવ કેમેરા ટૂલ', 'थेट कॅमेरा टूल', 'লাইভ ক্যামেরা টুল')}
                </span>
                <span className="block text-slate-950 font-black">
                  {lt('कैमरे से फसल रोग जांचें', 'Scan Crop Leaf Disease', 'ਕੈਮਰੇ ਨਾਲ ਫ਼ਸਲ ਰੋਗ ਜਾਂਚੋ', 'પાકના પાંદડા રોਗ તપાસો', 'पिकाचे पान स्कॅन करा', 'ক্যামেরা দিয়ে ফসলের রোগ পরীক্ষা করুন')}
                </span>
              </div>
            </Link>

            <Link
              to="/mandi-rates"
              className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-black text-sm sm:text-base transition border border-white/60 shadow-xl flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-300">
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  {lt('दैनिक APMC भाव', 'Live Wholesale Rates', 'ਰੋਜ਼ਾਨਾ ਮੰਡੀ ਭਾਅ', 'દૈનિક માર્કેટ યાર્ડ ભાવ', 'दैनिक बाजार भाव', 'দৈনিক পাইকারি দর')}
                </span>
                <span className="block text-slate-900 font-black">
                  {lt('आज का मंडी भाव देखें', 'Today\'s Mandi Rates', 'ਅੱਜ ਦਾ ਮੰਡੀ ਭਾਅ ਵੇਖੋ', 'આજના યાર્ડ ભાવ જુઓ', 'आजचे बाजार भाव पहा', 'আজকের মাণ্ডি দর দেখুন')}
                </span>
              </div>
            </Link>
          </div>

          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {stats.map((st, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl border shadow-lg space-y-0.5 backdrop-blur-md transition hover:scale-[1.02]"
                style={{
                  background: 'rgba(4, 24, 18, 0.85)',
                  borderColor: 'rgba(52, 211, 153, 0.3)'
                }}
              >
                <span className="text-xl sm:text-2xl font-black text-emerald-300 block tracking-tight">
                  {lt(st.value, st.valueEn, st.value)}
                </span>
                <span className="text-xs font-bold text-emerald-100 block">
                  {lt(st.labelHi, st.labelEn, st.labelPa, st.labelGu, st.labelMr, st.labelBn)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 w-full py-12 sm:py-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#168A70] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {lt('मुख्य सेवाएं • Core Services', 'What We Do For Your Farm', 'ਮੁੱਖ ਸੇਵਾਵਾਂ • Core Services')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {lt('यह वेबसाइट आपके क्या काम आएगी?', 'How Climate Pulse AI Helps You', 'ਇਹ ਵੈੱਬਸਾਈਟ ਤੁਹਾਡੇ ਕੀ ਕੰਮ ਆਵੇਗੀ?')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {lt(
              'नीचे दिए गए किसी भी कार्ड पर क्लिक करें और सीधे सेवा का लाभ उठाएं:',
              'Tap on any of the core services below to get started immediately:',
              'ਹੇਠਾਂ ਦਿੱਤੇ ਕਿਸੇ ਵੀ ਕਾਰਡ ਤੇ ਕਲਿੱਕ ਕਰੋ ਅਤੇ ਸਿੱਧਾ ਲਾਭ ਉਠਾਓ:'
            )}
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {quickFeatures.map((srv) => {
            const Icon = srv.icon;
            return (
              <Link
                key={srv.id}
                to={isAuthenticated ? srv.link : '/login'}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${srv.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${srv.badgeColor}`}>
                      {lt(srv.tagHi, srv.tagEn, srv.tagPa, srv.tagGu, srv.tagMr, srv.tagBn)}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-[#168A70] transition-colors flex items-center gap-1.5">
                      <span>{lt(srv.titleHi, srv.titleEn, srv.titlePa, srv.titleGu, srv.titleMr, srv.titleBn)}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#168A70] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {lt(srv.subtitleHi, srv.subtitleEn, srv.subtitlePa, srv.subtitleGu, srv.subtitleMr, srv.subtitleBn)}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#168A70]">
                  <span>{lt('अभी देखें →', 'Explore Now →', 'ਹੁਣੇ ਵੇਖੋ →')}</span>
                  <span className="text-slate-400 text-[11px] font-medium">{lt('निःशुल्क', 'Free Tool', 'ਮੁਫ਼ਤ ਸੰਦ')}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white border-y border-slate-200 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#168A70]">
              {lt('लाइव कार्यप्रणाली', 'Interactive Demo Preview', 'ਲਾਈਵ ਪ੍ਰਣਾਲੀ')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {lt('देखें यह तकनीक कैसे काम करती है', 'See How the Technology Works', 'ਵੇਖੋ ਇਹ ਤਕਨੀਕ ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c2420] via-[#0e332c] to-[#123B35] text-white flex flex-col justify-between space-y-6 shadow-xl border border-emerald-600/30">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-400/30">
                    <Camera className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span>{lt('लाइव कैमरा विजन स्कैनर', 'Live Camera Vision Scanner', 'ਲਾਈਵ ਕੈਮਰਾ ਵਿਜ਼ਨ ਸਕੈਨਰ')}</span>
                  </div>
                  <span className="text-[10px] text-emerald-300 font-mono">Multimodal AI Vision</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {lt('पत्ती की फोटो लो, बीमारी और सही दवा पाओ', 'Snap Leaf Photo, Get Instant Cure & Dosages', 'ਪੱਤੇ ਦੀ ਫ਼ੋਟੋ ਲਵੋ, ਬਿਮਾਰੀ ਤੇ ਸਹੀ ਦਵਾਈ ਪਾਓ')}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-medium">
                  {lt(
                    'खेत में खड़े होकर सीधे मोबाइल कैमरे से पत्ती स्कैन करें। एआई डॉक्टर तुरंत बताएगा कि कौन सा कीट या फंगस लगा है और कौन सी दवा कितनी मात्रा में डालनी है।',
                    'Aim your phone camera at the diseased leaf. Our multimodal vision AI detects blight, rust, and nutrient deficiency in seconds with exact spray dosages.',
                    'ਖੇਤ ਵਿੱਚ ਖੜ੍ਹੇ ਹੋ ਕੇ ਮੋਬਾਈਲ ਕੈਮਰੇ ਨਾਲ ਪੱਤਾ ਸਕੈਨ ਕਰੋ। ਏਆਈ ਡਾਕਟਰ ਤੁਰੰਤ ਦੱਸੇਗਾ ਕਿ ਕਿਹੜਾ ਕੀੜਾ ਜਾਂ ਫੰਗਸ ਹੈ ਅਤੇ ਕਿਹੜੀ ਦਵਾਈ ਕਿੰਨੀ ਮਾਤਰਾ ਵਿੱਚ ਪਾਉਣੀ ਹੈ।'
                  )}
                </p>
              </div>

              
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-bold text-white">
                      {lt('पहचाना गया रोग: धान का भूरा पत्ती धब्बा', 'Detected: Paddy Brown Leaf Spot', 'ਪਛਾਣਿਆ ਰੋਗ: ਝੋਨੇ ਦਾ ਭੂਰਾ ਪੱਤਾ ਧੱਬਾ')}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 text-[10px] font-bold">
                    98.4% Confidence
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/90 leading-relaxed">
                  {lt(
                    'उपचार: हेक्साकोनाज़ोल 5% EC (2 मिली प्रति लीटर पानी) का छिड़काव करें। खेत में जल निकासी सुनिश्चित करें।',
                    'Remedy: Spray Hexaconazole 5% EC (2 ml per litre of water). Maintain proper field drainage.',
                    'ਇਲਾਜ: ਹੈਕਸਾਕੋਨਾਜ਼ੋਲ 5% EC (2 ਮਿ.ਲੀ. ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ) ਦਾ ਛਿੜਕਾਅ ਕਰੋ। ਖੇਤ ਵਿੱਚ ਪਾਣੀ ਦੀ ਨਿਕਾਸੀ ਸਹੀ ਰੱਖੋ।'
                  )}
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-emerald-300 text-[11px] font-bold">
                    {lt('🔊 आवाज में सुनें (Audio Voice Readout)', '🔊 Audio Voice Readout Available', '🔊 ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣੋ (Audio Voice Readout)')}
                  </span>
                  <Link
                    to={isAuthenticated ? "/kisan-doctor" : "/login"}
                    className="px-3 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[11px] transition"
                  >
                    {lt('अभी जांचें →', 'Try Scanner →', 'ਹੁਣੇ ਜਾਂਚੋ →')}
                  </Link>
                </div>
              </div>
            </div>

            
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                    <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lt('दैनिक थोक भाव व MSP', 'Live Mandi & Govt MSP', 'ਰੋਜ਼ਾਨਾ ਥੋਕ ਭਾਅ ਤੇ MSP')}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold">2,400+ Mandis</span>
                </div>

                <h3 className="text-xl font-black text-slate-900">
                  {lt('सरकारी MSP से भाव मिलाकर बेचें', 'Compare Mandi Price with Govt MSP', 'ਸਰਕਾਰੀ MSP ਨਾਲ ਭਾਅ ਮਿਲਾ ਕੇ ਵੇਚੋ')}
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {lt(
                    'बिचौलियों के बहकावे में न आएं। अपनी फसल का आज का आधिकारिक थोक रेट देखें।',
                    'Never sell below government minimum support price. Track daily price trends.',
                    'ਦਲਾਲਾਂ ਦੇ ਧੋਖੇ ਵਿੱਚ ਨਾ ਆਓ। ਆਪਣੀ ਫ਼ਸਲ ਦਾ ਅੱਜ ਦਾ ਸਰਕਾਰੀ ਥੋਕ ਭਾਅ ਵੇਖੋ।'
                  )}
                </p>
              </div>

              
              <div className="space-y-2.5">
                {[
                  { nameHi: '🌾 धान (Paddy / Common)', nameEn: 'Paddy', namePa: '🌾 ਝੋਨਾ (Paddy)', market: 'Ranchi Mandi', price: '₹2,320/Q', msp: '₹2,300', tag: '+₹20 above MSP', tagColor: 'text-emerald-700 bg-emerald-50' },
                  { nameHi: '🌾 गेहूं (Wheat / Sharbati)', nameEn: 'Wheat', namePa: '🌾 ਕਣਕ (Wheat)', market: 'Indore Mandi', price: '₹2,485/Q', msp: '₹2,425', tag: '+₹60 above MSP', tagColor: 'text-emerald-700 bg-emerald-50' },
                  { nameHi: '🟡 सरसों (Mustard Seed)', nameEn: 'Mustard', namePa: '🟡 ਸਰ੍ਹੋਂ (Mustard)', market: 'Jaipur Mandi', price: '₹5,750/Q', msp: '₹5,650', tag: '+₹100 above MSP', tagColor: 'text-emerald-700 bg-emerald-50' }
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-black text-slate-900 block">{lt(item.nameHi, item.nameEn, item.namePa)}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{item.market} • MSP: {item.msp}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-slate-900 block">{item.price}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${item.tagColor}`}>{item.tag}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to={isAuthenticated ? "/mandi-rates" : "/login"}
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-[#123B35] text-white font-black text-xs text-center transition block shadow-sm cursor-pointer"
              >
                {lt('सभी फसलों के भाव देखें →', 'View All Mandi Rates →', 'ਸਾਰੀਆਂ ਫ਼ਸਲਾਂ ਦੇ ਭਾਅ ਵੇਖੋ →')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 w-full py-12 sm:py-16 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#168A70] bg-emerald-100/70 px-3.5 py-1 rounded-full border border-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lt('सरल ४ चरण • Step-by-Step Guide', 'How to Use Climate Pulse AI', 'ਸੌਖੇ 4 ਕਦਮ • Step-by-Step Guide')}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {lt('खेती में टेक्नोलॉजी का उपयोग करना हुआ बिल्कुल आसान', '4 Easy Steps to Protect & Profit from Your Farm', 'ਖੇਤੀ ਵਿੱਚ ਤਕਨਾਲੋਜੀ ਦੀ ਵਰਤੋਂ ਹੋਈ ਬਿਲਕੁਲ ਆਸਾਨ')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {lt(
              'किसी विशेष तकनीकी ज्ञान की आवश्यकता नहीं — बस अपने फोन में वेबसाइट खोलें और ये ४ आसान कदम उठाएं:',
              'No app download needed. Works directly in your mobile browser with zero technical hassle:',
              'ਕਿਸੇ ਵਿਸ਼ੇਸ਼ ਜਾਣਕਾਰੀ ਦੀ ਲੋੜ ਨਹੀਂ — ਬੱਸ ਆਪਣੇ ਫ਼ੋਨ ਵਿੱਚ ਵੈੱਬਸਾਈਟ ਖੋਲ੍ਹੋ ਤੇ ਇਹ 4 ਸੌਖੇ ਕਦਮ ਚੁੱਕੋ:'
            )}
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {howToUseSteps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="relative p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-slate-200 group-hover:text-emerald-300 transition-colors tracking-tight">
                      {st.step}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${st.color} flex items-center justify-center text-white shadow-md shadow-emerald-950/20 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#168A70] transition-colors leading-snug">
                      {lt(st.titleHi, st.titleEn, st.titlePa, st.titleGu, st.titleMr, st.titleBn)}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {lt(st.descHi, st.descEn, st.descPa, st.descGu, st.descMr, st.descBn)}
                    </p>
                  </div>
                </div>

                
                <div className="pt-3 border-t border-slate-100">
                  <Link
                    to={st.link.startsWith('tel:') ? st.link : (isAuthenticated ? st.link : '/login')}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-[#168A70] hover:text-[#123B35] transition group-hover:translate-x-0.5 cursor-pointer"
                  >
                    <span>{lt(st.btnHi, st.btnEn, st.btnPa, st.btnGu, st.btnMr, st.btnBn)}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-b from-white via-emerald-50/40 to-[#F8FAF8] border-y border-slate-200 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#168A70] bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-300">
              <Users className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lt('सच्चे किसानों का भरोसा • 50,000+ Happy Farmers', 'Trusted by Real Indian Farmers', 'ਸੱਚੇ ਕਿਸਾਨਾਂ ਦਾ ਭਰੋਸਾ • 50,000+ Happy Farmers')}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {lt('हमारे किसान भाई-बहन इस प्लेटफॉर्म के बारे में क्या कहते हैं?', 'Real Stories, Real Harvest Profits', 'ਸਾਡੇ ਕਿਸਾਨ ਭੈਣ-ਭਰਾ ਇਸ ਪਲੇਟਫਾਰਮ ਬਾਰੇ ਕੀ ਕਹਿੰਦੇ ਹਨ?')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {lt(
                'पंजाब, मध्य प्रदेश और उत्तर प्रदेश के किसानों ने कैसे अपनी फसल को रोग से बचाया और मंडी में ज्यादा मुनाफा पाया:',
                'See how farmers across India reduced input costs and maximized crop sale profits with AI:',
                'ਪੰਜਾਬ, ਮੱਧ ਪ੍ਰਦੇਸ਼ ਅਤੇ ਉੱਤਰ ਪ੍ਰਦੇਸ਼ ਦੇ ਕਿਸਾਨਾਂ ਨੇ ਕਿਵੇਂ ਫ਼ਸਲ ਬਚਾਈ ਅਤੇ ਮੰਡੀ ਵਿੱਚ ਵੱਧ ਮੁਨਾਫ਼ਾ ਪਾਇਆ:'
              )}
            </p>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 relative"
              >
                <div className="space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-emerald-200" />
                  </div>

                  
                  <div className="inline-block px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-[#168A70] text-[11px] font-black">
                    ✓ {lt(t.impactHi, t.impactEn, t.impactPa, t.impactGu, t.impactMr, t.impactBn)}
                  </div>

                  
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed italic">
                    "{lt(t.quoteHi, t.quoteEn, t.quotePa, t.quoteGu, t.quoteMr, t.quoteBn)}"
                  </p>
                </div>

                
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl ${t.avatarBg} text-white flex items-center justify-center font-black text-sm shrink-0 shadow-md`}>
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <span className="font-black text-sm text-slate-900 block truncate">
                      {lt(t.nameHi, t.nameEn, t.namePa, t.nameGu, t.nameMr, t.nameBn)}
                    </span>
                    <span className="text-[11px] text-[#168A70] font-bold block truncate">
                      {lt(t.cropHi, t.cropEn, t.cropPa, t.cropGu, t.cropMr, t.cropBn)}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium block truncate">
                      {lt(t.locationHi, t.locationEn, t.locationPa, t.locationGu, t.locationMr, t.locationBn)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-around gap-4 text-center">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="text-xs sm:text-sm font-black text-slate-900">
                {lt('४.९ / ५ औसत किसान रेटिंग', '4.9/5 Average Farmer Rating', '4.9/5 ਔਸਤ ਕਿਸਾਨ ਰੇਟਿੰਗ')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-xs sm:text-sm font-black text-slate-900">
                {lt('५०,०००+ पंजीकृत किसान', '50,000+ Verified Farmers', '50,000+ ਤਸਦੀਕਸ਼ੁਦਾ ਕਿਸਾਨ')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span className="text-xs sm:text-sm font-black text-slate-900">
                {lt('२,४००+ दैनिक सरकारी मंडियां', '2,400+ Daily Mandis Connected', '2,400+ ਰੋਜ਼ਾਨਾ ਸਰਕਾਰੀ ਮੰਡੀਆਂ')}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-8 w-full py-14 sm:py-20 space-y-10">
        
        <div className="text-center max-w-xl mx-auto space-y-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#168A70] bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-300">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lt('सामान्य प्रश्न • FAQ', 'Got Questions? We Have Answers', 'ਆਮ ਸਵਾਲ • FAQ')}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {lt('अक्सर पूछे जाने वाले सवाल', 'Frequently Asked Questions', 'ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {lt(
              'एआई फसल डॉक्टर, मंडी भाव, मौसम और सरकारी हेल्पलाइन से जुड़े आपके सभी सवालों के जवाब:',
              'Everything you need to know about the AI doctor, wholesale mandi rates, and 1551 helpline:',
              'ਏਆਈ ਫ਼ਸਲ ਡਾਕਟਰ, ਮੰਡੀ ਭਾਅ, ਮੌਸਮ ਅਤੇ ਸਰਕਾਰੀ ਹੈਲਪਲਾਈਨ ਸੰਬੰਧੀ ਤੁਹਾਡੇ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ:'
            )}
          </p>
        </div>

        
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-emerald-400 shadow-md ring-1 ring-emerald-400/30'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                      isOpen ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      Q{idx + 1}
                    </span>
                    <span className="font-black text-sm sm:text-base text-slate-900 leading-snug">
                      {lt(faq.qHi, faq.qEn, faq.qPa, faq.qGu, faq.qMr, faq.qBn)}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform shrink-0 ${
                    isOpen ? 'bg-emerald-50 text-emerald-700 rotate-180' : 'bg-slate-50 text-slate-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 border-t border-slate-100">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pt-3.5">
                      {lt(faq.aHi, faq.aEn, faq.aPa, faq.aGu, faq.aMr, faq.aBn)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
          <p className="text-xs font-bold text-emerald-950">
            {lt('क्या आपका सवाल यहाँ सूचीबद्ध नहीं है?', 'Still have more questions about your crops or schemes?', 'ਕੀ ਤੁਹਾਡਾ ਸਵਾਲ ਇੱਥੇ ਸ਼ਾਮਲ ਨਹੀਂ ਹੈ?')}
          </p>
          <p className="text-xs text-emerald-700">
            {lt(
              'किसान कॉल सेंटर 1551 (टोल-फ्री) पर कभी भी कॉल करें और सीधे कृषि वैज्ञानिकों से मुफ्त बात करें।',
              'Call Kisan Call Center 1551 (Toll-Free) anytime to consult directly with government agriculture scientists.',
              'ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ 1551 (ਟੋਲ-ਫ੍ਰੀ) ਤੇ ਕਦੇ ਵੀ ਕਾਲ ਕਰੋ ਅਤੇ ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨੀਆਂ ਨਾਲ ਮੁਫ਼ਤ ਗੱਲ ਕਰੋ।'
            )}
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 w-full py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-500/40 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1600&q=85')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071D18]/95 via-[#0A2922]/90 to-[#0F3B32]/95 backdrop-blur-[1px]" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0 shadow-inner">
              <PhoneCall className="w-7 h-7 text-emerald-300 animate-pulse" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 block">
                {lt('भारत सरकार निःशुल्क किसान हेल्पलाइन', 'Govt of India Free Kisan Helpline', 'ਭਾਰਤ ਸਰਕਾਰ ਮੁਫ਼ਤ ਕਿਸਾਨ ਹੈਲਪਲਾਈਨ')}
              </span>
              <h3 className="font-black text-lg sm:text-2xl text-white">
                {lt('फसल की कोई भी समस्या हो? डायल करें: 1551', 'Any Crop Problem? Talk to Expert at 1551', 'ਫ਼ਸਲ ਦੀ ਕੋਈ ਵੀ ਸਮੱਸਿਆ ਹੋਵੇ? ਡਾਇਲ ਕਰੋ: 1551')}
              </h3>
              <p className="text-xs text-emerald-100/90 font-medium">
                {lt(
                  'कीट, रोग, खाद सब्सिडी और फसल बीमा के लिए सीधे कृषि वैज्ञानिक से मुफ्त बात करें।',
                  'Toll-free 24x7 government agricultural assistance across all Indian states.',
                  'ਕੀੜੇ, ਰੋਗ, ਖਾਦ ਸਬਸਿਡੀ ਅਤੇ ਫ਼ਸਲ ਬੀਮੇ ਲਈ ਸਿੱਧਾ ਖੇਤੀ ਵਿਗਿਆਨੀ ਨਾਲ ਮੁਫ਼ਤ ਗੱਲ ਕਰੋ।'
                )}
              </p>
            </div>
          </div>

          <a
            href="tel:1551"
            className="relative z-10 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm sm:text-base shadow-lg transition flex items-center gap-2 shrink-0 border border-emerald-300/40 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-slate-950" />
            <span>{lt('अभी 1551 पर कॉल करें', 'Call 1551 Toll-Free', 'ਹੁਣੇ 1551 ਤੇ ਕਾਲ ਕਰੋ')}</span>
          </a>
        </div>
      </section>

      <footer className="bg-[#0c2420] text-white py-12 border-t border-emerald-950 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-lg block text-white">Climate Pulse AI</span>
                <span className="text-[10px] text-emerald-300 tracking-widest uppercase block font-bold">
                  {lt('स्मार्ट कृषि एवं किसान सहायता', 'KISAN AGRO COMMAND', 'ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ ਤੇ ਕਿਸਾਨ ਸਹਾਇਤਾ')}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs text-slate-300 font-bold">
              <Link to={isAuthenticated ? "/agriculture" : "/login"} className="hover:text-emerald-300 transition">
                {lt('🌾 किसान डैशबोर्ड', 'Agro Dashboard', '🌾 ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ')}
              </Link>
              <Link to={isAuthenticated ? "/kisan-doctor" : "/login"} className="hover:text-emerald-300 transition">
                {lt('🩺 एआई फसल डॉक्टर', 'AI Crop Doctor', '🩺 ਏਆਈ ਫ਼ਸਲ ਡਾਕਟਰ')}
              </Link>
              <Link to={isAuthenticated ? "/mandi-rates" : "/login"} className="hover:text-emerald-300 transition">
                {lt('💵 मंडी भाव (MSP)', 'Mandi Rates', '💵 ਮੰਡੀ ਭਾਅ (MSP)')}
              </Link>
              <Link to={isAuthenticated ? "/crop-calendar" : "/login"} className="hover:text-emerald-300 transition">
                {lt('📅 बुवाई कैलेंडर', 'Crop Calendar', '📅 ਬਿਜਾਈ ਕੈਲੰਡਰ')}
              </Link>
              <Link to={isAuthenticated ? "/soil-health" : "/login"} className="hover:text-emerald-300 transition">
                {lt('🧪 मृदा स्वास्थ्य', 'Soil Health', '🧪 ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ')}
              </Link>
              <Link to={isAuthenticated ? "/schemes" : "/login"} className="hover:text-emerald-300 transition">
                {lt('🏛️ सरकारी योजनाएं', 'Govt Schemes', '🏛️ ਸਰਕਾਰੀ ਸਕੀਮਾਂ')}
              </Link>
              <Link to={isAuthenticated ? "/weather" : "/login"} className="hover:text-emerald-300 transition">
                {lt('🌦️ मौसम रडार', 'Weather', '🌦️ ਮੌਸਮ ਰਡਾਰ')}
              </Link>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-slate-300/80 leading-relaxed">
            <p className="font-bold text-white mb-0.5">
              {lt('किसानों के लिए सलाह व अस्वीकरण:', 'Advisory Note & Disclaimer:', 'ਕਿਸਾਨਾਂ ਲਈ ਸਲਾਹ ਤੇ ਬੇਦਾਅਵਾ:')}
            </p>
            <p>
              {lt(
                'एआई किसान डॉक्टर द्वारा प्रदान की गई सलाह सामान्य कृषि मार्गदर्शन हेतु है जो उपग्रह मौसम और आधिकारिक सरकारी APMC मंडी भाव पर आधारित है। रासायनिक कीटनाशक के प्रयोग से पूर्व कृषि अधिकारी या नजदीकी कृषि केंद्र से परामर्श अवश्य लें।',
                'AI crop doctor advice is generated using Open-Meteo satellite weather and official APMC mandi records. Farmers should consult local agriculture extension officers before applying heavy chemical pesticides.',
                'ਏਆਈ ਕਿਸਾਨ ਡਾਕਟਰ ਵੱਲੋਂ ਦਿੱਤੀ ਗਈ ਸਲਾਹ ਆਮ ਖੇਤੀਬਾੜੀ ਮਾਰਗਦਰਸ਼ਨ ਲਈ ਹੈ ਜੋ ਉਪਗ੍ਰਹਿ ਮੌਸਮ ਅਤੇ ਅਧਿਕਾਰਤ ਸਰਕਾਰੀ ਏਪੀਐਮਸੀ ਮੰਡੀ ਭਾਅ ਤੇ ਅਧਾਰਿਤ ਹੈ।'
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} Climate Pulse AI • Kisan Agro Command.</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{lt('सभी सेवाएं सक्रिय हैं (Live)', 'All Systems Operational (Open-Meteo • AI Vision • Socket.IO)', 'ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ ਚਾਲੂ ਹਨ (Live)')}</span>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#071D18]/95 backdrop-blur-md border-t border-emerald-900/80 py-2 px-3 flex items-center justify-around md:hidden shadow-2xl text-white">
        <Link to="/" className="flex flex-col items-center gap-0.5 text-emerald-400">
          <Home className="w-4 h-4" />
          <span className="text-[10px] font-black">{lt('होम', 'Home', 'ਹੋਮ', 'હોમ', 'होम', 'হোম')}</span>
        </Link>
        <Link to={isAuthenticated ? "/kisan-doctor" : "/login"} className="flex flex-col items-center gap-0.5 text-slate-300 hover:text-white">
          <Camera className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-bold">{lt('AI डॉक्टर', 'Doctor', 'ਏਆਈ ਡਾਕਟਰ', 'એઆઈ ડોક્ટર', 'एआय डॉक्टर', 'এআই ডাক্তার')}</span>
        </Link>
        <Link to={isAuthenticated ? "/mandi-rates" : "/login"} className="flex flex-col items-center gap-0.5 text-slate-300 hover:text-white">
          <DollarSign className="w-4 h-4 text-amber-400" />
          <span className="text-[10px] font-bold">{lt('मंडी भाव', 'Mandi', 'ਮੰਡੀ ਭਾਅ', 'યાર્ਡ ભાવ', 'बाजार भाव', 'মাণ্ডি দর')}</span>
        </Link>
        <Link to={isAuthenticated ? "/weather" : "/login"} className="flex flex-col items-center gap-0.5 text-slate-300 hover:text-white">
          <CloudSun className="w-4 h-4 text-sky-400" />
          <span className="text-[10px] font-bold">{lt('मौसम', 'Weather', 'ਮੌਸਮ', 'હવામાન', 'हवामान', 'আবহাওয়া')}</span>
        </Link>
        <Link
          to={isAuthenticated ? '/dashboard' : '/login'}
          className="flex flex-col items-center gap-0.5 text-emerald-300 hover:text-white"
        >
          <Sprout className="w-4 h-4" />
          <span className="text-[10px] font-black">{lt('डैशबोर्ड', 'Dashboard', 'ਡੈਸ਼ਬੋਰਡ', 'ડેશબોર્ਡ', 'डॅशबोर्ड', 'ড্যাশবোর্ড')}</span>
        </Link>
      </div>
    </div>
  );
}
