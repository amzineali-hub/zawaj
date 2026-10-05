import React, { useState, useRef, useEffect } from 'react';
import { MapPin, MessageCircle, BookOpen, HeartHandshake, Eye, Sparkles, Heart, Smartphone, ShieldCheck, X } from 'lucide-react';
import { UserProfile } from '../types';
import { PrestigeAvatar } from './PrestigeAvatar';
import { Translations, Language, CITIES_ARABIC, INTERESTS_ARABIC } from '../i18n/translations';

// Particles configuration for the gentle heart explosion
const BURST_PARTICLES = [
  { type: 'heart', tx: 0, ty: -26, rot: -12, size: 10, color: 'text-[#f472b6] fill-[#f472b6]', delay: 0, duration: 750 },
  { type: 'spark', tx: 20, ty: -20, rot: 25, size: 5, color: 'bg-[#fce0a2]', delay: 40, duration: 700 },
  { type: 'heart', tx: 26, ty: -2, rot: 18, size: 8, color: 'text-[#fb7185] fill-[#fb7185]', delay: 20, duration: 720 },
  { type: 'spark', tx: 18, ty: 18, rot: -30, size: 4, color: 'bg-[#f472b6]', delay: 60, duration: 740 },
  { type: 'heart', tx: 0, ty: 24, rot: 10, size: 9, color: 'text-[#f472b6] fill-[#f472b6]', delay: 30, duration: 750 },
  { type: 'spark', tx: -18, ty: 18, rot: 40, size: 5, color: 'bg-[#fce0a2]', delay: 50, duration: 720 },
  { type: 'heart', tx: -26, ty: -2, rot: -22, size: 8, color: 'text-[#fb7185] fill-[#fb7185]', delay: 10, duration: 730 },
  { type: 'spark', tx: -20, ty: -20, rot: -15, size: 4, color: 'bg-[#f472b6]', delay: 30, duration: 760 }
];

