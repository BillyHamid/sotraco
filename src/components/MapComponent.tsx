import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ZoomIn, ZoomOut, Navigation } from 'lucide-react';
import { mockBuses, mockLines } from '../lib/mockData';
import { ouagadougouRoutes } from '../lib/ouagadougouRoutes';

interface MapComponentProps {
  selectedLine: string | null;
  selectedBus: string | null;
  onSelectBus: (busId: string) => void;
}

export default function MapComponent({ selectedLine, selectedBus, onSelectBus }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    // Dynamically import Leaflet
    import('leaflet').then((L) => {
      if (mapInstanceRef.current) return;

      // Load CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Initialize map centered on Ouagadougou, Burkina Faso
      const map = L.map(mapRef.current!).setView([12.3714, -1.5197], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      mapInstanceRef.current = map;

      // Draw routes and add markers
      updateMap(L);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        updateMap(L);
      });
    }
  }, [selectedLine, selectedBus]);

  const updateMap = (L: any) => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const activeBuses = mockBuses.filter(b => b.status === 'active');
    const filteredBuses = selectedLine 
      ? activeBuses.filter(b => b.lineId === selectedLine)
      : activeBuses;

    // Draw routes and stops
    mockLines.forEach(line => {
      if (selectedLine && selectedLine !== line.id) return;

      const routeData = ouagadougouRoutes[line.id as keyof typeof ouagadougouRoutes];
      if (!routeData) return;
      
      // Draw route line
      const polyline = L.polyline(routeData.path, {
        color: line.color,
        weight: 4,
        opacity: 0.7
      }).addTo(mapInstanceRef.current);
      markersRef.current.push(polyline);

      // Draw bus stops
      routeData.stops.forEach((stop, idx) => {
        const stopIcon = L.divIcon({
          html: `<div style="width: 24px; height: 24px;">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="white" stroke="${line.color}" stroke-width="3"/>
              <circle cx="12" cy="12" r="4" fill="${line.color}"/>
            </svg>
          </div>`,
          className: 'custom-stop-icon',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = L.marker(stop.coords, { icon: stopIcon })
          .bindPopup(`
            <div style="padding: 8px;">
              <p style="font-weight: 600; font-size: 12px; margin: 0;">${stop.name}</p>
              <p style="font-size: 11px; color: #666; margin: 4px 0 0 0;">${line.name}</p>
            </div>
          `)
          .addTo(mapInstanceRef.current);
        markersRef.current.push(marker);
      });
    });

    // Add bus markers
    filteredBuses.forEach(bus => {
      const line = mockLines.find(l => l.id === bus.lineId);
      if (!line) return;

      const iconColor = bus.status === 'active' ? line.color : bus.status === 'maintenance' ? '#F59E0B' : '#6B7280';
      
      const busIcon = L.divIcon({
        html: `<div style="width: 40px; height: 40px;">
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="${iconColor}" opacity="0.9"/>
            <circle cx="20" cy="20" r="15" fill="white" opacity="0.3"/>
            <path d="M12 16h16v8H12z M14 14h12v2H14z M16 26h8v2h-8z" fill="white"/>
            <circle cx="16" cy="28" r="2" fill="white"/>
            <circle cx="24" cy="28" r="2" fill="white"/>
          </svg>
        </div>`,
        className: 'custom-bus-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const marker = L.marker([bus.gpsLat, bus.gpsLng], { icon: busIcon })
        .bindPopup(`
          <div style="padding: 12px; min-width: 200px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <div style="width: 32px; height: 32px; background-color: ${line.color}; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <p style="font-weight: 600; font-size: 13px; margin: 0;">${bus.registration}</p>
                <p style="font-size: 11px; color: #666; margin: 0;">${bus.model}</p>
              </div>
            </div>
            <div style="font-size: 11px; line-height: 1.8;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #666;">Ligne:</span>
                <span style="font-weight: 500; color: ${line.color};">${line.name.split(' - ')[0]}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #666;">Chauffeur:</span>
                <span style="font-weight: 500;">${bus.driver}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #666;">Remplissage:</span>
                <span style="font-weight: 500;">${bus.fillRate}%</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #666;">Capacité:</span>
                <span style="font-weight: 500;">${bus.capacity} places</span>
              </div>
            </div>
          </div>
        `)
        .on('click', () => onSelectBus(bus.id))
        .addTo(mapInstanceRef.current);
      
      markersRef.current.push(marker);
    });
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  return (
    <div className="h-[600px] relative">
      <div ref={mapRef} className="h-full w-full rounded-lg" />
      
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <Button
          size="sm"
          variant="outline"
          className="bg-white shadow-lg"
          onClick={handleZoomIn}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-white shadow-lg"
          onClick={handleZoomOut}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-xs text-gray-600 z-[1000]">
        © <a href="https://leafletjs.com" target="_blank" rel="noopener noreferrer" className="text-blue-600">Leaflet</a> | 
        © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="text-blue-600">OpenStreetMap</a>
      </div>
    </div>
  );
}