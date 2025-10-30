import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Navigation, Layers, ZoomIn, ZoomOut } from 'lucide-react';
import { mockBuses, mockLines } from '../lib/mockData';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement de la carte...</p>
      </div>
    </div>
  )
});

export function LiveMap() {
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeBuses = mockBuses.filter(b => b.status === 'active');
  const filteredBuses = selectedLine 
    ? activeBuses.filter(b => b.lineId === selectedLine)
    : activeBuses;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Carte des Trajets - Suivi en Temps Réel</h1>
              <p className="text-sm text-gray-500">
                Dernière mise à jour : {currentTime.toLocaleTimeString('fr-FR')}
              </p>
            </div>
          </div>
          
          <Badge className="bg-green-500 text-white">
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-white rounded-full" />
              En direct
            </motion.div>
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 flex-wrap">
          <Button 
            size="sm" 
            variant={selectedLine === null ? 'default' : 'outline'}
            onClick={() => setSelectedLine(null)}
            className={selectedLine === null ? 'bg-blue-600' : ''}
          >
            Toutes les lignes
          </Button>
          {mockLines.map(line => (
            <Button
              key={line.id}
              size="sm"
              variant={selectedLine === line.id ? 'default' : 'outline'}
              onClick={() => setSelectedLine(line.id)}
              style={{
                backgroundColor: selectedLine === line.id ? line.color : undefined,
                borderColor: line.color,
                color: selectedLine === line.id ? 'white' : line.color
              }}
            >
              {line.name.split(' - ')[0]}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map */}
        <div className="lg:col-span-3">
          <Card className="p-0 overflow-hidden shadow-lg border-0">
            <MapComponent
              selectedLine={selectedLine}
              selectedBus={selectedBus}
              onSelectBus={setSelectedBus}
            />
          </Card>
        </div>

        {/* Sidebar - Bus List */}
        <div className="lg:col-span-1">
          <Card className="p-4 h-[600px] overflow-y-auto shadow-lg border-0">
            <div className="flex items-center gap-2 mb-4">
              <Navigation className="w-5 h-5 text-blue-600" />
              <h3 className="text-gray-900">Bus en Service</h3>
            </div>
            
            <div className="space-y-3">
              {filteredBuses.map(bus => {
                const line = mockLines.find(l => l.id === bus.lineId);
                if (!line) return null;
                
                return (
                  <div
                    key={bus.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedBus === bus.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    onClick={() => setSelectedBus(bus.id)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: line.color }}
                      >
                        <Navigation className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{bus.registration}</p>
                        <p className="text-xs text-gray-500 truncate">{bus.model}</p>
                      </div>
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className="text-xs mb-2"
                      style={{ 
                        borderColor: line.color,
                        color: line.color 
                      }}
                    >
                      {line.name.split(' - ')[0]}
                    </Badge>
                    
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>👤 {bus.driver}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="h-1.5 rounded-full"
                            style={{ 
                              width: `${bus.fillRate}%`,
                              backgroundColor: line.color 
                            }}
                          />
                        </div>
                        <span className="text-xs">{bus.fillRate}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredBuses.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Navigation className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Aucun bus actif</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-white border-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Navigation className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Bus actifs</p>
              <p className="text-xl text-gray-900">{activeBuses.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white border-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Lignes</p>
              <p className="text-xl text-gray-900">{mockLines.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white border-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Arrêts totaux</p>
              <p className="text-xl text-gray-900">
                {mockLines.reduce((acc, line) => acc + line.stops, 0)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white border-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Navigation className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Taux moyen</p>
              <p className="text-xl text-gray-900">
                {Math.round(activeBuses.reduce((acc, b) => acc + b.fillRate, 0) / activeBuses.length)}%
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
