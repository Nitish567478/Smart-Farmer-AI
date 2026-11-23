import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api, { getErrorMessage } from '../services/api';
import { User, Shield, Mail, Phone, Globe, CheckCircle } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    preferredLanguage: user?.preferredLanguage || 'en'
  });
  const [savedMsg, setSavedMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavedMsg('');
    try {
      setLoading(true);
      const res = await api.patch('/auth/profile', formData);
      if (res.data?.success) {
        updateUser(res.data.user);
        setSavedMsg('Profile updated successfully.');
      }
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#172B25] tracking-tight">Account Profile</h1>
        <p className="text-xs text-[#64748B]">Manage your contact information and platform language</p>
      </div>

      {savedMsg && (
        <div className="p-3.5 bg-[#16A34A]/10 border border-[#16A34A]/30 rounded-xl text-xs text-[#16A34A] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#16A34A]" />
          <span>{savedMsg}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
        <div className="flex items-center gap-4 border-b border-[#E2E8F0] pb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#123B35] text-[#38BDF8] font-extrabold text-xl flex items-center justify-center">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-[#172B25]">{user?.name}</h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#F7FAF8] text-[#64748B] border border-[#E2E8F0]">
              Role: {user?.role?.replace('_', ' ')}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#172B25]">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-xs text-[#172B25] focus:outline-none focus:border-[#168A70]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#172B25]">Email Address (Read Only)</label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-xs text-[#64748B] bg-[#F7FAF8] cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#172B25]">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-xs text-[#172B25] focus:outline-none focus:border-[#168A70]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#172B25]">Preferred Language</label>
            <select
              value={formData.preferredLanguage}
              onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-xs text-[#172B25] bg-white focus:outline-none focus:border-[#168A70]"
            >
              <option value="en">English</option>
              <option value="hi">Hindi (हिन्दी)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#123B35] hover:bg-[#168A70] text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
          >
            {loading ? 'Saving Changes...' : 'Save Profile Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
