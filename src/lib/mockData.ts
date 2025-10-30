import { Bus, BusLine, Driver, MaintenanceRecord, Transaction, Incident, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin Principal',
    email: 'admin@transport.com',
    role: 'admin',
    permissions: ['*']
  },
  {
    id: '2',
    name: 'Directeur Finance',
    email: 'finance@transport.com',
    role: 'finance',
    permissions: ['finance.*', 'reports.view']
  },
  {
    id: '3',
    name: 'Auditeur',
    email: 'audit@transport.com',
    role: 'audit',
    permissions: ['*.view', 'audit.*']
  },
  {
    id: '4',
    name: 'Chef Exploitation',
    email: 'ops@transport.com',
    role: 'operations',
    permissions: ['fleet.*', 'lines.*', 'drivers.*']
  },
  {
    id: '5',
    name: 'Responsable Maintenance',
    email: 'maintenance@transport.com',
    role: 'maintenance',
    permissions: ['maintenance.*', 'fleet.view']
  },
  {
    id: '6',
    name: 'Manager Ligne A',
    email: 'manager@transport.com',
    role: 'line_manager',
    permissions: ['line.L1.*', 'fleet.view', 'reports.view']
  },
  {
    id: '7',
    name: 'Utilisateur Lecture',
    email: 'readonly@transport.com',
    role: 'readonly',
    permissions: ['*.view']
  }
];

export const mockBuses: Bus[] = [
  {
    id: 'B001',
    registration: 'BF-1234-OG',
    model: 'Mercedes Citaro',
    capacity: 80,
    status: 'active',
    gpsLat: 12.3714,
    gpsLng: -1.5197,
    lineId: 'L01',
    driver: 'Ouédraogo Jean',
    fillRate: 75,
    lastMaintenance: '2025-10-15'
  },
  {
    id: 'B002',
    registration: 'BF-5678-OG',
    model: 'Volvo 7900',
    capacity: 90,
    status: 'active',
    gpsLat: 12.3950,
    gpsLng: -1.5050,
    lineId: 'L02',
    driver: 'Sawadogo Fatou',
    fillRate: 82,
    lastMaintenance: '2025-10-20'
  },
  {
    id: 'B003',
    registration: 'BF-9012-OG',
    model: 'Irisbus Citelis',
    capacity: 75,
    status: 'maintenance',
    gpsLat: 12.3600,
    gpsLng: -1.5300,
    lineId: 'L01',
    fillRate: 0,
    lastMaintenance: '2025-10-28'
  },
  {
    id: 'B004',
    registration: 'BF-3456-OG',
    model: 'Mercedes Citaro',
    capacity: 80,
    status: 'active',
    gpsLat: 12.3400,
    gpsLng: -1.4900,
    lineId: 'L03',
    driver: 'Compaoré Amadou',
    fillRate: 68,
    lastMaintenance: '2025-10-10'
  },
  {
    id: 'B005',
    registration: 'BF-7890-OG',
    model: 'Volvo 7900',
    capacity: 90,
    status: 'active',
    gpsLat: 12.3800,
    gpsLng: -1.5100,
    lineId: 'L04',
    driver: 'Kaboré Aissatou',
    fillRate: 91,
    lastMaintenance: '2025-10-25'
  },
  {
    id: 'B006',
    registration: 'BF-2468-OG',
    model: 'Irisbus Citelis',
    capacity: 75,
    status: 'active',
    gpsLat: 12.3500,
    gpsLng: -1.5200,
    lineId: 'L03',
    driver: 'Traoré Moussa',
    fillRate: 55,
    lastMaintenance: '2025-10-05'
  }
];

export const mockLines: BusLine[] = [
  {
    id: 'L01',
    name: 'Ligne 1 - Karpala – Place de la Nation',
    zone: 'Sud-Est → Centre-ville',
    color: '#10B981',
    stops: 6,
    activeBuses: 2,
    revenue: 1250000
  },
  {
    id: 'L02',
    name: 'Ligne 2 - Tampouy – Patte d\'Oie',
    zone: 'Nord → Sud',
    color: '#3B82F6',
    stops: 6,
    activeBuses: 1,
    revenue: 980000
  },
  {
    id: 'L03',
    name: 'Ligne 3 - Pissy – Ouaga 2000',
    zone: 'Ouest → Sud-Est',
    color: '#F97316',
    stops: 6,
    activeBuses: 2,
    revenue: 1100000
  },
  {
    id: 'L04',
    name: 'Ligne 4 - Tanghin – Cissin',
    zone: 'Nord-Est → Sud',
    color: '#EF4444',
    stops: 6,
    activeBuses: 1,
    revenue: 850000
  }
];

