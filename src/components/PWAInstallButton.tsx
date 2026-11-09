import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useTranslation } from '../context/I18nContext';
import { Download, Share, X, CheckCircle2, Smartphone } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { t, language } = useTranslation();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running inside standalone PWA window, suppress install prompt
  if (isInstalled) {
    return null;
  }

  const installLabel = language === 'nl' ? 'Installeer App' :
                       language === 'fr' ? 'Installer l’App' :
                       language === 'de' ? 'App Installieren' :
                       language === 'es' ? 'Instalar App' : 'Install App';

  const iosLabel = language === 'nl' ? 'PWA op iOS' :
                   language === 'fr' ? 'PWA sur iOS' :
                   language === 'de' ? 'PWA auf iOS' :
                   language === 'es' ? 'PWA en iOS' : 'PWA on iOS';

  // Desktop / Android / Chromium flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0"
        title="Install NexusCRM Suite as Progressive Web App"
        aria-label={installLabel}
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{installLabel}</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not fired on WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
          title="Install NexusCRM on iOS Safari"
        >
          <Smartphone className="w-3.5 h-3.5 text-indigo-500" />
          <span className="hidden sm:inline">{iosLabel}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                    N
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {language === 'nl' ? 'Installeer op iPhone / iPad' : 'Install on iPhone / iPad'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">1.</span>
                  <span>
                    {language === 'nl' 
                      ? 'Tik onderaan in Safari op de Deel-knop (het vierkantje met pijl omhoog).'
                      : 'Tap the Share button in the Safari bottom toolbar.'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">2.</span>
                  <span>
                    {language === 'nl'
                      ? 'Scrol naar beneden en kies "Zet op beginscherm".'
                      : 'Scroll down and tap "Add to Home Screen".'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">3.</span>
                  <span>
                    {language === 'nl'
                      ? 'Tik rechtsboven op "Voeg toe". NexusCRM Suite start nu als standalone app.'
                      : 'Tap "Add" in the top right. NexusCRM Suite will open as a native app.'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                {t.common.close}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback: Show subtle PWA Ready badge with manual install guide modal if user clicks
  return (
    <button
      onClick={() => {
        alert(
          language === 'nl'
            ? 'NexusCRM Suite is PWA-gereed! U kunt deze app rechtstreeks installeren via de browserbalk (het pictogram met computertje/pijltje in de adresbalk van Chrome, Edge of Safari).'
            : 'NexusCRM Suite is PWA-ready! You can install this app directly from your browser address bar (the install icon in Chrome, Edge, or Safari).'
        );
      }}
      className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
      title="PWA Ready"
    >
      <Download className="w-3.5 h-3.5" />
      <span>PWA</span>
    </button>
  );
};
