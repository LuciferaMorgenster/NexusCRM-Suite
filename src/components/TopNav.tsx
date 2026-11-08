import React, { useState } from 'react';
import { useTranslation } from '../context/I18nContext';
import { Language } from '../types/crm';
import { 
  Globe, 
  Layers, 
  Plus, 
  Sun, 
  Moon, 
  Check, 
  Share2, 
  LayoutGrid
} from 'lucide-react';

interface TopNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenNewRecord: () => void;
  onOpenAppSwitcher: () => void;
  onOpenSeoInspector: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenNewRecord,
  onOpenAppSwitcher,
  onOpenSeoInspector,
  isDark,
  onToggleTheme,
}) => {
  const { language, setLanguage, t } = useTranslation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-indigo-700 transition-colors">
              N
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0">
              {t.appName}
            </span>
          </button>
        </div>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              currentTab === 'dashboard'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.nav.dashboard}
          </button>
          <button
            onClick={() => onSelectTab('pipeline')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              currentTab === 'pipeline'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.nav.pipeline}
          </button>
          <button
            onClick={() => onSelectTab('accounts')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              currentTab === 'accounts'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.nav.accounts}
          </button>
          <button
            onClick={() => onSelectTab('contacts')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              currentTab === 'contacts'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.nav.contacts}
          </button>
          <button
            onClick={() => onSelectTab('ecosystem')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              currentTab === 'ecosystem'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.nav.ecosystem}
          </button>
          <button
            onClick={() => onSelectTab('activities')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              currentTab === 'activities'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.nav.activities}
          </button>
        </nav>

        {/* Zone 3: Actions, Language Switcher, App Launcher & Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Ecosystem Apps Launcher Button */}
          <button
            onClick={onOpenAppSwitcher}
            title="Connected Apps (RosterSync, TalentPulse, Kopilot, BoekhoudGemak)"
            aria-label="Connected Apps"
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="sr-only">Apps</span>
          </button>

          {/* SEO & Social Card Preview Inspector */}
          <button
            onClick={onOpenSeoInspector}
            title={t.nav.seoInspector}
            aria-label={t.nav.seoInspector}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="sr-only">{t.nav.seoInspector}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Dark/Light Mode"
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Multilingual Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors uppercase"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>{language}</span>
            </button>

            {langMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {t.common.language}
                  </div>
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </span>
                      {language === l.code && (
                        <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onOpenNewRecord}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.nav.newRecord}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
