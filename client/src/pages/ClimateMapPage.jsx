import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import api, { getErrorMessage } from '../services/api';
import {
  Compass,
  Layers,
  Satellite,
  AlertTriangle,
  LifeBuoy,
  Cpu,
  Truck,
  Info,
  CheckCircle2,
  AlertCircle,
  Eye,
  Activity,
  MapPin,
  Navigation
} from 'lucide-react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

const createColorIcon = (colorHex, size = 22) =>
  new L.DivIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="background-color: ${colorHex}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.35);"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });

const emergencyIcon = createColorIcon('#DC2626'); 
const resourceIcon = createColorIcon('#2563EB');  
const warehouseIcon = createColorIcon('#168A70'); 
const userLocationIcon = createColorIcon('#38BDF8', 26); 

function MapViewController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function ClimateMapPage() {
  const [center, setCenter] = useState([22.5, 78.9]); 
  const [zoom, setZoom] = useState(5);

  const [userLocation, setUserLocation] = useState(null);
  const [locating, setLocating] = useState(false);

  const [emergencies, setEmergencies] = useState([]);
  const [devices, setDevices] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [risks, setRisks] = useState(null);
  const [satelliteData, setSatelliteData] = useState(null);

  const [layers, setLayers] = useState({
    emergencies: true,
    resources: true,
    warehouses: true,
    satellite: false
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMapData();
  }, []);

  const fetchMapData = async (lat = 28.6139, lon = 77.209) => {
    try {
      setLoading(true);
      const [emRes, devRes, whRes, riskRes, satRes] = await Promise.allSettled([
        api.get('/emergencies?verificationStatus=verified'),
        api.get('/resources/devices'),
        api.get('/warehouses'),
        api.get(`/climate/risks?lat=${lat}&lon=${lon}`),
        api.get(`/climate/satellite?lat=${lat}&lon=${lon}`)
      ]);

      if (emRes.status === 'fulfilled' && emRes.value.data?.success) {
        setEmergencies(emRes.value.data.reports || []);
      }
      if (devRes.status === 'fulfilled' && devRes.value.data?.success) {
        setDevices(devRes.value.data.devices || []);
      }
      if (whRes.status === 'fulfilled' && whRes.value.data?.success) {
        setWarehouses(whRes.value.data.warehouses || []);
      }
      if (riskRes.status === 'fulfilled' && riskRes.value.data?.success) {
        setRisks(riskRes.value.data);
      }
      if (satRes.status === 'fulfilled' && satRes.value.data?.success) {
        setSatelliteData(satRes.value.data.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation([latitude, longitude]);
        setCenter([latitude, longitude]);
        setZoom(12);
        setLocating(false);
        fetchMapData(latitude, longitude);
      },
      (err) => {
        setLocating(false);
        alert('Could not access current location: ' + err.message);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#168A70]/10 text-[#168A70] text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5" />
            Module 02: Climate Risk Cartography
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172B25] tracking-tight">
            Geospatial Intelligence & Risk Layers
          </h1>
          <p className="text-xs text-[#64748B]">
            Real OpenStreetMap cartography with verified emergency pins, IoT telemetry nodes, and risk calculations
          </p>
        </div>

        
        <div className="flex flex-wrap items-center gap-2">
          
          <button
            onClick={handleLocateUser}
            disabled={locating}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#123B35] hover:bg-[#168A70] text-white transition flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            <Navigation className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{locating ? 'Locating...' : 'Locate My Area'}</span>
          </button>

          
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <button
              onClick={() => setLayers({ ...layers, emergencies: !layers.emergencies })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                layers.emergencies
                  ? 'bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/30'
                  : 'text-[#64748B] hover:bg-[#F7FAF8]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span> Emergencies ({emergencies.length})
            </button>
            <button
              onClick={() => setLayers({ ...layers, resources: !layers.resources })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                layers.resources
                  ? 'bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/30'
                  : 'text-[#64748B] hover:bg-[#F7FAF8]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span> IoT Telemetry ({devices.length})
            </button>
            <button
              onClick={() => setLayers({ ...layers, warehouses: !layers.warehouses })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                layers.warehouses
                  ? 'bg-[#168A70]/10 text-[#168A70] border border-[#168A70]/30'
                  : 'text-[#64748B] hover:bg-[#F7FAF8]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#168A70]"></span> Relief Depots ({warehouses.length})
            </button>
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded-3xl p-3 border border-[#E2E8F0] shadow-sm">
        <div className="h-[540px] w-full rounded-2xl overflow-hidden relative">
          <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="h-full w-full">
            <MapViewController center={center} zoom={zoom} />

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            
            {userLocation && (
              <>
                <Marker position={userLocation} icon={userLocationIcon}>
                  <Popup>
                    <div className="p-1 space-y-1 text-xs">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#38BDF8]/20 text-[#123B35] block w-max">
                        📍 Your Current Position
                      </span>
                      <p className="font-bold text-[#172B25]">Active GPS Location</p>
                      <p className="text-[11px] text-[#64748B]">
                        Lat: {userLocation[0].toFixed(4)}°, Lon: {userLocation[1].toFixed(4)}°
                      </p>
                    </div>
                  </Popup>
                </Marker>
                <Circle
                  center={userLocation}
                  radius={5000}
                  pathOptions={{ color: '#38BDF8', fillColor: '#38BDF8', fillOpacity: 0.15, weight: 2 }}
                />
              </>
            )}

            
            {layers.emergencies &&
              emergencies.map((em) => {
                const lat = em.coordinates?.latitude || em.locationId?.latitude;
                const lon = em.coordinates?.longitude || em.locationId?.longitude;
                if (!lat || !lon) return null;

                return (
                  <Marker key={em._id} position={[lat, lon]} icon={emergencyIcon}>
                    <Popup>
                      <div className="p-1 space-y-1 text-xs">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#DC2626]/10 text-[#DC2626] block w-max">
                          {em.category?.replace('_', ' ')}
                        </span>
                        <p className="font-bold text-[#172B25]">{em.description}</p>
                        <p className="text-[11px] text-[#64748B]">Severity: {em.severity?.toUpperCase()}</p>
                        <p className="text-[10px] text-[#64748B]">{em.address || 'Reported Location'}</p>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}

            
            {layers.resources &&
              devices.map((dev) => {
                const lat = dev.locationId?.latitude;
                const lon = dev.locationId?.longitude;
                if (!lat || !lon) return null;

                return (
                  <Marker key={dev._id} position={[lat, lon]} icon={resourceIcon}>
                    <Popup>
                      <div className="p-1 space-y-1 text-xs">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#2563EB]/10 text-[#2563EB] block w-max">
                          {dev.deviceType?.replace('_', ' ')}
                        </span>
                        <p className="font-bold text-[#172B25]">{dev.name}</p>
                        <p className="text-[11px] text-[#64748B]">ID: {dev.deviceIdentifier}</p>
                        <p className="text-[10px] text-[#16A34A] font-bold">Status: {dev.healthStatus}</p>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}

            
            {layers.warehouses &&
              warehouses.map((wh) => {
                const lat = wh.locationId?.latitude;
                const lon = wh.locationId?.longitude;
                if (!lat || !lon) return null;

                return (
                  <Marker key={wh._id} position={[lat, lon]} icon={warehouseIcon}>
                    <Popup>
                      <div className="p-1 space-y-1 text-xs">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#168A70]/10 text-[#168A70] block w-max">
                          Relief Depot
                        </span>
                        <p className="font-bold text-[#172B25]">{wh.name}</p>
                        <p className="text-[11px] text-[#64748B]">{wh.address || wh.locationId?.name}</p>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
          </MapContainer>
        </div>
      </div>

      
      <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-base text-[#172B25] flex items-center gap-2">
              <Satellite className="w-5 h-5 text-[#168A70]" />
              Copernicus Data Space Ecosystem (Sentinel-2 / 1)
            </h3>
            <p className="text-xs text-[#64748B]">
              European Space Agency Earth Observation integration boundary
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold w-max ${
              satelliteData?.configured ? 'bg-[#16A34A]/10 text-[#16A34A]' : 'bg-[#F7FAF8] text-[#64748B] border border-[#E2E8F0]'
            }`}
          >
            {satelliteData?.configured ? 'Connected' : 'Not Configured (Demo Mode)'}
          </span>
        </div>

        
        <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] h-40">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
            alt="Copernicus Earth Observation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#123B35]/90 via-[#123B35]/60 to-transparent flex items-center p-6">
            <div className="max-w-md text-white space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#38BDF8]">
                Multispectral Satellite Imagery
              </span>
              <h4 className="font-bold text-sm sm:text-base">
                Sentinel-2 MSI & Sentinel-1 SAR Radar Layers
              </h4>
              <p className="text-xs text-white/80 line-clamp-2">
                Ground reflectance, NDVI vegetation vigor, and radar flood surface detection.
              </p>
            </div>
          </div>
        </div>

        {satelliteData && !satelliteData.configured ? (
          <div className="p-4 bg-[#F7FAF8] border border-[#E2E8F0] rounded-2xl text-xs text-[#64748B] space-y-2">
            <div className="flex items-center gap-2 text-[#172B25] font-bold">
              <Info className="w-4 h-4 text-[#168A70]" />
              Provider Status Notice
            </div>
            <p className="leading-relaxed">{satelliteData.message}</p>
            <p className="text-[11px] text-[#64748B] italic">
              In accordance with project specifications, simulated satellite tiles are strictly prohibited. Configure Copernicus credentials to query real Earth observation products.
            </p>
          </div>
        ) : (
          satelliteData?.products?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {satelliteData.products.map((prod) => (
                <div key={prod.id} className="p-3 bg-[#F7FAF8] rounded-xl border border-[#E2E8F0] text-xs">
                  <p className="font-bold text-[#172B25] truncate">{prod.name}</p>
                  <p className="text-[10px] text-[#64748B] mt-0.5">Date: {prod.contentDate}</p>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
