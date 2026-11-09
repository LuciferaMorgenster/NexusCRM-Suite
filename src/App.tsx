import React, { useState, useEffect } from 'react';
import { I18nProvider, useTranslation } from './context/I18nContext';
import { TopNav } from './components/TopNav';
import { CoverHeroBanner } from './components/CoverHeroBanner';
import { PipelineView } from './components/PipelineView';
import { AccountsView } from './components/AccountsView';
import { ContactsView } from './components/ContactsView';
import { EcosystemHubView } from './components/EcosystemHubView';
import { ActivitiesView } from './components/ActivitiesView';
import { AppSwitcherModal } from './components/AppSwitcherModal';
import { SeoInspectModal } from './components/SeoInspectModal';
import { NewRecordModal } from './components/NewRecordModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { 
  initialAccounts, 
  initialDeals, 
  initialContacts, 
  initialActivities, 
  initialConnectedApps 
} from './data/mockCrmData';
import { Account, Deal, Contact, Activity, ConnectedApp, DealStage } from './types/crm';
import { 
  CalendarClock, 
  Users2, 
  Kanban, 
  Receipt, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Building2,
  Clock
} from 'lucide-react';

function CrmAppContent() {
  const { t, formatCurrency, formatDate } = useTranslation();

  // Dark mode state
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('nexuscrm_theme');
      if (saved) return saved === 'dark';
    } catch (e) {}
    return true; // sleek modern dark slate by default
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nexuscrm_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nexuscrm_theme', 'light');
    }
  }, [isDark]);

  // Tab navigation
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  // Modals state
  const [isAppSwitcherOpen, setIsAppSwitcherOpen] = useState(false);
  const [isSeoInspectOpen, setIsSeoInspectOpen] = useState(false);
  const [isNewRecordOpen, setIsNewRecordOpen] = useState(false);
  const [newRecordTab, setNewRecordTab] = useState<'deal' | 'account' | 'contact' | 'activity'>('deal');

  // Core CRM data stores with local persistence
  const [accounts, setAccounts] = useState<Account[]>(() => {
    try {
      const saved = localStorage.getItem('nexuscrm_accounts');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialAccounts;
  });

  const [deals, setDeals] = useState<Deal[]>(() => {
    try {
      const saved = localStorage.getItem('nexuscrm_deals');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialDeals;
  });

  const [contacts, setContacts] = useState<Contact[]>(() => {
    try {
      const saved = localStorage.getItem('nexuscrm_contacts');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialContacts;
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    try {
      const saved = localStorage.getItem('nexuscrm_activities');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialActivities;
  });

  const [connectedApps, setConnectedApps] = useState<ConnectedApp[]>(initialConnectedApps);
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('nexuscrm_accounts', JSON.stringify(accounts));
    } catch (e) {}
  }, [accounts]);

  useEffect(() => {
    try {
      localStorage.setItem('nexuscrm_deals', JSON.stringify(deals));
    } catch (e) {}
  }, [deals]);

  useEffect(() => {
    try {
      localStorage.setItem('nexuscrm_contacts', JSON.stringify(contacts));
    } catch (e) {}
  }, [contacts]);

  useEffect(() => {
    try {
      localStorage.setItem('nexuscrm_activities', JSON.stringify(activities));
    } catch (e) {}
  }, [activities]);

  // Aggregate metrics
  const totalPipelineValue = deals
    .filter((d) => d.stage !== 'closed_lost')
    .reduce((sum, d) => sum + d.amount, 0);

  const activeAccountsCount = accounts.filter((a) => a.status === 'active').length;

  const wonDealsCount = deals.filter((d) => d.stage === 'closed_won').length;
  const closedDealsCount = deals.filter((d) => d.stage === 'closed_won' || d.stage === 'closed_lost').length;
  const winRate = closedDealsCount > 0 ? Math.round((wonDealsCount / closedDealsCount) * 100) : 67;

  const openDealsCount = deals.filter((d) => d.stage !== 'closed_won' && d.stage !== 'closed_lost').length;

  // Handlers
  const handleUpdateDealStage = (dealId: string, newStage: DealStage) => {
    const deal = deals.find((d) => d.id === dealId);
    if (!deal) return;
    const oldStage = deal.stage;
    
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stage: newStage } : d))
    );

    // If deal won, adjust account total value
    if (newStage === 'closed_won' && oldStage !== 'closed_won') {
      setAccounts((prev) =>
        prev.map((a) =>
          a.id === deal.accountId
            ? { ...a, totalDealValue: a.totalDealValue + deal.amount }
            : a
        )
      );
    }

    // Log activity
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      accountId: deal.accountId,
      accountName: deal.accountName,
      type: 'deal_update',
      title: `Deal "${deal.title}" Stage Changed`,
      description: `Transitioned stage from ${oldStage} to ${newStage}. Valuation: €${deal.amount.toLocaleString()}.`,
      performedBy: 'Current User',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      sourceApp: 'NexusCRM',
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  const handleAddDeal = (dealData: Omit<Deal, 'id' | 'createdAt'>) => {
    const newDeal: Deal = {
      ...dealData,
      id: `deal-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setDeals((prev) => [newDeal, ...prev]);

    const newAct: Activity = {
      id: `act-${Date.now()}`,
      accountId: newDeal.accountId,
      accountName: newDeal.accountName,
      type: 'deal_update',
      title: `New Deal Created: ${newDeal.title}`,
      description: `Logged initial opportunity for €${newDeal.amount.toLocaleString()} in stage "${newDeal.stage}".`,
      performedBy: newDeal.owner,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      sourceApp: 'NexusCRM',
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  const handleAddAccount = (accountData: Omit<Account, 'id' | 'createdAt'>) => {
    const newAccount: Account = {
      ...accountData,
      id: `acc-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAccounts((prev) => [newAccount, ...prev]);

    const newAct: Activity = {
      id: `act-${Date.now()}`,
      accountId: newAccount.id,
      accountName: newAccount.name,
      type: 'sync',
      title: `Client Account Initialized: ${newAccount.name}`,
      description: `Configured account dossier and provisioned connected bridges across RosterSync, TalentPulse, Kopilot, and BoekhoudGemak.`,
      performedBy: 'CRM Administrator',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      sourceApp: 'NexusCRM',
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  const handleAddContact = (contactData: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      ...contactData,
      id: `con-${Date.now()}`,
    };
    setContacts((prev) => [newContact, ...prev]);
  };

  const handleAddActivity = (actData: Omit<Activity, 'id' | 'timestamp'>) => {
    const newAct: Activity = {
      ...actData,
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Synchronize a single connected app
  const handleSyncApp = async (appId: string): Promise<void> => {
    setIsSyncing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setConnectedApps((prev) =>
      prev.map((app) =>
        app.id === appId
          ? {
              ...app,
              lastSyncTime: 'Just now',
              recordsSynced: app.recordsSynced + Math.floor(Math.random() * 5 + 1),
            }
          : app
      )
    );

    const appObj = connectedApps.find((a) => a.id === appId);
    if (appObj) {
      const newAct: Activity = {
        id: `act-${Date.now()}`,
        accountId: accounts[0]?.id || 'acc-1',
        accountName: accounts[0]?.name || 'General Sync',
        type: 'sync',
        title: `${appObj.name} Bi-directional Sync Completed`,
        description: `Verified webhook endpoints and synchronized customer metadata records between ${appObj.name} and NexusCRM.`,
        performedBy: 'NexusCRM Automated Bridge',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        sourceApp: appObj.name as any,
      };
      setActivities((prev) => [newAct, ...prev]);
    }

    setIsSyncing(false);
  };

  // Synchronize all 4 connected apps
  const handleSyncAll = async (): Promise<void> => {
    setIsSyncing(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));

    setConnectedApps((prev) =>
      prev.map((app) => ({
        ...app,
        lastSyncTime: 'Just now',
        recordsSynced: app.recordsSynced + Math.floor(Math.random() * 8 + 2),
      }))
    );

    const newAct: Activity = {
      id: `act-${Date.now()}`,
      accountId: 'all',
      accountName: 'All Enterprise Accounts',
      type: 'sync',
      title: 'Full Ecosystem Synchronization Event',
      description: 'Completed automated reconciliation across RosterSync Pro, TalentPulse HRIS, Kopilot Projects, and BoekhoudGemak.',
      performedBy: 'NexusCRM Ecosystem Daemon',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      sourceApp: 'NexusCRM',
    };
    setActivities((prev) => [newAct, ...prev]);
    setIsSyncing(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      {/* Top Bar Contract Navigation */}
      <TopNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenNewRecord={() => {
          setNewRecordTab('deal');
          setIsNewRecordOpen(true);
        }}
        onOpenAppSwitcher={() => setIsAppSwitcherOpen(true)}
        onOpenSeoInspector={() => setIsSeoInspectOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      {/* Main Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Cover Hero Banner with 16:9 generated asset & KPIs */}
            <CoverHeroBanner
              totalPipelineValue={totalPipelineValue}
              activeAccountsCount={activeAccountsCount}
              winRate={winRate}
              openDealsCount={openDealsCount}
              onExplorePipeline={() => setCurrentTab('pipeline')}
              onOpenEcosystem={() => setCurrentTab('ecosystem')}
              onQuickSync={handleSyncAll}
              isSyncing={isSyncing}
            />

            {/* Dashboard 2-Column Split: Pipeline In Flight & Connected Ecosystem */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Left Column (2 spans): Active Deals & Pipeline Snapshot */}
              <div className="lg:col-span-2 space-y-6">
                {/* Active Deals Snapshot */}
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-slate-900 dark:text-white">
                        Active Commercial Deals
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Top opportunities progressing through sales stages
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentTab('pipeline')}
                      className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <span>{t.common.view} {t.nav.pipeline}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    {deals.slice(0, 5).map((deal) => (
                      <div
                        key={deal.id}
                        className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 px-2 rounded-lg transition-colors"
                      >
                        <div className="space-y-0.5">
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {deal.title}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2">
                            <span>{deal.accountName}</span>
                            <span aria-hidden="true">·</span>
                            <span>{t.pipeline.owner}: {deal.owner}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {t.pipeline.stages[deal.stage]}
                          </span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                            {formatCurrency(deal.amount)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Accounts Directory Snapshot */}
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-slate-900 dark:text-white">
                        Enterprise Accounts Portfolio
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Synchronized organizations and relationship health
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentTab('accounts')}
                      className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <span>{t.common.view} {t.nav.accounts}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {accounts.slice(0, 4).map((acc) => (
                      <div
                        key={acc.id}
                        className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {acc.name}
                          </span>
                          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            {acc.healthScore}% Health
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {acc.industry} · {acc.city}
                        </div>
                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                          <span className="text-slate-400">Valuation</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            {formatCurrency(acc.totalDealValue)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (1 span): Connected Apps & Real-Time Sync Status */}
              <div className="space-y-6">
                {/* 4 Connected Apps Mini-Hub */}
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <h2 className="text-base font-bold text-slate-900 dark:text-white">
                        Connected Ecosystem
                      </h2>
                    </div>
                    <button
                      onClick={() => setIsAppSwitcherOpen(true)}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Manage
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Live operational synchronization with your 4 core business platforms:
                  </p>

                  <div className="space-y-2.5">
                    {/* 1. RosterSync Pro */}
                    <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <CalendarClock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">RosterSync Pro</div>
                          <div className="text-[10px] text-slate-400">Shifts & Field Rosters</div>
                        </div>
                      </div>
                      <span className="font-mono text-emerald-600 font-semibold text-[11px]">Synced</span>
                    </div>

                    {/* 2. TalentPulse HRIS */}
                    <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <Users2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">TalentPulse HRIS</div>
                          <div className="text-[10px] text-slate-400">Account Leads & Engineers</div>
                        </div>
                      </div>
                      <span className="font-mono text-emerald-600 font-semibold text-[11px]">Synced</span>
                    </div>

                    {/* 3. Kopilot Projects */}
                    <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <Kanban className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">Kopilot Projects</div>
                          <div className="text-[10px] text-slate-400">Milestones & Sprints</div>
                        </div>
                      </div>
                      <span className="font-mono text-emerald-600 font-semibold text-[11px]">Synced</span>
                    </div>

                    {/* 4. BoekhoudGemak */}
                    <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <Receipt className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">BoekhoudGemak</div>
                          <div className="text-[10px] text-slate-400">Invoices & ARR Ledger</div>
                        </div>
                      </div>
                      <span className="font-mono text-emerald-600 font-semibold text-[11px]">Synced</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSyncAll}
                    disabled={isSyncing}
                    className="w-full py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-lg transition-colors border border-indigo-200 dark:border-indigo-800/60"
                  >
                    {isSyncing ? t.ecosystem.syncing : t.hero.quickSync}
                  </button>
                </div>

                {/* Multilingual SEO Status Card */}
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                      Multilingual SEO & Social
                    </h2>
                    <button
                      onClick={() => setIsSeoInspectOpen(true)}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Inspect
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Active meta tags, Schema.org JSON-LD, and OpenGraph 16:9 social preview card.
                  </p>
                  <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300 space-y-1">
                    <div>Cover: <span className="text-emerald-600 dark:text-emerald-400">/og-cover.jpg (1920×1080)</span></div>
                    <div>Hreflang: <span className="text-indigo-600 dark:text-indigo-400">EN, NL, FR, DE, ES</span></div>
                    <div>Schema: <span className="text-sky-600 dark:text-sky-400">WebApplication & Organization</span></div>
                  </div>
                </div>

                {/* Recent Activities Feed */}
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                      Recent Activity
                    </h2>
                    <button
                      onClick={() => setCurrentTab('activities')}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    {activities.slice(0, 3).map((act) => (
                      <div key={act.id} className="py-2.5 space-y-0.5">
                        <div className="font-semibold text-slate-900 dark:text-white truncate">
                          {act.title}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center justify-between">
                          <span>{act.accountName}</span>
                          <span className="font-mono">{act.timestamp.slice(11, 16)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'pipeline' && (
          <PipelineView
            deals={deals}
            onUpdateDealStage={handleUpdateDealStage}
            onOpenNewDealModal={() => {
              setNewRecordTab('deal');
              setIsNewRecordOpen(true);
            }}
          />
        )}

        {currentTab === 'accounts' && (
          <AccountsView
            accounts={accounts}
            onOpenNewAccountModal={() => {
              setNewRecordTab('account');
              setIsNewRecordOpen(true);
            }}
            onOpenAppSwitcher={() => setIsAppSwitcherOpen(true)}
          />
        )}

        {currentTab === 'contacts' && (
          <ContactsView
            contacts={contacts}
            onOpenNewContactModal={() => {
              setNewRecordTab('contact');
              setIsNewRecordOpen(true);
            }}
          />
        )}

        {currentTab === 'ecosystem' && (
          <EcosystemHubView
            apps={connectedApps}
            accounts={accounts}
            activities={activities}
            onSyncApp={handleSyncApp}
            onSyncAll={handleSyncAll}
            isSyncing={isSyncing}
          />
        )}

        {currentTab === 'activities' && (
          <ActivitiesView
            activities={activities}
            onOpenNewActivityModal={() => {
              setNewRecordTab('activity');
              setIsNewRecordOpen(true);
            }}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">{t.appName}</span>
            <span>·</span>
            <span>Connected to RosterSync Pro, TalentPulse HRIS, Kopilot Projects & BoekhoudGemak</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSeoInspectOpen(true)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              SEO & Social Card Inspector
            </button>
            <button
              onClick={() => setIsAppSwitcherOpen(true)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Ecosystem Status
            </button>
            <a
              href="https://www.paypal.com/donate/?business=luciferamorgenster@gmail.com&no_recurring=0&currency_code=EUR"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
            >
              <span>💖 Sponsor</span>
            </a>
            <span>© 2026 NexusCRM Suite</span>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <AppSwitcherModal
        isOpen={isAppSwitcherOpen}
        onClose={() => setIsAppSwitcherOpen(false)}
        apps={connectedApps}
        onSyncApp={handleSyncApp}
        onSyncAll={handleSyncAll}
        isSyncing={isSyncing}
      />

      <SeoInspectModal
        isOpen={isSeoInspectOpen}
        onClose={() => setIsSeoInspectOpen(false)}
      />

      <NewRecordModal
        isOpen={isNewRecordOpen}
        onClose={() => setIsNewRecordOpen(false)}
        accounts={accounts}
        onAddDeal={handleAddDeal}
        onAddAccount={handleAddAccount}
        onAddContact={handleAddContact}
        onAddActivity={handleAddActivity}
        defaultTab={newRecordTab}
      />

      {/* PWA Offline Banner */}
      <OfflineIndicator />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <CrmAppContent />
    </I18nProvider>
  );
}
