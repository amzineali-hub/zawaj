import React from 'react';
import { ShieldCheck, MessageCircle, Smartphone, Heart, Globe } from 'lucide-react';
import { UserProfile } from '../types';
import { Language, Translations } from '../i18n/translations';

interface HeaderProps {
  currentUser: UserProfile | null;
  onOpenVerification: () => void;
  onOpenChat: () => void;
  onOpenCharter: () => void;
  onOpenPricing: () => void;
  onOpenAppGuide: () => void;
  onToggleFavorites: () => void;
  isFavoritesView: boolean;
  favoritesCount: number;
  unreadCount: number;
  activeTab: 'profiles' | 'chat' | 'charter' | 'pricing';
  setActiveTab: (tab: 'profiles' | 'chat' | 'charter' | 'pricing') => void;
  lang: Language;
  onToggleLanguage: (lang: Language) => void;
  t: Translations;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenVerification,
  onOpenChat,
  onOpenCharter,
  onOpenPricing,
  onOpenAppGuide,
  onToggleFavorites,
  isFavoritesView,
  favoritesCount,
  unreadCount,
  activeTab,
  setActiveTab,
  lang,
  onToggleLanguage,
  t
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#d4af37]/20 bg-[#120b0f]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Wordmark with explicit Moroccan & Diaspora designation */}
        <button 
          onClick={() => {
            setActiveTab('profiles');
          }}
          className="flex flex-col text-left rtl:text-right cursor-pointer group py-1"
        >
          <div className="flex items-center gap-2">
            <span 
              className="text-lg sm:text-2xl font-display font-semibold tracking-wide group-hover:opacity-90 transition-opacity whitespace-nowrap"
              style={{ color: '#c5e258', WebkitTextFillColor: '#c5e258' }}
            >
              {t.appName}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#fce0a2]">
              <span className="text-xs leading-none">🇲🇦</span>
              <span className="truncate max-w-[140px] sm:max-w-none">{lang === 'ar' ? 'خاص بالمغاربة في العالم' : 'Pour les Marocains & MRE'}</span>
            </span>
          </div>
          <span 
            className="font-serif tracking-normal -mt-0.5"
            style={{ fontWeight: 'bold', fontSize: '16px', color: '#f4e272' }}
          >
            {lang === 'ar' ? 'خاص بالمغاربة في العالم · ميثاق الزواج الشرعي' : 'Pour les Marocains et Marocains du Monde'}
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium">
          <button
            onClick={() => setActiveTab('profiles')}
            className={`transition-colors pb-1 cursor-pointer whitespace-nowrap ${
              activeTab === 'profiles' && !isFavoritesView
                ? 'text-[#fce0a2] border-b-2 border-[#d4af37]'
                : 'text-[#d6c4c9] hover:text-[#f8ede8]'
            }`}
          >
            {t.navProfiles}
          </button>

          <button
            onClick={onToggleFavorites}
            className={`transition-colors pb-1 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              isFavoritesView
                ? 'text-[#f472b6] border-b-2 border-[#f472b6]'
                : 'text-[#d6c4c9] hover:text-[#f472b6]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavoritesView || favoritesCount > 0 ? 'fill-[#f472b6] text-[#f472b6]' : ''}`} />
            <span>{t.navFavorites}</span>
            {favoritesCount > 0 && (
              <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-[#f472b6]/20 text-[#f472b6] font-mono">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('chat');
              onOpenChat();
            }}
            className={`relative transition-colors pb-1 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'text-[#fce0a2] border-b-2 border-[#d4af37]'
                : 'text-[#d6c4c9] hover:text-[#f8ede8]'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-[#f472b6]" />
            <span>{t.navChat}</span>
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#f472b6] animate-pulse" />
            )}
          </button>

          <button
            onClick={onOpenCharter}
            className="text-[#d6c4c9] hover:text-[#f8ede8] transition-colors pb-1 cursor-pointer whitespace-nowrap"
          >
            {t.navCharter}
          </button>

          <button
            onClick={onOpenPricing}
            className="text-[#d6c4c9] hover:text-[#f8ede8] transition-colors pb-1 cursor-pointer whitespace-nowrap"
          >
            {t.navPioneers}
          </button>

          <button
            onClick={onOpenAppGuide}
            className="text-[#d6c4c9] hover:text-[#f8ede8] transition-colors pb-1 cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{t.navMobileApp}</span>
          </button>
        </nav>

        {/* Zone 3: Primary actions & Language Switcher */}
        <div className="flex items-center gap-2.5">
          
          {/* Language Switcher button (Arabic <-> French) */}
          <button
            type="button"
            onClick={() => onToggleLanguage(lang === 'fr' ? 'ar' : 'fr')}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#d4af37]/35 hover:border-[#d4af37] text-xs font-semibold text-[#fce0a2] bg-[#22141c] hover:bg-[#2e1926] transition-all cursor-pointer whitespace-nowrap shadow-sm"
            title={lang === 'fr' ? "الانتقال إلى اللغة العربية" : "Passer en Français"}
          >
            <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-serif">{lang === 'fr' ? 'العربية' : 'Français'}</span>
          </button>

          {currentUser ? (
            <button
              onClick={onOpenVerification}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22141c] border border-[#d4af37]/40 hover:border-[#d4af37] transition-all text-xs font-medium text-[#f8ede8] cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="max-w-[100px] sm:max-w-[120px] truncate">{currentUser.fullName}</span>
              <span className="text-[10px] text-[#d4af37] font-serif">{t.certifiedBadge}</span>
            </button>
          ) : (
            <button
              onClick={onOpenVerification}
              className="px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold text-[#180f14] bg-gradient-to-r from-[#f7dfa5] via-[#d4af37] to-[#b38728] hover:from-[#fcecc0] hover:to-[#c69a35] transition-all shadow-md shadow-[#d4af37]/15 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-[#1a0f15]" />
              <span>{t.verifyProfileBtn}</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
