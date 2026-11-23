import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Award,
  Search,
  ExternalLink,
  CheckCircle2,
  FileText,
  PhoneCall,
  ShieldCheck,
  Zap,
  Sprout,
  DollarSign,
  Info,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

const SCHEMES_DATA = [
  {
    id: 'pm-kisan',
    titleEn: 'PM-Kisan Samman Nidhi Yojana',
    titleHi: 'प्रधानमंत्री किसान सम्मान निधि योजना',
    benefitEn: '₹6,000 per year direct benefit transfer (in 3 equal installments of ₹2,000 straight to bank account)',
    benefitHi: '₹6,000 प्रति वर्ष (₹2,000 की 3 किस्तों में सीधे बैंक खाते में डीबीटी)',
    categoryEn: 'Financial Support',
    categoryHi: 'वित्तीय सहायता',
    eligibilityEn: 'All small and marginal landholding farmer families across India',
    eligibilityHi: 'सभी पात्र लघु एवं सीमांत भूमिधारक किसान परिवार',
    documentsEn: ['Aadhaar Card', 'Land Ownership Records (Khasra/Khatauni)', 'Active Bank Account & IFSC'],
    documentsHi: ['आधार कार्ड', 'भूमि स्वामित्व दस्तावेज (खसरा/खतौनी)', 'सक्रिय बैंक खाता एवं आईएफएससी कोड'],
    portalUrl: 'https://pmkisan.gov.in',
    helpline: '155261 / 011-24300606',
    icon: DollarSign,
    color: 'emerald'
  },
  {
    id: 'pmfby',
    titleEn: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    titleHi: 'प्रधानमंत्री फसल बीमा योजना',
    benefitEn: 'Comprehensive insurance cover against crop loss caused by droughts, floods, hailstorms, pests, and cyclones',
    benefitHi: 'प्राकृतिक आपदा, सूखा, बाढ़, ओलावृष्टि या कीट प्रकोप से फसल क्षति पर पूर्ण बीमा सुरक्षा',
    categoryEn: 'Crop Insurance',
    categoryHi: 'फसल बीमा',
    eligibilityEn: 'All farmers growing notified crops in notified areas (both loanee and non-loanee)',
    eligibilityHi: 'अधिसूचित क्षेत्रों में अधिसूचित फसल उगाने वाले सभी किसान',
    documentsEn: ['Land Jamabandi Record', 'Sowing Certificate from Patwari', 'Bank Passbook', 'Aadhaar Card'],
    documentsHi: ['भूमि की जमाबंदी/नकल', 'फसल बुवाई प्रमाण पत्र (पटवारी/ग्राम सेवक से)', 'बैंक पासबुक', 'आधार कार्ड'],
    portalUrl: 'https://pmfby.gov.in',
    helpline: '14447 / 1800-180-1551',
    icon: ShieldCheck,
    color: 'sky'
  },
  {
    id: 'kcc',
    titleEn: 'Kisan Credit Card (KCC) Low-Interest Loans',
    titleHi: 'किसान क्रेडिट कार्ड योजना (4% रियायती ऋण)',
    benefitEn: 'Short-term crop cultivation credit up to ₹3 Lakhs at a subsidized 4% annual interest rate (with 3% timely repayment subvention)',
    benefitHi: '₹3 लाख तक का फसली ऋण मात्र 4% रियायती ब्याज दर पर (समय पर चुकाने पर 3% अतिरिक्त छूट)',
    categoryEn: 'Loan & Credit',
    categoryHi: 'रियायती ऋण',
    eligibilityEn: 'All farmers, sharecroppers, tenant farmers, and livestock/fisheries holders',
    eligibilityHi: 'सभी किसान, बटाईदार, पट्टेदार काश्तकार एवं पशुपालक/मत्स्यपालक',
    documentsEn: ['Identity Proof (Aadhaar/Voter ID)', 'Certified Land Revenue Extract', 'Undertaking Affidavit'],
    documentsHi: ['पहचान पत्र (आधार कार्ड)', 'जमीन के रिकॉर्ड की प्रमाणित नकल', 'शपथ पत्र'],
    portalUrl: 'https://myscheme.gov.in/schemes/kcc',
    helpline: '1800-180-1551',
    icon: Award,
    color: 'amber'
  },
  {
    id: 'kusum',
    titleEn: 'PM-KUSUM Solar Irrigation Pump Scheme',
    titleHi: 'पीएम कुसुम सोलर पंप योजना',
    benefitEn: 'Heavy subsidies ranging from 60% up to 90% for installing solar irrigation pumps and solarizing grid pumps',
    benefitHi: 'सोलर सिंचाई पंप लगाने पर केंद्र व राज्य सरकार द्वारा 60% से 90% तक की भारी सब्सिडी',
    categoryEn: 'Solar & Irrigation',
    categoryHi: 'सौर ऊर्जा व सिंचाई',
    eligibilityEn: 'Individual farmers, farmer groups, water user associations, and village panchayats',
    eligibilityHi: 'व्यक्तिगत किसान, कृषक समूह, जल उपभोक्ता संघ एवं ग्राम पंचायतें',
    documentsEn: ['Aadhaar Card', 'Land Revenue Records', 'Affidavit of Non-Electrification / Grid details', 'Bank Account'],
    documentsHi: ['आधार कार्ड', 'खेत की नकल', 'बिजली कनेक्शन न होने का शपथ पत्र', 'बैंक खाता विवरण'],
    portalUrl: 'https://pmkusum.mnre.gov.in',
    helpline: '1800-180-3333',
    icon: Zap,
    color: 'amber'
  },
  {
    id: 'soil-health',
    titleEn: 'Soil Health Card Scheme',
    titleHi: 'मृदा स्वास्थ्य कार्ड योजना',
    benefitEn: 'Free laboratory testing across 12 physical/chemical soil parameters with custom NPK and micronutrient dosage prescriptions',
    benefitHi: 'खेत की मिट्टी का 12 मानकों पर निःशुल्क वैज्ञानिक परीक्षण एवं उपयुक्त उर्वरक की सटीक सिफारिशें',
    categoryEn: 'Soil & Fertilizer',
    categoryHi: 'मृदा व उर्वरक',
    eligibilityEn: 'All farmers across Indian states and union territories',
    eligibilityHi: 'देश के सभी कृषक बंधु',
    documentsEn: ['Khasra Number of Farm', 'Aadhaar Card', 'Soil Sample'],
    documentsHi: ['खेत का खसरा नंबर', 'आधार कार्ड', 'खेत की मिट्टी का नमूना'],
    portalUrl: 'https://soilhealth.dac.gov.in',
    helpline: '1800-180-1551',
    icon: Sprout,
    color: 'emerald'
  },
  {
    id: 'smam',
    titleEn: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    titleHi: 'कृषि यंत्रीकरण उप-मिशन (मशीनरी सब्सिडी)',
    benefitEn: '40% to 50% capital subsidy on tractors, rotavators, laser land levelers, and custom hiring farm centers',
    benefitHi: 'ट्रैक्टर, रोटावेटर, कल्टीवेटर, लेजर लैंड लेवलर व कस्टम हायरिंग केंद्र पर 40% से 50% तक अनुदान',
    categoryEn: 'Machinery',
    categoryHi: 'कृषि यंत्र व उपकरण',
    eligibilityEn: 'Small, marginal, women farmers, and Farmer Producer Organizations (FPOs)',
    eligibilityHi: 'लघु, सीमांत, महिला कृषक एवं किसान उत्पादक संगठन (FPO)',
    documentsEn: ['Aadhaar Card', 'Caste Certificate (if applicable)', 'Land Records', 'Bank Passbook'],
    documentsHi: ['आधार कार्ड', 'जाति प्रमाण पत्र (यदि लागू हो)', 'भूमि रिकॉर्ड', 'बैंक पासबुक'],
    portalUrl: 'https://agrimachinery.nic.in',
    helpline: '011-23382937',
    icon: Award,
    color: 'purple'
  }
];

