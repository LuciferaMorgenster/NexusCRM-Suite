import React, { useState } from 'react';
import { useTranslation } from '../context/I18nContext';
import { Account, Deal, Contact, Activity, DealStage, AccountStatus, ActivityType } from '../types/crm';
import { X, Plus, TrendingUp, Building2, Users, FileText } from 'lucide-react';

interface NewRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: Account[];
  onAddDeal: (deal: Omit<Deal, 'id' | 'createdAt'>) => void;
  onAddAccount: (account: Omit<Account, 'id' | 'createdAt'>) => void;
  onAddContact: (contact: Omit<Contact, 'id'>) => void;
  onAddActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  defaultTab?: 'deal' | 'account' | 'contact' | 'activity';
}

export const NewRecordModal: React.FC<NewRecordModalProps> = ({
  isOpen,
  onClose,
  accounts,
  onAddDeal,
  onAddAccount,
  onAddContact,
  onAddActivity,
  defaultTab = 'deal',
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'deal' | 'account' | 'contact' | 'activity'>(defaultTab);

  // Form states
  // Deal
  const [dealTitle, setDealTitle] = useState('');
  const [dealAccountId, setDealAccountId] = useState(accounts[0]?.id || '');
  const [dealAmount, setDealAmount] = useState('50000');
  const [dealStage, setDealStage] = useState<DealStage>('qualified');
  const [dealProbability, setDealProbability] = useState('50');
  const [dealOwner, setDealOwner] = useState('Sophie van Dijk');
  const [dealCloseDate, setDealCloseDate] = useState('2026-12-31');

  // Account
  const [accName, setAccName] = useState('');
  const [accIndustry, setAccIndustry] = useState('Technology & Cloud');
  const [accCountry, setAccCountry] = useState('Netherlands');
  const [accCity, setAccCity] = useState('Amsterdam');
  const [accTier, setAccTier] = useState<'Enterprise' | 'Mid-Market' | 'SMB'>('Enterprise');
  const [accPhone, setAccPhone] = useState('+31 20 890 1200');

  // Contact
  const [conName, setConName] = useState('');
  const [conEmail, setConEmail] = useState('');
  const [conPhone, setConPhone] = useState('');
  const [conTitle, setConTitle] = useState('VP Commercial Operations');
  const [conAccountId, setConAccountId] = useState(accounts[0]?.id || '');

  // Activity
  const [actTitle, setActTitle] = useState('');
  const [actType, setActType] = useState<ActivityType>('meeting');
  const [actAccountId, setActAccountId] = useState(accounts[0]?.id || '');
  const [actDesc, setActDesc] = useState('');
  const [actPerformer, setActPerformer] = useState('Sophie van Dijk');

  if (!isOpen) return null;

  const handleSubmitDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealTitle) return;
    const account = accounts.find((a) => a.id === dealAccountId) || accounts[0];
    onAddDeal({
      accountId: account.id,
      accountName: account.name,
      title: dealTitle,
      amount: Number(dealAmount) || 0,
      currency: 'EUR',
      stage: dealStage,
      probability: Number(dealProbability) || 50,
      expectedCloseDate: dealCloseDate,
      owner: dealOwner,
    });
    onClose();
  };

  const handleSubmitAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accName) return;
    onAddAccount({
      name: accName,
      industry: accIndustry,
      country: accCountry,
      city: accCity,
      tier: accTier,
      status: 'active' as AccountStatus,
      healthScore: 85,
      totalDealValue: 0,
      website: `https://${accName.toLowerCase().replace(/\s+/g, '-')}.com`,
      phone: accPhone,
      ecosystem: {
        rosterSync: {
          activeShifts: 6,
          assignedTeam: `${accCity} Operations Unit`,
          nextServiceDate: '2026-11-28',
          status: 'synced',
        },
        talentPulse: {
          accountManager: 'Sophie van Dijk',
          dedicatedEngineer: 'Bram Bakker',
          repEmail: 's.vandijk@company.com',
          talentScore: 90,
        },
        kopilot: {
          activeProjects: 1,
          currentSprint: 'Sprint 1: Kickoff & Scoping',
          completionRate: 15,
          nextMilestone: 'Initial Specification Signoff',
        },
        boekhoudGemak: {
          annualContractValue: 45000,
          currency: 'EUR',
          paymentStatus: 'paid',
          vatNumber: `NL${Math.floor(100000000 + Math.random() * 900000000)}B01`,
          openInvoicesCount: 0,
        },
      },
    });
    onClose();
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conName || !conEmail) return;
    const account = accounts.find((a) => a.id === conAccountId) || accounts[0];
    onAddContact({
      accountId: account.id,
      accountName: account.name,
      name: conName,
      email: conEmail,
      phone: conPhone || '+31 20 555 0100',
      title: conTitle,
      department: 'Commercial',
      isPrimary: false,
      lastContactDate: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  const handleSubmitActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actTitle) return;
    const account = accounts.find((a) => a.id === actAccountId) || accounts[0];
    onAddActivity({
      accountId: account.id,
      accountName: account.name,
      type: actType,
      title: actTitle,
      description: actDesc || 'Logged interaction with client stakeholder.',
      performedBy: actPerformer,
      sourceApp: 'NexusCRM',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {t.modal.createTitle}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-xs">
          <button
            onClick={() => setActiveTab('deal')}
            className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 font-medium border-b-2 transition-colors ${
              activeTab === 'deal'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t.modal.dealTab}</span>
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 font-medium border-b-2 transition-colors ${
              activeTab === 'account'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{t.modal.accountTab}</span>
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 font-medium border-b-2 transition-colors ${
              activeTab === 'contact'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t.modal.contactTab}</span>
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 font-medium border-b-2 transition-colors ${
              activeTab === 'activity'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.modal.activityTab}</span>
          </button>
        </div>

        {/* Tab Forms */}
        <div className="p-6">
          {activeTab === 'deal' && (
            <form onSubmit={handleSubmitDeal} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Deal Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise Cloud License Renewal"
                  value={dealTitle}
                  onChange={(e) => setDealTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Account *</label>
                  <select
                    value={dealAccountId}
                    onChange={(e) => setDealAccountId(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    {accounts.map((a) => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Amount (EUR) *</label>
                  <input
                    type="number"
                    required
                    value={dealAmount}
                    onChange={(e) => setDealAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Pipeline Stage</label>
                  <select
                    value={dealStage}
                    onChange={(e) => setDealStage(e.target.value as DealStage)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="lead">Lead Inbound</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal">Proposal Sent</option>
                    <option value="negotiation">In Negotiation</option>
                    <option value="closed_won">Closed Won</option>
                    <option value="closed_lost">Closed Lost</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Win Probability (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={dealProbability}
                    onChange={(e) => setDealProbability(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Account Owner</label>
                  <input
                    type="text"
                    value={dealOwner}
                    onChange={(e) => setDealOwner(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Expected Close</label>
                  <input
                    type="date"
                    value={dealCloseDate}
                    onChange={(e) => setDealCloseDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  {t.modal.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                >
                  {t.modal.save}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'account' && (
            <form onSubmit={handleSubmitAccount} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Company / Organization Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Global Engineering"
                  value={accName}
                  onChange={(e) => setAccName(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Industry</label>
                  <input
                    type="text"
                    value={accIndustry}
                    onChange={(e) => setAccIndustry(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Tier</label>
                  <select
                    value={accTier}
                    onChange={(e) => setAccTier(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Enterprise">Enterprise</option>
                    <option value="Mid-Market">Mid-Market</option>
                    <option value="SMB">SMB</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">City</label>
                  <input
                    type="text"
                    value={accCity}
                    onChange={(e) => setAccCity(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Country</label>
                  <input
                    type="text"
                    value={accCountry}
                    onChange={(e) => setAccCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-lg border border-indigo-100 dark:border-indigo-900/40 text-[11px] text-indigo-700 dark:text-indigo-300">
                ✨ Automatically provisions connected bridges to RosterSync Pro, TalentPulse HRIS, Kopilot Projects, and BoekhoudGemak.
              </div>

              <div className="flex justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
                >
                  {t.modal.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                >
                  {t.modal.save}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'contact' && (
            <form onSubmit={handleSubmitContact} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maarten de Boer"
                  value={conName}
                  onChange={(e) => setConName(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Company Account *</label>
                  <select
                    value={conAccountId}
                    onChange={(e) => setConAccountId(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    {accounts.map((a) => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Role / Title</label>
                  <input
                    type="text"
                    value={conTitle}
                    onChange={(e) => setConTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="m.deboer@company.com"
                    value={conEmail}
                    onChange={(e) => setConEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="+31 6 12345678"
                    value={conPhone}
                    onChange={(e) => setConPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
                >
                  {t.modal.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                >
                  {t.modal.save}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'activity' && (
            <form onSubmit={handleSubmitActivity} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Activity Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Contract negotiation on terms"
                  value={actTitle}
                  onChange={(e) => setActTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Account *</label>
                  <select
                    value={actAccountId}
                    onChange={(e) => setActAccountId(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    {accounts.map((a) => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Interaction Type</label>
                  <select
                    value={actType}
                    onChange={(e) => setActType(e.target.value as ActivityType)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="meeting">Meeting</option>
                    <option value="call">Call</option>
                    <option value="email">Email</option>
                    <option value="sync">Ecosystem Sync</option>
                    <option value="deal_update">Deal Update</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Notes / Description</label>
                <textarea
                  rows={3}
                  placeholder="Key discussion points, outcomes, or action items..."
                  value={actDesc}
                  onChange={(e) => setActDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
                >
                  {t.modal.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                >
                  {t.modal.save}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
