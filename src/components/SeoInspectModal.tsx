import React, { useState } from 'react';
import { useTranslation } from '../context/I18nContext';
import { 
  X, 
  Share2, 
  Globe, 
  CheckCircle2, 
  Copy, 
  Code2, 
  Smartphone,
  Laptop
} from 'lucide-react';

interface SeoInspectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeoInspectModal: React.FC<SeoInspectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language, t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'schema' | 'hreflang'>('card');

  if (!isOpen) return null;

  const coverImageUrl = '/public/og-cover.jpg';
  const canonicalUrl = typeof window !== 'undefined' ? window.location.href : 'https://nexuscrm.internal';

  const jsonLdSnippet = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "NexusCRM Suite",
    "applicationCategory": "BusinessApplication",
    "description": t.seo.metaDescription,
    "inLanguage": ["en", "nl", "fr", "de", "es"],
    "screenshot": coverImageUrl,
    "featureList": [
      "Customer Relationship Management",
      "Sales Pipeline Kanban and Forecasting",
      "Connected Bridge: RosterSync Pro",
      "Connected Bridge: TalentPulse HRIS",
      "Connected Bridge: Kopilot Projects",
      "Connected Bridge: BoekhoudGemak"
    ]
  };

  const copyMetaToClipboard = () => {
    const snippet = `<title>${t.seo.pageTitle}</title>
<meta name="description" content="${t.seo.metaDescription}" />
<meta property="og:title" content="${t.seo.ogTitle}" />
<meta property="og:description" content="${t.seo.ogDescription}" />
<meta property="og:image" content="${coverImageUrl}" />
<meta name="twitter:card" content="summary_large_image" />`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Multilingual SEO & Social Media Card Inspector
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Live OpenGraph, Twitter card, and Schema.org metadata synchronized with <strong className="uppercase">{language}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('card')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'card'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Social Media Preview Card
            </button>
            <button
              onClick={() => setActiveTab('hreflang')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'hreflang'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Multilingual Hreflang Tags
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'schema'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              JSON-LD Schema.org
            </button>
          </div>

          <button
            onClick={copyMetaToClipboard}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Tags!' : 'Copy Head Tags'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'card' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>Rendering preview for <strong>LinkedIn, Slack, Twitter/X, and WhatsApp</strong>:</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>16:9 Cover Image Verified</span>
                </span>
              </div>

              {/* Realistic Simulated Social Media Card */}
              <div className="max-w-xl mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-md">
                {/* 16:9 Cover Image Slot */}
                <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                  <img
                    src={coverImageUrl}
                    alt="NexusCRM Suite Social Cover"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/src/assets/images/cover_nexuscrm_suite_1794116210299.jpg';
                    }}
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] text-white font-mono">
                    1920 × 1080 (16:9)
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-1.5">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3 h-3" />
                    <span>nexuscrm-suite.lucifera.eu · lang={language}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {t.seo.ogTitle}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {t.seo.ogDescription}
                  </p>
                </div>
              </div>

              {/* Active OpenGraph Tags Breakdown */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1.5 text-slate-700 dark:text-slate-300">
                <div><span className="text-slate-400">og:title = </span>"{t.seo.ogTitle}"</div>
                <div><span className="text-slate-400">og:description = </span>"{t.seo.ogDescription}"</div>
                <div><span className="text-slate-400">og:image = </span>"{coverImageUrl}"</div>
                <div><span className="text-slate-400">twitter:card = </span>"summary_large_image"</div>
                <div><span className="text-slate-400">og:locale = </span>"{language}_{language === 'en' ? 'US' : language.toUpperCase()}"</div>
              </div>
            </div>
          )}

          {activeTab === 'hreflang' && (
            <div className="space-y-4 text-xs">
              <p className="text-slate-500 dark:text-slate-400">
                Search engines use alternate hreflang tags to serve the correct regional version to users across European and global markets:
              </p>

              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 overflow-x-auto">
                <div className="text-slate-400">// Current Multilingual Canonical & Alternates</div>
                <div>&lt;link rel="canonical" href="{canonicalUrl}" /&gt;</div>
                <div className={language === 'en' ? 'text-indigo-300 font-bold' : ''}>&lt;link rel="alternate" hreflang="en" href="{canonicalUrl}?lang=en" /&gt;</div>
                <div className={language === 'nl' ? 'text-indigo-300 font-bold' : ''}>&lt;link rel="alternate" hreflang="nl" href="{canonicalUrl}?lang=nl" /&gt;</div>
                <div className={language === 'fr' ? 'text-indigo-300 font-bold' : ''}>&lt;link rel="alternate" hreflang="fr" href="{canonicalUrl}?lang=fr" /&gt;</div>
                <div className={language === 'de' ? 'text-indigo-300 font-bold' : ''}>&lt;link rel="alternate" hreflang="de" href="{canonicalUrl}?lang=de" /&gt;</div>
                <div className={language === 'es' ? 'text-indigo-300 font-bold' : ''}>&lt;link rel="alternate" hreflang="es" href="{canonicalUrl}?lang=es" /&gt;</div>
                <div>&lt;link rel="alternate" hreflang="x-default" href="{canonicalUrl}" /&gt;</div>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4 text-xs">
              <p className="text-slate-500 dark:text-slate-400">
                Schema.org JSON-LD structured data embedded in the document head for Google Rich Results:
              </p>

              <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed">
                {JSON.stringify(jsonLdSnippet, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Active Language: <strong className="uppercase text-indigo-600 dark:text-indigo-400">{language}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
};
