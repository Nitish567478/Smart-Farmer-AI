import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import OfflineIndicator from '../components/OfflineIndicator';
import { useSocket } from '../context/SocketContext';
import { useLanguage } from '../context/LanguageContext';
import {
  AlertCircle,
  X,
  PanelLeftOpen,
  LayoutDashboard,
  Bot,
  DollarSign,
  CloudSun,
  Calculator
} from 'lucide-react';

export default function AppLayout() {
  const { t, lt } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });
  const { latestAlert, clearAlert } = useSocket();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-[#172B25]">
      
      <OfflineIndicator />

      
      {latestAlert && (
        <div className="bg-[#DC2626] text-white px-4 py-2 text-xs font-semibold flex items-center justify-between sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-2 truncate">
            <AlertCircle className="w-4 h-4 flex-shrink-0 animate-bounce" />
            <span className="font-bold uppercase tracking-wide">
              [{latestAlert.severity} ALERT]
            </span>
            <span className="truncate">{latestAlert.title}: {latestAlert.description}</span>
          </div>
          <button
            onClick={clearAlert}
            className="p-1 hover:bg-white/20 rounded-lg transition ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <Navbar
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex flex-1 relative">
        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />

        <main
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'
          } p-3.5 sm:p-4 lg:p-8 pb-24 lg:pb-8 max-w-7xl mx-auto w-full`}
        >
          <Outlet />
        </main>

        
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            title={lt('साइडबार खोलें', 'Open Sidebar', 'ਸਾਈਡਬਾਰ ਖੋਲ੍ਹੋ')}
            className="hidden lg:flex fixed left-4 bottom-6 z-40 items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-[#0c2420] text-emerald-300 hover:text-white border border-emerald-500/40 shadow-2xl hover:scale-105 transition-all text-xs font-black animate-fade-in group cursor-pointer"
          >
            <PanelLeftOpen className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>{lt('साइडबार खोलें', 'Open Sidebar', 'ਸਾਈਡਬਾਰ ਖੋਲ੍ਹੋ')}</span>
          </button>
        )}

        
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#071D18]/95 backdrop-blur-md border-t border-emerald-900/70 px-2 py-1.5 flex items-center justify-around shadow-2xl text-white">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${
                isActive ? 'text-emerald-400 font-black bg-white/10' : 'text-slate-300 hover:text-white'
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-[10px] tracking-tight">{lt('होम', 'Home', 'ਹੋਮ')}</span>
          </NavLink>

          <NavLink
            to="/kisan-doctor"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${
                isActive ? 'text-emerald-400 font-black bg-white/10' : 'text-slate-300 hover:text-white'
              }`
            }
          >
            <Bot className="w-4 h-4" />
            <span className="text-[10px] tracking-tight">{lt('डॉक्टर', 'Doctor', 'ਡਾਕਟਰ')}</span>
          </NavLink>

          <NavLink
            to="/mandi-rates"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${
                isActive ? 'text-emerald-400 font-black bg-white/10' : 'text-slate-300 hover:text-white'
              }`
            }
          >
            <DollarSign className="w-4 h-4" />
            <span className="text-[10px] tracking-tight">{lt('मंडी भाव', 'Mandi', 'ਮੰਡੀ')}</span>
          </NavLink>

          <NavLink
            to="/weather"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${
                isActive ? 'text-emerald-400 font-black bg-white/10' : 'text-slate-300 hover:text-white'
              }`
            }
          >
            <CloudSun className="w-4 h-4" />
            <span className="text-[10px] tracking-tight">{lt('मौसम', 'Weather', 'ਮੌਸਮ')}</span>
          </NavLink>

          <NavLink
            to="/savings-calculator"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${
                isActive ? 'text-emerald-400 font-black bg-white/10' : 'text-slate-300 hover:text-white'
              }`
            }
          >
            <Calculator className="w-4 h-4" />
            <span className="text-[10px] tracking-tight">{lt('बचत', 'Savings', 'ਬੱਚਤ')}</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
