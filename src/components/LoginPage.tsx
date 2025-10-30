import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Bus, Shield, DollarSign, Search, Wrench, Users, Eye } from 'lucide-react';
import { UserRole } from '../types';
import { getRoleInfo, mockUsers } from '../lib/mockData';
import { motion } from 'motion/react';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const roles: { role: UserRole; icon: any; color: string }[] = [
    { role: 'admin', icon: Shield, color: '#3B82F6' },
    { role: 'finance', icon: DollarSign, color: '#10B981' },
    { role: 'audit', icon: Search, color: '#A855F7' },
    { role: 'operations', icon: Bus, color: '#F97316' },
    { role: 'maintenance', icon: Wrench, color: '#EF4444' },
    { role: 'line_manager', icon: Users, color: '#14B8A6' }
  ];

  const handleQuickLogin = (role: UserRole) => {
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      setEmail(user.email);
      setTimeout(() => onLogin(role), 300);
    }
  };

  if (selectedRole) {
    const info = getRoleInfo(selectedRole);
    const roleData = roles.find(r => r.role === selectedRole);
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="max-w-md w-full p-8 shadow-lg">
            <div className="text-center mb-6">
              {roleData && (
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: roleData.color }}
                >
                  <roleData.icon className="w-8 h-8 text-white" />
                </div>
              )}
              <h2 className="mb-2">{info.title}</h2>
              <p className="text-gray-600 text-sm">{info.description}</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedRole(null)}
                >
                  Retour
                </Button>
                <Button
                  className="flex-1 text-white"
                  onClick={() => onLogin(selectedRole)}
                  style={{ backgroundColor: roleData?.color }}
                >
                  Se connecter
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Bus className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-gray-900">Système de Gestion de Transport</h1>
          </div>
          <p className="text-gray-600">Sélectionnez votre rôle pour accéder au système</p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map(({ role, icon: Icon, color }, index) => {
            const info = getRoleInfo(role);
            return (
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="p-6 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 border border-gray-200 bg-white"
                  onClick={() => handleQuickLogin(role)}
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: color }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="mb-2 text-gray-900">{info.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {info.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Cliquez sur un rôle pour vous connecter
          </p>
        </div>
      </div>
    </div>
  );
}
