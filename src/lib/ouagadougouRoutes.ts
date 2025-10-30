// Routes réelles de Ouagadougou, Burkina Faso pour SOTRA'GO

export const ouagadougouRoutes = {
  'L01': {
    // Ligne 1 : Karpala – Place de la Nation (Sud-Est → Centre-ville)
    stops: [
      { name: 'Karpala Terminus', coords: [12.3400, -1.4900] as [number, number] },
      { name: 'Zone 1', coords: [12.3500, -1.5000] as [number, number] },
      { name: 'Boulmiougou-Est', coords: [12.3600, -1.5100] as [number, number] },
      { name: 'Cité An II', coords: [12.3650, -1.5150] as [number, number] },
      { name: 'Hôtel de Ville', coords: [12.3700, -1.5180] as [number, number] },
      { name: 'Place de la Nation', coords: [12.3714, -1.5197] as [number, number] }
    ],
    path: [
      [12.3400, -1.4900],
      [12.3500, -1.5000],
      [12.3600, -1.5100],
      [12.3650, -1.5150],
      [12.3700, -1.5180],
      [12.3714, -1.5197]
    ] as [number, number][]
  },
  'L02': {
    // Ligne 2 : Tampouy – Patte d'Oie (Nord → Sud)
    stops: [
      { name: 'Tampouy Terminus', coords: [12.4100, -1.5100] as [number, number] },
      { name: 'Cité Azimo', coords: [12.4000, -1.5120] as [number, number] },
      { name: 'Gounghin', coords: [12.3900, -1.5140] as [number, number] },
      { name: 'Rond-point des Nations Unies', coords: [12.3800, -1.5180] as [number, number] },
      { name: 'Patte d\'Oie Sud', coords: [12.3750, -1.5200] as [number, number] },
      { name: 'Échangeur de l\'Est', coords: [12.3700, -1.5250] as [number, number] }
    ],
    path: [
      [12.4100, -1.5100],
      [12.4000, -1.5120],
      [12.3900, -1.5140],
      [12.3800, -1.5180],
      [12.3750, -1.5200],
      [12.3700, -1.5250]
    ] as [number, number][]
  },
  'L03': {
    // Ligne 3 : Pissy – Ouaga 2000 (Ouest → Sud-Est)
    stops: [
      { name: 'Pissy Terminus', coords: [12.3800, -1.5500] as [number, number] },
      { name: 'Cité Universitaire', coords: [12.3750, -1.5400] as [number, number] },
      { name: 'Marché Central', coords: [12.3714, -1.5300] as [number, number] },
      { name: 'Hôpital Yalgado', coords: [12.3700, -1.5200] as [number, number] },
      { name: 'Zone du Bois', coords: [12.3650, -1.5000] as [number, number] },
      { name: 'Ouaga 2000 Terminus', coords: [12.3500, -1.4800] as [number, number] }
    ],
    path: [
      [12.3800, -1.5500],
      [12.3750, -1.5400],
      [12.3714, -1.5300],
      [12.3700, -1.5200],
      [12.3650, -1.5000],
      [12.3500, -1.4800]
    ] as [number, number][]
  },
  'L04': {
    // Ligne 4 : Tanghin – Cissin (Nord-Est → Sud)
    stops: [
      { name: 'Tanghin Terminus', coords: [12.4000, -1.4800] as [number, number] },
      { name: 'Sompangdo', coords: [12.3900, -1.4900] as [number, number] },
      { name: 'Wemtenga', coords: [12.3800, -1.5000] as [number, number] },
      { name: 'Stade du 4 Août', coords: [12.3714, -1.5100] as [number, number] },
      { name: 'Cissin Marché', coords: [12.3600, -1.5200] as [number, number] },
      { name: 'Cissin Terminus', coords: [12.3500, -1.5300] as [number, number] }
    ],
    path: [
      [12.4000, -1.4800],
      [12.3900, -1.4900],
      [12.3800, -1.5000],
      [12.3714, -1.5100],
      [12.3600, -1.5200],
      [12.3500, -1.5300]
    ] as [number, number][]
  }
};
