import React from 'react';
import { Users, MessageCircle, Scale, Sparkles, Heart } from 'lucide-react';
import { Translations, Language } from '../i18n/translations';

interface BottomNavProps {
  activeTab: 'profiles' | 'chat' | 'charter' | 'pricing';
  setActiveTab: (tab: 'profiles' | 'chat' | 'charter' | 'pricing') => void;
  isFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  favoritesCount: number;
  unreadCount: number;
  t: Translations;
  lang: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  isFavoritesOnly,
  onToggleFavorites,
  favoritesCount,
  unreadCount,
  t,
  lang
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#140c11]/95 backdrop-blur-md border-t border-[#d4af37]/20 px-1 py-1">
      <div className="grid grid-cols-5 items-center h-14 max-w-md mx-auto">
        
        {/* Tab 1: Profils */}
        <button
          onClick={() => {
            setActiveTab('profiles');
            if (isFavoritesOnly) onToggleFavorites();
          }}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors cursor-pointer ${
            activeTab === 'profiles' && !isFavoritesOnly ? 'text-[#fce0a2]' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight mt-1">{t.navProfiles}</span>
        </button>

        {/* Tab 2: Favoris */}
        <button
          onClick={onToggleFavorites}
          className={`relative flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors cursor-pointer ${
            isFavoritesOnly ? 'text-[#f472b6]' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <div className="relative">
            <Heart className={`w-4 h-4 ${isFavoritesOnly || favoritesCount > 0 ? 'fill-[#f472b6] text-[#f472b6]' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2 rtl:-right-auto rtl:-left-2 w-3.5 h-3.5 rounded-full bg-[#f472b6] text-[#12090e] font-mono text-[9px] font-bold flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-1">{t.navFavorites}</span>
        </button>

        {/* Tab 3: Messagerie */}
        <button
          onClick={() => setActiveTab('chat')}
          className={`relative flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors cursor-pointer ${
            activeTab === 'chat' ? 'text-[#fce0a2]' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <div className="relative">
            <MessageCircle className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 w-2 h-2 rounded-full bg-[#f472b6] animate-pulse" />
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-1">{t.navChat}</span>
        </button>

        {/* Tab 4: Charte */}
        <button
          onClick={() => setActiveTab('charter')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors cursor-pointer ${
            activeTab === 'charter' ? 'text-[#fce0a2]' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight mt-1">{t.navCharter}</span>
        </button>

        {/* Tab 5: 100 DH / Pionniers */}
        <button
          onClick={() => setActiveTab('pricing')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors cursor-pointer ${
            activeTab === 'pricing' ? 'text-[#d4af37]' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span className="text-[10px] font-medium tracking-tight mt-1 truncate max-w-[54px]">{t.pioneerMember}</span>
        </button>

      </div>
    </nav>
  );
};
