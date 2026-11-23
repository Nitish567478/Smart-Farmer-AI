import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Sprout,
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  Bot,
  DollarSign,
  CloudSun
} from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const { currentLang, lt } = useLanguage();
  const navigate = useNavigate();
  const isHi = currentLang === 'hi' || currentLang === 'pa';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(res.error || (isHi ? 'लॉगिन असफल रहा। कृपया ईमेल और पासवर्ड की जांच करें।' : 'Failed to sign in. Please verify your credentials.'));
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-6xl w-full mx-auto mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#168A70] hover:text-[#123B35] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isHi ? 'होमपेज पर वापस जाएं' : 'Back to Home'}</span>
        </Link>
      </div>

      
      <div className="max-w-6xl w-full mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">

        <div className="relative lg:col-span-7 bg-[#0c2420] text-white p-8 sm:p-12 flex flex-col justify-between overflow-hidden">
          
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=85')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#071a17]/95 via-[#0c2420]/85 to-[#123B35]/90 backdrop-blur-[1px]" />

          
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold backdrop-blur-md">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>Climate Pulse AI • {isHi ? 'स्मार्ट कृषि मंच' : 'Kisan Agro Command'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {isHi
                ? 'भारतीय किसानों के लिए आधुनिक एआई कृषि समाधान'
                : 'Empowering Farmers with Predictive AI & Live Mandi Rates'}
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-lg">
              {isHi
                ? 'फसल स्वास्थ्य निदान, सरकारी न्यूनतम समर्थन मूल्य (MSP), 7-दिवसीय मौसम पूर्वानुमान और सीधे कृषि विशेषज्ञों की सलाह।'
                : 'Real-time crop vision diagnosis, APMC wholesale rates, high-precision radar weather, and direct Kisan Call Center integration.'}
            </p>
          </div>

          
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 my-8">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md space-y-1">
              <Bot className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xs font-black text-white">{isHi ? 'एआई किसान डॉक्टर' : 'AI Crop Doctor'}</h2>
              <p className="text-[11px] text-emerald-200/80">{isHi ? 'लाइव कैमरा स्कैन व तुरंत उपचार' : 'Live Vision camera scanner'}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md space-y-1">
              <DollarSign className="w-5 h-5 text-amber-400" />
              <h2 className="text-xs font-black text-white">{isHi ? 'दैनिक मंडी भाव' : 'Live Mandi MSP'}</h2>
              <p className="text-[11px] text-emerald-200/80">{isHi ? 'सरकारी न्यूनतम समर्थन मूल्य' : 'Govt benchmark rates'}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md space-y-1">
              <CloudSun className="w-5 h-5 text-sky-400" />
              <h2 className="text-xs font-black text-white">{isHi ? 'मौसम अलर्ट' : 'Weather Radar'}</h2>
              <p className="text-[11px] text-emerald-200/80">{isHi ? 'सूखा व वर्षा की सटीक चेतावनी' : 'Precision IMD/NOAA radar'}</p>
            </div>
          </div>

          
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/15 text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold">{isHi ? '50,000+ पंजीकृत किसान' : '50,000+ Active Farmers'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/90 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isHi ? 'भारत सरकार डिजिटल कृषि अनुरूप' : 'Govt AgStack Aligned'}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-white">
          <div className="space-y-6">
            
            <div className="space-y-1.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#168A70] flex items-center justify-center border border-emerald-100 shadow-2xs">
                <Sprout className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {isHi ? 'किसान लॉगिन' : 'Farmer Sign In'}
              </h2>
              <p className="text-xs text-slate-500">
                {isHi
                  ? 'अपने किसान खाते में लॉगिन करें और कृषि सेवाएं पाएं:'
                  : 'Enter your credentials to access your Kisan Agro Command:'}
              </p>
            </div>

            
            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-start gap-2.5 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  {isHi ? 'ईमेल पता' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isHi ? 'kisan@example.com' : 'farmer@example.com'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168A70] focus:border-transparent text-xs text-slate-900 bg-slate-50/50 transition"
                  />
                </div>
              </div>

              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    {isHi ? 'पासवर्ड' : 'Password'}
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168A70] focus:border-transparent text-xs text-slate-900 bg-slate-50/50 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#168A70] to-[#123B35] hover:from-[#137a63] hover:to-[#0c2420] text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-950/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{isHi ? 'सत्यापन हो रहा है...' : 'Authenticating...'}</span>
                  </>
                ) : (
                  <>
                    <span>{isHi ? 'लॉगिन करें' : 'Sign In to Command'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          
          <div className="pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              {isHi ? 'नया किसान खाता बनाना चाहते हैं?' : "Don't have an account yet?"}{' '}
              <Link to="/register" className="font-extrabold text-[#168A70] hover:underline">
                {isHi ? 'नया खाता बनाएं (Register)' : 'Create Farmer Account'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