export const mockDrivers: Driver[] = [
  {
    id: 'D001',
    name: 'Ouédraogo Jean',
    license: 'BF-2020-001',
    phone: '+226 70 12 34 56',
    status: 'active',
    currentBus: 'B001'
  },
  {
    id: 'D002',
    name: 'Sawadogo Fatou',
    license: 'BF-2019-045',
    phone: '+226 70 23 45 67',
    status: 'active',
    currentBus: 'B002'
  },
  {
    id: 'D003',
    name: 'Compaoré Amadou',
    license: 'BF-2021-012',
    phone: '+226 70 34 56 78',
    status: 'active',
    currentBus: 'B004'
  },
  {
    id: 'D004',
    name: 'Kaboré Aissatou',
    license: 'BF-2020-089',
    phone: '+226 70 45 67 89',
    status: 'active',
    currentBus: 'B005'
  },
  {
    id: 'D005',
    name: 'Traoré Moussa',
    license: 'BF-2018-034',
    phone: '+226 70 56 78 90',
    status: 'active',
    currentBus: 'B006'
  },
  {
    id: 'D006',
    name: 'Zongo Khady',
    license: 'BF-2022-007',
    phone: '+226 70 67 89 01',
    status: 'on_leave'
  }
];

export const mockMaintenance: MaintenanceRecord[] = [
  {
    id: 'M001',
    busId: 'B003',
    type: 'corrective',
    description: 'Réparation moteur - Problème de surchauffe',
    scheduledDate: '2025-10-30',
    status: 'in_progress',
    cost: 450000
  },
  {
    id: 'M002',
    busId: 'B001',
    type: 'preventive',
    description: 'Révision périodique - 50 000 km',
    scheduledDate: '2025-11-05',
    status: 'planned',
    cost: 120000
  },
  {
    id: 'M003',
    busId: 'B004',
    type: 'preventive',
    description: 'Changement pneus et freins',
    scheduledDate: '2025-11-08',
    status: 'planned',
    cost: 180000
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 'T001',
    type: 'revenue',
    category: 'Billets',
    amount: 450000,
    date: '2025-10-30',
    lineId: 'L01',
    description: 'Recettes journalières Ligne 1'
  },
  {
    id: 'T002',
    type: 'revenue',
    category: 'Abonnements',
    amount: 320000,
    date: '2025-10-30',
    lineId: 'L02',
    description: 'Abonnements mensuels'
  },
  {
    id: 'T003',
    type: 'expense',
    category: 'Carburant',
    amount: 280000,
    date: '2025-10-30',
    description: 'Achat carburant - Station Total'
  },
  {
    id: 'T004',
    type: 'expense',
    category: 'Maintenance',
    amount: 450000,
    date: '2025-10-29',
    description: 'Réparation B003'
  },
  {
    id: 'T005',
    type: 'revenue',
    category: 'Billets',
    amount: 380000,
    date: '2025-10-29',
    lineId: 'L03',
    description: 'Recettes journalières Ligne 3'
  }
];

export const mockIncidents: Incident[] = [
  {
    id: 'I001',
    type: 'delay',
    busId: 'B001',
    lineId: 'L01',
    severity: 'low',
    description: 'Retard de 15 minutes dû au trafic',
    date: '2025-10-30T08:30:00',
    status: 'resolved'
  },
  {
    id: 'I002',
    type: 'breakdown',
    busId: 'B003',
    lineId: 'L01',
    severity: 'high',
    description: 'Panne moteur - Bus immobilisé',
    date: '2025-10-28T14:20:00',
    status: 'open'
  },
  {
    id: 'I003',
    type: 'fraud',
    busId: 'B005',
    lineId: 'L02',
    severity: 'medium',
    description: 'Détection de fraude sur validation tickets',
    date: '2025-10-29T16:45:00',
    status: 'open'
  }
];

