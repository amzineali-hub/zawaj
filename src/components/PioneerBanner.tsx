import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { PioneerStats } from '../types';
import { Translations, Language } from '../i18n/translations';

interface PioneerBannerProps {
  stats: PioneerStats;
  onJoinPioneers: () => void;
  onOpenPricing: () => void;
  t: Translations;
  lang: Language;
}

export const PioneerBanner: React.FC<PioneerBannerProps> = ({
  stats,
  onJoinPioneers,
  onOpenPricing,
  t,
  lang
}) => {
  const menRemaining = Math.max(0, stats.menMax - stats.menRegistered);
  const womenRemaining = Math.max(0, stats.womenMax - stats.womenRegistered);
  const menPercent = Math.min(100, Math.round((stats.menRegistered / stats.menMax) * 100));
  const womenPercent = Math.min(100, Math.round((stats.womenRegistered / stats.womenMax) * 100));

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-gradient-to-r from-[#20121a] via-[#1a0f16] to-[#25151f] p-5 sm:p-7 shadow-xl shadow-black/40">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-1/4 -mt-12 w-64 h-64 rounded-full bg-[#f472b6]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-12 w-64 h-64 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left side: Editorial pledge & title */}
        <div className="max-w-xl text-left rtl:text-right">
          <div className="flex items-center gap-2 text-xs font-serif tracking-wider text-[#d4af37] mb-2 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.pioneerKicker}</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-serif text-[#fff8f0] font-normal leading-snug">
            {t.pioneerTitle} <span className="font-semibold text-gold-gradient">{t.pioneerMenHighlight}</span> {t.pioneerAnd}{' '}
            <span className="font-semibold text-rose-gold">{t.pioneerWomenHighlight}</span>
          </h2>
          
          <p className="mt-2 text-xs sm:text-sm text-[#d6c4c9] leading-relaxed">
            {t.pioneerDesc}
          </p>
        </div>

        {/* Center / Right: Live Quotas Progress */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:gap-6 bg-[#120a0f]/80 p-4 rounded-xl border border-[#d4af37]/20">
          
          {/* Hommes counter */}
          <div className="min-w-[150px]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#f8ede8] font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                {t.pioneerMen}
              </span>
              <span className="font-mono text-[11px] text-[#fce0a2] font-semibold">
                {menRemaining} {t.pioneerSpotsOffered}
              </span>
            </div>
            <div className="w-full bg-[#2a1720] h-2 rounded-full overflow-hidden ring-1 ring-[#d4af37]/20">
              <div 
                className="bg-gradient-to-r from-[#d4af37] to-[#f59e0b] h-full rounded-full transition-all duration-700" 
                style={{ width: `${menPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-zinc-400 mt-1 block">
              {stats.menRegistered} / {stats.menMax} {t.pioneerCertifiedRegistered}
            </span>
          </div>

          <div className="hidden sm:block w-px h-10 bg-[#d4af37]/20" />

          {/* Femmes counter */}
          <div className="min-w-[150px]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#f8ede8] font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#f472b6]" />
                {t.pioneerWomen}
              </span>
              <span className="font-mono text-[11px] text-[#f472b6] font-semibold">
                {womenRemaining} {t.pioneerSpotsOffered}
              </span>
            </div>
            <div className="w-full bg-[#2a1720] h-2 rounded-full overflow-hidden ring-1 ring-[#f472b6]/20">
              <div 
                className="bg-gradient-to-r from-[#f472b6] to-[#e11d48] h-full rounded-full transition-all duration-700" 
                style={{ width: `${womenPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-zinc-400 mt-1 block">
              {stats.womenRegistered} / {stats.womenMax} {t.pioneerCertifiedRegistered}
            </span>
          </div>

          {/* CTA Button */}
          <div className="shrink-0 flex flex-col gap-1.5">
            <button
              onClick={onJoinPioneers}
              className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[#160d13] bg-gradient-to-r from-[#fce0a2] via-[#d4af37] to-[#b38728] hover:from-[#fff0cd] hover:to-[#c69a35] transition-all shadow-md shadow-[#d4af37]/20 flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>{t.pioneerReserveBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
            <button
              onClick={onOpenPricing}
              className="text-[11px] text-[#d6c4c9] hover:text-[#f8ede8] transition-colors text-center underline cursor-pointer"
            >
              {t.pioneerDetailsFee}
            </button>
          </div>

        </div>

      </div>

      {/* Trust micro-row adhering to Zero-Pill discipline */}
      <div className="mt-4 pt-3 border-t border-[#d4af37]/15 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#b8a4aa]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>{t.pioneerTrustDoubleCheck}</span>
        </div>
        <span aria-hidden="true" className="text-[#d4af37]/40">·</span>
        <div className="flex items-center gap-1.5">
          <HeartHandshake className="w-3.5 h-3.5 text-[#f472b6]" />
          <span>{t.pioneerTrustMatrimonial}</span>
        </div>
        <span aria-hidden="true" className="text-[#d4af37]/40">·</span>
        <span>{t.pioneerTrustPrivacy}</span>
      </div>

    </div>
  );
};
