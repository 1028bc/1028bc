import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap, Marker, Popup, LayersControl, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

// Import JSON data
import logisticsData from '../data/logisticsNodes.json';

const { BaseLayer, Overlay } = LayersControl;

// --- CUSTOM ICONS ---
const userIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #38bdf8; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 20px #38bdf8;" class="animate-pulse"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

const jobIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #38bdf8; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 15px #38bdf8;"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

const gasIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #f59e0b; width: 10px; height: 10px; border-radius: 50%; border: 1px solid #000; box-shadow: 0 0 10px #f59e0b;"></div>`,
  iconSize: [10, 10],
  iconAnchor: [5, 5]
});

const autoIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #8b5cf6; width: 10px; height: 10px; border-radius: 2px; border: 1px solid #000; box-shadow: 0 0 10px #8b5cf6;"></div>`,
  iconSize: [10, 10],
  iconAnchor: [5, 5]
});

// --- MAP RESIZER ---
const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13); 
    setTimeout(() => map.invalidateSize(), 100);
  }, [center, map]);
  return null;
};

// --- ROUTING ENGINE ---
const RoutingMachine = ({ start, end, onRouteFound }: { start: [number, number], end: [number, number], onRouteFound?: (route: any) => void }) => {
  const map = useMap();

  useEffect(() => {
    if (!start || !end) return;

    const options: L.Routing.RoutingControlOptions = {
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1])
      ],
      lineOptions: {
        styles: [{ color: '#00d4ff', weight: 5, opacity: 0.8 }], // SolUrbana Blue trace
        extendToWaypoints: true,
        missingRouteTolerance: 0
      },
      show: false, // Hides the bulky text itinerary
      addWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true, // Automatically zooms to fit route bounds
      showAlternatives: false
    };

    // Forcibly inject the missing properties to bypass TS strict mode entirely
    (options as any).createMarker = () => null;
    (options as any).units = 'imperial'; // Forces Leaflet to return Miles/Feet

    const routingControl = L.Routing.control(options).addTo(map);

    // Intercept the calculated route and send it to the parent component
    routingControl.on('routesfound', (e: any) => {
      if (onRouteFound && e.routes && e.routes[0]) {
        onRouteFound(e.routes[0]);
      }
    });

    return () => {
      try {
        map.removeControl(routingControl);
      } catch (e) {
        // Suppress unmount errors common with this specific leaflet plugin in React 18
      }
    };
  }, [map, start, end, onRouteFound]);

  return null;
};

export interface JobNode {
  id?: string;
  title: string;
  location: string;
  coords?: [number, number];
  date?: string; 
  contact?: string;
  tools?: string;
  brand?: string;
}

