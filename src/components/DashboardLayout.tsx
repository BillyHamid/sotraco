import { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  LayoutDashboard, 
  Bus, 
  MapPin, 
  DollarSign, 
  Wrench, 
  Search, 
  Users,
  LogOut,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { UserRole } from '../types';
import { getRoleInfo, mockUsers } from '../lib/mockData';
import { Badge } from './ui/badge';

interface DashboardLayoutProps {
  userRole: UserRole;
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export function DashboardLayout({ 
  userRole, 
  currentView, 
  onViewChange, 
  onLogout,
  children 
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const roleInfo = getRoleInfo(userRole);
  const user = mockUsers.find(u => u.role === userRole);

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard, roles: ['*'] },
    { id: 'fleet', label: 'Gestion Flotte', icon: Bus, roles: ['admin', 'operations', 'line_manager', 'readonly', 'audit'] },
    { id: 'map', label: 'Carte Temps Réel', icon: MapPin, roles: ['admin', 'operations', 'line_manager', 'readonly'] },
    { id: 'finance', label: 'Finance', icon: DollarSign, roles: ['admin', 'finance', 'audit', 'readonly'] },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench, roles: ['admin', 'maintenance', 'operations', 'readonly', 'audit'] },
    { id: 'audit', label: 'Audit', icon: Search, roles: ['admin', 'audit', 'readonly'] },
    { id: 'users', label: 'Utilisateurs', icon: Users, roles: ['admin'] }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes('*') || item.roles.includes(userRole)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg">Transport Manager</h2>
                <p className="text-xs text-gray-500">{roleInfo.title}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Avatar>
                <AvatarFallback style={{ backgroundColor: roleInfo.color }}>
                  {user?.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-64 bg-white border-r min-h-[calc(100vh-73px)] sticky top-[73px]">
            <div className="p-4">
              <div 
                className="p-4 rounded-xl mb-6"
                style={{ backgroundColor: `${roleInfo.color}15` }}
              >
                <p className="text-sm text-gray-600 mb-1">Rôle actuel</p>
                <p className="text-sm" style={{ color: roleInfo.color }}>
                  {roleInfo.title}
                </p>
              </div>

              <nav className="space-y-2">
                {filteredMenuItems.map(item => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onViewChange(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      style={{
                        backgroundColor: isActive ? roleInfo.color : undefined
                      }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-6 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={onLogout}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  <span className="text-sm">Déconnexion</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
