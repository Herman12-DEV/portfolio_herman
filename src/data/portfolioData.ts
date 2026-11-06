export interface ProjectScreen {
  id: string;
  label: string;
  src: string;
  alt: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'mobile' | 'web';
  categoryBadge: string;
  description: string;
  context: string;
  axes: string[];
  tags: string[];
  mockupType: 'triple-mobile' | 'single-mobile' | 'browser-light' | 'browser-dark';
  screens: ProjectScreen[];
  liveUrl?: string;
  githubUrl?: string;
  domainLabel?: string;
  highlights?: { label: string; value: string }[];
}

export const HERO_MARQUEE_ITEMS = [
  'Développement Full-Stack',
  'Applications Mobiles',
  'Architecture Logicielle',
  'Bases de Données Relationnelles',
  'Backend & Programmation',
  'Conception UX / Produit',
  'ESATIC — Licence 3 SIGL',
  'Abidjan, Côte d’Ivoire',
];

export const SKILLS_DATA = [
  {
    index: '01',
    title: 'Développement Full-Stack',
    description:
      "Conception et développement d'applications web, création d'interfaces et mise en place de fonctionnalités backend.",
    tags: ['React / Next.js', 'TypeScript', 'API REST', 'Interfaces réactives'],
    icon: 'layers',
  },
  {
    index: '02',
    title: 'Développement mobile',
    description:
      "Conception et réalisation d'applications mobiles répondant à des besoins spécifiques.",
    tags: ['React Native', 'Expo', 'Android & iOS', 'UX Mobile'],
    icon: 'smartphone',
  },
  {
    index: '03',
    title: 'Backend & Programmation',
    description:
      'Développement de la logique métier, gestion des traitements et conception des fonctionnalités applicatives.',
    tags: ['Python', 'Node.js', 'C++', 'Logique métier'],
    icon: 'terminal',
  },
  {
    index: '04',
    title: 'Bases de données',
    description:
      'Modélisation, conception et gestion de bases de données relationnelles.',
    tags: ['SQL', 'Modélisation MERISE / UML', 'Intégrité des données'],
    icon: 'database',
  },
  {
    index: '05',
    title: 'Architecture logicielle',
    description:
      'Organisation des applications, structuration du code et réflexion autour de solutions évolutives.',
    tags: ['Code modulaire', 'Clean Architecture', 'Évolutivité'],
    icon: 'boxes',
  },
  {
    index: '06',
    title: 'Conception de solutions numériques',
    description:
      "Analyse des besoins, réflexion fonctionnelle et transformation d'idées en projets concrets.",
    tags: ['Analyse fonctionnelle', 'Prototypage', 'Orienté impact'],
    icon: 'compass',
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'akwaba-learn',
    number: '01',
    title: "Application mobile d'apprentissage du Baoulé",
    subtitle: 'Akwaba Learn — Patrimoine linguistique & apprentissage interactif',
    category: 'mobile',
    categoryBadge: 'Projet académique | Développement mobile',
    description:
      "Conception et développement d'une application mobile dédiée à l'apprentissage de la langue Baoulé.",
    context:
      "L'objectif est de faciliter la découverte et l'apprentissage de cette langue à travers une expérience numérique accessible et interactive.",
    axes: [
      "Conception de l'expérience utilisateur.",
      'Développement des fonctionnalités mobiles (cours thématiques, quiz chronométrés, traducteur audio Français ⇄ Baoulé).',
      'Organisation et gestion des données.',
      'Valorisation du patrimoine linguistique grâce au numérique.',
    ],
    tags: ['React Native', 'Expo Router', 'TypeScript', 'Audio & Quiz', 'UX Mobile'],
    mockupType: 'triple-mobile',
    githubUrl: 'https://github.com/Herman12-DEV/Akwaba_learn',
    screens: [
      {
        id: 'cours',
        label: 'Cours thématiques',
        src: '/projects/baoule-cours.png',
        alt: "Écran Mes cours de l'application d'apprentissage du Baoulé",
      },
      {
        id: 'quiz',
        label: 'Quiz interactif',
        src: '/projects/baoule-quiz.png',
        alt: "Écran Quiz interactif de l'application d'apprentissage du Baoulé",
      },
      {
        id: 'audio',
        label: 'Traduction Audio',
        src: '/projects/baoule-audio.png',
        alt: 'Écran Traduction Audio Français vers Baoulé',
      },
    ],
  },
  {
    id: 'shop-gestion',
    number: '02',
    title: 'Application mobile de gestion commerciale',
    subtitle: 'ShopGestion — Suivi de trésorerie, stocks et ventes au quotidien',
    category: 'mobile',
    categoryBadge: 'Projet personnel | Développement mobile',
    description:
      "Développement d'une application mobile destinée à faciliter la gestion des activités commerciales.",
    context:
      "Le projet vise à proposer un outil pratique permettant de mieux organiser les opérations quotidiennes d'une activité commerciale et de simplifier le suivi de sa gestion.",
    axes: [
      'Analyse des besoins fonctionnels.',
      "Conception de l'application.",
      'Gestion des données commerciales (trésorerie en FCFA, stocks, alertes de rupture).',
      'Développement des fonctionnalités de gestion (ventes, bénéfices du jour, actions rapides).',
    ],
    tags: ['Application Mobile', 'Gestion Commerciale', 'Trésorerie FCFA', 'Gestion de Stock'],
    mockupType: 'single-mobile',
    highlights: [
      { label: 'Trésorerie temps réel', value: 'Suivi en FCFA' },
      { label: 'Inventaire', value: 'Stock & Ruptures' },
      { label: 'Opérations', value: 'Ventes & Bénéfices' },
    ],
    screens: [
      {
        id: 'dashboard',
        label: 'Tableau de bord mobile',
        src: '/projects/shop-gestion.png',
        alt: 'Tableau de bord administrateur ShopGestion',
      },
    ],
  },
  {
    id: 'moussa-decor',
    number: '03',
    title: 'Plateforme web de gestion des contrats',
    subtitle: 'Moussa Décor — Espace prestataire & suivi des dossiers clients',
    category: 'web',
    categoryBadge: 'Réalisation Web Full-Stack | Application métier',
    description:
      "Conception et mise en ligne d'un espace numérique dédié à la création, au partage et au suivi centralisé des contrats clients pour un prestataire événementiel.",
    context:
      "L'interface permet de préparer les contrats sans effort, de suivre l'état d'avancement de chaque dossier (en attente, finalisé, archivé) et de centraliser l'activité récente au même endroit.",
    axes: [
      'Conception d’un tableau de bord clair orienté productivité prestataire.',
      'Gestion du cycle de vie des contrats et archivage des dossiers clients.',
      'Authentification dédiée et structuration des vues opérationnelles.',
      'Déploiement web continu et expérience responsive soignée.',
    ],
    tags: ['Full-Stack Web', 'Next.js', 'Gestion Documentaire', 'UI Éditoriale'],
    mockupType: 'browser-light',
    liveUrl: 'https://moussadecor.netlify.app',
    domainLabel: 'moussadecor.netlify.app',
    screens: [
      {
        id: 'overview',
        label: "Vue d'ensemble Espace Contrats",
        src: '/projects/moussa-decor.png',
        alt: 'Tableau de bord Moussa Décor Espace Contrats',
      },
    ],
  },
  {
    id: 'montage-auto',
    number: '04',
    title: 'Plateforme de montage vidéo automatique',
    subtitle: 'AutoCut (MontageAuto) — « Montez moins. Publiez plus. »',
    category: 'web',
    categoryBadge: 'Produit numérique & Automatisation | Web & Python',
    description:
      'Application web permettant de transformer automatiquement des rushs vidéo en contenus prêts à publier, sans passer par une timeline complexe.',
    context:
      'Pensé pour accélérer le flux de création : détection des silences et temps morts, génération de sous-titres synchronisés, recadrage intelligent et export rapide.',
    axes: [
      'Traitement automatisé des rushs et logique de découpe intelligente.',
      'Génération de sous-titres propres et adaptation multi-formats.',
      'Interface web minimaliste à fort contraste centrée sur le produit.',
      'Architecture couplant moteur Python et interface web moderne.',
    ],
    tags: ['Python', 'Web App', 'Automatisation Vidéo', 'Sous-titrage IA'],
    mockupType: 'browser-dark',
    liveUrl: 'https://montageauto.netlify.app',
    githubUrl: 'https://github.com/Herman12-DEV/MontageAuto_V1',
    domainLabel: 'montageauto.netlify.app',
    screens: [
      {
        id: 'landing',
        label: 'Interface AutoCut — Montage Vidéo Automatique',
        src: '/projects/montage-auto.png',
        alt: 'Interface web AutoCut MontageAuto',
      },
    ],
  },
];

