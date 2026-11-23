import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Sprout,
  User,
  Mail,
  Lock,
  Phone,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  Award,
  Bot,
  CalendarDays
} from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const { currentLang, lt } = useLanguage();
  const navigate = useNavigate();
  const isHi = currentLang === 'hi' || currentLang === 'pa';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'farmer',
    phone: '',
    preferredLanguage: currentLang || 'hi'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError(isHi ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।' : 'Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const res = await register(formData);
    setLoading(false);

    if (res.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(res.error || (isHi ? 'पंजीकरण असफल रहा। कृपया पुनः प्रयास करें।' : 'Registration failed. Please try again.'));
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

      
      <div className="max-w-6xl w-full mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">

        <div className="relative lg:col-span-7 bg-[#0c2420] text-white p-8 sm:p-12 flex flex-col justify-between overflow-hidden">
          
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1400&q=85')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#071a17]/95 via-[#0c2420]/85 to-[#123B35]/90 backdrop-blur-[1px]" />

          
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold backdrop-blur-md">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>Climate Pulse AI • {isHi ? 'नया किसान पंजीकरण' : 'Farmer Registration'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {isHi
                ? 'कृषि क्रांति से जुड़ें — अधिक उपज, सही दाम और डिजिटल सुरक्षा'
                : 'Join 50,000+ Indian Farmers on Climate Pulse AI'}
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-lg">
              {isHi
                ? 'निःशुल्क पंजीकरण करें और तुरंत पाएं फसल रोग स्कैनर, सरकारी योजनाओं की सब्सिडी, और लाइव मंडी मूल्य अलर्ट।'
                : 'Free access to vision AI crop doctor, fertilizer optimization tools, crop sowing calendars, and PM-Kisan subsidy tracking.'}
            </p>
          </div>

          
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 my-8">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md space-y-1">
              <Bot className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xs font-black text-white">{isHi ? 'रोग पहचान 24x7' : 'Crop Vision'}</h2>
              <p className="text-[11px] text-emerald-200/80">{isHi ? 'पत्ती की फोटो खींचें व तुरंत दवा जानें' : 'Snapshot instant disease cure'}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md space-y-1">
              <CalendarDays className="w-5 h-5 text-amber-400" />
              <h2 className="text-xs font-black text-white">{isHi ? 'बुवाई कैलेंडर' : 'Sowing Matrix'}</h2>
              <p className="text-[11px] text-emerald-200/80">{isHi ? 'मौसम अनुकूल बुवाई व सिंचाई' : 'Optimal weather sowing dates'}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md space-y-1">
              <Award className="w-5 h-5 text-purple-400" />
              <h2 className="text-xs font-black text-white">{isHi ? 'सरकारी योजनाएं' : 'Govt Schemes'}</h2>
              <p className="text-[11px] text-emerald-200/80">{isHi ? 'PM-किसान व फसल बीमा दावा' : 'Subsidy & PMFBY claim guides'}</p>
            </div>
          </div>

          
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/15 text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold">{isHi ? '100% निःशुल्क किसान सेवा' : '100% Free for Farmers'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/90 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isHi ? 'सुरक्षित एवं सत्यापित डेटा' : 'Secure AgData Protection'}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-white">
          <div className="space-y-5">
            
            <div className="space-y-1.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#168A70] flex items-center justify-center border border-emerald-100 shadow-2xs">
                <Sprout className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {isHi ? 'नया किसान खाता बनाएं' : 'Create Farmer Account'}
              </h2>
              <p className="text-xs text-slate-500">
                {isHi
                  ? 'कृपया अपना विवरण भरें और तुरंत स्मार्ट कृषि कमान से जुड़ें:'
                  : 'Fill in your details to start using your Kisan Agro Command:'}
              </p>
            </div>

            
            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-start gap-2.5 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  {isHi ? 'किसान का पूरा नाम' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isHi ? 'उदा. रमेश पटेल' : 'e.g. Ramesh Patel'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168A70] focus:border-transparent text-xs text-slate-900 bg-slate-50/50 transition"
                  />
                </div>
              </div>

              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  {isHi ? 'मोबाइल नंबर (SMS व अलर्ट्स हेतु)' : 'Phone Number (For Alerts)'}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    minLength={10}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={isHi ? '+91 98765 43210' : '+91 98765 43210'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168A70] focus:border-transparent text-xs text-slate-900 bg-slate-50/50 transition"
                  />
                </div>
              </div>

              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  {isHi ? 'ईमेल पता' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={isHi ? 'ramesh@kisan.in' : 'ramesh@example.com'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168A70] focus:border-transparent text-xs text-slate-900 bg-slate-50/50 transition"
                  />
                </div>
              </div>

              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  {isHi ? 'पासवर्ड (कम से कम 6 अक्षर)' : 'Password (Min. 6 chars)'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168A70] focus:border-transparent text-xs text-slate-900 bg-slate-50/50 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#168A70] to-[#123B35] hover:from-[#137a63] hover:to-[#0c2420] text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-950/20 transition flex items-center justify-center gap-2 disabled:opacity-50 mt-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{isHi ? 'खाता बन रहा है...' : 'Creating Farmer Account...'}</span>
                  </>
                ) : (
                  <>
                    <span>{isHi ? 'किसान खाता बनाएं' : 'Register Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          
          <div className="pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              {isHi ? 'पहले से खाता मौजूद है?' : 'Already have an account?'}{' '}
              <Link to="/login" className="font-extrabold text-[#168A70] hover:underline">
                {isHi ? 'लॉगिन करें (Sign In)' : 'Sign In to Command'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
