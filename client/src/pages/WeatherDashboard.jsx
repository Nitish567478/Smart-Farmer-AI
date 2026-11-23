import React, { useState, useEffect } from 'react';
import api, { getErrorMessage } from '../services/api';
import {
  CloudSun,
  Droplets,
  Wind,
  Compass,
  Calendar,
  CloudRain,
  Sun,
  AlertCircle,
  MapPin,
  Clock
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function WeatherDashboard() {
  const [selectedCity, setSelectedCity] = useState({ name: 'New Delhi', lat: 28.6139, lon: 77.209 });
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const CITIES = [
    { name: 'New Delhi', lat: 28.6139, lon: 77.209 },
    { name: 'Mumbai', lat: 19.076, lon: 72.8777 },
    { name: 'Bengaluru', lat: 12.9716, lon: 77.5946 },
    { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
    { name: 'Ludhiana', lat: 30.901, lon: 75.8573 },
    { name: 'Puri', lat: 19.8135, lon: 85.8312 }
  ];

  useEffect(() => {
    fetchWeather();
  }, [selectedCity]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get(`/weather/current?lat=${selectedCity.lat}&lon=${selectedCity.lon}`);
      if (res.data?.success) {
        setWeatherData(res.data.data);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const current = weatherData?.current;
  const daily = weatherData?.daily || [];
  const hourly = weatherData?.hourly || [];

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[#168A70] text-xs font-bold mb-1 border border-emerald-200">
            <CloudSun className="w-3.5 h-3.5" />
            Meteorological Intelligence
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#172B25] tracking-tight">
            Weather Observations & 7-Day Forecast
          </h1>
          <p className="text-xs text-[#64748B]">
            Real meteorological data provided by Open-Meteo API (WMO compliant)
          </p>
        </div>

        
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#168A70]" />
          <select
            value={selectedCity.name}
            onChange={(e) => {
              const found = CITIES.find((c) => c.name === e.target.value);
              if (found) setSelectedCity(found);
            }}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] font-bold text-xs text-[#172B25] focus:outline-none focus:ring-2 focus:ring-[#168A70]/20 shadow-sm"
          >
            {CITIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-[#DC2626]">
          {error}
        </div>
      )}

      
      <div className="bg-[#123B35] rounded-2xl p-6 sm:p-8 text-white shadow-sm space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[#38BDF8] uppercase tracking-wider block">
              Current Conditions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              {current?.temperature ?? '--'}°C
            </h2>
            <p className="text-sm font-medium text-slate-300 mt-0.5">
              {current?.condition} • Feels like {current?.apparentTemperature}°C
            </p>
          </div>

          <div className="text-right text-[11px] text-slate-300 space-y-1">
            <p>Coordinates: {weatherData?.coordinates?.latitude}, {weatherData?.coordinates?.longitude}</p>
            <p>Timezone: {weatherData?.timezone}</p>
            <p>Observed: {current?.time ? new Date(current.time).toLocaleTimeString() : '--'}</p>
          </div>
        </div>

        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
          <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-300 font-bold uppercase flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-[#38BDF8]" /> Relative Humidity
            </span>
            <p className="text-lg font-bold text-white">{current?.relativeHumidity ?? '--'}%</p>
          </div>

          <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-300 font-bold uppercase flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-[#38BDF8]" /> Wind Velocity
            </span>
            <p className="text-lg font-bold text-white">{current?.windSpeed ?? '--'} km/h</p>
          </div>

          <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-300 font-bold uppercase flex items-center gap-1.5">
              <CloudRain className="w-3.5 h-3.5 text-[#38BDF8]" /> Precipitation
            </span>
            <p className="text-lg font-bold text-white">{current?.precipitation ?? 0} mm</p>
          </div>

          <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-300 font-bold uppercase flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-[#38BDF8]" /> Cloud Cover
            </span>
            <p className="text-lg font-bold text-white">{current?.cloudCover ?? 0}%</p>
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm space-y-3">
        <h3 className="font-bold text-base text-[#172B25]">
          24-Hour Temperature Trend (°C)
        </h3>
        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourly}>
              <XAxis
                dataKey="time"
                tickFormatter={(val) => val.split('T')[1]?.slice(0, 5) || val}
                stroke="#64748B"
                fontSize={11}
              />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#123B35', borderRadius: '10px', color: '#fff', fontSize: '11px', border: 'none' }}
                labelFormatter={(val) => `Time: ${val}`}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#168A70"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      
      <div className="space-y-3">
        <h3 className="font-bold text-base text-[#172B25]">
          7-Day Weather Forecast
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {daily.map((d, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl border border-[#E2E8F0] text-center space-y-1.5 hover:border-[#168A70] transition shadow-sm"
            >
              <span className="text-[11px] font-bold text-[#64748B] block">
                {new Date(d.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
              <p className="text-xs font-semibold text-[#172B25] truncate">{d.condition}</p>
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                <span className="text-[#172B25]">{Math.round(d.tempMax)}°</span>
                <span className="text-[#64748B] font-normal">/ {Math.round(d.tempMin)}°</span>
              </div>
              <div className="text-[10px] text-[#2563EB] font-medium">
                {d.precipitationSum > 0 ? `${d.precipitationSum} mm` : 'No rain'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