export const APPROACH_STEPS = [
  {
    number: '01',
    title: 'Comprendre',
    description: 'Analyser le besoin, identifier le problème et définir les objectifs.',
  },
  {
    number: '02',
    title: 'Concevoir',
    description: "Réfléchir à l'architecture, aux fonctionnalités et à l'expérience utilisateur.",
  },
  {
    number: '03',
    title: 'Développer',
    description: 'Transformer les idées et les conceptions en solutions fonctionnelles.',
  },
  {
    number: '04',
    title: 'Améliorer',
    description: 'Tester, corriger et optimiser pour obtenir un résultat de qualité.',
  },
];

export const CONTACT_INFO = {
  email: 'kouadiosherman@gmail.com',
  phoneDisplay: '+225 05 03 87 97 20',
  phoneHref: 'tel:+2250503879720',
  whatsappHref:
    'https://wa.me/2250503879720?text=Bonjour%20Hermann%2C%20j%27ai%20consult%C3%A9%20votre%20portfolio%20et%20je%20souhaite%20%C3%A9changer%20avec%20vous.',
  linkedinDisplay: 'linkedin.com/in/kouadio-herman-kouadio-ab2b002a1',
  linkedinHref: 'https://www.linkedin.com/in/kouadio-herman-kouadio-ab2b002a1',
  githubDisplay: 'github.com/Herman12-DEV',
  githubHref: 'https://github.com/Herman12-DEV',
  location: "Abidjan, Côte d'Ivoire",
};
