/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Problem, StatCategory, Report } from "./types";

export const PROBLEMS_DATA: Problem[] = [
  {
    id: "aire",
    title: "Contaminación del Aire",
    category: "aire",
    shortDescription: "La quema clandestina de basura, ladrilleras y emisiones por el acelerado crecimiento del parque vehicular urbano.",
    description: "Culiacán enfrenta un severo e invisible reto de calidad del aire. Según reportes locales de colectivos ambientales y registros sanitarios, el rápido crecimiento del parque vehicular, las ladrilleras del sector sur y norte, y la perjudicial quema periódica de socas agrícolas y tiraderos clandestinos disparan los índices de partículas PM2.5 y PM10, especialmente durante la temporada invernal por inversión térmica.",
    impactScore: 8,
    keyStatistics: "Más de 450,000 vehículos activos circulan diariamente en la ciudad. Los índices de radiación UV y contaminantes superan los límites de la OMS frecuentemente.",
    causes: [
      "Parque vehicular creciente y poco regulado (vehículos 'chocolate' o sin catalizadores).",
      "Quema ilegal de basura y 'socas' agrícolas en los linderos de la ciudad.",
      "Emisiones de ladrilleras artesanales que utilizan madera tratada, llantas y plásticos como combustible.",
      "Polvo suspendido por vialidades sin pavimentar en la periferia."
    ],
    consequences: [
      "Incremento agudo de enfermedades respiratorias como asma, EPOC y bronquitis en niños y adultos mayores.",
      "Inversión térmica invernal que concentra los contaminantes a nivel de suelo.",
      "Reducción de la calidad de vida y fatiga visual por mala visibilidad de la cuenca urbana."
    ],
    solutions: [
      "Establecer un programa formal de Verificación Vehicular Obligatoria en Sinaloa.",
      "Modernizar el transporte público urbano para reducir el uso excesivo de autos particulares.",
      "Sustituir hornos tradicionales de ladrilleras por tecnologías limpias de bajas emisiones.",
      "Pavimentación de calles en colonias periféricas y reforestación de cinturones verdes."
    ],
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=1000",
    culiacanHotspot: "Sectores Ladrilleras (sur de la ciudad), Centro Histórico, y Corredor Vial Pedro Infante."
  },
  {
    id: "agua",
    title: "Contaminación del Agua",
    category: "agua",
    shortDescription: "Vertido de aguas residuales sin tratamiento adecuado y acumulación crítica de plásticos en la confluencia de los tres ríos.",
    description: "Culiacán es la 'Ciudad de los Tres Ríos' (Tamazula, Humaya y Culiacán). Sin embargo, esta bendición natural sufre de descargas directas de aguas residuales, escurrimientos agrícolas cargados de agroquímicos nocivos, y toneladas de basura que la población arrastra a los canales pluviales y ríos durante la temporada de lluvias.",
    impactScore: 9,
    keyStatistics: "Se recuperan cientos de toneladas de plásticos y ramas de los ríos Tamazula y Humaya en cada jornada anual de limpieza comunitaria.",
    causes: [
      "Descargas industriales furtivas y fallas mecánicas en plantas de tratamiento de aguas residuales.",
      "Escurrimientos de fertilizantes y pesticidas de los campos de la cuenca agrícola adyacente.",
      "Lanzamiento directo de basura y plásticos de un solo uso en canales de riego, drenes pluviales y arroyos urbanos."
    ],
    consequences: [
      "Muerte masiva de peces y pérdida drástica de biodiversidad en el Parque Las Riberas.",
      "Ploriferación de algas nocivas (eutrofización) que reducen el oxígeno disponible en el agua.",
      "Contaminación biológica por bacterias fecales en zonas de esparcimiento familiar.",
      "Riesgos de salud pública para comunidades rurales de aguas abajo que usan el río Culiacán."
    ],
    solutions: [
      "Ampliación y optimización de las plantas de tratamiento de JAPAC en zonas marginadas.",
      "Instalación de trampas de retención de plásticos en las desembocaduras de canales críticos.",
      "Prohibición contundente de descargas de aguas negras y agroquímicos con sanciones rigurosas.",
      "Fomentar la cultura ciudadana de 'Basura Cero' en las riberas."
    ],
    imageUrl: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=1000",
    culiacanHotspot: "Río Humaya (atrás de sector Tres Ríos), Canal Humaya, y arroyos pluviales de Barrancos."
  },
  {
    id: "suelo",
    title: "Contaminación del Suelo",
    category: "suelo",
    shortDescription: "Tiraderos clandestinos de basura pesada, desechos de construcción y manejo deficiente de residuos sólidos urbanos.",
    description: "Las periferias de Culiacán y los arroyos secos se transforman continuamente en vertederos clandestinos de escombros, llantas y residuos domésticos. El basurón municipal de Culiacán ha registrado incendios de gran escala, liberando lixiviados venenosos que se infiltran directamente a los mantos freáticos de la cuenca sinaloense.",
    impactScore: 7,
    keyStatistics: "En Culiacán se generan cerca de 1,000 toneladas diarias de basura, de las cuales se estima que el 15% termina en vertederos ilegales.",
    causes: [
      "Falta de centros de transferencia autorizados y accesibles para escombros de construcción.",
      "Ineficacia de rutas de recolección en los linderos de nuevas invasiones o fraccionamientos.",
      "Inconsciencia de usuarios que pagan a transportistas informales que tiran los escombros en baldíos."
    ],
    consequences: [
      "Infiltración de lixiviados altamente tóxicos al acuífero subterráneo que abastece los pozos.",
      "Creación de focos de infección, plagas de fauna nociva (ratas, dengue, alacranes) en vecindarios.",
      "Riesgo extremo de incendios espontáneos que duran semanas consumiendo materiales pesados."
    ],
    solutions: [
      "Construcción de un Relleno Sanitario Metropolitano intermunicipal con tecnología de punta.",
      "Instaurar centros especializados fijos de 'Acopio de Residuos de Manejo Especial' (muebles, electrónicos).",
      "Aplicar multas e incentivar la denuncia ciudadana georreferenciada.",
      "Fomentar compostaje local y separación residencial de residuos orgánicos e inorgánicos."
    ],
    imageUrl: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=1000",
    culiacanHotspot: "Tiraderos en zona de La Costera, Ejido El Ranchito (sur), e inicios del sector La Conquista."
  },
  {
    id: "visual",
    title: "Contaminación Visual",
    category: "visual",
    shortDescription: "Invasión agresiva de espectaculares comerciales en avenidas principales y saturación caótica de cables.",
    description: "El paisaje urbano de Culiacán, dotado de hermosas puestas de sol, se ve saturado de pesados anuncios espectaculares sobre azoteas, postes sobrepuestos comerciales y un enredo caótico y peligroso de cableado aéreo de telecomunicaciones e infraestructura eléctrica que despoja la belleza histórica de la ciudad.",
    impactScore: 6,
    keyStatistics: "Se estiman miles de anuncios publicitarios irregulares en las principales vialidades de la ciudad, desestimando los reglamentos de ecología.",
    causes: [
      "Falta de ordenamiento riguroso y retiro de concesiones obsoletas de anuncios espectaculares.",
      "Cableado aéreo en desuso de compañías de internet, telefonía y televisión que no es retirado.",
      "Grafitis vandálicos y acumulación desenfrenada de cartelería de eventos masivos en monumentos."
    ],
    consequences: [
      "Fatiga mental, distracción y estrés crónico en automovilistas de los principales bulevares.",
      "Incremento en el riesgo de accidentes de tráfico por anuncios con luces LED ultra-brillantes.",
      "Pérdida de identidad arquitectónica y disminución del valor estético-turístico de la ciudad."
    ],
    solutions: [
      "Modificar el reglamento del Ayuntamiento para prohibir espectaculares en el primer cuadro e hitos visuales.",
      "Exigir la transición al cableado subterráneo obligatorio a las empresas prestadoras de servicios.",
      "Regulación estricta y multas drásticas a espectaculares con luminosidad dinámica desmesurada que cause destellos nocturnos.",
      "Creación de más murales ecológicos gestionados por colectivos artísticos locales."
    ],
    imageUrl: "https://images.unsplash.com/photo-1506543731388-49b01158d6fc?auto=format&fit=crop&q=80&w=1000",
    culiacanHotspot: "Bulevar Álvaro Obregón, Bulevar Francisco I. Madero, y Zona Centro."
  },
  {
    id: "acústica",
    title: "Contaminación Acústica",
    category: "acústica",
    shortDescription: "Niveles ensordecedores de ruido provocados por el tráfico pesado, cláxones excesivos y bocinas comerciales.",
    description: "La tranquilidad diurna e incluso el descanso nocturno se resienten en Culiacán. El tráfico de transporte urbano en calles angostas del Centro, bocinas publicitarias de comercios ambulantes en el primer cuadro de la ciudad, y automovilistas que tocan el claxon o modifican ruidosamente sus vehículos ('mufflers' de escape) crean un entorno acústico estresante.",
    impactScore: 6,
    keyStatistics: "Zonas de Culiacán superan durante horas hábiles los 85 decibelios, cuando la recomendación máxima de la OMS es de 55 decibelios.",
    causes: [
      "Uso indiscriminado del claxon en embotellamientos del centro de Culiacán.",
      "Falta de control acústico sobre establecimientos comerciales, bares, antros y bocinas publicitarias públicas.",
      "Vehículos de carga pesada circulando por vialidades residenciales.",
      "Modificaciones ilegales de escapes en motocicletas ('italikas') y automóviles deportivos."
    ],
    consequences: [
      "Aparición de hipoacusia progresiva, insomnio y problemas cardiovasculares ligados al estrés ambiental.",
      "Dificultades en el rendimiento de aprendizaje en escuelas localizadas en avenidas troncales.",
      "Interrupción del comportamiento y anidación de aves migratorias en las copas de los árboles fluviales."
    ],
    solutions: [
      "Dotar al departamento de ecología de sonómetros homologados para sancionar ruidos excesivos.",
      "Peatonalización gradual de calles angostas en el centro comercial de Culiacán.",
      "Sanciones de tránsito a conductores con vehículos con resonadores de escape modificados.",
      "Implementar pantallas vegetales / barreras de árboles frondosos capaces de amortiguar las ondas sonoras en bulevares."
    ],
    imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=1000",
    culiacanHotspot: "Centro de la Ciudad (Mercado Garmendia), Avenida Aquiles Serdán, y el sector Tres Ríos los fines de semana."
  }
];