interface ProfileCardProps {
  profile: UserProfile;
  isFavorite: boolean;
  onToggleFavorite: (profileId: string) => void;
  onViewProfile: (profile: UserProfile) => void;
  onStartChat: (profile: UserProfile) => void;
  t: Translations;
  lang: Language;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  isFavorite,
  onToggleFavorite,
  onViewProfile,
  onStartChat,
  t,
  lang
}) => {
  const [isHoverPreview, setIsHoverPreview] = useState(false);
  const [isPinnedPreview, setIsPinnedPreview] = useState(false);
  const [isHeartBursting, setIsHeartBursting] = useState(false);
  const burstTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (burstTimeoutRef.current) clearTimeout(burstTimeoutRef.current);
    };
  }, []);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Trigger the soft heart explosion animation
    setIsHeartBursting(true);
    if (burstTimeoutRef.current) clearTimeout(burstTimeoutRef.current);
    burstTimeoutRef.current = setTimeout(() => {
      setIsHeartBursting(false);
    }, 800);

    onToggleFavorite(profile.id);
  };

  const displayCity = lang === 'ar' ? (CITIES_ARABIC[profile.city] || profile.city) : profile.city;
  const isDoubleVerified = profile.isVerifiedPhone && profile.isVerifiedId;

  return (
    <article className="group relative rounded-2xl border border-[#d4af37]/25 bg-[#170e14]/90 hover:border-[#d4af37]/60 transition-all duration-300 shadow-lg shadow-black/40 flex flex-col justify-between overflow-hidden text-left rtl:text-right">
      
      {/* Decorative top accent hairline */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

      {/* Top Floating Controls: Quick Preview Eye + Favorite Heart */}
      <div className="absolute top-3.5 right-3.5 rtl:right-auto rtl:left-3.5 z-20 flex items-center gap-1.5">
        {/* Quick View / Preview Eye Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsPinnedPreview(!isPinnedPreview);
          }}
          onMouseEnter={() => setIsHoverPreview(true)}
          onMouseLeave={() => setIsHoverPreview(false)}
          aria-label={t.quickPreviewBtn}
          title={t.quickPreviewBtn}
          className={`p-2 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center ${
            isPinnedPreview || isHoverPreview
              ? 'bg-[#2a1720] border-[#d4af37] text-[#fce0a2] shadow-md shadow-[#d4af37]/25 scale-105'
              : 'bg-[#180f15]/80 hover:bg-[#281520] border-[#d4af37]/30 text-zinc-400 hover:text-[#d4af37] hover:border-[#d4af37]/60 hover:scale-105'
          }`}
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Floating Favorite Heart Button with Gentle Burst Animation */}
        <div className="relative">
          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? `Retirer des favoris` : `Ajouter aux favoris`}
            title={isFavorite ? t.savedFavoriteActiveBtn : t.saveFavoriteBtn}
            className={`relative p-2 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center ${
              isFavorite
                ? 'bg-[#2a1420] border-[#f472b6] text-[#f472b6] shadow-md shadow-[#f472b6]/25 scale-105'
                : 'bg-[#180f15]/80 hover:bg-[#281520] border-[#d4af37]/30 text-zinc-400 hover:text-[#f472b6] hover:border-[#f472b6]/60 hover:scale-105'
            }`}
          >
            {/* Expanding glowing halo ring */}
            {isHeartBursting && (
              <span className="absolute inset-0 rounded-full border border-[#f472b6] pointer-events-none animate-heart-ring" />
            )}

            <Heart 
              className={`w-4 h-4 transition-transform duration-300 ${
                isFavorite ? 'fill-[#f472b6] text-[#f472b6]' : 'stroke-[2]'
              } ${isHeartBursting ? 'animate-heart-pop' : isFavorite ? 'scale-110' : ''}`} 
            />
          </button>

          {/* Gentle Heart & Sparkles Explosion Particles */}
          {isHeartBursting && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible z-30">
              {BURST_PARTICLES.map((p, idx) => (
                <span
                  key={idx}
                  className="absolute animate-heart-particle select-none flex items-center justify-center pointer-events-none"
                  style={{
                    '--tx': `${p.tx}px`,
                    '--ty': `${p.ty}px`,
                    '--rot': `${p.rot}deg`,
                    animationDelay: `${p.delay}ms`,
                    animationDuration: `${p.duration}ms`
                  } as React.CSSProperties}
                >
                  {p.type === 'heart' ? (
                    <Heart 
                      className={`fill-current stroke-none ${p.color}`} 
                      style={{ width: `${p.size}px`, height: `${p.size}px` }} 
                    />
                  ) : (
                    <span 
                      className={`rounded-full shadow-sm ${p.color}`} 
                      style={{ width: `${p.size}px`, height: `${p.size}px`, display: 'inline-block' }} 
                    />
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Quick Preview Mode Overlay */}
      {(isHoverPreview || isPinnedPreview) && (
        <div 
          className="absolute inset-0 z-30 bg-[#160d14]/95 backdrop-blur-md p-5 sm:p-6 flex flex-col justify-between border-2 border-[#d4af37]/70 rounded-2xl animate-fadeIn transition-all duration-300 shadow-2xl shadow-black/80"
          onMouseEnter={() => setIsHoverPreview(true)}
          onMouseLeave={() => setIsHoverPreview(false)}
        >
          {/* Preview Header */}
          <div className="flex items-center justify-between border-b border-[#d4af37]/25 pb-2.5">
            <div className="flex items-center gap-2 text-xs font-serif font-semibold text-[#fce0a2]">
              <Eye className="w-4 h-4 text-[#d4af37]" />
              <span>{t.quickPreviewTitle}</span>
              <span className="text-[10px] text-[#d4af37]/70 font-sans">({profile.fullName.split(' ')[0]})</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPinnedPreview(false);
                setIsHoverPreview(false);
              }}
              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={t.closePreviewBtn}
              aria-label={t.closePreviewBtn}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Preview Content: Bio Snippet & Top 3 Interests */}
          <div className="flex-1 py-3 flex flex-col justify-center space-y-3 overflow-y-auto">
            {/* 1. Bio Snippet */}
            <div>
              <span className="text-[10px] font-serif uppercase tracking-wider text-[#d4af37] block mb-1">
                {t.bioSnippetLabel}
              </span>
              <div className="p-3 rounded-xl bg-[#20121a]/95 border border-[#d4af37]/20 shadow-inner">
                <p className="text-xs text-[#f8ede8] italic leading-relaxed line-clamp-3">
                  « {profile.bio} »
                </p>
              </div>
            </div>

            {/* 2. Top 3 Interests */}
            <div>
              <span className="text-[10px] font-serif uppercase tracking-wider text-[#d4af37] block mb-1.5">
                {t.topInterestsLabel}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {profile.interests.slice(0, 3).map((interest) => {
                  const displayInterest = lang === 'ar' ? (INTERESTS_ARABIC[interest] || interest) : interest;
                  return (
                    <span 
                      key={interest}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#22131c] border border-[#d4af37]/40 text-[#fce0a2] shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                      <span>{displayInterest}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Preview Footer Actions */}
          <div className="pt-2.5 border-t border-[#d4af37]/20 flex items-center gap-2">
            <button
              onClick={() => {
                setIsPinnedPreview(false);
                setIsHoverPreview(false);
                onViewProfile(profile);
              }}
              type="button"
              className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#aa771c] hover:from-[#fce0a2] hover:to-[#c69a35] text-xs font-semibold text-[#160d13] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#d4af37]/15 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#160d13]" />
              <span>{t.openFullDossierFromPreview}</span>
            </button>

            <button
              onClick={() => {
                setIsPinnedPreview(false);
                setIsHoverPreview(false);
                onStartChat(profile);
              }}
              type="button"
              className="p-2 rounded-lg border border-[#d4af37]/30 hover:border-[#d4af37] text-[#fce0a2] hover:bg-[#d4af37]/10 transition-colors cursor-pointer"
              title={t.chatBtn}
            >
              <MessageCircle className="w-4 h-4 text-[#d4af37]" />
            </button>
          </div>
        </div>
      )}

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        
        {/* Header row: Avatar + Badges + Name + Age + Location */}
        <div className="flex items-start gap-4 pr-20 rtl:pr-0 rtl:pl-20">
          <PrestigeAvatar
            photoUrl={profile.photoUrl}
            name={profile.fullName}
            isBlurred={profile.isPhotoBlurred}
            isVerified={isDoubleVerified}
            isVerifiedPhone={profile.isVerifiedPhone}
            isVerifiedId={profile.isVerifiedId}
            size="lg"
            gender={profile.gender}
          />

          <div className="flex-1 min-w-0">
            {/* Visual Verification Badges Row (Color & style change based on Phone vs ID) */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              {profile.pioneerNumber && (
                <span className="font-serif text-[#d4af37] font-semibold text-[10px] px-1.5 py-0.5 rounded bg-[#d4af37]/15 border border-[#d4af37]/35 whitespace-nowrap">
                  #{profile.pioneerNumber} {t.pioneerMember}
                </span>
              )}

              {/* 1. Phone Verification Badge (Emerald Green Theme) */}
              {profile.isVerifiedPhone ? (
                <span 
                  title={t.phoneVerifiedTooltip}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-950/50 hover:bg-emerald-900/60 transition-colors whitespace-nowrap"
                >
                  <Smartphone className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{t.phoneVerifiedBadgeShort}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                </span>
              ) : (
                <span 
                  title={t.phonePendingTooltip}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-900/60 border border-zinc-700/40 text-zinc-500 whitespace-nowrap"
                >
                  <Smartphone className="w-3 h-3 text-zinc-600 shrink-0" />
                  <span>{t.phoneVerifiedBadgeShort}</span>
                </span>
              )}

              {/* 2. ID / Honor Verification Badge (Royal Gold Theme) */}
              {profile.isVerifiedId ? (
                <span 
                  title={t.idVerifiedTooltip}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#2a1815]/90 border border-[#d4af37]/50 text-[#fce0a2] shadow-sm shadow-black/40 hover:bg-[#38201a] transition-colors whitespace-nowrap"
                >
                  <ShieldCheck className="w-3 h-3 text-[#d4af37] shrink-0" />
                  <span>{t.idVerifiedBadgeShort}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shrink-0" />
                </span>
              ) : (
                <span 
                  title={t.idPendingTooltip}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-900/60 border border-zinc-700/40 text-zinc-500 whitespace-nowrap"
                >
                  <ShieldCheck className="w-3 h-3 text-zinc-600 shrink-0" />
                  <span>{t.idVerifiedBadgeShort}</span>
                </span>
              )}
            </div>

            {/* Name */}
            <h3 className="text-lg font-serif font-semibold text-[#fff8f0] group-hover:text-gold-gradient transition-colors truncate">
              {profile.fullName}
            </h3>

            {/* Unboxed Metadata: Age · City · Profession */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#d6c4c9] mt-0.5">
              <span className="font-semibold text-[#f8ede8]">{profile.age} {t.yearsOld}</span>
              <span aria-hidden="true" className="text-[#d4af37]/40">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#f472b6] shrink-0" />
                <span className="truncate">{displayCity}</span>
              </span>
            </div>

            {/* Profession & Education */}
            <p className="text-xs text-[#fce0a2] mt-1 font-medium truncate">
              {profile.profession}
            </p>
          </div>
        </div>

        {/* Marriage Vision Quote / Statement */}
        <div className="mt-4 p-3 rounded-xl bg-[#20131b]/70 border border-[#d4af37]/15">
          <div className="text-[11px] font-serif text-[#d4af37] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <HeartHandshake className="w-3 h-3 text-[#f472b6]" />
            <span>{t.marriageVisionLabel}</span>
          </div>
          <p className="text-xs text-[#d6c4c9] italic line-clamp-2 leading-relaxed">
            « {profile.marriageVision} »
          </p>
        </div>

        {/* Bio excerpt */}
        <p className="text-xs text-[#b8a4aa] mt-3 line-clamp-2 leading-relaxed">
          {profile.bio}
        </p>

        {/* Unboxed Interests List (Zero-Pill discipline: typographic separators) */}
        <div className="mt-4 pt-3 border-t border-[#d4af37]/15">
          <span className="text-[11px] uppercase tracking-wider text-[#a89098] font-serif block mb-1">
            {t.interestsLabel}
          </span>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#f8ede8]">
            {profile.interests.slice(0, 3).map((interest, idx) => {
              const displayInterest = lang === 'ar' ? (INTERESTS_ARABIC[interest] || interest) : interest;
              return (
                <React.Fragment key={interest}>
                  {idx > 0 && <span aria-hidden="true" className="text-[#d4af37]/40">·</span>}
                  <span className="hover:text-[#fce0a2] transition-colors">{displayInterest}</span>
                </React.Fragment>
              );
            })}
            {profile.interests.length > 3 && (
              <>
                <span aria-hidden="true" className="text-[#d4af37]/40">·</span>
                <span className="text-[#d4af37] text-[11px]">+{profile.interests.length - 3}</span>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="px-5 py-3.5 bg-[#120a0f] border-t border-[#d4af37]/20 flex items-center gap-2">
        <button
          onClick={() => onViewProfile(profile)}
          type="button"
          className="flex-1 py-2 px-3 rounded-lg border border-[#d4af37]/30 hover:border-[#d4af37] text-xs font-medium text-[#f8ede8] hover:bg-[#d4af37]/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>{t.viewDossierBtn}</span>
        </button>

        <button
          onClick={() => onStartChat(profile)}
          type="button"
          className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#aa771c] hover:from-[#fce0a2] hover:to-[#c69a35] text-xs font-semibold text-[#160d13] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#d4af37]/15 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#160d13]" />
          <span>{t.chatBtn}</span>
        </button>
      </div>

    </article>
  );
};
