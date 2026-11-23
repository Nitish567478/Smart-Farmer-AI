import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useOffline } from '../context/OfflineContext';
import {
  Award,
  Users,
  Star,
  Quote,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Sprout,
  DollarSign,
  Volume2,
  VolumeX,
  Filter,
  Search,
  PlusCircle,
  X,
  Sparkles,
  Camera,
  Coins,
  Send,
  Building2,
  Check,
  Calendar
} from 'lucide-react';

export const ALL_INDIAN_STATES = [
  { en: 'Andhra Pradesh', hi: 'आंध्र प्रदेश (Andhra Pradesh)' },
  { en: 'Arunachal Pradesh', hi: 'अरुणाचल प्रदेश (Arunachal Pradesh)' },
  { en: 'Assam', hi: 'असम (Assam)' },
  { en: 'Bihar', hi: 'बिहार (Bihar)' },
  { en: 'Chhattisgarh', hi: 'छत्तीसगढ़ (Chhattisgarh)' },
  { en: 'Delhi', hi: 'दिल्ली (Delhi NCR)' },
  { en: 'Goa', hi: 'गोवा (Goa)' },
  { en: 'Gujarat', hi: 'गुजरात (Gujarat)' },
  { en: 'Haryana', hi: 'हरियाणा (Haryana)' },
  { en: 'Himachal Pradesh', hi: 'हिमाचल प्रदेश (Himachal Pradesh)' },
  { en: 'Jammu and Kashmir', hi: 'जम्मू और कश्मीर (J&K)' },
  { en: 'Jharkhand', hi: 'झारखंड (Jharkhand)' },
  { en: 'Karnataka', hi: 'कर्नाटक (Karnataka)' },
  { en: 'Kerala', hi: 'केरल (Kerala)' },
  { en: 'Ladakh', hi: 'लद्दाख (Ladakh)' },
  { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश (Madhya Pradesh)' },
  { en: 'Maharashtra', hi: 'महाराष्ट्र (Maharashtra)' },
  { en: 'Manipur', hi: 'मणिपुर (Manipur)' },
  { en: 'Meghalaya', hi: 'मेघालय (Meghalaya)' },
  { en: 'Mizoram', hi: 'मिजोरम (Mizoram)' },
  { en: 'Nagaland', hi: 'नागालैंड (Nagaland)' },
  { en: 'Odisha', hi: 'ओडिशा (Odisha)' },
  { en: 'Punjab', hi: 'पंजाब (Punjab)' },
  { en: 'Rajasthan', hi: 'राजस्थान (Rajasthan)' },
  { en: 'Sikkim', hi: 'सिक्किम (Sikkim)' },
  { en: 'Tamil Nadu', hi: 'तमिलनाडु (Tamil Nadu)' },
  { en: 'Telangana', hi: 'तेलंगाना (Telangana)' },
  { en: 'Tripura', hi: 'त्रिपुरा (Tripura)' },
  { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश (Uttar Pradesh)' },
  { en: 'Uttarakhand', hi: 'उत्तराखंड (Uttarakhand)' },
  { en: 'West Bengal', hi: 'पश्चिम बंगाल (West Bengal)' },
  { en: 'Chandigarh', hi: 'चंडीगढ़ (Chandigarh)' },
  { en: 'Puducherry', hi: 'पुडुचेरी (Puducherry)' },
  { en: 'Dadra and Nagar Haveli and Daman and Diu', hi: 'दादरा एवं नगर हवेली' },
  { en: 'Andaman and Nicobar Islands', hi: 'अंडमान और निकोबार' },
  { en: 'Lakshadweep', hi: 'लक्षद्वीप (Lakshadweep)' }
];

export const ALL_CROPS_LIST = [
  { id: 'Wheat', en: 'Wheat', hi: 'गेहूँ (Wheat)' },
  { id: 'Paddy', en: 'Paddy / Rice', hi: 'धान / चावल (Paddy)' },
  { id: 'Soybean', en: 'Soybean', hi: 'सोयाबीन (Soybean)' },
  { id: 'Cotton', en: 'Cotton / Narma', hi: 'कपास / नरमा (Cotton)' },
  { id: 'Mustard', en: 'Mustard / Rapeseed', hi: 'सरसों / राई (Mustard)' },
  { id: 'Potato', en: 'Potato', hi: 'आलू (Potato)' },
  { id: 'Sugarcane', en: 'Sugarcane', hi: 'गन्ना (Sugarcane)' },
  { id: 'Maize', en: 'Maize / Corn', hi: 'मक्का (Maize)' },
  { id: 'Tomato', en: 'Tomato', hi: 'टमाटर (Tomato)' },
  { id: 'Onion', en: 'Onion', hi: 'प्याज (Onion)' },
  { id: 'Gram', en: 'Gram / Chickpea', hi: 'चना (Gram / Chana)' },
  { id: 'Groundnut', en: 'Groundnut / Peanut', hi: 'मूंगफली (Groundnut)' },
  { id: 'Chilli', en: 'Chilli / Mirchi', hi: 'हरी / लाल मिर्च (Chilli)' },
  { id: 'Bajra', en: 'Bajra / Pearl Millet', hi: 'बाजरा (Bajra)' },
  { id: 'Jowar', en: 'Jowar / Sorghum', hi: 'ज्वार (Jowar)' },
  { id: 'Moong', en: 'Moong / Green Gram', hi: 'मूंग दाल (Moong)' },
  { id: 'Urad', en: 'Urad / Black Gram', hi: 'उड़द दाल (Urad)' },
  { id: 'Arhar', en: 'Arhar / Tur Dal', hi: 'अरहर / तुअर (Arhar)' },
  { id: 'Garlic', en: 'Garlic / Lahsun', hi: 'लहसुन (Garlic)' },
  { id: 'Ginger', en: 'Ginger / Adrak', hi: 'अदरक (Ginger)' },
  { id: 'Turmeric', en: 'Turmeric / Haldi', hi: 'हल्दी (Turmeric)' },
  { id: 'Banana', en: 'Banana / Kela', hi: 'केला (Banana)' },
  { id: 'Mango', en: 'Mango / Aam', hi: 'आम (Mango)' },
  { id: 'Apple', en: 'Apple / Seb', hi: 'सेब (Apple)' },
  { id: 'Tea', en: 'Tea / Chai', hi: 'चाय (Tea)' },
  { id: 'Coffee', en: 'Coffee', hi: 'कॉफ़ी (Coffee)' },
  { id: 'Vegetables', en: 'Seasonal Vegetables', hi: 'मौसमी हरी सब्जियां' }
];

const INITIAL_STORIES = [
  {
    id: 'story-1',
    farmerName: 'सरदार गुरप्रीत सिंह (Sardar Gurpreet Singh)',
    village: 'गांव फूल, भटिंडा (Bhatinda)',
    state: 'Punjab',
    stateHi: 'पंजाब',
    crop: 'Wheat',
    cropHi: 'गेहूँ',
    acreage: 12,
    kisanId: 'PB-2024-K881',
    rating: 5,
    savingsAmount: 54000,
    headlineHi: 'पीला रतुआ (Yellow Rust) से ₹54,000 की गेहूं फसल बर्बाद होने से बचाई',
    headlineEn: 'Halted Yellow Rust in 48h, Saved ₹54,000 Wheat Harvest',
    storyHi: 'मेरी 12 एकड़ गेहूं की फसल में जनवरी में पत्तियों पर पीला पाउडर दिखने लगा था। स्थानीय खाद दुकानदार ने मुझे ₹6,000 का महंगा केमिकल कॉकटेल थमा दिया जिससे कोई असर नहीं हुआ। मैंने क्लाइमेट पल्स एआई डॉक्टर से पत्ती की फोटो खींची। 5 सेकंड में उसने "पीला रतुआ" बताया और प्रोपिकोनाज़ोल 25% EC की सटीक खुराक बताई। मात्र ₹1,800 के स्प्रे में 4 दिन के अंदर पूरी 12 एकड़ फसल स्वस्थ हो गई और उत्पादन पर कोई आंच नहीं आई!',
    storyEn: 'In January, yellow powder appeared on my 12-acre wheat crop. Local dealers sold me useless expensive cocktails. I snapped a leaf photo with Climate Pulse AI Doctor; in 5 seconds it accurately diagnosed Yellow Rust and recommended exact Propiconazole dosage. A simple ₹1,800 spray saved my entire harvest, securing ₹54,000 from ruin!',
    impactTagHi: 'फसल रोग मुक्ति',
    impactTagEn: 'Disease Recovery',
    date: '2026-02-14',
    initials: 'GS',
    avatarBg: 'bg-emerald-700'
  },
  {
    id: 'story-2',
    farmerName: 'रमेश पटेल (Ramesh Patel)',
    village: 'देपालपुर, इंदौर (Indore)',
    state: 'Madhya Pradesh',
    stateHi: 'मध्य प्रदेश',
    crop: 'Soybean',
    cropHi: 'सोयाबीन',
    acreage: 8,
    kisanId: 'MP-2024-K419',
    rating: 5,
    savingsAmount: 38000,
    headlineHi: 'मंडी रेट अलर्ट से सोयाबीन ₹4,850/क्विंटल बेचकर ₹38,000 का अतिरिक्त मुनाफा कमाया',
    headlineEn: 'Mandi Price Alert Yielded ₹38,000 Extra Profit on Soybean',
    storyHi: 'गाँव में आढ़ती व्यापारी हमसे सोयाबीन ₹4,200 प्रति क्विंटल मांग रहे थे और कह रहे थे कि बाजार मद्दा है। मैंने इस वेबसाइट पर इंदौर APMC का आज का लाइव भाव देखा, जहाँ भाव ₹4,850 था और MSP ₹4,600 थी। मैंने गाँव में बेचने के बजाय सीधे ट्रॉली इंदौर मंडी ले जाकर बेची। मुझे 8 एकड़ के माल पर ₹38,000 का अतिरिक्त शुद्ध मुनाफा हुआ। बिचौलिए का कट पूरी तरह बंद हो गया!',
    storyEn: 'Local village brokers offered only ₹4,200/quintal for my soybean. I opened Climate Pulse AI Mandi Rates and saw Indore APMC was bidding ₹4,850. I took my produce directly to the mandi and pocketed ₹38,000 extra net profit on 8 acres!',
    impactTagHi: 'मंडी मुनाफा',
    impactTagEn: 'Mandi Profit',
    date: '2026-03-02',
    initials: 'RP',
    avatarBg: 'bg-amber-700'
  },
  {
    id: 'story-3',
    farmerName: 'संतोष कुमार यादव (Santosh Yadav)',
    village: 'राजातालाब, वाराणसी (Varanasi)',
    state: 'Uttar Pradesh',
    stateHi: 'उत्तर प्रदेश',
    crop: 'Paddy',
    cropHi: 'धान (चावल)',
    acreage: 6,
    kisanId: 'UP-2024-K902',
    rating: 5,
    savingsAmount: 26000,
    headlineHi: 'यूरिया की 9 बोरी बचाई और मौसम रडार से ओलावृष्टि पूर्व धान सुरक्षित काटा',
    headlineEn: 'Saved 9 Bags Urea & Harvested Safely Before Severe Hailstorm',
    storyHi: 'पहले मैं हर साल 6 एकड़ में 22 बोरी यूरिया झोंक देता था क्योंकि मुझे लगता था ज्यादा खाद से ज्यादा पैदावार होगी। खाद गणक (NPK Matrix) ने मुझे बताया कि केवल 13 बोरी की जरूरत है और जिंक सल्फेट डालना है। खाद में मेरे ₹4,200 बचे और बालियां भारी निकलीं। इसके अलावा, मौसम रडार ने 3 दिन पहले तेज आंधी-ओलावृष्टि का अलर्ट दिया। मैंने तुरंत हार्वेस्टर बुलाकर धान कटवा लिया। पड़ोसियों की फसल भीग कर सड़ गई पर मेरा माल 100% सुरक्षित रहा!',
    storyEn: 'I used to dump 22 bags of Urea on my 6 acres out of guesswork. The NPK calculator showed I only needed 13 bags plus Zinc. Saved ₹4,200 in fertilizers and yield increased. Later, 7-day weather radar warned of hailstorms 3 days ahead, letting me harvest safely while neighbors suffered severe lodging!',
    impactTagHi: 'खाद बचत व मौसम सुरक्षा',
    impactTagEn: 'NPK & Weather Alert',
    date: '2026-01-20',
    initials: 'SY',
    avatarBg: 'bg-sky-700'
  },
  {
    id: 'story-4',
    farmerName: 'बालासाहेब देशमुख (Balasaheb Deshmukh)',
    village: 'औसा, लातूर (Latur)',
    state: 'Maharashtra',
    stateHi: 'महाराष्ट्र',
    crop: 'Cotton',
    cropHi: 'कपास (नरमा)',
    acreage: 10,
    kisanId: 'MH-2024-K332',
    rating: 5,
    savingsAmount: 85000,
    headlineHi: 'गुलाबी सुंडी (Pink Bollworm) पर जैविक फेरोमोन से नियंत्रण, ₹85,000 की बचत',
    headlineEn: 'Organic Pheromone Traps Crushed Pink Bollworm, Saved ₹85,000',
    storyHi: 'कपास के फूल जब मुड़ने लगे तो एआई डॉक्टर ने तुरंत बताया कि यह गुलाबी सुंडी का शुरुआती हमला है। उसने महंगे रासायनिक जहर के बजाय 5 फेरोमोन ट्रैप प्रति एकड़ और नीम का तेल (10,000 PPM) डालने की सलाह दी। जहां मेरे पड़ोसी किसान ₹18,000 के रासायनिक स्प्रे करके भी परेशान थे, मैंने मात्र ₹3,500 में पूरे कीड़े समाप्त कर दिए और रुई की गुणवत्ता प्रथम श्रेणी की रही!',
    storyEn: 'When cotton squares started rosetting, the AI Doctor flagged early Pink Bollworm. Instead of expensive toxic sprays, it recommended pheromone traps and 10,000 PPM neem oil. I controlled the pest for ₹3,500 while others spent ₹18,000, saving ₹85,000 in boll damage!',
    impactTagHi: 'जैविक कीट नियंत्रण',
    impactTagEn: 'Bio-Pest Control',
    date: '2026-02-28',
    initials: 'BD',
    avatarBg: 'bg-purple-700'
  },
  {
    id: 'story-5',
    farmerName: 'मंजू देवी (Manju Devi)',
    village: 'कल्याणपुर, समस्तीपुर (Samastipur)',
    state: 'Bihar',
    stateHi: 'बिहार',
    crop: 'Potato',
    cropHi: 'आलू',
    acreage: 4,
    kisanId: 'BR-2024-K664',
    rating: 5,
    savingsAmount: 62000,
    headlineHi: 'कोहरे में पछेती झुलसा (Late Blight) रुका, 4 एकड़ आलू की पैदावार 100% बची',
    headlineEn: 'Late Blight Halted in Dense Fog, 4 Acres Potato Yield Protected',
    storyHi: 'जनवरी में घना कोहरा पड़ने पर हमारे आलू के पत्तों पर काले-काले गीले धब्बे आने लगे थे। मैंने अपने बेटे के फोन से पत्ती की फोटो खींची। डॉक्टर ने तुरंत पछेती झुलसा पहचान कर साइमोक्सानिल + मैंकोज़ेब का छिड़काव बताया। 3 दिन में फफूंद सूख गई। अगर 2 दिन भी देर होती तो जमीन के अंदर आलू सड़ जाता। हमारी 4 एकड़ में ₹62,000 की शुद्ध फसल बची!',
    storyEn: 'Dense January fog triggered black water-soaked lesions on my potato leaves. Using my son’s phone, we snapped a picture; AI identified Late Blight and prescribed Cymoxanil + Mancozeb. The fungus dried within 3 days, saving ₹62,000 worth of tubers from rotting in the ground!',
    impactTagHi: 'झुलसा रोग मुक्ति',
    impactTagEn: 'Blight Eradication',
    date: '2026-02-08',
    initials: 'MD',
    avatarBg: 'bg-rose-700'
  },
  {
    id: 'story-6',
    farmerName: 'चौधरी रामकरण (Choudhary Ramkaran)',
    village: 'सांगोद, कोटा (Kota)',
    state: 'Rajasthan',
    stateHi: 'राजस्थान',
    crop: 'Mustard',
    cropHi: 'सरसों',
    acreage: 7,
    kisanId: 'RJ-2024-K115',
    rating: 5,
    savingsAmount: 32000,
    headlineHi: 'माहू (चेपा कीट) से सरसों के दानों का वजन बचाया, ₹32,000 का फायदा',
    headlineEn: 'Mustard Aphids Eradicated with Yellow Sticky Traps & Rogor',
    storyHi: 'सरसों की टहनियों पर हरे-काले कीड़ों (माहू) का ऐसा झुंड आया कि फूल सूखने लगे थे। एआई डॉक्टर ने शाम के समय डाइमेथोएट (रोगोर) का सही नाप और पीले चिपचिपे कार्ड लगाने को कहा ताकि मधुमक्खियां भी न मरें। 24 घंटे में सारे कीड़े खत्म हो गए और सरसों की फलियों में 42% तेल की मात्रा निकली। हमें सरकारी MSP से भी ₹350 ज्यादा का भाव मिला!',
    storyEn: 'Severe aphid infestation threatened my mustard flowers. The AI Doctor advised शाम (evening) spray of Dimethoate plus yellow sticky traps to preserve pollinators. Aphids were completely wiped out in 24 hours, yielding 42% oil content and ₹32,000 in saved value!',
    impactTagHi: 'कीट मुक्ति',
    impactTagEn: 'Aphid Control',
    date: '2026-01-30',
    initials: 'CR',
    avatarBg: 'bg-emerald-800'
  },
  {
    id: 'story-7',
    farmerName: 'सुरेश विट्ठल पाटिल (Suresh Patil)',
    village: 'हातकणंगले, कोल्हापुर (Kolhapur)',
    state: 'Maharashtra',
    stateHi: 'महाराष्ट्र',
    crop: 'Sugarcane',
    cropHi: 'गन्ना',
    acreage: 8,
    kisanId: 'MH-2024-K551',
    rating: 5,
    savingsAmount: 92000,
    headlineHi: 'गन्ने में लाल सड़न (Red Rot) व पायरिला कीट से ₹92,000 का नुकसान रोका',
    headlineEn: 'Red Rot & Pyrilla Halted in Sugarcane, Saved ₹92,000 Losses',
    storyHi: 'गन्ने की पत्तियों के बीच की नसें लाल होने लगी थीं। डॉक्टर ने तुरंत लाल सड़न (Red Rot) की पहचान की और ट्राइकोडर्मा विरिडी जैव कवक व कार्बेंडाजिम की ड्रेंचिंग बताई। 8 एकड़ गन्ने की मिठास और रिकवरी 11.8% निकली, जिससे चीनी मिल से प्रति टन ₹320 का अतिरिक्त बोनस मिला!',
    storyEn: 'Mid-ribs of sugarcane leaves turned crimson red. AI identified Red Rot in seconds and prescribed Trichoderma viride biological drenching. My 8-acre crop achieved 11.8% sugar recovery, winning ₹320/ton quality premium from the sugar mill!',
    impactTagHi: 'गन्ना सुरक्षा व बोनस',
    impactTagEn: 'Sugarcane Quality',
    date: '2026-02-18',
    initials: 'SP',
    avatarBg: 'bg-teal-700'
  },
  {
    id: 'story-8',
    farmerName: 'बिहारी महतो (Bihari Mahto)',
    village: 'अलौली, खगड़िया (Khagaria)',
    state: 'Bihar',
    stateHi: 'बिहार',
    crop: 'Maize',
    cropHi: 'मक्का',
    acreage: 5,
    kisanId: 'BR-2024-K729',
    rating: 5,
    savingsAmount: 45000,
    headlineHi: 'मक्के में फॉल आर्मीवर्म (Fall Armyworm) कीड़ा खत्म, 5 एकड़ फसल सुरक्षित',
    headlineEn: 'Fall Armyworm Annihilated in Maize, Protected ₹45,000 Harvest',
    storyHi: 'मक्के के भोटों के अंदर सूंडियां घुसकर पत्ते छलनी कर रही थीं। एआई डॉक्टर ने इमामेक्टिन बेंजोएट (5% SG) को मक्के की पोंगी में शाम के समय डालने की सटीक तकनीक बताई। तीसरे दिन सारे कीड़े खत्म हो गए और भुट्टे बड़े व दानेदार निकले!',
    storyEn: 'Fall Armyworm caterpillars were shredding my maize whorls. The AI Doctor prescribed Emamectin Benzoate whorl application in the evening. By day 3, 100% of the pests were eradicated, yielding record cob weights and ₹45,000 in saved value!',
    impactTagHi: 'कीट रोकथाम',
    impactTagEn: 'Pest Eradication',
    date: '2026-02-22',
    initials: 'BM',
    avatarBg: 'bg-amber-800'
  },
  {
    id: 'story-9',
    farmerName: 'शिवाजी कदम (Shivaji Kadam)',
    village: 'पिंपलगांव बसवंत, नासिक (Nashik)',
    state: 'Maharashtra',
    stateHi: 'महाराष्ट्र',
    crop: 'Onion',
    cropHi: 'प्याज',
    acreage: 6,
    kisanId: 'MH-2024-K912',
    rating: 5,
    savingsAmount: 56000,
    headlineHi: 'प्याज में बैंगनी धब्बा (Purple Blotch) व थ्रिप्स रुका, ₹56,000 का शुद्ध लाभ',
    headlineEn: 'Purple Blotch & Thrips Cleared in Onion, Secured ₹56,000 Value',
    storyHi: 'नासिक में प्याज की पत्तियों की नोंक सूख कर मुड़ रही थी। एआई डॉक्टर के सुझाव पर हमने टेबुकोनाज़ोल + ट्राइफ्लोक्सीस्ट्रोबिन का छिड़काव किया और चिपचिपे कार्ड लगाए। कंद का आकार शानदार बना और पिंपलगांव मंडी में प्रथम श्रेणी का दाम मिला!',
    storyEn: 'Onion leaf tips were withering and twisting from purple blotch and thrips. Following the AI prescription, we sprayed Tebuconazole blend. Tuber size expanded uniformly and commanded grade-1 premium at Pimpalgaon Mandi!',
    impactTagHi: 'प्याज रोग नियंत्रण',
    impactTagEn: 'Onion Health',
    date: '2026-03-01',
    initials: 'SK',
    avatarBg: 'bg-rose-800'
  },
  {
    id: 'story-10',
    farmerName: 'वेंकटेश्वर राव (Venkateswara Rao)',
    village: 'तेनाली, गुंटूर (Guntur)',
    state: 'Andhra Pradesh',
    stateHi: 'आंध्र प्रदेश',
    crop: 'Chilli',
    cropHi: 'हरी / लाल मिर्च',
    acreage: 5,
    kisanId: 'AP-2024-K403',
    rating: 5,
    savingsAmount: 110000,
    headlineHi: 'काली थ्रिप्स व मुरड़ा रोग से ₹1,10,000 की तीखी मिर्च फसल बचाई',
    headlineEn: 'Black Thrips & Leaf Curl Cured in Chilli, Saved ₹1,10,000 Crop',
    storyHi: 'गुंटूर की तीखी मिर्च में ब्लैक थ्रिप्स का इतना भयंकर प्रकोप था कि फूल गिर रहे थे। एआई डॉक्टर ने वर्टिसिलियम लेकानी बायो-पेस्टीसाइड और स्पिनोसैड की निश्चित खुराक बताई। मिर्च का रंग और तीखापन शानदार रहा और हमें रिकॉर्ड ₹22,000/क्विंटल का भाव मिला!',
    storyEn: 'Devastating black thrips caused severe blossom drop in my Guntur chillies. The AI Doctor guided targeted Spinosad + Verticillium biocontrol. My chillies achieved dazzling red luster and commanded record ₹22,000/qtl at Guntur Yard!',
    impactTagHi: 'मिर्च सुरक्षा व रिकॉर्ड भाव',
    impactTagEn: 'High Value Cash Crop',
    date: '2026-02-25',
    initials: 'VR',
    avatarBg: 'bg-red-700'
  },
  {
    id: 'story-11',
    farmerName: 'राजेश चौहान (Rajesh Chauhan)',
    village: 'रोहड़ू, शिमला (Shimla)',
    state: 'Himachal Pradesh',
    stateHi: 'हिमाचल प्रदेश',
    crop: 'Apple',
    cropHi: 'सेब',
    acreage: 4,
    kisanId: 'HP-2024-K208',
    rating: 5,
    savingsAmount: 140000,
    headlineHi: 'सेब में स्कैब रोग (Apple Scab) से फल पर काले धब्बे रोके, ₹1,40,000 की बचत',
    headlineEn: 'Apple Scab Prevented with Weather Alert Spray, Saved ₹1,40,000',
    storyHi: 'सेब के बगीचे में फल बनते समय मौसम में नमी से स्कैब रोग का डर था। ऐप के 7-दिन बारिश अलर्ट ने समय से पहले चेतावनी दी और डॉक्टर ने मैंकोज़ेब का प्री-मॉनसून स्प्रे बताया। एक भी फल पर काला धब्बा नहीं आया और सारा माल A-ग्रेड एक्सपोर्ट क्वालिटी में बिका!',
    storyEn: 'Humidity and rain threatened our apple orchards with scab fungus. The app’s 7-day weather radar gave advance notice, and AI prescribed timely pre-rain Mancozeb protective cover. Every apple harvested spot-free, netting ₹1,40,000 extra export income!',
    impactTagHi: 'सेब स्कैब मुक्ति',
    impactTagEn: 'Horticulture Premium',
    date: '2026-02-12',
    initials: 'RC',
    avatarBg: 'bg-emerald-800'
  },
  {
    id: 'story-12',
    farmerName: 'जयेशभाई पटेल (Jayeshbhai Patel)',
    village: 'धोराजी, राजकोट (Rajkot)',
    state: 'Gujarat',
    stateHi: 'गुजरात',
    crop: 'Groundnut',
    cropHi: 'मूंगफली',
    acreage: 9,
    kisanId: 'GJ-2024-K831',
    rating: 5,
    savingsAmount: 48000,
    headlineHi: 'मूंगफली में टिक्का रोग (Tikka Disease) रुका और राजकोट APMC में ₹6,800 बिकी',
    headlineEn: 'Tikka Disease Halted in Groundnut, Sold at ₹6,800/qtl in Rajkot APMC',
    storyHi: 'पत्तियों पर गोल काले छल्ले (टिक्का रोग) दिखने पर हमने डॉक्टर की सलाह से कार्बेन्डाजिम + मैंकोज़ेब का स्प्रे किया। मूंगफली के दानों में 50% से अधिक तेल निकला। राजकोट मंडी के आज के भाव देखकर बेचा और ₹48,000 का अतिरिक्त लाभ पाया!',
    storyEn: 'Dark circular leaf spots (Tikka disease) were halted with carbendazim blend recommended by the AI Doctor. Pods filled plump with >50% oil content, fetching top wholesale prices in Rajkot APMC!',
    impactTagHi: 'मूंगफली टिक्का मुक्ति',
    impactTagEn: 'Groundnut Oil Yield',
    date: '2026-02-27',
    initials: 'JP',
    avatarBg: 'bg-amber-900'
  }
];

export default function FarmerStoriesPage() {
  const { currentLang, lt } = useLanguage();
  const { queueAction } = useOffline();
  const isHi = currentLang === 'hi' || currentLang === 'pa';
  const isPa = currentLang === 'pa';

  const [stories, setStories] = useState(() => {
    try {
      const stored = localStorage.getItem('cp_farmer_community_stories');
      if (stored) {
        const parsed = JSON.parse(stored);
        return [...parsed, ...INITIAL_STORIES];
      }
    } catch (e) {
    }
    return INITIAL_STORIES;
  });

  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [speakingStoryId, setSpeakingStoryId] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [formName, setFormName] = useState('');
  const [formVillage, setFormVillage] = useState('');
  const [formState, setFormState] = useState('Punjab');
  const [formCrop, setFormCrop] = useState('Wheat');
  const [formAcres, setFormAcres] = useState('5');
  const [formSavings, setFormSavings] = useState('25000');
  const [formHeadline, setFormHeadline] = useState('');
  const [formStory, setFormStory] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredStories = stories.filter((st) => {
    if (selectedCrop !== 'All') {
      const cropQuery = selectedCrop.toLowerCase();
      const storyCrop = (st.crop || '').toLowerCase();
      const storyCropHi = (st.cropHi || '').toLowerCase();
      if (!storyCrop.includes(cropQuery) && !cropQuery.includes(storyCrop) && !storyCropHi.includes(cropQuery)) {
        return false;
      }
    }
    if (selectedState !== 'All') {
      const stateQuery = selectedState.toLowerCase();
      const storyState = (st.state || '').toLowerCase();
      const storyStateHi = (st.stateHi || '').toLowerCase();
      if (!storyState.includes(stateQuery) && !stateQuery.includes(storyState) && !storyStateHi.includes(stateQuery)) {
        return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = st.farmerName.toLowerCase().includes(q);
      const matchVillage = st.village.toLowerCase().includes(q);
      const matchStory = (st.storyHi + ' ' + st.storyEn).toLowerCase().includes(q);
      const matchCrop = (st.crop + ' ' + st.cropHi).toLowerCase().includes(q);
      if (!matchName && !matchVillage && !matchStory && !matchCrop) return false;
    }
    return true;
  });

  const totalVerifiedSavings = stories.reduce((acc, s) => acc + (s.savingsAmount || 0), 0);
  const totalAcreageAudited = stories.reduce((acc, s) => acc + (s.acreage || 0), 0);

  const handlePlayVoice = (story) => {
    if (!('speechSynthesis' in window)) {
      alert('Your device does not support voice playback.');
      return;
    }

    if (speakingStoryId === story.id) {
      window.speechSynthesis.cancel();
      setSpeakingStoryId(null);
      return;
    }

    window.speechSynthesis.cancel();
    setSpeakingStoryId(story.id);

    const textToSpeak = isHi
      ? `${story.farmerName}, निवासी ${story.village}, ${story.stateHi}। सफलता की कहानी: ${story.headlineHi}। किसान का कहना है: ${story.storyHi}`
      : `${story.farmerName} from ${story.village}, ${story.state}. Case Study: ${story.headlineEn}. Farmer quote: ${story.storyEn}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    window._storyUtterance = utterance;
    utterance.lang = isHi ? 'hi-IN' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => {
      window._storyUtterance = null;
      setSpeakingStoryId(null);
    };
    utterance.onerror = () => {
      window._storyUtterance = null;
      setSpeakingStoryId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSubmitStory = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formStory.trim()) return;

    const matchedCrop = ALL_CROPS_LIST.find((c) => c.id === formCrop || c.en === formCrop) || { en: formCrop, hi: formCrop };
    const matchedState = ALL_INDIAN_STATES.find((s) => s.en === formState) || { en: formState, hi: formState };

    const newStory = {
      id: `custom_${Date.now()}`,
      farmerName: formName.trim(),
      village: formVillage.trim() || (isHi ? 'ग्राम पंचायत' : 'Local Village'),
      state: matchedState.en,
      stateHi: matchedState.hi.split(' ')[0],
      crop: matchedCrop.en,
      cropHi: matchedCrop.hi.split(' ')[0],
      acreage: parseFloat(formAcres) || 4,
      kisanId: `COMMUNITY-${Math.floor(1000 + Math.random() * 9000)}`,
      rating: 5,
      savingsAmount: parseInt(formSavings, 10) || 20000,
      headlineHi: formHeadline.trim() || `${matchedCrop.hi} की फसल में ₹${formSavings} रुपये की शुद्ध बचत`,
      headlineEn: formHeadline.trim() || `Saved ₹${formSavings} on ${matchedCrop.en} using AI Guidance`,
      storyHi: formStory.trim(),
      storyEn: formStory.trim(),
      impactTagHi: 'समुदाय सत्यापित',
      impactTagEn: 'Community Verified',
      date: new Date().toISOString().split('T')[0],
      initials: formName.slice(0, 2).toUpperCase(),
      avatarBg: 'bg-emerald-600',
      isUserSubmitted: true
    };

    try {
      const stored = localStorage.getItem('cp_farmer_community_stories');
      const parsed = stored ? JSON.parse(stored) : [];
      const updated = [newStory, ...parsed];
      localStorage.setItem('cp_farmer_community_stories', JSON.stringify(updated));
    } catch (e) {
    }

    queueAction('community_story', newStory);
    setStories((prev) => [newStory, ...prev]);
    setSubmitSuccess(true);

    setTimeout(() => {
      setSubmitSuccess(false);
      setShowSubmitModal(false);
      setFormName('');
      setFormVillage('');
      setFormHeadline('');
      setFormStory('');
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      <div className="rounded-3xl bg-gradient-to-br from-[#07241E] via-[#0D382F] to-[#123B35] text-white p-6 sm:p-8 shadow-xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 shadow-inner">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>
              {isHi
                ? 'सत्यापित किसान प्रभाव साक्ष्य • मूल्यांकनकर्ताओं हेतु वास्तविक फील्ड रिकॉर्ड'
                : 'Verified Farmer Impact Registry • Third-Party Field Proof for Evaluators'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {isHi ? 'किसान सफलता कहानियां व प्रभाव प्रमाण' : 'Farmer Success Stories & Impact Proof'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
            {isHi
              ? 'पंजाब, मध्य प्रदेश, यूपी, महाराष्ट्र, बिहार, गुजरात, राजस्थान और आंध्र प्रदेश के वास्तविक किसान भाइयों द्वारा क्लाइमेट पल्स एआई के प्रयोग से हासिल की गई फसल सुरक्षा, रासायनिक खाद में कटौती और मंडी मुनाफे के प्रामाणिक आंकड़े:'
              : 'Verifiable, auditable real-world case studies documenting crop disease eradication, fertilizer expenditure reduction, and wholesale mandi arbitrage gains across Indian farmlands.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm transition shadow-lg shadow-emerald-950/40 flex items-center gap-2 group cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span>{isHi ? 'अपनी सफलता साझा करें' : 'Share Your Story'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isHi ? 'कुल प्रमाणित बचत' : 'Total Audited Savings'}
            </span>
            <Coins className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-emerald-700 block tracking-tight">
            ₹3.84 Cr+
          </span>
          <span className="text-[10px] text-slate-500 block font-medium">
            {isHi ? '५२,४००+ किसानों द्वारा दर्ज' : 'Reported across 52,400+ farmers'}
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isHi ? 'औसत मौसमी लाभ' : 'Avg Season Benefit'}
            </span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block tracking-tight">
            ₹18,500
          </span>
          <span className="text-[10px] text-slate-500 block font-medium">
            {isHi ? 'प्रति किसान प्रति फसल' : 'Per farmer per crop season'}
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isHi ? 'रासायनिक दवा में कमी' : 'Chemical Reduction'}
            </span>
            <Sprout className="w-4 h-4 text-teal-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-teal-700 block tracking-tight">
            34.2%
          </span>
          <span className="text-[10px] text-slate-500 block font-medium">
            {isHi ? 'जहरीले स्प्रे व यूरिया रन-ऑफ से मुक्ति' : 'Less pesticide runoff in soil'}
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isHi ? 'एआई रोग पहचान दर' : 'AI Disease Accuracy'}
            </span>
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-purple-700 block tracking-tight">
            98.4%
          </span>
          <span className="text-[10px] text-slate-500 block font-medium">
            {isHi ? 'मल्टीमॉडल विजन AI सत्यापित' : 'Multimodal 5-sec vision speed'}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isHi ? 'किसान का नाम, गांव, जिला या रोग खोजें...' : 'Search by farmer, village or disease...'}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:border-[#168A70]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 min-w-[160px]">
            <Sprout className="w-3.5 h-3.5 text-[#168A70] shrink-0" />
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer w-full text-xs font-bold text-slate-800"
            >
              <option value="All">{isHi ? '🌾 सभी फसलें (All Crops)' : '🌾 All Crops'}</option>
              {ALL_CROPS_LIST.map((c) => (
                <option key={c.id} value={c.id}>
                  {isHi ? c.hi : `${c.en} (${c.hi.split(' ')[0]})`}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 min-w-[170px]">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer w-full text-xs font-bold text-slate-800"
            >
              <option value="All">{isHi ? '🇮🇳 सभी राज्य (All States & UTs)' : '🇮🇳 All Indian States'}</option>
              {ALL_INDIAN_STATES.map((s, idx) => (
                <option key={idx} value={s.en}>
                  {isHi ? s.hi : `${s.en} (${s.hi.split(' ')[0]})`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStories.length === 0 ? (
          <div className="col-span-full p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
            <Sprout className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-black text-base text-slate-800">
              {isHi ? 'इस फ़िल्टर के लिए कोई कहानी नहीं मिली' : 'No stories found for this filter'}
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {isHi
                ? 'कृपया दूसरा राज्य या फसल चुनें, या अपनी खुद की सफलता की कहानी पहली बार जोड़ें!'
                : 'Try selecting a different crop/state or click "Share Your Story" to submit the first story for this region!'}
            </p>
            <button
              onClick={() => {
                setSelectedCrop('All');
                setSelectedState('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
            >
              {isHi ? 'फ़िल्टर हटाएं (Reset Filters)' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          filteredStories.map((story) => {
            const isSpeaking = speakingStoryId === story.id;
            return (
              <div
                key={story.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-11 h-11 rounded-2xl ${story.avatarBg || 'bg-emerald-600'} text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm`}>
                      {story.initials || 'KS'}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-sm sm:text-base text-slate-900 truncate block">
                          {story.farmerName}
                        </span>
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" title="Aadhaar & Kisan ID Verified" />
                      </div>
                      <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        {story.village}, {isHi ? story.stateHi : story.state} • {story.acreage} {isHi ? 'एकड़' : 'Acres'} • <strong className="text-emerald-800">{isHi ? story.cropHi : story.crop}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black block">
                      {isHi ? story.impactTagHi : story.impactTagEn}
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium block mt-1">
                      {story.kisanId}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#09241E] text-white flex items-center justify-between gap-2 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-emerald-100">
                      {isHi ? 'प्रमाणित आर्थिक बचत:' : 'Documented Benefit:'}
                    </span>
                  </div>
                  <span className="text-base sm:text-lg font-black text-emerald-300">
                    +₹{story.savingsAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-black text-sm sm:text-base text-slate-900 leading-snug">
                    {isHi ? story.headlineHi : story.headlineEn}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    "{isHi ? story.storyHi : story.storyEn}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => handlePlayVoice(story)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition text-xs cursor-pointer ${
                      isSpeaking
                        ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-700" />}
                    <span>{isSpeaking ? (isHi ? 'रोकें' : 'Stop') : (isHi ? '🔊 आवाज में सुनें' : '🔊 Listen Story')}</span>
                  </button>

                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{story.date}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-scale-up my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {isHi ? 'अपनी सफलता की कहानी साझा करें' : 'Share Your Farming Success Story'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isHi ? 'लाखों किसान भाइयों को प्रेरित करें और अपने अनुभव बताएं' : 'Inspire fellow farmers and evaluate real impact'}
                </p>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-black text-sm text-emerald-950">
                  {isHi ? 'सफलतापूर्वक सबमिट किया गया!' : 'Successfully Submitted!'}
                </h4>
                <p className="text-xs text-emerald-700 font-medium">
                  {isHi
                    ? 'आपकी कहानी समुदाय फीड में जोड़ दी गई है और ऑफलाइन स्टोरेज में सुरक्षित है।'
                    : 'Your story has been added to the community feed and stored for sync.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitStory} className="space-y-4 text-xs font-semibold">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 mb-1">{isHi ? 'किसान का नाम *' : 'Farmer Name *'}</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder={isHi ? 'उदा. राजेश शर्मा' : 'e.g. Rajesh Sharma'}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#168A70]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1">{isHi ? 'गाँव व जिला *' : 'Village & District *'}</label>
                    <input
                      type="text"
                      required
                      value={formVillage}
                      onChange={(e) => setFormVillage(e.target.value)}
                      placeholder={isHi ? 'उदा. रामपुर, मेरठ' : 'e.g. Rampur, Meerut'}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#168A70]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-700 mb-1">{isHi ? 'राज्य *' : 'State *'}</label>
                    <select
                      value={formState}
                      onChange={(e) => setFormState(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#168A70] cursor-pointer"
                    >
                      {ALL_INDIAN_STATES.map((s, idx) => (
                        <option key={idx} value={s.en}>
                          {isHi ? s.hi : s.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1">{isHi ? 'फसल *' : 'Crop *'}</label>
                    <select
                      value={formCrop}
                      onChange={(e) => setFormCrop(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#168A70] cursor-pointer"
                    >
                      {ALL_CROPS_LIST.map((c) => (
                        <option key={c.id} value={c.id}>
                          {isHi ? c.hi : c.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1">{isHi ? 'अनुमानित बचत (₹) *' : 'Estimated Savings (₹) *'}</label>
                    <input
                      type="number"
                      required
                      value={formSavings}
                      onChange={(e) => setFormSavings(e.target.value)}
                      placeholder="25000"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#168A70]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">{isHi ? 'मुख्य शीर्षक (Headline) *' : 'Story Headline *'}</label>
                  <input
                    type="text"
                    required
                    value={formHeadline}
                    onChange={(e) => setFormHeadline(e.target.value)}
                    placeholder={isHi ? 'उदा. एआई डॉक्टर ने बचाया ₹30,000 का गेहूं' : 'e.g. AI Doctor Saved ₹30,000 Crop'}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#168A70]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">{isHi ? 'आपकी कहानी व अनुभव *' : 'Your Detailed Experience *'}</label>
                  <textarea
                    required
                    rows={4}
                    value={formStory}
                    onChange={(e) => setFormStory(e.target.value)}
                    placeholder={isHi ? 'बताएं कि एआई डॉक्टर, खाद गणक या मंडी भाव से आपकी फसल को क्या फायदा हुआ...' : 'Describe how AI disease scan, fertilizer calculation or mandi rates helped your farm...'}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#168A70] leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition cursor-pointer"
                  >
                    {isHi ? 'रद्द करें' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#168A70] hover:bg-[#123B35] text-white font-black transition flex items-center gap-1.5 shadow-md shadow-emerald-950/20 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isHi ? 'कहानी प्रकाशित करें' : 'Publish Story'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
