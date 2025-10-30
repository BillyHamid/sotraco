import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Wrench, Calendar, AlertCircle, CheckCircle, Clock, Plus } from 'lucide-react';
import { mockMaintenance, mockBuses } from '../lib/mockData';

export function MaintenanceModule() {
  const planned = mockMaintenance.filter(m => m.status === 'planned');
  const inProgress = mockMaintenance.filter(m => m.status === 'in_progress');
  const completed = mockMaintenance.filter(m => m.status === 'completed');
  
  const totalCost = mockMaintenance.reduce((acc, m) => acc + m.cost, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'planned':
        return <Badge className="bg-blue-500">Planifié</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-500">En cours</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Terminé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    return type === 'preventive' ? (
      <Badge variant="outline" className="border-green-500 text-green-600">Préventif</Badge>
    ) : (
      <Badge variant="outline" className="border-red-500 text-red-600">Correctif</Badge>
    );
  };

  const getBusRegistration = (busId: string) => {
    const bus = mockBuses.find(b => b.id === busId);
    return bus?.registration || busId;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Gestion de la Maintenance</h1>
          <p className="text-gray-600">Planification et suivi des interventions</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Planifier Intervention
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Planifiées</p>
              <h3>{planned.length}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-yellow-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">En cours</p>
              <h3>{inProgress.length}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-green-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Terminées</p>
              <h3>{completed.length}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-purple-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Wrench className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Coût Total</p>
              <h3>{(totalCost / 1000).toFixed(0)}K</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="p-6 bg-yellow-50 border-l-4 border-yellow-500">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="text-yellow-900 mb-1">Alertes de Maintenance</h3>
            <p className="text-yellow-700 text-sm">
              3 bus nécessitent une révision dans les 7 prochains jours
            </p>
          </div>
        </div>
      </Card>

      {/* Maintenance Schedule */}
      <Card>
        <div className="p-6 border-b">
          <h3>Planning des Interventions</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bus</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date Planifiée</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Coût Estimé</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMaintenance.map(maintenance => (
              <TableRow key={maintenance.id}>
                <TableCell>
                  <Badge variant="outline">{getBusRegistration(maintenance.busId)}</Badge>
                </TableCell>
                <TableCell>{getTypeBadge(maintenance.type)}</TableCell>
                <TableCell>{maintenance.description}</TableCell>
                <TableCell>{new Date(maintenance.scheduledDate).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{getStatusBadge(maintenance.status)}</TableCell>
                <TableCell className="text-right">{(maintenance.cost / 1000).toFixed(0)}K FCFA</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Détails
                    </Button>
                    {maintenance.status === 'planned' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Démarrer
                      </Button>
                    )}
                    {maintenance.status === 'in_progress' && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Terminer
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Parts Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-4">Stock de Pièces Détachées</h3>
          <div className="space-y-3">
            {[
              { name: 'Filtres à huile', qty: 24, min: 10, status: 'ok' },
              { name: 'Plaquettes de frein', qty: 8, min: 15, status: 'low' },
              { name: 'Pneus', qty: 12, min: 8, status: 'ok' },
              { name: 'Batteries', qty: 3, min: 5, status: 'low' }
            ].map((part, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm">{part.name}</p>
                  <p className="text-xs text-gray-500">Minimum: {part.min} unités</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={part.status === 'low' ? 'text-red-600' : 'text-green-600'}>
                    {part.qty} unités
                  </span>
                  {part.status === 'low' && (
                    <Badge className="bg-red-500">Stock Bas</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">Documents Bus à Renouveler</h3>
          <div className="space-y-3">
            {[
              { bus: 'AB-1234-CD', doc: 'Assurance', expires: '2025-11-15', days: 16 },
              { bus: 'AB-5678-CD', doc: 'Visite Technique', expires: '2025-12-01', days: 32 },
              { bus: 'AB-9012-CD', doc: 'Assurance', expires: '2025-11-05', days: 6 }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border-l-4 ${
                  item.days < 10 ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">{item.bus} - {item.doc}</p>
                    <p className="text-xs text-gray-600">Expire le {item.expires}</p>
                  </div>
                  <Badge className={item.days < 10 ? 'bg-red-500' : 'bg-yellow-500'}>
                    {item.days}j
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
