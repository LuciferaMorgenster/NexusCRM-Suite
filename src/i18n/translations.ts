import { Language } from '../types/crm';

export interface TranslationDictionary {
  appName: string;
  appTagline: string;
  nav: {
    dashboard: string;
    pipeline: string;
    accounts: string;
    contacts: string;
    ecosystem: string;
    activities: string;
    seoInspector: string;
    newRecord: string;
  };
  seo: {
    pageTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    keywords: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    quickSync: string;
    exploreEcosystem: string;
    viewPipeline: string;
  };
  stats: {
    totalPipeline: string;
    activeAccounts: string;
    winRate: string;
    ecosystemSyncRate: string;
    openDeals: string;
    avgDealSize: string;
  };
  pipeline: {
    title: string;
    subtitle: string;
    kanbanView: string;
    listView: string;
    stages: {
      lead: string;
      qualified: string;
      proposal: string;
      negotiation: string;
      closed_won: string;
      closed_lost: string;
    };
    stageValue: string;
    dealsCount: string;
    addDeal: string;
    filterByStage: string;
    expectedClose: string;
    probability: string;
    owner: string;
    moveNext: string;
    movePrev: string;
  };
  accounts: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    addAccount: string;
    companyName: string;
    industry: string;
    tier: string;
    healthScore: string;
    totalValue: string;
    status: string;
    linkedApps: string;
    details: string;
    statuses: {
      active: string;
      prospect: string;
      churn_risk: string;
      onboarding: string;
    };
  };
  contacts: {
    title: string;
    subtitle: string;
    addContact: string;
    searchPlaceholder: string;
    contactName: string;
    role: string;
    company: string;
    email: string;
    phone: string;
    lastContact: string;
  };
  ecosystem: {
    title: string;
    subtitle: string;
    syncAll: string;
    syncing: string;
    lastSynchronized: string;
    recordsLinked: string;
    statusConnected: string;
    statusSyncing: string;
    openApp: string;
    apps: {
      rosterSync: {
        name: string;
        category: string;
        desc: string;
        metricLabel: string;
      };
      talentPulse: {
        name: string;
        category: string;
        desc: string;
        metricLabel: string;
      };
      kopilot: {
        name: string;
        category: string;
        desc: string;
        metricLabel: string;
      };
      boekhoudGemak: {
        name: string;
        category: string;
        desc: string;
        metricLabel: string;
      };
    };
    recentAuditLogs: string;
    syncSuccessNotice: string;
  };
  activities: {
    title: string;
    subtitle: string;
    logActivity: string;
    types: {
      call: string;
      meeting: string;
      email: string;
      sync: string;
      deal_update: string;
    };
    empty: string;
  };
  modal: {
    createTitle: string;
    dealTab: string;
    accountTab: string;
    contactTab: string;
    activityTab: string;
    save: string;
    cancel: string;
    successCreated: string;
  };
  common: {
    search: string;
    filter: string;
    all: string;
    close: string;
    view: string;
    edit: string;
    delete: string;
    actions: string;
    language: string;
    theme: string;
    light: string;
    dark: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'NexusCRM Suite',
    appTagline: 'Multilingual Enterprise CRM & Connected Ecosystem',
    nav: {
      dashboard: 'Dashboard',
      pipeline: 'Pipeline',
      accounts: 'Accounts',
      contacts: 'Contacts',
      ecosystem: 'Connected Apps',
      activities: 'Activity Log',
      seoInspector: 'SEO & Social Card',
      newRecord: 'New Record',
    },
    seo: {
      pageTitle: 'NexusCRM Suite – Multilingual Enterprise CRM & Connected Ecosystem',
      metaDescription: 'Enterprise customer relationship management platform with multilingual workflows and unified bridges to RosterSync Pro, TalentPulse HRIS, Kopilot Projects, and BoekhoudGemak.',
      ogTitle: 'NexusCRM Suite – Enterprise Multilingual CRM Platform',
      ogDescription: 'Synchronize customer relations, pipelines, workforce schedules, project deliverables, and financial bookkeeping in one unified workspace.',
      keywords: 'CRM, multilingual CRM, sales pipeline, customer relationships, enterprise software, RosterSync Pro, TalentPulse HRIS, Kopilot Projects, BoekhoudGemak',
    },
    hero: {
      badge: 'Ecosystem Suite Connected',
      headline: 'Unified Relationship Intelligence for Modern Enterprises',
      subheadline: 'NexusCRM Suite bridges your customer relationships directly with RosterSync Pro, TalentPulse HRIS, Kopilot Projects, and BoekhoudGemak without data silos.',
      quickSync: 'Sync Ecosystem Now',
      exploreEcosystem: 'View Connected Apps',
      viewPipeline: 'Explore Pipeline',
    },
    stats: {
      totalPipeline: 'Total Pipeline Value',
      activeAccounts: 'Active Client Accounts',
      winRate: 'Win Conversion Rate',
      ecosystemSyncRate: 'Ecosystem Sync Health',
      openDeals: 'Open Deals in Flight',
      avgDealSize: 'Average Deal Size',
    },
    pipeline: {
      title: 'Sales Pipeline & Commercial Forecast',
      subtitle: 'Track deal progress, probability valuations, and ecosystem handoffs across active sales stages.',
      kanbanView: 'Kanban Board',
      listView: 'Table View',
      stages: {
        lead: 'Lead Inbound',
        qualified: 'Qualified',
        proposal: 'Proposal Sent',
        negotiation: 'In Negotiation',
        closed_won: 'Closed Won',
        closed_lost: 'Closed Lost',
      },
      stageValue: 'Stage Value',
      dealsCount: 'deals',
      addDeal: 'Add New Deal',
      filterByStage: 'Filter by Stage',
      expectedClose: 'Expected Close',
      probability: 'Probability',
      owner: 'Account Owner',
      moveNext: 'Advance Stage',
      movePrev: 'Previous Stage',
    },
    accounts: {
      title: 'Client Accounts & Organizations',
      subtitle: 'Complete 360° portfolio overview with embedded ecosystem synchronization indicators.',
      searchPlaceholder: 'Search accounts by name, industry, or city...',
      addAccount: 'Add Account',
      companyName: 'Company Name',
      industry: 'Industry',
      tier: 'Tier',
      healthScore: 'Health Score',
      totalValue: 'Total Value',
      status: 'Status',
      linkedApps: 'Connected Apps',
      details: 'Account Details',
      statuses: {
        active: 'Active',
        prospect: 'Prospect',
        churn_risk: 'Churn Risk',
        onboarding: 'Onboarding',
      },
    },
    contacts: {
      title: 'Contact Directory & Decision Makers',
      subtitle: 'Manage client stakeholders, direct communication details, and recent interactions.',
      addContact: 'Add Contact',
      searchPlaceholder: 'Search contacts by name, email, or company...',
      contactName: 'Contact Name',
      role: 'Role & Title',
      company: 'Company',
      email: 'Email Address',
      phone: 'Phone Number',
      lastContact: 'Last Contacted',
    },
    ecosystem: {
      title: 'Connected Ecosystem Hub',
      subtitle: 'Live bidirectional links connecting customer accounts to operational and financial tools.',
      syncAll: 'Synchronize All Apps',
      syncing: 'Synchronizing records...',
      lastSynchronized: 'Last synced',
      recordsLinked: 'Linked Records',
      statusConnected: 'Connected & Active',
      statusSyncing: 'Synchronizing Data',
      openApp: 'Launch App',
      apps: {
        rosterSync: {
          name: 'RosterSync Pro',
          category: 'Workforce & Shift Scheduling',
          desc: 'Synchronizes field technician shifts, client service appointments, and operational roster allocations with client accounts.',
          metricLabel: 'Active Rostered Shifts',
        },
        talentPulse: {
          name: 'TalentPulse HRIS',
          category: 'Human Capital & Talent Management',
          desc: 'Coordinates account executives, dedicated relationship engineers, and employee capacity profiles for each client account.',
          metricLabel: 'Assigned Internal Leads',
        },
        kopilot: {
          name: 'Kopilot Projects',
          category: 'Project Execution & Agile Delivery',
          desc: 'Tracks client deliverables, sprint velocity, project milestones, and SLA progress linked directly to client contracts.',
          metricLabel: 'Active Client Projects',
        },
        boekhoudGemak: {
          name: 'BoekhoudGemak',
          category: 'Financial Ledger & Invoicing',
          desc: 'Seamlessly matches deal values to ledger invoices, tracks VAT compliance, ARR metrics, and overdue client balances.',
          metricLabel: 'Annual Contract Invoices',
        },
      },
      recentAuditLogs: 'Ecosystem Event Audit Stream',
      syncSuccessNotice: 'All ecosystem platforms successfully synchronized with NexusCRM Suite.',
    },
    activities: {
      title: 'Interactions & Activity Timeline',
      subtitle: 'Comprehensive audit trail of customer meetings, phone calls, deals, and ecosystem sync events.',
      logActivity: 'Log Interaction',
      types: {
        call: 'Phone Call',
        meeting: 'Client Meeting',
        email: 'Email Thread',
        sync: 'Ecosystem Sync',
        deal_update: 'Pipeline Update',
      },
      empty: 'No activity logs found for this filter.',
    },
    modal: {
      createTitle: 'Create New CRM Record',
      dealTab: 'Deal',
      accountTab: 'Account',
      contactTab: 'Contact',
      activityTab: 'Interaction',
      save: 'Save Record',
      cancel: 'Cancel',
      successCreated: 'Record successfully added to NexusCRM Suite.',
    },
    common: {
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      close: 'Close',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      actions: 'Actions',
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
    },
  },

  nl: {
    appName: 'NexusCRM Suite',
    appTagline: 'Meertalig Klant Relatiebeheer & Geïntegreerd Ecosysteem',
    nav: {
      dashboard: 'Dashboard',
      pipeline: 'Verkooppijplijn',
      accounts: 'Klanten & Bedrijven',
      contacts: 'Contactpersonen',
      ecosystem: 'Gekoppelde Apps',
      activities: 'Activiteitenlog',
      seoInspector: 'SEO & Social Media Kaart',
      newRecord: 'Nieuwe Invoer',
    },
    seo: {
      pageTitle: 'NexusCRM Suite – Meertalig Klant Relatiebeheer & Geïntegreerd Ecosysteem',
      metaDescription: 'Geavanceerd klant relatiebeheer met meertalige workflows en directe koppelingen naar RosterSync Pro, TalentPulse HRIS, Kopilot Projects en BoekhoudGemak.',
      ogTitle: 'NexusCRM Suite – Zakelijk Meertalig CRM Platform',
      ogDescription: 'Synchroniseer klantrelaties, offertes, personeelsplanning, projectdeadlines en boekhouding in één centraal overzicht.',
      keywords: 'CRM, klant relatiebeheer, meertalig CRM, RosterSync Pro, TalentPulse HRIS, Kopilot Projects, BoekhoudGemak, verkooppijplijn, offertes',
    },
    hero: {
      badge: 'Ecosysteem Suite Gekoppeld',
      headline: 'Geïntegreerd Relatiebeheer voor Moderne Bedrijven',
      subheadline: 'NexusCRM Suite verbindt uw klantrelaties naadloos met RosterSync Pro, TalentPulse HRIS, Kopilot Projects en BoekhoudGemak zonder datasilo’s.',
      quickSync: 'Ecosysteem Nu Synchroniseren',
      exploreEcosystem: 'Bekijk Gekoppelde Apps',
      viewPipeline: 'Bekijk Pijplijn',
    },
    stats: {
      totalPipeline: 'Totale Pijplijnwaarde',
      activeAccounts: 'Actieve Klantaccounts',
      winRate: 'Conversieratio Gewonnen',
      ecosystemSyncRate: 'Ecosysteem Gezondheid',
      openDeals: 'Lopende Verkooptrajecten',
      avgDealSize: 'Gemiddelde Dealwaarde',
    },
    pipeline: {
      title: 'Verkooppijplijn & Commerciële Prognose',
      subtitle: 'Volg de voortgang van deals, slagingskansen en ecosysteemoverdrachten per verkoopstadium.',
      kanbanView: 'Kanban Bord',
      listView: 'Tabeloverzicht',
      stages: {
        lead: 'Nieuwe Lead',
        qualified: 'Gekwalificeerd',
        proposal: 'Voorstel / Offerte',
        negotiation: 'In Onderhandeling',
        closed_won: 'Gewonnen Deal',
        closed_lost: 'Verloren Deal',
      },
      stageValue: 'Fasewaarde',
      dealsCount: 'deals',
      addDeal: 'Nieuwe Deal Toevoegen',
      filterByStage: 'Filter op Fase',
      expectedClose: 'Verwachte Sluitdatum',
      probability: 'Slagingskans',
      owner: 'Accountmanager',
      moveNext: 'Volgende Fase',
      movePrev: 'Vorige Fase',
    },
    accounts: {
      title: 'Klantaccounts & Organisaties',
      subtitle: 'Compleet 360° overzicht met realtime statusindicatoren voor alle gekoppelde applicaties.',
      searchPlaceholder: 'Zoek accounts op bedrijfsnaam, sector of stad...',
      addAccount: 'Account Toevoegen',
      companyName: 'Bedrijfsnaam',
      industry: 'Sector / Branche',
      tier: 'Segment',
      healthScore: 'Klantgezondheid',
      totalValue: 'Totale Waarde',
      status: 'Status',
      linkedApps: 'Gekoppelde Apps',
      details: 'Accountdetails',
      statuses: {
        active: 'Actief',
        prospect: 'Prospect',
        churn_risk: 'Verhoogd Risico',
        onboarding: 'Inrichting / Start',
      },
    },
    contacts: {
      title: 'Contactpersonendossier & Beslissers',
      subtitle: 'Beheer alle contactpersonen, directe communicatiegegevens en recente interacties.',
      addContact: 'Contactpersoon Toevoegen',
      searchPlaceholder: 'Zoek contacten op naam, e-mail of bedrijf...',
      contactName: 'Naam Contactpersoon',
      role: 'Functie',
      company: 'Bedrijf',
      email: 'E-mailadres',
      phone: 'Telefoonnummer',
      lastContact: 'Laatst Gecontacteerd',
    },
    ecosystem: {
      title: 'Geïntegreerde Ecosysteem Hub',
      subtitle: 'Realtime tweewegkoppelingen tussen klantrelaties, planning, personeel, projecten en financiën.',
      syncAll: 'Alle Apps Synchroniseren',
      syncing: 'Gegevens synchroniseren...',
      lastSynchronized: 'Laatste synchronisatie',
      recordsLinked: 'Gekoppelde Records',
      statusConnected: 'Verbonden & Actief',
      statusSyncing: 'Data Synchroniseren',
      openApp: 'App Openen',
      apps: {
        rosterSync: {
          name: 'RosterSync Pro',
          category: 'Personeelsplanning & Dienstroosters',
          desc: 'Synchroniseert buitendienstshifts, servicemonteurs en roosterplanning rechtstreeks met klantdossiers.',
          metricLabel: 'Ingeplande Klantendienst Shifts',
        },
        talentPulse: {
          name: 'TalentPulse HRIS',
          category: 'HR Management & Talenttoewijzing',
          desc: 'Koppelt vaste accountmanagers, klantsuccesmedewerkers en teamcapaciteit aan elke klantrelatie.',
          metricLabel: 'Toegewezen Interne Specialisten',
        },
        kopilot: {
          name: 'Kopilot Projects',
          category: 'Projectuitvoering & Agile Beheer',
          desc: 'Bewaakt lopende klantprojecten, sprintdeadlines, mijlpalen en SLA-doelstellingen direct vanuit het CRM.',
          metricLabel: 'Lopende Klantprojecten',
        },
        boekhoudGemak: {
          name: 'BoekhoudGemak',
          category: 'Financiële Administratie & Facturatie',
          desc: 'Koppelt gewonnen deals aan verkoopfacturen, bewaakt btw-nummers, ARR en openstaande posten.',
          metricLabel: 'Actieve Jaarcontract Facturen',
        },
      },
      recentAuditLogs: 'Ecosysteem Gebeurtenissenstroom',
      syncSuccessNotice: 'Alle ecosysteem platforms zijn succesvol gesynchroniseerd met NexusCRM Suite.',
    },
    activities: {
      title: 'Interactie- & Activiteitenhistorie',
      subtitle: 'Volledig audittraject van telefoongesprekken, vergaderingen, offertes en synchronisaties.',
      logActivity: 'Interactie Vastleggen',
      types: {
        call: 'Telefoongesprek',
        meeting: 'Klantvergadering',
        email: 'E-mailwisseling',
        sync: 'Ecosysteem Sync',
        deal_update: 'Pijplijn Wijziging',
      },
      empty: 'Geen activiteiten gevonden voor dit filter.',
    },
    modal: {
      createTitle: 'Nieuwe CRM Invoer Vastleggen',
      dealTab: 'Deal',
      accountTab: 'Klantaccount',
      contactTab: 'Contactpersoon',
      activityTab: 'Interactie',
      save: 'Opslaan',
      cancel: 'Annuleren',
      successCreated: 'Succesvol toegevoegd aan NexusCRM Suite.',
    },
    common: {
      search: 'Zoeken',
      filter: 'Filteren',
      all: 'Alles',
      close: 'Sluiten',
      view: 'Bekijken',
      edit: 'Bewerken',
      delete: 'Verwijderen',
      actions: 'Acties',
      language: 'Taal',
      theme: 'Thema',
      light: 'Licht',
      dark: 'Donker',
    },
  },

  fr: {
    appName: 'NexusCRM Suite',
    appTagline: 'Gestion Relation Client Multilingue & Écosystème Connecté',
    nav: {
      dashboard: 'Tableau de bord',
      pipeline: 'Pipeline des Ventes',
      accounts: 'Comptes Clients',
      contacts: 'Contacts',
      ecosystem: 'Apps Connectées',
      activities: 'Journal d’Activité',
      seoInspector: 'SEO & Carte Sociale',
      newRecord: 'Nouvel Enregistrement',
    },
    seo: {
      pageTitle: 'NexusCRM Suite – CRM Entreprise Multilingue & Écosystème Connecté',
      metaDescription: 'Plateforme de gestion de la relation client multilingue avec des passerelles vers RosterSync Pro, TalentPulse HRIS, Kopilot Projects et BoekhoudGemak.',
      ogTitle: 'NexusCRM Suite – CRM Multilingue d’Entreprise',
      ogDescription: 'Harmonisez les relations clients, la planification du personnel, la gestion de projet et la comptabilité dans un espace unique.',
      keywords: 'CRM, gestion relation client, RosterSync Pro, TalentPulse HRIS, Kopilot Projects, BoekhoudGemak, ventes, pipeline',
    },
    hero: {
      badge: 'Écosystème Connecté',
      headline: 'Intelligence Relationnelle Unifiée pour Entreprises',
      subheadline: 'NexusCRM Suite connecte vos relations clients à RosterSync Pro, TalentPulse HRIS, Kopilot Projects et BoekhoudGemak sans silos de données.',
      quickSync: 'Synchroniser l’Écosystème',
      exploreEcosystem: 'Voir les Applications',
      viewPipeline: 'Explorer le Pipeline',
    },
    stats: {
      totalPipeline: 'Valeur Totale du Pipeline',
      activeAccounts: 'Comptes Clients Actifs',
      winRate: 'Taux de Conversion Gagné',
      ecosystemSyncRate: 'Santé de Synchronisation',
      openDeals: 'Affaires en Cours',
      avgDealSize: 'Taille Moyenne d’Affaire',
    },
    pipeline: {
      title: 'Pipeline des Ventes & Prévisions',
      subtitle: 'Suivez la progression des opportunités, la probabilité de gain et les flux de travail connectés.',
      kanbanView: 'Vue Kanban',
      listView: 'Vue Tableau',
      stages: {
        lead: 'Piste Entrante',
        qualified: 'Qualifié',
        proposal: 'Proposition Envoyée',
        negotiation: 'En Négociation',
        closed_won: 'Gagné',
        closed_lost: 'Perdu',
      },
      stageValue: 'Valeur de l’Étape',
      dealsCount: 'affaires',
      addDeal: 'Ajouter une Affaire',
      filterByStage: 'Filtrer par Étape',
      expectedClose: 'Clôture Prévue',
      probability: 'Probabilité',
      owner: 'Responsable de Compte',
      moveNext: 'Étape Suivante',
      movePrev: 'Étape Précédente',
    },
    accounts: {
      title: 'Comptes Clients & Entreprises',
      subtitle: 'Vue à 360° du portefeuille client avec indicateurs de synchronisation en temps réel.',
      searchPlaceholder: 'Rechercher par nom, secteur, ville...',
      addAccount: 'Ajouter un Compte',
      companyName: 'Nom de l’Entreprise',
      industry: 'Secteur',
      tier: 'Catégorie',
      healthScore: 'Score de Santé',
      totalValue: 'Valeur Totale',
      status: 'Statut',
      linkedApps: 'Applications Connectées',
      details: 'Détails du Compte',
      statuses: {
        active: 'Actif',
        prospect: 'Prospect',
        churn_risk: 'Risque de Désengagement',
        onboarding: 'Intégration',
      },
    },
    contacts: {
      title: 'Répertoire des Contacts & Décideurs',
      subtitle: 'Gérez l’ensemble des parties prenantes clients et l’historique des communications.',
      addContact: 'Ajouter un Contact',
      searchPlaceholder: 'Rechercher par nom, email, entreprise...',
      contactName: 'Nom du Contact',
      role: 'Poste',
      company: 'Entreprise',
      email: 'Adresse Email',
      phone: 'Téléphone',
      lastContact: 'Dernier Contact',
    },
    ecosystem: {
      title: 'Centre d’Écosystème Connecté',
      subtitle: 'Passerelles bidirectionnelles unifiant vos processus opérationnels et financiers.',
      syncAll: 'Tout Synchroniser',
      syncing: 'Synchronisation en cours...',
      lastSynchronized: 'Dernière synchro',
      recordsLinked: 'Enregistrements Liés',
      statusConnected: 'Connecté & Actif',
      statusSyncing: 'Synchronisation',
      openApp: 'Ouvrir l’Application',
      apps: {
        rosterSync: {
          name: 'RosterSync Pro',
          category: 'Planification du Personnel & Horaires',
          desc: 'Associe les plannings d’interventions et les techniciens aux comptes clients.',
          metricLabel: 'Plages Horaires Actives',
        },
        talentPulse: {
          name: 'TalentPulse HRIS',
          category: 'Gestion RH & Compétences',
          desc: 'Affecte les gestionnaires de compte et les experts internes à chaque client.',
          metricLabel: 'Experts Internes Dédiés',
        },
        kopilot: {
          name: 'Kopilot Projects',
          category: 'Gestion de Projets & Livrables',
          desc: 'Suit les jalons de livraison et les sprints des projets rattachés aux contrats.',
          metricLabel: 'Projets Clients en Cours',
        },
        boekhoudGemak: {
          name: 'BoekhoudGemak',
          category: 'Comptabilité & Facturation',
          desc: 'Rapproche les opportunités commerciales des factures et surveille le chiffre d’affaires.',
          metricLabel: 'Factures Annuelles Liées',
        },
      },
      recentAuditLogs: 'Flux des Événements Récents',
      syncSuccessNotice: 'Toutes les applications de l’écosystème sont synchronisées avec NexusCRM Suite.',
    },
    activities: {
      title: 'Historique des Activités & Échanges',
      subtitle: 'Journal complet des appels, rendez-vous, modifications de contrats et synchronisations.',
      logActivity: 'Enregistrer une Activité',
      types: {
        call: 'Appel Téléphonique',
        meeting: 'Réunion Client',
        email: 'Échange d’Emails',
        sync: 'Synchro Écosystème',
        deal_update: 'Mise à Jour Pipeline',
      },
      empty: 'Aucune activité répertoriée.',
    },
    modal: {
      createTitle: 'Créer un Nouvel Élément CRM',
      dealTab: 'Affaire',
      accountTab: 'Compte',
      contactTab: 'Contact',
      activityTab: 'Interaction',
      save: 'Enregistrer',
      cancel: 'Annuler',
      successCreated: 'Élément ajouté à NexusCRM Suite.',
    },
    common: {
      search: 'Rechercher',
      filter: 'Filtrer',
      all: 'Tout',
      close: 'Fermer',
      view: 'Afficher',
      edit: 'Modifier',
      delete: 'Supprimer',
      actions: 'Actions',
      language: 'Langue',
      theme: 'Thème',
      light: 'Clair',
      dark: 'Sombre',
    },
  },

  de: {
    appName: 'NexusCRM Suite',
    appTagline: 'Mehrsprachiges Kundenbeziehungsmanagement & Verbundene Apps',
    nav: {
      dashboard: 'Dashboard',
      pipeline: 'Vertriebspipeline',
      accounts: 'Kundenkonten',
      contacts: 'Kontakte',
      ecosystem: 'Verbundene Apps',
      activities: 'Aktivitätsprotokoll',
      seoInspector: 'SEO & Social Card',
      newRecord: 'Neuer Eintrag',
    },
    seo: {
      pageTitle: 'NexusCRM Suite – Mehrsprachiges Enterprise CRM & Ökosystem',
      metaDescription: 'Enterprise CRM-Plattform mit mehrsprachigen Arbeitsabläufen und Anbindungen an RosterSync Pro, TalentPulse HRIS, Kopilot Projects und BoekhoudGemak.',
      ogTitle: 'NexusCRM Suite – Enterprise CRM Plattform',
      ogDescription: 'Verbinden Sie Kundenbeziehungen, Vertriebspipeline, Personaleinsatzplanung, Projektmeilensteine und Buchhaltung in einem Workspace.',
      keywords: 'CRM, Kundenbeziehungsmanagement, RosterSync Pro, TalentPulse HRIS, Kopilot Projects, BoekhoudGemak, Vertriebspipeline',
    },
    hero: {
      badge: 'Ökosystem Suite Verbunden',
      headline: 'Einheitliche Kundenintelligenz für Moderne Unternehmen',
      subheadline: 'NexusCRM Suite verbindet Kundenbeziehungen nahtlos mit RosterSync Pro, TalentPulse HRIS, Kopilot Projects und BoekhoudGemak ohne Datensilos.',
      quickSync: 'Ökosystem Jetzt Synchronisieren',
      exploreEcosystem: 'Verbundene Apps Anzeigen',
      viewPipeline: 'Pipeline Erkunden',
    },
    stats: {
      totalPipeline: 'Gesamtwert der Pipeline',
      activeAccounts: 'Aktive Kundenkonten',
      winRate: 'Abschlussrate Gewonnen',
      ecosystemSyncRate: 'Ökosystem-Integrität',
      openDeals: 'Laufende Deals',
      avgDealSize: 'Durchschnittliche Dealgröße',
    },
    pipeline: {
      title: 'Vertriebspipeline & Geschäftsprognose',
      subtitle: 'Verfolgen Sie Deal-Fortschritte, Abschlusswahrscheinlichkeiten und Übergaben an verbundene Apps.',
      kanbanView: 'Kanban-Board',
      listView: 'Tabellenansicht',
      stages: {
        lead: 'Lead Eingegangen',
        qualified: 'Qualifiziert',
        proposal: 'Angebot Erstellt',
        negotiation: 'In Verhandlung',
        closed_won: 'Gewonnen',
        closed_lost: 'Verloren',
      },
      stageValue: 'Stufenwert',
      dealsCount: 'Deals',
      addDeal: 'Deal Hinzufügen',
      filterByStage: 'Nach Stufe Filtern',
      expectedClose: 'Voraussichtlicher Abschluss',
      probability: 'Wahrscheinlichkeit',
      owner: 'Kundenbetreuer',
      moveNext: 'Nächste Stufe',
      movePrev: 'Vorherige Stufe',
    },
    accounts: {
      title: 'Kundenkonten & Unternehmen',
      subtitle: 'Vollständige 360°-Kundenübersicht mit Synchronisationsstatus der verbundenen Tools.',
      searchPlaceholder: 'Nach Name, Branche oder Stadt suchen...',
      addAccount: 'Konto Hinzufügen',
      companyName: 'Unternehmensname',
      industry: 'Branche',
      tier: 'Kategorie',
      healthScore: 'Gesundheitswert',
      totalValue: 'Gesamtwert',
      status: 'Status',
      linkedApps: 'Verbundene Apps',
      details: 'Kontodetails',
      statuses: {
        active: 'Aktiv',
        prospect: 'Interessent',
        churn_risk: 'Abwanderungsrisiko',
        onboarding: 'Einführung',
      },
    },
    contacts: {
      title: 'Kontaktverzeichnis & Entscheider',
      subtitle: 'Verwalten Sie Ansprechpartner, direkte Kontaktdaten und Kommunikationsverläufe.',
      addContact: 'Kontakt Hinzufügen',
      searchPlaceholder: 'Nach Name, E-Mail oder Firma suchen...',
      contactName: 'Kontaktname',
      role: 'Position / Rolle',
      company: 'Unternehmen',
      email: 'E-Mail-Adresse',
      phone: 'Telefonnummer',
      lastContact: 'Letzter Kontakt',
    },
    ecosystem: {
      title: 'Zentrales App-Ökosystem',
      subtitle: 'Bidirektionale Schnittstellen zwischen CRM, Dienstplanung, HR, Projektmanagement und Buchhaltung.',
      syncAll: 'Alle Apps Synchronisieren',
      syncing: 'Daten werden synchronisiert...',
      lastSynchronized: 'Zuletzt synchronisiert',
      recordsLinked: 'Verknüpfte Datensätze',
      statusConnected: 'Verbunden & Aktiv',
      statusSyncing: 'Synchronisierung',
      openApp: 'App Öffnen',
      apps: {
        rosterSync: {
          name: 'RosterSync Pro',
          category: 'Personal- & Schichtplanung',
          desc: 'Synchronisiert Außendienstschichten, Serviceeinsätze und Schichtpläne direkt mit Kundenkonten.',
          metricLabel: 'Geplante Kundenschichten',
        },
        talentPulse: {
          name: 'TalentPulse HRIS',
          category: 'Personalverwaltung & Talentmanagement',
          desc: 'Koordiniert feste Betreuer, Account Manager und Fachexperten für jedes Kundenkonto.',
          metricLabel: 'Zugewiesene Interne Experten',
        },
        kopilot: {
          name: 'Kopilot Projects',
          category: 'Projektabwicklung & Agile Steuerung',
          desc: 'Überwacht Meilensteine, Sprint-Fortschritte und Liefertermine verknüpft mit Kundenverträgen.',
          metricLabel: 'Laufende Kundenprojekte',
        },
        boekhoudGemak: {
          name: 'BoekhoudGemak',
          category: 'Finanzbuchhaltung & Rechnungsstellung',
          desc: 'Gleicht gewonnene Deals mit Ausgangsrechnungen ab und überwacht offene Posten und ARR.',
          metricLabel: 'Aktive Jahresvertragsrechnungen',
        },
      },
      recentAuditLogs: 'Ökosystem-Ereignisprotokoll',
      syncSuccessNotice: 'Alle App-Verbindungen wurden erfolgreich mit NexusCRM Suite abgeglichen.',
    },
    activities: {
      title: 'Interaktionen & Aktivitätsverlauf',
      subtitle: 'Lückenloser Nachweis aller Telefonate, Kundentermine, Angebote und Systemereignisse.',
      logActivity: 'Aktivität Erfassen',
      types: {
        call: 'Telefonat',
        meeting: 'Kundentermin',
        email: 'E-Mail',
        sync: 'Ökosystem-Sync',
        deal_update: 'Pipeline-Update',
      },
      empty: 'Keine Aktivitäten für diesen Filter gefunden.',
    },
    modal: {
      createTitle: 'Neuen CRM-Datensatz Erstellen',
      dealTab: 'Deal',
      accountTab: 'Konto',
      contactTab: 'Kontakt',
      activityTab: 'Interaktion',
      save: 'Speichern',
      cancel: 'Abbrechen',
      successCreated: 'Erfolgreich zu NexusCRM Suite hinzugefügt.',
    },
    common: {
      search: 'Suchen',
      filter: 'Filtern',
      all: 'Alle',
      close: 'Schließen',
      view: 'Anzeigen',
      edit: 'Bearbeiten',
      delete: 'Löschen',
      actions: 'Aktionen',
      language: 'Sprache',
      theme: 'Design',
      light: 'Hell',
      dark: 'Dunkel',
    },
  },

  es: {
    appName: 'NexusCRM Suite',
    appTagline: 'Gestión Multilingüe de Clientes & Ecosistema Conectado',
    nav: {
      dashboard: 'Panel Principal',
      pipeline: 'Embudo de Ventas',
      accounts: 'Cuentas de Clientes',
      contacts: 'Contactos',
      ecosystem: 'Apps Conectadas',
      activities: 'Registro de Actividad',
      seoInspector: 'SEO & Tarjeta Social',
      newRecord: 'Nuevo Registro',
    },
    seo: {
      pageTitle: 'NexusCRM Suite – CRM Empresarial Multilingüe & Ecosistema',
      metaDescription: 'Plataforma empresarial de gestión de clientes con flujos de trabajo multilingües y conexiones a RosterSync Pro, TalentPulse HRIS, Kopilot Projects y BoekhoudGemak.',
      ogTitle: 'NexusCRM Suite – Plataforma CRM Multilingüe',
      ogDescription: 'Sincronice relaciones con clientes, ventas, planificación de turnos, proyectos y contabilidad en un único entorno.',
      keywords: 'CRM, gestión de relaciones con clientes, RosterSync Pro, TalentPulse HRIS, Kopilot Projects, BoekhoudGemak, embudo de ventas',
    },
    hero: {
      badge: 'Ecosistema Conectado',
      headline: 'Inteligencia de Clientes Unificada para Empresas Modernas',
      subheadline: 'NexusCRM Suite conecta sus cuentas de clientes directamente con RosterSync Pro, TalentPulse HRIS, Kopilot Projects y BoekhoudGemak sin fricciones.',
      quickSync: 'Sincronizar Ecosistema',
      exploreEcosystem: 'Ver Aplicaciones Conectadas',
      viewPipeline: 'Explorar Embudo',
    },
    stats: {
      totalPipeline: 'Valor Total del Embudo',
      activeAccounts: 'Cuentas de Clientes Activas',
      winRate: 'Tasa de Ganancia',
      ecosystemSyncRate: 'Salud de Sincronización',
      openDeals: 'Oportunidades en Curso',
      avgDealSize: 'Tamaño Medio de Acuerdo',
    },
    pipeline: {
      title: 'Embudo de Ventas & Proyecciones',
      subtitle: 'Supervise el avance de oportunidades comerciales, probabilidades y transferencias de proyectos.',
      kanbanView: 'Tablero Kanban',
      listView: 'Vista de Tabla',
      stages: {
        lead: 'Contacto Inicial',
        qualified: 'Calificado',
        proposal: 'Propuesta Enviada',
        negotiation: 'En Negociación',
        closed_won: 'Ganada',
        closed_lost: 'Perdida',
      },
      stageValue: 'Valor de Etapa',
      dealsCount: 'acuerdos',
      addDeal: 'Añadir Oportunidad',
      filterByStage: 'Filtrar por Etapa',
      expectedClose: 'Cierre Previsto',
      probability: 'Probabilidad',
      owner: 'Responsable',
      moveNext: 'Siguiente Etapa',
      movePrev: 'Etapa Anterior',
    },
    accounts: {
      title: 'Cuentas y Empresas Clientes',
      subtitle: 'Visión integral en 360° con sincronización de estado en tiempo real.',
      searchPlaceholder: 'Buscar por nombre, sector o ciudad...',
      addAccount: 'Añadir Cuenta',
      companyName: 'Nombre de la Empresa',
      industry: 'Sector',
      tier: 'Nivel',
      healthScore: 'Salud de Cuenta',
      totalValue: 'Valor Total',
      status: 'Estado',
      linkedApps: 'Aplicaciones Conectadas',
      details: 'Detalles de la Cuenta',
      statuses: {
        active: 'Activa',
        prospect: 'Prospecto',
        churn_risk: 'Riesgo de Baja',
        onboarding: 'Incorporación',
      },
    },
    contacts: {
      title: 'Directorio de Contactos & Directivos',
      subtitle: 'Administre interlocutores clave, información de contacto e historial de llamadas.',
      addContact: 'Añadir Contacto',
      searchPlaceholder: 'Buscar contactos por nombre, correo o empresa...',
      contactName: 'Nombre del Contacto',
      role: 'Cargo',
      company: 'Empresa',
      email: 'Correo Electrónico',
      phone: 'Teléfono',
      lastContact: 'Último Contacto',
    },
    ecosystem: {
      title: 'Centro de Ecosistema Conectado',
      subtitle: 'Enlaces bidireccionales entre gestión de clientes, turnos, recursos humanos, proyectos y finanzas.',
      syncAll: 'Sincronizar Todas las Apps',
      syncing: 'Sincronizando datos...',
      lastSynchronized: 'Última sincronización',
      recordsLinked: 'Registros Vinculados',
      statusConnected: 'Conectado y Activo',
      statusSyncing: 'Sincronizando',
      openApp: 'Abrir Aplicación',
      apps: {
        rosterSync: {
          name: 'RosterSync Pro',
          category: 'Turnos y Planificación de Horarios',
          desc: 'Sincroniza turnos de técnicos y visitas de servicio de campo con el expediente de cada cliente.',
          metricLabel: 'Turnos de Servicio Activos',
        },
        talentPulse: {
          name: 'TalentPulse HRIS',
          category: 'Gestión de RRHH y Talento',
          desc: 'Asigna gestores de cuenta e ingenieros de soporte a cada relación comercial.',
          metricLabel: 'Especialistas Internos Asignados',
        },
        kopilot: {
          name: 'Kopilot Projects',
          category: 'Gestión de Proyectos & Entregables',
          desc: 'Supervisa hitos de sprint, entregas y cumplimiento de SLA vinculados a los contratos.',
          metricLabel: 'Proyectos de Clientes en Curso',
        },
        boekhoudGemak: {
          name: 'BoekhoudGemak',
          category: 'Contabilidad y Facturación',
          desc: 'Vincula oportunidades ganadas con facturas emitidas, IVA y saldos pendientes.',
          metricLabel: 'Facturas de Contratos Anuales',
        },
      },
      recentAuditLogs: 'Historial de Eventos del Ecosistema',
      syncSuccessNotice: 'Todas las plataformas del ecosistema se sincronizaron con éxito en NexusCRM Suite.',
    },
    activities: {
      title: 'Registro de Interacciones y Actividades',
      subtitle: 'Auditoría cronológica de reuniones, llamadas, correos y sincronizaciones del ecosistema.',
      logActivity: 'Registrar Interacción',
      types: {
        call: 'Llamada Telefónica',
        meeting: 'Reunión con Cliente',
        email: 'Intercambio de Correos',
        sync: 'Sincronización Ecosistema',
        deal_update: 'Actualización de Embudo',
      },
      empty: 'No se encontraron actividades para este filtro.',
    },
    modal: {
      createTitle: 'Crear Nuevo Registro en CRM',
      dealTab: 'Oportunidad',
      accountTab: 'Cuenta',
      contactTab: 'Contacto',
      activityTab: 'Interacción',
      save: 'Guardar',
      cancel: 'Cancelar',
      successCreated: 'Registro agregado con éxito a NexusCRM Suite.',
    },
    common: {
      search: 'Buscar',
      filter: 'Filtrar',
      all: 'Todos',
      close: 'Cerrar',
      view: 'Ver',
      edit: 'Editar',
      delete: 'Eliminar',
      actions: 'Acciones',
      language: 'Idioma',
      theme: 'Tema',
      light: 'Claro',
      dark: 'Oscuro',
    },
  },
};
