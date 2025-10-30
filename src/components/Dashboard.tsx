import { KPICard } from './KPICard';
import { Card } from './ui/card';
import { Bus, Clock, AlertTriangle, TrendingUp, Users, DollarSign, Wrench, Activity } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockBuses, mockLines, mockIncidents, mockTransactions } from '../lib/mockData';
import { UserRole } from '../types';

interface DashboardProps {
  userRole: UserRole;
}

export function Dashboard({ userRole }: DashboardProps) {
  const activeBuses = mockBuses.filter(b => b.status === 'active').length;
  const maintenanceBuses = mockBuses.filter(b => b.status === 'maintenance').length;
  const openIncidents = mockIncidents.filter(i => i.status === 'open').length;
  const avgFillRate = Math.round(mockBuses.reduce((acc, b) => acc + b.fillRate, 0) / mockBuses.length);
  
  const totalRevenue = mockTransactions
    .filter(t => t.type === 'revenue')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const totalExpenses = mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  // Data for charts
  const revenueByLine = mockLines.map(line => ({
    name: line.name.split(' - ')[0],
    revenue: line.revenue / 1000,
    color: line.color
  }));

  const fillRateData = mockLines.map(line => {
    const lineBuses = mockBuses.filter(b => b.lineId === line.id && b.status === 'active');
    const avgFill = lineBuses.length > 0 
      ? Math.round(lineBuses.reduce((acc, b) => acc + b.fillRate, 0) / lineBuses.length)
      : 0;
    return {
      name: line.name.split(' - ')[0],
      fillRate: avgFill
    };
  });

  const incidentData = [
    { name: 'Retards', value: mockIncidents.filter(i => i.type === 'delay').length, color: '#F59E0B' },
    { name: 'Pannes', value: mockIncidents.filter(i => i.type === 'breakdown').length, color: '#EF4444' },
    { name: 'Fraudes', value: mockIncidents.filter(i => i.type === 'fraud').length, color: '#8B5CF6' },
    { name: 'Accidents', value: mockIncidents.filter(i => i.type === 'accident').length, color: '#EC4899' }
  ];

  const weeklyRevenue = [
    { day: 'Lun', revenue: 1.2, expenses: 0.8 },
    { day: 'Mar', revenue: 1.4, expenses: 0.9 },
    { day: 'Mer', revenue: 1.3, expenses: 0.7 },
    { day: 'Jeu', revenue: 1.5, expenses: 1.0 },
    { day: 'Ven', revenue: 1.8, expenses: 0.9 },
    { day: 'Sam', revenue: 2.1, expenses: 0.8 },
    { day: 'Dim', revenue: 1.9, expenses: 0.7 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Tableau de Bord</h1>
        <p className="text-gray-600">Vue d'ensemble en temps réel du système de transport</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Bus Actifs"
          value={activeBuses}
          icon={Bus}
          color="#10B981"
          subtitle={`${maintenanceBuses} en maintenance`}
          trend={{ value: 5.2, isPositive: true }}
        />
        <KPICard
          title="Taux de Remplissage"
          value={`${avgFillRate}%`}
          icon={Users}
          color="#3B82F6"
          trend={{ value: 2.1, isPositive: true }}
        />
        <KPICard
          title="Incidents Ouverts"
          value={openIncidents}
          icon={AlertTriangle}
          color="#EF4444"
          trend={{ value: 12.5, isPositive: false }}
        />
        <KPICard
          title="Recettes Journalières"
          value={`${(totalRevenue / 1000).toFixed(0)}K FCFA`}
          icon={DollarSign}
          color="#F59E0B"
          trend={{ value: 8.3, isPositive: true }}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Line */}
        <Card className="p-6">
          <h3 className="mb-4">Recettes par Ligne (milliers FCFA)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByLine}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${value}K FCFA`, 'Recettes']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                {revenueByLine.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Fill Rate */}
        <Card className="p-6">
          <h3 className="mb-4">Taux de Remplissage par Ligne (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fillRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Taux']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="fillRate" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Trend */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="mb-4">Évolution Hebdomadaire (millions FCFA)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Recettes"
                dot={{ fill: '#10B981', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#EF4444" 
                strokeWidth={2}
                name="Dépenses"
                dot={{ fill: '#EF4444', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Incidents Distribution */}
        <Card className="p-6">
          <h3 className="mb-4">Répartition Incidents</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={incidentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {incidentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-purple-600" />
            <h3>Activité Récente</h3>
          </div>
          <div className="space-y-3">
            {mockIncidents.slice(0, 5).map(incident => (
              <div key={incident.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  incident.severity === 'high' ? 'bg-red-500' :
                  incident.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{incident.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Bus {incident.busId} - {new Date(incident.date).toLocaleString('fr-FR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3>Performance du Jour</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span>Recettes Totales</span>
              <span className="text-green-600">{(totalRevenue / 1000).toFixed(0)}K FCFA</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span>Dépenses Totales</span>
              <span className="text-red-600">{(totalExpenses / 1000).toFixed(0)}K FCFA</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span>Bénéfice Net</span>
              <span className="text-blue-600">{((totalRevenue - totalExpenses) / 1000).toFixed(0)}K FCFA</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span>Kilomètres Parcourus</span>
              <span className="text-purple-600">2,450 km</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