export default function KisanSchemesPage() {
  const { currentLang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { en: 'All', hi: 'सभी श्रेणियां' },
    { en: 'Financial Support', hi: 'वित्तीय सहायता' },
    { en: 'Crop Insurance', hi: 'फसल बीमा' },
    { en: 'Loan & Credit', hi: 'रियायती ऋण' },
    { en: 'Solar & Irrigation', hi: 'सौर ऊर्जा व सिंचाई' },
    { en: 'Soil & Fertilizer', hi: 'मृदा व उर्वरक' },
    { en: 'Machinery', hi: 'कृषि यंत्र व उपकरण' }
  ];

  const filteredSchemes = SCHEMES_DATA.filter((scheme) => {
    const schemeCat = scheme.categoryEn;
    const matchesCategory = selectedCategory === 'All' || schemeCat === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      scheme.titleEn.toLowerCase().includes(q) ||
      scheme.titleHi.includes(searchQuery) ||
      scheme.benefitEn.toLowerCase().includes(q) ||
      scheme.benefitHi.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      <div className="rounded-3xl bg-[#123B35] text-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#38BDF8] text-xs font-bold border border-white/10">
            <Award className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{currentLang === 'hi' ? 'सरकारी कृषि योजनाएं एवं सब्सिडी पोर्टल' : 'Govt Agriculture Schemes & Subsidy Portal'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('schemes_page_title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {t('schemes_page_sub')}
          </p>
        </div>

        
        <div className="bg-white/10 rounded-2xl p-4 border border-white/10 text-xs space-y-1.5 min-w-[240px]">
          <span className="text-[10px] font-bold text-[#38BDF8] uppercase tracking-wider block">
            {currentLang === 'hi' ? 'राष्ट्रीय किसान हेल्पलाइन (24x7)' : 'National Kisan Helpline (24x7)'}
          </span>
          <p className="font-extrabold text-base text-white flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4 text-[#38BDF8]" /> 1800-180-1551
          </p>
          <p className="text-[11px] text-slate-300">
            {currentLang === 'hi' ? 'टोल-फ्री • 22 भारतीय भाषाओं में उपलब्ध • प्रातः 6 से रात्रि 10 बजे' : 'Toll-Free • 22 Indian Languages • 6 AM to 10 PM'}
          </p>
        </div>
      </div>

      
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={currentLang === 'hi' ? 'योजना खोजें (जैसे पीएम किसान, कुसुम, बीमा)...' : 'Search schemes (e.g. PM Kisan, Kusum, Insurance)...'}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F7FAF8] border border-[#E2E8F0] text-xs text-[#172B25] focus:outline-none focus:border-[#168A70]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.en;
            return (
              <button
                key={cat.en}
                onClick={() => setSelectedCategory(cat.en)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  isSelected
                    ? 'bg-[#123B35] text-white shadow-xs'
                    : 'bg-[#F7FAF8] text-[#64748B] hover:text-[#172B25] border border-[#E2E8F0]'
                }`}
              >
                {currentLang === 'hi' ? cat.hi : cat.en}
              </button>
            );
          })}
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSchemes.map((scheme) => {
          const Icon = scheme.icon;
          const title = currentLang === 'hi' ? scheme.titleHi : scheme.titleEn;
          const benefit = currentLang === 'hi' ? scheme.benefitHi : scheme.benefitEn;
          const category = currentLang === 'hi' ? scheme.categoryHi : scheme.categoryEn;
          const eligibility = currentLang === 'hi' ? scheme.eligibilityHi : scheme.eligibilityEn;
          const documents = currentLang === 'hi' ? scheme.documentsHi : scheme.documentsEn;

          return (
            <div
              key={scheme.id}
              className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#168A70]/10 border border-[#168A70]/30 flex items-center justify-center text-[#168A70] shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F7FAF8] text-[#123B35] border border-[#E2E8F0]">
                    {category}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-[#172B25]">{title}</h3>
                  <p className="text-xs font-semibold text-[#64748B]">
                    {currentLang === 'hi' ? scheme.titleEn : scheme.titleHi}
                  </p>
                </div>

                
                <div className="p-3 bg-[#F7FAF8] rounded-2xl border border-[#E2E8F0] text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#168A70] block">
                    {currentLang === 'hi' ? 'मुख्य लाभ (Direct Benefit):' : 'Key Benefit:'}
                  </span>
                  <p className="font-extrabold text-[#123B35] text-xs leading-relaxed">{benefit}</p>
                </div>

                
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-[#172B25]">
                      {currentLang === 'hi' ? 'पात्रता:' : 'Eligibility:'}{' '}
                    </span>
                    <span className="text-[#64748B]">{eligibility}</span>
                  </div>

                  <div>
                    <span className="font-bold text-[#172B25]">
                      {currentLang === 'hi' ? 'आवश्यक दस्तावेज:' : 'Required Documents:'}{' '}
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {documents.map((doc, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-100 text-[#172B25] text-[11px] font-medium">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-2">
                <span className="text-[11px] text-[#64748B] flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5 text-[#168A70]" /> {scheme.helpline}
                </span>

                <a
                  href={scheme.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#123B35] hover:bg-[#168A70] text-white font-bold text-xs transition shadow-xs"
                >
                  <span>{t('schemes_apply_portal')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
