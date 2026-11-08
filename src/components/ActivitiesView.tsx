import React, { useState } from 'react';
import { useTranslation } from '../context/I18nContext';
import { Activity, ActivityType } from '../types/crm';
import { 
  PhoneCall, 
  Users, 
  Mail, 
  RefreshCw, 
  TrendingUp, 
  Plus, 
  Calendar,
  Building2
} from 'lucide-react';

interface ActivitiesViewProps {
  activities: Activity[];
  onOpenNewActivityModal: () => void;
}

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({
  activities,
  onOpenNewActivityModal,
}) => {
  const { t } = useTranslation();
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = filterType === 'all'
    ? activities
    : activities.filter((a) => a.type === filterType);

  const getTypeIcon = (type: ActivityType) => {
    switch (type) {
      case 'call':
        return <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'meeting':
        return <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case 'email':
        return <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case 'sync':
        return <RefreshCw className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'deal_update':
        return <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.activities.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t.activities.subtitle}
          </p>
        </div>

        <button
          onClick={onOpenNewActivityModal}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t.activities.logActivity}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
        <span className="text-slate-400 shrink-0">{t.common.filter}:</span>
        {(['all', 'call', 'meeting', 'email', 'sync', 'deal_update'] as const).map((ft) => (
          <button
            key={ft}
            onClick={() => setFilterType(ft)}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap capitalize transition-colors ${
              filterType === ft
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {ft === 'all' ? t.common.all : t.activities.types[ft]}
          </button>
        ))}
      </div>

      {/* Activity Timeline Stream */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-6">
        {filtered.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            {t.activities.empty}
          </div>
        ) : (
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {filtered.map((activity) => (
              <div key={activity.id} className="relative flex items-start gap-4 group">
                <div className="absolute -left-6 mt-1 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0 group-hover:border-indigo-500 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                </div>

                <div className="flex-1 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        {getTypeIcon(activity.type)}
                      </span>
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {activity.title}
                      </h4>
                      {activity.sourceApp && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {activity.sourceApp}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {activity.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activity.description}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      <span className="font-medium text-slate-700 dark:text-slate-300">{activity.accountName}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Logged by: <strong className="text-slate-600 dark:text-slate-400">{activity.performedBy}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