export const EDUCATION_TIPS = [
  {
    title: "Separa tus residuos",
    description: "Clasifica tu basura en orgánica, reciclables (PET, plástico duro, cartón, aluminio) e inorgánica. Lleva tus reciclables a los centros comunitarios de acopio.",
    icon: "FolderSync"
  },
  {
    title: "Reduce plásticos de un solo uso",
    description: "Evita popotes, vasos de unicel, bolsas desechables y cubiertos plásticos. Cámbialos por termos, recipientes y bolsas reutilizables integrales.",
    icon: "Leaf"
  },
  {
    title: "Ahorra agua responsablemente",
    description: "¡Culiacán sufre sequía periódica! Reporta de inmediato fugas a JAPAC al 073, limita tus baños a 5 minutos, y barre tu cochera con escoba, nunca con manguera.",
    icon: "Droplets"
  },
  {
    title: "Usa transporte sustentable",
    description: "Organiza coches compartidos (pooling), utiliza la ciclovía en tramos seguros y prefiere caminar si tu destino se encuentra a corta distancia.",
    icon: "Bike"
  },
  {
    title: "Participa en campañas de limpieza",
    description: "Únete a las brigadas de reforestación y recolección de basura plástica organizadas en el Parque Las Riberas o ayuda a limpiar el arroyo de tu colonia.",
    icon: "Users"
  },
  {
    title: "Evita la quema de socas o basura",
    description: "La quema de pastizales rurales y residuos agrícolas contamina críticamente el aire. Denuncia fuegos clandestinos directamente al 911 de inmediato.",
    icon: "Flame"
  }
];

