import React, { useState } from 'react';
import { useTranslation } from '../context/I18nContext';
import { ConnectedApp } from '../types/crm';
import { 
  X, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle2, 
  CalendarClock, 
  Users2, 
  Kanban, 
  Receipt,
  ArrowRight,
  Database
} from 'lucide-react';

interface AppSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  apps: ConnectedApp[];
  onSyncApp: (appId: string) => Promise<void>;
  onSyncAll: () => Promise<void>;
  isSyncing: boolean;
  onSelectAppDetail?: (app: ConnectedApp) => void;
}

export const AppSwitcherModal: React.FC<AppSwitcherModalProps> = ({
  isOpen,
  onClose,
  apps,
  onSyncApp,
  onSyncAll,
  isSyncing,
}) => {
  const { t } = useTranslation();
  const [activeAppModal, setActiveAppModal] = useState<ConnectedApp | null>(null);
  const [syncingSingle, setSyncingSingle] = useState<string | null>(null);

  if (!isOpen) return null;

  const getAppIcon = (id: string) => {
    switch (id) {
      case 'rosterSync':
        return <CalendarClock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'talentPulse':
        return <Users2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'kopilot':
        return <Kanban className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      case 'boekhoudGemak':
        return <Receipt className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      default:
        return <Database className="w-5 h-5 text-slate-600 dark:text-slate-400" />;
    }
  };

  const handleSyncSingle = async (appId: string) => {
    setSyncingSingle(appId);
    await onSyncApp(appId);
    setSyncingSingle(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="app-switcher-title"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 id="app-switcher-title" className="text-base font-bold text-slate-900 dark:text-white">
                {t.ecosystem.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.ecosystem.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors"
            aria-label={t.common.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">4 / 4</span>
            <span>{t.ecosystem.statusConnected}</span>
          </div>

          <button
            onClick={onSyncAll}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800/60 rounded-lg transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? t.ecosystem.syncing : t.ecosystem.syncAll}</span>
          </button>
        </div>

        {/* Connected Apps Grid */}
        <div className="p-6 overflow-y-auto space-y-3.5">
          {apps.map((app) => {
            const appData = t.ecosystem.apps[app.id as keyof typeof t.ecosystem.apps];
            const isCurrentlySyncing = syncingSingle === app.id || isSyncing;

            return (
              <div
                key={app.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    {getAppIcon(app.id)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {app.name}
                      </h3>
                      <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Connected</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {appData?.desc || app.category}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 dark:text-slate-500 mt-2">
                      <span>{app.recordsSynced} {t.ecosystem.recordsLinked}</span>
                      <span aria-hidden="true">·</span>
                      <span>{t.ecosystem.lastSynchronized}: {app.lastSyncTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => handleSyncSingle(app.id)}
                    disabled={isCurrentlySyncing}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-800 disabled:opacity-50"
                    title={t.ecosystem.syncAll}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isCurrentlySyncing ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={() => setActiveAppModal(app)}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <span>{t.ecosystem.openApp}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>NexusCRM Multi-App Bridge v2.4</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {t.common.close}
          </button>
        </div>
      </div>

      {/* Single App Quick Launch Simulation Preview */}
      {activeAppModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {getAppIcon(activeAppModal.id)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {activeAppModal.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeAppModal.category}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveAppModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs space-y-2 text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Connection Endpoint:</span>
                <span className="font-mono">{activeAppModal.url}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Authenticated & Bi-directional</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Linked Entities:</span>
                <span className="font-semibold">{activeAppModal.recordsSynced} client items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Auth Token:</span>
                <span className="font-mono text-[10px]">bearer_nexus_sync_oauth_ok</span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Seamlessly opens {activeAppModal.name} with synchronized client context and active session credentials.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setActiveAppModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                {t.common.close}
              </button>
              <button
                onClick={() => {
                  alert(`Navigating to ${activeAppModal.name} with connected NexusCRM session.`);
                  setActiveAppModal(null);
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                <span>Launch {activeAppModal.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
