import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { DollarSign, TrendingUp, TrendingDown, Download, FileText } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockTransactions, mockLines } from '../lib/mockData';

export function FinanceModule() {
  const revenues = mockTransactions.filter(t => t.type === 'revenue');
  const expenses = mockTransactions.filter(t => t.type === 'expense');
  
  const totalRevenue = revenues.reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = expenses.reduce((acc, t) => acc + t.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  const revenueByCategory = revenues.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const expenseByCategory = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = [
    { name: 'Billets', value: revenueByCategory['Billets'] || 0, type: 'revenue' },
    { name: 'Abonnements', value: revenueByCategory['Abonnements'] || 0, type: 'revenue' },
    { name: 'Carburant', value: expenseByCategory['Carburant'] || 0, type: 'expense' },
    { name: 'Maintenance', value: expenseByCategory['Maintenance'] || 0, type: 'expense' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Finance & Comptabilité</h1>
          <p className="text-gray-600">Gestion des recettes, dépenses et rapports financiers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-green-100 mb-2">Recettes Totales</p>
              <h2 className="mb-1">{(totalRevenue / 1000000).toFixed(2)}M</h2>
              <p className="text-sm text-green-100">FCFA</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-500 to-red-600 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-red-100 mb-2">Dépenses Totales</p>
              <h2 className="mb-1">{(totalExpenses / 1000000).toFixed(2)}M</h2>
              <p className="text-sm text-red-100">FCFA</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-100 mb-2">Bénéfice Net</p>
              <h2 className="mb-1">{(netProfit / 1000000).toFixed(2)}M</h2>
              <p className="text-sm text-blue-100">FCFA</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-purple-100 mb-2">Marge Bénéficiaire</p>
              <h2 className="mb-1">{((netProfit / totalRevenue) * 100).toFixed(1)}%</h2>
              <p className="text-sm text-purple-100">Rentabilité</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-4">Recettes vs Dépenses (milliers FCFA)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${(value / 1000).toFixed(0)}K FCFA`, 'Montant']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Bar 
                dataKey="value" 
                fill="#3B82F6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">Recettes par Ligne (milliers FCFA)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockLines}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tickFormatter={(val) => val.split(' - ')[0]} />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${(value / 1000).toFixed(0)}K FCFA`, 'Recettes']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Bar 
                dataKey="revenue" 
                fill="#10B981"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Transactions Tabs */}
      <Card className="p-6">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Toutes les Transactions</TabsTrigger>
            <TabsTrigger value="revenue">Recettes</TabsTrigger>
            <TabsTrigger value="expense">Dépenses</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Ligne</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map(transaction => (
                  <TableRow key={transaction.id}>
                    <TableCell>{new Date(transaction.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>
                      {transaction.type === 'revenue' ? (
                        <Badge className="bg-green-500">Recette</Badge>
                      ) : (
                        <Badge className="bg-red-500">Dépense</Badge>
                      )}
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      {transaction.lineId ? (
                        <Badge variant="outline">
                          {mockLines.find(l => l.id === transaction.lineId)?.name.split(' - ')[0]}
                        </Badge>
                      ) : '-'}
                    </TableCell>
                    <TableCell className={`text-right ${
                      transaction.type === 'revenue' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'revenue' ? '+' : '-'}
                      {(transaction.amount / 1000).toFixed(0)}K FCFA
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="revenue" className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Ligne</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenues.map(transaction => (
                  <TableRow key={transaction.id}>
                    <TableCell>{new Date(transaction.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      {transaction.lineId ? (
                        <Badge variant="outline">
                          {mockLines.find(l => l.id === transaction.lineId)?.name.split(' - ')[0]}
                        </Badge>
                      ) : '-'}
                    </TableCell>
                    <TableCell className="text-right text-green-600">
                      +{(transaction.amount / 1000).toFixed(0)}K FCFA
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="expense" className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map(transaction => (
                  <TableRow key={transaction.id}>
                    <TableCell>{new Date(transaction.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="text-right text-red-600">
                      -{(transaction.amount / 1000).toFixed(0)}K FCFA
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
