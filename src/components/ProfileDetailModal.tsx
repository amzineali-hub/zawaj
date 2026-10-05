import React, { useState, useRef, useEffect } from 'react';
import { X, ShieldCheck, Smartphone, MapPin, HeartHandshake, BookOpen, MessageCircle, AlertCircle, Sparkles, UserCheck, Heart, CheckCircle2, UserX, Ban } from 'lucide-react';
import { UserProfile } from '../types';
import { PrestigeAvatar } from './PrestigeAvatar';
import { Translations, Language, CITIES_ARABIC, INTERESTS_ARABIC, EDUCATION_ARABIC, MARITAL_STATUS_ARABIC } from '../i18n/translations';

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

interface ProfileDetailModalProps {
  profile: UserProfile | null;
  isFavorite: boolean;
  onToggleFavorite: (profileId: string) => void;
  onClose: () => void;
  onStartChat: (profile: UserProfile) => void;
  onReportProfile: (profile: UserProfile) => void;
  isBlocked?: boolean;
  onToggleBlock?: (profile: UserProfile) => void;
  t: Translations;
  lang: Language;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  profile,
  isFavorite,
  onToggleFavorite,
  onClose,
  onStartChat,
  onReportProfile,
  isBlocked = false,
  onToggleBlock,
  t,
  lang
}) => {
  const [familyStageRequested, setFamilyStageRequested] = useState(false);
  const [showConfirmBlock, setShowConfirmBlock] = useState(false);
  const [isHeartBursting, setIsHeartBursting] = useState(false);
  const burstTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (burstTimeoutRef.current) clearTimeout(burstTimeoutRef.current);
    };
  }, []);

  if (!profile) return null;

  const handleFavoriteClick = () => {
    setIsHeartBursting(true);
    if (burstTimeoutRef.current) clearTimeout(burstTimeoutRef.current);
    burstTimeoutRef.current = setTimeout(() => {
      setIsHeartBursting(false);
    }, 800);

    onToggleFavorite(profile.id);
  };

  const displayCity = lang === 'ar' ? (CITIES_ARABIC[profile.city] || profile.city) : profile.city;
  const displayMaritalStatus = lang === 'ar' ? (MARITAL_STATUS_ARABIC[profile.maritalStatus] || profile.maritalStatus) : profile.maritalStatus;
  const displayEducation = lang === 'ar' ? (EDUCATION_ARABIC[profile.education] || profile.education) : profile.education;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div 
        className="relative w-full max-w-2xl bg-[#170e14] border border-[#d4af37]/30 rounded-3xl shadow-2xl shadow-black overflow-hidden my-8 text-left rtl:text-right"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Gold & Rose Gradient Header Banner */}
        <div className="h-32 bg-gradient-to-r from-[#3b1d2b] via-[#2a1420] to-[#1e1017] border-b border-[#d4af37]/20 relative p-6 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xs text-[#d4af37] tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.dossierTitle}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Block / Unblock Action Button in Header */}
            <button
              onClick={() => {
                if (isBlocked) {
                  onToggleBlock && onToggleBlock(profile);
                } else {
                  setShowConfirmBlock(true);
                }
              }}
              className={`p-2 rounded-full border text-xs font-medium transition-all duration-300 cursor-pointer flex items-center justify-center ${
                isBlocked
                  ? 'bg-rose-950/80 border-rose-500 text-rose-300 shadow-sm shadow-rose-950/40 hover:bg-rose-900'
                  : 'bg-black/40 hover:bg-rose-950/40 border-[#d4af37]/30 text-zinc-400 hover:text-rose-400 hover:border-rose-400/50'
              }`}
              title={isBlocked ? t.unblockUserBtn : t.blockUserBtn}
              aria-label={isBlocked ? t.unblockUserBtn : t.blockUserBtn}
            >
              {isBlocked ? <Ban className="w-4 h-4 text-rose-400" /> : <UserX className="w-4 h-4" />}
            </button>

            {/* Favorite toggle button in modal with Gentle Burst Animation */}
            <div className="relative">
              <button
                onClick={handleFavoriteClick}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 cursor-pointer ${
                  isFavorite
                    ? 'bg-[#2a1420] border-[#f472b6] text-[#f472b6] shadow-sm shadow-[#f472b6]/30'
                    : 'bg-black/40 hover:bg-[#24131d] border-[#d4af37]/30 text-zinc-300 hover:text-[#f472b6]'
                }`}
                title={isFavorite ? t.savedFavoriteActiveBtn : t.saveFavoriteBtn}
                aria-label="Toggle favorite"
              >
                {/* Expanding glowing halo ring */}
                {isHeartBursting && (
                  <span className="absolute inset-0 rounded-full border border-[#f472b6] pointer-events-none animate-heart-ring" />
                )}

                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-[#f472b6] text-[#f472b6]' : ''} ${isHeartBursting ? 'animate-heart-pop' : ''}`} />
                <span className="hidden sm:inline">{isFavorite ? t.savedFavoriteActiveBtn : t.saveFavoriteBtn}</span>
              </button>

              {/* Gentle Heart & Sparks Explosion Particles */}
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

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-zinc-300 hover:text-white border border-[#d4af37]/30 transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Floating Avatar & Identity Header */}
        <div className="px-6 pb-6 pt-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-16 mb-6">
            <PrestigeAvatar
              photoUrl={profile.photoUrl}
              name={profile.fullName}
              isBlurred={profile.isPhotoBlurred}
              isVerified={profile.isVerifiedId && profile.isVerifiedPhone}
              isVerifiedPhone={profile.isVerifiedPhone}
              isVerifiedId={profile.isVerifiedId}
              size="xl"
              showPrivacyControl={true}
              gender={profile.gender}
            />

            <div className="text-center sm:text-left rtl:sm:text-right flex-1 min-w-0">
              {/* Color-Coded Verification Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start rtl:sm:justify-start gap-1.5 mb-1.5">
                {profile.pioneerNumber && (
                  <span className="font-serif text-[#d4af37] font-semibold text-[10px] px-2 py-0.5 rounded bg-[#d4af37]/15 border border-[#d4af37]/35">
                    #{profile.pioneerNumber} {t.pioneerMember}
                  </span>
                )}

                {/* Phone Badge */}
                {profile.isVerifiedPhone ? (
                  <span 
                    title={t.phoneVerifiedTooltip}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-950/40"
                  >
                    <Smartphone className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{t.phoneVerifiedBadge}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                  </span>
                ) : (
                  <span 
                    title={t.phonePendingTooltip}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-900/60 border border-zinc-700/40 text-zinc-400"
                  >
                    <Smartphone className="w-3 h-3 text-zinc-500 shrink-0" />
                    <span>{t.phoneVerifiedBadge}</span>
                  </span>
                )}

                {/* ID Badge */}
                {profile.isVerifiedId ? (
                  <span 
                    title={t.idVerifiedTooltip}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950/70 border border-[#d4af37]/60 text-[#fce0a2] shadow-sm shadow-black/40"
                  >
                    <ShieldCheck className="w-3 h-3 text-[#d4af37] shrink-0" />
                    <span>{t.idVerifiedBadge}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shrink-0" />
                  </span>
                ) : (
                  <span 
                    title={t.idPendingTooltip}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-900/60 border border-zinc-700/40 text-zinc-400"
                  >
                    <ShieldCheck className="w-3 h-3 text-zinc-500 shrink-0" />
                    <span>{t.idVerifiedBadge}</span>
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-serif font-bold text-[#fff8f0]">
                {profile.fullName}
              </h2>

              <div className="flex flex-wrap items-center justify-center sm:justify-start rtl:sm:justify-start gap-x-2 text-xs text-[#d6c4c9] mt-1">
                <span className="font-medium text-[#f8ede8]">{profile.age} {t.yearsOld}</span>
                <span aria-hidden="true" className="text-[#d4af37]/40">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#f472b6]" />
                  <span>{displayCity}</span>
                </span>
                <span aria-hidden="true" className="text-[#d4af37]/40">·</span>
                <span className="text-[#fce0a2]">{profile.profession}</span>
              </div>
            </div>
          </div>

          {/* Official Verification Box with Trust Pillars Breakdown */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#2a1722]/90 via-[#20111a]/90 to-[#190d14]/90 border border-[#d4af37]/30 mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                <p className="text-xs font-serif font-semibold text-[#fce0a2]">
                  {t.authenticityCertifiedTitle}
                </p>
              </div>
              {profile.verifiedBadgeDate && (
                <span className="text-[11px] font-mono text-[#d4af37]/80">
                  {profile.verifiedBadgeDate}
                </span>
              )}
            </div>

            <p className="text-[11px] text-[#b8a4aa] leading-relaxed">
              {t.authenticityCertifiedDesc}
            </p>

            {/* Two Verification Tracks breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-[#d4af37]/15">
              <div className={`p-2.5 rounded-lg border flex items-center gap-2.5 text-xs ${
                profile.isVerifiedPhone 
                  ? 'bg-emerald-950/40 border-emerald-500/35 text-emerald-200' 
                  : 'bg-zinc-900/40 border-zinc-700/30 text-zinc-400'
              }`}>
                <div className={`p-1 rounded-full ${profile.isVerifiedPhone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[11px] leading-tight">
                    {t.phoneVerifiedBadge}
                  </p>
                  <p className="text-[10px] text-zinc-400 truncate">
                    {profile.isVerifiedPhone ? 'Validé par code SMS OTP (+212)' : t.phonePendingTooltip}
                  </p>
                </div>
              </div>

              <div className={`p-2.5 rounded-lg border flex items-center gap-2.5 text-xs ${
                profile.isVerifiedId 
                  ? 'bg-amber-950/40 border-[#d4af37]/35 text-[#fce0a2]' 
                  : 'bg-zinc-900/40 border-zinc-700/30 text-zinc-400'
              }`}>
                <div className={`p-1 rounded-full ${profile.isVerifiedId ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'bg-zinc-800 text-zinc-500'}`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[11px] leading-tight">
                    {t.idVerifiedBadge}
                  </p>
                  <p className="text-[10px] text-zinc-400 truncate">
                    {profile.isVerifiedId ? 'Déclaration solennelle certifiée' : t.idPendingTooltip}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dossier Content Grid */}
          <div className="space-y-6 text-sm">
            
            {/* 1. Vision du Mariage */}
            <div className="bg-[#20121a]/60 border border-[#d4af37]/15 rounded-2xl p-4">
              <h3 className="text-xs font-serif font-semibold text-[#d4af37] uppercase tracking-wider mb-2 flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#f472b6]" />
                <span>{t.marriageVisionLabel}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#f8ede8] italic leading-relaxed">
                « {profile.marriageVision} »
              </p>
            </div>

            {/* 2. Données Personnelles et Matrimoniales */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#20131b] border border-[#d4af37]/15">
                <span className="text-[10px] text-[#a89098] uppercase font-serif block">{t.maritalStatusHeader}</span>
                <span className="text-xs font-medium text-[#f8ede8] mt-0.5 block">{displayMaritalStatus}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#20131b] border border-[#d4af37]/15">
                <span className="text-[10px] text-[#a89098] uppercase font-serif block">{t.educationHeader}</span>
                <span className="text-xs font-medium text-[#f8ede8] mt-0.5 block">{displayEducation}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#20131b] border border-[#d4af37]/15">
                <span className="text-[10px] text-[#a89098] uppercase font-serif block">{t.childrenHeader}</span>
                <span className="text-xs font-medium text-[#f8ede8] mt-0.5 block">
                  {profile.children === 0 ? t.noChildren : `${profile.children} ${t.hasChildren}`}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#20131b] border border-[#d4af37]/15">
                <span className="text-[10px] text-[#a89098] uppercase font-serif block">{t.heightHeader}</span>
                <span className="text-xs font-medium text-[#f8ede8] mt-0.5 block">{profile.heightCm} cm</span>
              </div>
              <div className="p-3 rounded-xl bg-[#20131b] border border-[#d4af37]/15">
                <span className="text-[10px] text-[#a89098] uppercase font-serif block">{t.practiceHeader}</span>
                <span className="text-xs font-medium text-[#f8ede8] mt-0.5 block">{profile.religiousPractice}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#20131b] border border-[#d4af37]/15">
                <span className="text-[10px] text-[#a89098] uppercase font-serif block">{t.familyFrameworkHeader}</span>
                <span className="text-xs font-medium text-[#f8ede8] mt-0.5 block">
                  {profile.waliContactAvailable ? t.waliAvailable : t.autonomousRespect}
                </span>
              </div>
            </div>

            {/* 3. Présentation & Mode de Vie */}
            <div className="p-4 rounded-2xl bg-[#20131b] border border-[#d4af37]/15">
              <h3 className="text-xs font-serif font-semibold text-[#d4af37] uppercase tracking-wider mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#d4af37]" />
                <span>{t.presentationLifestyleTitle}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#d6c4c9] leading-relaxed mb-3">
                {profile.bio}
              </p>
              <div className="text-xs text-[#b8a4aa] bg-[#170e14] p-3 rounded-xl border border-[#d4af37]/10">
                <strong className="text-[#fce0a2] block mb-1">{t.lifestyleLabel}</strong>
                {profile.lifestyle}
              </div>
            </div>

            {/* 4. Centres d'Intérêt & Passions (Zero-Pill discipline) */}
            <div className="p-4 rounded-2xl bg-[#20131b] border border-[#d4af37]/15">
              <h3 className="text-xs font-serif font-semibold text-[#d4af37] uppercase tracking-wider mb-2">
                {t.interestsLabel}
              </h3>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-[#f8ede8]">
                {profile.interests.map((interest, idx) => {
                  const displayInterest = lang === 'ar' ? (INTERESTS_ARABIC[interest] || interest) : interest;
                  return (
                    <React.Fragment key={interest}>
                      {idx > 0 && <span aria-hidden="true" className="text-[#d4af37]/40">·</span>}
                      <span className="font-medium text-[#fce0a2]">{displayInterest}</span>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* 5. Étape Fiançailles & Seuil des Familles (Khitba) - Official CIN Stage */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#2a1622]/90 via-[#21111b]/90 to-[#190e15]/90 border border-[#d4af37]/35 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#fce0a2] uppercase tracking-wider">
                  <HeartHandshake className="w-4 h-4 text-[#f472b6]" />
                  <span>{t.familyStageCINSectionTitle}</span>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 text-[#fce0a2] border border-[#d4af37]/30 font-medium">
                  {lang === 'ar' ? 'شفافية عائلية رسمية' : 'Transparence Officielle'}
                </span>
              </div>

              <p className="text-xs text-[#d6c4c9] leading-relaxed">
                {t.familyStageCINSectionDesc}
              </p>

              {familyStageRequested ? (
                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/40 flex items-center gap-2.5 text-xs text-emerald-300 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-medium">{t.familyStageActivatedSuccess}</span>
                </div>
              ) : (
                <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-[11px] text-[#a89098]">
                    {lang === 'ar'
                      ? '• بطاقة التعريف الوطنية (CIN) والتنسيق العائلي يُطلب ويُتبادل حصرياً في هذه الخطوة.'
                      : '• La CIN et le contact tuteur/famille sont échangés exclusivement lors de ce jalon solennel.'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFamilyStageRequested(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37]/25 to-[#aa771c]/25 hover:from-[#d4af37]/35 hover:to-[#aa771c]/35 border border-[#d4af37]/50 text-xs font-semibold text-[#fce0a2] transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{t.familyStageCINBtn}</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Blocked User Safety Alert Banner */}
          {isBlocked && (
            <div className="mt-6 p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 flex items-center justify-between gap-3 text-xs text-rose-200 animate-fadeIn">
              <div className="flex items-center gap-2.5">
                <Ban className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="leading-relaxed">{t.userBlockedNotice}</span>
              </div>
              <button
                onClick={() => onToggleBlock && onToggleBlock(profile)}
                className="px-3 py-1.5 rounded-xl bg-rose-900/70 hover:bg-rose-800 border border-rose-400/50 text-xs font-semibold text-white transition-colors cursor-pointer shrink-0 whitespace-nowrap"
              >
                {t.unblockUserBtn}
              </button>
            </div>
          )}

          {/* Action CTAs & Reporting */}
          <div className="mt-8 pt-4 border-t border-[#d4af37]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => onReportProfile(profile)}
                className="text-xs text-[#a89098] hover:text-[#f472b6] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{t.reportMisconductBtn}</span>
              </button>

              <button
                onClick={() => {
                  if (isBlocked) {
                    onToggleBlock && onToggleBlock(profile);
                  } else {
                    setShowConfirmBlock(true);
                  }
                }}
                className={`text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isBlocked ? 'text-rose-400 hover:text-rose-300 font-medium' : 'text-[#a89098] hover:text-rose-400'
                }`}
              >
                {isBlocked ? <UserCheck className="w-3.5 h-3.5 text-rose-400" /> : <UserX className="w-3.5 h-3.5" />}
                <span>{isBlocked ? t.unblockUserBtn : t.blockUserBtn}</span>
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-[#d4af37]/30 text-xs font-medium text-[#f8ede8] hover:bg-[#d4af37]/10 transition-colors cursor-pointer"
              >
                {t.backBtn}
              </button>

              {isBlocked ? (
                <button
                  onClick={() => onToggleBlock && onToggleBlock(profile)}
                  className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-xs font-medium text-zinc-300 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  title={t.userBlockedNotice}
                >
                  <Ban className="w-4 h-4 text-rose-400" />
                  <span>{t.unblockUserBtn}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onStartChat(profile);
                  }}
                  className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#fce0a2] via-[#d4af37] to-[#b38728] hover:from-[#fff0cd] hover:to-[#c69a35] text-xs font-semibold text-[#160d13] shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#160d13]" />
                  <span>{t.startExchangeBtn}</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Confirmation Dialog for Blocking */}
      {showConfirmBlock && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#1e111a] border border-rose-500/40 rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl shadow-black">
            <div className="w-12 h-12 rounded-full bg-rose-950/60 border border-rose-500/50 flex items-center justify-center mx-auto text-rose-400">
              <UserX className="w-6 h-6" />
            </div>

            <h4 className="text-base font-serif font-bold text-[#fff8f0]">
              {t.confirmBlockTitle}
            </h4>

            <p className="text-xs text-[#d6c4c9] leading-relaxed">
              {t.confirmBlockDesc}
            </p>

            <div className="pt-2 flex items-center gap-3 justify-center">
              <button
                type="button"
                onClick={() => setShowConfirmBlock(false)}
                className="px-4 py-2 rounded-xl border border-[#d4af37]/30 text-xs font-medium text-[#f8ede8] hover:bg-white/5 transition-colors cursor-pointer"
              >
                {t.cancelBtn}
              </button>

              <button
                type="button"
                onClick={() => {
                  onToggleBlock && onToggleBlock(profile);
                  setShowConfirmBlock(false);
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white shadow-md shadow-rose-900/40 transition-colors cursor-pointer"
              >
                {t.confirmBlockBtn}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
