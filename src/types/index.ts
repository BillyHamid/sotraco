export type UserRole = 
  | 'admin'
  | 'finance'
  | 'audit'
  | 'operations'
  | 'maintenance'
  | 'line_manager'
  | 'readonly';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
}

export interface Bus {
  id: string;
  registration: string;
  model: string;
  capacity: number;
  status: 'active' | 'maintenance' | 'inactive';
  gpsLat: number;
  gpsLng: number;
  lineId: string;
  driver?: string;
  fillRate: number;
  lastMaintenance: string;
}

export interface BusLine {
  id: string;
  name: string;
  zone: string;
  color: string;
  stops: number;
  activeBuses: number;
  revenue: number;
}

export interface Driver {
  id: string;
  name: string;
  license: string;
  phone: string;
  status: 'active' | 'inactive' | 'on_leave';
  currentBus?: string;
}

export interface MaintenanceRecord {
  id: string;
  busId: string;
  type: 'preventive' | 'corrective';
  description: string;
  scheduledDate: string;
  status: 'planned' | 'in_progress' | 'completed';
  cost: number;
}

export interface Transaction {
  id: string;
  type: 'revenue' | 'expense';
  category: string;
  amount: number;
  date: string;
  lineId?: string;
  description: string;
}

export interface Incident {
  id: string;
  type: 'delay' | 'breakdown' | 'fraud' | 'accident';
  busId: string;
  lineId: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  date: string;
  status: 'open' | 'resolved';
}
