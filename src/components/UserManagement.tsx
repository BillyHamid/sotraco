import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Users, Plus, Edit, Trash2, Shield } from 'lucide-react';
import { mockUsers, getRoleInfo } from '../lib/mockData';

export function UserManagement() {
  const roleStats = mockUsers.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Gestion des Utilisateurs</h1>
          <p className="text-gray-600">Administration des rôles et permissions (RBAC)</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouvel Utilisateur
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border-l-4 border-purple-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Utilisateurs</p>
              <h3>{mockUsers.length}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-green-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Administrateurs</p>
              <h3>{roleStats.admin || 0}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Rôles Actifs</p>
              <h3>{Object.keys(roleStats).length}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-yellow-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Permissions</p>
              <h3>28</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Role Descriptions */}
      <Card className="p-6">
        <h3 className="mb-4">Descriptions des Rôles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['admin', 'finance', 'audit', 'operations', 'maintenance', 'line_manager', 'readonly'].map(role => {
            const info = getRoleInfo(role);
            return (
              <div 
                key={role}
                className="p-4 rounded-lg border-l-4"
                style={{ borderColor: info.color, backgroundColor: `${info.color}08` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: info.color }}
                  />
                  <h4 className="text-sm">{info.title}</h4>
                  <Badge variant="outline" className="ml-auto">
                    {roleStats[role] || 0} user(s)
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">{info.description}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="p-6 border-b">
          <h3>Liste des Utilisateurs</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map(user => {
              const info = getRoleInfo(user.role);
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm"
                        style={{ backgroundColor: info.color }}
                      >
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge style={{ backgroundColor: info.color }}>
                      {info.title}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.slice(0, 2).map((perm, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {perm}
                        </Badge>
                      ))}
                      {user.permissions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.permissions.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">Actif</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Permissions Matrix */}
      <Card className="p-6">
        <h3 className="mb-4">Matrice des Permissions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">Permission</th>
                {['admin', 'finance', 'audit', 'operations', 'maintenance', 'line_manager', 'readonly'].map(role => (
                  <th key={role} className="text-center py-2 px-2">
                    {getRoleInfo(role).title.split(' ')[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Voir Dashboard', perms: ['admin', 'finance', 'audit', 'operations', 'maintenance', 'line_manager', 'readonly'] },
                { name: 'Gérer Flotte', perms: ['admin', 'operations'] },
                { name: 'Voir Flotte', perms: ['admin', 'operations', 'line_manager', 'maintenance', 'audit', 'readonly'] },
                { name: 'Gérer Finance', perms: ['admin', 'finance'] },
                { name: 'Voir Finance', perms: ['admin', 'finance', 'audit', 'readonly'] },
                { name: 'Gérer Maintenance', perms: ['admin', 'maintenance'] },
                { name: 'Gérer Utilisateurs', perms: ['admin'] },
                { name: 'Accès Audit', perms: ['admin', 'audit'] },
              ].map((permission, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">{permission.name}</td>
                  {['admin', 'finance', 'audit', 'operations', 'maintenance', 'line_manager', 'readonly'].map(role => (
                    <td key={role} className="text-center py-2">
                      {permission.perms.includes(role) ? (
                        <div className="w-5 h-5 bg-green-500 rounded-full mx-auto" />
                      ) : (
                        <div className="w-5 h-5 bg-gray-200 rounded-full mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
