import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export const LANGUAGES = [
  { code: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳' },
  { code: 'mr', label: 'मराठी (Marathi)', flag: '🇮🇳' },
  { code: 'bn', label: 'বাংলা (Bengali)', flag: '🇮🇳' }
];

const TRANSLATIONS = {
  hi: {
    live_stream: 'लाइव स्ट्रीम सक्रिय',
    realtime_stream: 'लाइव स्ट्रीम सक्रिय',
    realtime_status_msg: 'रियल-टाइम मौसम, उपग्रह जोखिम विश्लेषण एवं राष्ट्रीय कृषि मंडी (Agmarknet) डेटा सक्रिय रूप से कनेक्टेड है।',
    select_language: 'भाषा चुनें',
    notifications: 'सूचनाएं',
    no_notifications: 'कोई नई सूचना नहीं है',
    mark_all_read: 'सभी को पढ़ा हुआ चिन्हित करें',
    logout: 'लॉगआउट',

    nav_menu_header: 'नेविगेशन मेनू',
    nav_dashboard: 'डैशबोर्ड',
    nav_weather: 'मौसम पूर्वानुमान',
    nav_climate_map: 'जलवायु जोखिम मानचित्र',
    nav_alerts: 'जलवायु चेतावनियां',
    nav_agriculture: 'स्मार्ट कृषि',
    nav_kisan_doctor: 'एआई किसान डॉक्टर',
    nav_mandi_rates: 'मंडी भाव (Govt MSP)',
    nav_crop_calendar: 'फसल कैलेंडर व चक्र',
    nav_soil_health: 'मृदा स्वास्थ्य कार्ड',
    nav_fertilizer: 'उर्वरक गणक (NPK)',
    nav_schemes: 'सरकारी योजनाएं व सब्सिडी',
    nav_shelters: 'सुरक्षित आश्रय व निकासी',
    nav_helplines: '24x7 आपातकालीन हेल्पलाइन',
    section_farmer_tools: '🌾 कृषि प्रबंधन एवं उपकरण',
    section_weather_tools: '🌦️ मौसम व जलवायु',
    section_safety_tools: '🛡️ आपदा व नागरिक सुरक्षा',
    section_admin_tools: '⚙️ नियंत्रण व प्रबंधन',
    nav_profile: 'प्रोफ़ाइल एवं खेत',
    nav_emergencies: 'आपातकालीन रिपोर्ट',
    nav_incident_verification: 'घटना सत्यापन',
    nav_relief: 'राहत रसद',
    nav_resources: 'संसाधन टेलीमेट्री',
    nav_admin: 'प्रशासनिक कंसोल',
    current_session: 'सक्रिय सत्र',

    dashboard_mode: 'डैशबोर्ड मोड',
    role_farmer: '🌾 किसान',
    role_emergency: '🚨 आपदा अधिकारी',
    role_resource: '💧 संसाधन प्रबंधक',
    role_citizen: '👥 नागरिक सुरक्षा',
    role_admin: '🛡️ एडमिन कंसोल',

    role_farmer_badge: 'किसान',
    role_emergency_badge: 'आपदा अधिकारी',
    role_resource_badge: 'संसाधन प्रबंधक',
    role_citizen_badge: 'नागरिक',
    role_admin_badge: 'प्रशासक',

    title_farmer: '🌾 स्मार्ट कृषि एवं किसान कमांड सेंटर',
    title_emergency: '🚨 आपातकालीन प्रतिक्रिया एवं आपदा प्रबंधन केंद्र',
    title_resource: '💧 आईओटी स्मार्ट संसाधन एवं जल-ऊर्जा ग्रिड',
    title_citizen: '🛡️ नागरिक जलवायु सुरक्षा एवं आपातकालीन कमांड सेंटर',
    subtitle_citizen: 'नागरिक सुरक्षा सूचकांक, आपातकालीन सहायता (1-टैप SOS), नजदीकी अस्पताल, राहत शिविर एवं वायु गुणवत्ता मॉनिटरिंग',
    citizen_stream_msg: '🚨 नागरिक सुरक्षा सक्रिय: राष्ट्रीय आपातकाल 112 • 24x7 आपदा हेल्पलाइन 1078 • वायु गुणवत्ता (AQI 68) सामान्य • राहत केंद्र सक्रिय',
    title_admin: '🛡️ समग्र प्रणाली नियंत्रण एवं प्रशासनिक कंसोल',
    dashboard_subtitle: 'रियल-टाइम मौसम अवलोकन, उपग्रह जोखिम विश्लेषण एवं लाइव मंडी भाव',

    monitored_territory: 'निगरानी क्षेत्र',
    detect_location: '🎯 मेरी लोकेशन (GPS)',
    locating: 'लोकेशन खोजी जा रही है...',
    live_gps_active: '📍 लाइव जीपीएस सक्रिय',
    observed_at: 'अवलोकन समय',

    active_crop: 'सक्रिय फसल',
    active_crop_name: 'गेहूँ',
    active_crop_desc: 'रबी मौसम • कल्ले फूटने की अवस्था (21 दिन)',
    soil_moisture_label: 'मृदा नमी',
    soil_moisture_status: '34.2% • अनुकूल (सिंचाई के लिए उपयुक्त)',
    govt_msp_label: 'गेहूं का सरकारी एमएसपी',
    mandi_spread_status: 'मंडी भाव सरकारी एमएसपी से ऊपर (+₹100)',
    pm_kisan_label: 'पीएम-किसान किस्त',
    pm_kisan_status: '18वीं किस्त बैंक खाते में जमा (₹2,000)',

    tool_doctor_title: 'एआई किसान डॉक्टर',
    tool_doctor_desc: 'पत्ते की फोटो खींचकर रोग और दवा की सही खुराक पूछें',
    tool_mandi_title: 'राष्ट्रीय मंडी भाव (Govt MSP)',
    tool_mandi_desc: 'सभी 28 राज्यों की प्रमुख मंडियों के लाइव भाव व सरकारी एमएसपी',
    tool_fertilizer_title: 'खाद व उर्वरक गणक',
    tool_fertilizer_desc: 'एकड़ व बीघा के अनुसार यूरिया, डीएपी और पोटाश बोरियों की सटीक गणना',
    tool_schemes_title: 'सरकारी योजनाएं व सब्सिडी',
    tool_schemes_desc: 'पीएम फसल बीमा, केसीसी 4% लोन और सोलर पंप अनुदान',

    eo_active_emergencies: 'सक्रिय संकट रिपोर्ट',
    eo_high_severity: '2 उच्च प्राथमिकता वाली घटनाएं',
    eo_pending_triage: 'सत्यापन कतार',
    eo_inspecting: 'क्षेत्रीय अधिकारियों द्वारा जांच जारी',
    eo_active_convoys: 'राहत रसद वाहन',
    eo_ration_supply: 'राशन, दवा और पेयजल आपूर्ति में संलग्न',
    eo_safe_shelters: 'सुरक्षित राहत आश्रय स्थल',
    eo_capacity: '72% क्षमता उपलब्ध',
    eo_command_btn: 'आपदा नियंत्रण बोर्ड पर जाएं →',
    eo_command_desc: 'बचाव दल रवाना करें, बाढ़/आग की घटनाओं का सत्यापन करें और राहत सामग्री भेजें।',

    rm_water_reservoir: 'जल जलाशय स्तर',
    rm_normal_supply: 'सामान्य पेयजल आपूर्ति चालू',
    rm_solar_power: 'सोलर माइक्रोग्रिड विद्युत उत्पादन',
    rm_storage_healthy: 'बैटरी बैकअप 88% क्षमता पर',
    rm_iot_nodes: 'सक्रिय आईओटी सेंसर नोड्स',
    rm_no_faults: '0 गंभीर उपकरण त्रुटियां',
    rm_warehouse_stock: 'राहत सामग्री डिपो स्टॉक',
    rm_stock_sufficient: 'अगले 21 दिनों के लिए पर्याप्त',
    rm_console_btn: 'स्मार्ट रिसोर्स कंसोल खोलें →',

    cz_safety_index: 'वॉर्ड सुरक्षा स्तर',
    cz_safe_status: 'सुरक्षित',
    cz_no_evac: 'आपके क्षेत्र में कोई आपदा निकासी आदेश नहीं है',
    cz_nearest_hospital: 'निकटतम अस्पताल / राहत शिविर',
    cz_hospital_name: 'जिला सामान्य चिकित्सालय (1.4 किमी)',
    cz_helpline: 'आपातकालीन सहायता हेल्पलाइन',
    cz_helpline_desc: '112 / 1077 (24x7 राज्य आपदा नियंत्रण)',
    cz_weather_advisory: 'सामुदायिक मौसम चेतावनी',
    cz_clear_skies: 'मौसम सामान्य और साफ है',
    cz_sos_title: 'तत्काल आपातकालीन सहायता मांगें (1-टैप एसओएस)',
    cz_sos_desc: 'बाढ़, आग, दुर्घटना या चिकित्सा आपात स्थिति की तुरंत सूचना दें और सहायता प्राप्त करें।',
    cz_sos_btn: '🚨 1-टैप एसओएस आपातकालीन रिपोर्ट',

    adm_total_users: 'कुल पंजीकृत उपयोगकर्ता',
    adm_users_desc: 'किसान, अधिकारी एवं नागरिक',
    adm_server_status: 'सर्वर एवं सॉकेट स्थिति',
    adm_uptime: '99.98% अपटाइम • पोर्ट 5000 सक्रिय',
    adm_audit_logs: 'ऑडिट लॉग्स रिकॉर्डेड',
    adm_mongodb_audit: 'अपरिवर्तनीय मोंगोडीबी ऑडिट ट्रेल',
    adm_ai_quota: 'एआई विजन मल्टीमॉडल स्थिति',
    adm_ai_healthy: 'सक्रिय और स्वस्थ',

    live_weather: 'लाइव मौसम अवलोकन (Open-Meteo)',
    temperature: 'तापमान',
    feels_like: 'अनुभूत तापमान',
    humidity: 'आर्द्रता',
    wind_speed: 'हवा की गति',
    precipitation: 'वर्षा',
    forecast_link: '7-दिवसीय विस्तृत पूर्वानुमान एवं चार्ट्स →',
    drought_risk: 'मौसम एवं सूखा जोखिम सूचकांक',
    heat_stress: 'हीट स्ट्रेस सूचकांक',
    rainfall_threat: 'वर्षा एवं बाढ़ का खतरा',
    climate_map_btn: 'इंटरैक्टिव जलवायु जोखिम मानचित्र →',
    normal_comfort: 'सामान्य आराम स्तर',
    normal_precip: 'सामान्य वर्षा स्तर',
    clear_sky: 'साफ आसमान',
    low_severity: 'कम',

    mandi_rates_title: 'दैनिक राष्ट्रीय एपीएमसी मंडी भाव (Live Feed)',
    mandi_rates_sub: 'प्रमुख कृषि मंडियों के दैनिक न्यूनतम, अधिकतम, मॉडल भाव एवं सरकारी एमएसपी',
    refresh_rates: 'ताज़ा करें',
    view_all_mandi: 'सभी मंडी भाव देखें →',
    modal_price: 'मॉडल भाव',
    per_quintal: '/क्विंटल',
    govt_msp_prefix: 'सरकारी MSP:',
    above_msp: 'MSP से ऊपर',
    below_msp: 'MSP से नीचे',

    mandi_page_title: 'राष्ट्रीय मंडी बाजार भाव एवं सरकारी न्यूनतम समर्थन मूल्य (MSP)',
    mandi_page_subtitle: 'भारत के सभी 28 राज्यों की प्रमुख कृषि मंडियों के दैनिक भाव और भारत सरकार द्वारा निर्धारित न्यूनतम समर्थन मूल्य।',
    mandi_govt_msp_badge: 'भारत सरकार आधिकारिक न्यूनतम समर्थन मूल्य',
    mandi_guaranteed_price: 'सरकार का गारंटीड न्यूनतम भाव',
    mandi_select_commodity: 'प्रमुख फसल चुनें:',
    mandi_state_label: 'राज्य (सभी 28 राज्य व केंद्र शासित प्रदेश)',
    mandi_district_label: 'ज़िला',
    mandi_district_placeholder: 'उदा. लुधियाना, करनाल, इंदौर, रांची...',
    mandi_search_btn: 'भाव खोजें',
    mandi_table_market: 'मंडी / बाजार',
    mandi_table_district_state: 'ज़िला एवं राज्य',
    mandi_table_commodity_var: 'फसल एवं किस्म',
    mandi_table_govt_msp: 'सरकारी MSP (₹)',
    mandi_table_min: 'न्यूनतम भाव (₹)',
    mandi_table_max: 'अधिकतम भाव (₹)',
    mandi_table_modal: 'मॉडल भाव (₹/क्विंटल)',
    mandi_table_spread: 'MSP अंतर',
    mandi_table_arrival: 'आगमन तिथि',
    mandi_records_recorded: 'मंडियों के भाव दर्ज',
    mandi_loading: 'दैनिक एपीएमसी मंडी भाव लोड हो रहे हैं...',
    mandi_empty_title: 'इस चयन के लिए कोई मंडी रिकॉर्ड नहीं मिला',
    mandi_empty_desc: 'कृपया दूसरा राज्य चुनें या गेहूँ, सरसों, धान अथवा मक्का खोजें।',

    agri_page_title: 'स्मार्ट कृषि एवं किसान परामर्श केंद्र',
    agri_page_sub: 'एआई फसल परामर्श, मंडी भाव एवं सूक्ष्म मौसम विश्लेषण',
    agri_cultivars_title: 'खेत मार्गदर्शन हेतु फसल चुनें (14 प्रमुख फसलें उपलब्ध)',
    agri_cultivars_sub: 'फसल पर क्लिक करके आदर्श विकास मानक, मंडी भाव और एआई सलाह लोड करें',
    agri_advisory_title: 'एआई कृषि सलाह इंजन (AI Vision)',
    agri_advisory_sub: 'मौसम अवलोकन एवं आधिकारिक मंडी भावों पर आधारित सटीक सिफारिशें',
    agri_generate_guidance: 'मार्गदर्शन प्राप्त करें',
    agri_generating: 'सलाह तैयार हो रही है...',
    agri_click_generate: 'खेत की परिस्थितियों के अनुसार एआई सलाह प्राप्त करने के लिए "मार्गदर्शन प्राप्त करें" पर क्लिक करें:',
    agri_mandi_section_title: 'दैनिक राष्ट्रीय एपीएमसी मंडी भाव (Agmarknet)',
    agri_mandi_section_sub: 'के लिए विभिन्न क्षेत्रीय मंडियों के भाव:',

    doctor_title: 'किसान एआई डॉक्टर एवं कृषि विशेषज्ञ',
    doctor_sub: 'फसल की फोटो अपलोड करें • अपनी भाषा में पूछें • सटीक चरणबद्ध उपचार पाएं',
    voice_on: 'उत्तर बोलें: चालू',
    voice_off: 'उत्तर बोलें: बंद',
    listen_voice: 'आवाज में सुनें',
    stop_voice: 'आवाज रोकें',
    ask_placeholder: 'फसल, रोग, खाद या बीज के बारे में अपनी भाषा में पूछें...',
    send_btn: 'भेजें',

    fert_page_title: 'उर्वरक एवं एनपीके खुराक गणक',
    fert_page_sub: 'प्रति एकड़ यूरिया, डीएपी और पोटाश की सटीक वैज्ञानिक मात्रा एवं सही समय',
    fert_select_crop: 'फसल चुनें',
    fert_area_label: 'जमीन का रकबा (एकड़ में)',
    fert_calculate_btn: 'खुराक की गणना करें',
    fert_total_req: 'कुल उर्वरक आवश्यकता (प्रति एकड़)',
    fert_urea_bags: 'यूरिया (45 किग्रा बोरी)',
    fert_dap_bags: 'डीएपी (50 किग्रा बोरी)',
    fert_mop_bags: 'पोटाश/MOP (50 किग्रा बोरी)',
    fert_zinc: 'जिंक सल्फेट (33%)',
    fert_schedule_title: 'खाद डालने की समय सारिणी',

    schemes_page_title: 'किसानों हेतु सरकारी योजनाएं एवं सब्सिडी',
    schemes_page_sub: 'केंद्र व राज्य सरकार की प्रमुख कृषि कल्याण योजनाएं, फसल बीमा और रियायती ऋण',
    schemes_search_placeholder: 'योजना का नाम या लाभ खोजें...',
    schemes_apply_portal: 'आधिकारिक पोर्टल खोलें',
    schemes_helpline_label: 'टोल-फ्री हेल्पलाइन',
    schemes_benefits: 'मुख्य लाभ',
    schemes_eligibility: 'पात्रता',
    schemes_documents: 'आवश्यक दस्तावेज'
  },

  en: {
    live_stream: 'Live Stream Active',
    realtime_stream: 'Live Stream Active',
    realtime_status_msg: 'Real-time meteorological, satellite risk analytics and National APMC Agmarknet feeds are actively connected.',
    select_language: 'Select Language',
    notifications: 'Notifications',
    no_notifications: 'No new notifications',
    mark_all_read: 'Mark all as read',
    logout: 'Logout',

    nav_menu_header: 'Navigation Menu',
    nav_dashboard: 'Dashboard',
    nav_weather: 'Weather Forecast',
    nav_climate_map: 'Climate Risk Map',
    nav_alerts: 'Climate Alerts',
    nav_agriculture: 'Smart Agriculture',
    nav_kisan_doctor: 'AI Kisan Doctor',
    nav_mandi_rates: 'APMC Mandi Rates',
    nav_crop_calendar: 'Crop Sowing Calendar',
    nav_soil_health: 'Soil Health Card',
    nav_fertilizer: 'Fertilizer Calculator',
    nav_schemes: 'Govt Schemes & Subsidy',
    nav_shelters: 'Safe Shelters & Evacuation',
    nav_helplines: '24x7 Emergency Helplines',
    section_farmer_tools: '🌾 Agricultural Tools',
    section_weather_tools: '🌦️ Weather & Climate',
    section_safety_tools: '🛡️ Disaster & Civil Safety',
    section_admin_tools: '⚙️ System Operations',
    nav_profile: 'Profile & Farm',
    nav_emergencies: 'Emergency Reports',
    nav_incident_verification: 'Incident Verification',
    nav_relief: 'Relief Logistics',
    nav_resources: 'Resource Telemetry',
    nav_admin: 'Admin Console',
    current_session: 'Current Session',

    dashboard_mode: 'Dashboard Role View',
    role_farmer: '🌾 Farmer',
    role_emergency: '🚨 Emergency Officer',
    role_resource: '💧 Resource Manager',
    role_citizen: '👥 Citizen Safety',
    role_admin: '🛡️ Admin Console',

    role_farmer_badge: 'Farmer',
    role_emergency_badge: 'Emergency Officer',
    role_resource_badge: 'Resource Manager',
    role_citizen_badge: 'Citizen',
    role_admin_badge: 'Administrator',

    title_farmer: '🌾 Smart Agriculture & Farmer Command Center',
    title_emergency: '🚨 Emergency Response & Incident Command Center',
    title_resource: '💧 IoT Smart Utilities & Resource Grid Telemetry',
    title_citizen: '🛡️ Citizen Climate Safety & Civil Protection Command Center',
    subtitle_citizen: 'Civic safety index, 1-tap rapid emergency SOS, nearest hospital/shelter locator, and real-time air quality monitoring',
    citizen_stream_msg: '🚨 Civic Safety Active: National Emergency 112 • NDRF Disaster Helpline 1078 • Air Quality (AQI 68) Normal • All Civic Shelters Ready',
    title_admin: '🛡️ System-Wide Governance & Administrative Console',
    dashboard_subtitle: 'Real-time meteorological observation, satellite risk analytics & live APMC mandi rates',

    monitored_territory: 'Monitored Territory',
    detect_location: '🎯 My Location (GPS)',
    locating: 'Locating via GPS...',
    live_gps_active: '📍 Live GPS Active',
    observed_at: 'Observed Time',

    active_crop: 'Active Cultivar',
    active_crop_name: 'Wheat',
    active_crop_desc: 'Rabi Season • Tillering Stage (Day 21)',
    soil_moisture_label: 'Soil Moisture',
    soil_moisture_status: '34.2% • Optimal (Field capacity adequate)',
    govt_msp_label: 'Wheat Govt MSP Benchmark',
    mandi_spread_status: 'Market rate trading above Govt MSP (+₹100)',
    pm_kisan_label: 'PM-Kisan Direct Benefit Transfer',
    pm_kisan_status: '18th Installment Credited (₹2,000)',

    tool_doctor_title: 'AI Kisan Doctor',
    tool_doctor_desc: 'Upload crop photos to diagnose pests/diseases and get exact treatment dosage',
    tool_mandi_title: 'National Mandi Rates (Govt MSP)',
    tool_mandi_desc: 'Daily APMC market rates and official Government MSP across all 28 states',
    tool_fertilizer_title: 'Fertilizer & NPK Calculator',
    tool_fertilizer_desc: 'Calculate exact Urea, DAP, and MOP bags needed per acre or bigha',
    tool_schemes_title: 'Govt Schemes & Subsidies',
    tool_schemes_desc: 'Pradhan Mantri Fasal Bima, KCC 4% loans, and solar irrigation pump subsidies',

    eo_active_emergencies: 'Active Emergency Reports',
    eo_high_severity: '2 High Severity Incidents',
    eo_pending_triage: 'Pending Triage Queue',
    eo_inspecting: 'Field inspection in progress',
    eo_active_convoys: 'Relief Logistics Fleet',
    eo_ration_supply: 'Engaged in food, water & medicine transit',
    eo_safe_shelters: 'Safe Relief Shelters',
    eo_capacity: '72% Capacity Available',
    eo_command_btn: 'Open Emergency Operations Board →',
    eo_command_desc: 'Dispatch rescue units, verify flood/fire incident reports and manage relief corridors.',

    rm_water_reservoir: 'Water Reservoir Level',
    rm_normal_supply: 'Normal municipal supply active',
    rm_solar_power: 'Solar Microgrid Generation',
    rm_storage_healthy: 'Battery storage at 88% capacity',
    rm_iot_nodes: 'Active IoT Sensor Nodes',
    rm_no_faults: '0 critical telemetry faults',
    rm_warehouse_stock: 'Emergency Relief Stock Depots',
    rm_stock_sufficient: 'Sufficient for next 21 days',
    rm_console_btn: 'Open Smart Resource Console →',

    cz_safety_index: 'Ward Safety Status',
    cz_safe_status: 'SAFE',
    cz_no_evac: 'No active evacuation alerts in your zone',
    cz_nearest_hospital: 'Nearest Hospital / Safe Shelter',
    cz_hospital_name: 'District General Hospital (1.4 km)',
    cz_helpline: 'Emergency Assistance Helpline',
    cz_helpline_desc: '112 / 1077 (24x7 State Emergency Center)',
    cz_weather_advisory: 'Community Weather Advisory',
    cz_clear_skies: 'Weather conditions are fair and normal',
    cz_sos_title: 'Request Immediate SOS Emergency Help',
    cz_sos_desc: 'Report flood, fire, building collapse or medical emergency for instant response.',
    cz_sos_btn: '🚨 1-Tap SOS Emergency Dispatch',

    adm_total_users: 'Total Registered Users',
    adm_users_desc: 'Farmers, Officers & Citizens',
    adm_server_status: 'Server & Socket Status',
    adm_uptime: '99.98% Up • Port 5000 Active',
    adm_audit_logs: 'Audit Logs Recorded',
    adm_mongodb_audit: 'Immutable MongoDB Audit Trail',
    adm_ai_quota: 'AI Crop Vision Engine Status',
    adm_ai_healthy: 'Active & Healthy (Quota Verified)',

    live_weather: 'Live Weather Observation (Open-Meteo)',
    temperature: 'Temperature',
    feels_like: 'Apparent Temp',
    humidity: 'Humidity',
    wind_speed: 'Wind Speed',
    precipitation: 'Precipitation',
    forecast_link: '7-Day Detailed Forecast & Hourly Charts →',
    drought_risk: 'Weather & Drought Hazard Risk',
    heat_stress: 'Heat Stress Index',
    rainfall_threat: 'Rainfall / Flood Threat',
    climate_map_btn: 'Interactive Climate Risk Map →',
    normal_comfort: 'Normal Comfort Level',
    normal_precip: 'Normal precipitation levels',
    clear_sky: 'Clear Sky',
    low_severity: 'Low',

    mandi_rates_title: 'Daily APMC Mandi Market Rates (Agmarknet Live)',
    mandi_rates_sub: 'Daily minimum, maximum, modal rates and official Govt MSP across agricultural markets',
    refresh_rates: 'Refresh Rates',
    view_all_mandi: 'View All Mandis →',
    modal_price: 'Modal Price',
    per_quintal: '/Quintal',
    govt_msp_prefix: 'Govt MSP:',
    above_msp: 'Above MSP',
    below_msp: 'Below MSP',

    mandi_page_title: 'National Mandi Market Prices & Govt MSP',
    mandi_page_subtitle: 'Daily commodity prices, modal rates, and market arrivals benchmarked against official Government MSP across all 28 Indian states.',
    mandi_govt_msp_badge: 'Official Govt MSP Benchmark',
    mandi_guaranteed_price: 'Govt Benchmark Price',
    mandi_select_commodity: 'Select Crop / Commodity:',
    mandi_state_label: 'State (All 28 States & UTs)',
    mandi_district_label: 'District',
    mandi_district_placeholder: 'e.g. Ludhiana, Karnal, Indore, Ranchi...',
    mandi_search_btn: 'Search Prices',
    mandi_table_market: 'Mandi / Market',
    mandi_table_district_state: 'District & State',
    mandi_table_commodity_var: 'Commodity & Variety',
    mandi_table_govt_msp: 'Govt MSP (₹)',
    mandi_table_min: 'Min Rate (₹)',
    mandi_table_max: 'Max Rate (₹)',
    mandi_table_modal: 'Modal Rate (₹/Q)',
    mandi_table_spread: 'Spread vs MSP',
    mandi_table_arrival: 'Arrival Date',
    mandi_records_recorded: 'Mandis Recorded Today',
    mandi_loading: 'Loading latest APMC market daily rates...',
    mandi_empty_title: 'No Mandi records found for this selection',
    mandi_empty_desc: 'Try selecting a different state or searching for Wheat, Mustard, Rice or Maize.',

    agri_page_title: 'Smart Agriculture & Agronomy Hub',
    agri_page_sub: 'AI-guided crop science, APMC mandi rates, and precision weather telemetry',
    agri_cultivars_title: 'Select Cultivar for Field Guidance (14 Available)',
    agri_cultivars_sub: 'Click any crop card to load optimal growth parameters, APMC rates, and AI guidance',
    agri_advisory_title: 'AI Agronomy Advisory Engine (AI Vision)',
    agri_advisory_sub: 'Strictly grounded in current Open-Meteo weather observations and live APMC mandi rates',
    agri_generate_guidance: 'Generate Guidance',
    agri_generating: 'Generating Advisory...',
    agri_click_generate: 'Click "Generate Guidance" to compute an AI advisory grounded in live field conditions for',
    agri_mandi_section_title: 'Official APMC Mandi Daily Rates (Agmarknet / data.gov.in)',
    agri_mandi_section_sub: 'Market prices for regional mandis:',

    doctor_title: 'Kisan AI Doctor & Agronomist',
    doctor_sub: 'Upload crop photos • Ask in your language • Get step-by-step remedies',
    voice_on: 'Voice Response: ON',
    voice_off: 'Voice Response: OFF',
    listen_voice: 'Listen to Voice',
    stop_voice: 'Stop Voice',
    ask_placeholder: 'Ask crop health, disease or fertilizer questions...',
    send_btn: 'Send',

    fert_page_title: 'Fertilizer & NPK Dosage Calculator',
    fert_page_sub: 'Calculate exact Urea, DAP, and MOP bags needed per acre with stage-by-stage timings',
    fert_select_crop: 'Select Crop',
    fert_area_label: 'Land Area (in Acres)',
    fert_calculate_btn: 'Calculate Dosage',
    fert_total_req: 'Total Fertilizer Requirement (Per Acre)',
    fert_urea_bags: 'Urea (45kg Bags)',
    fert_dap_bags: 'DAP (50kg Bags)',
    fert_mop_bags: 'Potash / MOP (50kg Bags)',
    fert_zinc: 'Zinc Sulphate (33%)',
    fert_schedule_title: 'Application Stage Schedule',

    schemes_page_title: 'Govt Schemes & Subsidies for Farmers',
    schemes_page_sub: 'Explore central and state agricultural welfare schemes, insurance, and subsidized loans',
    schemes_search_placeholder: 'Search schemes or benefits...',
    schemes_apply_portal: 'Open Official Portal',
    schemes_helpline_label: 'Toll-Free Helpline',
    schemes_benefits: 'Key Benefits',
    schemes_eligibility: 'Eligibility Criteria',
    schemes_documents: 'Required Documents'
  },

  gu: {
    "live_stream": "લાઇવ સ્ટ્રીમ સક્રિય",
    "realtime_stream": "લાઇવ સ્ટ્રીમ સક્રિય",
    "realtime_status_msg": "રીયલ-ટાઇમ હવામાન, સેટેલાઇટ જોખમ વિશ્લેષણ અને રાષ્ટ્રીય કૃષિ માર્કેટ યાર્ડ (Agmarknet) ડેટા સક્રિય રીતે કનેક્ટેડ છે.",
    "select_language": "ભાષા પસંદ કરો",
    "notifications": "સૂચનાઓ",
    "no_notifications": "કોઈ નવી સૂચના નથી",
    "mark_all_read": "બધા વાંચેલા તરીકે ચિહ્નિત કરો",
    "logout": "લોગઆઉટ",
    "nav_menu_header": "નેવિગેશન મેનુ",
    "nav_dashboard": "મુખ્ય ડેશબોર્ડ",
    "nav_weather": "હવામાન આગાહી",
    "nav_climate_map": "આબોહવા જોખમ નકશો",
    "nav_alerts": "હવામાન ચેતવણીઓ",
    "nav_agriculture": "સ્માર્ટ કૃષિ",
    "nav_kisan_doctor": "એઆઈ પાક ડોક્ટર",
    "nav_mandi_rates": "રાષ્ટ્રીય યાર્ડ ભાવ (Govt MSP)",
    "nav_crop_calendar": "પાક વાવણી કેલેન્ડર",
    "nav_soil_health": "જમીન આરોગ્ય કાર્ડ",
    "nav_fertilizer": "ખાતર ગણક (NPK)",
    "nav_savings": "ખેડૂત બચત ગણક (ROI)",
    "nav_stories": "ખેડૂત સફળતા વાર્તાઓ",
    "nav_schemes": "સરકારી યોજનાઓ અને સબસિડી",
    "nav_shelters": "સુરક્ષિત આશ્રય કેન્દ્રો",
    "nav_helplines": "24x7 કટોકટી હેલ્પલાઇન",
    "section_farmer_tools": "🌾 કૃષિ વ્યવસ્થાપન અને સાધનો",
    "section_weather_tools": "🌦️ હવામાન અને આબોહવા",
    "section_safety_tools": "🛡️ આપત્તિ અને નાગરિક સુરક્ષા",
    "section_admin_tools": "⚙️ નિયંત્રણ અને સંચાલન",
    "nav_profile": "પ્રોફાઇલ અને ખેતર",
    "nav_emergencies": "કટોકટી રિપોર્ટ",
    "nav_incident_verification": "ઘટના ચકાસણી",
    "nav_relief": "રાહત પુરવઠો",
    "nav_resources": "સંસાધન ટેલિમેટ્રી",
    "nav_admin": "વહીવટી કન્સોલ",
    "current_session": "સક્રિય સત્ર",
    "dashboard_mode": "ડેશબોર્ડ મોડ",
    "role_farmer": "🌾 ખેડૂત",
    "role_emergency": "🚨 આપત્તિ અધિકારી",
    "role_resource": "💧 સંસાધન વ્યવસ્થાપક",
    "role_citizen": "👥 નાગરિક સુરક્ષા",
    "role_admin": "🛡️ એડમિન કન્સોલ",
    "role_farmer_badge": "ખેડૂત",
    "role_emergency_badge": "આપત્તિ અધિકારી",
    "role_resource_badge": "સંસાધન વ્યવસ્થાપક",
    "role_citizen_badge": "નાગરિક",
    "role_admin_badge": "વહીવટકર્તા",
    "title_farmer": "🌾 સ્માર્ટ કૃષિ અને ખેડૂત કમાન્ડ સેન્ટર",
    "title_emergency": "🚨 કટોકટી પ્રતિભાવ અને આપત્તિ વ્યવસ્થાપન કેન્દ્ર",
    "title_resource": "💧 આઇઓટી સ્માર્ટ સંસાધન અને જળ-ઊર્જા ગ્રીડ",
    "title_citizen": "🛡️ નાગરિક આબોહવા સુરક્ષા કમાન્ડ સેન્ટર",
    "subtitle_citizen": "નાગરિક સુરક્ષા સૂચકાંક, ૧-ટેપ એસઓએસ સહાય, નજીકની હોસ્પિટલ, રાહત શિબિર અને હવાની ગુણવત્તા",
    "citizen_stream_msg": "🚨 નાગરિક સુરક્ષા સક્રિય: રાષ્ટ્રીય કટોકટી ૧૧૨ • ૨૪x૭ આપત્તિ હેલ્પલાઇન ૧૦૭૮ • રાહત કેન્દ્રો સક્રિય",
    "title_admin": "🛡️ સમગ્ર સિસ્ટમ નિયંત્રણ અને વહીવટી કન્સોલ",
    "dashboard_subtitle": "રીયલ-ટાઇમ હવામાન અવલોકન, ઉપગ્રહ જોખમ વિશ્લેષણ અને લાઈવ માર્કેટ યાર્ડ દરો",
    "monitored_territory": "નિરીક્ષણ ક્ષેત્ર",
    "detect_location": "🎯 મારું સ્થાન (GPS)",
    "locating": "સ્થાન શોધી રહ્યું છે...",
    "live_gps_active": "📍 લાઇવ જીપીએસ સક્રિય",
    "observed_at": "અવલોકન સમય",
    "active_crop": "સક્રિય પાક",
    "active_crop_name": "ઘઉં (Wheat)",
    "active_crop_desc": "રવિ ઋતુ • ફૂટાવનો સમય (૨૧ દિવસ)",
    "soil_moisture_label": "જમીનની ભેજ",
    "soil_moisture_status": "૩૪.૨% • અનુકૂળ (પિયત માટે યોગ્ય)",
    "govt_msp_label": "ઘઉંનો સરકારી ટેકાનો ભાવ (MSP)",
    "mandi_spread_status": "યાર્ડ ભાવ સરકારી MSP કરતાં વધુ (+₹૧૦૦)",
    "pm_kisan_label": "પીએમ-કિસાન હપ્તો",
    "pm_kisan_status": "૧૮મો હપ્તો બેંક ખાતામાં જમા (₹૨,૦૦૦)",
    "tool_doctor_title": "એઆઈ પાક ડોક્ટર",
    "tool_doctor_desc": "પાનનો ફોટો પાડીને રોગ અને દવાની સાચી માત્રા જાણો",
    "tool_mandi_title": "રાષ્ટ્રીય માર્કેટ યાર્ડ ભાવ (Govt MSP)",
    "tool_mandi_desc": "તમામ રાજ્યોના મુખ્ય માર્કેટ યાર્ડના લાઈવ ભાવ અને સરકારી MSP",
    "tool_fertilizer_title": "ખાતર ગણક (NPK)",
    "tool_fertilizer_desc": "એકર દીઠ યુરિયા, ડીએપી અને પોટાશની થેલીઓની સચોટ ગણતરી",
    "tool_schemes_title": "સરકારી યોજનાઓ અને સબસિડી",
    "tool_schemes_desc": "પીએમ પાક વીમો, કેસીસી ૪% લોન અને સોલર પંપ સહાય",
    "eo_active_emergencies": "સક્રિય કટોકટી અહેવાલો",
    "eo_high_severity": "૨ ઉચ્ચ અગ્રતાવાળી ઘટનાઓ",
    "eo_pending_triage": "ચકાસણી કતાર",
    "eo_inspecting": "ક્ષેત્રીય અધિકારીઓ દ્વારા તપાસ ચાલુ",
    "eo_active_convoys": "રાહત પુરવઠા વાહનો",
    "eo_ration_supply": "રાશન, દવા અને પાણી પુરવઠામાં જોડાયેલ",
    "eo_safe_shelters": "સુરક્ષિત આશ્રય શિબિરો",
    "eo_capacity": "૭૨% ક્ષમતા ઉપલબ્ધ",
    "eo_command_btn": "આપત્તિ નિયંત્રણ બોર્ડ પર જાઓ →",
    "eo_command_desc": "બચાવ ટુકડી મોકલો, પૂર/આગની ઘટનાઓની ચકાસણી કરો અને રાહત સામગ્રી મોકલો.",
    "rm_water_reservoir": "જળાશય જળ સ્તર",
    "rm_normal_supply": "સામાન્ય પીવાના પાણીનો પુરવઠો ચાલુ",
    "rm_solar_power": "સોલાર માઇક્રોગ્રીડ વીજ ઉત્પાદન",
    "rm_storage_healthy": "બેટરી બેકઅપ ૮૮% ક્ષમતા પર",
    "rm_iot_nodes": "સક્રિય આઇઓટી સેન્સર નોડ્સ",
    "rm_no_faults": "૦ ગંભીર ઉપકરણ ખામી",
    "rm_warehouse_stock": "રાહત સામગ્રી વેરહાઉસ સ્ટોક",
    "rm_stock_sufficient": "આગામી ૨૧ દિવસ માટે પૂરતો",
    "rm_console_btn": "સ્માર્ટ રિસોર્સ કન્સોલ ખોલો →",
    "cz_safety_index": "વોર્ડ સુરક્ષા સ્તર",
    "cz_safe_status": "સુરક્ષિત",
    "cz_no_evac": "તમારા વિસ્તારમાં કોઈ ખાલી કરવાનો આદેશ નથી",
    "cz_nearest_hospital": "નજીકની હોસ્પિટલ / રાહત કેન્દ્ર",
    "cz_hospital_name": "જિલ્લા જનરલ હોસ્પિટલ (૧.૪ કિમી)",
    "cz_helpline": "કટોકટી સહાય હેલ્પલાઇન",
    "cz_helpline_desc": "૧૧૨ / ૧૦૭૭ (૨૪x૭ રાજ્ય આપત્તિ નિયંત્રણ)",
    "cz_weather_advisory": "સમુદાય હવામાન ચેતવણી",
    "cz_clear_skies": "હવામાન સામાન્ય અને સ્વચ્છ છે",
    "cz_sos_title": "તાત્કાલિક કટોકટી સહાય મેળવો (૧-ટેપ SOS)",
    "cz_sos_desc": "પૂર, આગ, અકસ્માત અથવા તબીબી કટોકટીની તાત્કાલિક જાણ કરો.",
    "cz_sos_btn": "🚨 ૧-ટેપ SOS કટોકટી રિપોર્ટ",
    "adm_total_users": "કુલ નોંધાયેલા વપરાશકર્તાઓ",
    "adm_users_desc": "ખેડૂતો, અધિકારીઓ અને નાગરિકો",
    "adm_server_status": "સર્વર અને સોકેટ સ્થિતિ",
    "adm_uptime": "૯૯.૯૮% અપટાઇમ • પોર્ટ ૫૦૦૦ સક્રિય",
    "adm_audit_logs": "ઓડિટ લોગ્સ નોંધાયેલ",
    "adm_mongodb_audit": "અપરિવર્તનીય મોંગોડીબી ઓડિટ ટ્રેઇલ",
    "adm_ai_quota": "એઆઈ વિઝન મલ્ટીમોડલ સ્થિતિ",
    "adm_ai_healthy": "સક્રિય અને સ્વસ્થ",
    "live_weather": "લાઇવ હવામાન અહેવાલ",
    "temperature": "તાપમાન",
    "feels_like": "અનુભવાતું તાપમાન",
    "humidity": "ભેજ",
    "wind_speed": "પવનની ગતિ",
    "precipitation": "વરસાદની સંભાવના",
    "forecast_link": "૭ દિવસનો વિગતવાર હવામાન રડાર જુઓ →",
    "drought_risk": "દુષ્કાળનું જોખમ",
    "heat_stress": "ગરમીનું દબાણ",
    "rainfall_threat": "ભારે વરસાદનું જોખમ",
    "climate_map_btn": "આબોહવા જોખમ નકશો ખોલો →",
    "normal_comfort": "સામાન્ય આરામ સ્તર",
    "normal_precip": "સૂકું અને સ્વચ્છ",
    "clear_sky": "સ્વચ્છ આકાશ",
    "low_severity": "ઓછું જોખમ",
    "mandi_rates_title": "દૈનિક માર્કેટ યાર્ડ APMC ભાવ (Live Feed)",
    "mandi_rates_sub": "સરકારી ટેકાના ભાવ સામે લાઈવ જથ્થાબંધ ભાવ",
    "refresh_rates": "ભાવ તાજા કરો",
    "view_all_mandi": "તમામ યાર્ડના ભાવ જુઓ →",
    "modal_price": "મોડલ ભાવ",
    "per_quintal": "/ક્વિન્ટલ",
    "govt_msp_prefix": "સરકારી ટેકાનો ભાવ:",
    "above_msp": "ટેકાના ભાવથી વધુ",
    "below_msp": "ટેકાના ભાવથી ઓછો",
    "mandi_page_title": "રાષ્ટ્રીય માર્કેટ યાર્ડ ભાવ અને સરકારી ટેકાના ભાવ (MSP)",
    "mandi_page_subtitle": "ભારતના તમામ રાજ્યોના APMC માર્કેટ યાર્ડના લાઈવ દૈનિક જથ્થાબંધ ભાવ",
    "mandi_govt_msp_badge": "સરકારી MSP ૨૦૨૪-૨૫",
    "mandi_guaranteed_price": "ખાતરીપૂર્વક લઘુત્તમ ટેકાનો ભાવ",
    "mandi_select_commodity": "પાક પસંદ કરો",
    "mandi_state_label": "રાજ્ય પસંદ કરો",
    "mandi_district_label": "જિલ્લો",
    "mandi_district_placeholder": "દા.ત. રાજકોટ, અમદાવાદ...",
    "mandi_search_btn": "ભાવ શોધો",
    "mandi_table_market": "યાર્ડનું નામ",
    "mandi_table_district_state": "જિલ્લો અને રાજ્ય",
    "mandi_table_commodity_var": "પાક અને જાત",
    "mandi_table_govt_msp": "સરકારી MSP",
    "mandi_table_min": "ન્યૂનતમ ભાવ (₹)",
    "mandi_table_max": "મહત્તમ ભાવ (₹)",
    "mandi_table_modal": "મોડલ ભાવ (₹/Q)",
    "mandi_table_spread": "ભાવ તફાવત",
    "mandi_table_arrival": "આવક તારીખ",
    "mandi_records_recorded": "નોંધાયેલા રેકોર્ડ્સ",
    "mandi_loading": "તાજા માર્કેટ યાર્ડ ભાવ લોડ થઈ રહ્યા છે...",
    "mandi_empty_title": "આ પસંદગી માટે કોઈ માર્કેટ યાર્ડ ભાવ મળ્યા નથી",
    "mandi_empty_desc": "કૃપા કરીને અન્ય રાજ્ય પસંદ કરો અથવા ઘઉં, રાયડો કે કપાસ શોધો.",
    "doctor_title": "એઆઈ કિસાન ડોક્ટર અને કૃષિ વિજ્ઞાની",
    "doctor_sub": "પાકના પાનનો ફોટો અપલોડ કરો • તમારી ભાષામાં પૂછો • તબક્કાવાર ઉપાય મેળવો",
    "voice_on": "અવાજ ચાલુ",
    "voice_off": "અવાજ બંધ",
    "listen_voice": "અવાજ સાંભળો",
    "stop_voice": "અવાજ બંધ કરો",
    "ask_placeholder": "પાકના રોગ, જીવાત કે ખાતર વિશે પૂછો...",
    "send_btn": "મોકલો",
    "fert_page_title": "ખાતર અને NPK માત્રા ગણક",
    "fert_page_sub": "એકર મુજબ યુરિયા, ડીએપી અને પોટાશની થેલીઓની સચોટ ગણતરી",
    "fert_select_crop": "પાક પસંદ કરો",
    "fert_area_label": "જમીનનો વિસ્તાર (એકર)",
    "fert_calculate_btn": "ખાતર માત્રા ગણો",
    "fert_total_req": "કુલ ખાતર જરૂરિયાત (એકર દીઠ)",
    "fert_urea_bags": "યુરિયા (૪૫ કિગ્રા થેલી)",
    "fert_dap_bags": "ડીએપી (૫૦ કિગ્રા થેલી)",
    "fert_mop_bags": "પોટાશ (૫૦ કિગ્રા થેલી)",
    "fert_zinc": "ઝિંક સલ્ફેટ (૩૩%)",
    "fert_schedule_title": "ખાતર આપવાનું તબક્કાવાર સમયપત્રક",
    "agri_page_title": "સ્માર્ટ કૃષિ અને એગ્રોનોમી હબ",
    "agri_page_sub": "એઆઈ-સંચાલિત પાક વિજ્ઞાન, APMC યાર્ડ ભાવ અને સચોટ હવામાન માહિતી",
    "agri_cultivars_title": "માર્ગદર્શન માટે પાક પસંદ કરો (૧૪ ઉપલબ્ધ)",
    "agri_cultivars_sub": "યોગ્ય વૃદ્ધિ પરિમાણો અને યાર્ડ ભાવ જોવા માટે કોઈપણ પાક કાર્ડ પર ક્લિક કરો",
    "agri_advisory_title": "એઆઈ કૃષિ સલાહકાર એન્જિન (એઆઈ વિઝન)",
    "agri_advisory_sub": "હાલની હવામાન પરિસ્થિતિ અને લાઈવ યાર્ડ ભાવ પર સંપૂર્ણ આધારિત",
    "agri_generate_guidance": "માર્ગદર્શન તૈયાર કરો",
    "agri_generating": "સલાહ તૈયાર થઈ રહી છે...",
    "agri_click_generate": "ખેતરની લાઈવ પરિસ્થિતિ મુજબ સલાહ મેળવવા \"માર્ગદર્શન તૈયાર કરો\" પર ક્લિક કરો",
    "agri_mandi_section_title": "સત્તાવાર APMC માર્કેટ યાર્ડ દૈનિક ભાવ (Agmarknet)",
    "agri_mandi_section_sub": "પ્રાદેશિક યાર્ડના બજાર ભાવ:",
    "schemes_page_title": "સરકારી ખેડૂત યોજનાઓ અને સબસિડી માર્ગદર્શિકા",
    "schemes_page_sub": "પીએમ-કિસાન, પાક વીમો, સોલર પંપ અને કેસીસી લોન માટે સત્તાવાર પોર્ટલ",
    "schemes_search_placeholder": "યોજનાઓ કે લાભો શોધો...",
    "schemes_apply_portal": "સત્તાવાર પોર્ટલ ખોલો",
    "schemes_helpline_label": "ટોલ-ફ્રી હેલ્પલાઇન",
    "schemes_benefits": "મુખ્ય ફાયદાઓ",
    "schemes_eligibility": "પાત્રતા માપદંડ",
    "schemes_documents": "જરૂરી દસ્તાવેજો"
},

  pa: {
    live_stream: 'ਲਾਈਵ ਸਟ੍ਰੀਮ ਸਰਗਰਮ',
    realtime_stream: 'ਲਾਈਵ ਸਟ੍ਰੀਮ ਸਰਗਰਮ',
    realtime_status_msg: 'ਰੀਅਲ-ਟਾਈਮ ਮੌਸਮ, ਉਪਗ੍ਰਹਿ ਖ਼ਤਰਾ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਕੌਮੀ ਖੇਤੀਬਾੜੀ ਮੰਡੀ (Agmarknet) ਡਾਟਾ ਸਿੱਧਾ ਜੁੜਿਆ ਹੋਇਆ ਹੈ।',
    select_language: 'ਭਾਸ਼ਾ ਚੁਣੋ',
    notifications: 'ਸੂਚਨਾਵਾਂ',
    no_notifications: 'ਕੋਈ ਨਵੀਂ ਸੂਚਨਾ ਨਹੀਂ ਹੈ',
    mark_all_read: 'ਸਭ ਪੜ੍ਹੇ ਵਜੋਂ ਚਿੰਨ੍ਹਿਤ ਕਰੋ',
    logout: 'ਲਾਗਆਉਟ',

    nav_menu_header: 'ਨੇਵੀਗੇਸ਼ਨ ਮੀਨੂ',
    nav_dashboard: 'ਮੁੱਖ ਡੈਸ਼ਬੋਰਡ',
    nav_weather: 'ਮੌਸਮ ਅੰਦਾਜ਼ਾ',
    nav_climate_map: 'ਜਲਵਾਯੂ ਖ਼ਤਰਾ ਨਕਸ਼ਾ',
    nav_alerts: 'ਮੌਸਮ ਚੇਤਾਵਨੀਆਂ',
    nav_agriculture: 'ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ',
    nav_kisan_doctor: 'ਏਆਈ ਕਿਸਾਨ ਡਾਕਟਰ',
    nav_mandi_rates: 'ਕੌਮੀ ਮੰਡੀ ਭਾਅ (Govt MSP)',
    nav_crop_calendar: 'ਫ਼ਸਲ ਬਿਜਾਈ ਕੈਲੰਡਰ',
    nav_soil_health: 'ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ',
    nav_fertilizer: 'ਖਾਦ ਗਣਕ (NPK)',
    nav_savings: 'ਕਿਸਾਨ ਬੱਚਤ ਗਣਕ (ROI)',
    nav_stories: 'ਕਿਸਾਨ ਸਫ਼ਲਤਾ ਕਹਾਣੀਆਂ',
    nav_schemes: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਤੇ ਸਬਸਿਡੀ',
    nav_shelters: 'ਸੁਰੱਖਿਅਤ ਸ਼ਰਨਾਰਥੀ ਕੇਂਦਰ',
    nav_helplines: '24x7 ਐਮਰਜੈਂਸੀ ਹੈਲਪਲਾਈਨ',
    section_farmer_tools: '🌾 ਖੇਤੀਬਾੜੀ ਪ੍ਰਬੰਧਨ ਤੇ ਸੰਦ',
    section_weather_tools: '🌦️ ਮੌਸਮ ਤੇ ਜਲਵਾਯੂ',
    section_safety_tools: '🛡️ ਆਫ਼ਤ ਤੇ ਨਾਗਰਿਕ ਸੁਰੱਖਿਆ',
    section_admin_tools: '⚙️ ਕੰਟਰੋਲ ਤੇ ਪ੍ਰਬੰਧਨ',
    nav_profile: 'ਪ੍ਰੋਫਾਈਲ ਤੇ ਖੇਤ',
    nav_emergencies: 'ਐਮਰਜੈਂਸੀ ਰਿਪੋਰਟ',
    nav_incident_verification: 'ਘਟਨਾ ਪੜਤਾਲ',
    nav_relief: 'ਰਾਹਤ ਸਪਲਾਈ',
    nav_resources: 'ਸਰੋਤ ਟੈਲੀਮੈਟਰੀ',
    nav_admin: 'ਪ੍ਰਸ਼ਾਸਕੀ ਕੰਸੋਲ',
    current_session: 'ਸਰਗਰਮ ਸੈਸ਼ਨ',

    dashboard_mode: 'ਡੈਸ਼ਬੋਰਡ ਮੋਡ',
    role_farmer: '🌾 ਕਿਸਾਨ',
    role_emergency: '🚨 ਆਫ਼ਤ ਅਧਿਕਾਰੀ',
    role_resource: '💧 ਸਰੋਤ ਪ੍ਰਬੰਧਕ',
    role_citizen: '👥 ਨਾਗਰਿਕ ਸੁਰੱਖਿਆ',
    role_admin: '🛡️ ਐਡਮਿਨ ਕੰਸੋਲ',
    role_farmer_badge: 'ਕਿਸਾਨ',
    role_emergency_badge: 'ਆਫ਼ਤ ਅਧਿਕਾਰੀ',
    role_resource_badge: 'ਸਰੋਤ ਪ੍ਰਬੰਧਕ',
    role_citizen_badge: 'ਨਾਗਰਿਕ',
    role_admin_badge: 'ਪ੍ਰਸ਼ਾਸਕ',

    title_farmer: '🌾 ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ ਤੇ ਕਿਸਾਨ ਕਮਾਂਡ ਸੈਂਟਰ',
    title_emergency: '🚨 ਐਮਰਜੈਂਸੀ ਜਵਾਬ ਤੇ ਆਫ਼ਤ ਪ੍ਰਬੰਧਨ ਕੇਂਦਰ',
    title_resource: '💧 ਆਈਓਟੀ ਸਮਾਰਟ ਸਰੋਤ ਤੇ ਜਲ-ਊਰਜਾ ਗ੍ਰਿਡ',
    title_citizen: '🛡️ ਨਾਗਰਿਕ ਜਲਵਾਯੂ ਸੁਰੱਖਿਆ ਕਮਾਂਡ ਸੈਂਟਰ',
    subtitle_citizen: 'ਨਾਗਰਿਕ ਸੁਰੱਖਿਆ ਸੂਚਕਾਂਕ, 1-ਟੈਪ ਐਸਓਐਸ ਸਹਾਇਤਾ, ਨੇੜਲਾ ਹਸਪਤਾਲ, ਰਾਹਤ ਕੈਂਪ ਤੇ ਹਵਾ ਗੁਣਵੱਤਾ',
    citizen_stream_msg: '🚨 ਨਾਗਰਿਕ ਸੁਰੱਖਿਆ ਸਰਗਰਮ: ਕੌਮੀ ਐਮਰਜੈਂਸੀ 112 • 24x7 ਆਫ਼ਤ ਹੈਲਪਲਾਈਨ 1078 • ਰਾਹਤ ਕੇਂਦਰ ਸਰਗਰਮ',
    title_admin: '🛡️ ਸਮੁੱਚਾ ਸਿਸਟਮ ਕੰਟਰੋਲ ਤੇ ਪ੍ਰਸ਼ਾਸਕੀ ਕੰਸੋਲ',
    dashboard_subtitle: 'ਰੀਅਲ-ਟਾਈਮ ਮੌਸਮ ਨਿਗਰਾਨੀ, ਉਪਗ੍ਰਹਿ ਖ਼ਤਰਾ ਵਿਸ਼ਲੇਸ਼ਣ ਤੇ ਲਾਈਵ ਮੰਡੀ ਭਾਅ',

    monitored_territory: 'ਨਿਗਰਾਨੀ ਖੇਤਰ',
    detect_location: '🎯 ਮੇਰਾ ਸਥਾਨ (GPS)',
    locating: 'ਸਥਾਨ ਖੋਜਿਆ ਜਾ ਰਿਹਾ ਹੈ...',
    live_gps_active: '📍 ਲਾਈਵ ਜੀਪੀਐਸ ਸਰਗਰਮ',
    observed_at: 'ਨਿਰੀਖਣ ਸਮਾਂ',

    active_crop: 'ਸਰਗਰਮ ਫ਼ਸਲ',
    active_crop_name: 'ਕਣਕ (Wheat)',
    active_crop_desc: 'ਹਾੜ੍ਹੀ ਸੀਜ਼ਨ • ਫੁਟਾਰੇ ਦਾ ਸਮਾਂ (21 ਦਿਨ)',
    soil_moisture_label: 'ਮਿੱਟੀ ਦੀ ਨਮੀ',
    soil_moisture_status: '34.2% • ਅਨੁਕੂਲ (ਸਿੰਚਾਈ ਲਈ ਸਹੀ)',
    govt_msp_label: 'ਕਣਕ ਦਾ ਸਰਕਾਰੀ MSP',
    mandi_spread_status: 'ਮੰਡੀ ਭਾਅ ਸਰਕਾਰੀ MSP ਤੋਂ ਉੱਤੇ (+₹100)',
    pm_kisan_label: 'ਪੀਐਮ-ਕਿਸਾਨ ਕਿਸ਼ਤ',
    pm_kisan_status: '18ਵੀਂ ਕਿਸ਼ਤ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਜਮ੍ਹਾਂ (₹2,000)',

    tool_doctor_title: 'ਏਆਈ ਕਿਸਾਨ ਡਾਕਟਰ',
    tool_doctor_desc: 'ਪੱਤੇ ਦੀ ਫ਼ੋਟੋ ਖਿੱਚ ਕੇ ਰੋਗ ਅਤੇ ਦਵਾਈ ਦੀ ਸਹੀ ਮਾਤਰਾ ਪੁੱਛੋ',
    tool_mandi_title: 'ਕੌਮੀ ਮੰਡੀ ਭਾਅ (Govt MSP)',
    tool_mandi_desc: 'ਸਾਰੇ ਰਾਜਾਂ ਦੀਆਂ ਮੁੱਖ ਮੰਡੀਆਂ ਦੇ ਲਾਈਵ ਭਾਅ ਤੇ ਸਰਕਾਰੀ ਐਮਐਸਪੀ',
    tool_fertilizer_title: 'ਖਾਦ ਤੇ ਉਰਵਰਕ ਗਣਕ',
    tool_fertilizer_desc: 'ਏਕੜ ਦੇ ਹਿਸਾਬ ਨਾਲ ਯੂਰੀਆ, ਡੀਏਪੀ ਤੇ ਪੋਟਾਸ਼ ਦੀ ਸਟੀਕ ਗਣਨਾ',
    tool_schemes_title: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਤੇ ਸਬਸਿਡੀ',
    tool_schemes_desc: 'ਪੀਐਮ ਫ਼ਸਲ ਬੀਮਾ, ਕੇਸੀਸੀ 4% ਕਰਜ਼ਾ ਅਤੇ ਸੋਲਰ ਪੰਪ ਗ੍ਰਾਂਟ',

    eo_active_emergencies: 'ਸਰਗਰਮ ਸੰਕਟ ਰਿਪੋਰਟਾਂ',
    eo_high_severity: '2 ਉੱਚ ਤਰਜੀਹ ਵਾਲੀਆਂ ਘਟਨਾਵਾਂ',
    eo_pending_triage: 'ਪੜਤਾਲ ਕਤਾਰ',
    eo_inspecting: 'ਜ਼ਮੀਨੀ ਅਧਿਕਾਰੀਆਂ ਵੱਲੋਂ ਜਾਂਚ ਜਾਰੀ',
    eo_active_convoys: 'ਰਾਹਤ ਸਪਲਾਈ ਵਾਹਨ',
    eo_ration_supply: 'ਰਾਸ਼ਨ, ਦਵਾਈ ਤੇ ਪਾਣੀ ਸਪਲਾਈ ਵਿੱਚ ਲੱਗੇ ਹੋਏ',
    eo_safe_shelters: 'ਸੁਰੱਖਿਅਤ ਰਾਹਤ ਸ਼ਰਨਾਰਥੀ ਕੈਂਪ',
    eo_capacity: '72% ਸਮਰੱਥਾ ਉਪਲਬਧ',
    eo_command_btn: 'ਆਫ਼ਤ ਕੰਟਰੋਲ ਬੋਰਡ ਖੋਲ੍ਹੋ →',
    eo_command_desc: 'ਬਚਾਅ ਦਲ ਭੇਜੋ, ਹੜ੍ਹ/ਅੱਗ ਦੀਆਂ ਘਟਨਾਵਾਂ ਦੀ ਪੜਤਾਲ ਕਰੋ ਤੇ ਰਾਹਤ ਸਮੱਗਰੀ ਭੇਜੋ।',
    rm_water_reservoir: 'ਜਲ ਭੰਡਾਰ ਪੱਧਰ',
    rm_normal_supply: 'ਆਮ ਪੀਣ ਵਾਲੇ ਪਾਣੀ ਦੀ ਸਪਲਾਈ ਚਾਲੂ',
    rm_solar_power: 'ਸੋਲਰ ਮਾਈਕ੍ਰੋਗ੍ਰਿਡ ਬਿਜਲੀ ਉਤਪਾਦਨ',
    rm_storage_healthy: 'ਬੈਟਰੀ ਬੈਕਅੱਪ 88% ਸਮਰੱਥਾ ਉੱਤੇ',
    rm_iot_nodes: 'ਸਰਗਰਮ ਆਈਓਟੀ ਸੈਂਸਰ ਨੋਡਸ',
    rm_no_faults: '0 ਗੰਭੀਰ ਉਪਕਰਣ ਖ਼ਰਾਬੀ',
    rm_warehouse_stock: 'ਰਾਹਤ ਸਮੱਗਰੀ ਗੋਦਾਮ ਸਟਾਕ',
    rm_stock_sufficient: 'ਅਗਲੇ 21 ਦਿਨਾਂ ਲਈ ਕਾਫ਼ੀ',
    rm_console_btn: 'ਸਮਾਰਟ ਸਰੋਤ ਕੰਸੋਲ ਖੋਲ੍ਹੋ →',
    cz_safety_index: 'ਵਾਰਡ ਸੁਰੱਖਿਆ ਪੱਧਰ',
    cz_safe_status: 'ਸੁਰੱਖਿਅਤ',
    cz_no_evac: 'ਤੁਹਾਡੇ ਖੇਤਰ ਵਿੱਚ ਕੋਈ ਆਫ਼ਤ ਨਿਕਾਸੀ ਹੁਕਮ ਨਹੀਂ ਹੈ',
    cz_nearest_hospital: 'ਨੇੜਲਾ ਹਸਪਤਾਲ / ਰਾਹਤ ਕੈਂਪ',
    cz_hospital_name: 'ਜ਼ਿਲ੍ਹਾ ਜਨਰਲ ਹਸਪਤਾਲ (1.4 ਕਿ.ਮੀ.)',
    cz_helpline: 'ਐਮਰਜੈਂਸੀ ਸਹਾਇਤਾ ਹੈਲਪਲਾਈਨ',
    cz_helpline_desc: '112 / 1077 (24x7 ਰਾਜ ਆਫ਼ਤ ਕੰਟਰੋਲ)',
    cz_weather_advisory: 'ਭਾਈਚਾਰਕ ਮੌਸਮ ਚੇਤਾਵਨੀ',
    cz_clear_skies: 'ਮੌਸਮ ਆਮ ਅਤੇ ਸਾਫ਼ ਹੈ',
    cz_sos_title: 'ਤੁਰੰਤ ਐਮਰਜੈਂਸੀ ਸਹਾਇਤਾ ਮੰਗੋ (1-ਟੈਪ ਐਸਓਐਸ)',
    cz_sos_desc: 'ਹੜ੍ਹ, ਅੱਗ, ਦੁਰਘਟਨਾ ਜਾਂ ਮੈਡੀਕਲ ਐਮਰਜੈਂਸੀ ਦੀ ਤੁਰੰਤ ਸੂਚਨਾ ਦਿਓ।',
    cz_sos_btn: '🚨 1-ਟੈਪ ਐਸਓਐਸ ਐਮਰਜੈਂਸੀ ਰਿਪੋਰਟ',
    adm_total_users: 'ਕੁੱਲ ਰਜਿਸਟਰਡ ਉਪਭੋਗਤਾ',
    adm_users_desc: 'ਕਿਸਾਨ, ਅਧਿਕਾਰੀ ਤੇ ਨਾਗਰਿਕ',
    adm_server_status: 'ਸਰਵਰ ਤੇ ਸਾਕਟ ਸਥਿਤੀ',
    adm_uptime: '99.98% ਅੱਪਟਾਈਮ • ਪੋਰਟ 5000 ਸਰਗਰਮ',
    adm_audit_logs: 'ਆਡਿਟ ਲਾਗ ਰਿਕਾਰਡ ਕੀਤੇ ਗਏ',
    adm_mongodb_audit: 'ਅਟੁੱਟ ਮੋਂਗੋਡੀਬੀ ਆਡਿਟ ਟ੍ਰੇਲ',
    adm_ai_quota: 'ਏਆਈ ਵਿਜ਼ਨ ਸਥਿਤੀ',
    adm_ai_healthy: 'ਸਰਗਰਮ ਤੇ ਤੰਦਰੁਸਤ',

    live_weather: 'ਲਾਈਵ ਮੌਸਮ ਰਿਪੋਰਟ',
    temperature: 'ਤਾਪਮਾਨ',
    feels_like: 'ਮਹਿਸੂਸ ਹੁੰਦਾ ਹੈ',
    humidity: 'ਨਮੀ',
    wind_speed: 'ਹਵਾ ਦੀ ਗਤੀ',
    precipitation: 'ਮੀਂਹ ਸੰਭਾਵਨਾ',
    forecast_link: '7 ਦਿਨਾਂ ਦਾ ਵਿਸਤ੍ਰਿਤ ਮੌਸਮ ਰਡਾਰ ਵੇਖੋ →',
    drought_risk: 'ਸੋਕੇ ਦਾ ਖ਼ਤਰਾ',
    heat_stress: 'ਗਰਮੀ ਤਣਾਅ',
    rainfall_threat: 'ਭਾਰੀ ਮੀਂਹ ਦਾ ਖ਼ਤਰਾ',
    climate_map_btn: 'ਜਲਵਾਯੂ ਖ਼ਤਰਾ ਨਕਸ਼ਾ ਖੋਲ੍ਹੋ →',
    normal_comfort: 'ਸੁਖਾਵਾਂ',
    normal_precip: 'ਸੁੱਕਾ ਤੇ ਸਾਫ਼',
    clear_sky: 'ਸਾਫ਼ ਅਸਮਾਨ',
    low_severity: 'ਘੱਟ ਖ਼ਤਰਾ',
    mandi_rates_title: 'ਰੋਜ਼ਾਨਾ ਏਪੀਐਮਸੀ ਮੰਡੀ ਭਾਅ (Live Feed)',
    mandi_rates_sub: 'ਸਰਕਾਰੀ MSP ਦੇ ਮੁਕਾਬਲੇ ਲਾਈਵ ਥੋਕ ਭਾਅ',
    refresh_rates: 'ਭਾਅ ਤਾਜ਼ਾ ਕਰੋ',
    view_all_mandi: 'ਸਾਰੀਆਂ ਮੰਡੀਆਂ ਵੇਖੋ →',
    modal_price: 'ਮਾਡਲ ਭਾਅ',
    per_quintal: '/ਕੁਇੰਟਲ',
    govt_msp_prefix: 'ਸਰਕਾਰੀ MSP:',
    above_msp: 'MSP ਤੋਂ ਵੱਧ',
    below_msp: 'MSP ਤੋਂ ਘੱਟ',
    mandi_page_title: 'ਕੌਮੀ ਮੰਡੀ ਭਾਅ ਤੇ ਸਰਕਾਰੀ ਐਮਐਸਪੀ',
    mandi_page_subtitle: 'ਸਾਰੇ ਭਾਰਤੀ ਰਾਜਾਂ ਦੀਆਂ ਏਪੀਐਮਸੀ ਮੰਡੀਆਂ ਦੇ ਲਾਈਵ ਥੋਕ ਭਾਅ ਤੇ ਰੋਜ਼ਾਨਾ ਅਰਾਈਵਲ',
    mandi_govt_msp_badge: 'ਸਰਕਾਰੀ ਐਮਐਸਪੀ 2024-25',
    mandi_guaranteed_price: 'ਗਰੰਟੀਸ਼ੁਦਾ ਘੱਟੋ-ਘੱਟ ਸਮਰਥਨ ਮੁੱਲ',
    mandi_select_commodity: 'ਫ਼ਸਲ ਚੁਣੋ',
    mandi_state_label: 'ਰਾਜ ਚੁਣੋ',
    mandi_district_label: 'ਜ਼ਿਲ੍ਹਾ',
    mandi_district_placeholder: 'ਉਦਾ. ਲੁਧਿਆਣਾ, ਬਠਿੰਡਾ...',
    mandi_search_btn: 'ਭਾਅ ਖੋਜੋ',
    mandi_table_market: 'ਮੰਡੀ ਦਾ ਨਾਂ',
    mandi_table_district_state: 'ਜ਼ਿਲ੍ਹਾ ਤੇ ਰਾਜ',
    mandi_table_commodity_var: 'ਫ਼ਸਲ ਤੇ ਕਿਸਮ',
    mandi_table_govt_msp: 'ਸਰਕਾਰੀ MSP',
    mandi_table_min: 'ਘੱਟੋ-ਘੱਟ',
    mandi_table_max: 'ਵੱਧ ਤੋਂ ਵੱਧ',
    mandi_table_modal: 'ਮਾਡਲ ਭਾਅ',
    mandi_table_spread: 'ਮੰਡੀ ਅੰਤਰ',
    mandi_table_arrival: 'ਅਰਾਈਵਲ (ਕੁਇੰਟਲ)',
    mandi_records_recorded: 'ਰਿਕਾਰਡ ਦਰਜ',
    mandi_loading: 'ਮੰਡੀ ਭਾਅ ਲੋਡ ਹੋ ਰਹੇ ਹਨ...',
    mandi_empty_title: 'ਇਸ ਫ਼ਿਲਟਰ ਲਈ ਕੋਈ ਮੰਡੀ ਭਾਅ ਨਹੀਂ ਮਿਲੇ',
    mandi_empty_desc: 'ਕਿਰਪਾ ਕਰਕੇ ਕੋਈ ਹੋਰ ਫ਼ਸਲ ਜਾਂ ਰਾਜ ਚੁਣੋ।',

    doctor_title: 'ਏਆਈ ਕਿਸਾਨ ਡਾਕਟਰ ਤੇ ਖੇਤੀ ਵਿਗਿਆਨੀ',
    doctor_sub: 'ਫ਼ਸਲ ਦੀ ਫ਼ੋਟੋ ਅਪਲੋਡ ਕਰੋ • ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਪੁੱਛੋ • ਕਦਮ-ਦਰ-ਕਦਮ ਇਲਾਜ ਪਾਓ',
    voice_on: 'ਆਵਾਜ਼ ਚਾਲੂ',
    voice_off: 'ਆਵਾਜ਼ ਬੰਦ',
    listen_voice: 'ਸੁਣੋ',
    stop_voice: 'ਆਵਾਜ਼ ਰੋਕੋ',
    ask_placeholder: 'ਫ਼ਸਲ ਦੀ ਸਿਹਤ, ਰੋਗ ਜਾਂ ਖਾਦ ਬਾਰੇ ਪੁੱਛੋ...',
    send_btn: 'ਭੇਜੋ',
    fert_page_title: 'ਖਾਦ ਤੇ ਉਰਵਰਕ ਸਟੀਕ ਗਣਕ (NPK)',
    fert_page_sub: 'ਖੇਤ ਦੇ ਰਕਬੇ ਅਨੁਸਾਰ ਯੂਰੀਆ, ਡੀਏਪੀ ਤੇ ਪੋਟਾਸ਼ ਦੀ ਸਟੀਕ ਮਾਤਰਾ',
    fert_select_crop: 'ਫ਼ਸਲ ਚੁਣੋ',
    fert_area_label: 'ਖੇਤ ਦਾ ਰਕਬਾ (ਏਕੜ)',
    fert_calculate_btn: 'ਸਹੀ ਖਾਦ ਮਾਤਰਾ ਗਿਣੋ',
    fert_total_req: 'ਕੁੱਲ ਖਾਦ ਜ਼ਰੂਰਤ',
    fert_urea_bags: 'ਯੂਰੀਆ (ਬੋਰੀਆਂ)',
    fert_dap_bags: 'ਡੀਏਪੀ (ਬੋਰੀਆਂ)',
    fert_mop_bags: 'ਪੋਟਾਸ਼ (ਬੋਰੀਆਂ)',
    fert_zinc: 'ਜ਼ਿੰਕ ਸਲਫੇਟ',
    fert_schedule_title: 'ਖਾਦ ਪਾਉਣ ਦਾ ਪੜਾਅਵਾਰ ਸਮਾਂ-ਸਾਰਣੀ',
    agri_page_title: 'ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ ਅਤੇ ਐਗਰੋਨੋਮੀ ਹੱਬ',
    agri_page_sub: 'ਏਆਈ-ਨਿਰਦੇਸ਼ਿਤ ਫ਼ਸਲ ਵਿਗਿਆਨ, ਏਪੀਐਮਸੀ ਮੰਡੀ ਭਾਅ ਅਤੇ ਸਟੀਕ ਮੌਸਮ ਟੈਲੀਮੈਟਰੀ',
    agri_cultivars_title: 'ਖੇਤ ਮਾਰਗਦਰਸ਼ਨ ਲਈ ਫ਼ਸਲ ਚੁਣੋ (14 ਉਪਲਬਧ)',
    agri_cultivars_sub: 'ਅਨੁਕੂਲ ਵਾਧੇ ਦੇ ਮਾਪਦੰਡ, ਮੰਡੀ ਭਾਅ ਅਤੇ ਏਆਈ ਮਾਰਗਦਰਸ਼ਨ ਵੇਖਣ ਲਈ ਕਿਸੇ ਵੀ ਫ਼ਸਲ ਕਾਰਡ ਤੇ ਕਲਿੱਕ ਕਰੋ',
    agri_advisory_title: 'ਏਆਈ ਖੇਤੀਬਾੜੀ ਸਲਾਹਕਾਰ ਇੰਜਣ (ਏਆਈ ਵਿਜ਼ਨ)',
    agri_advisory_sub: 'ਮੌਜੂਦਾ Open-Meteo ਮੌਸਮ ਨਿਰੀਖਣ ਅਤੇ ਲਾਈਵ ਮੰਡੀ ਭਾਅ ਉੱਤੇ ਪੂਰੀ ਤਰ੍ਹਾਂ ਅਧਾਰਿਤ',
    agri_generate_guidance: 'ਮਾਰਗਦਰਸ਼ਨ ਤਿਆਰ ਕਰੋ',
    agri_generating: 'ਸਲਾਹ ਤਿਆਰ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...',
    agri_click_generate: 'ਲਾਈਵ ਖੇਤ ਹਾਲਤਾਂ ਦੇ ਆਧਾਰ ਤੇ ਏਆਈ ਸਲਾਹ ਦੀ ਗਣਨਾ ਕਰਨ ਲਈ "ਮਾਰਗਦਰਸ਼ਨ ਤਿਆਰ ਕਰੋ" ਤੇ ਕਲਿੱਕ ਕਰੋ',
    agri_mandi_section_title: 'ਅਧਿਕਾਰਤ ਏਪੀਐਮਸੀ ਮੰਡੀ ਰੋਜ਼ਾਨਾ ਭਾਅ (Agmarknet / data.gov.in)',
    agri_mandi_section_sub: 'ਖੇਤਰੀ ਮੰਡੀਆਂ ਦੇ ਬਾਜ਼ਾਰ ਭਾਅ:',
    schemes_page_title: 'ਸਰਕਾਰੀ ਕਿਸਾਨ ਸਕੀਮਾਂ ਤੇ ਸਬਸਿਡੀ ਗਾਈਡ',
    schemes_page_sub: 'ਪੀਐਮ-ਕਿਸਾਨ, ਫ਼ਸਲ ਬੀਮਾ, ਸੋਲਰ ਪੰਪ ਤੇ ਕੇਸੀਸੀ ਲੋਨ ਦੇ ਸਿੱਧੇ ਸਰਕਾਰੀ ਪੋਰਟਲ',
    schemes_search_placeholder: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਜਾਂ ਲਾਭ ਖੋਜੋ...',
    schemes_apply_portal: 'ਅਧਿਕਾਰਤ ਪੋਰਟਲ ਖੋਲ੍ਹੋ',
    schemes_helpline_label: 'ਟੋਲ-ਫ੍ਰੀ ਹੈਲਪਲਾਈਨ',
    schemes_benefits: 'ਮੁੱਖ ਲਾਭ',
    schemes_eligibility: 'ਯੋਗਤਾ ਮਾਪਦੰਡ',
    schemes_documents: 'ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼'
  },

  mr: {
    "live_stream": "थेट प्रवाह सक्रिय",
    "realtime_stream": "थेट प्रवाह सक्रिय",
    "realtime_status_msg": "रिअल-टाइम हवामान अंदाज, उपग्रह जोखीम विश्लेषण आणि राष्ट्रीय कृषी बाजार (Agmarknet) डेटा थेट जोडलेला आहे.",
    "select_language": "भाषा निवडा",
    "notifications": "सूचना",
    "no_notifications": "कोणतीही नवीन सूचना नाही",
    "mark_all_read": "सर्व वाचलेले म्हणून चिन्हांकित करा",
    "logout": "लॉगआउट",
    "nav_menu_header": "नेव्हिगेशन मेनू",
    "nav_dashboard": "मुख्य डॅशबोर्ड",
    "nav_weather": "हवामान अंदाज",
    "nav_climate_map": "हवामान जोखीम नकाशा",
    "nav_alerts": "हवामान चेतावणी",
    "nav_agriculture": "स्मार्ट शेती",
    "nav_kisan_doctor": "एआय पीक डॉक्टर",
    "nav_mandi_rates": "राष्ट्रीय बाजार भाव (Govt MSP)",
    "nav_crop_calendar": "पीक पेरणी कॅलेंडर",
    "nav_soil_health": "मृदा आरोग्य पत्रिका",
    "nav_fertilizer": "खत गणक (NPK)",
    "nav_savings": "शेतकरी बचत गणक (ROI)",
    "nav_stories": "शेतकरी यशोगाथा",
    "nav_schemes": "शासकीय योजना व अनुदान",
    "nav_shelters": "सुरक्षित निवारा केंद्र",
    "nav_helplines": "24x7 आपत्कालीन हेल्पलाइन",
    "section_farmer_tools": "🌾 कृषी व्यवस्थापन आणि साधने",
    "section_weather_tools": "🌦️ हवामान व पर्जन्य",
    "section_safety_tools": "🛡️ आपत्ती व नागरी सुरक्षा",
    "section_admin_tools": "⚙️ नियंत्रण व व्यवस्थापन",
    "nav_profile": "माझे प्रोफाईल व शेत",
    "nav_emergencies": "आपत्कालीन अहवाल",
    "nav_incident_verification": "घटना पडताळणी",
    "nav_relief": "मदत व रसद",
    "nav_resources": "संसाधन टेलिमेट्री",
    "nav_admin": "प्रशासकीय कन्सोल",
    "current_session": "सक्रिय सत्र",
    "dashboard_mode": "डॅशबोर्ड मोड",
    "role_farmer": "🌾 शेतकरी",
    "role_emergency": "🚨 आपत्ती निवारण अधिकारी",
    "role_resource": "💧 संसाधन व्यवस्थापक",
    "role_citizen": "👥 नागरिक सुरक्षा",
    "role_admin": "🛡️ प्रशासक कन्सोल",
    "role_farmer_badge": "शेतकरी",
    "role_emergency_badge": "आपत्ती अधिकारी",
    "role_resource_badge": "संसाधन व्यवस्थापक",
    "role_citizen_badge": "नागरिक",
    "role_admin_badge": "प्रशासक",
    "title_farmer": "🌾 स्मार्ट कृषी आणि शेतकरी कमांड केंद्र",
    "title_emergency": "🚨 आपत्कालीन प्रतिसाद व आपत्ती व्यवस्थापन केंद्र",
    "title_resource": "💧 आयओटी स्मार्ट संसाधन व जल-ऊर्जा ग्रिड",
    "title_citizen": "🛡️ नागरिक हवामान सुरक्षा कमांड केंद्र",
    "subtitle_citizen": "नागरी सुरक्षा निर्देशांक, १-टॅप एसओएस मदत, नजीकचे रुग्णालय, मदत शिबिर आणि हवेची गुणवत्ता",
    "citizen_stream_msg": "🚨 नागरी सुरक्षा सक्रिय: राष्ट्रीय आपत्कालीन ११२ • २४x७ आपत्ती हेल्पलाइन १०७८ • मदत केंद्रे कार्यरत",
    "title_admin": "🛡️ संपूर्ण प्रणाली नियंत्रण व प्रशासकीय कन्सोल",
    "dashboard_subtitle": "रिअल-टाइम हवामान निरीक्षण, उपग्रह जोखीम विश्लेषण आणि थेट बाजार भाव",
    "monitored_territory": "निरीक्षण क्षेत्र",
    "detect_location": "🎯 माझे स्थान (GPS)",
    "locating": "स्थान शोधत आहे...",
    "live_gps_active": "📍 थेट जीपीएस सक्रिय",
    "observed_at": "निरीक्षण वेळ",
    "active_crop": "सक्रिय पीक",
    "active_crop_name": "गहू (Wheat)",
    "active_crop_desc": "रब्बी हंगाम • फुटवे फुटण्याची अवस्था (२१ दिवस)",
    "soil_moisture_label": "जमिनीतील ओलावा",
    "soil_moisture_status": "३४.२% • अनुकूल (पाणी देण्यासाठी योग्य)",
    "govt_msp_label": "गव्हाचा शासकीय हमीभाव (MSP)",
    "mandi_spread_status": "बाजार भाव हमीभावापेक्षा जास्त (+₹१००)",
    "pm_kisan_label": "पीएम-किसान हप्ता",
    "pm_kisan_status": "१८ वा हप्ता बँक खात्यात जमा (₹२,००૦)",
    "tool_doctor_title": "एआय पीक डॉक्टर",
    "tool_doctor_desc": "पानाचा फोटो काढून रोग आणि योग्य औषध प्रमाण जाणून घ्या",
    "tool_mandi_title": "राष्ट्रीय बाजार भाव (Govt MSP)",
    "tool_mandi_desc": "सर्व राज्यांतील प्रमुख बाजार समित्यांचे थेट भाव आणि हमीभाव",
    "tool_fertilizer_title": "खत व पोषण गणक",
    "tool_fertilizer_desc": "एकरानुसार युरिया, डीएपी आणि पोटॅशच्या गोण्यांचे अचूक प्रमाण",
    "tool_schemes_title": "शासकीय योजना व सबसिडी",
    "tool_schemes_desc": "पंतप्रधान पीक विमा, केसीसी ४% कर्ज आणि सौर पंप अनुदान",
    "eo_active_emergencies": "सक्रिय संकट अहवाल",
    "eo_high_severity": "२ उच्च प्राधान्य घटना",
    "eo_pending_triage": "पडताळणी रांग",
    "eo_inspecting": "क्षेत्रीय अधिकाऱ्यांकडून तपास सुरू",
    "eo_active_convoys": "मदत व रसद वाहने",
    "eo_ration_supply": "धान्य, औषधे व पाणी पुरवठ्यात कार्यरत",
    "eo_safe_shelters": "सुरक्षित निवारा शिबिरे",
    "eo_capacity": "७२% क्षमता उपलब्ध",
    "eo_command_btn": "आपत्ती नियंत्रण कक्षात जा →",
    "eo_command_desc": "बचाव पथक पाठवा, पूर/आग घटनांची पडताळणी करा आणि मदत साहित्य पाठवा.",
    "rm_water_reservoir": "जलाशय पाणी पातळी",
    "rm_normal_supply": "सामान्य पिण्याच्या पाण्याचा पुरवठा सुरू",
    "rm_solar_power": "सौर मायक्रोग्रिड वीज निर्मिती",
    "rm_storage_healthy": "बॅटरी बॅकअप ८८% क्षमतेवर",
    "rm_iot_nodes": "सक्रिय आयओटी सेन्सर नोड्स",
    "rm_no_faults": "० गंभीर उपकरण बिघाड",
    "rm_warehouse_stock": "मदत साहित्य गोदाम साठा",
    "rm_stock_sufficient": "पुढील २१ दिवसांसाठी पुरेसा",
    "rm_console_btn": "स्मार्ट संसाधन कन्सोल उघडा →",
    "cz_safety_index": "प्रभाग सुरक्षा पातळी",
    "cz_safe_status": "सुरक्षित",
    "cz_no_evac": "आपल्या परिसरात स्थलांतराचा कोणताही आदेश नाही",
    "cz_nearest_hospital": "नजीकचे रुग्णालय / मदत शिबिर",
    "cz_hospital_name": "जिल्हा सामान्य रुग्णालय (१.४ किमी)",
    "cz_helpline": "आपत्कालीन मदत हेल्पलाइन",
    "cz_helpline_desc": "११२ / १०७७ (२४x७ राज्य आपत्ती नियंत्रण)",
    "cz_weather_advisory": "सामुदायिक हवामान सूचना",
    "cz_clear_skies": "हवामान सामान्य आणि निरभ्र आहे",
    "cz_sos_title": "तातडीची मदत मागा (१-टॅप SOS)",
    "cz_sos_desc": "पूर, आग, अपघात किंवा वैद्यकीय आपत्कालीन परिस्थितीत लगेच तक्रार करा.",
    "cz_sos_btn": "🚨 १-टॅप SOS आपत्कालीन अहवाल",
    "adm_total_users": "एकूण नोंदणीकृत वापरकर्ते",
    "adm_users_desc": "शेतकरी, अधिकारी आणि नागरिक",
    "adm_server_status": "सर्व्हर व सॉकेट स्थिती",
    "adm_uptime": "९९.९८% अपटाइम • पोर्ट ५००० कार्यरत",
    "adm_audit_logs": "ऑडिट नोंदी नोंदवल्या",
    "adm_mongodb_audit": "अपरिवर्तनीय मोंगोडीबी ऑडिट ट्रेल",
    "adm_ai_quota": "एआय व्हिजन मल्टिमोडल स्थिती",
    "adm_ai_healthy": "सक्रिय आणि उत्तम",
    "live_weather": "थेट हवामान अहवाल",
    "temperature": "तापमान",
    "feels_like": "जाणवणारे तापमान",
    "humidity": "आर्द्रता",
    "wind_speed": "वाऱ्याचा वेग",
    "precipitation": "पावसाची शक्यता",
    "forecast_link": "७ दिवसांचा सविस्तर हवामान अंदाज पहा →",
    "drought_risk": "दुष्काळाचा धोका",
    "heat_stress": "उष्णतेचा ताण",
    "rainfall_threat": "मुसळधार पावसाचा धोका",
    "climate_map_btn": "हवामान जोखीम नकाशा उघडा →",
    "normal_comfort": "सामान्य सुखकारक",
    "normal_precip": "कोरडे व निरभ्र",
    "clear_sky": "निरभ्र आकाश",
    "low_severity": "कमी धोका",
    "mandi_rates_title": "दैनिक बाजार समिती (APMC) थेट भाव",
    "mandi_rates_sub": "शासकीय हमीभावाच्या तुलनेत थेट बाजार भाव",
    "refresh_rates": "दर ताजे करा",
    "view_all_mandi": "सर्व बाजार भाव पहा →",
    "modal_price": "सरासरी भाव",
    "per_quintal": "/क्विंटल",
    "govt_msp_prefix": "शासकीय हमीभाव (MSP):",
    "above_msp": "हमीभावापेक्षा जास्त",
    "below_msp": "हमीभावापेक्षा कमी",
    "mandi_page_title": "राष्ट्रीय बाजार समिती दर आणि हमीभाव (MSP)",
    "mandi_page_subtitle": "सर्व भारतीय राज्यांतील कृषी उत्पन्न बाजार समित्यांचे थेट दर आणि आवक",
    "mandi_govt_msp_badge": "शासकीय हमीभाव २०२४-२५",
    "mandi_guaranteed_price": "हमी दिलेला किमान आधारभूत भाव",
    "mandi_select_commodity": "पीक निवडा",
    "mandi_state_label": "राज्य निवडा",
    "mandi_district_label": "जिल्हा",
    "mandi_district_placeholder": "उदा. नाशिक, पुणे, नागपूर...",
    "mandi_search_btn": "दर शोधा",
    "mandi_table_market": "बाजार समितीचे नाव",
    "mandi_table_district_state": "जिल्हा आणि राज्य",
    "mandi_table_commodity_var": "पीक आणि वाण",
    "mandi_table_govt_msp": "शासकीय MSP",
    "mandi_table_min": "किमान दर (₹)",
    "mandi_table_max": "कमाल दर (₹)",
    "mandi_table_modal": "सरासरी दर (₹/Q)",
    "mandi_table_spread": "भाव फरक",
    "mandi_table_arrival": "आवक तारीख",
    "mandi_records_recorded": "नोंदी उपलब्ध",
    "mandi_loading": "थेट बाजार भाव लोड होत आहेत...",
    "mandi_empty_title": "या निवडीसाठी कोणतेही बाजार भाव आढळले नाहीत",
    "mandi_empty_desc": "कृपया दुसरे राज्य निवडा किंवा गहू, सोयाबीन, कापूस शोधा.",
    "doctor_title": "एआय शेतकरी डॉक्टर आणि कृषी तज्ज्ञ",
    "doctor_sub": "पिकाचा फोटो अपलोड करा • आपल्या भाषेत विचारा • टप्प्याटप्प्याने उपचार मिळवा",
    "voice_on": "आवाज चालू",
    "voice_off": "आवाज बंद",
    "listen_voice": "ऐका",
    "stop_voice": "आवाज थांबवा",
    "ask_placeholder": "पिकाचे आरोग्य, कीड किंवा खतांबद्दल विचारा...",
    "send_btn": "पाठवा",
    "fert_page_title": "खत आणि NPK मात्रा गणक",
    "fert_page_sub": "जमिनीच्या क्षेत्रानुसार युरिया, डीएपी आणि पोटॅशच्या गोण्यांची अचूक मात्रा",
    "fert_select_crop": "पीक निवडा",
    "fert_area_label": "जमिनीचे क्षेत्र (एकर)",
    "fert_calculate_btn": "खताचे प्रमाण मोजा",
    "fert_total_req": "एकूण खताची आवश्यकता (प्रति एकर)",
    "fert_urea_bags": "युरिया (४५ किलो गोणी)",
    "fert_dap_bags": "डीएपी (५० किलो गोणी)",
    "fert_mop_bags": "पोटॅश (५० किलो गोणी)",
    "fert_zinc": "झिंक सल्फेट (३३%)",
    "fert_schedule_title": "खते देण्याचे टप्प्याटप्प्याचे वेळापत्रक",
    "agri_page_title": "स्मार्ट कृषी आणि ॲग्रोनॉमी केंद्र",
    "agri_page_sub": "एआय-मार्गदर्शित पीक विज्ञान, थेट बाजार भाव आणि अचूक हवामान माहिती",
    "agri_cultivars_title": "मार्गदर्शनासाठी पीक निवडा (१४ उपलब्ध)",
    "agri_cultivars_sub": "योग्य वाढीचे निकष आणि बाजार भाव पाहण्यासाठी कोणत्याही पीक कार्डवर क्लिक करा",
    "agri_advisory_title": "एआय कृषी सल्लागार इंजिन (एआय व्हिजन)",
    "agri_advisory_sub": "सध्याच्या हवामान निरीक्षण आणि थेट बाजार भावावर पूर्णपणे आधारित",
    "agri_generate_guidance": "सल्ला तयार करा",
    "agri_generating": "सल्ला तयार होत आहे...",
    "agri_click_generate": "शेतातील ताज्या परिस्थितीनुसार सल्ला मिळवण्यासाठी \"सल्ला तयार करा\" वर क्लिक करा",
    "agri_mandi_section_title": "अधिकृत APMC बाजार समिती दैनिक दर (Agmarknet)",
    "agri_mandi_section_sub": "प्रादेशिक बाजार समित्यांचे थेट दर:",
    "schemes_page_title": "शासकीय शेतकरी योजना व सबसिडी मार्गदर्शक",
    "schemes_page_sub": "पीएम-किसान, पीक विमा, सौर कृषी पंप आणि केसीसी कर्जाचे अधिकृत पोर्टल",
    "schemes_search_placeholder": "योजना किंवा फायदे शोधा...",
    "schemes_apply_portal": "अधिकृत पोर्टल उघडा",
    "schemes_helpline_label": "टोल-फ्री हेल्पलाइन",
    "schemes_benefits": "मुख्य फायदे",
    "schemes_eligibility": "पात्रता निकष",
    "schemes_documents": "आवश्यक कागदपत्रे"
},

  bn: {
    "live_stream": "লাইভ স্ট্রিম সক্রিয়",
    "realtime_stream": "লাইভ স্ট্রিম সক্রিয়",
    "realtime_status_msg": "রিয়েল-টাইম আবহাওয়া, উপগ্রহ ঝুঁকি বিশ্লেষণ ও জাতীয় কৃষি মাণ্ডি (Agmarknet) ডেটা সরাসরি সংযুক্ত।",
    "select_language": "ভাষা নির্বাচন করুন",
    "notifications": "বিজ্ঞপ্তি",
    "no_notifications": "কোন নতুন বিজ্ঞপ্তি নেই",
    "mark_all_read": "সব পড়া হয়েছে চিহ্নিত করুন",
    "logout": "লগআউট",
    "nav_menu_header": "নেভিগেশন মেনু",
    "nav_dashboard": "প্রধান ড্যাশবোর্ড",
    "nav_weather": "আবহাওয়ার পূর্বাভাস",
    "nav_climate_map": "জলবায়ু ঝুঁকি মানচিত্র",
    "nav_alerts": "আবহাওয়া সতর্কতা",
    "nav_agriculture": "স্মার্ট কৃষি",
    "nav_kisan_doctor": "এআই ফসল ডাক্তার",
    "nav_mandi_rates": "জাতীয় মাণ্ডি দর (Govt MSP)",
    "nav_crop_calendar": "ফসল বপন ক্যালেন্ডার",
    "nav_soil_health": "মাটি স্বাস্থ্য কার্ড",
    "nav_fertilizer": "সার গণক (NPK)",
    "nav_savings": "কৃষক সঞ্চয় গণক (ROI)",
    "nav_stories": "কৃষক সাফল্যের গল্প",
    "nav_schemes": "সরকারি প্রকল্প ও ভর্তুকি",
    "nav_shelters": "নিরাপদ আশ্রয় কেন্দ্র",
    "nav_helplines": "২৪x৭ জরুরি হেল্পলাইন",
    "section_farmer_tools": "🌾 কৃষি ব্যবস্থাপনা ও সরঞ্জাম",
    "section_weather_tools": "🌦️ আবহাওয়া ও জলবায়ু",
    "section_safety_tools": "🛡️ দুর্যোগ ও নাগরিক সুরক্ষা",
    "section_admin_tools": "⚙️ নিয়ন্ত্রণ ও ব্যবস্থাপনা",
    "nav_profile": "প্রোফাইল ও জমি",
    "nav_emergencies": "জরুরি রিপোর্ট",
    "nav_incident_verification": "ঘটনা যাচাই",
    "nav_relief": "ত্রাণ সরবরাহ",
    "nav_resources": "সম্পদ টেলিমেট্রি",
    "nav_admin": "প্রশাসনিক কনসোল",
    "current_session": "সক্রিয় সেশন",
    "dashboard_mode": "ড্যাশবোর্ড মোড",
    "role_farmer": "🌾 কৃষক",
    "role_emergency": "🚨 দুর্যোগ কর্মকর্তা",
    "role_resource": "💧 সম্পদ ব্যবস্থাপক",
    "role_citizen": "👥 নাগরিক সুরক্ষা",
    "role_admin": "🛡️ অ্যাডমিন কনসোল",
    "role_farmer_badge": "কৃষক",
    "role_emergency_badge": "দুর্যোগ কর্মকর্তা",
    "role_resource_badge": "সম্পদ ব্যবস্থাপক",
    "role_citizen_badge": "নাগরিক",
    "role_admin_badge": "প্রশাসক",
    "title_farmer": "🌾 স্মার্ট কৃষি ও কৃষক কমান্ড সেন্টার",
    "title_emergency": "🚨 জরুরি প্রতিক্রিয়া ও দুর্যোগ ব্যবস্থাপনা কেন্দ্র",
    "title_resource": "💧 আইওটি স্মার্ট সম্পদ ও জল-শক্তি গ্রিড",
    "title_citizen": "🛡️ নাগরিক জলবায়ু সুরক্ষা কমান্ড সেন্টার",
    "subtitle_citizen": "নাগরিক সুরক্ষা সূচক, ১-ট্যাপ এসওএস সহায়তা, নিকটবর্তী হাসপাতাল, ত্রাণ শিবির ও বায়ুর মান",
    "citizen_stream_msg": "🚨 নাগরিক সুরক্ষা সক্রিয়: জাতীয় জরুরি ১১২ • ২৪x৭ দুর্যোগ হেল্পলাইন ১০৭৮ • ত্রাণ কেন্দ্র সক্রিয়",
    "title_admin": "🛡️ সামগ্রিক সিস্টেম নিয়ন্ত্রণ ও প্রশাসনিক কনসোল",
    "dashboard_subtitle": "রিয়েল-টাইম আবহাওয়া পর্যবেক্ষণ, উপগ্রহ ঝুঁকি বিশ্লেষণ ও লাইভ মাণ্ডি দর",
    "monitored_territory": "পর্যবেক্ষণ এলাকা",
    "detect_location": "🎯 আমার অবস্থান (GPS)",
    "locating": "অবস্থান শনাক্ত করা হচ্ছে...",
    "live_gps_active": "📍 লাইভ জিপিএস সক্রিয়",
    "observed_at": "পর্যবেক্ষণের সময়",
    "active_crop": "সক্রিয় ফসল",
    "active_crop_name": "গম (Wheat)",
    "active_crop_desc": "রবি মরশুম • বৃদ্ধি পর্যায় (২১ দিন)",
    "soil_moisture_label": "মাটির আর্দ্রতা",
    "soil_moisture_status": "৩৪.২% • অনুকূল (সেচের জন্য উপযুক্ত)",
    "govt_msp_label": "গমের সরকারি MSP",
    "mandi_spread_status": "মাণ্ডি দর সরকারি MSP এর উপরে (+₹১০০)",
    "pm_kisan_label": "পিএম-কিষাণ কিস্তি",
    "pm_kisan_status": "১৮তম কিস্তি ব্যাংক অ্যাকাউন্টে জমা (₹২,০০০)",
    "tool_doctor_title": "এআই ফসল ডাক্তার",
    "tool_doctor_desc": "পাতার ছবি তুলে রোগ এবং সঠিক ওষুধের মাত্রা জানুন",
    "tool_mandi_title": "জাতীয় মাণ্ডি দর (Govt MSP)",
    "tool_mandi_desc": "ভারতের সমস্ত রাজ্যের প্রধান মাণ্ডির লাইভ দর ও সরকারি এমএসপি",
    "tool_fertilizer_title": "সার ও পুষ্টি গণক",
    "tool_fertilizer_desc": "একর অনুযায়ী ইউরিয়া, ডিএপি এবং পটাশের সঠিক বস্তার হিসাব",
    "tool_schemes_title": "সরকারি প্রকল্প ও ভর্তুকি",
    "tool_schemes_desc": "পিএম ফসল বিমা, কেসিসি ৪% ঋণ এবং সোলার পাম্প অনুদান",
    "eo_active_emergencies": "সক্রিয় সংকট রিপোর্ট",
    "eo_high_severity": "২টি উচ্চ অগ্রাধিকারের ঘটনা",
    "eo_pending_triage": "যাচাইকরণ সারি",
    "eo_inspecting": "মাঠ পর্যায়ের কর্মকর্তাদের তদন্ত চলছে",
    "eo_active_convoys": "ত্রাণ সরবরাহ যান",
    "eo_ration_supply": "রেশন, ওষুধ ও জল সরবরাহে নিয়োজিত",
    "eo_safe_shelters": "নিরাপদ ত্রাণ আশ্রয় শিবির",
    "eo_capacity": "৭২% ধারণক্ষমতা উপলব্ধ",
    "eo_command_btn": "দুর্যোগ নিয়ন্ত্রণ বোর্ডে যান →",
    "eo_command_desc": "উদ্ধারকারী দল পাঠান, বন্যা/অগ্নিকাণ্ড যাচাই করুন এবং ত্রাণ সামগ্রী পাঠান।",
    "rm_water_reservoir": "জলাধার স্তর",
    "rm_normal_supply": "স্বাভাবিক পানীয় জল সরবরাহ চালু",
    "rm_solar_power": "সোলার মাইক্রোগ্রিড বিদ্যুৎ উৎপাদন",
    "rm_storage_healthy": "ব্যাটারি ব্যাকআপ ৮৮% সক্ষমতায়",
    "rm_iot_nodes": "সক্রিয় আইওটি সেন্সর নোডস",
    "rm_no_faults": "০টি গুরুতর যন্ত্রপাতি ত্রুটি",
    "rm_warehouse_stock": "ত্রাণ সামগ্রী ডিপো স্টক",
    "rm_stock_sufficient": "আগামী ২১ দিনের জন্য পর্যাপ্ত",
    "rm_console_btn": "স্মার্ট রিসোর্স কনসোল খুলুন →",
    "cz_safety_index": "ওয়ার্ড সুরক্ষা স্তর",
    "cz_safe_status": "নিরাপদ",
    "cz_no_evac": "আপনার এলাকায় কোন দুর্যোগ স্থানান্তর নির্দেশ নেই",
    "cz_nearest_hospital": "নিকটবর্তী হাসপাতাল / ত্রাণ শিবির",
    "cz_hospital_name": "জেলা সাধারণ হাসপাতাল (১.৪ কিমি)",
    "cz_helpline": "জরুরি সহায়তা হেল্পলাইন",
    "cz_helpline_desc": "১১২ / ১০৭৭ (২৪x৭ রাজ্য দুর্যোগ নিয়ন্ত্রণ)",
    "cz_weather_advisory": "কমিউনিটি আবহাওয়া সতর্কতা",
    "cz_clear_skies": "আবহাওয়া স্বাভাবিক ও পরিষ্কার",
    "cz_sos_title": "জরুরি সহায়তা চান (১-ট্যাপ এসওএস)",
    "cz_sos_desc": "বন্যা, আগুন, দুর্ঘটনা বা চিকিৎসা সংক্রান্ত সংকটে সাথে সাথে রিপোর্ট করুন।",
    "cz_sos_btn": "🚨 ১-ট্যাপ এসওএস জরুরি রিপোর্ট",
    "adm_total_users": "মোট নিবন্ধিত ব্যবহারকারী",
    "adm_users_desc": "কৃষক, কর্মকর্তা ও নাগরিক",
    "adm_server_status": "সার্ভার ও সকেট স্থিতি",
    "adm_uptime": "৯৯.৯৮% আপটাইম • পোর্ট ৫০০০ সক্রিয়",
    "adm_audit_logs": "অডিট লগ রেকর্ড করা হয়েছে",
    "adm_mongodb_audit": "পরিবর্তনহীন মঙ্গোডিবি অডিট ট্রেইল",
    "adm_ai_quota": "এআই ভিশন মাল্টিমোডাল স্থিতি",
    "adm_ai_healthy": "সক্রিয় ও স্বাভাবিক",
    "live_weather": "লাইভ আবহাওয়া রিপোর্ট",
    "temperature": "তাপমাত্রা",
    "feels_like": "অনুভূত তাপমাত্রা",
    "humidity": "আর্দ্রতা",
    "wind_speed": "বাতাসের গতি",
    "precipitation": "বৃষ্টিপাতের সম্ভাবনা",
    "forecast_link": "৭ দিনের বিস্তারিত আবহাওয়া রাডার দেখুন →",
    "drought_risk": "খরার ঝুঁকি",
    "heat_stress": "তাপপ্রবাহ চাপ",
    "rainfall_threat": "ভারী বৃষ্টির ঝুঁকি",
    "climate_map_btn": "জলবায়ু ঝুঁকি মানচিত্র খুলুন →",
    "normal_comfort": "স্বাভাবিক স্বস্তি",
    "normal_precip": "শুষ্ক ও পরিষ্কার",
    "clear_sky": "পরিষ্কার আকাশ",
    "low_severity": "কম ঝুঁকি",
    "mandi_rates_title": "দৈনিক APMC মাণ্ডি দর (Live Feed)",
    "mandi_rates_sub": "সরকারি MSP এর বিপরীতে লাইভ পাইকারি দর",
    "refresh_rates": "দর রিফ্রেশ করুন",
    "view_all_mandi": "সমস্ত মাণ্ডি দেখুন →",
    "modal_price": "গড় মূল্য",
    "per_quintal": "/কুইন্টাল",
    "govt_msp_prefix": "সরকারি MSP:",
    "above_msp": "MSP এর উপরে",
    "below_msp": "MSP এর নিচে",
    "mandi_page_title": "জাতীয় মাণ্ডি দর ও সরকারি এমএসপি",
    "mandi_page_subtitle": "সমস্ত ভারতীয় রাজ্যের APMC মাণ্ডির লাইভ পাইকারি দর ও দৈনিক আমদানি",
    "mandi_govt_msp_badge": "সরকারি MSP ২০২৪-২৫",
    "mandi_guaranteed_price": "নিশ্চিত ন্যূনতম সমর্থন মূল্য",
    "mandi_select_commodity": "ফসল নির্বাচন করুন",
    "mandi_state_label": "রাজ্য নির্বাচন করুন",
    "mandi_district_label": "জেলা",
    "mandi_district_placeholder": "যেমন: বর্ধমান, নদীয়া, মালদা...",
    "mandi_search_btn": "দর খুঁজুন",
    "mandi_table_market": "মাণ্ডির নাম",
    "mandi_table_district_state": "জেলা ও রাজ্য",
    "mandi_table_commodity_var": "ফসল ও জাত",
    "mandi_table_govt_msp": "সরকারি MSP",
    "mandi_table_min": "ন্যূনতম দর (₹)",
    "mandi_table_max": "সর্বোচ্চ দর (₹)",
    "mandi_table_modal": "মডেল মূল্য (₹/Q)",
    "mandi_table_spread": "মাণ্ডি ব্যবধান",
    "mandi_table_arrival": "আমদানি তারিখ",
    "mandi_records_recorded": "রেকর্ড অন্তর্ভুক্ত",
    "mandi_loading": "সর্বশেষ APMC বাজার দর লোড হচ্ছে...",
    "mandi_empty_title": "এই নির্বাচনের জন্য কোন মাণ্ডি দর পাওয়া যায়নি",
    "mandi_empty_desc": "অনুগ্রহ করে অন্য কোন রাজ্য নির্বাচন করুন বা গম, সরিষা, চাল খুঁজুন।",
    "agri_page_title": "স্মার্ট কৃষি ও অ্যাগ্রোনমি হাব",
    "agri_page_sub": "এআই-নির্দেশিত ফসল বিজ্ঞান, APMC মাণ্ডি দর এবং নির্ভুল আবহাওয়া টেলিমেট্রি",
    "agri_cultivars_title": "মাঠের নির্দেশনার জন্য ফসল নির্বাচন করুন (১৪টি উপলব্ধ)",
    "agri_cultivars_sub": "অনুকূল বৃদ্ধির পরামিতি, মাণ্ডি দর এবং এআই নির্দেশনা দেখতে যে কোন ফসল কার্ডে ক্লিক করুন",
    "agri_advisory_title": "এআই কৃষি পরামর্শ ইঞ্জিন (এআই ভিশন)",
    "agri_advisory_sub": "বর্তমান Open-Meteo আবহাওয়া পর্যবেক্ষণ এবং লাইভ মাণ্ডি দরের ওপর সম্পূর্ণরূপে ভিত্তি করে",
    "agri_generate_guidance": "পরামর্শ তৈরি করুন",
    "agri_generating": "পরামর্শ তৈরি হচ্ছে...",
    "agri_click_generate": "লাইভ মাঠের অবস্থার ওপর ভিত্তি করে এআই পরামর্শ পেতে \"পরামর্শ তৈরি করুন\" এ ক্লিক করুন",
    "agri_mandi_section_title": "অফিসিয়াল APMC মাণ্ডি দৈনিক দর (Agmarknet / data.gov.in)",
    "agri_mandi_section_sub": "আঞ্চলিক মাণ্ডিগুলোর বাজার দর:",
    "doctor_title": "এআই কিষাণ ডাক্তার ও কৃষি বিজ্ঞানী",
    "doctor_sub": "ফসলের ছবি আপলোড করুন • নিজের ভাষায় জিজ্ঞাসা করুন • ধাপে ধাপে সমাধান পান",
    "voice_on": "ভয়েস চালু",
    "voice_off": "ভয়েস বন্ধ",
    "listen_voice": "শুনুন",
    "stop_voice": "ভয়েস থামান",
    "ask_placeholder": "ফসলের স্বাস্থ্য, রোগ বা সার সম্পর্কে জিজ্ঞাসা করুন...",
    "send_btn": "পাঠান",
    "fert_page_title": "সার ও এনপিকে সঠিক ডোজ গণক",
    "fert_page_sub": "জমির পরিমাণ অনুযায়ী ইউরিয়া, ডিএপি ও পটাশের সঠিক বস্তার হিসাব",
    "fert_select_crop": "ফসল নির্বাচন করুন",
    "fert_area_label": "জমির পরিমাণ (একর)",
    "fert_calculate_btn": "সারের সঠিক পরিমাণ হিসাব করুন",
    "fert_total_req": "মোট প্রয়োজনীয় সার (প্রতি একর)",
    "fert_urea_bags": "ইউরিয়া (৪৫ কেজি বস্তা)",
    "fert_dap_bags": "ডিএপি (৫০ কেজি বস্তা)",
    "fert_mop_bags": "পটাশ / এমওপি (৫০ কেজি বস্তা)",
    "fert_zinc": "জিঙ্ক সালফেট (৩৩%)",
    "fert_schedule_title": "সার প্রয়োগের পর্যায়ক্রমিক সময়সূচী",
    "schemes_page_title": "সরকারি কৃষক প্রকল্প ও ভর্তুকি গাইড",
    "schemes_page_sub": "কেন্দ্রীয় ও রাজ্য স্তরের কৃষি কল্যাণ প্রকল্প, ফসল বিমা ও স্বল্প সুদে ঋণ",
    "schemes_search_placeholder": "সরকারি প্রকল্প বা সুবিধা খুঁজুন...",
    "schemes_apply_portal": "অফিসিয়াল পোর্টাল খুলুন",
    "schemes_helpline_label": "টোল-ফ্রি হেল্পলাইন",
    "schemes_benefits": "প্রধান সুবিধা",
    "schemes_eligibility": "যোগ্যতার মানদণ্ড",
    "schemes_documents": "প্রয়োজনীয় কাগজপত্র"
}
};

export const UI_STRING_MAP = {
  "New Chat": {
    "hi": "नयी बातचीत",
    "en": "New Chat",
    "pa": "ਨਵੀਂ ਗੱਲਬਾਤ",
    "gu": "નવી વાતચીત",
    "mr": "नवीन संवाद",
    "bn": "নতুন কথোপকথন"
  },
  "नयी बातचीत": {
    "hi": "नयी बातचीत",
    "en": "New Chat",
    "pa": "ਨਵੀਂ ਗੱਲਬਾਤ",
    "gu": "નવી વાતચીત",
    "mr": "नवीन संवाद",
    "bn": "নতুন কথোপকথন"
  },
  "ਨਵੀਂ ਗੱਲਬਾਤ": {
    "hi": "नयी बातचीत",
    "en": "New Chat",
    "pa": "ਨਵੀਂ ਗੱਲਬਾਤ",
    "gu": "નવી વાતચીત",
    "mr": "नवीन संवाद",
    "bn": "নতুন কথোপকথন"
  },
  "Quick Ask:": {
    "hi": "त्वरित प्रश्न:",
    "en": "Quick Ask:",
    "pa": "ਤੁਰੰਤ ਪ੍ਰਸ਼ਨ:",
    "gu": "ઝડપી પ્રશ્નો:",
    "mr": "त्वरित प्रश्न:",
    "bn": "দ্রুত প্রশ্ন:"
  },
  "त्वरित प्रश्न:": {
    "hi": "त्वरित प्रश्न:",
    "en": "Quick Ask:",
    "pa": "ਤੁਰੰਤ ਪ੍ਰਸ਼ਨ:",
    "gu": "ઝડપી પ્રશ્નો:",
    "mr": "त्वरित प्रश्न:",
    "bn": "দ্রুত প্রশ্ন:"
  },
  "ਤੁਰੰਤ ਪ੍ਰਸ਼ਨ:": {
    "hi": "त्वरित प्रश्न:",
    "en": "Quick Ask:",
    "pa": "ਤੁਰੰਤ ਪ੍ਰਸ਼ਨ:",
    "gu": "ઝડપી પ્રશ્નો:",
    "mr": "त्वरित प्रश्न:",
    "bn": "দ্রুত প্রশ্ন:"
  },
  "Hide Sidebar": {
    "hi": "साइडबार छुपाएं",
    "en": "Hide Sidebar",
    "pa": "ਸਾਈਡਬਾਰ ਛੁਪਾਓ",
    "gu": "સાઇડબાર છુપાવો",
    "mr": "साइडबार लपवा",
    "bn": "সাইডবার লুকান"
  },
  "साइडबार छुपाएं": {
    "hi": "साइडबार छुपाएं",
    "en": "Hide Sidebar",
    "pa": "ਸਾਈਡਬਾਰ ਛੁਪਾਓ",
    "gu": "સાઇડબાર છુપાવો",
    "mr": "साइडबार लपवा",
    "bn": "সাইডবার লুকান"
  },
  "ਸਾਈਡਬਾਰ ਛੁਪਾਓ": {
    "hi": "साइडबार छुपाएं",
    "en": "Hide Sidebar",
    "pa": "ਸਾਈਡਬਾਰ ਛੁਪਾਓ",
    "gu": "સાઇડબાર છુપાવો",
    "mr": "साइडबार लपवा",
    "bn": "সাইডবার লুকান"
  },
  "Show Sidebar": {
    "hi": "साइडबार दिखाएं",
    "en": "Show Sidebar",
    "pa": "ਸਾਈਡਬਾਰ ਵਿਖਾਓ",
    "gu": "સાઇડબાર બતાવો",
    "mr": "साइडबार दाखवा",
    "bn": "সাইডবার দেখান"
  },
  "साइडबार दिखाएं": {
    "hi": "साइडबार दिखाएं",
    "en": "Show Sidebar",
    "pa": "ਸਾਈਡਬਾਰ ਵਿਖਾਓ",
    "gu": "સાઇડબાર બતાવો",
    "mr": "साइडबार दाखवा",
    "bn": "সাইডবার দেখান"
  },
  "ਸਾਈਡਬਾਰ ਵਿਖਾਓ": {
    "hi": "साइडबार दिखाएं",
    "en": "Show Sidebar",
    "pa": "ਸਾਈਡਬਾਰ ਵਿਖਾਓ",
    "gu": "સાઇડબાર બતાવો",
    "mr": "साइडबार दाखवा",
    "bn": "সাইডবার দেখান"
  },
  "Predict • Protect • Save": {
    "hi": "पूर्वानुमान • सुरक्षा • राहत",
    "en": "Predict • Protect • Save",
    "pa": "ਅਨੁਮਾਨ • ਸੁਰੱਖਿਆ • ਬੱਚਤ",
    "gu": "અનુમાન • સુરક્ષા • બચત",
    "mr": "अंदाज • संरक्षण • बचत",
    "bn": "পূর্বাভাস • সুরক্ষা • সাশ্রয়"
  },
  "पूर्वानुमान • सुरक्षा • राहत": {
    "hi": "पूर्वानुमान • सुरक्षा • राहत",
    "en": "Predict • Protect • Save",
    "pa": "ਅਨੁਮਾਨ • ਸੁਰੱਖਿਆ • ਬੱਚਤ",
    "gu": "અનુમાન • સુરક્ષા • બચત",
    "mr": "अंदाज • संरक्षण • बचत",
    "bn": "পূর্বাভাস • সুরক্ষা • সাশ্রয়"
  },
  "ਅਨੁਮਾਨ • ਸੁਰੱਖਿਆ • ਬੱਚਤ": {
    "hi": "पूर्वानुमान • सुरक्षा • राहत",
    "en": "Predict • Protect • Save",
    "pa": "ਅਨੁਮਾਨ • ਸੁਰੱਖਿਆ • ਬੱਚਤ",
    "gu": "અનુમાન • સુરક્ષા • બચત",
    "mr": "अंदाज • संरक्षण • बचत",
    "bn": "পূর্বাভাস • সুরক্ষা • সাশ্রয়"
  },
  "Kisan Agro Command • Farmer": {
    "hi": "Kisan Agro Command • स्मार्ट कृषि",
    "en": "Kisan Agro Command • Farmer",
    "pa": "Kisan Agro Command • ਸਮਾਰਟ ਖੇਤੀ",
    "gu": "Kisan Agro Command • સ્માર્ટ કૃષિ",
    "mr": "Kisan Agro Command • स्मार्ट शेती",
    "bn": "Kisan Agro Command • স্মার্ট কৃষি"
  },
  "Kisan Agro Command • स्मार्ट कृषि": {
    "hi": "Kisan Agro Command • स्मार्ट कृषि",
    "en": "Kisan Agro Command • Farmer",
    "pa": "Kisan Agro Command • ਸਮਾਰਟ ਖੇਤੀ",
    "gu": "Kisan Agro Command • સ્માર્ટ કૃષિ",
    "mr": "Kisan Agro Command • स्मार्ट शेती",
    "bn": "Kisan Agro Command • স্মার্ট কৃষি"
  },
  "Kisan Agro Command • ਸਮਾਰਟ ਖੇਤੀ": {
    "hi": "Kisan Agro Command • स्मार्ट कृषि",
    "en": "Kisan Agro Command • Farmer",
    "pa": "Kisan Agro Command • ਸਮਾਰਟ ਖੇਤੀ",
    "gu": "Kisan Agro Command • સ્માર્ટ કૃષિ",
    "mr": "Kisan Agro Command • स्मार्ट शेती",
    "bn": "Kisan Agro Command • স্মার্ট কৃষি"
  },
  "1551 Kisan Call Center": {
    "hi": "1551 किसान कॉल सेन्टर",
    "en": "1551 Kisan Call Center",
    "pa": "1551 ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ",
    "gu": "1551 કિસાન કોલ સેન્ટર",
    "mr": "१५५१ किसान कॉल सेंटर",
    "bn": "১৫৫১ কৃষক কল সেন্টার"
  },
  "1551 किसान कॉल सेन्टर": {
    "hi": "1551 किसान कॉल सेन्टर",
    "en": "1551 Kisan Call Center",
    "pa": "1551 ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ",
    "gu": "1551 કિસાન કોલ સેન્ટર",
    "mr": "१५५१ किसान कॉल सेंटर",
    "bn": "১৫৫১ কৃষক কল সেন্টার"
  },
  "1551 ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ": {
    "hi": "1551 किसान कॉल सेन्टर",
    "en": "1551 Kisan Call Center",
    "pa": "1551 ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ",
    "gu": "1551 કિસાન કોલ સેન્ટર",
    "mr": "१५५१ किसान कॉल सेंटर",
    "bn": "১৫৫১ কৃষক কল সেন্টার"
  },
  "🌾 Kisan Agro Services": {
    "hi": "🌾 कृषि व किसान सेवाएं",
    "en": "🌾 Kisan Agro Services",
    "pa": "🌾 ਖੇਤੀਬਾੜੀ ਤੇ ਕਿਸਾਨ ਸੇਵਾਵਾਂ",
    "gu": "🌾 કૃષિ અને ખેડૂત સેવાઓ",
    "mr": "🌾 शेती व शेतकरी सेवा",
    "bn": "🌾 কৃষি ও কৃষক সেবা"
  },
  "🌾 कृषि व किसान सेवाएं": {
    "hi": "🌾 कृषि व किसान सेवाएं",
    "en": "🌾 Kisan Agro Services",
    "pa": "🌾 ਖੇਤੀਬਾੜੀ ਤੇ ਕਿਸਾਨ ਸੇਵਾਵਾਂ",
    "gu": "🌾 કૃષિ અને ખેડૂત સેવાઓ",
    "mr": "🌾 शेती व शेतकरी सेवा",
    "bn": "🌾 কৃষি ও কৃষক সেবা"
  },
  "🌾 ਖੇਤੀਬਾੜੀ ਤੇ ਕਿਸਾਨ ਸੇਵਾਵਾਂ": {
    "hi": "🌾 कृषि व किसान सेवाएं",
    "en": "🌾 Kisan Agro Services",
    "pa": "🌾 ਖੇਤੀਬਾੜੀ ਤੇ ਕਿਸਾਨ ਸੇਵਾਵਾਂ",
    "gu": "🌾 કૃષિ અને ખેડૂત સેવાઓ",
    "mr": "🌾 शेती व शेतकरी सेवा",
    "bn": "🌾 কৃষি ও কৃষক সেবা"
  },
  "Main Dashboard": {
    "hi": "मुख्य डैशबोर्ड",
    "en": "Main Dashboard",
    "pa": "ਮੁੱਖ ਡੈਸ਼ਬੋਰਡ",
    "gu": "મુખ્ય ડેશબોર્ડ",
    "mr": "मुख्य डॅशबोर्ड",
    "bn": "প্রধান ড্যাশবোর্ড"
  },
  "मुख्य डैशबोर्ड": {
    "hi": "मुख्य डैशबोर्ड",
    "en": "Main Dashboard",
    "pa": "ਮੁੱਖ ਡੈਸ਼ਬੋਰਡ",
    "gu": "મુખ્ય ડેશબોર્ડ",
    "mr": "मुख्य डॅशबोर्ड",
    "bn": "প্রধান ড্যাশবোর্ড"
  },
  "ਮੁੱਖ ਡੈਸ਼ਬੋਰਡ": {
    "hi": "मुख्य डैशबोर्ड",
    "en": "Main Dashboard",
    "pa": "ਮੁੱਖ ਡੈਸ਼ਬੋਰਡ",
    "gu": "મુખ્ય ડેશબોર્ડ",
    "mr": "मुख्य डॅशबोर्ड",
    "bn": "প্রধান ড্যাশবোর্ড"
  },
  "Home": {
    "hi": "होम",
    "en": "Home",
    "pa": "ਹੋਮ",
    "gu": "હોમ",
    "mr": "होम",
    "bn": "হোম"
  },
  "होम": {
    "hi": "होम",
    "en": "Home",
    "pa": "ਹੋਮ",
    "gu": "હોમ",
    "mr": "होम",
    "bn": "হোম"
  },
  "ਹੋਮ": {
    "hi": "होम",
    "en": "Home",
    "pa": "ਹੋਮ",
    "gu": "હોમ",
    "mr": "होम",
    "bn": "হোম"
  },
  "Kisan Command Center": {
    "hi": "किसान कमांड सेंटर",
    "en": "Kisan Command Center",
    "pa": "ਕਿਸਾਨ ਕਮਾਂਡ ਸੈਂਟਰ",
    "gu": "કિસાન કમાન્ડ સેન્ટર",
    "mr": "शेतकरी कमांड सेंटर",
    "bn": "কৃষক কমান্ড সেন্টার"
  },
  "किसान कमांड सेंटर": {
    "hi": "किसान कमांड सेंटर",
    "en": "Kisan Command Center",
    "pa": "ਕਿਸਾਨ ਕਮਾਂਡ ਸੈਂਟਰ",
    "gu": "કિસાન કમાન્ડ સેન્ટર",
    "mr": "शेतकरी कमांड सेंटर",
    "bn": "কৃষক কমান্ড সেন্টার"
  },
  "ਕਿਸਾਨ ਕਮਾਂਡ ਸੈਂਟਰ": {
    "hi": "किसान कमांड सेंटर",
    "en": "Kisan Command Center",
    "pa": "ਕਿਸਾਨ ਕਮਾਂਡ ਸੈਂਟਰ",
    "gu": "કિસાન કમાન્ડ સેન્ટર",
    "mr": "शेतकरी कमांड सेंटर",
    "bn": "কৃষক কমান্ড সেন্টার"
  },
  "AI Kisan Doctor": {
    "hi": "एआई किसान डॉक्टर",
    "en": "AI Kisan Doctor",
    "pa": "ਏਆਈ ਕਿਸਾਨ ਡਾਕਟਰ",
    "gu": "એઆઈ પાક ડોક્ટર",
    "mr": "एआय पीक डॉक्टर",
    "bn": "এআই ফসল ডাক্তার"
  },
  "एआई किसान डॉक्टर": {
    "hi": "एआई किसान डॉक्टर",
    "en": "AI Kisan Doctor",
    "pa": "ਏਆਈ ਕਿਸਾਨ ਡਾਕਟਰ",
    "gu": "એઆઈ પાક ડોક્ટર",
    "mr": "एआय पीक डॉक्टर",
    "bn": "এআই ফসল ডাক্তার"
  },
  "ਏਆਈ ਕਿਸਾਨ ਡਾਕਟਰ": {
    "hi": "एआई किसान डॉक्टर",
    "en": "AI Kisan Doctor",
    "pa": "ਏਆਈ ਕਿਸਾਨ ਡਾਕਟਰ",
    "gu": "એઆઈ પાક ડોક્ટર",
    "mr": "एआय पीक डॉक्टर",
    "bn": "এআই ফসল ডাক্তার"
  },
  "National Mandi Rates": {
    "hi": "राष्ट्रीय मंडी भाव (Govt MSP)",
    "en": "National Mandi Rates",
    "pa": "ਕੌਮੀ ਮੰਡੀ ਭਾਅ (MSP)",
    "gu": "રાષ્ટ્રીય માર્કેટ યાર્ડ ભાવ",
    "mr": "राष्ट्रीय कृषी बाजार भाव",
    "bn": "জাতীয় মাণ্ডি দর (Govt MSP)"
  },
  "राष्ट्रीय मंडी भाव (Govt MSP)": {
    "hi": "राष्ट्रीय मंडी भाव (Govt MSP)",
    "en": "National Mandi Rates",
    "pa": "ਕੌਮੀ ਮੰਡੀ ਭਾਅ (MSP)",
    "gu": "રાષ્ટ્રીય માર્કેટ યાર્ડ ભાવ",
    "mr": "राष्ट्रीय कृषी बाजार भाव",
    "bn": "জাতীয় মাণ্ডি দর (Govt MSP)"
  },
  "ਕੌਮੀ ਮੰਡੀ ਭਾਅ (MSP)": {
    "hi": "राष्ट्रीय मंडी भाव (Govt MSP)",
    "en": "National Mandi Rates",
    "pa": "ਕੌਮੀ ਮੰਡੀ ਭਾਅ (MSP)",
    "gu": "રાષ્ટ્રીય માર્કેટ યાર્ડ ભાવ",
    "mr": "राष्ट्रीय कृषी बाजार भाव",
    "bn": "জাতীয় মাণ্ডি দর (Govt MSP)"
  },
  "MSP": {
    "hi": "एमएसपी",
    "en": "MSP",
    "pa": "ਐਮਐਸਪੀ",
    "gu": "ટેકાના ભાવ (MSP)",
    "mr": "हमीभाव (MSP)",
    "bn": "এমএসপি"
  },
  "एमएसपी": {
    "hi": "एमएसपी",
    "en": "MSP",
    "pa": "ਐਮਐਸਪੀ",
    "gu": "ટેકાના ભાવ (MSP)",
    "mr": "हमीभाव (MSP)",
    "bn": "এমএসপি"
  },
  "ਐਮਐਸਪੀ": {
    "hi": "एमएसपी",
    "en": "MSP",
    "pa": "ਐਮਐਸਪੀ",
    "gu": "ટેકાના ભાવ (MSP)",
    "mr": "हमीभाव (MSP)",
    "bn": "এমএসপি"
  },
  "Crop Sowing Calendar": {
    "hi": "फसल बुवाई कैलेंडर",
    "en": "Crop Sowing Calendar",
    "pa": "ਫ਼ਸਲ ਬਿਜਾਈ ਕੈਲੰਡਰ",
    "gu": "પાક વાવણી કેલેન્ડર",
    "mr": "पीक पेरणी कॅलेंडर",
    "bn": "ফসল বপন ক্যালেন্ডার"
  },
  "फसल बुवाई कैलेंडर": {
    "hi": "फसल बुवाई कैलेंडर",
    "en": "Crop Sowing Calendar",
    "pa": "ਫ਼ਸਲ ਬਿਜਾਈ ਕੈਲੰਡਰ",
    "gu": "પાક વાવણી કેલેન્ડર",
    "mr": "पीक पेरणी कॅलेंडर",
    "bn": "ফসল বপন ক্যালেন্ডার"
  },
  "ਫ਼ਸਲ ਬਿਜਾਈ ਕੈਲੰਡਰ": {
    "hi": "फसल बुवाई कैलेंडर",
    "en": "Crop Sowing Calendar",
    "pa": "ਫ਼ਸਲ ਬਿਜਾਈ ਕੈਲੰਡਰ",
    "gu": "પાક વાવણી કેલેન્ડર",
    "mr": "पीक पेरणी कॅलेंडर",
    "bn": "ফসল বপন ক্যালেন্ডার"
  },
  "Soil Health Card & Lab": {
    "hi": "मृदा स्वास्थ्य कार्ड (Soil Lab)",
    "en": "Soil Health Card & Lab",
    "pa": "ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ ਤੇ ਲੈਬ",
    "gu": "જમીન આરોગ્ય કાર્ડ અને લેબ",
    "mr": "मृदा आरोग्य पत्रिका व लॅब",
    "bn": "মাটি স্বাস্থ্য কার্ড ও ল্যাব"
  },
  "मृदा स्वास्थ्य कार्ड (Soil Lab)": {
    "hi": "मृदा स्वास्थ्य कार्ड (Soil Lab)",
    "en": "Soil Health Card & Lab",
    "pa": "ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ ਤੇ ਲੈਬ",
    "gu": "જમીન આરોગ્ય કાર્ડ અને લેબ",
    "mr": "मृदा आरोग्य पत्रिका व लॅब",
    "bn": "মাটি স্বাস্থ্য কার্ড ও ল্যাব"
  },
  "ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ ਤੇ ਲੈਬ": {
    "hi": "मृदा स्वास्थ्य कार्ड (Soil Lab)",
    "en": "Soil Health Card & Lab",
    "pa": "ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ ਤੇ ਲੈਬ",
    "gu": "જમીન આરોગ્ય કાર્ડ અને લેબ",
    "mr": "मृदा आरोग्य पत्रिका व लॅब",
    "bn": "মাটি স্বাস্থ্য কার্ড ও ল্যাব"
  },
  "Fertilizer & NPK Calc": {
    "hi": "खाद व उर्वरक गणक (NPK)",
    "en": "Fertilizer & NPK Calc",
    "pa": "ਖਾਦ ਗਣਕ (NPK)",
    "gu": "ખાતર ગણક (NPK)",
    "mr": "खत गणक (NPK)",
    "bn": "সার ও এনপিকে গণক"
  },
  "खाद व उर्वरक गणक (NPK)": {
    "hi": "खाद व उर्वरक गणक (NPK)",
    "en": "Fertilizer & NPK Calc",
    "pa": "ਖਾਦ ਗਣਕ (NPK)",
    "gu": "ખાતર ગણક (NPK)",
    "mr": "खत गणक (NPK)",
    "bn": "সার ও এনপিকে গণক"
  },
  "ਖਾਦ ਗਣਕ (NPK)": {
    "hi": "खाद व उर्वरक गणक (NPK)",
    "en": "Fertilizer & NPK Calc",
    "pa": "ਖਾਦ ਗਣਕ (NPK)",
    "gu": "ખાતર ગણક (NPK)",
    "mr": "खत गणक (NPK)",
    "bn": "সার ও এনপিকে গণক"
  },
  "Farm Savings Calc (ROI)": {
    "hi": "किसान बचत गणक (ROI)",
    "en": "Farm Savings Calc (ROI)",
    "pa": "ਕਿਸਾਨ ਬੱਚਤ ਗਣਕ (ROI)",
    "gu": "ખેડૂત બચત ગણક (ROI)",
    "mr": "शेतकरी बचत गणक (ROI)",
    "bn": "কৃষক সঞ্চয় গণক (ROI)"
  },
  "किसान बचत गणक (ROI)": {
    "hi": "किसान बचत गणक (ROI)",
    "en": "Farm Savings Calc (ROI)",
    "pa": "ਕਿਸਾਨ ਬੱਚਤ ਗਣਕ (ROI)",
    "gu": "ખેડૂત બચત ગણક (ROI)",
    "mr": "शेतकरी बचत गणक (ROI)",
    "bn": "কৃষক সঞ্চয় গণক (ROI)"
  },
  "ਕਿਸਾਨ ਬੱਚਤ ਗਣਕ (ROI)": {
    "hi": "किसान बचत गणक (ROI)",
    "en": "Farm Savings Calc (ROI)",
    "pa": "ਕਿਸਾਨ ਬੱਚਤ ਗਣਕ (ROI)",
    "gu": "ખેડૂત બચત ગણક (ROI)",
    "mr": "शेतकरी बचत गणक (ROI)",
    "bn": "কৃষক সঞ্চয় গণক (ROI)"
  },
  "ROI": {
    "hi": "₹ बचत",
    "en": "ROI",
    "pa": "₹ ਬੱਚਤ",
    "gu": "₹ બચત",
    "mr": "₹ बचत",
    "bn": "₹ সঞ্চয়"
  },
  "₹ बचत": {
    "hi": "₹ बचत",
    "en": "ROI",
    "pa": "₹ ਬੱਚਤ",
    "gu": "₹ બચત",
    "mr": "₹ बचत",
    "bn": "₹ সঞ্চয়"
  },
  "₹ ਬੱਚਤ": {
    "hi": "₹ बचत",
    "en": "ROI",
    "pa": "₹ ਬੱਚਤ",
    "gu": "₹ બચત",
    "mr": "₹ बचत",
    "bn": "₹ সঞ্চয়"
  },
  "Farmer Success Stories": {
    "hi": "किसान सफलता कहानियां",
    "en": "Farmer Success Stories",
    "pa": "ਕਿਸਾਨ ਸਫ਼ਲਤਾ ਕਹਾਣੀਆਂ",
    "gu": "ખેડૂત સફળતા વાર્તાઓ",
    "mr": "शेतकरी यशोगाथा",
    "bn": "কৃষক সাফল্যের গল্প"
  },
  "किसान सफलता कहानियां": {
    "hi": "किसान सफलता कहानियां",
    "en": "Farmer Success Stories",
    "pa": "ਕਿਸਾਨ ਸਫ਼ਲਤਾ ਕਹਾਣੀਆਂ",
    "gu": "ખેડૂત સફળતા વાર્તાઓ",
    "mr": "शेतकरी यशोगाथा",
    "bn": "কৃষক সাফল্যের গল্প"
  },
  "ਕਿਸਾਨ ਸਫ਼ਲਤਾ ਕਹਾਣੀਆਂ": {
    "hi": "किसान सफलता कहानियां",
    "en": "Farmer Success Stories",
    "pa": "ਕਿਸਾਨ ਸਫ਼ਲਤਾ ਕਹਾਣੀਆਂ",
    "gu": "ખેડૂત સફળતા વાર્તાઓ",
    "mr": "शेतकरी यशोगाथा",
    "bn": "কৃষক সাফল্যের গল্প"
  },
  "Proof": {
    "hi": "प्रमाण",
    "en": "Proof",
    "pa": "ਸਬੂਤ",
    "gu": "પ્રમાણ",
    "mr": "पुरावा",
    "bn": "প্রমাণ"
  },
  "प्रमाण": {
    "hi": "प्रमाण",
    "en": "Proof",
    "pa": "ਸਬੂਤ",
    "gu": "પ્રમાણ",
    "mr": "पुरावा",
    "bn": "প্রমাণ"
  },
  "ਸਬੂਤ": {
    "hi": "प्रमाण",
    "en": "Proof",
    "pa": "ਸਬੂਤ",
    "gu": "પ્રમાણ",
    "mr": "पुरावा",
    "bn": "প্রমাণ"
  },
  "Govt Kisan Schemes": {
    "hi": "सरकारी योजनाएं व सब्सिडी",
    "en": "Govt Kisan Schemes",
    "pa": "ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਤੇ ਸਬਸਿਡੀ",
    "gu": "સરકારી યોજનાઓ અને સબસિડી",
    "mr": "शासकीय योजना व सबसिडी",
    "bn": "সরকারি প্রকল্প ও ভর্তুকি"
  },
  "सरकारी योजनाएं व सब्सिडी": {
    "hi": "सरकारी योजनाएं व सब्सिडी",
    "en": "Govt Kisan Schemes",
    "pa": "ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਤੇ ਸਬਸਿਡੀ",
    "gu": "સરકારી યોજનાઓ અને સબસિડી",
    "mr": "शासकीय योजना व सबसिडी",
    "bn": "সরকারি প্রকল্প ও ভর্তুকি"
  },
  "ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਤੇ ਸਬਸਿਡੀ": {
    "hi": "सरकारी योजनाएं व सब्सिडी",
    "en": "Govt Kisan Schemes",
    "pa": "ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਤੇ ਸਬਸਿਡੀ",
    "gu": "સરકારી યોજનાઓ અને સબસિડી",
    "mr": "शासकीय योजना व सबसिडी",
    "bn": "সরকারি প্রকল্প ও ভর্তুকি"
  },
  "Govt": {
    "hi": "योजना",
    "en": "Govt",
    "pa": "ਸਕੀਮ",
    "gu": "યોજના",
    "mr": "योजना",
    "bn": "প্রকল্প"
  },
  "योजना": {
    "hi": "योजना",
    "en": "Govt",
    "pa": "ਸਕੀਮ",
    "gu": "યોજના",
    "mr": "योजना",
    "bn": "প্রকল্প"
  },
  "ਸਕੀਮ": {
    "hi": "योजना",
    "en": "Govt",
    "pa": "ਸਕੀਮ",
    "gu": "યોજના",
    "mr": "योजना",
    "bn": "প্রকল্প"
  },
  "🌦️ Weather & Crop Risk": {
    "hi": "🌦️ कृषि मौसम व जोखिम",
    "en": "🌦️ Weather & Crop Risk",
    "pa": "🌦️ ਮੌਸਮ ਤੇ ਫ਼ਸਲ ਖ਼ਤਰਾ",
    "gu": "🌦️ હવામાન અને પાક જોખમ",
    "mr": "🌦️ हवामान व पीक जोखीम",
    "bn": "🌦️ আবহাওয়া ও ফসল ঝুঁকি"
  },
  "🌦️ कृषि मौसम व जोखिम": {
    "hi": "🌦️ कृषि मौसम व जोखिम",
    "en": "🌦️ Weather & Crop Risk",
    "pa": "🌦️ ਮੌਸਮ ਤੇ ਫ਼ਸਲ ਖ਼ਤਰਾ",
    "gu": "🌦️ હવામાન અને પાક જોખમ",
    "mr": "🌦️ हवामान व पीक जोखीम",
    "bn": "🌦️ আবহাওয়া ও ফসল ঝুঁকি"
  },
  "🌦️ ਮੌਸਮ ਤੇ ਫ਼ਸਲ ਖ਼ਤਰਾ": {
    "hi": "🌦️ कृषि मौसम व जोखिम",
    "en": "🌦️ Weather & Crop Risk",
    "pa": "🌦️ ਮੌਸਮ ਤੇ ਫ਼ਸਲ ਖ਼ਤਰਾ",
    "gu": "🌦️ હવામાન અને પાક જોખમ",
    "mr": "🌦️ हवामान व पीक जोखीम",
    "bn": "🌦️ আবহাওয়া ও ফসল ঝুঁকি"
  },
  "Weather & Rain Radar": {
    "hi": "मौसम पूर्वानुमान व वर्षा",
    "en": "Weather & Rain Radar",
    "pa": "ਮੌਸਮ ਅੰਦਾਜ਼ਾ ਤੇ ਮੀਂਹ ਰਡਾਰ",
    "gu": "હવામાન અને વરસાદ રડાર",
    "mr": "हवामान व पाऊस रडार",
    "bn": "আবহাওয়া ও বৃষ্টি রাডার"
  },
  "मौसम पूर्वानुमान व वर्षा": {
    "hi": "मौसम पूर्वानुमान व वर्षा",
    "en": "Weather & Rain Radar",
    "pa": "ਮੌਸਮ ਅੰਦਾਜ਼ਾ ਤੇ ਮੀਂਹ ਰਡਾਰ",
    "gu": "હવામાન અને વરસાદ રડાર",
    "mr": "हवामान व पाऊस रडार",
    "bn": "আবহাওয়া ও বৃষ্টি রাডার"
  },
  "ਮੌਸਮ ਅੰਦਾਜ਼ਾ ਤੇ ਮੀਂਹ ਰਡਾਰ": {
    "hi": "मौसम पूर्वानुमान व वर्षा",
    "en": "Weather & Rain Radar",
    "pa": "ਮੌਸਮ ਅੰਦਾਜ਼ਾ ਤੇ ਮੀਂਹ ਰਡਾਰ",
    "gu": "હવામાન અને વરસાદ રડાર",
    "mr": "हवामान व पाऊस रडार",
    "bn": "আবহাওয়া ও বৃষ্টি রাডার"
  },
  "Drought & Flood Risk Map": {
    "hi": "सूखा व बाढ़ जोखिम मैप",
    "en": "Drought & Flood Risk Map",
    "pa": "ਸੋਕਾ ਤੇ ਹੜ੍ਹ ਖ਼ਤਰਾ ਨਕਸ਼ਾ",
    "gu": "દુષ્કાળ અને પૂર જોખમ નકશો",
    "mr": "दुष्काळ व पूर जोखीम नकाशा",
    "bn": "খরা ও বন্যা ঝুঁকি মানচিত্র"
  },
  "सूखा व बाढ़ जोखिम मैप": {
    "hi": "सूखा व बाढ़ जोखिम मैप",
    "en": "Drought & Flood Risk Map",
    "pa": "ਸੋਕਾ ਤੇ ਹੜ੍ਹ ਖ਼ਤਰਾ ਨਕਸ਼ਾ",
    "gu": "દુષ્કાળ અને પૂર જોખમ નકશો",
    "mr": "दुष्काळ व पूर जोखीम नकाशा",
    "bn": "খরা ও বন্যা ঝুঁকি মানচিত্র"
  },
  "ਸੋਕਾ ਤੇ ਹੜ੍ਹ ਖ਼ਤਰਾ ਨਕਸ਼ਾ": {
    "hi": "सूखा व बाढ़ जोखिम मैप",
    "en": "Drought & Flood Risk Map",
    "pa": "ਸੋਕਾ ਤੇ ਹੜ੍ਹ ਖ਼ਤਰਾ ਨਕਸ਼ਾ",
    "gu": "દુષ્કાળ અને પૂર જોખમ નકશો",
    "mr": "दुष्काळ व पूर जोखीम नकाशा",
    "bn": "খরা ও বন্যা ঝুঁকি মানচিত্র"
  },
  "Climate Alerts": {
    "hi": "मौसम चेतावनियां",
    "en": "Climate Alerts",
    "pa": "ਮੌਸਮ ਚੇਤਾਵਨੀਆਂ",
    "gu": "હવામાન ચેતવણીઓ",
    "mr": "हवामान इशारे",
    "bn": "আবহাওয়া সতর্কতা"
  },
  "मौसम चेतावनियां": {
    "hi": "मौसम चेतावनियां",
    "en": "Climate Alerts",
    "pa": "ਮੌਸਮ ਚੇਤਾਵਨੀਆਂ",
    "gu": "હવામાન ચેતવણીઓ",
    "mr": "हवामान इशारे",
    "bn": "আবহাওয়া সতর্কতা"
  },
  "ਮੌਸਮ ਚੇਤਾਵਨੀਆਂ": {
    "hi": "मौसम चेतावनियां",
    "en": "Climate Alerts",
    "pa": "ਮੌਸਮ ਚੇਤਾਵਨੀਆਂ",
    "gu": "હવામાન ચેતવણીઓ",
    "mr": "हवामान इशारे",
    "bn": "আবহাওয়া সতর্কতা"
  },
  "Close Sidebar": {
    "hi": "साइडबार बंद करें",
    "en": "Close Sidebar",
    "pa": "ਸਾਈਡਬਾਰ ਬੰਦ ਕਰੋ",
    "gu": "સાઇડબાર બંધ કરો",
    "mr": "साइडबार बंद करा",
    "bn": "সাইডবার বন্ধ করুন"
  },
  "साइडबार बंद करें": {
    "hi": "साइडबार बंद करें",
    "en": "Close Sidebar",
    "pa": "ਸਾਈਡਬਾਰ ਬੰਦ ਕਰੋ",
    "gu": "સાઇડબાર બંધ કરો",
    "mr": "साइडबार बंद करा",
    "bn": "সাইডবার বন্ধ করুন"
  },
  "ਸਾਈਡਬਾਰ ਬੰਦ ਕਰੋ": {
    "hi": "साइडबार बंद करें",
    "en": "Close Sidebar",
    "pa": "ਸਾਈਡਬਾਰ ਬੰਦ ਕਰੋ",
    "gu": "સાઇડબાર બંધ કરો",
    "mr": "साइडबार बंद करा",
    "bn": "সাইডবার বন্ধ করুন"
  },
  "Authorized User": {
    "hi": "अधिकृत उपयोगकर्ता",
    "en": "Authorized User",
    "pa": "ਅਧਿਕਾਰਤ ਉਪਭੋਗਤਾ",
    "gu": "અધિકૃત વપરાશકર્તા",
    "mr": "अधिकृत वापरकर्ता",
    "bn": "অনুমোদিত ব্যবহারকারী"
  },
  "अधिकृत उपयोगकर्ता": {
    "hi": "अधिकृत उपयोगकर्ता",
    "en": "Authorized User",
    "pa": "ਅਧਿਕਾਰਤ ਉਪਭੋਗਤਾ",
    "gu": "અધિકૃત વપરાશકર્તા",
    "mr": "अधिकृत वापरकर्ता",
    "bn": "অনুমোদিত ব্যবহারকারী"
  },
  "ਅਧਿਕਾਰਤ ਉਪਭੋਗਤਾ": {
    "hi": "अधिकृत उपयोगकर्ता",
    "en": "Authorized User",
    "pa": "ਅਧਿਕਾਰਤ ਉਪਭੋਗਤਾ",
    "gu": "અધિકૃત વપરાશકર્તા",
    "mr": "अधिकृत वापरकर्ता",
    "bn": "অনুমোদিত ব্যবহারকারী"
  },
  "Farmer": {
    "hi": "किसान (Farmer)",
    "en": "Farmer",
    "pa": "ਕਿਸਾਨ (Farmer)",
    "gu": "ખેડૂત",
    "mr": "शेतकरी",
    "bn": "কৃষক"
  },
  "किसान (Farmer)": {
    "hi": "किसान (Farmer)",
    "en": "Farmer",
    "pa": "ਕਿਸਾਨ (Farmer)",
    "gu": "ખેડૂત",
    "mr": "शेतकरी",
    "bn": "কৃষক"
  },
  "ਕਿਸਾਨ (Farmer)": {
    "hi": "किसान (Farmer)",
    "en": "Farmer",
    "pa": "ਕਿਸਾਨ (Farmer)",
    "gu": "ખેડૂત",
    "mr": "शेतकरी",
    "bn": "কৃষক"
  },
  "Open Sidebar": {
    "hi": "साइडबार खोलें",
    "en": "Open Sidebar",
    "pa": "ਸਾਈਡਬਾਰ ਖੋਲ੍ਹੋ",
    "gu": "સાઇડબાર ખોલો",
    "mr": "साइडबार उघडा",
    "bn": "সাইডবার খুলুন"
  },
  "साइडबार खोलें": {
    "hi": "साइडबार खोलें",
    "en": "Open Sidebar",
    "pa": "ਸਾਈਡਬਾਰ ਖੋਲ੍ਹੋ",
    "gu": "સાઇડબાર ખોલો",
    "mr": "साइडबार उघडा",
    "bn": "সাইডবার খুলুন"
  },
  "ਸਾਈਡਬਾਰ ਖੋਲ੍ਹੋ": {
    "hi": "साइडबार खोलें",
    "en": "Open Sidebar",
    "pa": "ਸਾਈਡਬਾਰ ਖੋਲ੍ਹੋ",
    "gu": "સાઇડબાર ખોલો",
    "mr": "साइडबार उघडा",
    "bn": "সাইডবার খুলুন"
  },
  "Doctor": {
    "hi": "डॉक्टर",
    "en": "Doctor",
    "pa": "ਡਾਕਟਰ",
    "gu": "ડોક્ટર",
    "mr": "डॉक्टर",
    "bn": "ডাক্তার"
  },
  "डॉक्टर": {
    "hi": "डॉक्टर",
    "en": "Doctor",
    "pa": "ਡਾਕਟਰ",
    "gu": "ડોક્ટર",
    "mr": "डॉक्टर",
    "bn": "ডাক্তার"
  },
  "ਡਾਕਟਰ": {
    "hi": "डॉक्टर",
    "en": "Doctor",
    "pa": "ਡਾਕਟਰ",
    "gu": "ડોક્ટર",
    "mr": "डॉक्टर",
    "bn": "ডাক্তার"
  },
  "Mandi": {
    "hi": "मंडी भाव",
    "en": "Mandi",
    "pa": "ਮੰਡੀ",
    "gu": "યાર્ડ ભાવ",
    "mr": "बाजार भाव",
    "bn": "মাণ্ডি দর"
  },
  "मंडी भाव": {
    "hi": "मंडी भाव",
    "en": "Mandi",
    "pa": "ਮੰਡੀ",
    "gu": "યાર્ડ ભાવ",
    "mr": "बाजार भाव",
    "bn": "মাণ্ডি দর"
  },
  "ਮੰਡੀ": {
    "hi": "मंडी भाव",
    "en": "Mandi",
    "pa": "ਮੰਡੀ",
    "gu": "યાર્ડ ભાવ",
    "mr": "बाजार भाव",
    "bn": "মাণ্ডি দর"
  },
  "Weather": {
    "hi": "मौसम",
    "en": "Weather",
    "pa": "ਮੌਸਮ",
    "gu": "હવામાન",
    "mr": "हवामान",
    "bn": "আবহাওয়া"
  },
  "मौसम": {
    "hi": "मौसम",
    "en": "Weather",
    "pa": "ਮੌਸਮ",
    "gu": "હવામાન",
    "mr": "हवामान",
    "bn": "আবহাওয়া"
  },
  "ਮੌਸਮ": {
    "hi": "मौसम",
    "en": "Weather",
    "pa": "ਮੌਸਮ",
    "gu": "હવામાન",
    "mr": "हवामान",
    "bn": "আবহাওয়া"
  },
  "Savings": {
    "hi": "बचत",
    "en": "Savings",
    "pa": "ਬੱਚਤ",
    "gu": "બચત",
    "mr": "बचत",
    "bn": "সঞ্চয়"
  },
  "बचत": {
    "hi": "बचत",
    "en": "Savings",
    "pa": "ਬੱਚਤ",
    "gu": "બચત",
    "mr": "बचत",
    "bn": "সঞ্চয়"
  },
  "ਬੱਚਤ": {
    "hi": "बचत",
    "en": "Savings",
    "pa": "ਬੱਚਤ",
    "gu": "બચત",
    "mr": "बचत",
    "bn": "সঞ্চয়"
  },
  "KISAN AGRO COMMAND": {
    "hi": "स्मार्ट कृषि कमान",
    "en": "KISAN AGRO COMMAND",
    "pa": "ਸਮਾਰਟ ਖੇਤੀ ਕਮਾਂਡ",
    "gu": "સ્માર્ટ કૃષિ કમાન",
    "mr": "स्मार्ट कृषी कमान",
    "bn": "স্মার্ট কৃষি কমান্ড"
  },
  "स्मार्ट कृषि कमान": {
    "hi": "स्मार्ट कृषि कमान",
    "en": "KISAN AGRO COMMAND",
    "pa": "ਸਮਾਰਟ ਖੇਤੀ ਕਮਾਂਡ",
    "gu": "સ્માર્ટ કૃષિ કમાન",
    "mr": "स्मार्ट कृषी कमान",
    "bn": "স্মার্ট কৃষি কমান্ড"
  },
  "ਸਮਾਰਟ ਖੇਤੀ ਕਮਾਂਡ": {
    "hi": "स्मार्ट कृषि कमान",
    "en": "KISAN AGRO COMMAND",
    "pa": "ਸਮਾਰਟ ਖੇਤੀ ਕਮਾਂਡ",
    "gu": "સ્માર્ટ કૃષિ કમાન",
    "mr": "स्मार्ट कृषी कमान",
    "bn": "স্মার্ট কৃষি কমান্ড"
  },
  "Live Camera Tool": {
    "hi": "लाइव कैमरा स्कैनर",
    "en": "Live Camera Tool",
    "pa": "ਲਾਈਵ ਕੈਮਰਾ ਟੂਲ",
    "gu": "લાઇવ કેમેરા ટૂલ",
    "mr": "थेट कॅमेरा टूल",
    "bn": "লাইভ ক্যামেরা টুল"
  },
  "लाइव कैमरा स्कैनर": {
    "hi": "लाइव कैमरा स्कैनर",
    "en": "Live Camera Tool",
    "pa": "ਲਾਈਵ ਕੈਮਰਾ ਟੂਲ",
    "gu": "લાઇવ કેમેરા ટૂલ",
    "mr": "थेट कॅमेरा टूल",
    "bn": "লাইভ ক্যামেরা টুল"
  },
  "ਲਾਈਵ ਕੈਮਰਾ ਟੂਲ": {
    "hi": "लाइव कैमरा स्कैनर",
    "en": "Live Camera Tool",
    "pa": "ਲਾਈਵ ਕੈਮਰਾ ਟੂਲ",
    "gu": "લાઇવ કેમેરા ટૂલ",
    "mr": "थेट कॅमेरा टूल",
    "bn": "লাইভ ক্যামেরা টুল"
  },
  "Scan Crop Leaf Disease": {
    "hi": "कैमरे से फसल रोग जांचें",
    "en": "Scan Crop Leaf Disease",
    "pa": "ਕੈਮਰੇ ਨਾਲ ਫ਼ਸਲ ਰੋਗ ਜਾਂਚੋ",
    "gu": "પાકના પાંદડા રોગ તપાસો",
    "mr": "पिकाचे पान स्कॅन करा",
    "bn": "ক্যামেরা দিয়ে ফসলের রোগ পরীক্ষা করুন"
  },
  "कैमरे से फसल रोग जांचें": {
    "hi": "कैमरे से फसल रोग जांचें",
    "en": "Scan Crop Leaf Disease",
    "pa": "ਕੈਮਰੇ ਨਾਲ ਫ਼ਸਲ ਰੋਗ ਜਾਂਚੋ",
    "gu": "પાકના પાંદડા રોગ તપાસો",
    "mr": "पिकाचे पान स्कॅन करा",
    "bn": "ক্যামেরা দিয়ে ফসলের রোগ পরীক্ষা করুন"
  },
  "ਕੈਮਰੇ ਨਾਲ ਫ਼ਸਲ ਰੋਗ ਜਾਂਚੋ": {
    "hi": "कैमरे से फसल रोग जांचें",
    "en": "Scan Crop Leaf Disease",
    "pa": "ਕੈਮਰੇ ਨਾਲ ਫ਼ਸਲ ਰੋਗ ਜਾਂਚੋ",
    "gu": "પાકના પાંદડા રોગ તપાસો",
    "mr": "पिकाचे पान स्कॅन करा",
    "bn": "ক্যামেরা দিয়ে ফসলের রোগ পরীক্ষা করুন"
  },
  "Live Wholesale Rates": {
    "hi": "दैनिक APMC भाव",
    "en": "Live Wholesale Rates",
    "pa": "ਰੋਜ਼ਾਨਾ ਮੰਡੀ ਭਾਅ",
    "gu": "દૈનિક માર્કેટ યાર્ડ ભાવ",
    "mr": "दैनिक बाजार भाव",
    "bn": "দৈনিক পাইকারি দর"
  },
  "दैनिक APMC भाव": {
    "hi": "दैनिक APMC भाव",
    "en": "Live Wholesale Rates",
    "pa": "ਰੋਜ਼ਾਨਾ ਮੰਡੀ ਭਾਅ",
    "gu": "દૈનિક માર્કેટ યાર્ડ ભાવ",
    "mr": "दैनिक बाजार भाव",
    "bn": "দৈনিক পাইকারি দর"
  },
  "ਰੋਜ਼ਾਨਾ ਮੰਡੀ ਭਾਅ": {
    "hi": "दैनिक APMC भाव",
    "en": "Live Wholesale Rates",
    "pa": "ਰੋਜ਼ਾਨਾ ਮੰਡੀ ਭਾਅ",
    "gu": "દૈનિક માર્કેટ યાર્ડ ભાવ",
    "mr": "दैनिक बाजार भाव",
    "bn": "দৈনিক পাইকারি দর"
  },
  "Today's Mandi Rates": {
    "hi": "आज का मंडी भाव देखें",
    "en": "Today's Mandi Rates",
    "pa": "ਅੱਜ ਦਾ ਮੰਡੀ ਭਾਅ ਵੇਖੋ",
    "gu": "આજના યાર્ડ ભાવ જુઓ",
    "mr": "आजचे बाजार भाव पहा",
    "bn": "আজকের মাণ্ডি দর দেখুন"
  },
  "आज का मंडी भाव देखें": {
    "hi": "आज का मंडी भाव देखें",
    "en": "Today's Mandi Rates",
    "pa": "ਅੱਜ ਦਾ ਮੰਡੀ ਭਾਅ ਵੇਖੋ",
    "gu": "આજના યાર્ડ ભાવ જુઓ",
    "mr": "आजचे बाजार भाव पहा",
    "bn": "আজকের মাণ্ডি দর দেখুন"
  },
  "ਅੱਜ ਦਾ ਮੰਡੀ ਭਾਅ ਵੇਖੋ": {
    "hi": "आज का मंडी भाव देखें",
    "en": "Today's Mandi Rates",
    "pa": "ਅੱਜ ਦਾ ਮੰਡੀ ਭਾਅ ਵੇਖੋ",
    "gu": "આજના યાર્ડ ભાવ જુઓ",
    "mr": "आजचे बाजार भाव पहा",
    "bn": "আজকের মাণ্ডি দর দেখুন"
  },
  "What We Do For Your Farm": {
    "hi": "मुख्य सेवाएं • Core Services",
    "en": "What We Do For Your Farm",
    "pa": "ਮੁੱਖ ਸੇਵਾਵਾਂ • Core Services",
    "gu": "તમારા ખેતર માટે મુખ્ય સેવાઓ",
    "mr": "तुमच्या शेतीसाठी मुख्य सेवा",
    "bn": "আমাদের প্রধান কৃষি সেবাসমূহ"
  },
  "मुख्य सेवाएं • Core Services": {
    "hi": "मुख्य सेवाएं • Core Services",
    "en": "What We Do For Your Farm",
    "pa": "ਮੁੱਖ ਸੇਵਾਵਾਂ • Core Services",
    "gu": "તમારા ખેતર માટે મુખ્ય સેવાઓ",
    "mr": "तुमच्या शेतीसाठी मुख्य सेवा",
    "bn": "আমাদের প্রধান কৃষি সেবাসমূহ"
  },
  "ਮੁੱਖ ਸੇਵਾਵਾਂ • Core Services": {
    "hi": "मुख्य सेवाएं • Core Services",
    "en": "What We Do For Your Farm",
    "pa": "ਮੁੱਖ ਸੇਵਾਵਾਂ • Core Services",
    "gu": "તમારા ખેતર માટે મુખ્ય સેવાઓ",
    "mr": "तुमच्या शेतीसाठी मुख्य सेवा",
    "bn": "আমাদের প্রধান কৃষি সেবাসমূহ"
  },
  "How Climate Pulse AI Helps You": {
    "hi": "यह वेबसाइट आपके क्या काम आएगी?",
    "en": "How Climate Pulse AI Helps You",
    "pa": "ਇਹ ਵੈੱਬਸਾਈਟ ਤੁਹਾਡੇ ਕੀ ਕੰਮ ਆਵੇਗੀ?",
    "gu": "આ વેબસાઇટ તમારા શું કામમાં આવશે?",
    "mr": "ही वेबसाइट तुमच्या कशा कामी येईल?",
    "bn": "এই প্ল্যাটফর্ম আপনার কী উপকারে আসবে?"
  },
  "यह वेबसाइट आपके क्या काम आएगी?": {
    "hi": "यह वेबसाइट आपके क्या काम आएगी?",
    "en": "How Climate Pulse AI Helps You",
    "pa": "ਇਹ ਵੈੱਬਸਾਈਟ ਤੁਹਾਡੇ ਕੀ ਕੰਮ ਆਵੇਗੀ?",
    "gu": "આ વેબસાઇટ તમારા શું કામમાં આવશે?",
    "mr": "ही वेबसाइट तुमच्या कशा कामी येईल?",
    "bn": "এই প্ল্যাটফর্ম আপনার কী উপকারে আসবে?"
  },
  "ਇਹ ਵੈੱਬਸਾਈਟ ਤੁਹਾਡੇ ਕੀ ਕੰਮ ਆਵੇਗੀ?": {
    "hi": "यह वेबसाइट आपके क्या काम आएगी?",
    "en": "How Climate Pulse AI Helps You",
    "pa": "ਇਹ ਵੈੱਬਸਾਈਟ ਤੁਹਾਡੇ ਕੀ ਕੰਮ ਆਵੇਗੀ?",
    "gu": "આ વેબસાઇટ તમારા શું કામમાં આવશે?",
    "mr": "ही वेबसाइट तुमच्या कशा कामी येईल?",
    "bn": "এই প্ল্যাটফর্ম আপনার কী উপকারে আসবে?"
  },
  "Tap on any of the core services below to get started immediately:": {
    "hi": "नीचे दिए गए किसी भी कार्ड पर क्लिक करें और सीधे सेवा का लाभ उठाएं:",
    "en": "Tap on any of the core services below to get started immediately:",
    "pa": "ਹੇਠਾਂ ਦਿੱਤੇ ਕਿਸੇ ਵੀ ਕਾਰਡ ਤੇ ਕਲਿੱਕ ਕਰੋ ਅਤੇ ਸਿੱਧਾ ਲਾਭ ਉਠਾਓ:",
    "gu": "નીચે આપેલા કોઈપણ કાર્ડ પર ક્લિક કરીને સેવા શરૂ કરો:",
    "mr": "खालील कोणत्याही कार्डवर क्लिक करून थेट सेवा वापरा:",
    "bn": "নিচের যেকোনো সেবায় ক্লিক করে সরাসরি সুবিধা গ্রহণ করুন:"
  },
  "नीचे दिए गए किसी भी कार्ड पर क्लिक करें और सीधे सेवा का लाभ उठाएं:": {
    "hi": "नीचे दिए गए किसी भी कार्ड पर क्लिक करें और सीधे सेवा का लाभ उठाएं:",
    "en": "Tap on any of the core services below to get started immediately:",
    "pa": "ਹੇਠਾਂ ਦਿੱਤੇ ਕਿਸੇ ਵੀ ਕਾਰਡ ਤੇ ਕਲਿੱਕ ਕਰੋ ਅਤੇ ਸਿੱਧਾ ਲਾਭ ਉਠਾਓ:",
    "gu": "નીચે આપેલા કોઈપણ કાર્ડ પર ક્લિક કરીને સેવા શરૂ કરો:",
    "mr": "खालील कोणत्याही कार्डवर क्लिक करून थेट सेवा वापरा:",
    "bn": "নিচের যেকোনো সেবায় ক্লিক করে সরাসরি সুবিধা গ্রহণ করুন:"
  },
  "ਹੇਠਾਂ ਦਿੱਤੇ ਕਿਸੇ ਵੀ ਕਾਰਡ ਤੇ ਕਲਿੱਕ ਕਰੋ ਅਤੇ ਸਿੱਧਾ ਲਾਭ ਉਠਾਓ:": {
    "hi": "नीचे दिए गए किसी भी कार्ड पर क्लिक करें और सीधे सेवा का लाभ उठाएं:",
    "en": "Tap on any of the core services below to get started immediately:",
    "pa": "ਹੇਠਾਂ ਦਿੱਤੇ ਕਿਸੇ ਵੀ ਕਾਰਡ ਤੇ ਕਲਿੱਕ ਕਰੋ ਅਤੇ ਸਿੱਧਾ ਲਾਭ ਉਠਾਓ:",
    "gu": "નીચે આપેલા કોઈપણ કાર્ડ પર ક્લિક કરીને સેવા શરૂ કરો:",
    "mr": "खालील कोणत्याही कार्डवर क्लिक करून थेट सेवा वापरा:",
    "bn": "নিচের যেকোনো সেবায় ক্লিক করে সরাসরি সুবিধা গ্রহণ করুন:"
  },
  "Explore Now →": {
    "hi": "अभी देखें →",
    "en": "Explore Now →",
    "pa": "ਹੁਣੇ ਵੇਖੋ →",
    "gu": "હમણાં જુઓ →",
    "mr": "आत्ताच पहा →",
    "bn": "এখনই দেখুন →"
  },
  "अभी देखें →": {
    "hi": "अभी देखें →",
    "en": "Explore Now →",
    "pa": "ਹੁਣੇ ਵੇਖੋ →",
    "gu": "હમણાં જુઓ →",
    "mr": "आत्ताच पहा →",
    "bn": "এখনই দেখুন →"
  },
  "ਹੁਣੇ ਵੇਖੋ →": {
    "hi": "अभी देखें →",
    "en": "Explore Now →",
    "pa": "ਹੁਣੇ ਵੇਖੋ →",
    "gu": "હમણાં જુઓ →",
    "mr": "आत्ताच पहा →",
    "bn": "এখনই দেখুন →"
  },
  "Free Tool": {
    "hi": "निःशुल्क",
    "en": "Free Tool",
    "pa": "ਮੁਫ਼ਤ ਸੰਦ",
    "gu": "મફત સાધન",
    "mr": "मोफत साधन",
    "bn": "সম্পূর্ণ বিনামূল্যে"
  },
  "निःशुल्क": {
    "hi": "निःशुल्क",
    "en": "Free Tool",
    "pa": "ਮੁਫ਼ਤ ਸੰਦ",
    "gu": "મફત સાધન",
    "mr": "मोफत साधन",
    "bn": "সম্পূর্ণ বিনামূল্যে"
  },
  "ਮੁਫ਼ਤ ਸੰਦ": {
    "hi": "निःशुल्क",
    "en": "Free Tool",
    "pa": "ਮੁਫ਼ਤ ਸੰਦ",
    "gu": "મફત સાધન",
    "mr": "मोफत साधन",
    "bn": "সম্পূর্ণ বিনামূল্যে"
  },
  "Interactive Demo Preview": {
    "hi": "लाइव कार्यप्रणाली",
    "en": "Interactive Demo Preview",
    "pa": "ਲਾਈਵ ਪ੍ਰਣਾਲੀ",
    "gu": "લાઇવ ડેમો પૂર્વાવલોકન",
    "mr": "थेट कार्यप्रणाली डेमो",
    "bn": "লাইভ কার্যপ্রণালী ডেমো"
  },
  "लाइव कार्यप्रणाली": {
    "hi": "लाइव कार्यप्रणाली",
    "en": "Interactive Demo Preview",
    "pa": "ਲਾਈਵ ਪ੍ਰਣਾਲੀ",
    "gu": "લાઇવ ડેમો પૂર્વાવલોકન",
    "mr": "थेट कार्यप्रणाली डेमो",
    "bn": "লাইভ কার্যপ্রণালী ডেমো"
  },
  "ਲਾਈਵ ਪ੍ਰਣਾਲੀ": {
    "hi": "लाइव कार्यप्रणाली",
    "en": "Interactive Demo Preview",
    "pa": "ਲਾਈਵ ਪ੍ਰਣਾਲੀ",
    "gu": "લાઇવ ડેમો પૂર્વાવલોકન",
    "mr": "थेट कार्यप्रणाली डेमो",
    "bn": "লাইভ কার্যপ্রণালী ডেমো"
  },
  "See How the Technology Works": {
    "hi": "देखें यह तकनीक कैसे काम करती है",
    "en": "See How the Technology Works",
    "pa": "ਵੇਖੋ ਇਹ ਤਕਨੀਕ ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ",
    "gu": "ટેકનોલોજી કેવી રીતે કાર્ય કરે છે તે જુઓ",
    "mr": "तंत्रज्ञान कसे कार्य करते ते पहा",
    "bn": "দেখুন প্রযুক্তি কীভাবে কাজ করে"
  },
  "देखें यह तकनीक कैसे काम करती है": {
    "hi": "देखें यह तकनीक कैसे काम करती है",
    "en": "See How the Technology Works",
    "pa": "ਵੇਖੋ ਇਹ ਤਕਨੀਕ ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ",
    "gu": "ટેકનોલોજી કેવી રીતે કાર્ય કરે છે તે જુઓ",
    "mr": "तंत्रज्ञान कसे कार्य करते ते पहा",
    "bn": "দেখুন প্রযুক্তি কীভাবে কাজ করে"
  },
  "ਵੇਖੋ ਇਹ ਤਕਨੀਕ ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ": {
    "hi": "देखें यह तकनीक कैसे काम करती है",
    "en": "See How the Technology Works",
    "pa": "ਵੇਖੋ ਇਹ ਤਕਨੀਕ ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ",
    "gu": "ટેકનોલોજી કેવી રીતે કાર્ય કરે છે તે જુઓ",
    "mr": "तंत्रज्ञान कसे कार्य करते ते पहा",
    "bn": "দেখুন প্রযুক্তি কীভাবে কাজ করে"
  },
  "Live Camera Vision Scanner": {
    "hi": "लाइव कैमरा विजन स्कैनर",
    "en": "Live Camera Vision Scanner",
    "pa": "ਲਾਈਵ ਕੈਮਰਾ ਵਿਜ਼ਨ ਸਕੈਨਰ",
    "gu": "લાઇવ કેમેરા વિઝન સ્કેનર",
    "mr": "थेट कॅमेरा व्हिजन स्कॅनर",
    "bn": "লাইভ ক্যামেরা ভিশন স্ক্যানার"
  },
  "लाइव कैमरा विजन स्कैनर": {
    "hi": "लाइव कैमरा विजन स्कैनर",
    "en": "Live Camera Vision Scanner",
    "pa": "ਲਾਈਵ ਕੈਮਰਾ ਵਿਜ਼ਨ ਸਕੈਨਰ",
    "gu": "લાઇવ કેમેરા વિઝન સ્કેનર",
    "mr": "थेट कॅमेरा व्हिजन स्कॅनर",
    "bn": "লাইভ ক্যামেরা ভিশন স্ক্যানার"
  },
  "ਲਾਈਵ ਕੈਮਰਾ ਵਿਜ਼ਨ ਸਕੈਨਰ": {
    "hi": "लाइव कैमरा विजन स्कैनर",
    "en": "Live Camera Vision Scanner",
    "pa": "ਲਾਈਵ ਕੈਮਰਾ ਵਿਜ਼ਨ ਸਕੈਨਰ",
    "gu": "લાઇવ કેમેરા વિઝન સ્કેનર",
    "mr": "थेट कॅमेरा व्हिजन स्कॅनर",
    "bn": "লাইভ ক্যামেরা ভিশন স্ক্যানার"
  },
  "Snap Leaf Photo, Get Instant Cure & Dosages": {
    "hi": "पत्ती की फोटो लो, बीमारी और सही दवा पाओ",
    "en": "Snap Leaf Photo, Get Instant Cure & Dosages",
    "pa": "ਪੱਤੇ ਦੀ ਫ਼ੋਟੋ ਲਵੋ, ਬਿਮਾਰੀ ਤੇ ਸਹੀ ਦਵਾਈ ਪਾਓ",
    "gu": "પાંદડાનો ફોટો પાડો, રોગ અને યોગ્ય દવાની માત્રા મેળવો",
    "mr": "पानाचा फोटो काढा, रोग व अचूक औषध मात्रा मिळवा",
    "bn": "পাতার ছবি তুলুন, সঙ্গে সঙ্গে রোগ ও ওষুধের মাত্রা জানুন"
  },
  "पत्ती की फोटो लो, बीमारी और सही दवा पाओ": {
    "hi": "पत्ती की फोटो लो, बीमारी और सही दवा पाओ",
    "en": "Snap Leaf Photo, Get Instant Cure & Dosages",
    "pa": "ਪੱਤੇ ਦੀ ਫ਼ੋਟੋ ਲਵੋ, ਬਿਮਾਰੀ ਤੇ ਸਹੀ ਦਵਾਈ ਪਾਓ",
    "gu": "પાંદડાનો ફોટો પાડો, રોગ અને યોગ્ય દવાની માત્રા મેળવો",
    "mr": "पानाचा फोटो काढा, रोग व अचूक औषध मात्रा मिळवा",
    "bn": "পাতার ছবি তুলুন, সঙ্গে সঙ্গে রোগ ও ওষুধের মাত্রা জানুন"
  },
  "ਪੱਤੇ ਦੀ ਫ਼ੋਟੋ ਲਵੋ, ਬਿਮਾਰੀ ਤੇ ਸਹੀ ਦਵਾਈ ਪਾਓ": {
    "hi": "पत्ती की फोटो लो, बीमारी और सही दवा पाओ",
    "en": "Snap Leaf Photo, Get Instant Cure & Dosages",
    "pa": "ਪੱਤੇ ਦੀ ਫ਼ੋਟੋ ਲਵੋ, ਬਿਮਾਰੀ ਤੇ ਸਹੀ ਦਵਾਈ ਪਾਓ",
    "gu": "પાંદડાનો ફોટો પાડો, રોગ અને યોગ્ય દવાની માત્રા મેળવો",
    "mr": "पानाचा फोटो काढा, रोग व अचूक औषध मात्रा मिळवा",
    "bn": "পাতার ছবি তুলুন, সঙ্গে সঙ্গে রোগ ও ওষুধের মাত্রা জানুন"
  },
  "Aim your phone camera at the diseased leaf. Our multimodal vision AI detects blight, rust, and nutrient deficiency in seconds with exact spray dosages.": {
    "hi": "खेत में खड़े होकर सीधे मोबाइल कैमरे से पत्ती स्कैन करें। एआई डॉक्टर तुरंत बताएगा कि कौन सा कीट या फंगस लगा है और कौन सी दवा कितनी मात्रा में डालनी है।",
    "en": "Aim your phone camera at the diseased leaf. Our multimodal vision AI detects blight, rust, and nutrient deficiency in seconds with exact spray dosages.",
    "pa": "ਖੇਤ ਵਿੱਚ ਖੜ੍ਹੇ ਹੋ ਕੇ ਮੋਬਾਈਲ ਕੈਮਰੇ ਨਾਲ ਪੱਤਾ ਸਕੈਨ ਕਰੋ। ਏਆਈ ਡਾਕਟਰ ਤੁਰੰਤ ਦੱਸੇਗਾ ਕਿ ਕਿਹੜਾ ਕੀੜਾ ਜਾਂ ਫੰਗਸ ਹੈ ਅਤੇ ਕਿਹੜੀ ਦਵਾਈ ਕਿੰਨੀ ਮਾਤਰਾ ਵਿੱਚ ਪਾਉਣੀ ਹੈ।",
    "gu": "ખેતરમાં ઉભા રહીને સીધા મોબાઈલ કેમેરાથી પાંદડું સ્કેન કરો. એઆઈ ડોક્ટર તરત જ જણાવશે કે કયો રોગ છે અને કઈ દવા કેટલી માત્રામાં નાખવી.",
    "mr": "शेतात उभे राहून थेट मोबाईल कॅमेऱ्याने पान स्कॅन करा. एआय डॉक्टर लगेच सांगेल कोणता रोग आहे आणि कोणते औषध किती प्रमाणात फवारायचे.",
    "bn": "জমিতে দাঁড়িয়ে সরাসরি মোবাইল ক্যামেরা দিয়ে পাতা স্ক্যান করুন। এআই ডাক্তার তৎক্ষণাৎ রোগ শনাক্ত করে সঠিক ওষুধ ও স্প্রে করার মাত্রা জানাবে।"
  },
  "खेत में खड़े होकर सीधे मोबाइल कैमरे से पत्ती स्कैन करें। एआई डॉक्टर तुरंत बताएगा कि कौन सा कीट या फंगस लगा है और कौन सी दवा कितनी मात्रा में डालनी है।": {
    "hi": "खेत में खड़े होकर सीधे मोबाइल कैमरे से पत्ती स्कैन करें। एआई डॉक्टर तुरंत बताएगा कि कौन सा कीट या फंगस लगा है और कौन सी दवा कितनी मात्रा में डालनी है।",
    "en": "Aim your phone camera at the diseased leaf. Our multimodal vision AI detects blight, rust, and nutrient deficiency in seconds with exact spray dosages.",
    "pa": "ਖੇਤ ਵਿੱਚ ਖੜ੍ਹੇ ਹੋ ਕੇ ਮੋਬਾਈਲ ਕੈਮਰੇ ਨਾਲ ਪੱਤਾ ਸਕੈਨ ਕਰੋ। ਏਆਈ ਡਾਕਟਰ ਤੁਰੰਤ ਦੱਸੇਗਾ ਕਿ ਕਿਹੜਾ ਕੀੜਾ ਜਾਂ ਫੰਗਸ ਹੈ ਅਤੇ ਕਿਹੜੀ ਦਵਾਈ ਕਿੰਨੀ ਮਾਤਰਾ ਵਿੱਚ ਪਾਉਣੀ ਹੈ।",
    "gu": "ખેતરમાં ઉભા રહીને સીધા મોબાઈલ કેમેરાથી પાંદડું સ્કેન કરો. એઆઈ ડોક્ટર તરત જ જણાવશે કે કયો રોગ છે અને કઈ દવા કેટલી માત્રામાં નાખવી.",
    "mr": "शेतात उभे राहून थेट मोबाईल कॅमेऱ्याने पान स्कॅन करा. एआय डॉक्टर लगेच सांगेल कोणता रोग आहे आणि कोणते औषध किती प्रमाणात फवारायचे.",
    "bn": "জমিতে দাঁড়িয়ে সরাসরি মোবাইল ক্যামেরা দিয়ে পাতা স্ক্যান করুন। এআই ডাক্তার তৎক্ষণাৎ রোগ শনাক্ত করে সঠিক ওষুধ ও স্প্রে করার মাত্রা জানাবে।"
  },
  "ਖੇਤ ਵਿੱਚ ਖੜ੍ਹੇ ਹੋ ਕੇ ਮੋਬਾਈਲ ਕੈਮਰੇ ਨਾਲ ਪੱਤਾ ਸਕੈਨ ਕਰੋ। ਏਆਈ ਡਾਕਟਰ ਤੁਰੰਤ ਦੱਸੇਗਾ ਕਿ ਕਿਹੜਾ ਕੀੜਾ ਜਾਂ ਫੰਗਸ ਹੈ ਅਤੇ ਕਿਹੜੀ ਦਵਾਈ ਕਿੰਨੀ ਮਾਤਰਾ ਵਿੱਚ ਪਾਉਣੀ ਹੈ।": {
    "hi": "खेत में खड़े होकर सीधे मोबाइल कैमरे से पत्ती स्कैन करें। एआई डॉक्टर तुरंत बताएगा कि कौन सा कीट या फंगस लगा है और कौन सी दवा कितनी मात्रा में डालनी है।",
    "en": "Aim your phone camera at the diseased leaf. Our multimodal vision AI detects blight, rust, and nutrient deficiency in seconds with exact spray dosages.",
    "pa": "ਖੇਤ ਵਿੱਚ ਖੜ੍ਹੇ ਹੋ ਕੇ ਮੋਬਾਈਲ ਕੈਮਰੇ ਨਾਲ ਪੱਤਾ ਸਕੈਨ ਕਰੋ। ਏਆਈ ਡਾਕਟਰ ਤੁਰੰਤ ਦੱਸੇਗਾ ਕਿ ਕਿਹੜਾ ਕੀੜਾ ਜਾਂ ਫੰਗਸ ਹੈ ਅਤੇ ਕਿਹੜੀ ਦਵਾਈ ਕਿੰਨੀ ਮਾਤਰਾ ਵਿੱਚ ਪਾਉਣੀ ਹੈ।",
    "gu": "ખેતરમાં ઉભા રહીને સીધા મોબાઈલ કેમેરાથી પાંદડું સ્કેન કરો. એઆઈ ડોક્ટર તરત જ જણાવશે કે કયો રોગ છે અને કઈ દવા કેટલી માત્રામાં નાખવી.",
    "mr": "शेतात उभे राहून थेट मोबाईल कॅमेऱ्याने पान स्कॅन करा. एआय डॉक्टर लगेच सांगेल कोणता रोग आहे आणि कोणते औषध किती प्रमाणात फवारायचे.",
    "bn": "জমিতে দাঁড়িয়ে সরাসরি মোবাইল ক্যামেরা দিয়ে পাতা স্ক্যান করুন। এআই ডাক্তার তৎক্ষণাৎ রোগ শনাক্ত করে সঠিক ওষুধ ও স্প্রে করার মাত্রা জানাবে।"
  },
  "Detected: Paddy Brown Leaf Spot": {
    "hi": "पहचाना गया रोग: धान का भूरा पत्ती धब्बा",
    "en": "Detected: Paddy Brown Leaf Spot",
    "pa": "ਪਛਾਣਿਆ ਰੋਗ: ਝੋਨੇ ਦਾ ਭੂਰਾ ਪੱਤਾ ਧੱਬਾ",
    "gu": "ઓળખાયેલ રોગ: ડાંગરનો ભૂરો ટપકાં રોગ",
    "mr": "ओळखलेला रोग: भातावरील तपकिरी ठिपके",
    "bn": "শনাক্তকৃত রোগ: ধানের বাদামী পাতা দাগ রোগ"
  },
  "पहचाना गया रोग: धान का भूरा पत्ती धब्बा": {
    "hi": "पहचाना गया रोग: धान का भूरा पत्ती धब्बा",
    "en": "Detected: Paddy Brown Leaf Spot",
    "pa": "ਪਛਾਣਿਆ ਰੋਗ: ਝੋਨੇ ਦਾ ਭੂਰਾ ਪੱਤਾ ਧੱਬਾ",
    "gu": "ઓળખાયેલ રોગ: ડાંગરનો ભૂરો ટપકાં રોગ",
    "mr": "ओळखलेला रोग: भातावरील तपकिरी ठिपके",
    "bn": "শনাক্তকৃত রোগ: ধানের বাদামী পাতা দাগ রোগ"
  },
  "ਪਛਾਣਿਆ ਰੋਗ: ਝੋਨੇ ਦਾ ਭੂਰਾ ਪੱਤਾ ਧੱਬਾ": {
    "hi": "पहचाना गया रोग: धान का भूरा पत्ती धब्बा",
    "en": "Detected: Paddy Brown Leaf Spot",
    "pa": "ਪਛਾਣਿਆ ਰੋਗ: ਝੋਨੇ ਦਾ ਭੂਰਾ ਪੱਤਾ ਧੱਬਾ",
    "gu": "ઓળખાયેલ રોગ: ડાંગરનો ભૂરો ટપકાં રોગ",
    "mr": "ओळखलेला रोग: भातावरील तपकिरी ठिपके",
    "bn": "শনাক্তকৃত রোগ: ধানের বাদামী পাতা দাগ রোগ"
  },
  "Remedy: Spray Hexaconazole 5% EC (2 ml per litre of water). Maintain proper field drainage.": {
    "hi": "उपचार: हेक्साकोनाज़ोल 5% EC (2 मिली प्रति लीटर पानी) का छिड़काव करें। खेत में जल निकासी सुनिश्चित करें।",
    "en": "Remedy: Spray Hexaconazole 5% EC (2 ml per litre of water). Maintain proper field drainage.",
    "pa": "ਇਲਾਜ: ਹੈਕਸਾਕੋਨਾਜ਼ੋਲ 5% EC (2 ਮਿ.ਲੀ. ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ) ਦਾ ਛਿੜਕਾਅ ਕਰੋ। ਖੇਤ ਵਿੱਚ ਪਾਣੀ ਦੀ ਨਿਕਾਸੀ ਸਹੀ ਰੱਖੋ।",
    "gu": "ઉપચાર: હેક્ઝાકોનાઝોલ 5% EC (2 મિલી પ્રતિ લિટર પાણી) નો છંટકાવ કરો. ખેતરમાં યોગ્ય પાણી નિકાલ સુનિશ્ચિત કરો.",
    "mr": "उपचार: हेक्साकोनाझोल ५% EC (२ मिली प्रति लिटर पाणी) फवारा. शेतात पाण्याचा योग्य निचरा ठेवा.",
    "bn": "প্রতিকার: হেক্সাকোনাজল ৫% ইসি (প্রতি লিটার জলে ২ মিলি) স্প্রে করুন। জমিতে সঠিক জল নিষ্কাশন ব্যবস্থা রাখুন।"
  },
  "उपचार: हेक्साकोनाज़ोल 5% EC (2 मिली प्रति लीटर पानी) का छिड़काव करें। खेत में जल निकासी सुनिश्चित करें।": {
    "hi": "उपचार: हेक्साकोनाज़ोल 5% EC (2 मिली प्रति लीटर पानी) का छिड़काव करें। खेत में जल निकासी सुनिश्चित करें।",
    "en": "Remedy: Spray Hexaconazole 5% EC (2 ml per litre of water). Maintain proper field drainage.",
    "pa": "ਇਲਾਜ: ਹੈਕਸਾਕੋਨਾਜ਼ੋਲ 5% EC (2 ਮਿ.ਲੀ. ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ) ਦਾ ਛਿੜਕਾਅ ਕਰੋ। ਖੇਤ ਵਿੱਚ ਪਾਣੀ ਦੀ ਨਿਕਾਸੀ ਸਹੀ ਰੱਖੋ।",
    "gu": "ઉપચાર: હેક્ઝાકોનાઝોલ 5% EC (2 મિલી પ્રતિ લિટર પાણી) નો છંટકાવ કરો. ખેતરમાં યોગ્ય પાણી નિકાલ સુનિશ્ચિત કરો.",
    "mr": "उपचार: हेक्साकोनाझोल ५% EC (२ मिली प्रति लिटर पाणी) फवारा. शेतात पाण्याचा योग्य निचरा ठेवा.",
    "bn": "প্রতিকার: হেক্সাকোনাজল ৫% ইসি (প্রতি লিটার জলে ২ মিলি) স্প্রে করুন। জমিতে সঠিক জল নিষ্কাশন ব্যবস্থা রাখুন।"
  },
  "ਇਲਾਜ: ਹੈਕਸਾਕੋਨਾਜ਼ੋਲ 5% EC (2 ਮਿ.ਲੀ. ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ) ਦਾ ਛਿੜਕਾਅ ਕਰੋ। ਖੇਤ ਵਿੱਚ ਪਾਣੀ ਦੀ ਨਿਕਾਸੀ ਸਹੀ ਰੱਖੋ।": {
    "hi": "उपचार: हेक्साकोनाज़ोल 5% EC (2 मिली प्रति लीटर पानी) का छिड़काव करें। खेत में जल निकासी सुनिश्चित करें।",
    "en": "Remedy: Spray Hexaconazole 5% EC (2 ml per litre of water). Maintain proper field drainage.",
    "pa": "ਇਲਾਜ: ਹੈਕਸਾਕੋਨਾਜ਼ੋਲ 5% EC (2 ਮਿ.ਲੀ. ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ) ਦਾ ਛਿੜਕਾਅ ਕਰੋ। ਖੇਤ ਵਿੱਚ ਪਾਣੀ ਦੀ ਨਿਕਾਸੀ ਸਹੀ ਰੱਖੋ।",
    "gu": "ઉપચાર: હેક્ઝાકોનાઝોલ 5% EC (2 મિલી પ્રતિ લિટર પાણી) નો છંટકાવ કરો. ખેતરમાં યોગ્ય પાણી નિકાલ સુનિશ્ચિત કરો.",
    "mr": "उपचार: हेक्साकोनाझोल ५% EC (२ मिली प्रति लिटर पाणी) फवारा. शेतात पाण्याचा योग्य निचरा ठेवा.",
    "bn": "প্রতিকার: হেক্সাকোনাজল ৫% ইসি (প্রতি লিটার জলে ২ মিলি) স্প্রে করুন। জমিতে সঠিক জল নিষ্কাশন ব্যবস্থা রাখুন।"
  },
  "🔊 Audio Voice Readout Available": {
    "hi": "🔊 आवाज में सुनें (Audio Voice Readout)",
    "en": "🔊 Audio Voice Readout Available",
    "pa": "🔊 ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣੋ (Audio Voice Readout)",
    "gu": "🔊 અવાજમાં સાંભળો (Audio Voice Readout)",
    "mr": "🔊 आवाजात ऐका (Audio Voice Readout)",
    "bn": "🔊 অডিও কণ্ঠে শুনুন (Audio Voice Readout)"
  },
  "🔊 आवाज में सुनें (Audio Voice Readout)": {
    "hi": "🔊 आवाज में सुनें (Audio Voice Readout)",
    "en": "🔊 Audio Voice Readout Available",
    "pa": "🔊 ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣੋ (Audio Voice Readout)",
    "gu": "🔊 અવાજમાં સાંભળો (Audio Voice Readout)",
    "mr": "🔊 आवाजात ऐका (Audio Voice Readout)",
    "bn": "🔊 অডিও কণ্ঠে শুনুন (Audio Voice Readout)"
  },
  "🔊 ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣੋ (Audio Voice Readout)": {
    "hi": "🔊 आवाज में सुनें (Audio Voice Readout)",
    "en": "🔊 Audio Voice Readout Available",
    "pa": "🔊 ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣੋ (Audio Voice Readout)",
    "gu": "🔊 અવાજમાં સાંભળો (Audio Voice Readout)",
    "mr": "🔊 आवाजात ऐका (Audio Voice Readout)",
    "bn": "🔊 অডিও কণ্ঠে শুনুন (Audio Voice Readout)"
  },
  "Try Scanner →": {
    "hi": "अभी जांचें →",
    "en": "Try Scanner →",
    "pa": "ਹੁਣੇ ਜਾਂਚੋ →",
    "gu": "હમણાં તપાસો →",
    "mr": "आत्ताच तपासा →",
    "bn": "এখনই পরীক্ষা করুন →"
  },
  "अभी जांचें →": {
    "hi": "अभी जांचें →",
    "en": "Try Scanner →",
    "pa": "ਹੁਣੇ ਜਾਂਚੋ →",
    "gu": "હમણાં તપાસો →",
    "mr": "आत्ताच तपासा →",
    "bn": "এখনই পরীক্ষা করুন →"
  },
  "ਹੁਣੇ ਜਾਂਚੋ →": {
    "hi": "अभी जांचें →",
    "en": "Try Scanner →",
    "pa": "ਹੁਣੇ ਜਾਂਚੋ →",
    "gu": "હમણાં તપાસો →",
    "mr": "आत्ताच तपासा →",
    "bn": "এখনই পরীক্ষা করুন →"
  },
  "Live Mandi & Govt MSP": {
    "hi": "दैनिक थोक भाव व MSP",
    "en": "Live Mandi & Govt MSP",
    "pa": "ਰੋਜ਼ਾਨਾ ਥੋਕ ਭਾਅ ਤੇ MSP",
    "gu": "દૈનિક યાર્ડ ભાવ અને સરકારી ટેકાના ભાવ",
    "mr": "दैनिक बाजार भाव व हमीभाव (MSP)",
    "bn": "দৈনিক মাণ্ডি পাইকারি দর ও সরকারি MSP"
  },
  "दैनिक थोक भाव व MSP": {
    "hi": "दैनिक थोक भाव व MSP",
    "en": "Live Mandi & Govt MSP",
    "pa": "ਰੋਜ਼ਾਨਾ ਥੋਕ ਭਾਅ ਤੇ MSP",
    "gu": "દૈનિક યાર્ડ ભાવ અને સરકારી ટેકાના ભાવ",
    "mr": "दैनिक बाजार भाव व हमीभाव (MSP)",
    "bn": "দৈনিক মাণ্ডি পাইকারি দর ও সরকারি MSP"
  },
  "ਰੋਜ਼ਾਨਾ ਥੋਕ ਭਾਅ ਤੇ MSP": {
    "hi": "दैनिक थोक भाव व MSP",
    "en": "Live Mandi & Govt MSP",
    "pa": "ਰੋਜ਼ਾਨਾ ਥੋਕ ਭਾਅ ਤੇ MSP",
    "gu": "દૈનિક યાર્ડ ભાવ અને સરકારી ટેકાના ભાવ",
    "mr": "दैनिक बाजार भाव व हमीभाव (MSP)",
    "bn": "দৈনিক মাণ্ডি পাইকারি দর ও সরকারি MSP"
  },
  "Compare Mandi Price with Govt MSP": {
    "hi": "सरकारी MSP से भाव मिलाकर बेचें",
    "en": "Compare Mandi Price with Govt MSP",
    "pa": "ਸਰਕਾਰੀ MSP ਨਾਲ ਭਾਅ ਮਿਲਾ ਕੇ ਵੇਚੋ",
    "gu": "સરકારી ટેકાના ભાવ સાથે મેળવીને વેચો",
    "mr": "शासकीय हमीभावाशी तुलना करून विका",
    "bn": "সরকারি MSP এর সাথে দর মিলিয়ে বিক্রি করুন"
  },
  "सरकारी MSP से भाव मिलाकर बेचें": {
    "hi": "सरकारी MSP से भाव मिलाकर बेचें",
    "en": "Compare Mandi Price with Govt MSP",
    "pa": "ਸਰਕਾਰੀ MSP ਨਾਲ ਭਾਅ ਮਿਲਾ ਕੇ ਵੇਚੋ",
    "gu": "સરકારી ટેકાના ભાવ સાથે મેળવીને વેચો",
    "mr": "शासकीय हमीभावाशी तुलना करून विका",
    "bn": "সরকারি MSP এর সাথে দর মিলিয়ে বিক্রি করুন"
  },
  "ਸਰਕਾਰੀ MSP ਨਾਲ ਭਾਅ ਮਿਲਾ ਕੇ ਵੇਚੋ": {
    "hi": "सरकारी MSP से भाव मिलाकर बेचें",
    "en": "Compare Mandi Price with Govt MSP",
    "pa": "ਸਰਕਾਰੀ MSP ਨਾਲ ਭਾਅ ਮਿਲਾ ਕੇ ਵੇਚੋ",
    "gu": "સરકારી ટેકાના ભાવ સાથે મેળવીને વેચો",
    "mr": "शासकीय हमीभावाशी तुलना करून विका",
    "bn": "সরকারি MSP এর সাথে দর মিলিয়ে বিক্রি করুন"
  },
  "Never sell below government minimum support price. Track daily price trends.": {
    "hi": "बिचौलियों के बहकावे में न आएं। अपनी फसल का आज का आधिकारिक थोक रेट देखें।",
    "en": "Never sell below government minimum support price. Track daily price trends.",
    "pa": "ਦਲਾਲਾਂ ਦੇ ਧੋਖੇ ਵਿੱਚ ਨਾ ਆਓ। ਆਪਣੀ ਫ਼ਸਲ ਦਾ ਅੱਜ ਦਾ ਸਰਕਾਰੀ ਥੋਕ ਭਾਅ ਵੇਖੋ।",
    "gu": "દલાલોની છેતરપિંડીથી બચો. તમારા પાકનો આજનો સત્તાવાર જથ્થાબંધ ભાવ જુઓ.",
    "mr": "दलालांच्या फसवणुकीपासून सावध राहा. आपल्या पिकाचा आजचा अधिकृत घाऊक दर तपासा.",
    "bn": "মধ্যস্বত্বভোগীদের ফাঁদে পা দেবেন না। আপনার ফসলের আজকের অফিসিয়াল পাইকারি দর দেখুন।"
  },
  "बिचौलियों के बहकावे में न आएं। अपनी फसल का आज का आधिकारिक थोक रेट देखें।": {
    "hi": "बिचौलियों के बहकावे में न आएं। अपनी फसल का आज का आधिकारिक थोक रेट देखें।",
    "en": "Never sell below government minimum support price. Track daily price trends.",
    "pa": "ਦਲਾਲਾਂ ਦੇ ਧੋਖੇ ਵਿੱਚ ਨਾ ਆਓ। ਆਪਣੀ ਫ਼ਸਲ ਦਾ ਅੱਜ ਦਾ ਸਰਕਾਰੀ ਥੋਕ ਭਾਅ ਵੇਖੋ।",
    "gu": "દલાલોની છેતરપિંડીથી બચો. તમારા પાકનો આજનો સત્તાવાર જથ્થાબંધ ભાવ જુઓ.",
    "mr": "दलालांच्या फसवणुकीपासून सावध राहा. आपल्या पिकाचा आजचा अधिकृत घाऊक दर तपासा.",
    "bn": "মধ্যস্বত্বভোগীদের ফাঁদে পা দেবেন না। আপনার ফসলের আজকের অফিসিয়াল পাইকারি দর দেখুন।"
  },
  "ਦਲਾਲਾਂ ਦੇ ਧੋਖੇ ਵਿੱਚ ਨਾ ਆਓ। ਆਪਣੀ ਫ਼ਸਲ ਦਾ ਅੱਜ ਦਾ ਸਰਕਾਰੀ ਥੋਕ ਭਾਅ ਵੇਖੋ।": {
    "hi": "बिचौलियों के बहकावे में न आएं। अपनी फसल का आज का आधिकारिक थोक रेट देखें।",
    "en": "Never sell below government minimum support price. Track daily price trends.",
    "pa": "ਦਲਾਲਾਂ ਦੇ ਧੋਖੇ ਵਿੱਚ ਨਾ ਆਓ। ਆਪਣੀ ਫ਼ਸਲ ਦਾ ਅੱਜ ਦਾ ਸਰਕਾਰੀ ਥੋਕ ਭਾਅ ਵੇਖੋ।",
    "gu": "દલાલોની છેતરપિંડીથી બચો. તમારા પાકનો આજનો સત્તાવાર જથ્થાબંધ ભાવ જુઓ.",
    "mr": "दलालांच्या फसवणुकीपासून सावध राहा. आपल्या पिकाचा आजचा अधिकृत घाऊक दर तपासा.",
    "bn": "মধ্যস্বত্বভোগীদের ফাঁদে পা দেবেন না। আপনার ফসলের আজকের অফিসিয়াল পাইকারি দর দেখুন।"
  },
  "View All Mandi Rates →": {
    "hi": "सभी फसलों के भाव देखें →",
    "en": "View All Mandi Rates →",
    "pa": "ਸਾਰੀਆਂ ਫ਼ਸਲਾਂ ਦੇ ਭਾਅ ਵੇਖੋ →",
    "gu": "બધા પાકોના ભાવ જુઓ →",
    "mr": "सर्व पिकांचे भाव पहा →",
    "bn": "সকল ফসলের পাইকারি দর দেখুন →"
  },
  "सभी फसलों के भाव देखें →": {
    "hi": "सभी फसलों के भाव देखें →",
    "en": "View All Mandi Rates →",
    "pa": "ਸਾਰੀਆਂ ਫ਼ਸਲਾਂ ਦੇ ਭਾਅ ਵੇਖੋ →",
    "gu": "બધા પાકોના ભાવ જુઓ →",
    "mr": "सर्व पिकांचे भाव पहा →",
    "bn": "সকল ফসলের পাইকারি দর দেখুন →"
  },
  "ਸਾਰੀਆਂ ਫ਼ਸਲਾਂ ਦੇ ਭਾਅ ਵੇਖੋ →": {
    "hi": "सभी फसलों के भाव देखें →",
    "en": "View All Mandi Rates →",
    "pa": "ਸਾਰੀਆਂ ਫ਼ਸਲਾਂ ਦੇ ਭਾਅ ਵੇਖੋ →",
    "gu": "બધા પાકોના ભાવ જુઓ →",
    "mr": "सर्व पिकांचे भाव पहा →",
    "bn": "সকল ফসলের পাইকারি দর দেখুন →"
  },
  "How to Use Climate Pulse AI": {
    "hi": "सरल ४ चरण • Step-by-Step Guide",
    "en": "How to Use Climate Pulse AI",
    "pa": "ਸੌਖੇ 4 ਕਦਮ • Step-by-Step Guide",
    "gu": "સરળ ૪ પગલાં • માર્ગદર્શિકા",
    "mr": "सोपे ४ टप्पे • मार्गदर्शक",
    "bn": "সহজ ৪টি ধাপ • নির্দেশিকা"
  },
  "सरल ४ चरण • Step-by-Step Guide": {
    "hi": "सरल ४ चरण • Step-by-Step Guide",
    "en": "How to Use Climate Pulse AI",
    "pa": "ਸੌਖੇ 4 ਕਦਮ • Step-by-Step Guide",
    "gu": "સરળ ૪ પગલાં • માર્ગદર્શિકા",
    "mr": "सोपे ४ टप्पे • मार्गदर्शक",
    "bn": "সহজ ৪টি ধাপ • নির্দেশিকা"
  },
  "ਸੌਖੇ 4 ਕਦਮ • Step-by-Step Guide": {
    "hi": "सरल ४ चरण • Step-by-Step Guide",
    "en": "How to Use Climate Pulse AI",
    "pa": "ਸੌਖੇ 4 ਕਦਮ • Step-by-Step Guide",
    "gu": "સરળ ૪ પગલાં • માર્ગદર્શિકા",
    "mr": "सोपे ४ टप्पे • मार्गदर्शक",
    "bn": "সহজ ৪টি ধাপ • নির্দেশিকা"
  },
  "4 Easy Steps to Protect & Profit from Your Farm": {
    "hi": "खेती में टेक्नोलॉजी का उपयोग करना हुआ बिल्कुल आसान",
    "en": "4 Easy Steps to Protect & Profit from Your Farm",
    "pa": "ਖੇਤੀ ਵਿੱਚ ਤਕਨਾਲੋਜੀ ਦੀ ਵਰਤੋਂ ਹੋਈ ਬਿਲਕੁਲ ਆਸਾਨ",
    "gu": "ખેતીમાં ટેકનોલોજીનો ઉપયોગ કરવો બન્યો સાવ સરળ",
    "mr": "शेतीत तंत्रज्ञानाचा वापर करणे झाले अगदी सोपे",
    "bn": "কৃষিকাজে আধুনিক প্রযুক্তির ব্যবহার এখন অত্যন্ত সহজ"
  },
  "खेती में टेक्नोलॉजी का उपयोग करना हुआ बिल्कुल आसान": {
    "hi": "खेती में टेक्नोलॉजी का उपयोग करना हुआ बिल्कुल आसान",
    "en": "4 Easy Steps to Protect & Profit from Your Farm",
    "pa": "ਖੇਤੀ ਵਿੱਚ ਤਕਨਾਲੋਜੀ ਦੀ ਵਰਤੋਂ ਹੋਈ ਬਿਲਕੁਲ ਆਸਾਨ",
    "gu": "ખેતીમાં ટેકનોલોજીનો ઉપયોગ કરવો બન્યો સાવ સરળ",
    "mr": "शेतीत तंत्रज्ञानाचा वापर करणे झाले अगदी सोपे",
    "bn": "কৃষিকাজে আধুনিক প্রযুক্তির ব্যবহার এখন অত্যন্ত সহজ"
  },
  "ਖੇਤੀ ਵਿੱਚ ਤਕਨਾਲੋਜੀ ਦੀ ਵਰਤੋਂ ਹੋਈ ਬਿਲਕੁਲ ਆਸਾਨ": {
    "hi": "खेती में टेक्नोलॉजी का उपयोग करना हुआ बिल्कुल आसान",
    "en": "4 Easy Steps to Protect & Profit from Your Farm",
    "pa": "ਖੇਤੀ ਵਿੱਚ ਤਕਨਾਲੋਜੀ ਦੀ ਵਰਤੋਂ ਹੋਈ ਬਿਲਕੁਲ ਆਸਾਨ",
    "gu": "ખેતીમાં ટેકનોલોજીનો ઉપયોગ કરવો બન્યો સાવ સરળ",
    "mr": "शेतीत तंत्रज्ञानाचा वापर करणे झाले अगदी सोपे",
    "bn": "কৃষিকাজে আধুনিক প্রযুক্তির ব্যবহার এখন অত্যন্ত সহজ"
  },
  "No app download needed. Works directly in your mobile browser with zero technical hassle:": {
    "hi": "किसी विशेष तकनीकी ज्ञान की आवश्यकता नहीं — बस अपने फोन में वेबसाइट खोलें और ये ४ आसान कदम उठाएं:",
    "en": "No app download needed. Works directly in your mobile browser with zero technical hassle:",
    "pa": "ਕਿਸੇ ਵਿਸ਼ੇਸ਼ ਜਾਣਕਾਰੀ ਦੀ ਲੋੜ ਨਹੀਂ — ਬੱਸ ਆਪਣੇ ਫ਼ੋਨ ਵਿੱਚ ਵੈੱਬਸਾਈਟ ਖੋਲ੍ਹੋ ਤੇ ਇਹ 4 ਸੌਖੇ ਕਦਮ ਚੁੱਕੋ:",
    "gu": "કોઈ ખાસ જ્ઞાનની જરૂર નથી — ફક્ત તમારા ફોનમાં વેબસાઇટ ખોલો અને આ ૪ સરળ પગલાં અનુસરો:",
    "mr": "कोणत्याही तांत्रिक ज्ञानाची गरज नाही — फक्त तुमच्या मोबाईलमध्ये वेबसाइट उघडा आणि हे ४ सोपे टप्पे वापरा:",
    "bn": "কোনো বিশেষ কারিগরি জ্ঞানের প্রয়োজন নেই — আপনার ফোনে সাইটটি খুলুন এবং এই ৪টি সহজ ধাপ অনুসরণ করুন:"
  },
  "किसी विशेष तकनीकी ज्ञान की आवश्यकता नहीं — बस अपने फोन में वेबसाइट खोलें और ये ४ आसान कदम उठाएं:": {
    "hi": "किसी विशेष तकनीकी ज्ञान की आवश्यकता नहीं — बस अपने फोन में वेबसाइट खोलें और ये ४ आसान कदम उठाएं:",
    "en": "No app download needed. Works directly in your mobile browser with zero technical hassle:",
    "pa": "ਕਿਸੇ ਵਿਸ਼ੇਸ਼ ਜਾਣਕਾਰੀ ਦੀ ਲੋੜ ਨਹੀਂ — ਬੱਸ ਆਪਣੇ ਫ਼ੋਨ ਵਿੱਚ ਵੈੱਬਸਾਈਟ ਖੋਲ੍ਹੋ ਤੇ ਇਹ 4 ਸੌਖੇ ਕਦਮ ਚੁੱਕੋ:",
    "gu": "કોઈ ખાસ જ્ઞાનની જરૂર નથી — ફક્ત તમારા ફોનમાં વેબસાઇટ ખોલો અને આ ૪ સરળ પગલાં અનુસરો:",
    "mr": "कोणत्याही तांत्रिक ज्ञानाची गरज नाही — फक्त तुमच्या मोबाईलमध्ये वेबसाइट उघडा आणि हे ४ सोपे टप्पे वापरा:",
    "bn": "কোনো বিশেষ কারিগরি জ্ঞানের প্রয়োজন নেই — আপনার ফোনে সাইটটি খুলুন এবং এই ৪টি সহজ ধাপ অনুসরণ করুন:"
  },
  "ਕਿਸੇ ਵਿਸ਼ੇਸ਼ ਜਾਣਕਾਰੀ ਦੀ ਲੋੜ ਨਹੀਂ — ਬੱਸ ਆਪਣੇ ਫ਼ੋਨ ਵਿੱਚ ਵੈੱਬਸਾਈਟ ਖੋਲ੍ਹੋ ਤੇ ਇਹ 4 ਸੌਖੇ ਕਦਮ ਚੁੱਕੋ:": {
    "hi": "किसी विशेष तकनीकी ज्ञान की आवश्यकता नहीं — बस अपने फोन में वेबसाइट खोलें और ये ४ आसान कदम उठाएं:",
    "en": "No app download needed. Works directly in your mobile browser with zero technical hassle:",
    "pa": "ਕਿਸੇ ਵਿਸ਼ੇਸ਼ ਜਾਣਕਾਰੀ ਦੀ ਲੋੜ ਨਹੀਂ — ਬੱਸ ਆਪਣੇ ਫ਼ੋਨ ਵਿੱਚ ਵੈੱਬਸਾਈਟ ਖੋਲ੍ਹੋ ਤੇ ਇਹ 4 ਸੌਖੇ ਕਦਮ ਚੁੱਕੋ:",
    "gu": "કોઈ ખાસ જ્ઞાનની જરૂર નથી — ફક્ત તમારા ફોનમાં વેબસાઇટ ખોલો અને આ ૪ સરળ પગલાં અનુસરો:",
    "mr": "कोणत्याही तांत्रिक ज्ञानाची गरज नाही — फक्त तुमच्या मोबाईलमध्ये वेबसाइट उघडा आणि हे ४ सोपे टप्पे वापरा:",
    "bn": "কোনো বিশেষ কারিগরি জ্ঞানের প্রয়োজন নেই — আপনার ফোনে সাইটটি খুলুন এবং এই ৪টি সহজ ধাপ অনুসরণ করুন:"
  },
  "Trusted by Real Indian Farmers": {
    "hi": "सच्चे किसानों का भरोसा • 50,000+ Happy Farmers",
    "en": "Trusted by Real Indian Farmers",
    "pa": "ਸੱਚੇ ਕਿਸਾਨਾਂ ਦਾ ਭਰੋਸਾ • 50,000+ Happy Farmers",
    "gu": "વાસ્તવિક ખેડૂતોનો વિશ્વાસ • ૫૦,૦૦૦+ ખેડૂતો",
    "mr": "खऱ्या शेतकऱ्यांचा विश्वास • ५०,००০+ शेतकरी",
    "bn": "ভারতীয় কৃষকদের অটুট আস্থা • ৫০,০০০+ কৃষক"
  },
  "सच्चे किसानों का भरोसा • 50,000+ Happy Farmers": {
    "hi": "सच्चे किसानों का भरोसा • 50,000+ Happy Farmers",
    "en": "Trusted by Real Indian Farmers",
    "pa": "ਸੱਚੇ ਕਿਸਾਨਾਂ ਦਾ ਭਰੋਸਾ • 50,000+ Happy Farmers",
    "gu": "વાસ્તવિક ખેડૂતોનો વિશ્વાસ • ૫૦,૦૦૦+ ખેડૂતો",
    "mr": "खऱ्या शेतकऱ्यांचा विश्वास • ५०,००০+ शेतकरी",
    "bn": "ভারতীয় কৃষকদের অটুট আস্থা • ৫০,০০০+ কৃষক"
  },
  "ਸੱਚੇ ਕਿਸਾਨਾਂ ਦਾ ਭਰੋਸਾ • 50,000+ Happy Farmers": {
    "hi": "सच्चे किसानों का भरोसा • 50,000+ Happy Farmers",
    "en": "Trusted by Real Indian Farmers",
    "pa": "ਸੱਚੇ ਕਿਸਾਨਾਂ ਦਾ ਭਰੋਸਾ • 50,000+ Happy Farmers",
    "gu": "વાસ્તવિક ખેડૂતોનો વિશ્વાસ • ૫૦,૦૦૦+ ખેડૂતો",
    "mr": "खऱ्या शेतकऱ्यांचा विश्वास • ५०,००০+ शेतकरी",
    "bn": "ভারতীয় কৃষকদের অটুট আস্থা • ৫০,০০০+ কৃষক"
  },
  "Real Stories, Real Harvest Profits": {
    "hi": "हमारे किसान भाई-बहन इस प्लेटफॉर्म के बारे में क्या कहते हैं?",
    "en": "Real Stories, Real Harvest Profits",
    "pa": "ਸਾਡੇ ਕਿਸਾਨ ਭੈਣ-ਭਰਾ ਇਸ ਪਲੇਟਫਾਰਮ ਬਾਰੇ ਕੀ ਕਹਿੰਦੇ ਹਨ?",
    "gu": "અમારા ખેડૂત ભાઈ-બહેનો આ પ્લેટફોર્મ વિશે શું કહે છે?",
    "mr": "आमचे शेतकरी बंधू-भगिनी या प्लॅटफॉर्मबद्दल काय म्हणतात?",
    "bn": "আমাদের কৃষক ভাই-বোনেরা এই প্ল্যাটফর্ম সম্পর্কে কী বলছেন?"
  },
  "हमारे किसान भाई-बहन इस प्लेटफॉर्म के बारे में क्या कहते हैं?": {
    "hi": "हमारे किसान भाई-बहन इस प्लेटफॉर्म के बारे में क्या कहते हैं?",
    "en": "Real Stories, Real Harvest Profits",
    "pa": "ਸਾਡੇ ਕਿਸਾਨ ਭੈਣ-ਭਰਾ ਇਸ ਪਲੇਟਫਾਰਮ ਬਾਰੇ ਕੀ ਕਹਿੰਦੇ ਹਨ?",
    "gu": "અમારા ખેડૂત ભાઈ-બહેનો આ પ્લેટફોર્મ વિશે શું કહે છે?",
    "mr": "आमचे शेतकरी बंधू-भगिनी या प्लॅटफॉर्मबद्दल काय म्हणतात?",
    "bn": "আমাদের কৃষক ভাই-বোনেরা এই প্ল্যাটফর্ম সম্পর্কে কী বলছেন?"
  },
  "ਸਾਡੇ ਕਿਸਾਨ ਭੈਣ-ਭਰਾ ਇਸ ਪਲੇਟਫਾਰਮ ਬਾਰੇ ਕੀ ਕਹਿੰਦੇ ਹਨ?": {
    "hi": "हमारे किसान भाई-बहन इस प्लेटफॉर्म के बारे में क्या कहते हैं?",
    "en": "Real Stories, Real Harvest Profits",
    "pa": "ਸਾਡੇ ਕਿਸਾਨ ਭੈਣ-ਭਰਾ ਇਸ ਪਲੇਟਫਾਰਮ ਬਾਰੇ ਕੀ ਕਹਿੰਦੇ ਹਨ?",
    "gu": "અમારા ખેડૂત ભાઈ-બહેનો આ પ્લેટફોર્મ વિશે શું કહે છે?",
    "mr": "आमचे शेतकरी बंधू-भगिनी या प्लॅटफॉर्मबद्दल काय म्हणतात?",
    "bn": "আমাদের কৃষক ভাই-বোনেরা এই প্ল্যাটফর্ম সম্পর্কে কী বলছেন?"
  },
  "See how farmers across India reduced input costs and maximized crop sale profits with AI:": {
    "hi": "पंजाब, मध्य प्रदेश और उत्तर प्रदेश के किसानों ने कैसे अपनी फसल को रोग से बचाया और मंडी में ज्यादा मुनाफा पाया:",
    "en": "See how farmers across India reduced input costs and maximized crop sale profits with AI:",
    "pa": "ਪੰਜਾਬ, ਮੱਧ ਪ੍ਰਦੇਸ਼ ਅਤੇ ਉੱਤਰ ਪ੍ਰਦੇਸ਼ ਦੇ ਕਿਸਾਨਾਂ ਨੇ ਕਿਵੇਂ ਫ਼ਸਲ ਬਚਾਈ ਅਤੇ ਮੰਡੀ ਵਿੱਚ ਵੱਧ ਮੁਨਾਫ਼ਾ ਪਾਇਆ:",
    "gu": "પંજાબ, મધ્ય પ્રદેશ અને ઉત્તર પ્રદેશના ખેડૂતોએ કેવી રીતે પાક બચાવ્યો અને વધુ નફો મેળવ્યો:",
    "mr": "पंजाब, मध्य प्रदेश व उत्तर प्रदेशातील शेतकऱ्यांनी कशी पिके वाचवली आणि बाजारात अधिक नफा मिळवला:",
    "bn": "পাঞ্জাব, মধ্যপ্রদেশ ও উত্তরপ্রদেশের কৃষকেরা কীভাবে ফসল রক্ষা করে মাণ্ডিতে সর্বোচ্চ লাভ অর্জন করেছেন:"
  },
  "पंजाब, मध्य प्रदेश और उत्तर प्रदेश के किसानों ने कैसे अपनी फसल को रोग से बचाया और मंडी में ज्यादा मुनाफा पाया:": {
    "hi": "पंजाब, मध्य प्रदेश और उत्तर प्रदेश के किसानों ने कैसे अपनी फसल को रोग से बचाया और मंडी में ज्यादा मुनाफा पाया:",
    "en": "See how farmers across India reduced input costs and maximized crop sale profits with AI:",
    "pa": "ਪੰਜਾਬ, ਮੱਧ ਪ੍ਰਦੇਸ਼ ਅਤੇ ਉੱਤਰ ਪ੍ਰਦੇਸ਼ ਦੇ ਕਿਸਾਨਾਂ ਨੇ ਕਿਵੇਂ ਫ਼ਸਲ ਬਚਾਈ ਅਤੇ ਮੰਡੀ ਵਿੱਚ ਵੱਧ ਮੁਨਾਫ਼ਾ ਪਾਇਆ:",
    "gu": "પંજાબ, મધ્ય પ્રદેશ અને ઉત્તર પ્રદેશના ખેડૂતોએ કેવી રીતે પાક બચાવ્યો અને વધુ નફો મેળવ્યો:",
    "mr": "पंजाब, मध्य प्रदेश व उत्तर प्रदेशातील शेतकऱ्यांनी कशी पिके वाचवली आणि बाजारात अधिक नफा मिळवला:",
    "bn": "পাঞ্জাব, মধ্যপ্রদেশ ও উত্তরপ্রদেশের কৃষকেরা কীভাবে ফসল রক্ষা করে মাণ্ডিতে সর্বোচ্চ লাভ অর্জন করেছেন:"
  },
  "ਪੰਜਾਬ, ਮੱਧ ਪ੍ਰਦੇਸ਼ ਅਤੇ ਉੱਤਰ ਪ੍ਰਦੇਸ਼ ਦੇ ਕਿਸਾਨਾਂ ਨੇ ਕਿਵੇਂ ਫ਼ਸਲ ਬਚਾਈ ਅਤੇ ਮੰਡੀ ਵਿੱਚ ਵੱਧ ਮੁਨਾਫ਼ਾ ਪਾਇਆ:": {
    "hi": "पंजाब, मध्य प्रदेश और उत्तर प्रदेश के किसानों ने कैसे अपनी फसल को रोग से बचाया और मंडी में ज्यादा मुनाफा पाया:",
    "en": "See how farmers across India reduced input costs and maximized crop sale profits with AI:",
    "pa": "ਪੰਜਾਬ, ਮੱਧ ਪ੍ਰਦੇਸ਼ ਅਤੇ ਉੱਤਰ ਪ੍ਰਦੇਸ਼ ਦੇ ਕਿਸਾਨਾਂ ਨੇ ਕਿਵੇਂ ਫ਼ਸਲ ਬਚਾਈ ਅਤੇ ਮੰਡੀ ਵਿੱਚ ਵੱਧ ਮੁਨਾਫ਼ਾ ਪਾਇਆ:",
    "gu": "પંજાબ, મધ્ય પ્રદેશ અને ઉત્તર પ્રદેશના ખેડૂતોએ કેવી રીતે પાક બચાવ્યો અને વધુ નફો મેળવ્યો:",
    "mr": "पंजाब, मध्य प्रदेश व उत्तर प्रदेशातील शेतकऱ्यांनी कशी पिके वाचवली आणि बाजारात अधिक नफा मिळवला:",
    "bn": "পাঞ্জাব, মধ্যপ্রদেশ ও উত্তরপ্রদেশের কৃষকেরা কীভাবে ফসল রক্ষা করে মাণ্ডিতে সর্বোচ্চ লাভ অর্জন করেছেন:"
  },
  "4.9/5 Average Farmer Rating": {
    "hi": "४.९ / ५ औसत किसान रेटिंग",
    "en": "4.9/5 Average Farmer Rating",
    "pa": "4.9/5 ਔਸਤ ਕਿਸਾਨ ਰੇਟਿੰਗ",
    "gu": "૪.૯ / ૫ સરેરાશ ખેડૂત રેટિંગ",
    "mr": "४.९ / ५ सरासरी शेतकरी रेटिंग",
    "bn": "৪.৯ / ৫ গড় কৃষক সন্তুষ্টি রেটিং"
  },
  "४.९ / ५ औसत किसान रेटिंग": {
    "hi": "४.९ / ५ औसत किसान रेटिंग",
    "en": "4.9/5 Average Farmer Rating",
    "pa": "4.9/5 ਔਸਤ ਕਿਸਾਨ ਰੇਟਿੰਗ",
    "gu": "૪.૯ / ૫ સરેરાશ ખેડૂત રેટિંગ",
    "mr": "४.९ / ५ सरासरी शेतकरी रेटिंग",
    "bn": "৪.৯ / ৫ গড় কৃষক সন্তুষ্টি রেটিং"
  },
  "4.9/5 ਔਸਤ ਕਿਸਾਨ ਰੇਟਿੰਗ": {
    "hi": "४.९ / ५ औसत किसान रेटिंग",
    "en": "4.9/5 Average Farmer Rating",
    "pa": "4.9/5 ਔਸਤ ਕਿਸਾਨ ਰੇਟਿੰਗ",
    "gu": "૪.૯ / ૫ સરેરાશ ખેડૂત રેટિંગ",
    "mr": "४.९ / ५ सरासरी शेतकरी रेटिंग",
    "bn": "৪.৯ / ৫ গড় কৃষক সন্তুষ্টি রেটিং"
  },
  "50,000+ Verified Farmers": {
    "hi": "५०,०००+ पंजीकृत किसान",
    "en": "50,000+ Verified Farmers",
    "pa": "50,000+ ਤਸਦੀਕਸ਼ੁਦਾ ਕਿਸਾਨ",
    "gu": "૫૦,૦૦૦+ ચકાસાયેલ ખેડૂતો",
    "mr": "५०,००০+ पडताळणी झालेले शेतकरी",
    "bn": "৫০,০০০+ নিবন্ধিত কৃষক"
  },
  "५०,०००+ पंजीकृत किसान": {
    "hi": "५०,०००+ पंजीकृत किसान",
    "en": "50,000+ Verified Farmers",
    "pa": "50,000+ ਤਸਦੀਕਸ਼ੁਦਾ ਕਿਸਾਨ",
    "gu": "૫૦,૦૦૦+ ચકાસાયેલ ખેડૂતો",
    "mr": "५०,००০+ पडताळणी झालेले शेतकरी",
    "bn": "৫০,০০০+ নিবন্ধিত কৃষক"
  },
  "50,000+ ਤਸਦੀਕਸ਼ੁਦਾ ਕਿਸਾਨ": {
    "hi": "५०,०००+ पंजीकृत किसान",
    "en": "50,000+ Verified Farmers",
    "pa": "50,000+ ਤਸਦੀਕਸ਼ੁਦਾ ਕਿਸਾਨ",
    "gu": "૫૦,૦૦૦+ ચકાસાયેલ ખેડૂતો",
    "mr": "५०,००০+ पडताळणी झालेले शेतकरी",
    "bn": "৫০,০০০+ নিবন্ধিত কৃষক"
  },
  "2,400+ Daily Mandis Connected": {
    "hi": "२,४००+ दैनिक सरकारी मंडियां",
    "en": "2,400+ Daily Mandis Connected",
    "pa": "2,400+ ਰੋਜ਼ਾਨਾ ਸਰਕਾਰੀ ਮੰਡੀਆਂ",
    "gu": "૨,૪૦૦+ દૈનિક સરકારી યાર્ડ જોડાયેલા",
    "mr": "२,४००+ दैनिक बाजार समित्या जोडलेल्या",
    "bn": "২,৪০০+ সরকারি মাণ্ডি সংযুক্ত"
  },
  "२,४००+ दैनिक सरकारी मंडियां": {
    "hi": "२,४००+ दैनिक सरकारी मंडियां",
    "en": "2,400+ Daily Mandis Connected",
    "pa": "2,400+ ਰੋਜ਼ਾਨਾ ਸਰਕਾਰੀ ਮੰਡੀਆਂ",
    "gu": "૨,૪૦૦+ દૈનિક સરકારી યાર્ડ જોડાયેલા",
    "mr": "२,४००+ दैनिक बाजार समित्या जोडलेल्या",
    "bn": "২,৪০০+ সরকারি মাণ্ডি সংযুক্ত"
  },
  "2,400+ ਰੋਜ਼ਾਨਾ ਸਰਕਾਰੀ ਮੰਡੀਆਂ": {
    "hi": "२,४००+ दैनिक सरकारी मंडियां",
    "en": "2,400+ Daily Mandis Connected",
    "pa": "2,400+ ਰੋਜ਼ਾਨਾ ਸਰਕਾਰੀ ਮੰਡੀਆਂ",
    "gu": "૨,૪૦૦+ દૈનિક સરકારી યાર્ડ જોડાયેલા",
    "mr": "२,४००+ दैनिक बाजार समित्या जोडलेल्या",
    "bn": "২,৪০০+ সরকারি মাণ্ডি সংযুক্ত"
  },
  "Got Questions? We Have Answers": {
    "hi": "सामान्य प्रश्न • FAQ",
    "en": "Got Questions? We Have Answers",
    "pa": "ਆਮ ਸਵਾਲ • FAQ",
    "gu": "સામાન્ય પ્રશ્નો • FAQ",
    "mr": "नेहमीचे प्रश्न • FAQ",
    "bn": "সাধারণ প্রশ্নোত্তর • FAQ"
  },
  "सामान्य प्रश्न • FAQ": {
    "hi": "सामान्य प्रश्न • FAQ",
    "en": "Got Questions? We Have Answers",
    "pa": "ਆਮ ਸਵਾਲ • FAQ",
    "gu": "સામાન્ય પ્રશ્નો • FAQ",
    "mr": "नेहमीचे प्रश्न • FAQ",
    "bn": "সাধারণ প্রশ্নোত্তর • FAQ"
  },
  "ਆਮ ਸਵਾਲ • FAQ": {
    "hi": "सामान्य प्रश्न • FAQ",
    "en": "Got Questions? We Have Answers",
    "pa": "ਆਮ ਸਵਾਲ • FAQ",
    "gu": "સામાન્ય પ્રશ્નો • FAQ",
    "mr": "नेहमीचे प्रश्न • FAQ",
    "bn": "সাধারণ প্রশ্নোত্তর • FAQ"
  },
  "Frequently Asked Questions": {
    "hi": "अक्सर पूछे जाने वाले सवाल",
    "en": "Frequently Asked Questions",
    "pa": "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ",
    "gu": "વારંવાર પૂછાતા પ્રશ્નો",
    "mr": "वारंवार विचारले जाणारे प्रश्न",
    "bn": "সচরাচর জিজ্ঞাস্য প্রশ্নাবলী"
  },
  "अक्सर पूछे जाने वाले सवाल": {
    "hi": "अक्सर पूछे जाने वाले सवाल",
    "en": "Frequently Asked Questions",
    "pa": "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ",
    "gu": "વારંવાર પૂછાતા પ્રશ્નો",
    "mr": "वारंवार विचारले जाणारे प्रश्न",
    "bn": "সচরাচর জিজ্ঞাস্য প্রশ্নাবলী"
  },
  "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ": {
    "hi": "अक्सर पूछे जाने वाले सवाल",
    "en": "Frequently Asked Questions",
    "pa": "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ",
    "gu": "વારંવાર પૂછાતા પ્રશ્નો",
    "mr": "वारंवार विचारले जाणारे प्रश्न",
    "bn": "সচরাচর জিজ্ঞাস্য প্রশ্নাবলী"
  },
  "Everything you need to know about the AI doctor, wholesale mandi rates, and 1551 helpline:": {
    "hi": "एआई फसल डॉक्टर, मंडी भाव, मौसम और सरकारी हेल्पलाइन से जुड़े आपके सभी सवालों के जवाब:",
    "en": "Everything you need to know about the AI doctor, wholesale mandi rates, and 1551 helpline:",
    "pa": "ਏਆਈ ਫ਼ਸਲ ਡਾਕਟਰ, ਮੰਡੀ ਭਾਅ, ਮੌਸਮ ਅਤੇ ਸਰਕਾਰੀ ਹੈਲਪਲਾਈਨ ਸੰਬੰਧੀ ਤੁਹਾਡੇ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ:",
    "gu": "એઆઈ ડોક્ટર, યાર્ડ ભાવ, હવામાન અને સરકારી હેલ્પલાઇન અંગેના તમારા તમામ પ્રશ્નોના જવાબો:",
    "mr": "एआय पीक डॉक्टर, बाजार भाव, हवामान आणि शासकीय हेल्पलाइनबाबत आपल्या सर्व प्रश्नांची उत्तरे:",
    "bn": "এআই ফসল ডাক্তার, মাণ্ডি দর, আবহাওয়া এবং সরকারি হেল্পলাইন সম্পর্কিত প্রয়োজনীয় তথ্যাবলী:"
  },
  "एआई फसल डॉक्टर, मंडी भाव, मौसम और सरकारी हेल्पलाइन से जुड़े आपके सभी सवालों के जवाब:": {
    "hi": "एआई फसल डॉक्टर, मंडी भाव, मौसम और सरकारी हेल्पलाइन से जुड़े आपके सभी सवालों के जवाब:",
    "en": "Everything you need to know about the AI doctor, wholesale mandi rates, and 1551 helpline:",
    "pa": "ਏਆਈ ਫ਼ਸਲ ਡਾਕਟਰ, ਮੰਡੀ ਭਾਅ, ਮੌਸਮ ਅਤੇ ਸਰਕਾਰੀ ਹੈਲਪਲਾਈਨ ਸੰਬੰਧੀ ਤੁਹਾਡੇ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ:",
    "gu": "એઆઈ ડોક્ટર, યાર્ડ ભાવ, હવામાન અને સરકારી હેલ્પલાઇન અંગેના તમારા તમામ પ્રશ્નોના જવાબો:",
    "mr": "एआय पीक डॉक्टर, बाजार भाव, हवामान आणि शासकीय हेल्पलाइनबाबत आपल्या सर्व प्रश्नांची उत्तरे:",
    "bn": "এআই ফসল ডাক্তার, মাণ্ডি দর, আবহাওয়া এবং সরকারি হেল্পলাইন সম্পর্কিত প্রয়োজনীয় তথ্যাবলী:"
  },
  "ਏਆਈ ਫ਼ਸਲ ਡਾਕਟਰ, ਮੰਡੀ ਭਾਅ, ਮੌਸਮ ਅਤੇ ਸਰਕਾਰੀ ਹੈਲਪਲਾਈਨ ਸੰਬੰਧੀ ਤੁਹਾਡੇ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ:": {
    "hi": "एआई फसल डॉक्टर, मंडी भाव, मौसम और सरकारी हेल्पलाइन से जुड़े आपके सभी सवालों के जवाब:",
    "en": "Everything you need to know about the AI doctor, wholesale mandi rates, and 1551 helpline:",
    "pa": "ਏਆਈ ਫ਼ਸਲ ਡਾਕਟਰ, ਮੰਡੀ ਭਾਅ, ਮੌਸਮ ਅਤੇ ਸਰਕਾਰੀ ਹੈਲਪਲਾਈਨ ਸੰਬੰਧੀ ਤੁਹਾਡੇ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ:",
    "gu": "એઆઈ ડોક્ટર, યાર્ડ ભાવ, હવામાન અને સરકારી હેલ્પલાઇન અંગેના તમારા તમામ પ્રશ્નોના જવાબો:",
    "mr": "एआय पीक डॉक्टर, बाजार भाव, हवामान आणि शासकीय हेल्पलाइनबाबत आपल्या सर्व प्रश्नांची उत्तरे:",
    "bn": "এআই ফসল ডাক্তার, মাণ্ডি দর, আবহাওয়া এবং সরকারি হেল্পলাইন সম্পর্কিত প্রয়োজনীয় তথ্যাবলী:"
  },
  "Still have more questions about your crops or schemes?": {
    "hi": "क्या आपका सवाल यहाँ सूचीबद्ध नहीं है?",
    "en": "Still have more questions about your crops or schemes?",
    "pa": "ਕੀ ਤੁਹਾਡਾ ਸਵਾਲ ਇੱਥੇ ਸ਼ਾਮਲ ਨਹੀਂ ਹੈ?",
    "gu": "શું તમારો કોઈ પ્રશ્ન હજી બાકી છે?",
    "mr": "तुमचा प्रश्न येथे सूचीबद्ध नाही का?",
    "bn": "আপনার কি ফসল বা সরকারি প্রকল্প সম্পর্কে আরও কিছু জানার আছে?"
  },
  "क्या आपका सवाल यहाँ सूचीबद्ध नहीं है?": {
    "hi": "क्या आपका सवाल यहाँ सूचीबद्ध नहीं है?",
    "en": "Still have more questions about your crops or schemes?",
    "pa": "ਕੀ ਤੁਹਾਡਾ ਸਵਾਲ ਇੱਥੇ ਸ਼ਾਮਲ ਨਹੀਂ ਹੈ?",
    "gu": "શું તમારો કોઈ પ્રશ્ન હજી બાકી છે?",
    "mr": "तुमचा प्रश्न येथे सूचीबद्ध नाही का?",
    "bn": "আপনার কি ফসল বা সরকারি প্রকল্প সম্পর্কে আরও কিছু জানার আছে?"
  },
  "ਕੀ ਤੁਹਾਡਾ ਸਵਾਲ ਇੱਥੇ ਸ਼ਾਮਲ ਨਹੀਂ ਹੈ?": {
    "hi": "क्या आपका सवाल यहाँ सूचीबद्ध नहीं है?",
    "en": "Still have more questions about your crops or schemes?",
    "pa": "ਕੀ ਤੁਹਾਡਾ ਸਵਾਲ ਇੱਥੇ ਸ਼ਾਮਲ ਨਹੀਂ ਹੈ?",
    "gu": "શું તમારો કોઈ પ્રશ્ન હજી બાકી છે?",
    "mr": "तुमचा प्रश्न येथे सूचीबद्ध नाही का?",
    "bn": "আপনার কি ফসল বা সরকারি প্রকল্প সম্পর্কে আরও কিছু জানার আছে?"
  },
  "Call Kisan Call Center 1551 (Toll-Free) anytime to consult directly with government agriculture scientists.": {
    "hi": "किसान कॉल सेंटर 1551 (टोल-फ्री) पर कभी भी कॉल करें और सीधे कृषि वैज्ञानिकों से मुफ्त बात करें।",
    "en": "Call Kisan Call Center 1551 (Toll-Free) anytime to consult directly with government agriculture scientists.",
    "pa": "ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ 1551 (ਟੋਲ-ਫ੍ਰੀ) ਤੇ ਕਦੇ ਵੀ ਕਾਲ ਕਰੋ ਅਤੇ ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨੀਆਂ ਨਾਲ ਮੁਫ਼ਤ ਗੱਲ ਕਰੋ।",
    "gu": "સરકારી કૃષિ વૈજ્ઞાનિકો સાથે સીધી મફત વાત કરવા માટે કિસાન કોલ સેન્ટર ૧૫૫૧ (ટોલ-ફ્રી) પર ગમે ત્યારે કોલ કરો.",
    "mr": "शासकीय कृषी वैज्ञानिकांशी थेट मोफत चर्चा करण्यासाठी किसान कॉल सेंटर १५५१ (टोल-फ्री) वर कधीही संपर्क साधा.",
    "bn": "সরকারি কৃষি বিজ্ঞানীদের সাথে সরাসরি বিনামূল্যে পরামর্শ করতে যেকোনো সময় ১৫৫১ (টোল-ফ্রি) নম্বরে কল করুন।"
  },
  "किसान कॉल सेंटर 1551 (टोल-फ्री) पर कभी भी कॉल करें और सीधे कृषि वैज्ञानिकों से मुफ्त बात करें।": {
    "hi": "किसान कॉल सेंटर 1551 (टोल-फ्री) पर कभी भी कॉल करें और सीधे कृषि वैज्ञानिकों से मुफ्त बात करें।",
    "en": "Call Kisan Call Center 1551 (Toll-Free) anytime to consult directly with government agriculture scientists.",
    "pa": "ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ 1551 (ਟੋਲ-ਫ੍ਰੀ) ਤੇ ਕਦੇ ਵੀ ਕਾਲ ਕਰੋ ਅਤੇ ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨੀਆਂ ਨਾਲ ਮੁਫ਼ਤ ਗੱਲ ਕਰੋ।",
    "gu": "સરકારી કૃષિ વૈજ્ઞાનિકો સાથે સીધી મફત વાત કરવા માટે કિસાન કોલ સેન્ટર ૧૫૫૧ (ટોલ-ફ્રી) પર ગમે ત્યારે કોલ કરો.",
    "mr": "शासकीय कृषी वैज्ञानिकांशी थेट मोफत चर्चा करण्यासाठी किसान कॉल सेंटर १५५१ (टोल-फ्री) वर कधीही संपर्क साधा.",
    "bn": "সরকারি কৃষি বিজ্ঞানীদের সাথে সরাসরি বিনামূল্যে পরামর্শ করতে যেকোনো সময় ১৫৫১ (টোল-ফ্রি) নম্বরে কল করুন।"
  },
  "ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ 1551 (ਟੋਲ-ਫ੍ਰੀ) ਤੇ ਕਦੇ ਵੀ ਕਾਲ ਕਰੋ ਅਤੇ ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨੀਆਂ ਨਾਲ ਮੁਫ਼ਤ ਗੱਲ ਕਰੋ।": {
    "hi": "किसान कॉल सेंटर 1551 (टोल-फ्री) पर कभी भी कॉल करें और सीधे कृषि वैज्ञानिकों से मुफ्त बात करें।",
    "en": "Call Kisan Call Center 1551 (Toll-Free) anytime to consult directly with government agriculture scientists.",
    "pa": "ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ 1551 (ਟੋਲ-ਫ੍ਰੀ) ਤੇ ਕਦੇ ਵੀ ਕਾਲ ਕਰੋ ਅਤੇ ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨੀਆਂ ਨਾਲ ਮੁਫ਼ਤ ਗੱਲ ਕਰੋ।",
    "gu": "સરકારી કૃષિ વૈજ્ઞાનિકો સાથે સીધી મફત વાત કરવા માટે કિસાન કોલ સેન્ટર ૧૫૫૧ (ટોલ-ફ્રી) પર ગમે ત્યારે કોલ કરો.",
    "mr": "शासकीय कृषी वैज्ञानिकांशी थेट मोफत चर्चा करण्यासाठी किसान कॉल सेंटर १५५१ (टोल-फ्री) वर कधीही संपर्क साधा.",
    "bn": "সরকারি কৃষি বিজ্ঞানীদের সাথে সরাসরি বিনামূল্যে পরামর্শ করতে যেকোনো সময় ১৫৫১ (টোল-ফ্রি) নম্বরে কল করুন।"
  },
  "Govt of India Free Kisan Helpline": {
    "hi": "भारत सरकार निःशुल्क किसान हेल्पलाइन",
    "en": "Govt of India Free Kisan Helpline",
    "pa": "ਭਾਰਤ ਸਰਕਾਰ ਮੁਫ਼ਤ ਕਿਸਾਨ ਹੈਲਪਲਾਈਨ",
    "gu": "ભારત સરકાર મફત કિસાન હેલ્પલાઇન",
    "mr": "भारत सरकार मोफत शेतकरी हेल्पलाइन",
    "bn": "ভারত সরকার বিনামূল্যে কৃষক হেল্পলাইন"
  },
  "भारत सरकार निःशुल्क किसान हेल्पलाइन": {
    "hi": "भारत सरकार निःशुल्क किसान हेल्पलाइन",
    "en": "Govt of India Free Kisan Helpline",
    "pa": "ਭਾਰਤ ਸਰਕਾਰ ਮੁਫ਼ਤ ਕਿਸਾਨ ਹੈਲਪਲਾਈਨ",
    "gu": "ભારત સરકાર મફત કિસાન હેલ્પલાઇન",
    "mr": "भारत सरकार मोफत शेतकरी हेल्पलाइन",
    "bn": "ভারত সরকার বিনামূল্যে কৃষক হেল্পলাইন"
  },
  "ਭਾਰਤ ਸਰਕਾਰ ਮੁਫ਼ਤ ਕਿਸਾਨ ਹੈਲਪਲਾਈਨ": {
    "hi": "भारत सरकार निःशुल्क किसान हेल्पलाइन",
    "en": "Govt of India Free Kisan Helpline",
    "pa": "ਭਾਰਤ ਸਰਕਾਰ ਮੁਫ਼ਤ ਕਿਸਾਨ ਹੈਲਪਲਾਈਨ",
    "gu": "ભારત સરકાર મફત કિસાન હેલ્પલાઇન",
    "mr": "भारत सरकार मोफत शेतकरी हेल्पलाइन",
    "bn": "ভারত সরকার বিনামূল্যে কৃষক হেল্পলাইন"
  },
  "Any Crop Problem? Talk to Expert at 1551": {
    "hi": "फसल की कोई भी समस्या हो? डायल करें: 1551",
    "en": "Any Crop Problem? Talk to Expert at 1551",
    "pa": "ਫ਼ਸਲ ਦੀ ਕੋਈ ਵੀ ਸਮੱਸਿਆ ਹੋਵੇ? ਡਾਇਲ ਕਰੋ: 1551",
    "gu": "પાકમાં કોઈ પણ સમસ્યા હોય? ડાયલ કરો: ૧૫૫૧",
    "mr": "पिकांची कोणतीही समस्या असो? डायल करा: १५५૧",
    "bn": "ফসলের যেকোনো সমস্যায় সরাসরি ডায়াল করুন: ১৫৫১"
  },
  "फसल की कोई भी समस्या हो? डायल करें: 1551": {
    "hi": "फसल की कोई भी समस्या हो? डायल करें: 1551",
    "en": "Any Crop Problem? Talk to Expert at 1551",
    "pa": "ਫ਼ਸਲ ਦੀ ਕੋਈ ਵੀ ਸਮੱਸਿਆ ਹੋਵੇ? ਡਾਇਲ ਕਰੋ: 1551",
    "gu": "પાકમાં કોઈ પણ સમસ્યા હોય? ડાયલ કરો: ૧૫૫૧",
    "mr": "पिकांची कोणतीही समस्या असो? डायल करा: १५५૧",
    "bn": "ফসলের যেকোনো সমস্যায় সরাসরি ডায়াল করুন: ১৫৫১"
  },
  "ਫ਼ਸਲ ਦੀ ਕੋਈ ਵੀ ਸਮੱਸਿਆ ਹੋਵੇ? ਡਾਇਲ ਕਰੋ: 1551": {
    "hi": "फसल की कोई भी समस्या हो? डायल करें: 1551",
    "en": "Any Crop Problem? Talk to Expert at 1551",
    "pa": "ਫ਼ਸਲ ਦੀ ਕੋਈ ਵੀ ਸਮੱਸਿਆ ਹੋਵੇ? ਡਾਇਲ ਕਰੋ: 1551",
    "gu": "પાકમાં કોઈ પણ સમસ્યા હોય? ડાયલ કરો: ૧૫૫૧",
    "mr": "पिकांची कोणतीही समस्या असो? डायल करा: १५५૧",
    "bn": "ফসলের যেকোনো সমস্যায় সরাসরি ডায়াল করুন: ১৫৫১"
  },
  "Toll-free 24x7 government assistance for crop diseases, seed subsidies, PM-Kisan queries, and emergency farm support.": {
    "hi": "कीट, रोग, खाद सब्सिडी और फसल बीमा के लिए सीधे कृषि वैज्ञानिक से मुफ्त बात करें।",
    "en": "Toll-free 24x7 government assistance for crop diseases, seed subsidies, PM-Kisan queries, and emergency farm support.",
    "pa": "ਕੀੜੇ, ਰੋਗ, ਖਾਦ ਸਬਸਿਡੀ ਅਤੇ ਫ਼ਸਲ ਬੀਮੇ ਲਈ ਸਿੱਧੇ ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨੀ ਨਾਲ ਮੁਫ਼ਤ ਗੱਲ ਕਰੋ।",
    "gu": "કીટકો, રોગો, ખાતર સબસિડી અને પાક વીમા માટે સીધા કૃષિ વૈજ્ઞાનિક સાથે મફત વાત કરો.",
    "mr": "कीड, रोग, खत सबसिडी आणि पीक विम्यासाठी थेट कृषी शास्त्रज्ञांशी मोफत बोला.",
    "bn": "কীটপতঙ্গ, ফসলের রোগ, সার ভর্তুকি ও পিএম ফসল বিমার জন্য সরাসরি কৃষি বিশেষজ্ঞদের সাথে কথা বলুন।"
  },
  "कीट, रोग, खाद सब्सिडी और फसल बीमा के लिए सीधे कृषि वैज्ञानिक से मुफ्त बात करें।": {
    "hi": "कीट, रोग, खाद सब्सिडी और फसल बीमा के लिए सीधे कृषि वैज्ञानिक से मुफ्त बात करें।",
    "en": "Toll-free 24x7 government assistance for crop diseases, seed subsidies, PM-Kisan queries, and emergency farm support.",
    "pa": "ਕੀੜੇ, ਰੋਗ, ਖਾਦ ਸਬਸਿਡੀ ਅਤੇ ਫ਼ਸਲ ਬੀਮੇ ਲਈ ਸਿੱਧੇ ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨੀ ਨਾਲ ਮੁਫ਼ਤ ਗੱਲ ਕਰੋ।",
    "gu": "કીટકો, રોગો, ખાતર સબસિડી અને પાક વીમા માટે સીધા કૃષિ વૈજ્ઞાનિક સાથે મફત વાત કરો.",
    "mr": "कीड, रोग, खत सबसिडी आणि पीक विम्यासाठी थेट कृषी शास्त्रज्ञांशी मोफत बोला.",
    "bn": "কীটপতঙ্গ, ফসলের রোগ, সার ভর্তুকি ও পিএম ফসল বিমার জন্য সরাসরি কৃষি বিশেষজ্ঞদের সাথে কথা বলুন।"
  },
  "ਕੀੜੇ, ਰੋਗ, ਖਾਦ ਸਬਸਿਡੀ ਅਤੇ ਫ਼ਸਲ ਬੀਮੇ ਲਈ ਸਿੱਧੇ ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨੀ ਨਾਲ ਮੁਫ਼ਤ ਗੱਲ ਕਰੋ।": {
    "hi": "कीट, रोग, खाद सब्सिडी और फसल बीमा के लिए सीधे कृषि वैज्ञानिक से मुफ्त बात करें।",
    "en": "Toll-free 24x7 government assistance for crop diseases, seed subsidies, PM-Kisan queries, and emergency farm support.",
    "pa": "ਕੀੜੇ, ਰੋਗ, ਖਾਦ ਸਬਸਿਡੀ ਅਤੇ ਫ਼ਸਲ ਬੀਮੇ ਲਈ ਸਿੱਧੇ ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨੀ ਨਾਲ ਮੁਫ਼ਤ ਗੱਲ ਕਰੋ।",
    "gu": "કીટકો, રોગો, ખાતર સબસિડી અને પાક વીમા માટે સીધા કૃષિ વૈજ્ઞાનિક સાથે મફત વાત કરો.",
    "mr": "कीड, रोग, खत सबसिडी आणि पीक विम्यासाठी थेट कृषी शास्त्रज्ञांशी मोफत बोला.",
    "bn": "কীটপতঙ্গ, ফসলের রোগ, সার ভর্তুকি ও পিএম ফসল বিমার জন্য সরাসরি কৃষি বিশেষজ্ঞদের সাথে কথা বলুন।"
  },
  "Call 1551 Toll-Free": {
    "hi": "अभी 1551 पर कॉल करें",
    "en": "Call 1551 Toll-Free",
    "pa": "ਹੁਣੇ 1551 ਤੇ ਕਾਲ ਕਰੋ",
    "gu": "હમણાં ૧૫૫૧ પર કોલ કરો",
    "mr": "आत्ताच १५५૧ वर कॉल करा",
    "bn": "এখনই ১৫৫১ নম্বরে বিনামূল্যে কল করুন"
  },
  "अभी 1551 पर कॉल करें": {
    "hi": "अभी 1551 पर कॉल करें",
    "en": "Call 1551 Toll-Free",
    "pa": "ਹੁਣੇ 1551 ਤੇ ਕਾਲ ਕਰੋ",
    "gu": "હમણાં ૧૫૫૧ પર કોલ કરો",
    "mr": "आत्ताच १५५૧ वर कॉल करा",
    "bn": "এখনই ১৫৫১ নম্বরে বিনামূল্যে কল করুন"
  },
  "ਹੁਣੇ 1551 ਤੇ ਕਾਲ ਕਰੋ": {
    "hi": "अभी 1551 पर कॉल करें",
    "en": "Call 1551 Toll-Free",
    "pa": "ਹੁਣੇ 1551 ਤੇ ਕਾਲ ਕਰੋ",
    "gu": "હમણાં ૧૫૫૧ પર કોલ કરો",
    "mr": "आत्ताच १५५૧ वर कॉल करा",
    "bn": "এখনই ১৫৫১ নম্বরে বিনামূল্যে কল করুন"
  },
  "Agro Dashboard": {
    "hi": "🌾 किसान डैशबोर्ड",
    "en": "Agro Dashboard",
    "pa": "🌾 ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ",
    "gu": "🌾 ખેડૂત ડેશબોર્ડ",
    "mr": "🌾 शेतकरी डॅशबोर्ड",
    "bn": "🌾 কৃষক ড্যাশবোর্ড"
  },
  "🌾 किसान डैशबोर्ड": {
    "hi": "🌾 किसान डैशबोर्ड",
    "en": "Agro Dashboard",
    "pa": "🌾 ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ",
    "gu": "🌾 ખેડૂત ડેશબોર્ડ",
    "mr": "🌾 शेतकरी डॅशबोर्ड",
    "bn": "🌾 কৃষক ড্যাশবোর্ড"
  },
  "🌾 ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ": {
    "hi": "🌾 किसान डैशबोर्ड",
    "en": "Agro Dashboard",
    "pa": "🌾 ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ",
    "gu": "🌾 ખેડૂત ડેશબોર્ડ",
    "mr": "🌾 शेतकरी डॅशबोर्ड",
    "bn": "🌾 কৃষক ড্যাশবোর্ড"
  },
  "AI Crop Doctor": {
    "hi": "🩺 एआई फसल डॉक्टर",
    "en": "AI Crop Doctor",
    "pa": "🩺 ਏਆਈ ਫ਼ਸਲ ਡਾਕਟਰ",
    "gu": "🩺 એઆઈ પાક ડોક્ટર",
    "mr": "🩺 एआय पीक डॉक्टर",
    "bn": "🩺 এআই ফসল ডাক্তার"
  },
  "🩺 एआई फसल डॉक्टर": {
    "hi": "🩺 एआई फसल डॉक्टर",
    "en": "AI Crop Doctor",
    "pa": "🩺 ਏਆਈ ਫ਼ਸਲ ਡਾਕਟਰ",
    "gu": "🩺 એઆઈ પાક ડોક્ટર",
    "mr": "🩺 एआय पीक डॉक्टर",
    "bn": "🩺 এআই ফসল ডাক্তার"
  },
  "🩺 ਏਆਈ ਫ਼ਸਲ ਡਾਕਟਰ": {
    "hi": "🩺 एआई फसल डॉक्टर",
    "en": "AI Crop Doctor",
    "pa": "🩺 ਏਆਈ ਫ਼ਸਲ ਡਾਕਟਰ",
    "gu": "🩺 એઆઈ પાક ડોક્ટર",
    "mr": "🩺 एआय पीक डॉक्टर",
    "bn": "🩺 এআই ফসল ডাক্তার"
  },
  "Mandi Rates": {
    "hi": "💵 मंडी भाव (MSP)",
    "en": "Mandi Rates",
    "pa": "💵 ਮੰਡੀ ਭਾਅ (MSP)",
    "gu": "💵 યાર્ડ ભાવ (MSP)",
    "mr": "💵 बाजार भाव (MSP)",
    "bn": "💵 মাণ্ডি দর (MSP)"
  },
  "💵 मंडी भाव (MSP)": {
    "hi": "💵 मंडी भाव (MSP)",
    "en": "Mandi Rates",
    "pa": "💵 ਮੰਡੀ ਭਾਅ (MSP)",
    "gu": "💵 યાર્ડ ભાવ (MSP)",
    "mr": "💵 बाजार भाव (MSP)",
    "bn": "💵 মাণ্ডি দর (MSP)"
  },
  "💵 ਮੰਡੀ ਭਾਅ (MSP)": {
    "hi": "💵 मंडी भाव (MSP)",
    "en": "Mandi Rates",
    "pa": "💵 ਮੰਡੀ ਭਾਅ (MSP)",
    "gu": "💵 યાર્ડ ભાવ (MSP)",
    "mr": "💵 बाजार भाव (MSP)",
    "bn": "💵 মাণ্ডি দর (MSP)"
  },
  "Crop Calendar": {
    "hi": "📅 बुवाई कैलेंडर",
    "en": "Crop Calendar",
    "pa": "📅 ਬਿਜਾਈ ਕੈਲੰਡਰ",
    "gu": "📅 વાવણી કેલેન્ડર",
    "mr": "📅 पेरणी कॅलेंडर",
    "bn": "📅 বপন ক্যালেন্ডার"
  },
  "📅 बुवाई कैलेंडर": {
    "hi": "📅 बुवाई कैलेंडर",
    "en": "Crop Calendar",
    "pa": "📅 ਬਿਜਾਈ ਕੈਲੰਡਰ",
    "gu": "📅 વાવણી કેલેન્ડર",
    "mr": "📅 पेरणी कॅलेंडर",
    "bn": "📅 বপন ক্যালেন্ডার"
  },
  "📅 ਬਿਜਾਈ ਕੈਲੰਡਰ": {
    "hi": "📅 बुवाई कैलेंडर",
    "en": "Crop Calendar",
    "pa": "📅 ਬਿਜਾਈ ਕੈਲੰਡਰ",
    "gu": "📅 વાવણી કેલેન્ડર",
    "mr": "📅 पेरणी कॅलेंडर",
    "bn": "📅 বপন ক্যালেন্ডার"
  },
  "Soil Health": {
    "hi": "🧪 मृदा स्वास्थ्य",
    "en": "Soil Health",
    "pa": "🧪 ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ",
    "gu": "🧪 જમીન આરોગ્ય",
    "mr": "🧪 मृदा आरोग्य",
    "bn": "🧪 মাটি স্বাস্থ্য"
  },
  "🧪 मृदा स्वास्थ्य": {
    "hi": "🧪 मृदा स्वास्थ्य",
    "en": "Soil Health",
    "pa": "🧪 ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ",
    "gu": "🧪 જમીન આરોગ્ય",
    "mr": "🧪 मृदा आरोग्य",
    "bn": "🧪 মাটি স্বাস্থ্য"
  },
  "🧪 ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ": {
    "hi": "🧪 मृदा स्वास्थ्य",
    "en": "Soil Health",
    "pa": "🧪 ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ",
    "gu": "🧪 જમીન આરોગ્ય",
    "mr": "🧪 मृदा आरोग्य",
    "bn": "🧪 মাটি স্বাস্থ্য"
  },
  "Govt Schemes": {
    "hi": "🏛️ सरकारी योजनाएं",
    "en": "Govt Schemes",
    "pa": "🏛️ ਸਰਕਾਰੀ ਸਕੀਮਾਂ",
    "gu": "🏛️ સરકારી યોજનાઓ",
    "mr": "🏛️ शासकीय योजना",
    "bn": "🏛️ সরকারি প্রকল্প"
  },
  "🏛️ सरकारी योजनाएं": {
    "hi": "🏛️ सरकारी योजनाएं",
    "en": "Govt Schemes",
    "pa": "🏛️ ਸਰਕਾਰੀ ਸਕੀਮਾਂ",
    "gu": "🏛️ સરકારી યોજનાઓ",
    "mr": "🏛️ शासकीय योजना",
    "bn": "🏛️ সরকারি প্রকল্প"
  },
  "🏛️ ਸਰਕਾਰੀ ਸਕੀਮਾਂ": {
    "hi": "🏛️ सरकारी योजनाएं",
    "en": "Govt Schemes",
    "pa": "🏛️ ਸਰਕਾਰੀ ਸਕੀਮਾਂ",
    "gu": "🏛️ સરકારી યોજનાઓ",
    "mr": "🏛️ शासकीय योजना",
    "bn": "🏛️ সরকারি প্রকল্প"
  },
  "Advisory Note & Disclaimer:": {
    "hi": "किसानों के लिए सलाह व अस्वीकरण:",
    "en": "Advisory Note & Disclaimer:",
    "pa": "ਕਿਸਾਨਾਂ ਲਈ ਸਲਾਹ ਤੇ ਬੇਦਾਅਵਾ:",
    "gu": "ખેડૂતો માટે સલાહ અને અસ્વીકરણ:",
    "mr": "शेतकऱ्यांसाठी सल्ला व अस्वीकरण:",
    "bn": "কৃষকদের জন্য পরামর্শ ও সতর্কতা:"
  },
  "किसानों के लिए सलाह व अस्वीकरण:": {
    "hi": "किसानों के लिए सलाह व अस्वीकरण:",
    "en": "Advisory Note & Disclaimer:",
    "pa": "ਕਿਸਾਨਾਂ ਲਈ ਸਲਾਹ ਤੇ ਬੇਦਾਅਵਾ:",
    "gu": "ખેડૂતો માટે સલાહ અને અસ્વીકરણ:",
    "mr": "शेतकऱ्यांसाठी सल्ला व अस्वीकरण:",
    "bn": "কৃষকদের জন্য পরামর্শ ও সতর্কতা:"
  },
  "ਕਿਸਾਨਾਂ ਲਈ ਸਲਾਹ ਤੇ ਬੇਦਾਅਵਾ:": {
    "hi": "किसानों के लिए सलाह व अस्वीकरण:",
    "en": "Advisory Note & Disclaimer:",
    "pa": "ਕਿਸਾਨਾਂ ਲਈ ਸਲਾਹ ਤੇ ਬੇਦਾਅਵਾ:",
    "gu": "ખેડૂતો માટે સલાહ અને અસ્વીકરણ:",
    "mr": "शेतकऱ्यांसाठी सल्ला व अस्वीकरण:",
    "bn": "কৃষকদের জন্য পরামর্শ ও সতর্কতা:"
  },
  "AI Kisan Doctor recommendations are based on satellite weather data and official ICAR/KVK agronomy guidelines. Always verify chemical dosages with local agriculture officers before application.": {
    "hi": "एआई किसान डॉक्टर द्वारा प्रदान की गई सलाह सामान्य कृषि मार्गदर्शन हेतु है जो उपग्रह मौसम और आधिकारिक सरकारी डाटा पर आधारित है। दवा के प्रयोग से पहले स्थानीय कृषि अधिकारी या 1551 पर पुष्टि अवश्य करें।",
    "en": "AI Kisan Doctor recommendations are based on satellite weather data and official ICAR/KVK agronomy guidelines. Always verify chemical dosages with local agriculture officers before application.",
    "pa": "ਏਆਈ ਕਿਸਾਨ ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਸਰਕਾਰੀ ਖੇਤੀ ਵਿਗਿਆਨ ਦੇ ਨਿਯਮਾਂ ਤੇ ਅਧਾਰਿਤ ਹੈ। ਦਵਾਈ ਵਰਤਣ ਤੋਂ ਪਹਿਲਾਂ ਸਥਾਨਕ ਖੇਤੀ ਅਧਿਕਾਰੀ ਜਾਂ 1551 ਤੋਂ ਪੁਸ਼ਟੀ ਜ਼ਰੂਰ ਕਰੋ।",
    "gu": "એઆઈ કિસાન ડોક્ટરની સલાહ સામાન્ય કૃષિ માર્ગદર્શન માટે છે જે હવામાન અને સત્તાવાર ડેટા પર આધારિત છે. દવા વાપરતા પહેલા ૧૫૫૧ પર પુષ્ટિ કરો.",
    "mr": "एआय किसान डॉक्टरचा सल्ला सामान्य कृषी मार्गदर्शनासाठी आहे जो हवामान व अधिकृत डेटावर आधारित आहे. फवारणीपूर्वी स्थानिक कृषी अधिकाऱ्यांशी संपर्क साधा.",
    "bn": "এআই কিষাণ ডাক্তারের পরামর্শ উপগ্রহ ভিত্তিক আবহাওয়া ও সরকারি কৃষি নির্দেশিকা অনুসারে তৈরি। কীটনাশক প্রয়োগের আগে স্থানীয় কৃষি আধিকারিক বা ১৫৫১ এ নিশ্চিত হন।"
  },
  "एआई किसान डॉक्टर द्वारा प्रदान की गई सलाह सामान्य कृषि मार्गदर्शन हेतु है जो उपग्रह मौसम और आधिकारिक सरकारी डाटा पर आधारित है। दवा के प्रयोग से पहले स्थानीय कृषि अधिकारी या 1551 पर पुष्टि अवश्य करें।": {
    "hi": "एआई किसान डॉक्टर द्वारा प्रदान की गई सलाह सामान्य कृषि मार्गदर्शन हेतु है जो उपग्रह मौसम और आधिकारिक सरकारी डाटा पर आधारित है। दवा के प्रयोग से पहले स्थानीय कृषि अधिकारी या 1551 पर पुष्टि अवश्य करें।",
    "en": "AI Kisan Doctor recommendations are based on satellite weather data and official ICAR/KVK agronomy guidelines. Always verify chemical dosages with local agriculture officers before application.",
    "pa": "ਏਆਈ ਕਿਸਾਨ ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਸਰਕਾਰੀ ਖੇਤੀ ਵਿਗਿਆਨ ਦੇ ਨਿਯਮਾਂ ਤੇ ਅਧਾਰਿਤ ਹੈ। ਦਵਾਈ ਵਰਤਣ ਤੋਂ ਪਹਿਲਾਂ ਸਥਾਨਕ ਖੇਤੀ ਅਧਿਕਾਰੀ ਜਾਂ 1551 ਤੋਂ ਪੁਸ਼ਟੀ ਜ਼ਰੂਰ ਕਰੋ।",
    "gu": "એઆઈ કિસાન ડોક્ટરની સલાહ સામાન્ય કૃષિ માર્ગદર્શન માટે છે જે હવામાન અને સત્તાવાર ડેટા પર આધારિત છે. દવા વાપરતા પહેલા ૧૫૫૧ પર પુષ્ટિ કરો.",
    "mr": "एआय किसान डॉक्टरचा सल्ला सामान्य कृषी मार्गदर्शनासाठी आहे जो हवामान व अधिकृत डेटावर आधारित आहे. फवारणीपूर्वी स्थानिक कृषी अधिकाऱ्यांशी संपर्क साधा.",
    "bn": "এআই কিষাণ ডাক্তারের পরামর্শ উপগ্রহ ভিত্তিক আবহাওয়া ও সরকারি কৃষি নির্দেশিকা অনুসারে তৈরি। কীটনাশক প্রয়োগের আগে স্থানীয় কৃষি আধিকারিক বা ১৫৫১ এ নিশ্চিত হন।"
  },
  "ਏਆਈ ਕਿਸਾਨ ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਸਰਕਾਰੀ ਖੇਤੀ ਵਿਗਿਆਨ ਦੇ ਨਿਯਮਾਂ ਤੇ ਅਧਾਰਿਤ ਹੈ। ਦਵਾਈ ਵਰਤਣ ਤੋਂ ਪਹਿਲਾਂ ਸਥਾਨਕ ਖੇਤੀ ਅਧਿਕਾਰੀ ਜਾਂ 1551 ਤੋਂ ਪੁਸ਼ਟੀ ਜ਼ਰੂਰ ਕਰੋ।": {
    "hi": "एआई किसान डॉक्टर द्वारा प्रदान की गई सलाह सामान्य कृषि मार्गदर्शन हेतु है जो उपग्रह मौसम और आधिकारिक सरकारी डाटा पर आधारित है। दवा के प्रयोग से पहले स्थानीय कृषि अधिकारी या 1551 पर पुष्टि अवश्य करें।",
    "en": "AI Kisan Doctor recommendations are based on satellite weather data and official ICAR/KVK agronomy guidelines. Always verify chemical dosages with local agriculture officers before application.",
    "pa": "ਏਆਈ ਕਿਸਾਨ ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਸਰਕਾਰੀ ਖੇਤੀ ਵਿਗਿਆਨ ਦੇ ਨਿਯਮਾਂ ਤੇ ਅਧਾਰਿਤ ਹੈ। ਦਵਾਈ ਵਰਤਣ ਤੋਂ ਪਹਿਲਾਂ ਸਥਾਨਕ ਖੇਤੀ ਅਧਿਕਾਰੀ ਜਾਂ 1551 ਤੋਂ ਪੁਸ਼ਟੀ ਜ਼ਰੂਰ ਕਰੋ।",
    "gu": "એઆઈ કિસાન ડોક્ટરની સલાહ સામાન્ય કૃષિ માર્ગદર્શન માટે છે જે હવામાન અને સત્તાવાર ડેટા પર આધારિત છે. દવા વાપરતા પહેલા ૧૫૫૧ પર પુષ્ટિ કરો.",
    "mr": "एआय किसान डॉक्टरचा सल्ला सामान्य कृषी मार्गदर्शनासाठी आहे जो हवामान व अधिकृत डेटावर आधारित आहे. फवारणीपूर्वी स्थानिक कृषी अधिकाऱ्यांशी संपर्क साधा.",
    "bn": "এআই কিষাণ ডাক্তারের পরামর্শ উপগ্রহ ভিত্তিক আবহাওয়া ও সরকারি কৃষি নির্দেশিকা অনুসারে তৈরি। কীটনাশক প্রয়োগের আগে স্থানীয় কৃষি আধিকারিক বা ১৫৫১ এ নিশ্চিত হন।"
  },
  "All Systems Operational (Open-Meteo • AI Vision • Socket.IO)": {
    "hi": "सभी सेवाएं सक्रिय हैं (Live)",
    "en": "All Systems Operational (Open-Meteo • AI Vision • Socket.IO)",
    "pa": "ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ ਚਾਲੂ ਹਨ (Live)",
    "gu": "બધી સેવાઓ સક્રિય છે (Live)",
    "mr": "सर्व सेवा सुरू आहेत (Live)",
    "bn": "সকল সেবা সক্রিয় রয়েছে (Live)"
  },
  "सभी सेवाएं सक्रिय हैं (Live)": {
    "hi": "सभी सेवाएं सक्रिय हैं (Live)",
    "en": "All Systems Operational (Open-Meteo • AI Vision • Socket.IO)",
    "pa": "ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ ਚਾਲੂ ਹਨ (Live)",
    "gu": "બધી સેવાઓ સક્રિય છે (Live)",
    "mr": "सर्व सेवा सुरू आहेत (Live)",
    "bn": "সকল সেবা সক্রিয় রয়েছে (Live)"
  },
  "ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ ਚਾਲੂ ਹਨ (Live)": {
    "hi": "सभी सेवाएं सक्रिय हैं (Live)",
    "en": "All Systems Operational (Open-Meteo • AI Vision • Socket.IO)",
    "pa": "ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ ਚਾਲੂ ਹਨ (Live)",
    "gu": "બધી સેવાઓ સક્રિય છે (Live)",
    "mr": "सर्व सेवा सुरू आहेत (Live)",
    "bn": "সকল সেবা সক্রিয় রয়েছে (Live)"
  },
  "Dashboard": {
    "hi": "डैशबोर्ड",
    "en": "Dashboard",
    "pa": "ਡੈਸ਼ਬੋਰਡ",
    "gu": "ડેશબોર્ડ",
    "mr": "डॅशबोर्ड",
    "bn": "ড্যাশবোর্ড"
  },
  "डैशबोर्ड": {
    "hi": "डैशबोर्ड",
    "en": "Dashboard",
    "pa": "ਡੈਸ਼ਬੋਰਡ",
    "gu": "ડેશબોર્ડ",
    "mr": "डॅशबोर्ड",
    "bn": "ড্যাশবোর্ড"
  },
  "ਡੈਸ਼ਬੋਰਡ": {
    "hi": "डैशबोर्ड",
    "en": "Dashboard",
    "pa": "ਡੈਸ਼ਬੋਰਡ",
    "gu": "ડેશબોર્ડ",
    "mr": "डॅशबोर्ड",
    "bn": "ড্যাশবোর্ড"
  },
  "Back to Home": {
    "hi": "होमपेज पर जाएं",
    "en": "Back to Home",
    "pa": "ਹੋਮਪੇਜ ਤੇ ਜਾਓ",
    "gu": "હોમપેજ પર જાઓ",
    "mr": "होमपेजवर जा",
    "bn": "মূল পাতায় ফিরুন"
  },
  "होमपेज पर जाएं": {
    "hi": "होमपेज पर जाएं",
    "en": "Back to Home",
    "pa": "ਹੋਮਪੇਜ ਤੇ ਜਾਓ",
    "gu": "હોમપેજ પર જાઓ",
    "mr": "होमपेजवर जा",
    "bn": "মূল পাতায় ফিরুন"
  },
  "ਹੋਮਪੇਜ ਤੇ ਜਾਓ": {
    "hi": "होमपेज पर जाएं",
    "en": "Back to Home",
    "pa": "ਹੋਮਪੇਜ ਤੇ ਜਾਓ",
    "gu": "હોમપેજ પર જાઓ",
    "mr": "होमपेजवर जा",
    "bn": "মূল পাতায় ফিরুন"
  },
  "AI Farm Savings Calc": {
    "hi": "वित्तीय बचत गणक",
    "en": "AI Farm Savings Calc",
    "pa": "ਵਿੱਤੀ ਬੱਚਤ ਗਣਕ",
    "gu": "નાણાકીય બચત ગણક",
    "mr": "आर्थिक बचत गणक",
    "bn": "আর্থিক সঞ্চয় গণক"
  },
  "वित्तीय बचत गणक": {
    "hi": "वित्तीय बचत गणक",
    "en": "AI Farm Savings Calc",
    "pa": "ਵਿੱਤੀ ਬੱਚਤ ਗਣਕ",
    "gu": "નાણાકીય બચત ગણક",
    "mr": "आर्थिक बचत गणक",
    "bn": "আর্থিক সঞ্চয় গণক"
  },
  "ਵਿੱਤੀ ਬੱਚਤ ਗਣਕ": {
    "hi": "वित्तीय बचत गणक",
    "en": "AI Farm Savings Calc",
    "pa": "ਵਿੱਤੀ ਬੱਚਤ ਗਣਕ",
    "gu": "નાણાકીય બચત ગણક",
    "mr": "आर्थिक बचत गणक",
    "bn": "আর্থিক সঞ্চয় গণক"
  },
  "Calculate Your Farm Net Savings": {
    "hi": "अपनी फसल की शुद्ध बचत निकालें",
    "en": "Calculate Your Farm Net Savings",
    "pa": "ਆਪਣੀ ਫ਼ਸਲ ਦੀ ਸ਼ੁੱਧ ਬੱਚਤ ਕੱਢੋ",
    "gu": "તમારા પાકની ચોખ્ખી બચત ગણો",
    "mr": "आपल्या पिकाची निव्वळ बचत काढा",
    "bn": "আপনার ফসলের মোট সাশ্রয় হিসাব করুন"
  },
  "अपनी फसल की शुद्ध बचत निकालें": {
    "hi": "अपनी फसल की शुद्ध बचत निकालें",
    "en": "Calculate Your Farm Net Savings",
    "pa": "ਆਪਣੀ ਫ਼ਸਲ ਦੀ ਸ਼ੁੱਧ ਬੱਚਤ ਕੱਢੋ",
    "gu": "તમારા પાકની ચોખ્ખી બચત ગણો",
    "mr": "आपल्या पिकाची निव्वळ बचत काढा",
    "bn": "আপনার ফসলের মোট সাশ্রয় হিসাব করুন"
  },
  "ਆਪਣੀ ਫ਼ਸਲ ਦੀ ਸ਼ੁੱਧ ਬੱਚਤ ਕੱਢੋ": {
    "hi": "अपनी फसल की शुद्ध बचत निकालें",
    "en": "Calculate Your Farm Net Savings",
    "pa": "ਆਪਣੀ ਫ਼ਸਲ ਦੀ ਸ਼ੁੱਧ ਬੱਚਤ ਕੱਢੋ",
    "gu": "તમારા પાકની ચોખ્ખી બચત ગણો",
    "mr": "आपल्या पिकाची निव्वळ बचत काढा",
    "bn": "আপনার ফসলের মোট সাশ্রয় হিসাব করুন"
  },
  "Save up to ₹18,500/acre on fertilizer waste & pest damage": {
    "hi": "खाद व कीटनाशक में ~₹18,500/एकड़ तक बचत का अनुमान",
    "en": "Save up to ₹18,500/acre on fertilizer waste & pest damage",
    "pa": "ਖਾਦ ਤੇ ਕੀਟਨਾਸ਼ਕ ਵਿੱਚ ~₹18,500/ਏਕੜ ਤੱਕ ਬੱਚਤ ਦਾ ਅੰਦਾਜ਼ਾ",
    "gu": "ખાતર અને જંતુનાશકમાં ~₹18,500/એકર સુધીની બચતનો અંદાજ",
    "mr": "खत व कीटकनाशकांत ~₹१८,५००/एकर पर्यंत बचतीचा अंदाज",
    "bn": "অতিরিক্ত সার ও কীটনাশক ক্ষতি রোধ করে একরে ~₹১৮,৫০০ পর্যন্ত সাশ্রয়"
  },
  "खाद व कीटनाशक में ~₹18,500/एकड़ तक बचत का अनुमान": {
    "hi": "खाद व कीटनाशक में ~₹18,500/एकड़ तक बचत का अनुमान",
    "en": "Save up to ₹18,500/acre on fertilizer waste & pest damage",
    "pa": "ਖਾਦ ਤੇ ਕੀਟਨਾਸ਼ਕ ਵਿੱਚ ~₹18,500/ਏਕੜ ਤੱਕ ਬੱਚਤ ਦਾ ਅੰਦਾਜ਼ਾ",
    "gu": "ખાતર અને જંતુનાશકમાં ~₹18,500/એકર સુધીની બચતનો અંદાજ",
    "mr": "खत व कीटकनाशकांत ~₹१८,५००/एकर पर्यंत बचतीचा अंदाज",
    "bn": "অতিরিক্ত সার ও কীটনাশক ক্ষতি রোধ করে একরে ~₹১৮,৫০০ পর্যন্ত সাশ্রয়"
  },
  "ਖਾਦ ਤੇ ਕੀਟਨਾਸ਼ਕ ਵਿੱਚ ~₹18,500/ਏਕੜ ਤੱਕ ਬੱਚਤ ਦਾ ਅੰਦਾਜ਼ਾ": {
    "hi": "खाद व कीटनाशक में ~₹18,500/एकड़ तक बचत का अनुमान",
    "en": "Save up to ₹18,500/acre on fertilizer waste & pest damage",
    "pa": "ਖਾਦ ਤੇ ਕੀਟਨਾਸ਼ਕ ਵਿੱਚ ~₹18,500/ਏਕੜ ਤੱਕ ਬੱਚਤ ਦਾ ਅੰਦਾਜ਼ਾ",
    "gu": "ખાતર અને જંતુનાશકમાં ~₹18,500/એકર સુધીની બચતનો અંદાજ",
    "mr": "खत व कीटकनाशकांत ~₹१८,५००/एकर पर्यंत बचतीचा अंदाज",
    "bn": "অতিরিক্ত সার ও কীটনাশক ক্ষতি রোধ করে একরে ~₹১৮,৫০০ পর্যন্ত সাশ্রয়"
  },
  "Farmer Community Proof": {
    "hi": "किसान सफलता कहानियां",
    "en": "Farmer Community Proof",
    "pa": "ਕਿਸਾਨ ਸਫ਼ਲਤਾ ਕਹਾਣੀਆਂ",
    "gu": "ખેડૂત સફળતા વાર્તાઓ",
    "mr": "शेतकरी यशोगाथा",
    "bn": "কৃষক সাফল্যের গল্প"
  },
  "Real Farmers Verified Case Studies": {
    "hi": "वास्तविक किसानों का प्रभाव प्रमाण",
    "en": "Real Farmers Verified Case Studies",
    "pa": "ਅਸਲ ਕਿਸਾਨਾਂ ਦਾ ਪ੍ਰਭਾਵ ਸਬੂਤ",
    "gu": "વાસ્તવિક ખેડૂતોના પ્રમાણિત કિસ્સાઓ",
    "mr": "खऱ्या शेतकऱ्यांचे पडताळलेले यश",
    "bn": "বাস্তব কৃষকদের প্রমাণিত সাফল্যের গল্প"
  },
  "वास्तविक किसानों का प्रभाव प्रमाण": {
    "hi": "वास्तविक किसानों का प्रभाव प्रमाण",
    "en": "Real Farmers Verified Case Studies",
    "pa": "ਅਸਲ ਕਿਸਾਨਾਂ ਦਾ ਪ੍ਰਭਾਵ ਸਬੂਤ",
    "gu": "વાસ્તવિક ખેડૂતોના પ્રમાણિત કિસ્સાઓ",
    "mr": "खऱ्या शेतकऱ्यांचे पडताळलेले यश",
    "bn": "বাস্তব কৃষকদের প্রমাণিত সাফল্যের গল্প"
  },
  "ਅਸਲ ਕਿਸਾਨਾਂ ਦਾ ਪ੍ਰਭਾਵ ਸਬੂਤ": {
    "hi": "वास्तविक किसानों का प्रभाव प्रमाण",
    "en": "Real Farmers Verified Case Studies",
    "pa": "ਅਸਲ ਕਿਸਾਨਾਂ ਦਾ ਪ੍ਰਭਾਵ ਸਬੂਤ",
    "gu": "વાસ્તવિક ખેડૂતોના પ્રમાણિત કિસ્સાઓ",
    "mr": "खऱ्या शेतकऱ्यांचे पडताळलेले यश",
    "bn": "বাস্তব কৃষকদের প্রমাণিত সাফল্যের গল্প"
  },
  "₹3.84 Cr+ saved across 52,400+ farmers nationwide": {
    "hi": "₹3.84 Cr+ कुल बचत • 52,400+ किसानों का विश्वास",
    "en": "₹3.84 Cr+ saved across 52,400+ farmers nationwide",
    "pa": "₹3.84 Cr+ ਕੁੱਲ ਬੱਚਤ • 52,400+ ਕਿਸਾਨਾਂ ਦਾ ਭਰੋਸਾ",
    "gu": "₹3.84 Cr+ કુલ બચત • 52,400+ ખેડૂતોનો વિશ્વાસ",
    "mr": "₹३.८४ कोटी+ एकूण बचत • ५२,४००+ शेतकऱ्यांचा विश्वास",
    "bn": "দেশজুড়ে ৫২,৪০০+ কৃষকের মোট ₹৩.৮৪ কোটি+ সাশ্রয়"
  },
  "₹3.84 Cr+ कुल बचत • 52,400+ किसानों का विश्वास": {
    "hi": "₹3.84 Cr+ कुल बचत • 52,400+ किसानों का विश्वास",
    "en": "₹3.84 Cr+ saved across 52,400+ farmers nationwide",
    "pa": "₹3.84 Cr+ ਕੁੱਲ ਬੱਚਤ • 52,400+ ਕਿਸਾਨਾਂ ਦਾ ਭਰੋਸਾ",
    "gu": "₹3.84 Cr+ કુલ બચત • 52,400+ ખેડૂતોનો વિશ્વાસ",
    "mr": "₹३.८४ कोटी+ एकूण बचत • ५२,४००+ शेतकऱ्यांचा विश्वास",
    "bn": "দেশজুড়ে ৫২,৪০০+ কৃষকের মোট ₹৩.৮৪ কোটি+ সাশ্রয়"
  },
  "₹3.84 Cr+ ਕੁੱਲ ਬੱਚਤ • 52,400+ ਕਿਸਾਨਾਂ ਦਾ ਭਰੋਸਾ": {
    "hi": "₹3.84 Cr+ कुल बचत • 52,400+ किसानों का विश्वास",
    "en": "₹3.84 Cr+ saved across 52,400+ farmers nationwide",
    "pa": "₹3.84 Cr+ ਕੁੱਲ ਬੱਚਤ • 52,400+ ਕਿਸਾਨਾਂ ਦਾ ਭਰੋਸਾ",
    "gu": "₹3.84 Cr+ કુલ બચત • 52,400+ ખેડૂતોનો વિશ્વાસ",
    "mr": "₹३.८४ कोटी+ एकूण बचत • ५२,४००+ शेतकऱ्यांचा विश्वास",
    "bn": "দেশজুড়ে ৫২,৪০০+ কৃষকের মোট ₹৩.৮৪ কোটি+ সাশ্রয়"
  },
  "Daily National Mandi Rates • Agmarknet Live Feed": {
    "hi": "दैनिक राष्ट्रीय मंडी भाव • Agmarknet लाइव फीड",
    "en": "Daily National Mandi Rates • Agmarknet Live Feed",
    "pa": "ਰੋਜ਼ਾਨਾ ਕੌਮੀ ਮੰਡੀ ਭਾਅ • Agmarknet ਲਾਈਵ ਫੀਡ",
    "gu": "દૈનિક રાષ્ટ્રીય યાર્ડ ભાવ • Agmarknet લાઇવ ફીડ",
    "mr": "दैनिक राष्ट्रीय बाजार भाव • Agmarknet थेट फीड",
    "bn": "দৈনিক জাতীয় মাণ্ডি দর • Agmarknet লাইভ ফিড"
  },
  "दैनिक राष्ट्रीय मंडी भाव • Agmarknet लाइव फीड": {
    "hi": "दैनिक राष्ट्रीय मंडी भाव • Agmarknet लाइव फीड",
    "en": "Daily National Mandi Rates • Agmarknet Live Feed",
    "pa": "ਰੋਜ਼ਾਨਾ ਕੌਮੀ ਮੰਡੀ ਭਾਅ • Agmarknet ਲਾਈਵ ਫੀਡ",
    "gu": "દૈનિક રાષ્ટ્રીય યાર્ડ ભાવ • Agmarknet લાઇવ ફીડ",
    "mr": "दैनिक राष्ट्रीय बाजार भाव • Agmarknet थेट फीड",
    "bn": "দৈনিক জাতীয় মাণ্ডি দর • Agmarknet লাইভ ফিড"
  },
  "ਰੋਜ਼ਾਨਾ ਕੌਮੀ ਮੰਡੀ ਭਾਅ • Agmarknet ਲਾਈਵ ਫੀਡ": {
    "hi": "दैनिक राष्ट्रीय मंडी भाव • Agmarknet लाइव फीड",
    "en": "Daily National Mandi Rates • Agmarknet Live Feed",
    "pa": "ਰੋਜ਼ਾਨਾ ਕੌਮੀ ਮੰਡੀ ਭਾਅ • Agmarknet ਲਾਈਵ ਫੀਡ",
    "gu": "દૈનિક રાષ્ટ્રીય યાર્ડ ભાવ • Agmarknet લાઇવ ફીડ",
    "mr": "दैनिक राष्ट्रीय बाजार भाव • Agmarknet थेट फीड",
    "bn": "দৈনিক জাতীয় মাণ্ডি দর • Agmarknet লাইভ ফিড"
  },
  "📦 Offline Mode Active: Showing cached APMC Mandi Rates from secure local storage": {
    "hi": "📦 ऑफ़लाइन मोड सक्रिय: सुरक्षित स्थानीय कैश से APMC मंडी भाव दिखाए जा रहे हैं",
    "en": "📦 Offline Mode Active: Showing cached APMC Mandi Rates from secure local storage",
    "pa": "📦 ਆਫ਼ਲਾਈਨ ਮੋਡ ਸਰਗਰਮ: ਸੁਰੱਖਿਅਤ ਸਥਾਨਕ ਕੈਸ਼ ਤੋਂ ਮੰਡੀ ਭਾਅ ਦਿਖਾਏ ਜਾ ਰਹੇ ਹਨ",
    "gu": "📦 ઑફલાઇન મોડ સક્રિય: સુરક્ષિત લોકલ કેશમાંથી માર્કેટ યાર્ડ ભાવ દર્શાવવામાં આવી રહ્યા છે",
    "mr": "📦 ऑफलाइन मोड सक्रिय: सुरक्षित स्थानिक कॅशमधून बाजार भाव दाखवले जात आहेत",
    "bn": "📦 অফলাইন মোড সক্রিয়: সংরক্ষিত স্থানীয় ক্যাশ থেকে মাণ্ডি দর প্রদর্শিত হচ্ছে"
  },
  "📦 ऑफ़लाइन मोड सक्रिय: सुरक्षित स्थानीय कैश से APMC मंडी भाव दिखाए जा रहे हैं": {
    "hi": "📦 ऑफ़लाइन मोड सक्रिय: सुरक्षित स्थानीय कैश से APMC मंडी भाव दिखाए जा रहे हैं",
    "en": "📦 Offline Mode Active: Showing cached APMC Mandi Rates from secure local storage",
    "pa": "📦 ਆਫ਼ਲਾਈਨ ਮੋਡ ਸਰਗਰਮ: ਸੁਰੱਖਿਅਤ ਸਥਾਨਕ ਕੈਸ਼ ਤੋਂ ਮੰਡੀ ਭਾਅ ਦਿਖਾਏ ਜਾ ਰਹੇ ਹਨ",
    "gu": "📦 ઑફલાઇન મોડ સક્રિય: સુરક્ષિત લોકલ કેશમાંથી માર્કેટ યાર્ડ ભાવ દર્શાવવામાં આવી રહ્યા છે",
    "mr": "📦 ऑफलाइन मोड सक्रिय: सुरक्षित स्थानिक कॅशमधून बाजार भाव दाखवले जात आहेत",
    "bn": "📦 অফলাইন মোড সক্রিয়: সংরক্ষিত স্থানীয় ক্যাশ থেকে মাণ্ডি দর প্রদর্শিত হচ্ছে"
  },
  "📦 ਆਫ਼ਲਾਈਨ ਮੋਡ ਸਰਗਰਮ: ਸੁਰੱਖਿਅਤ ਸਥਾਨਕ ਕੈਸ਼ ਤੋਂ ਮੰਡੀ ਭਾਅ ਦਿਖਾਏ ਜਾ ਰਹੇ ਹਨ": {
    "hi": "📦 ऑफ़लाइन मोड सक्रिय: सुरक्षित स्थानीय कैश से APMC मंडी भाव दिखाए जा रहे हैं",
    "en": "📦 Offline Mode Active: Showing cached APMC Mandi Rates from secure local storage",
    "pa": "📦 ਆਫ਼ਲਾਈਨ ਮੋਡ ਸਰਗਰਮ: ਸੁਰੱਖਿਅਤ ਸਥਾਨਕ ਕੈਸ਼ ਤੋਂ ਮੰਡੀ ਭਾਅ ਦਿਖਾਏ ਜਾ ਰਹੇ ਹਨ",
    "gu": "📦 ઑફલાઇન મોડ સક્રિય: સુરક્ષિત લોકલ કેશમાંથી માર્કેટ યાર્ડ ભાવ દર્શાવવામાં આવી રહ્યા છે",
    "mr": "📦 ऑफलाइन मोड सक्रिय: सुरक्षित स्थानिक कॅशमधून बाजार भाव दाखवले जात आहेत",
    "bn": "📦 অফলাইন মোড সক্রিয়: সংরক্ষিত স্থানীয় ক্যাশ থেকে মাণ্ডি দর প্রদর্শিত হচ্ছে"
  },
  "You can verify latest wholesale prices and MSP even without active internet in remote farmlands.": {
    "hi": "इंटरनेट न होने पर भी आप फसलों के ताजा सरकारी थोक भाव और MSP जांच सकते हैं।",
    "en": "You can verify latest wholesale prices and MSP even without active internet in remote farmlands.",
    "pa": "ਇੰਟਰਨੈੱਟ ਨਾ ਹੋਣ ਤੇ ਵੀ ਤੁਸੀਂ ਤਾਜ਼ਾ ਸਰਕਾਰੀ ਥੋਕ ਭਾਅ ਅਤੇ MSP ਵੇਖ ਸਕਦੇ ਹੋ।",
    "gu": "ઇન્ટરનેટ ન હોય તો પણ તમે તાજા જથ્થાબંધ ભાવ અને ટેકાના ભાવ ચકાસી શકો છો.",
    "mr": "इंटरनेट नसले तरीही आपण ताजे शासकीय घाऊक दर आणि हमीभाव तपासू शकता.",
    "bn": "দূরবর্তী কৃষি এলাকায় ইন্টারনেট না থাকলেও আপনি সর্বশেষ পাইকারি দর ও MSP দেখতে পারবেন।"
  },
  "इंटरनेट न होने पर भी आप फसलों के ताजा सरकारी थोक भाव और MSP जांच सकते हैं।": {
    "hi": "इंटरनेट न होने पर भी आप फसलों के ताजा सरकारी थोक भाव और MSP जांच सकते हैं।",
    "en": "You can verify latest wholesale prices and MSP even without active internet in remote farmlands.",
    "pa": "ਇੰਟਰਨੈੱਟ ਨਾ ਹੋਣ ਤੇ ਵੀ ਤੁਸੀਂ ਤਾਜ਼ਾ ਸਰਕਾਰੀ ਥੋਕ ਭਾਅ ਅਤੇ MSP ਵੇਖ ਸਕਦੇ ਹੋ।",
    "gu": "ઇન્ટરનેટ ન હોય તો પણ તમે તાજા જથ્થાબંધ ભાવ અને ટેકાના ભાવ ચકાસી શકો છો.",
    "mr": "इंटरनेट नसले तरीही आपण ताजे शासकीय घाऊक दर आणि हमीभाव तपासू शकता.",
    "bn": "দূরবর্তী কৃষি এলাকায় ইন্টারনেট না থাকলেও আপনি সর্বশেষ পাইকারি দর ও MSP দেখতে পারবেন।"
  },
  "ਇੰਟਰਨੈੱਟ ਨਾ ਹੋਣ ਤੇ ਵੀ ਤੁਸੀਂ ਤਾਜ਼ਾ ਸਰਕਾਰੀ ਥੋਕ ਭਾਅ ਅਤੇ MSP ਵੇਖ ਸਕਦੇ ਹੋ।": {
    "hi": "इंटरनेट न होने पर भी आप फसलों के ताजा सरकारी थोक भाव और MSP जांच सकते हैं।",
    "en": "You can verify latest wholesale prices and MSP even without active internet in remote farmlands.",
    "pa": "ਇੰਟਰਨੈੱਟ ਨਾ ਹੋਣ ਤੇ ਵੀ ਤੁਸੀਂ ਤਾਜ਼ਾ ਸਰਕਾਰੀ ਥੋਕ ਭਾਅ ਅਤੇ MSP ਵੇਖ ਸਕਦੇ ਹੋ।",
    "gu": "ઇન્ટરનેટ ન હોય તો પણ તમે તાજા જથ્થાબંધ ભાવ અને ટેકાના ભાવ ચકાસી શકો છો.",
    "mr": "इंटरनेट नसले तरीही आपण ताजे शासकीय घाऊक दर आणि हमीभाव तपासू शकता.",
    "bn": "দূরবর্তী কৃষি এলাকায় ইন্টারনেট না থাকলেও আপনি সর্বশেষ পাইকারি দর ও MSP দেখতে পারবেন।"
  },
  "Offline Cached": {
    "hi": "ऑफलाइन कैश्ड",
    "en": "Offline Cached",
    "pa": "ਆਫ਼ਲਾਈਨ ਕੈਸ਼",
    "gu": "ઑફલાઇન કેશ થયેલ",
    "mr": "ऑफलाइन कॅश केलेले",
    "bn": "অফলাইনে সংরক্ষিত"
  },
  "ऑफलाइन कैश्ड": {
    "hi": "ऑफलाइन कैश्ड",
    "en": "Offline Cached",
    "pa": "ਆਫ਼ਲਾਈਨ ਕੈਸ਼",
    "gu": "ઑફલાઇન કેશ થયેલ",
    "mr": "ऑफलाइन कॅश केलेले",
    "bn": "অফলাইনে সংরক্ষিত"
  },
  "ਆਫ਼ਲਾਈਨ ਕੈਸ਼": {
    "hi": "ऑफलाइन कैश्ड",
    "en": "Offline Cached",
    "pa": "ਆਫ਼ਲਾਈਨ ਕੈਸ਼",
    "gu": "ઑફલાઇન કેશ થયેલ",
    "mr": "ऑफलाइन कॅश केलेले",
    "bn": "অফলাইনে সংরক্ষিত"
  },
  "Today": {
    "hi": "आज",
    "en": "Today",
    "pa": "ਅੱਜ",
    "gu": "આજે",
    "mr": "आज",
    "bn": "আজ"
  },
  "आज": {
    "hi": "आज",
    "en": "Today",
    "pa": "ਅੱਜ",
    "gu": "આજે",
    "mr": "आज",
    "bn": "আজ"
  },
  "ਅੱਜ": {
    "hi": "आज",
    "en": "Today",
    "pa": "ਅੱਜ",
    "gu": "આજે",
    "mr": "आज",
    "bn": "আজ"
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('cp_language') || 'hi';
  });

  const setLanguage = (langCode) => {
    setCurrentLang(langCode);
    localStorage.setItem('cp_language', langCode);
  };

  const t = (key) => {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    if (dict && dict[key] !== undefined) {
      return dict[key];
    }
    return TRANSLATIONS.en[key] !== undefined ? TRANSLATIONS.en[key] : key;
  };

  const lt = (hiOrMap, en, pa, gu, mr, bn) => {
    if (hiOrMap && typeof hiOrMap === 'object' && !React.isValidElement(hiOrMap)) {
      return hiOrMap[currentLang] || hiOrMap.en || hiOrMap.hi || '';
    }

    if (currentLang === 'hi' && hiOrMap !== undefined) return hiOrMap;
    if (currentLang === 'en' && en !== undefined) return en;
    if (currentLang === 'pa' && pa !== undefined) return pa;
    if (currentLang === 'gu' && gu !== undefined) return gu;
    if (currentLang === 'mr' && mr !== undefined) return mr;
    if (currentLang === 'bn' && bn !== undefined) return bn;

    if (typeof en === 'string' && UI_STRING_MAP[en] && UI_STRING_MAP[en][currentLang]) {
      return UI_STRING_MAP[en][currentLang];
    }
    if (typeof hiOrMap === 'string' && UI_STRING_MAP[hiOrMap] && UI_STRING_MAP[hiOrMap][currentLang]) {
      return UI_STRING_MAP[hiOrMap][currentLang];
    }
    if (typeof pa === 'string' && UI_STRING_MAP[pa] && UI_STRING_MAP[pa][currentLang]) {
      return UI_STRING_MAP[pa][currentLang];
    }

    const dict = TRANSLATIONS[currentLang];
    if (dict) {
      if (typeof en === 'string' && dict[en]) return dict[en];
      if (typeof hiOrMap === 'string' && dict[hiOrMap]) return dict[hiOrMap];
    }

    if (currentLang === 'pa') return pa || en || hiOrMap;
    if (currentLang === 'gu') return gu || en || hiOrMap;
    if (currentLang === 'mr') return mr || en || hiOrMap;
    if (currentLang === 'bn') return bn || en || hiOrMap;
    return en || hiOrMap;
  };

  const isHi = currentLang === 'hi';
  const isPa = currentLang === 'pa';
  const isGu = currentLang === 'gu';
  const isMr = currentLang === 'mr';
  const isBn = currentLang === 'bn';
  const isEn = currentLang === 'en';

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        setLanguage,
        t,
        lt,
        isHi,
        isPa,
        isGu,
        isMr,
        isBn,
        isEn,
        languages: LANGUAGES
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      currentLang: 'en',
      setLanguage: () => {},
      t: (key) => key,
      lt: (hi, en, pa) => en || hi,
      isHi: false,
      isPa: false,
      isGu: false,
      isMr: false,
      isBn: false,
      isEn: true,
      languages: LANGUAGES
    };
  }
  return ctx;
};

export default LanguageContext;
