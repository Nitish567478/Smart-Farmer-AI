import React, { useState } from 'react';
import { useOffline } from '../context/OfflineContext';
import { useLanguage } from '../context/LanguageContext';
import {
  WifiOff,
  Wifi,
  RefreshCw,
  CheckCircle2,
  PhoneCall,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Database
} from 'lucide-react';

export default function OfflineIndicator({ compact = false }) {
  const { isOnline, justReconnected, lastSynced, syncStatus, syncNow, pendingQueueCount } = useOffline();
  const { currentLang, lt } = useLanguage();
  const isHi = currentLang === 'hi' || currentLang === 'pa';

  const formatLastSynced = (isoString) => {
    if (!isoString) return isHi ? 'हाल ही में' : 'Recently';
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return isHi ? 'हाल ही में' : 'Recently';
    }
  };

  if (compact) {
    if (!isOnline) {
      return (
        <button
          onClick={syncNow}
          title={isHi ? 'ऑफ़लाइन मोड - कैश्ड डेटा सक्रिय' : 'Offline Mode - Cached Data Active'}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-700 border border-amber-400/50 text-[10px] font-black animate-pulse"
        >
          <WifiOff className="w-3 h-3 text-amber-600" />
          <span>{isHi ? 'ऑफ़लाइन मोड' : 'Offline Mode'}</span>
        </button>
      );
    }

    if (justReconnected) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>{isHi ? 'सिंक हुआ' : 'Synced'}</span>
        </span>
      );
    }

    return null;
  }

  return (
    <>
      
      {!isOnline && (
        <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white px-3 sm:px-6 py-2.5 text-xs shadow-md border-b border-amber-600/40 relative z-40">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-xl bg-amber-500/30 flex items-center justify-center shrink-0 border border-amber-300/40 shadow-inner">
                <WifiOff className="w-4 h-4 text-amber-200 animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-black text-amber-200 tracking-wide uppercase text-[10px]">
                    {isHi ? '📶 ऑफ़लाइन मोड सक्रिय' : '📶 Offline Mode Active'}
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-500/40 text-[9px] font-bold text-white">
                    {isHi ? 'कैश्ड डेटा' : 'Cached Data'}
                  </span>
                  {pendingQueueCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded bg-white text-amber-900 text-[9px] font-black">
                      {pendingQueueCount} {isHi ? 'पेंडिंग सिंक' : 'Pending Sync'}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-amber-100/90 truncate font-medium">
                  {isHi
                    ? 'इंटरनेट कनेक्शन नहीं है। कैश्ड मंडी भाव व फसल रोग समाधान उपलब्ध हैं। पुनः कनेक्ट होते ही स्वतः सिंक होगा।'
                    : 'No internet connection. Serving cached crop guidance & APMC rates. Auto-syncing when reconnected.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-amber-200/90 hidden md:inline flex items-center gap-1">
                <Clock className="w-3 h-3 inline" />
                {isHi ? `अंतिम सिंक: ${formatLastSynced(lastSynced)}` : `Last Synced: ${formatLastSynced(lastSynced)}`}
              </span>

              <button
                onClick={syncNow}
                disabled={syncStatus === 'syncing'}
                className="px-3 py-1 rounded-xl bg-white text-amber-950 hover:bg-amber-100 font-black text-xs transition shadow-sm flex items-center gap-1.5 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                <span>{syncStatus === 'syncing' ? (isHi ? 'जांच रहे हैं...' : 'Checking...') : (isHi ? 'री-सिंक' : 'Retry Sync')}</span>
              </button>

              <a
                href="tel:1551"
                className="px-2.5 py-1 rounded-xl bg-amber-600/40 hover:bg-amber-500/60 text-white font-bold text-xs border border-amber-300/30 flex items-center gap-1"
                title="Kisan Call Center Toll-Free (No Internet Required)"
              >
                <PhoneCall className="w-3 h-3 text-amber-200" />
                <span className="hidden sm:inline">1551</span>
              </a>
            </div>
          </div>
        </div>
      )}

      
      {isOnline && justReconnected && (
        <div className="bg-emerald-700 text-white px-4 py-2 text-xs font-bold shadow-md border-b border-emerald-600 flex items-center justify-between animate-fade-in relative z-40">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-bounce" />
              <span>
                {isHi
                  ? '✓ इंटरनेट पुनः कनेक्ट हुआ! नवीनतम मंडी भाव और किसान मार्गदर्शन सफलतापूर्वक स्वतः सिंक हो गया है।'
                  : '✓ Internet Reconnected! 100% Latest Mandi Rates & Crop Guidance have been auto-synced.'}
              </span>
            </div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-black">
              {isHi ? 'लाइव सिंक सफल' : 'Live Sync Complete'}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
