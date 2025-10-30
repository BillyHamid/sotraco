import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './ui/dialog';
import { Search, Filter, Plus, MapPin, Wrench, FileText, Edit, Trash2, Bus as BusIcon } from 'lucide-react';
import { mockBuses, mockLines, mockDrivers } from '../lib/mockData';
import { toast } from 'sonner@2.0.3';
import { Bus } from '../types';

export function FleetManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [lineFilter, setLineFilter] = useState('all');
  const [buses, setBuses] = useState(mockBuses);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentBus, setCurrentBus] = useState<Bus | null>(null);
  const [formData, setFormData] = useState({
    registration: '',
    model: '',
    capacity: 80,
    lineId: '',
    driver: '',
    status: 'active' as 'active' | 'maintenance' | 'inactive'
  });

  const filteredBuses = buses.filter(bus => {
    const matchesSearch = bus.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bus.status === statusFilter;
    const matchesLine = lineFilter === 'all' || bus.lineId === lineFilter;
    return matchesSearch && matchesStatus && matchesLine;
  });

  const handleAddBus = () => {
    const newBus: Bus = {
      id: `B${String(buses.length + 1).padStart(3, '0')}`,
      registration: formData.registration,
      model: formData.model,
      capacity: formData.capacity,
      status: formData.status,
      gpsLat: 12.3714,
      gpsLng: -1.5197,
      lineId: formData.lineId,
      driver: formData.driver,
      fillRate: 0,
      lastMaintenance: new Date().toISOString().split('T')[0]
    };

    setBuses([...buses, newBus]);
    toast.success('Bus ajouté avec succès');
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditBus = () => {
    if (!currentBus) return;

    const updatedBuses = buses.map(bus =>
      bus.id === currentBus.id
        ? {
            ...bus,
            registration: formData.registration,
            model: formData.model,
            capacity: formData.capacity,
            status: formData.status,
            lineId: formData.lineId,
            driver: formData.driver
          }
        : bus
    );

    setBuses(updatedBuses);
    toast.success('Bus modifié avec succès');
    setIsEditDialogOpen(false);
    setCurrentBus(null);
    resetForm();
  };

  const handleDeleteBus = (busId: string) => {
    setBuses(buses.filter(bus => bus.id !== busId));
    toast.success('Bus supprimé avec succès');
  };

  const openEditDialog = (bus: Bus) => {
    setCurrentBus(bus);
    setFormData({
      registration: bus.registration,
      model: bus.model,
      capacity: bus.capacity,
      lineId: bus.lineId || '',
      driver: bus.driver || '',
      status: bus.status
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      registration: '',
      model: '',
      capacity: 80,
      lineId: '',
      driver: '',
      status: 'active'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 text-white">Actif</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-500 text-white">Maintenance</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-500 text-white">Inactif</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getLineName = (lineId: string) => {
    const line = mockLines.find(l => l.id === lineId);
    return line ? line.name.split(' - ')[0] : lineId;
  };

  const getLineColor = (lineId: string) => {
    const line = mockLines.find(l => l.id === lineId);
    return line ? line.color : '#6B7280';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Gestion de la Flotte</h1>
          <p className="text-gray-600">Suivi et gestion de tous les véhicules</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un bus
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher par immatriculation ou modèle..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
            </SelectContent>
          </Select>

          <Select value={lineFilter} onValueChange={setLineFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par ligne" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les lignes</SelectItem>
              {mockLines.map(line => (
                <SelectItem key={line.id} value={line.id}>
                  {line.name.split(' - ')[0]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Fleet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BusIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total bus</p>
              <p className="text-2xl">{buses.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Actifs</p>
              <p className="text-2xl">{buses.filter(b => b.status === 'active').length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Wrench className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Maintenance</p>
              <p className="text-2xl">{buses.filter(b => b.status === 'maintenance').length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Taux disponibilité</p>
              <p className="text-2xl">
                {Math.round((buses.filter(b => b.status === 'active').length / buses.length) * 100)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bus Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Immatriculation</TableHead>
              <TableHead>Modèle</TableHead>
              <TableHead>Ligne</TableHead>
              <TableHead>Chauffeur</TableHead>
              <TableHead>Capacité</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Remplissage</TableHead>
              <TableHead>Dernière maintenance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBuses.map((bus) => (
              <TableRow key={bus.id}>
                <TableCell>{bus.registration}</TableCell>
                <TableCell>{bus.model}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    style={{ 
                      borderColor: getLineColor(bus.lineId || ''),
                      color: getLineColor(bus.lineId || '')
                    }}
                  >
                    {getLineName(bus.lineId || '-')}
                  </Badge>
                </TableCell>
                <TableCell>{bus.driver || '-'}</TableCell>
                <TableCell>{bus.capacity} places</TableCell>
                <TableCell>{getStatusBadge(bus.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: `${bus.fillRate}%` }}
                      />
                    </div>
                    <span className="text-sm">{bus.fillRate}%</span>
                  </div>
                </TableCell>
                <TableCell>{bus.lastMaintenance}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(bus)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteBus(bus.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Add Bus Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau bus</DialogTitle>
            <DialogDescription>
              Remplissez les informations du bus à ajouter à la flotte
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="registration">Immatriculation</Label>
              <Input
                id="registration"
                placeholder="BF-1234-OG"
                value={formData.registration}
                onChange={(e) => setFormData({ ...formData, registration: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="model">Modèle</Label>
              <Input
                id="model"
                placeholder="Mercedes Citaro"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="capacity">Capacité</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
              />
            </div>

            <div>
              <Label htmlFor="line">Ligne</Label>
              <Select value={formData.lineId} onValueChange={(value) => setFormData({ ...formData, lineId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une ligne" />
                </SelectTrigger>
                <SelectContent>
                  {mockLines.map(line => (
                    <SelectItem key={line.id} value={line.id}>
                      {line.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="driver">Chauffeur</Label>
              <Select value={formData.driver} onValueChange={(value) => setFormData({ ...formData, driver: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un chauffeur" />
                </SelectTrigger>
                <SelectContent>
                  {mockDrivers.filter(d => d.status === 'active').map(driver => (
                    <SelectItem key={driver.id} value={driver.name}>
                      {driver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Statut</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddBus} className="bg-purple-600 hover:bg-purple-700 text-white">
              Ajouter le bus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Bus Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le bus</DialogTitle>
            <DialogDescription>
              Modifiez les informations du bus {currentBus?.registration}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="edit-registration">Immatriculation</Label>
              <Input
                id="edit-registration"
                value={formData.registration}
                onChange={(e) => setFormData({ ...formData, registration: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="edit-model">Modèle</Label>
              <Input
                id="edit-model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="edit-capacity">Capacité</Label>
              <Input
                id="edit-capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
              />
            </div>

            <div>
              <Label htmlFor="edit-line">Ligne</Label>
              <Select value={formData.lineId} onValueChange={(value) => setFormData({ ...formData, lineId: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockLines.map(line => (
                    <SelectItem key={line.id} value={line.id}>
                      {line.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="edit-driver">Chauffeur</Label>
              <Select value={formData.driver} onValueChange={(value) => setFormData({ ...formData, driver: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockDrivers.filter(d => d.status === 'active').map(driver => (
                    <SelectItem key={driver.id} value={driver.name}>
                      {driver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="edit-status">Statut</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditBus} className="bg-purple-600 hover:bg-purple-700 text-white">
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
