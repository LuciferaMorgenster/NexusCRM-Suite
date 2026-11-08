import React, { useState } from 'react';
import { useTranslation } from '../context/I18nContext';
import { Deal, DealStage } from '../types/crm';
import { 
  Plus, 
  ChevronRight, 
  ChevronLeft, 
  Building2, 
  Calendar, 
  Percent, 
  User, 
  LayoutGrid, 
  Table 
} from 'lucide-react';

interface PipelineViewProps {
  deals: Deal[];
  onUpdateDealStage: (dealId: string, newStage: DealStage) => void;
  onOpenNewDealModal: () => void;
}

const STAGES: DealStage[] = [
  'lead',
  'qualified',
  'proposal',
  'negotiation',
  'closed_won',
  'closed_lost',
];

export const PipelineView: React.FC<PipelineViewProps> = ({
  deals,
  onUpdateDealStage,
  onOpenNewDealModal,
}) => {
  const { t, formatCurrency, formatDate } = useTranslation();
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('all');

  const filteredDeals = selectedStageFilter === 'all'
    ? deals
    : deals.filter((d) => d.stage === selectedStageFilter);

  const getStageTotal = (stage: DealStage) => {
    return deals
      .filter((d) => d.stage === stage)
      .reduce((sum, d) => sum + d.amount, 0);
  };

  const getStageCount = (stage: DealStage) => {
    return deals.filter((d) => d.stage === stage).length;
  };

  const advanceStage = (deal: Deal) => {
    const currentIndex = STAGES.indexOf(deal.stage);
    if (currentIndex < STAGES.length - 1) {
      onUpdateDealStage(deal.id, STAGES[currentIndex + 1]);
    }
  };

  const regressStage = (deal: Deal) => {
    const currentIndex = STAGES.indexOf(deal.stage);
    if (currentIndex > 0) {
      onUpdateDealStage(deal.id, STAGES[currentIndex - 1]);
    }
  };

  return (
    <div className="space-y-6">
      {/* View Header with Top Bar Contract Compliance */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.pipeline.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t.pipeline.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Segmented View Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{t.pipeline.kanbanView}</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>{t.pipeline.listView}</span>
            </button>
          </div>

          {/* Add Deal Primary Button */}
          <button
            onClick={onOpenNewDealModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.pipeline.addDeal}</span>
          </button>
        </div>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 shrink-0">{t.common.filter}:</span>
        <button
          onClick={() => setSelectedStageFilter('all')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors ${
            selectedStageFilter === 'all'
              ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          {t.common.all} ({deals.length})
        </button>
        {STAGES.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedStageFilter(s)}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors ${
              selectedStageFilter === s
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t.pipeline.stages[s]} ({getStageCount(s)})
          </button>
        ))}
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
          {STAGES.map((stageKey) => {
            const stageDeals = filteredDeals.filter((d) => d.stage === stageKey);
            const total = getStageTotal(stageKey);

            return (
              <div
                key={stageKey}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-3 space-y-3"
              >
                {/* Column Header */}
                <div className="border-b border-slate-200 dark:border-slate-800 pb-2.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <span className="truncate">{t.pipeline.stages[stageKey]}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{stageDeals.length}</span>
                  </div>
                  <div className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 tabular-nums mt-0.5">
                    {formatCurrency(total)}
                  </div>
                </div>

                {/* Deal Cards */}
                <div className="space-y-2.5 min-h-[140px]">
                  {stageDeals.length === 0 ? (
                    <div className="h-24 flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-[11px] text-slate-400">
                      Empty stage
                    </div>
                  ) : (
                    stageDeals.map((deal) => (
                      <div
                        key={deal.id}
                        className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all space-y-2.5 group"
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <h4 className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-2">
                            {deal.title}
                          </h4>
                          <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 font-mono shrink-0 tabular-nums">
                            {formatCurrency(deal.amount)}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
                          <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{deal.accountName}</span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                          <span className="flex items-center gap-1">
                            <Percent className="w-3 h-3" />
                            <span>{deal.probability}%</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(deal.expectedCloseDate)}</span>
                          </span>
                        </div>

                        {/* Stage progression controls */}
                        <div className="flex items-center justify-between pt-1 opacity-70 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => regressStage(deal)}
                            disabled={STAGES.indexOf(deal.stage) === 0}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-20"
                            title={t.pipeline.movePrev}
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[10px] text-slate-400 truncate max-w-[80px]">
                            {deal.owner}
                          </span>
                          <button
                            onClick={() => advanceStage(deal)}
                            disabled={STAGES.indexOf(deal.stage) === STAGES.length - 1}
                            className="p-1 rounded text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-20"
                            title={t.pipeline.moveNext}
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* High-Density Table List View */
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4 font-semibold">Deal Title</th>
                <th className="py-3 px-4 font-semibold">{t.accounts.companyName}</th>
                <th className="py-3 px-4 font-semibold text-right">Value</th>
                <th className="py-3 px-4 font-semibold">Stage</th>
                <th className="py-3 px-4 font-semibold text-right">{t.pipeline.probability}</th>
                <th className="py-3 px-4 font-semibold">{t.pipeline.expectedClose}</th>
                <th className="py-3 px-4 font-semibold">{t.pipeline.owner}</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredDeals.map((deal) => (
                <tr 
                  key={deal.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                    {deal.title}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    {deal.accountName}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-right text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {formatCurrency(deal.amount)}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={deal.stage}
                      onChange={(e) => onUpdateDealStage(deal.id, e.target.value as DealStage)}
                      className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded px-2 py-1 border-0 focus:ring-1 focus:ring-indigo-500"
                    >
                      {STAGES.map((s) => (
                        <option key={s} value={s}>
                          {t.pipeline.stages[s]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4 font-mono text-right tabular-nums text-slate-600 dark:text-slate-400">
                    {deal.probability}%
                  </td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                    {formatDate(deal.expectedCloseDate)}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    {deal.owner}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => regressStage(deal)}
                        disabled={STAGES.indexOf(deal.stage) === 0}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => advanceStage(deal)}
                        disabled={STAGES.indexOf(deal.stage) === STAGES.length - 1}
                        className="p-1 text-slate-400 hover:text-indigo-600 disabled:opacity-20"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
