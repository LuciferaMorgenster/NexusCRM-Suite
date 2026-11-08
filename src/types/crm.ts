export type Language = 'en' | 'nl' | 'fr' | 'de' | 'es';

export type DealStage = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';

export type AccountStatus = 'active' | 'prospect' | 'churn_risk' | 'onboarding';

export interface EcosystemLinkData {
  rosterSync: {
    activeShifts: number;
    assignedTeam: string;
    nextServiceDate: string;
    status: 'synced' | 'pending';
  };
  talentPulse: {
    accountManager: string;
    dedicatedEngineer: string;
    repEmail: string;
    talentScore: number;
  };
  kopilot: {
    activeProjects: number;
    currentSprint: string;
    completionRate: number;
    nextMilestone: string;
  };
  boekhoudGemak: {
    annualContractValue: number;
    currency: string;
    paymentStatus: 'paid' | 'overdue' | 'pending';
    vatNumber: string;
    openInvoicesCount: number;
  };
}

export interface Account {
  id: string;
  name: string;
  industry: string;
  country: string;
  city: string;
  tier: 'Enterprise' | 'Mid-Market' | 'SMB';
  status: AccountStatus;
  healthScore: number;
  totalDealValue: number;
  website: string;
  phone: string;
  createdAt: string;
  ecosystem: EcosystemLinkData;
}

export interface Contact {
  id: string;
  accountId: string;
  accountName: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  department: string;
  isPrimary: boolean;
  avatarUrl?: string;
  lastContactDate: string;
}

export interface Deal {
  id: string;
  accountId: string;
  accountName: string;
  title: string;
  amount: number;
  currency: string;
  stage: DealStage;
  probability: number;
  expectedCloseDate: string;
  owner: string;
  notes?: string;
  createdAt: string;
}

export type ActivityType = 'call' | 'meeting' | 'email' | 'sync' | 'deal_update';

export interface Activity {
  id: string;
  accountId: string;
  accountName: string;
  type: ActivityType;
  title: string;
  description: string;
  performedBy: string;
  timestamp: string;
  sourceApp?: 'NexusCRM' | 'RosterSync Pro' | 'TalentPulse HRIS' | 'Kopilot Projects' | 'BoekhoudGemak';
}

export interface ConnectedApp {
  id: 'rosterSync' | 'talentPulse' | 'kopilot' | 'boekhoudGemak';
  name: string;
  category: string;
  status: 'connected' | 'syncing' | 'paused';
  lastSyncTime: string;
  recordsSynced: number;
  descriptionKey: string;
  url: string;
  accentColor: string;
}
