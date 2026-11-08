import React from 'react';
import { useTranslation } from '../context/I18nContext';
import { 
  TrendingUp, 
  Building2, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw 
} from 'lucide-react';

interface CoverHeroBannerProps {
  totalPipelineValue: number;
  activeAccountsCount: number;
  winRate: number;
  openDealsCount: number;
  onExplorePipeline: () => void;
  onOpenEcosystem: () => void;
  onQuickSync: () => void;
  isSyncing: boolean;
}

export const CoverHeroBanner: React.FC<CoverHeroBannerProps> = ({
  totalPipelineValue,
  activeAccountsCount,
  winRate,
  openDealsCount,
  onExplorePipeline,
  onOpenEcosystem,
  onQuickSync,
  isSyncing,
}) => {
  const { t, formatCurrency, formatNumber } = useTranslation();

  return (
    <div className="relative mb-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors">
      {/* Visual Cover Banner with measured overlay scrim */}
      <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-slate-950">
        <img
          src="/public/og-cover.jpg"
          alt="NexusCRM Suite Multilingual Dashboard and Connected Ecosystem"
          className="w-full h-full object-cover object-center opacity-85 hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback to source asset path if public static path needs direct asset url
            (e.target as HTMLImageElement).src = '/src/assets/images/cover_nexuscrm_suite_1794116210299.jpg';
          }}
        />
        {/* Measured scrim to guarantee 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent" />

        {/* Content on Cover */}
        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>{t.hero.badge}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">RosterSync · TalentPulse · Kopilot · BoekhoudGemak</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {t.hero.headline}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl line-clamp-2 sm:line-clamp-none font-normal">
              {t.hero.subheadline}
            </p>
          </div>

          {/* Action buttons directly on banner */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={onExplorePipeline}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
            >
              <span>{t.hero.viewPipeline}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenEcosystem}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white/90 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg transition-colors border border-white/20"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t.hero.exploreEcosystem}</span>
            </button>

            <button
              onClick={onQuickSync}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors ml-auto disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isSyncing ? t.ecosystem.syncing : t.hero.quickSync}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI 4-Column Bar below the hero */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
            <span>{t.stats.totalPipeline}</span>
          </div>
          <div className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            {formatCurrency(totalPipelineValue)}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {openDealsCount} {t.pipeline.dealsCount}
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Building2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t.stats.activeAccounts}</span>
          </div>
          <div className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            {formatNumber(activeAccountsCount)}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            100% synchronized
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
            <span>{t.stats.winRate}</span>
          </div>
          <div className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            {winRate}%
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Weighted probability
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.stats.ecosystemSyncRate}</span>
          </div>
          <div className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            4 / 4 Apps
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            Active bi-directional
          </div>
        </div>
      </div>
    </div>
  );
};