export const STATS_DATA: StatCategory[] = [
  {
    id: "calidad-aire",
    title: "Calidad del Aire (Partículas PM2.5)",
    description: "Promedio anual de microgramos por metro cúbico (µg/m³) registrados en Culiacán. El límite saludable de la OMS es de 5 µg/m³.",
    source: "Basado en mediciones y reportes de colectivos ambientales de Sinaloa / SEMARNAT",
    sourceUrl: "https://www.gob.mx/semarnat",
    chartType: "line",
    labels: ["2021", "2022", "2023", "2024", "2025", "2026 (Est.)"],
    datasets: [
      {
        label: "Culiacán centro (µg/m³)",
        data: [18.5, 19.8, 22.1, 24.5, 23.8, 25.2],
        backgroundColor: ["#1565C0"],
        borderColor: "#1565C0"
      },
      {
        label: "Límite Máximo Recomendado OMS",
        data: [5, 5, 5, 5, 5, 5],
        backgroundColor: ["#E53935"],
        borderColor: "#E53935"
      }
    ]
  },
  {
    id: "residuos-solidos",
    title: "Generación de Residuos Sólidos Diarios",
    description: "Cifras de toneladas diarias producidas en el municipio de Culiacán ingresadas al basurón municipal u otros destinos.",
    source: "Servicios Públicos del Ayuntamiento de Culiacán / INEGI",
    sourceUrl: "https://www.inegi.org.mx",
    chartType: "bar",
    labels: ["2021", "2022", "2023", "2024", "2025", "2026"],
    datasets: [
      {
        label: "Toneladas de Basura Diaria",
        data: [790, 840, 920, 960, 985, 1020],
        backgroundColor: ["rgba(46, 125, 50, 0.75)"]
      }
    ]
  },
  {
    id: "distribucion-contaminacion",
    title: "Zonas con Mayor Incidencia de Reportes de Basura Clandestina",
    description: "Porcentaje aproximado de quejas e incidentes registrados de tiraderos clandestinos y acumulación pública en sectores clave.",
    source: "Ayuntamiento de Culiacán / Reportes de Atención Ciudadana",
    sourceUrl: "https://www.culiacan.gob.mx",
    chartType: "doughnut",
    labels: ["Sectores de Infonavit (Barrancos/Humaya)", "Periferia y Ejidos Aledaños", "Centro Histórico", "Zona de los Tres Ríos", "Nuevos Fraccionamientos Norte"],
    datasets: [
      {
        label: "Distribución de Incidencias %",
        data: [35, 28, 15, 10, 12],
        backgroundColor: ["#E53935", "#F57C00", "#FBC02D", "#1976D2", "#388E3C"]
      }
    ]
  },
  {
    id: "reciclaje",
    title: "Porcentaje de Residuos Aprovechados para Reciclaje",
    description: "Campaña local de acopio. Refleja qué porcentaje del volumen reciclable es captado formalmente en el municipio de Culiacán.",
    source: "SEMARNAT & Organismos Civiles de Sinaloa",
    sourceUrl: "https://www.gob.mx/semarnat",
    chartType: "pie",
    labels: ["Orgánicos Compostados", "PET y Plásticos Reciclados", "Cartón y Papel Reciclados", "Aluminio y Metales", "Residuos Sin Reciclar (Destinados a Confinamiento)"],
    datasets: [
      {
        label: "Porcentaje de Tratamiento %",
        data: [1.2, 3.5, 4.1, 1.8, 89.4],
        backgroundColor: ["#4CAF50", "#1E88E5", "#FFB300", "#78909C", "#E53935"]
      }
    ]
  },
  {
    id: "consumo-agua",
    title: "Consumo de Agua Diario Promedio por Habitante",
    description: "Volumen diario (Litros por habitante) consumidos en Culiacán. El promedio óptimo recomendado es de 100 litros.",
    source: "JAPAC Culiacán / CONAGUA",
    sourceUrl: "http://japac.gob.mx",
    chartType: "bar",
    labels: ["2021", "2022", "2023", "2024", "2025", "2026"],
    datasets: [
      {
        label: "Litros Consumidos por Habitante al Día",
        data: [265, 274, 285, 290, 278, 282],
        backgroundColor: ["rgba(21, 101, 192, 0.7)"]
      },
      {
        label: "Recomendado para Sostenibilidad (OMS)",
        data: [100, 100, 100, 100, 100, 100],
        backgroundColor: ["#2E7D32"]
      }
    ]
  }
];

