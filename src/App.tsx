import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { DashboardLayout } from './components/DashboardLayout';
import { Dashboard } from './components/Dashboard';
import { FleetManagement } from './components/FleetManagement';
import { LiveMap } from './components/LiveMap';
import { FinanceModule } from './components/FinanceModule';
import { MaintenanceModule } from './components/MaintenanceModule';
import { AuditModule } from './components/AuditModule';
import { UserManagement } from './components/UserManagement';
import { UserRole } from './types';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentView('dashboard');
  };

  const renderView = () => {
    if (!userRole) return null;

    switch (currentView) {
      case 'dashboard':
        return <Dashboard userRole={userRole} />;
      case 'fleet':
        return <FleetManagement />;
      case 'map':
        return <LiveMap />;
      case 'finance':
        return <FinanceModule />;
      case 'maintenance':
        return <MaintenanceModule />;
      case 'audit':
        return <AuditModule />;
      case 'users':
        return <UserManagement />;
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  if (!isLoggedIn || !userRole) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <DashboardLayout
        userRole={userRole}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={handleLogout}
      >
        {renderView()}
      </DashboardLayout>
      <Toaster />
    </>
  );
}
