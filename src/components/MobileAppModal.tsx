import React, { useState } from 'react';
import { X, Smartphone, Apple, Play, CheckCircle2, Download, ShieldCheck, Sparkles, Share, PlusSquare } from 'lucide-react';
import { Translations, Language } from '../i18n/translations';

interface MobileAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translations;
  lang: Language;
}

export const MobileAppModal: React.FC<MobileAppModalProps> = ({ isOpen, onClose, t, lang }) => {
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios');
  const [installed, setInstalled] = useState(false);

  if (!isOpen) return null;

  const handleInstallSim = () => {
    setInstalled(true);
    setTimeout(() => {
      setInstalled(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div className="relative w-full max-w-xl bg-[#160e13] border border-[#d4af37]/35 rounded-3xl shadow-2xl shadow-black overflow-hidden my-6 text-left rtl:text-right">
        
        {/* Header */}
        <div className="p-6 border-b border-[#d4af37]/20 bg-[#1f121b] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#fff8f0]">
                {t.mobileAppTitle}
              </h2>
              <p className="text-xs text-[#d6c4c9]">
                {t.mobileAppSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/40 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* OS Switcher */}
          <div className="grid grid-cols-2 gap-3 p-1 bg-[#20121a] rounded-2xl border border-[#d4af37]/20">
            <button
              onClick={() => setPlatform('ios')}
              className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                platform === 'ios'
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-[#120a0f] shadow-md'
                  : 'text-[#d6c4c9] hover:text-white'
              }`}
            >
              <Apple className="w-4 h-4" />
              <span>{t.iosTab}</span>
            </button>

            <button
              onClick={() => setPlatform('android')}
              className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                platform === 'android'
                  ? 'bg-gradient-to-r from-[#38bdf8] to-[#0284c7] text-[#081824] shadow-md'
                  : 'text-[#d6c4c9] hover:text-white'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t.androidTab}</span>
            </button>
          </div>

          {/* iOS Guide */}
          {platform === 'ios' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-[#20131b] border border-[#d4af37]/15 space-y-3">
                <h3 className="text-xs font-serif font-semibold text-[#fce0a2] flex items-center gap-2">
                  <Apple className="w-4 h-4 text-[#d4af37]" />
                  <span>{t.iosGuideTitle}</span>
                </h3>

                <div className="space-y-2 text-xs text-[#d6c4c9]">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                      1
                    </span>
                    <p>{t.iosStep1}</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                      2
                    </span>
                    <p className="flex items-center gap-1.5 flex-wrap">
                      {t.iosStep2}
                      <Share className="w-3.5 h-3.5 text-[#fce0a2] inline" />
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                      3
                    </span>
                    <p className="flex items-center gap-1.5 flex-wrap">
                      {t.iosStep3}
                      <PlusSquare className="w-3.5 h-3.5 text-[#fce0a2] inline" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Android Guide */}
          {platform === 'android' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-[#20131b] border border-[#d4af37]/15 space-y-3">
                <h3 className="text-xs font-serif font-semibold text-[#fce0a2] flex items-center gap-2">
                  <Play className="w-4 h-4 fill-[#38bdf8] text-[#38bdf8]" />
                  <span>{t.androidGuideTitle}</span>
                </h3>

                <div className="space-y-2 text-xs text-[#d6c4c9]">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                      1
                    </span>
                    <p>{t.androidStep1}</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                      2
                    </span>
                    <p>{t.androidStep2}</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                      3
                    </span>
                    <p>{t.androidStep3}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* App Advantages */}
          <div className="grid grid-cols-2 gap-3 text-xs text-[#b8a4aa]">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#20121a]">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>{t.appAdvantageNotifications}</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#20121a]">
              <Sparkles className="w-4 h-4 text-[#f472b6]" />
              <span>{t.appAdvantageBiometric}</span>
            </div>
          </div>

          {/* Fast install action */}
          <div className="pt-2">
            <button
              onClick={handleInstallSim}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#fce0a2] via-[#d4af37] to-[#b38728] text-xs font-semibold text-[#160d13] shadow-md shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              {installed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#160d13]" />
                  <span>{t.appInstalledSuccess}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#160d13]" />
                  <span>{t.installAppBtn}</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