export const INITIAL_REPORTS: Report[] = [
  {
    id: "rep-1",
    name: "María Esther Beltrán",
    email: "ma.beltran@gmail.com",
    phone: "6677123456",
    problemType: "agua",
    locationName: "Sección Río Humaya norte, atrás del centro comercial",
    latitude: 24.8143,
    longitude: -107.4012,
    description: "Escombros y plásticos acumulados directamente sobre la ribera del río Humaya, obstruyendo el paso del agua y causando mal olor.",
    createdAt: "2026-05-15T10:30:00Z",
    isVerified: true
  },
  {
    id: "rep-2",
    name: "Carlos Rocha",
    email: "car.rocha@outlook.com",
    phone: "6671457890",
    problemType: "suelo",
    locationName: "Terreno baldío en cruce de Bulevar Las Torres, Barrancos",
    latitude: 24.7570,
    longitude: -107.4328,
    description: "Tiradero clandestino masivo donde camionetas tiran refrigeradores viejos, llantas gastadas y colchones quemados.",
    createdAt: "2026-05-22T14:15:00Z",
    isVerified: true
  },
  {
    id: "rep-3",
    name: "Sofía Medina",
    email: "sof_medina@live.com",
    phone: "6672334455",
    problemType: "visual",
    locationName: "Cruce Bulevar Francisco I. Madero e Insurgentes",
    latitude: 24.8016,
    longitude: -107.3995,
    description: "Tres espectaculares instalados demasiado juntos. Uno de ellos emite una luz LED encandilante de noche que distrae a conductores.",
    createdAt: "2026-05-29T18:45:00Z",
    isVerified: false
  },
  {
    id: "rep-4",
    name: "Jorge Gastélum",
    email: "jorge.gast@hotmail.com",
    phone: "6679901122",
    problemType: "acústica",
    locationName: "Sectores Centro, Calle Aquiles Serdán, cerca de escuelas",
    latitude: 24.8055,
    longitude: -107.3892,
    description: "Camiones del servicio público urbano tocan el claxon continuamente y circulan sin silenciador provocando ruido severo de más de 85 decibelios.",
    createdAt: "2026-06-01T09:00:00Z",
    isVerified: true
  },
  {
    id: "rep-5",
    name: "Ana Lucía Verdugo",
    email: "ana.verdugo@cbtis224.edu.mx",
    phone: "6674512987",
    problemType: "aire",
    locationName: "Periferia sur - Ejido El Ranchito",
    latitude: 24.7432,
    longitude: -107.3820,
    description: "Quema periódica de desechos plásticos y llantas por las tardes para extraer cobre, cubriendo de humo negro el sector sur.",
    createdAt: "2026-06-03T17:10:00Z",
    isVerified: true
  }
];
