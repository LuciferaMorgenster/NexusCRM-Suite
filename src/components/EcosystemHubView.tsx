import React, { useState } from 'react';
import { useTranslation } from '../context/I18nContext';
import { ConnectedApp, Account, Activity } from '../types/crm';
import { 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  ExternalLink, 
  CalendarClock, 
  Users2, 
  Kanban, 
  Receipt,
  Activity as PulseIcon,
  ShieldCheck,
  Zap,
  ArrowUpRight
} from 'lucide-react';

interface EcosystemHubViewProps {
  apps: ConnectedApp[];
  accounts: Account[];
  activities: Activity[];
  onSyncApp: (appId: string) => Promise<void>;
  onSyncAll: () => Promise<void>;
  isSyncing: boolean;
}

export const EcosystemHubView: React.FC<EcosystemHubViewProps> = ({
  apps,
  accounts,
  activities,
  onSyncApp,
  onSyncAll,
  isSyncing,
}) => {
  const { t, formatCurrency } = useTranslation();
  const [syncingSingle, setSyncingSingle] = useState<string | null>(null);
  const [activeNotice, setActiveNotice] = useState<string | null>(null);

  const handleSync = async (appId: string, appName: string) => {
    setSyncingSingle(appId);
    await onSyncApp(appId);
    setSyncingSingle(null);
    setActiveNotice(`Successfully synchronized ${appName} with NexusCRM.`);
    setTimeout(() => setActiveNotice(null), 4000);
  };

  const handleSyncAllClick = async () => {
    await onSyncAll();
    setActiveNotice(t.ecosystem.syncSuccessNotice);
    setTimeout(() => setActiveNotice(null), 4000);
  };

  const getAppIcon = (id: string) => {
    switch (id) {
      case 'rosterSync':
        return <CalendarClock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'talentPulse':
        return <Users2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'kopilot':
        return <Kanban className="w-6 h-6 text-sky-600 dark:text-sky-400" />;
      case 'boekhoudGemak':
        return <Receipt className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      default:
        return <Database className="w-6 h-6 text-slate-600 dark:text-slate-400" />;
    }
  };

  // Aggregated ecosystem data
  const totalRosteredShifts = accounts.reduce((acc, a) => acc + a.ecosystem.rosterSync.activeShifts, 0);
  const totalKopilotProjects = accounts.reduce((acc, a) => acc + a.ecosystem.kopilot.activeProjects, 0);
  const totalInvoicedARR = accounts.reduce((acc, a) => acc + a.ecosystem.boekhoudGemak.annualContractValue, 0);

  return (
    <div className="space-y-6">
      {/* Toast Notice */}
      {activeNotice && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{activeNotice}</span>
          </div>
          <button 
            onClick={() => setActiveNotice(null)}
            className="text-emerald-700 dark:text-emerald-400 font-semibold text-xs ml-4"
          >
            {t.common.close}
          </button>
        </div>
      )}

      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>{t.ecosystem.title}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t.ecosystem.subtitle}
          </p>
        </div>

        <button
          onClick={handleSyncAllClick}
          disabled={isSyncing}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? t.ecosystem.syncing : t.ecosystem.syncAll}</span>
        </button>
      </div>

      {/* Ecosystem Architecture & Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {apps.map((app) => {
          const appMeta = t.ecosystem.apps[app.id as keyof typeof t.ecosystem.apps];
          const isCurSyncing = syncingSingle === app.id || isSyncing;

          return (
            <div
              key={app.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-indigo-200 dark:hover:border-indigo-800 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                      {getAppIcon(app.id)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {app.name}
                        </h3>
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Connected</span>
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {appMeta?.category || app.category}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 tabular-nums">
                    v2.4 API
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3.5 leading-relaxed">
                  {appMeta?.desc}
                </p>

                {/* Specific Live Stat for each of the 4 apps */}
                <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-[11px] text-slate-400">Synchronized Items</div>
                    <div className="font-bold text-slate-900 dark:text-white font-mono tabular-nums text-sm mt-0.5">
                      {app.recordsSynced} records
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">{t.ecosystem.lastSynchronized}</div>
                    <div className="font-medium text-slate-700 dark:text-slate-300 font-mono text-xs mt-0.5">
                      {app.lastSyncTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => handleSync(app.id, app.name)}
                  disabled={isCurSyncing}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-lg transition-colors border border-indigo-200 dark:border-indigo-800/50 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isCurSyncing ? 'animate-spin' : ''}`} />
                  <span>{isCurSyncing ? t.ecosystem.syncing : 'Sync App Data'}</span>
                </button>

                <button
                  onClick={() => {
                    alert(`Navigating to ${app.name} external console at ${app.url}`);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <span>{t.ecosystem.openApp}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Cross-App Aggregates Bar */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Cross-App Interoperability Metrics
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-950/50 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">RosterSync Shifts Scheduled</span>
            <div className="text-lg font-bold font-mono text-indigo-600 dark:text-indigo-400 tabular-nums mt-1">
              {totalRosteredShifts} active shifts
            </div>
            <span className="text-[11px] text-slate-500">Across 5 enterprise accounts</span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-950/50 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Kopilot Delivery Projects</span>
            <div className="text-lg font-bold font-mono text-sky-600 dark:text-sky-400 tabular-nums mt-1">
              {totalKopilotProjects} active client projects
            </div>
            <span className="text-[11px] text-slate-500">All milestones on schedule</span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-950/50 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">BoekhoudGemak Linked ARR</span>
            <div className="text-lg font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums mt-1">
              {formatCurrency(totalInvoicedARR)}
            </div>
            <span className="text-[11px] text-slate-500">Synchronized VAT invoices</span>
          </div>
        </div>
      </div>

      {/* Live Ecosystem Event Audit Stream */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PulseIcon className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {t.ecosystem.recentAuditLogs}
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Real-time Stream</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {activities.map((act) => (
            <div key={act.id} className="py-2.5 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{act.title}</span>
                  {act.sourceApp && (
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {act.sourceApp}
                    </span>
                  )}
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  {act.description}
                </p>
                <div className="text-[11px] text-slate-400">
                  Target Account: <span className="font-medium text-slate-700 dark:text-slate-300">{act.accountName}</span> · Executed by {act.performedBy}
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono shrink-0">
                {act.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