export const getRoleInfo = (role: string) => {
  const roleMap: Record<string, { 
    title: string; 
    description: string; 
    color: string;
    permissions: string[];
    kpis: string[];
    restrictions?: string[];
  }> = {
    admin: {
      title: 'Administrateur Général',
      description: 'Superviser l\'ensemble du système SOTRA\'GO, gérer les utilisateurs et avoir accès à tous les modules',
      color: '#8B5CF6',
      permissions: [
        'Créer / modifier / supprimer tous les utilisateurs et rôles',
        'Accès complet à tous les tableaux de bord',
        'Validation des budgets et transactions exceptionnelles',
        'Accès aux logs du système et à la sécurité',
        'Gestion de la configuration du système (API, maps, intégrations)'
      ],
      kpis: [
        'Total recettes (jour / mois / année)',
        'Nombre de bus actifs / en maintenance',
        'Taux de disponibilité du parc',
        'Moyenne de ponctualité globale',
        'Incidents signalés / résolus',
        'Satisfaction client moyenne'
      ]
    },
    finance: {
      title: 'Finance / Comptabilité',
      description: 'Gérer la trésorerie, les recettes, les dépenses et établir les rapports financiers',
      color: '#10B981',
      permissions: [
        'Consultation des ventes (tickets, abonnements, Mobile Money)',
        'Validation ou rejet des dépenses soumises',
        'Ajout de dépenses internes (carburant, réparations, salaires)',
        'Génération et export de rapports financiers (PDF, Excel)',
        'Consultation des indicateurs de performance économique'
      ],
      kpis: [
        'Recettes journalières / mensuelles par ligne',
        'Dépenses totales (maintenance, carburant, salaires)',
        'Rentabilité par ligne',
        'Évolution du chiffre d\'affaires',
        'Comparatif ventes numériques / ventes physiques'
      ],
      restrictions: [
        'Pas de modification sur les données techniques (bus, chauffeurs, trajets)'
      ]
    },
    audit: {
      title: 'Audit Interne',
      description: 'Contrôler la conformité, détecter les anomalies, vérifier la cohérence des données',
      color: '#F59E0B',
      permissions: [
        'Lecture seule sur tous les modules',
        'Téléchargement des rapports financiers et d\'exploitation',
        'Accès aux journaux d\'activité (logs) et historiques',
        'Marquage ou signalement d\'une anomalie'
      ],
      kpis: [
        'Nombre d\'anomalies détectées par mois',
        'Écart entre recettes attendues et encaissées',
        'Taux de conformité des procédures internes',
        'Historique des audits réalisés',
        'Statistiques sur les fraudes détectées'
      ],
      restrictions: [
        'Pas de modification directe des données'
      ]
    },
    operations: {
      title: 'Exploitation / Opérations',
      description: 'Gérer les lignes, les horaires, les bus et les chauffeurs - centre nerveux du transport',
      color: '#3B82F6',
      permissions: [
        'Création / modification des lignes et arrêts',
        'Affectation de bus à une ligne',
        'Suivi en temps réel des bus sur la carte',
        'Consultation du taux de remplissage et des trajets',
        'Rapport journalier sur la ponctualité et incidents'
      ],
      kpis: [
        'Nombre de bus en circulation / retardés',
        'Taux de ponctualité par ligne',
        'Moyenne de remplissage par ligne',
        'Nombre d\'incidents / pannes',
        'Performances des chauffeurs'
      ],
      restrictions: [
        'Pas d\'accès aux dépenses ou données financières'
      ]
    },
    maintenance: {
      title: 'Maintenance',
      description: 'Assurer le bon état du parc de bus et la planification des entretiens',
      color: '#EF4444',
      permissions: [
        'Création et suivi des fiches d\'entretien (préventif / curatif)',
        'Ajout de pièces, gestion du stock de pièces détachées',
        'Planification des interventions mécaniques',
        'Gestion des documents techniques (assurance, visite)',
        'Signalement d\'un bus hors service à l\'exploitation'
      ],
      kpis: [
        'Taux de disponibilité du parc (bus en service / total)',
        'Nombre de pannes par mois / par modèle',
        'Délai moyen de réparation',
        'Coût moyen d\'entretien par bus',
        'Stock de pièces critiques disponibles'
      ],
      restrictions: [
        'Pas d\'accès aux données financières (hors coûts d\'entretien)'
      ]
    },
    line_manager: {
      title: 'Manager de Zone / Ligne',
      description: 'Superviser des lignes précises, assurer la qualité du service et le respect des horaires',
      color: '#06B6D4',
      permissions: [
        'Lecture/écriture sur les bus et chauffeurs de sa zone uniquement',
        'Envoi de rapports journaliers à la direction',
        'Accès à la carte pour suivre les bus de sa ligne',
        'Signalement d\'incidents ou de pannes'
      ],
      kpis: [
        'Performance par ligne (retards, remplissage, incidents)',
        'Taux de satisfaction des usagers (sondages mobiles)',
        'Taux de disponibilité des bus affectés à sa zone'
      ]
    },
    readonly: {
      title: 'Utilisateur Lecture Seule',
      description: 'Accès dashboards synthétiques en lecture uniquement',
      color: '#6B7280',
      permissions: [
        'Consultation des tableaux de bord',
        'Visualisation des rapports'
      ],
      kpis: [
        'KPIs globaux du système',
        'Statistiques générales'
      ],
      restrictions: [
        'Aucune modification possible',
        'Accès limité aux données sensibles'
      ]
    }
  };
  
  return roleMap[role] || roleMap.readonly;
};