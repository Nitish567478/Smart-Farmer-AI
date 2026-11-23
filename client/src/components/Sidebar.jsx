import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import HelplineModal from './HelplineModal';
import {
  LayoutDashboard,
  Sprout,
  CloudSun,
  AlertTriangle,
  Cpu,
  LifeBuoy,
  Truck,
  ShieldCheck,
  ShieldAlert,
  User,
  Compass,
  Activity,
  Bot,
  DollarSign,
  Award,
  Calculator,
  CalendarDays,
  FlaskConical,
  Building2,
  PhoneCall,
  Siren,
  ChevronRight,
  Radio,
  Boxes,
  HeartPulse,
  Flame,
  Zap,
  Droplet,
  Users,
  Terminal,
  Layers,
  FileText,
  PanelLeftClose,
  PanelLeftOpen,
  X
} from 'lucide-react';

export default function Sidebar({ isOpen, closeSidebar }) {
  const { user } = useAuth();
  const { t, currentLang, lt } = useLanguage();
  const location = useLocation();
  const [showHelpline, setShowHelpline] = useState(false);

  const currentTheme = {
    bg: 'bg-[#0c2420]',
    border: 'border-emerald-950/80',
    activeLink: 'bg-[#168A70] text-white shadow-sm ring-1 ring-emerald-400/30',
    badge: 'bg-[#38BDF8] text-[#0c2420]',
    logoBg: 'bg-gradient-to-br from-[#168A70] to-[#0e5c4a] border-emerald-400/20',
    logoIcon: Sprout,
    logoColor: 'text-emerald-200',
    brandSubtitle: lt('Kisan Agro Command • स्मार्ट कृषि', 'Kisan Agro Command • Farmer', 'Kisan Agro Command • ਸਮਾਰਟ ਖੇਤੀ'),
    dockBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-950/60 border-emerald-400/30',
    dockText: lt('1551 किसान कॉल सेन्टर', '1551 Kisan Call Center', '1551 ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ'),
    dockBadge: '1551',
    dockAction: () => window.open('tel:1551')
  };

  const getNavSections = () => [
    {
      title: lt('🌾 कृषि व किसान सेवाएं', '🌾 Kisan Agro Services', '🌾 ਖੇਤੀਬਾੜੀ ਤੇ ਕਿਸਾਨ ਸੇਵਾਵਾਂ'),
      links: [
        { name: lt('मुख्य डैशबोर्ड', 'Main Dashboard', 'ਮੁੱਖ ਡੈਸ਼ਬੋਰਡ'), path: '/dashboard', icon: LayoutDashboard, badge: lt('होम', 'Home', 'ਹੋਮ') },
        { name: lt('किसान कमांड सेंटर', 'Kisan Command Center', 'ਕਿਸਾਨ ਕਮਾਂਡ ਸੈਂਟਰ'), path: '/agriculture', icon: Sprout, badge: 'Live' },
        { name: lt('एआई किसान डॉक्टर', 'AI Kisan Doctor', 'ਏਆਈ ਕਿਸਾਨ ਡਾਕਟਰ'), path: '/kisan-doctor', icon: Bot, badge: 'AI' },
        { name: lt('राष्ट्रीय मंडी भाव (Govt MSP)', 'National Mandi Rates', 'ਕੌਮੀ ਮੰਡੀ ਭਾਅ (MSP)'), path: '/mandi-rates', icon: DollarSign, badge: lt('एमएसपी', 'MSP', 'ਐਮਐਸਪੀ') },
        { name: lt('फसल बुवाई कैलेंडर', 'Crop Sowing Calendar', 'ਫ਼ਸਲ ਬਿਜਾਈ ਕੈਲੰਡਰ'), path: '/crop-calendar', icon: CalendarDays, badge: 'New' },
        { name: lt('मृदा स्वास्थ्य कार्ड (Soil Lab)', 'Soil Health Card & Lab', 'ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ ਤੇ ਲੈਬ'), path: '/soil-health', icon: FlaskConical, badge: 'Lab' },
        { name: lt('खाद व उर्वरक गणक (NPK)', 'Fertilizer & NPK Calc', 'ਖਾਦ ਗਣਕ (NPK)'), path: '/fertilizer-calc', icon: Calculator, badge: 'NPK' },
        { name: lt('किसान बचत गणक (ROI)', 'Farm Savings Calc (ROI)', 'ਕਿਸਾਨ ਬੱਚਤ ਗਣਕ (ROI)'), path: '/savings-calculator', icon: Calculator, badge: lt('₹ बचत', 'ROI', '₹ ਬੱਚਤ') },
        { name: lt('किसान सफलता कहानियां', 'Farmer Success Stories', 'ਕਿਸਾਨ ਸਫ਼ਲਤਾ ਕਹਾਣੀਆਂ'), path: '/community-stories', icon: Award, badge: lt('प्रमाण', 'Proof', 'ਸਬੂਤ') },
        { name: lt('सरकारी योजनाएं व सब्सिडी', 'Govt Kisan Schemes', 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਤੇ ਸਬਸਿਡੀ'), path: '/schemes', icon: Award, badge: lt('योजना', 'Govt', 'ਸਕੀਮ') }
      ]
    },
    {
      title: lt('🌦️ कृषि मौसम व जोखिम', '🌦️ Weather & Crop Risk', '🌦️ ਮੌਸਮ ਤੇ ਫ਼ਸਲ ਖ਼ਤਰਾ'),
      links: [
        { name: lt('मौसम पूर्वानुमान व वर्षा', 'Weather & Rain Radar', 'ਮੌਸਮ ਅੰਦਾਜ਼ਾ ਤੇ ਮੀਂਹ ਰਡਾਰ'), path: '/weather', icon: CloudSun },
        { name: lt('सूखा व बाढ़ जोखिम मैप', 'Drought & Flood Risk Map', 'ਸੋਕਾ ਤੇ ਹੜ੍ਹ ਖ਼ਤਰਾ ਨਕਸ਼ਾ'), path: '/map', icon: Compass },
        { name: lt('मौसम चेतावनियां', 'Climate Alerts', 'ਮੌਸਮ ਚੇਤਾਵਨੀਆਂ'), path: '/alerts', icon: AlertTriangle }
      ]
    }
  ];

  const sections = getNavSections();
  const LogoIcon = currentTheme.logoIcon;

  return (
    <>
      
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 ${currentTheme.bg} text-white flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        } pt-0 border-r ${currentTheme.border}`}
      >
        
        <div className="p-3.5 sm:p-4 border-b border-white/10 flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-9 h-9 rounded-xl ${currentTheme.logoBg} flex items-center justify-center text-white shadow-md flex-shrink-0 border`}>
              <LogoIcon className={`w-5 h-5 ${currentTheme.logoColor}`} />
            </div>
            <div className="min-w-0">
              <span className="font-black text-sm text-white tracking-tight leading-tight block truncate">
                Climate Pulse AI
              </span>
              <span className="text-[10px] text-slate-300 font-bold tracking-wider uppercase block truncate">
                {currentTheme.brandSubtitle}
              </span>
            </div>
          </div>

          
          <button
            onClick={closeSidebar}
            title={lt('साइडबार बंद करें', 'Close Sidebar', 'ਸਾਈਡਬਾਰ ਬੰਦ ਕਰੋ')}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white flex items-center justify-center transition border border-white/10 shrink-0 cursor-pointer shadow-xs"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        
        <nav className="flex-1 overflow-y-auto px-3 py-3.5 space-y-4 scrollbar-thin scrollbar-thumb-white/20">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <p className="px-3 pt-1 pb-1 text-[10px] font-black uppercase tracking-wider text-white/70">
                {section.title}
              </p>

              {section.links.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? `${currentTheme.activeLink} font-black`
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 flex-shrink-0 opacity-90" />
                    <span className="flex-1 truncate">{item.name}</span>
                    {item.badge && (
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${currentTheme.badge} shadow-2xs`}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}

          
          <div className="pt-2 border-t border-white/10">
            <NavLink
              to="/profile"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? `${currentTheme.activeLink} font-black`
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <User className="w-4 h-4 flex-shrink-0 opacity-90" />
              <span className="flex-1 truncate">{t('nav_profile')}</span>
            </NavLink>
          </div>
        </nav>

        
        <div className="px-3 pt-1 pb-2">
          <button
            onClick={currentTheme.dockAction}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-black text-white shadow-lg border transition-all duration-150 group ${currentTheme.dockBg}`}
          >
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <PhoneCall className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform shrink-0" />
              <span className="truncate">{currentTheme.dockText}</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[9px] bg-white/20 text-white font-black shrink-0">
              {currentTheme.dockBadge}
            </span>
          </button>
        </div>

        
        <div className="p-3 border-t border-white/10 bg-black/30">
          <div className="flex items-center gap-2.5">
            <div className={`w-7 h-7 rounded-lg ${currentTheme.logoBg} flex items-center justify-center text-white text-xs font-black`}>
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-extrabold text-white truncate text-xs">
                {user?.name || lt('अधिकृत उपयोगकर्ता', 'Authorized User', 'ਅਧਿਕਾਰਤ ਉਪਭੋਗਤਾ')}
              </p>
              <p className="text-[10px] text-slate-300 capitalize truncate">
                {lt('किसान (Farmer)', 'Farmer', 'ਕਿਸਾਨ (Farmer)')}
              </p>
            </div>
          </div>
        </div>
      </aside>

      
      <HelplineModal isOpen={showHelpline} onClose={() => setShowHelpline(false)} />
    </>
  );
}
