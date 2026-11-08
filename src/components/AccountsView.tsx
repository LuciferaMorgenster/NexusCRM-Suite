import React, { useState } from 'react';
import { useTranslation } from '../context/I18nContext';
import { Account, AccountStatus } from '../types/crm';
import { 
  Building2, 
  Search, 
  Plus, 
  ExternalLink, 
  CalendarClock, 
  Users2, 
  Kanban, 
  Receipt,
  Globe,
  Phone,
  CheckCircle2,
  AlertCircle,
  Clock,
  X
} from 'lucide-react';

interface AccountsViewProps {
  accounts: Account[];
  onOpenNewAccountModal: () => void;
  onOpenAppSwitcher: () => void;
}

export const AccountsView: React.FC<AccountsViewProps> = ({
  accounts,
  onOpenNewAccountModal,
  onOpenAppSwitcher,
}) => {
  const { t, formatCurrency } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const filteredAccounts = accounts.filter((acc) => {
    const matchesSearch = 
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || acc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: AccountStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            <span>{t.accounts.statuses.active}</span>
          </span>
        );
      case 'churn_risk':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
            <AlertCircle className="w-3 h-3" />
            <span>{t.accounts.statuses.churn_risk}</span>
          </span>
        );
      case 'onboarding':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
            <Clock className="w-3 h-3" />
            <span>{t.accounts.statuses.onboarding}</span>
          </span>
        );
      case 'prospect':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
            <span>{t.accounts.statuses.prospect}</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.accounts.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t.accounts.subtitle}
          </p>
        </div>

        <button
          onClick={onOpenNewAccountModal}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t.accounts.addAccount}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.accounts.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-white placeholder-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 shrink-0">{t.common.filter}:</span>
          {(['all', 'active', 'onboarding', 'churn_risk'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap capitalize transition-colors ${
                statusFilter === st
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {st === 'all' ? t.common.all : t.accounts.statuses[st]}
            </button>
          ))}
        </div>
      </div>

      {/* Accounts High-Density Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-500 dark:text-slate-400">
              <th className="py-3 px-4 font-semibold">{t.accounts.companyName}</th>
              <th className="py-3 px-4 font-semibold">{t.accounts.industry}</th>
              <th className="py-3 px-4 font-semibold">{t.accounts.tier}</th>
              <th className="py-3 px-4 font-semibold text-right">{t.accounts.healthScore}</th>
              <th className="py-3 px-4 font-semibold text-right">{t.accounts.totalValue}</th>
              <th className="py-3 px-4 font-semibold">{t.accounts.status}</th>
              <th className="py-3 px-4 font-semibold">{t.accounts.linkedApps}</th>
              <th className="py-3 px-4 font-semibold text-right">{t.common.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredAccounts.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400 text-xs">
                  No accounts found matching your search.
                </td>
              </tr>
            ) : (
              filteredAccounts.map((account) => (
                <tr
                  key={account.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  onClick={() => setSelectedAccount(account)}
                >
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                        {account.name.charAt(0)}
                      </div>
                      <div>
                        <div>{account.name}</div>
                        <div className="text-[11px] text-slate-400 font-normal">
                          {account.city}, {account.country}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    {account.industry}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-medium">
                      {account.tier}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums">
                    <span
                      className={`font-semibold ${
                        account.healthScore >= 80
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : account.healthScore >= 60
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {account.healthScore}%
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-right text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {formatCurrency(account.totalDealValue)}
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(account.status)}
                  </td>
                  <td className="py-3 px-4">
                    {/* Ecosystem interconnected indicators */}
                    <div className="flex items-center gap-1.5" title="Connected to RosterSync, TalentPulse, Kopilot, BoekhoudGemak">
                      <span className="p-1 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400" title={`RosterSync: ${account.ecosystem.rosterSync.activeShifts} shifts`}>
                        <CalendarClock className="w-3 h-3" />
                      </span>
                      <span className="p-1 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400" title={`TalentPulse: ${account.ecosystem.talentPulse.accountManager}`}>
                        <Users2 className="w-3 h-3" />
                      </span>
                      <span className="p-1 rounded bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400" title={`Kopilot: ${account.ecosystem.kopilot.activeProjects} active projects`}>
                        <Kanban className="w-3 h-3" />
                      </span>
                      <span className="p-1 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400" title={`BoekhoudGemak: ${account.ecosystem.boekhoudGemak.paymentStatus}`}>
                        <Receipt className="w-3 h-3" />
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAccount(account);
                      }}
                      className="px-2.5 py-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                    >
                      {t.accounts.details}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Account 360° Ecosystem Drawer / Modal */}
      {selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                  {selectedAccount.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {selectedAccount.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{selectedAccount.city}, {selectedAccount.country}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedAccount.industry}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedAccount(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Quick stats row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] text-slate-400">Total Value</div>
                  <div className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {formatCurrency(selectedAccount.totalDealValue)}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] text-slate-400">Health Score</div>
                  <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {selectedAccount.healthScore}%
                  </div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] text-slate-400">Status</div>
                  <div className="text-xs font-semibold capitalize mt-1">
                    {getStatusBadge(selectedAccount.status)}
                  </div>
                </div>
              </div>

              {/* 4 Connected Apps Synchronized Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Connected Ecosystem Intelligence
                </h4>

                {/* 1. RosterSync Pro */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                      <CalendarClock className="w-4 h-4" />
                      <span>RosterSync Pro</span>
                    </span>
                    <span className="text-[11px] text-emerald-600 font-mono">Synced</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 grid grid-cols-2 gap-2 pt-1">
                    <div>Active shifts: <span className="font-semibold">{selectedAccount.ecosystem.rosterSync.activeShifts} shifts</span></div>
                    <div>Team: <span className="font-medium">{selectedAccount.ecosystem.rosterSync.assignedTeam}</span></div>
                    <div>Next service: <span className="font-mono text-[11px]">{selectedAccount.ecosystem.rosterSync.nextServiceDate}</span></div>
                  </div>
                </div>

                {/* 2. TalentPulse HRIS */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <Users2 className="w-4 h-4" />
                      <span>TalentPulse HRIS</span>
                    </span>
                    <span className="text-[11px] text-emerald-600 font-mono">Active Lead Assigned</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 grid grid-cols-2 gap-2 pt-1">
                    <div>Lead Rep: <span className="font-semibold">{selectedAccount.ecosystem.talentPulse.accountManager}</span></div>
                    <div>Staff Engineer: <span className="font-medium">{selectedAccount.ecosystem.talentPulse.dedicatedEngineer}</span></div>
                    <div>Rep Email: <span className="font-mono text-[11px]">{selectedAccount.ecosystem.talentPulse.repEmail}</span></div>
                  </div>
                </div>

                {/* 3. Kopilot Projects */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-sky-50/30 dark:bg-sky-950/20 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
                      <Kanban className="w-4 h-4" />
                      <span>Kopilot Projects</span>
                    </span>
                    <span className="text-[11px] text-sky-600 font-mono">{selectedAccount.ecosystem.kopilot.completionRate}% Done</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 pt-1">
                    <div>Active projects: <span className="font-semibold">{selectedAccount.ecosystem.kopilot.activeProjects}</span></div>
                    <div>Current sprint: <span className="font-mono text-[11px]">{selectedAccount.ecosystem.kopilot.currentSprint}</span></div>
                    <div>Next Milestone: <span className="font-medium text-slate-800 dark:text-slate-200">{selectedAccount.ecosystem.kopilot.nextMilestone}</span></div>
                  </div>
                </div>

                {/* 4. BoekhoudGemak */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-amber-50/30 dark:bg-amber-950/20 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                      <Receipt className="w-4 h-4" />
                      <span>BoekhoudGemak</span>
                    </span>
                    <span className="text-[11px] text-amber-600 font-semibold uppercase">{selectedAccount.ecosystem.boekhoudGemak.paymentStatus}</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 grid grid-cols-2 gap-2 pt-1">
                    <div>Annual Invoiced: <span className="font-mono font-bold text-amber-700 dark:text-amber-300 tabular-nums">{formatCurrency(selectedAccount.ecosystem.boekhoudGemak.annualContractValue)}</span></div>
                    <div>VAT Number: <span className="font-mono text-[11px]">{selectedAccount.ecosystem.boekhoudGemak.vatNumber}</span></div>
                    <div>Open Invoices: <span className="font-semibold">{selectedAccount.ecosystem.boekhoudGemak.openInvoicesCount}</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={onOpenAppSwitcher}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Open Ecosystem Hub
              </button>
              <button
                onClick={() => setSelectedAccount(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {t.common.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
