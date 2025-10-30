import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Search, Download, Eye, AlertTriangle, ShieldAlert, TrendingDown } from 'lucide-react';
import { mockIncidents, mockBuses, mockLines, mockTransactions } from '../lib/mockData';

export function AuditModule() {
  const highIncidents = mockIncidents.filter(i => i.severity === 'high');
  const fraudIncidents = mockIncidents.filter(i => i.type === 'fraud');
  const openIncidents = mockIncidents.filter(i => i.status === 'open');

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-red-500">Haute</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Moyenne</Badge>;
      case 'low':
        return <Badge className="bg-blue-500">Faible</Badge>;
      default:
        return <Badge>{severity}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeMap: Record<string, { label: string; color: string }> = {
      delay: { label: 'Retard', color: 'bg-yellow-500' },
      breakdown: { label: 'Panne', color: 'bg-red-500' },
      fraud: { label: 'Fraude', color: 'bg-purple-500' },
      accident: { label: 'Accident', color: 'bg-orange-500' }
    };
    const info = typeMap[type] || { label: type, color: 'bg-gray-500' };
    return <Badge className={info.color}>{info.label}</Badge>;
  };

  const getBusRegistration = (busId: string) => {
    const bus = mockBuses.find(b => b.id === busId);
    return bus?.registration || busId;
  };

  const getLineName = (lineId: string) => {
    const line = mockLines.find(l => l.id === lineId);
    return line?.name.split(' - ')[0] || lineId;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Audit & Contrôle</h1>
          <p className="text-gray-600">Surveillance des anomalies et rapports d'audit</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Vue d'ensemble
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Télécharger Rapport
          </Button>
        </div>
      </div>

      {/* Alert Banner */}
      <Card className="p-6 bg-red-50 border-l-4 border-red-500">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-red-600 mt-0.5" />
          <div>
            <h3 className="text-red-900 mb-1">Alertes Critiques</h3>
            <p className="text-red-700 text-sm">
              {highIncidents.length} incident(s) de haute sévérité nécessitant une attention immédiate
            </p>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border-l-4 border-red-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Incidents Ouverts</p>
              <h3>{openIncidents.length}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-purple-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Fraudes Détectées</p>
              <h3>{fraudIncidents.length}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-yellow-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Haute Sévérité</p>
              <h3>{highIncidents.length}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Incidents</p>
              <h3>{mockIncidents.length}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Incidents Table */}
      <Card>
        <div className="p-6 border-b">
          <h3>Tableau des Anomalies et Incidents</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Heure</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Bus</TableHead>
              <TableHead>Ligne</TableHead>
              <TableHead>Sévérité</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockIncidents.map(incident => (
              <TableRow key={incident.id}>
                <TableCell>
                  {new Date(incident.date).toLocaleDateString('fr-FR')}<br />
                  <span className="text-xs text-gray-500">
                    {new Date(incident.date).toLocaleTimeString('fr-FR')}
                  </span>
                </TableCell>
                <TableCell>{getTypeBadge(incident.type)}</TableCell>
                <TableCell>
                  <Badge variant="outline">{getBusRegistration(incident.busId)}</Badge>
                </TableCell>
                <TableCell>{getLineName(incident.lineId)}</TableCell>
                <TableCell>{getSeverityBadge(incident.severity)}</TableCell>
                <TableCell className="max-w-xs">
                  <p className="text-sm truncate">{incident.description}</p>
                </TableCell>
                <TableCell>
                  {incident.status === 'open' ? (
                    <Badge className="bg-red-500">Ouvert</Badge>
                  ) : (
                    <Badge className="bg-green-500">Résolu</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    Voir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Audit Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-4">Rapports d'Audit Disponibles</h3>
          <div className="space-y-3">
            {[
              { name: 'Rapport Mensuel Octobre 2025', date: '2025-10-30', type: 'Complet' },
              { name: 'Audit Fraudes Q3 2025', date: '2025-09-30', type: 'Fraude' },
              { name: 'Incidents Hebdomadaire', date: '2025-10-28', type: 'Incidents' },
              { name: 'Analyse Performance Lignes', date: '2025-10-25', type: 'Performance' }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Search className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm">{report.name}</p>
                    <p className="text-xs text-gray-500">{report.date} • {report.type}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">Contrôles de Transactions</h3>
          <div className="space-y-3">
            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Transactions Vérifiées</span>
                <Badge className="bg-green-500">{mockTransactions.length}</Badge>
              </div>
              <p className="text-xs text-gray-600">Toutes les transactions sont conformes</p>
            </div>

            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">En Révision</span>
                <Badge className="bg-yellow-500">2</Badge>
              </div>
              <p className="text-xs text-gray-600">Transactions nécessitant validation</p>
            </div>

            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Anomalies Détectées</span>
                <Badge className="bg-red-500">{fraudIncidents.length}</Badge>
              </div>
              <p className="text-xs text-gray-600">Fraudes ou irrégularités détectées</p>
            </div>

            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Logs d'Accès</span>
                <Badge className="bg-blue-500">142</Badge>
              </div>
              <p className="text-xs text-gray-600">Accès système des 24 dernières heures</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
