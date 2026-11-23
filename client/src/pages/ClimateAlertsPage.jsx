import React, { useState, useEffect } from 'react';
import api, { getErrorMessage } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  AlertTriangle,
  Plus,
  Sparkles,
  Shield,
  Clock,
  X,
  CheckCircle2,
  AlertCircle,
  Radio,
  Flame,
  CloudRain,
  Wind
} from 'lucide-react';

export default function ClimateAlertsPage() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSeverity, setFilterSeverity] = useState('all');

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    title: '',
    alertType: 'HEATWAVE',
    severity: 'High',
    description: '',
    source: 'Official IMD Bulletin'
  });
  const [createLoading, setCreateLoading] = useState(false);

  const [explainModalData, setExplainModalData] = useState(null);
  const [explainLoading, setExplainLoading] = useState(false);
  const [explainLanguage, setExplainLanguage] = useState('en');

  useEffect(() => {
    fetchAlerts();
  }, [filterSeverity]);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterSeverity !== 'all') params.severity = filterSeverity;

      const res = await api.get('/climate/alerts', { params });
      if (res.data?.success) {
        setAlerts(res.data.alerts || []);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlert = async (e) => {
    e.preventDefault();
    try {
      setCreateLoading(true);
      const res = await api.post('/climate/alerts', createForm);
      if (res.data?.success) {
        setAlerts([res.data.alert, ...alerts]);
        setShowCreateModal(false);
        setCreateForm({
          title: '',
          alertType: 'HEATWAVE',
          severity: 'High',
          description: '',
          source: 'Official IMD Bulletin'
        });
      }
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setCreateLoading(false);
    }
  };

  const handleExplainAlert = async (alert) => {
    try {
      setExplainModalData({ alert, explanation: null });
      setExplainLoading(true);

      const res = await api.post(`/climate/alerts/${alert._id}/explain`, {
        language: explainLanguage
      });

      if (res.data?.success) {
        setExplainModalData({ alert, explanation: res.data.explanation });
      }
    } catch (err) {
      setExplainModalData({
        alert,
        explanation: 'Failed to generate explanation: ' + getErrorMessage(err)
      });
    } finally {
      setExplainLoading(false);
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/30';
      case 'high':
        return 'bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/30';
      case 'moderate':
        return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30';
      case 'low':
      default:
        return 'bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-bold mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            Official & Platform Warnings
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172B25] tracking-tight">
            Climate & Hazard Advisories
          </h1>
          <p className="text-xs text-[#64748B]">
            Real-time emergency climate bulletins with Multimodal AI plain-language translations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#E2E8F0] font-bold text-xs text-[#172B25] shadow-sm focus:outline-none focus:border-[#168A70]"
          >
            <option value="all">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Moderate">Moderate</option>
            <option value="Low">Low</option>
          </select>

          {['admin', 'emergency_officer'].includes(user?.role) && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-[#123B35] hover:bg-[#168A70] text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Publish Alert
            </button>
          )}
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] h-32 sm:h-36">
        <img
          src="https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80"
          alt="Climate Warnings"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#123B35]/95 via-[#123B35]/75 to-transparent flex items-center p-6">
          <div className="max-w-xl text-white space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#38BDF8] flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#DC2626]" />
              Active Meteorological Feeds
            </span>
            <h3 className="font-bold text-sm sm:text-base">
              IMD & NOAA Multihazard Advisory Dispatch
            </h3>
            <p className="text-xs text-white/80">
              Automated hazard evaluation cross-referencing humidity, temperature, and cumulative 7-day rainfall thresholds.
            </p>
          </div>
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="p-12 text-center text-xs text-[#64748B] bg-white rounded-3xl border border-[#E2E8F0]">
          No climate alerts matching current criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.map((item) => (
            <div
              key={item._id}
              className="p-6 rounded-2xl border border-[#E2E8F0] bg-white shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${getSeverityBadge(item.severity)}`}>
                    {item.severity}
                  </span>
                  <span className="text-[10px] text-[#64748B]">
                    {new Date(item.issuedAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-[#172B25]">{item.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-[10px] text-[#64748B]">
                  Source: <strong className="text-[#172B25]">{item.source}</strong>
                </span>
                <button
                  onClick={() => handleExplainAlert(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#168A70]/10 text-[#168A70] hover:bg-[#168A70] hover:text-white font-bold text-xs transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                  Explain with AI
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {explainModalData && (
        <div className="fixed inset-0 z-50 bg-[#123B35]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E2E8F0] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h4 className="font-extrabold text-base text-[#172B25] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#168A70]" />
                AI Hazard Explanation
              </h4>
              <button
                onClick={() => setExplainModalData(null)}
                className="p-1 text-[#64748B] hover:text-[#172B25] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs font-bold text-[#172B25]">
              Hazard: {explainModalData.alert.title}
            </p>

            {explainLoading ? (
              <div className="py-8 text-center text-xs text-[#64748B] space-y-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#168A70] mx-auto"></div>
                <p>Consulting AI Engine with alert parameters...</p>
              </div>
            ) : (
              <div className="p-4 bg-[#F7FAF8] rounded-2xl text-xs text-[#172B25] leading-relaxed whitespace-pre-line max-h-80 overflow-y-auto border border-[#E2E8F0]">
                {explainModalData.explanation}
              </div>
            )}
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-[#123B35]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E2E8F0] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h4 className="font-extrabold text-base text-[#172B25]">Publish Climate Bulletin</h4>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-[#64748B] hover:text-[#172B25] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAlert} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#172B25] block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={createForm.title}
                  onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                  placeholder="e.g. Flash Flood Threat / Heatwave Warning"
                  className="w-full px-3 py-2 border border-[#E2E8F0] rounded-xl text-xs text-[#172B25] focus:outline-none focus:border-[#168A70]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#172B25] block mb-1">Alert Type</label>
                  <select
                    value={createForm.alertType}
                    onChange={(e) => setCreateForm({ ...createForm, alertType: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-xl text-xs bg-white text-[#172B25] focus:outline-none focus:border-[#168A70]"
                  >
                    <option value="HEATWAVE">Heatwave</option>
                    <option value="HEAVY_RAIN">Heavy Rainfall</option>
                    <option value="FLOOD_ALERT">Flood Alert</option>
                    <option value="CYCLONE">Cyclone / Storm</option>
                    <option value="DROUGHT">Drought Deficit</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#172B25] block mb-1">Severity</label>
                  <select
                    value={createForm.severity}
                    onChange={(e) => setCreateForm({ ...createForm, severity: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-xl text-xs bg-white text-[#172B25] focus:outline-none focus:border-[#168A70]"
                  >
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#172B25] block mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  placeholder="Provide precise details, affected sectors, and guidance..."
                  className="w-full px-3 py-2 border border-[#E2E8F0] rounded-xl text-xs text-[#172B25] focus:outline-none focus:border-[#168A70]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#172B25] block mb-1">Source Agency</label>
                <input
                  type="text"
                  required
                  value={createForm.source}
                  onChange={(e) => setCreateForm({ ...createForm, source: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E2E8F0] rounded-xl text-xs text-[#172B25] focus:outline-none focus:border-[#168A70]"
                />
              </div>

              <button
                type="submit"
                disabled={createLoading}
                className="w-full py-2.5 bg-[#123B35] hover:bg-[#168A70] text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
              >
                {createLoading ? 'Broadcasting...' : 'Broadcast Alert'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
