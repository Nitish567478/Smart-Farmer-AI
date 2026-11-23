import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  PhoneCall,
  X,
  ShieldCheck,
  AlertTriangle,
  LifeBuoy,
  HeartPulse,
  Flame,
  Phone,
  Headphones,
  Sprout
} from 'lucide-react';

const HELPLINES = [
  {
    number: '1551',
    nameEn: 'Kisan Call Centre (Ministry of Agriculture)',
    nameHi: 'किसान कॉल सेंटर (कृषि मंत्रालय भारत सरकार)',
    descEn: 'Free telephonic advisory in local dialect for crop pests, seeds & weather',
    descHi: 'स्थानीय भाषा में कृषि वैज्ञानिकों द्वारा फसल, बीज व रोग पर निःशुल्क सलाह',
    badge: 'Kisan / Farmer',
    color: 'emerald',
    icon: Sprout
  },
  {
    number: '1800-180-1551',
    nameEn: 'PM-Kisan & Soil Health Card Toll-Free',
    nameHi: 'पीएम-किसान एवं मृदा स्वास्थ्य टोल-फ्री',
    descEn: 'Installment queries, DBT verification, and Soil testing issues',
    descHi: 'किस्त न आने, ई-केवाईसी या मृदा जांच से जुड़ी शिकायतों का समाधान',
    badge: 'Govt Toll-Free',
    color: 'teal',
    icon: Headphones
  },
  {
    number: '112',
    nameEn: 'National Emergency Helpline (All-in-One)',
    nameHi: 'राष्ट्रीय आपातकालीन एकीकृत हेल्पलाइन (112)',
    descEn: 'Unified emergency response for Police, Fire, Ambulance & SDRF',
    descHi: 'पुलिस, अग्निशमन, एम्बुलेंस एवं आपदा बचाव हेतु एकीकृत नंबर',
    badge: 'National SOS',
    color: 'rose',
    icon: AlertTriangle
  },
  {
    number: '1078',
    nameEn: 'NDRF Disaster Emergency Control Room',
    nameHi: 'एनडीआरएफ राष्ट्रीय आपदा नियंत्रण कक्ष',
    descEn: 'Direct coordination for flood evacuation, cyclone rescue & airlifts',
    descHi: 'बाढ़ राहत, चक्रवात बचाव दल एवं नाव/हेलीकॉप्टर रेस्क्यू सहायता',
    badge: 'NDRF Base',
    color: 'blue',
    icon: LifeBuoy
  },
  {
    number: '108',
    nameEn: 'State Emergency Ambulance Service',
    nameHi: '24x7 आपातकालीन एम्बुलेंस सेवा',
    descEn: 'Free emergency medical transport and paramedic response',
    descHi: 'गंभीर बीमारी, दुर्घटना या सर्पदंश पर तुरंत निःशुल्क एम्बुलेंस',
    badge: 'Medical',
    color: 'amber',
    icon: HeartPulse
  },
  {
    number: '101',
    nameEn: 'Fire & Rescue Brigade',
    nameHi: 'अग्निशमन एवं राहत दल (दमकल)',
    descEn: 'Immediate fire brigade dispatch for farm fires and short circuits',
    descHi: 'खेतों में आग लगने या शॉर्ट सर्किट पर तत्काल दमकल सहायता',
    badge: 'Fire Rescue',
    color: 'red',
    icon: Flame
  },
  {
    number: '1091',
    nameEn: 'Women in Distress & Safety Helpline',
    nameHi: 'महिला सुरक्षा एवं संकट निवारण हेल्पलाइन',
    descEn: '24-hour round-the-clock emergency support for women and girls',
    descHi: '24 घंटे संचालित महिला सुरक्षा एवं तत्काल कानूनी/पुलिस सुरक्षा',
    badge: 'Safety',
    color: 'purple',
    icon: ShieldCheck
  }
];

export default function HelplineModal({ isOpen, onClose }) {
  const { currentLang, lt } = useLanguage();
  const isHi = currentLang === 'hi' || currentLang === 'pa';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        
        <div className="bg-[#123B35] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#168A70] flex items-center justify-center">
              <PhoneCall className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">
                {isHi ? '📞 24x7 आपातकालीन व किसान हेल्पलाइन' : '📞 24x7 Emergency & Kisan Helplines'}
              </h3>
              <p className="text-[11px] text-emerald-200">
                {isHi ? 'निःशुल्क सरकारी सहायता नंबर — सीधे कॉल करें' : 'Toll-free Government Helplines — Tap to Call'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1 divide-y divide-slate-100">
          {HELPLINES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="pt-2.5 first:pt-0 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-slate-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs text-slate-900 truncate">
                        {isHi ? item.nameHi : item.nameEn}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {isHi ? item.descHi : item.descEn}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${item.number.replace(/[^0-9]/g, '')}`}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition flex-shrink-0 shadow-sm"
                >
                  <Phone className="w-3 h-3" />
                  <span>{item.number}</span>
                </a>
              </div>
            );
          })}
        </div>

        
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500">
            {isHi ? 'सभी हेल्पलाइन नंबर भारत सरकार द्वारा प्रमाणित एवं निःशुल्क हैं।' : 'All numbers verified 24x7 by National Disaster Management & Ministry of Agri.'}
          </p>
        </div>
      </div>
    </div>
  );
}
