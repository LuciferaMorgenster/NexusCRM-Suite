import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types/crm';
import { translations, TranslationDictionary } from '../i18n/translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  formatCurrency: (amount: number, currency?: string) => string;
  formatNumber: (val: number) => string;
  formatDate: (dateString: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LOCALE_MAP: Record<Language, string> = {
  en: 'en-US',
  nl: 'nl-NL',
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
};

const OG_LOCALE_MAP: Record<Language, string> = {
  en: 'en_US',
  nl: 'nl_NL',
  fr: 'fr_FR',
  de: 'de_DE',
  es: 'es_ES',
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('nexuscrm_lang') as Language;
      if (saved && ['en', 'nl', 'fr', 'de', 'es'].includes(saved)) {
        return saved;
      }
    } catch (e) {}
    return 'en'; // Default language is English as required
  });

  const t = translations[language] || translations.en;

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('nexuscrm_lang', lang);
    } catch (e) {}
  };

  // Synchronize document SEO tags dynamically with current language
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.seo.pageTitle;

    const setMetaContent = (selector: string, content: string) => {
      let el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    setMetaContent('meta[name="description"]', t.seo.metaDescription);
    setMetaContent('meta[property="og:title"]', t.seo.ogTitle);
    setMetaContent('meta[property="og:description"]', t.seo.ogDescription);
    setMetaContent('meta[property="og:locale"]', OG_LOCALE_MAP[language]);
    setMetaContent('meta[name="twitter:title"]', t.seo.ogTitle);
    setMetaContent('meta[name="twitter:description"]', t.seo.ogDescription);
    setMetaContent('meta[name="keywords"]', t.seo.keywords);
  }, [language, t]);

  const locale = LOCALE_MAP[language] || 'en-US';

  const formatCurrency = (amount: number, currency: string = 'EUR'): string => {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch (e) {
      return `€${amount.toLocaleString()}`;
    }
  };

  const formatNumber = (val: number): string => {
    return new Intl.NumberFormat(locale).format(val);
  };

  const formatDate = (dateString: string): string => {
    try {
      const d = new Date(dateString);
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(d);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, formatCurrency, formatNumber, formatDate }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
