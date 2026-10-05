import React from 'react';
import { X, ShieldCheck, HeartHandshake, Lock, Scale, Users, CheckCircle } from 'lucide-react';
import { Translations, Language } from '../i18n/translations';

interface EthicalCharterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptCharter?: () => void;
  t: Translations;
  lang: Language;
}

export const EthicalCharterModal: React.FC<EthicalCharterModalProps> = ({
  isOpen,
  onClose,
  onAcceptCharter,
  t,
  lang
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div className="relative w-full max-w-2xl bg-[#160e13] border border-[#d4af37]/35 rounded-3xl shadow-2xl shadow-black overflow-hidden my-6 text-left rtl:text-right">
        
        {/* Header */}
        <div className="p-6 border-b border-[#d4af37]/20 bg-[#1f121b] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#fff8f0]">
                {t.charterTitle}
              </h2>
              <p className="text-xs text-[#d6c4c9]">
                {t.charterSubtitle}
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
        <div className="p-6 max-h-[72vh] overflow-y-auto space-y-5 text-xs sm:text-sm text-[#d6c4c9] leading-relaxed">
          
          {/* Dedication Banner for Moroccans and Moroccans of the World */}
          <div className="p-3.5 rounded-2xl bg-[#251420] border border-[#d4af37]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-base">🇲🇦</span>
              <span className="text-xs font-serif font-bold text-[#fce0a2]">
                {lang === 'ar' ? 'منصة موجهة حصرياً للمغاربة في العالم وداخل الوطن' : 'Plateforme dédiée exclusivement aux Marocains & Marocains du Monde (MRE)'}
              </span>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#f472b6]/20 text-[#fde2e4] border border-[#f472b6]/30 self-start sm:self-auto font-medium">
              {lang === 'ar' ? 'خاص بالمغاربة في العالم' : 'Pour les Marocains du Monde'}
            </span>
          </div>

          {/* Preamble */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#281521] to-[#1c0f18] border border-[#d4af37]/20 italic text-[#fce0a2] font-serif text-center text-sm sm:text-base">
            {t.charterPreamble}
          </div>

          {/* 1. Intention */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#20121a] border border-[#d4af37]/15">
            <div className="w-8 h-8 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-[#f8ede8] text-sm">
                {t.charterPillar1Title}
              </h3>
              <p className="mt-1 text-xs text-[#b8a4aa]">
                {t.charterPillar1Desc}
              </p>
            </div>
          </div>

          {/* 2. Respect & Courtoisie */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#20121a] border border-[#d4af37]/15">
            <div className="w-8 h-8 rounded-xl bg-[#f472b6]/15 border border-[#f472b6]/30 flex items-center justify-center text-[#f472b6] shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-[#f8ede8] text-sm">
                {t.charterPillar2Title}
              </h3>
              <p className="mt-1 text-xs text-[#b8a4aa]">
                {t.charterPillar2Desc}
              </p>
            </div>
          </div>

          {/* 3. Confidentialité & Mode Pudeur */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#20121a] border border-[#d4af37]/15">
            <div className="w-8 h-8 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-[#f8ede8] text-sm">
                {t.charterPillar3Title}
              </h3>
              <p className="mt-1 text-xs text-[#b8a4aa]">
                {t.charterPillar3Desc}
              </p>
            </div>
          </div>

          {/* 4. Implication des Familles */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#20121a] border border-[#d4af37]/15">
            <div className="w-8 h-8 rounded-xl bg-[#38bdf8]/15 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8] shrink-0 mt-0.5">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-[#f8ede8] text-sm">
                {t.charterPillar4Title}
              </h3>
              <p className="mt-1 text-xs text-[#b8a4aa]">
                {t.charterPillar4Desc}
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#d4af37]/20 bg-[#1c1119] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#a89098] flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{t.charterSolemnCommitment}</span>
          </span>

          <button
            onClick={() => {
              if (onAcceptCharter) onAcceptCharter();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#fce0a2] via-[#d4af37] to-[#b38728] text-xs font-semibold text-[#160d13] shadow-md shadow-[#d4af37]/20 cursor-pointer"
          >
            {t.charterAdhereBtn}
          </button>
        </div>

      </div>

    </div>
  );
};
