import React, { useState, useEffect } from 'react';
import { Sparkles, X, Heart, ShieldCheck } from 'lucide-react';
import { Language, Translations, CITIES_ARABIC } from '../i18n/translations';

interface FloatingProfileItem {
  id: string;
  name: string;
  gender: 'femme' | 'homme';
  city: string;
  photoUrl: string;
  leftPercent: number; // 0 to 92
  sizePx: number; // 48 to 68
  durationSec: number;
  delaySec: number;
  ringTheme: 'gold' | 'rose';
}

// At least 18 profiles (boys and girls) floating in the foreground from bottom to top
const FLOATING_MEMBERS: FloatingProfileItem[] = [
  {
    id: 'f-1',
    name: 'Yasmina',
    gender: 'femme',
    city: 'Rabat',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=350&q=80',
    leftPercent: 5,
    sizePx: 56,
    durationSec: 8.5,
    delaySec: 0.1,
    ringTheme: 'rose'
  },
  {
    id: 'm-1',
    name: 'Dr. Driss',
    gender: 'homme',
    city: 'Casablanca',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=350&q=80',
    leftPercent: 16,
    sizePx: 62,
    durationSec: 9.0,
    delaySec: 0.6,
    ringTheme: 'gold'
  },
  {
    id: 'f-2',
    name: 'Soukaina',
    gender: 'femme',
    city: 'Casablanca',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=350&q=80',
    leftPercent: 28,
    sizePx: 54,
    durationSec: 8.0,
    delaySec: 1.2,
    ringTheme: 'rose'
  },
  {
    id: 'm-2',
    name: 'Mehdi',
    gender: 'homme',
    city: 'Marrakech',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=350&q=80',
    leftPercent: 42,
    sizePx: 60,
    durationSec: 9.5,
    delaySec: 0.4,
    ringTheme: 'gold'
  },
  {
    id: 'f-3',
    name: 'Kenza',
    gender: 'femme',
    city: 'Paris (Diaspora)',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=350&q=80',
    leftPercent: 56,
    sizePx: 56,
    durationSec: 8.8,
    delaySec: 1.6,
    ringTheme: 'rose'
  },
  {
    id: 'm-3',
    name: 'Amine',
    gender: 'homme',
    city: 'Tanger',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=350&q=80',
    leftPercent: 68,
    sizePx: 62,
    durationSec: 9.2,
    delaySec: 0.9,
    ringTheme: 'gold'
  },
  {
    id: 'f-4',
    name: 'Nawal',
    gender: 'femme',
    city: 'Fès',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=350&q=80',
    leftPercent: 82,
    sizePx: 54,
    durationSec: 8.4,
    delaySec: 2.0,
    ringTheme: 'gold'
  },
  {
    id: 'm-4',
    name: 'Tariq',
    gender: 'homme',
    city: 'Montréal (Diaspora)',
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=350&q=80',
    leftPercent: 92,
    sizePx: 58,
    durationSec: 9.6,
    delaySec: 2.5,
    ringTheme: 'gold'
  },
  {
    id: 'f-5',
    name: 'Salma',
    gender: 'femme',
    city: 'Agadir',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=350&q=80',
    leftPercent: 11,
    sizePx: 52,
    durationSec: 8.6,
    delaySec: 3.1,
    ringTheme: 'rose'
  },
  {
    id: 'm-5',
    name: 'Karim',
    gender: 'homme',
    city: 'Oujda',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=350&q=80',
    leftPercent: 23,
    sizePx: 60,
    durationSec: 9.4,
    delaySec: 3.6,
    ringTheme: 'gold'
  },
  {
    id: 'f-6',
    name: 'Fatima-Zahra',
    gender: 'femme',
    city: 'Tétouan',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=350&q=80',
    leftPercent: 37,
    sizePx: 54,
    durationSec: 8.2,
    delaySec: 4.1,
    ringTheme: 'rose'
  },
  {
    id: 'm-6',
    name: 'Youssef',
    gender: 'homme',
    city: 'Bruxelles (Diaspora)',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=350&q=80',
    leftPercent: 49,
    sizePx: 58,
    durationSec: 9.5,
    delaySec: 4.5,
    ringTheme: 'gold'
  },
  {
    id: 'f-7',
    name: 'Imane',
    gender: 'femme',
    city: 'Marrakech',
    photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=350&q=80',
    leftPercent: 62,
    sizePx: 56,
    durationSec: 8.9,
    delaySec: 4.9,
    ringTheme: 'rose'
  },
  {
    id: 'm-7',
    name: 'Hamza',
    gender: 'homme',
    city: 'Rabat',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=350&q=80',
    leftPercent: 74,
    sizePx: 60,
    durationSec: 9.1,
    delaySec: 5.3,
    ringTheme: 'gold'
  },
  {
    id: 'f-8',
    name: 'Ghita',
    gender: 'femme',
    city: 'Casablanca',
    photoUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=350&q=80',
    leftPercent: 86,
    sizePx: 52,
    durationSec: 8.3,
    delaySec: 5.7,
    ringTheme: 'rose'
  },
  {
    id: 'm-8',
    name: 'Omar',
    gender: 'homme',
    city: 'Madrid (Diaspora)',
    photoUrl: 'https://images.unsplash.com/photo-1492446845049-9c50ce313d00?auto=format&fit=crop&w=350&q=80',
    leftPercent: 18,
    sizePx: 58,
    durationSec: 9.3,
    delaySec: 6.1,
    ringTheme: 'gold'
  },
  {
    id: 'f-9',
    name: 'Zineb',
    gender: 'femme',
    city: 'Fès',
    photoUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=350&q=80',
    leftPercent: 32,
    sizePx: 54,
    durationSec: 8.7,
    delaySec: 6.5,
    ringTheme: 'rose'
  },
  {
    id: 'm-9',
    name: 'Reda',
    gender: 'homme',
    city: 'Dubaï (Diaspora)',
    photoUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=350&q=80',
    leftPercent: 70,
    sizePx: 60,
    durationSec: 9.6,
    delaySec: 6.9,
    ringTheme: 'gold'
  }
];