// UPDATE: Added `center` to the interface props
export const TacticalMap = ({ 
  jobs, 
  activeJobId, 
  onRouteData,
  center = [36.0395, -114.9817] // Default to Henderson if no center is provided
}: { 
  jobs: JobNode[], 
  activeJobId?: string, 
  onRouteData?: (data: any) => void,
  center?: [number, number] 
}) => {
  
  // Initialize userCoords with the center prop passed from Vyk
  const [userCoords, setUserCoords] = useState<[number, number]>(center); 
  const [speed, setSpeed] = useState(0);

  // If the center prop changes (e.g. Supabase resolves the address later), update the local state
  useEffect(() => {
    setUserCoords(center);
  }, [center]);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setUserCoords([pos.coords.latitude, pos.coords.longitude]);
          if (pos.coords.speed) setSpeed(Math.round(pos.coords.speed * 2.2369)); // m/s to MPH
        },
        (err) => console.warn(err),
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const activeNodes = jobs.filter(j => j.coords);
  
  // Find the explicitly selected job to route to, fallback to the first active node
  const routingTarget = activeJobId ? activeNodes.find(j => j.id === activeJobId) : activeNodes[0];

  return (
    <div className="w-full h-full relative bg-[#0a0f16]">
      <MapContainer 
        center={userCoords} 
        zoom={13} 
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <MapController center={userCoords} />
        
        {/* NATIVE LEAFLET LAYER CONTROLS */}
        <LayersControl position="bottomright">
          <BaseLayer checked name="Tactical Dark (Detailed)">
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              className="tactical-map-filter" 
            />
          </BaseLayer>
          <BaseLayer name="Standard Street">
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="Esri Satellite">
            <TileLayer
              attribution='&copy; Esri'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              className="contrast-[1.1] saturate-[1.2]"
            />
          </BaseLayer>

          {/* OVERLAY: GAS STATIONS */}
          <Overlay name="Logistics: Fuel Stations">
            {logisticsData.gasStations.map((gas: any) => (
              <Marker key={gas.id} position={gas.coords as [number, number]} icon={gasIcon}>
                <Popup className="bg-black/90 border border-amber-500/30 text-white p-2 rounded-lg backdrop-blur-md">
                  <div className="font-display">
                    <p className="text-[10px] font-black uppercase text-amber-500">{gas.name}</p>
                    <p className="text-[12px] font-mono font-bold mt-1">REG: {gas.priceReg}</p>
                    <p className="text-[8px] text-white/40 uppercase mt-1">Updated {gas.updated}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </Overlay>

          {/* OVERLAY: AUTO SERVICE */}
          <Overlay name="Logistics: Auto Service">
            {logisticsData.autoService.map((auto: any) => (
              <Marker key={auto.id} position={auto.coords as [number, number]} icon={autoIcon}>
                <Popup className="bg-black/90 border border-purple-500/30 text-white p-2 rounded-lg backdrop-blur-md">
                  <div className="font-display">
                    <p className="text-[10px] font-black uppercase text-purple-400">{auto.name}</p>
                    <p className="text-[9px] text-white/80 mt-1 uppercase">{auto.service}</p>
                    {auto.price && <p className="text-[10px] font-mono text-emerald-400 mt-1">{auto.price}</p>}
                    {auto.nextAppt && <p className="text-[9px] text-amber-400 mt-1 uppercase">Next: {auto.nextAppt}</p>}
                  </div>
                </Popup>
              </Marker>
            ))}
          </Overlay>
        </LayersControl>

        {/* ACTIVE USER TELEMETRY NODE */}
        <Marker position={userCoords} icon={userIcon}>
          <Tooltip permanent direction="top" className="tactical-label" offset={[0, -10]}>START: HOME_BASE</Tooltip>
          <Popup className="bg-black/90 border border-emerald-500/30 text-white p-3 rounded-xl backdrop-blur-md min-w-[150px]">
             <div className="font-display">
                <p className="text-[10px] font-black uppercase text-emerald-400 tracking-widest border-b border-white/10 pb-1 mb-2">1028bc_URB</p>
                <div className="grid grid-cols-2 gap-2 text-[9px] uppercase font-mono">
                  <span className="text-white/50">Status:</span><span className="text-emerald-400 font-bold text-right">Active</span>
                  <span className="text-white/50">Speed:</span><span className="text-white text-right">{speed} MPH</span>
                  <span className="text-white/50 mt-1">Lat:</span><span className="text-white mt-1 text-right">{userCoords[0].toFixed(4)}</span>
                  <span className="text-white/50">Lng:</span><span className="text-white text-right">{userCoords[1].toFixed(4)}</span>
                </div>
              </div>
          </Popup>
        </Marker>

        {/* SCHEDULED JOB NODES */}
        {activeNodes.map((node) => (
          <Marker key={node.id} position={node.coords!} icon={jobIcon}>
            {routingTarget?.id === node.id && (
              <Tooltip permanent direction="top" className="tactical-label" offset={[0, -10]}>DEST: {node.id}</Tooltip>
            )}
            <Popup className="bg-black/90 border border-sky-500/30 text-white p-2 rounded-lg backdrop-blur-md">
              <div className="font-display">
                <p className="text-[10px] font-black uppercase text-sky-400">{node.title}</p>
                <p className="text-[9px] text-white/60 uppercase mt-1">{node.location}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* AUTO-ROUTE INJECTION */}
        {routingTarget && routingTarget.coords && (
          <RoutingMachine start={userCoords} end={routingTarget.coords} onRouteFound={onRouteData} />
        )}

        <ZoomControl position="bottomleft" />
      </MapContainer>

      {/* VIGNETTE SHADOW */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.9)] z-10" />
    </div>
  );
};