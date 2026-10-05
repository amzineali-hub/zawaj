import React, { useState } from 'react';
import { X, Check, Sparkles, Lock, ArrowRight, HeartHandshake } from 'lucide-react';
import { PioneerStats } from '../types';
import { Translations, Language } from '../i18n/translations';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PioneerStats;
  onStartRegistration: () => void;
  t: Translations;
  lang: Language;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  stats,
  onStartRegistration,
  t,
  lang
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'pioneer' | 'standard'>('pioneer');

  if (!isOpen) return null;

  const menRemaining = Math.max(0, stats.menMax - stats.menRegistered);
  const womenRemaining = Math.max(0, stats.womenMax - stats.womenRegistered);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div className="relative w-full max-w-2xl bg-[#160e13] border border-[#d4af37]/35 rounded-3xl shadow-2xl shadow-black overflow-hidden my-6 text-left rtl:text-right">
        
        {/* Header */}
        <div className="p-6 border-b border-[#d4af37]/20 bg-[#1f121b] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#fff8f0]">
                {t.subscriptionsTitle}
              </h2>
              <p className="text-xs text-[#d6c4c9]">
                {t.subscriptionsSubtitle}
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
          
          {/* Two Plan Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Plan 1: Pionnier (0 DH) */}
            <div 
              onClick={() => setSelectedPlan('pioneer')}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                selectedPlan === 'pioneer'
                  ? 'border-[#d4af37] bg-[#24151f] shadow-lg shadow-[#d4af37]/10'
                  : 'border-[#d4af37]/20 bg-[#190f16] opacity-80 hover:opacity-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-serif text-[#d4af37] mb-2">
                  <span className="uppercase tracking-wider font-semibold">{t.pioneerPlanTitle}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#d4af37]/20 text-[#fce0a2] text-[10px]">
                    {t.limitedSpots}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 my-2">
                  <span className="text-3xl font-serif font-bold text-[#fff8f0]">0 DH</span>
                  <span className="text-xs text-[#a89098]">{t.pioneerPerYearForever}</span>
                </div>

                <p className="text-xs text-[#d6c4c9] mb-4 leading-relaxed">
                  {t.pioneerPlanDesc}
                </p>

                <div className="space-y-2 text-xs text-[#f8ede8]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>{t.pioneerFeature1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>{t.pioneerFeature2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>{t.pioneerFeature3}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>{t.pioneerFeature4}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#d4af37]/20 text-[11px] text-[#fce0a2] font-mono">
                {menRemaining} H · {womenRemaining} F
              </div>
            </div>

            {/* Plan 2: Adhésion Standard (100 DH / an) */}
            <div 
              onClick={() => setSelectedPlan('standard')}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                selectedPlan === 'standard'
                  ? 'border-[#f472b6] bg-[#24151f] shadow-lg shadow-[#f472b6]/10'
                  : 'border-[#d4af37]/20 bg-[#190f16] opacity-80 hover:opacity-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-serif text-[#f472b6] mb-2">
                  <span className="uppercase tracking-wider font-semibold">{t.standardPlanTitle}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#f472b6]/20 text-[#fde2e4] text-[10px]">
                    {t.postPioneerBadge}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 my-2">
                  <span className="text-3xl font-serif font-bold text-[#fff8f0]">100 DH</span>
                  <span className="text-xs text-[#a89098]">{t.perYear}</span>
                </div>

                <p className="text-xs text-[#d6c4c9] mb-4 leading-relaxed">
                  {t.standardPlanDesc}
                </p>

                <div className="space-y-2 text-xs text-[#f8ede8]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#f472b6] shrink-0" />
                    <span>{t.standardFeature1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#f472b6] shrink-0" />
                    <span>{t.standardFeature2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#f472b6] shrink-0" />
                    <span>{t.standardFeature3}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#f472b6] shrink-0" />
                    <span>{t.standardFeature4}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#d4af37]/20 text-[11px] text-[#d6c4c9]">
                {t.securePaymentLabel}
              </div>
            </div>

          </div>

          {/* Serious intent explanation */}
          <div className="p-4 rounded-2xl bg-[#1e121a] border border-[#d4af37]/20 flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-[#b8a4aa]">
              <strong className="text-[#fce0a2] block mb-0.5">{t.whyFeeQuestion}</strong>
              {t.whyFeeAnswer}
            </div>
          </div>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-[#a89098]">
              <Lock className="w-4 h-4 text-[#d4af37]" />
              <span>{t.securePaymentLabel}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onStartRegistration();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#fce0a2] via-[#d4af37] to-[#b38728] text-xs font-semibold text-[#160d13] shadow-md shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{selectedPlan === 'pioneer' ? t.reservePioneerBtn : t.subscribeStandardBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
