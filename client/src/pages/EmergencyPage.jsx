import React, { useState, useEffect } from 'react';
import api, { getErrorMessage } from '../services/api';
import {
  LifeBuoy,
  Plus,
  MapPin,
  Clock,
  Camera,
  AlertCircle,
  CheckCircle,
  FileText,
  PhoneCall,
  ShieldAlert,
  Flame,
  CloudRain,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

export default function EmergencyPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [form, setForm] = useState({
    category: 'flood',
    description: '',
    address: '',
    latitude: 28.6139,
    longitude: 77.209
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const CATEGORIES = [
    {
      id: 'flood',
      label: 'Flood & Water Inundation',
      desc: 'Submerged roads, breached embankments, trapped settlements',
      image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'storm',
      label: 'Severe Storm / Cyclone',
      desc: 'Gale-force winds, uprooted transmission lines, roof damage',
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'heat_emergency',
      label: 'Extreme Heatwave Crisis',
      desc: 'Heat stroke cluster, blackouts during peak temperature',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'infrastructure_disruption',
      label: 'Bridge / Road Grid Collapse',
      desc: 'Severed connectivity, washed-out highways, collapsed culverts',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'water_shortage',
      label: 'Acute Water Crisis',
      desc: 'Contaminated supply, dried public borewells, hospital deficit',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80'
    }
  ];

  useEffect(() => {
    fetchMyReports();
  }, []);

  const fetchMyReports = async () => {
    try {
      setLoading(true);
      const res = await api.get('/emergencies/my');
      if (res.data?.success) {
        setReports(res.data.reports || []);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleCaptureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setForm({
            ...form,
            latitude: parseFloat(pos.coords.latitude.toFixed(5)),
            longitude: parseFloat(pos.coords.longitude.toFixed(5))
          });
        },
        () => alert('Unable to retrieve device GPS coordinates.')
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('category', form.category);
      formData.append('description', form.description);
      formData.append('address', form.address);
      formData.append(
        'coordinates',
        JSON.stringify({ latitude: form.latitude, longitude: form.longitude })
      );

      if (selectedFile) {
        formData.append('images', selectedFile);
      }

      const res = await api.post('/emergencies', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data?.success) {
        setReports([res.data.report, ...reports]);
        setShowSubmitModal(false);
        setForm({
          category: 'flood',
          description: '',
          address: '',
          latitude: 28.6139,
          longitude: 77.209
        });
        setSelectedFile(null);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-red-950 via-[#451212] to-[#2b0d0d] text-white p-8 sm:p-12 shadow-xl border border-red-500/20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80')`
          }}
        />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-400/20 text-red-300 text-xs font-bold border border-red-400/30">
              <ShieldAlert className="w-3.5 h-3.5" />
              Module 04 • Citizen Crisis Coordination Desk
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Emergency Reporting & Rescue Dispatch
            </h1>
            <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed">
              File emergency reports with exact GPS coordinates and photo evidence. Verified incidents trigger automatic officer alert dispatches.
            </p>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-xl shadow-red-600/30 transition transform hover:-translate-y-0.5 flex items-center gap-2 flex-shrink-0"
          >
            <Plus className="w-5 h-5" />
            File New Crisis Report
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">
              Select Incident Category
            </h3>
            <p className="text-xs text-slate-500">
              Choose the disaster type to start your emergency submission
            </p>
          </div>
          <span className="text-xs font-bold text-red-600">5 Disaster Classifications</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setForm({ ...form, category: cat.id });
                setShowSubmitModal(true);
              }}
              className="group rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-red-400 transition transform hover:-translate-y-1 shadow-sm text-left flex flex-col justify-between"
            >
              <div className="h-28 w-full relative overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute bottom-2 left-2 text-white font-extrabold text-xs">
                  {cat.label}
                </span>
              </div>
              <div className="p-3 text-[10px] text-slate-500 leading-snug">
                {cat.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              National Disaster Helpline
            </span>
            <p className="text-lg font-black text-slate-900">1078 / 112</p>
            <p className="text-[11px] text-slate-500">Toll-free 24/7 disaster response</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <CloudRain className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Central Water Commission (CWC)
            </span>
            <p className="text-lg font-black text-slate-900">Flood Inundation Watch</p>
            <p className="text-[11px] text-slate-500">Monitoring major river basin crests</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              IMD Severe Weather Center
            </span>
            <p className="text-lg font-black text-slate-900">Official Warning Bulletin</p>
            <p className="text-[11px] text-slate-500">Cyclone & heatwave alerts</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-900">
            Your Filed Emergency Reports ({reports.length})
          </h3>
          <span className="text-xs text-slate-500">All updates broadcast in real-time</span>
        </div>

        {reports.length === 0 ? (
          <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-2">
            <LifeBuoy className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-bold text-sm text-slate-700">No Incidents Reported by You</h4>
            <p className="text-xs text-slate-500">
              When you file an emergency report, tracking numbers and verification status will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((rep) => (
              <div
                key={rep._id}
                className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-red-50 text-red-700 border border-red-200">
                      {rep.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      Case #{rep._id.slice(-6)}
                    </span>
                    <span
                      className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        rep.verificationStatus === 'verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rep.verificationStatus === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {rep.verificationStatus}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Reported: {new Date(rep.createdAt).toLocaleString()}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                  {rep.description}
                </p>

                {rep.imageUrls?.length > 0 && (
                  <div className="flex items-center gap-2 pt-1">
                    {rep.imageUrls.map((img, i) => (
                      <a key={i} href={img} target="_blank" rel="noreferrer">
                        <img
                          src={img}
                          alt="Evidence"
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 hover:opacity-80 transition"
                        />
                      </a>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{rep.address || 'GPS Coordinates Recorded'}</span>
                  </div>
                  {rep.assignedOfficerId && (
                    <div className="text-emerald-700 font-bold">
                      Assigned Officer: {rep.assignedOfficerId.name}
                    </div>
                  )}
                </div>

                {rep.statusHistory?.length > 0 && (
                  <div className="p-3 bg-slate-50 rounded-2xl text-[11px] text-slate-600 space-y-1">
                    <span className="font-bold text-slate-700 block">Incident Status Log:</span>
                    {rep.statusHistory.map((sh, idx) => (
                      <p key={idx}>
                        • <strong>{sh.status}:</strong> {sh.note} ({new Date(sh.updatedAt).toLocaleTimeString()})
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <h4 className="font-extrabold text-lg text-slate-900">
              Submit Crisis Incident Report
            </h4>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Disaster Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs bg-white font-medium"
                >
                  <option value="flood">Flood / Inundation</option>
                  <option value="storm">Severe Storm / Cyclone</option>
                  <option value="heat_emergency">Heat Emergency</option>
                  <option value="water_shortage">Acute Water Shortage</option>
                  <option value="infrastructure_disruption">Bridge / Road Collapse</option>
                  <option value="other">Other Crisis</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Incident Description</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Detail the emergency, trapped persons count, and immediate life-support needs..."
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Location Address / Landmark</label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="e.g. Village Rampur, Near Bridge #4, Puri District"
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs">
                <span className="text-[11px] text-slate-600 font-mono">
                  GPS: {form.latitude}, {form.longitude}
                </span>
                <button
                  type="button"
                  onClick={handleCaptureLocation}
                  className="text-xs text-brand-primary font-bold hover:underline"
                >
                  Fetch Device Coordinates
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Upload Photo Evidence (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="w-full text-xs text-slate-500 file:mr-2 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-1/2 py-3 bg-brand-danger hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-lg shadow-red-600/20 disabled:opacity-50"
                >
                  {submitting ? 'Transmitting Report...' : 'Broadcast Emergency'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