interface FloatingProfilesWelcomeProps {
  onDismiss?: () => void;
  lang: Language;
  t: Translations;
}

export const FloatingProfilesWelcome: React.FC<FloatingProfilesWelcomeProps> = ({
  onDismiss,
  lang,
  t
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss after all 18 profiles complete their upward flight (~17 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onDismiss) onDismiss();
    }, 17500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  return (
    /* Foreground container: z-[80] sits right in front of all page elements (header, hero, cards) */
    <div className="fixed inset-0 z-[80] pointer-events-none overflow-hidden select-none">
      
      {/* Background radial gold glow accent for foreground brilliance */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

      {/* Floating Foreground Medallions of Boys and Girls (18 members) */}
      {FLOATING_MEMBERS.map((member) => {
        const displayCity = lang === 'ar' ? (CITIES_ARABIC[member.city] || member.city) : member.city;
        const isGold = member.ringTheme === 'gold';

        return (
          <div
            key={member.id}
            className="absolute bottom-0 animate-float-up flex flex-col items-center pointer-events-none drop-shadow-2xl"
            style={{
              left: `${member.leftPercent}%`,
              animationDuration: `${member.durationSec}s`,
              animationDelay: `${member.delaySec}s`
            }}
          >
            {/* Medallion Avatar with High-Contrast Foreground Glow & Ring */}
            <div className="relative group">
              <div 
                className={`rounded-full overflow-hidden p-[2.5px] shadow-2xl transition-transform ${
                  isGold 
                    ? 'bg-gradient-to-tr from-[#d4af37] via-[#fff1c4] to-[#aa771c] shadow-[#d4af37]/50 ring-2 ring-[#d4af37] ring-offset-2 ring-offset-[#120a0f]' 
                    : 'bg-gradient-to-tr from-[#f472b6] via-[#fde2e4] to-[#d4af37] shadow-[#f472b6]/50 ring-2 ring-[#f472b6] ring-offset-2 ring-offset-[#120a0f]'
                }`}
                style={{ width: `${member.sizePx}px`, height: `${member.sizePx}px` }}
              >
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full filter contrast-110 brightness-105"
                  loading="eager"
                />
              </div>

              {/* Verified Mini Seal at the top-right of the avatar */}
              <div className={`absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-[#120a0f] shadow-md ${
                member.gender === 'femme' ? 'bg-[#f472b6] text-white' : 'bg-[#d4af37] text-[#160d13]'
              }`}>
                {member.gender === 'femme' ? (
                  <Heart className="w-2.5 h-2.5 fill-current" />
                ) : (
                  <ShieldCheck className="w-2.5 h-2.5 stroke-[3]" />
                )}
              </div>
            </div>

            {/* High-Contrast Foreground Name & City Pill */}
            <div className="mt-1.5 px-2.5 py-0.5 rounded-full bg-[#180f16]/95 border border-[#d4af37]/60 shadow-xl shadow-black/80 flex items-center gap-1 backdrop-blur-md whitespace-nowrap">
              <span className="text-[11px] font-serif font-bold text-[#fff8f0]">
                {member.name}
              </span>
              <span className="text-[#d4af37] text-[10px]">·</span>
              <span className="text-[10px] text-[#fce0a2] font-medium">
                {displayCity}
              </span>
            </div>
          </div>
        );
      })}

      {/* Floating Foreground Welcoming Control Badge (Bottom-left/right) with Pointer-Events Auto */}
      <aside 
        aria-label="Welcome indicator"
        className="absolute bottom-20 xl:bottom-6 left-3 right-3 sm:right-auto sm:left-5 rtl:left-3 rtl:sm:left-auto rtl:sm:right-5 pointer-events-auto bg-[#1a0f16]/95 backdrop-blur-lg border border-[#d4af37]/60 rounded-2xl px-4 py-2.5 shadow-2xl shadow-black flex items-center gap-3 animate-fadeIn"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#fce0a2] text-[#160d13] flex items-center justify-center shadow-md shadow-[#d4af37]/30 shrink-0">
            <Sparkles className="w-4 h-4 fill-current animate-pulse" />
          </div>
          <div>
            <p className="text-xs font-serif font-bold text-[#fce0a2] leading-tight">
              {t.welcomeFloatingTitle}
            </p>
            <p className="text-[10px] text-[#d6c4c9]">
              {lang === 'ar' ? '18 عضواً موثقاً يرتقون لبناء بيت السكينة' : '18 profils vérifiés (H & F) en quête d’union sacrée'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-1 rtl:ml-0 rtl:mr-1"
          title={t.dismissFloatingBtn}
          aria-label={t.dismissFloatingBtn}
        >
          <X className="w-4 h-4" />
        </button>
      </aside>

    </div>
  );
};
