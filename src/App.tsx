/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShieldCheck, HeartHandshake, Sparkles, Users, 
  Lock, Heart, Smartphone, Ban
} from 'lucide-react';
import { UserProfile, FilterState, Conversation, PioneerStats } from './types';
import { INITIAL_PROFILES, INITIAL_CONVERSATIONS } from './data/mockProfiles';
import { Language, TRANSLATIONS, INTERESTS_ARABIC, PROFESSIONS_ARABIC, CITIES_ARABIC } from './i18n/translations';
import { Header } from './components/Header';
import { PioneerBanner } from './components/PioneerBanner';
import { FilterBar } from './components/FilterBar';
import { ProfileCard } from './components/ProfileCard';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { VerificationModal } from './components/VerificationModal';
import { ChatModal } from './components/ChatModal';
import { EthicalCharterModal } from './components/EthicalCharterModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { MobileAppModal } from './components/MobileAppModal';
import { ReportModal } from './components/ReportModal';
import { BottomNav } from './components/BottomNav';
import { FloatingProfilesWelcome } from './components/FloatingProfilesWelcome';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { subscribeQuota, loadMember, QUOTA_MAX } from './services/registration';

export default function App() {
  // Language State with persistence in localStorage and HTML dir attribute
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('mithaq_lang');
      if (saved === 'ar' || saved === 'fr') return saved;
    } catch {
      // fallback
    }
    return 'fr';
  });

  const t = TRANSLATIONS[lang];

  // Floating Welcome animation state (launches at app opening, can be replayed)
  const [showFloatingWelcome, setShowFloatingWelcome] = useState(true);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('mithaq_lang', lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const handleToggleLanguage = (newLang: Language) => {
    setLang(newLang);
  };

  // Profiles & User State
  const [profiles, setProfiles] = useState<UserProfile[]>(INITIAL_PROFILES);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Favorites State with persistence in localStorage
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mithaq_favorites');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['prof-1', 'prof-2'];
  });

  const toggleFavorite = (profileId: string) => {
    setFavoriteIds((prev) => {
      const updated = prev.includes(profileId)
        ? prev.filter((id) => id !== profileId)
        : [...prev, profileId];
      try {
        localStorage.setItem('mithaq_favorites', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Blocked Users State with localStorage persistence for safety & comfort
  const [blockedUserIds, setBlockedUserIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mithaq_blocked_users');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleToggleBlockUser = (userId: string, userName?: string) => {
    setBlockedUserIds((prev) => {
      const isBlocked = prev.includes(userId);
      const updated = isBlocked
        ? prev.filter((id) => id !== userId)
        : [...prev, userId];
      try {
        localStorage.setItem('mithaq_blocked_users', JSON.stringify(updated));
      } catch {
        // ignore
      }
      showToast(isBlocked ? t.userUnblockedSuccessToast : t.userBlockedSuccessToast);
      return updated;
    });
  };
  
  // Pioneer Quota State (100 Hommes & 100 Femmes Gratuits, puis 100 DH/an)
  const [pioneerStats, setPioneerStats] = useState<PioneerStats>({
    menRegistered: 0,
    menMax: QUOTA_MAX,
    womenRegistered: 0,
    womenMax: QUOTA_MAX,
    annualFeeDH: 100
  });

  // Compteurs réels des places gratuites (Firestore, temps réel)
  useEffect(() => {
    return subscribeQuota((q) =>
      setPioneerStats((prev) => ({ ...prev, menRegistered: q.men, womenRegistered: q.women }))
    );
  }, []);

  // Restauration de la session : un membre déjà inscrit retrouve son profil
  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentUser(null);
        return;
      }
      try {
        const member = await loadMember(user.uid);
        if (member) setCurrentUser(member);
      } catch {
        // hors-ligne ou règles : l'utilisateur reste visiteur
      }
    });
  }, []);

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    gender: 'tous',
    city: 'toutes',
    minAge: 20,
    maxAge: 65,
    education: 'tous',
    maritalStatus: 'tous',
    selectedInterests: [],
    onlyVerified: true,
    onlyFavorites: false,
    searchQuery: '',
    searchScope: 'all'
  });

  // Navigation & Active View
  const [activeTab, setActiveTab] = useState<'profiles' | 'chat' | 'charter' | 'pricing'>('profiles');

  // Modals
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCharterOpen, setIsCharterOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isAppGuideOpen, setIsAppGuideOpen] = useState(false);
  const [reportingProfile, setReportingProfile] = useState<UserProfile | null>(null);

  // Chat State
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(INITIAL_CONVERSATIONS[0]);
  const [chatTargetProfile, setChatTargetProfile] = useState<UserProfile | null>(null);

  // Filtered Profiles Calculation
  const filteredProfiles = useMemo(() => {
    // Normalization helper for diacritics, case-insensitivity, and Arabic variations
    const cleanStr = (str: string = ''): string => {
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
    };

    return profiles.filter((profile) => {
      // Gender filter
      if (filters.gender !== 'tous' && profile.gender !== filters.gender) {
        return false;
      }

      // City filter
      if (filters.city !== 'toutes' && profile.city !== filters.city) {
        return false;
      }

      // Age range
      if (profile.age < filters.minAge || profile.age > filters.maxAge) {
        return false;
      }

      // Education level
      if (filters.education !== 'tous' && profile.education !== filters.education) {
        return false;
      }

      // Marital status
      if (filters.maritalStatus !== 'tous' && profile.maritalStatus !== filters.maritalStatus) {
        return false;
      }

      // Only verified profiles (at least one verification: Phone or ID)
      if (filters.onlyVerified && !profile.isVerifiedId && !profile.isVerifiedPhone) {
        return false;
      }

      // Favorites filter
      if (filters.onlyFavorites && !favoriteIds.includes(profile.id)) {
        return false;
      }

      // Blocked users filter (safety first: blocked profiles are hidden from discovery feed)
      if (blockedUserIds.includes(profile.id)) {
        return false;
      }

      // Robust Search Query (Profession, Interests, City, Bio, Name)
      if (filters.searchQuery.trim() !== '') {
        const queryTokens = cleanStr(filters.searchQuery).split(/\s+/).filter(Boolean);
        const scope = filters.searchScope || 'all';

        // 1. Prepare Profession Corpus (French + Arabic + Common Field Synonyms)
        const profFr = cleanStr(profile.profession);
        const indFr = cleanStr(profile.industry);
        const profAr = PROFESSIONS_ARABIC[profile.profession] ? cleanStr(PROFESSIONS_ARABIC[profile.profession]) : '';
        let professionCorpus = `${profFr} ${indFr} ${profAr} `;

        if (profFr.includes('medecin') || profFr.includes('cardiologue') || profFr.includes('pharmacien') || indFr.includes('sante')) {
          professionCorpus += 'docteur doctor medecin cardiologue pharmacien sante طبيب دكتور صيدلي صيدلية صحة علاج ';
        }
        if (profFr.includes('ingenieur') || indFr.includes('tech') || indFr.includes('informatique')) {
          professionCorpus += 'ingenieur tech informatique developpeur intelligence artificielle ia software data web مهندس تكنولوجيا معلوميات ذكاء اصطناعي ';
        }
        if (profFr.includes('architecte') || indFr.includes('architecture') || indFr.includes('urbanisme')) {
          professionCorpus += 'architecte architecture design urbanisme btp patrimoine مهندس معماري عمارة تصميم عمران ';
        }
        if (profFr.includes('avocat') || profFr.includes('juriste') || indFr.includes('droit')) {
          professionCorpus += 'avocat avocate notaire magistrat juriste droit affaires محام محامي مستشار قانوني قضاء ';
        }
        if (profFr.includes('finance') || profFr.includes('consultant') || profFr.includes('strategie') || indFr.includes('finance')) {
          professionCorpus += 'consultant finance banque audit gestion comptable strategie مستشار مالية ابناك تدبير خبير محاسب ';
        }
        if (profFr.includes('enseignant') || profFr.includes('chercheur') || profFr.includes('professeur')) {
          professionCorpus += 'enseignant chercheur professeur universite sciences استاد استاذ باحث تعليم تدريس ';
        }
        if (profFr.includes('entreprise') || profFr.includes('entrepreneur')) {
          professionCorpus += 'chef entreprise entrepreneur commerce business مقاولة رائد اعمال تجارة ';
        }

        // 2. Prepare Interests Corpus (French + Arabic translations)
        const interestsFr = profile.interests.map(cleanStr).join(' ');
        const interestsAr = profile.interests.map(i => INTERESTS_ARABIC[i] ? cleanStr(INTERESTS_ARABIC[i]) : '').join(' ');
        const interestsCorpus = `${interestsFr} ${interestsAr}`;

        // Scope check
        if (scope === 'profession') {
          const matchesProf = queryTokens.every(token => professionCorpus.includes(token));
          if (!matchesProf) return false;
        } else if (scope === 'interests') {
          const matchesInterests = queryTokens.every(token => interestsCorpus.includes(token));
          if (!matchesInterests) return false;
        } else {
          // Scope 'all': check profession, interests, name, city, bio, marriage vision
          const nameFr = cleanStr(profile.fullName);
          const cityFr = cleanStr(profile.city);
          const cityAr = CITIES_ARABIC[profile.city] ? cleanStr(CITIES_ARABIC[profile.city]) : '';
          const bioFr = cleanStr(profile.bio);
          const visionFr = cleanStr(profile.marriageVision);
          const eduFr = cleanStr(profile.education);

          const fullCorpus = `${professionCorpus} ${interestsCorpus} ${nameFr} ${cityFr} ${cityAr} ${bioFr} ${visionFr} ${eduFr}`;
          const matchesAll = queryTokens.every(token => fullCorpus.includes(token));
          if (!matchesAll) return false;
        }
      }

      // Interests filter
      if (filters.selectedInterests.length > 0) {
        const hasInterest = filters.selectedInterests.some((interest) =>
          profile.interests.includes(interest)
        );
        if (!hasInterest) return false;
      }

      return true;
    });
  }, [profiles, filters, favoriteIds, blockedUserIds]);

  // Handlers
  const handleOpenChatWithProfile = (profile: UserProfile) => {
    setChatTargetProfile(profile);
    const existing = conversations.find(c => c.participantId === profile.id);
    if (existing) {
      setActiveConversation(existing);
    } else {
      const greeting = lang === 'ar'
        ? `السلام عليكم ورحمة الله. تم بدء طلب الحوار الزوجي بكل احترام ووقار.`
        : `Salam aleykoum. Demande d'échange matrimonial initiée avec respect.`;

      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        participantId: profile.id,
        participantName: profile.fullName,
        participantAvatar: profile.photoUrl,
        participantCity: profile.city,
        participantAge: profile.age,
        participantProfession: profile.profession,
        lastMessage: greeting,
        lastMessageTime: lang === 'ar' ? 'الآن' : 'À l’instant',
        unreadCount: 0,
        isVerified: profile.isVerifiedId,
        photoRevealed: !profile.isPhotoBlurred
      };
      setConversations([newConv, ...conversations]);
      setActiveConversation(newConv);
    }
    setIsChatOpen(true);
  };

  const handleVerificationComplete = (newProfile: UserProfile, isFreePioneer: boolean) => {
    // Les compteurs viennent de Firestore (abonnement temps réel) : pas d'incrément local.
    setCurrentUser(newProfile);
    setProfiles([newProfile, ...profiles]);
  };

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <div className={`min-h-screen bg-[#0d080b] text-[#f8ede8] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#fff8f0] ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* Top Navigation Bar */}
      <Header
        currentUser={currentUser}
        onOpenVerification={() => setIsVerificationOpen(true)}
        onOpenChat={() => {
          setIsChatOpen(true);
          setActiveTab('chat');
        }}
        onOpenCharter={() => {
          setIsCharterOpen(true);
          setActiveTab('charter');
        }}
        onOpenPricing={() => {
          setIsPricingOpen(true);
          setActiveTab('pricing');
        }}
        onOpenAppGuide={() => setIsAppGuideOpen(true)}
        onToggleFavorites={() => {
          setFilters((prev) => ({ ...prev, onlyFavorites: !prev.onlyFavorites }));
        }}
        isFavoritesView={filters.onlyFavorites}
        favoritesCount={favoriteIds.length}
        unreadCount={totalUnreadMessages}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        onToggleLanguage={handleToggleLanguage}
        t={t}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12 space-y-8">
        
        {/* Editorial Hero Banner */}
        <section className="relative overflow-hidden rounded-3xl border border-[#d4af37]/30 bg-radial-prestige p-6 sm:p-10 lg:p-12 text-center lg:text-left rtl:lg:text-right flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="max-w-2xl">
            {/* Editorial Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-xs text-[#fce0a2] font-serif mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{t.heroKicker}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#fff8f0] tracking-tight leading-tight">
              {t.heroTitle1} <span className="text-gold-gradient">{t.heroTitleHighlight1}</span> {t.heroTitleAnd} <span className="text-rose-gold">{t.heroTitleHighlight2}</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-[#d6c4c9] leading-relaxed max-w-xl">
              {t.heroSubtitle}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start rtl:lg:justify-start gap-4">
              <button
                onClick={() => setIsVerificationOpen(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#fce0a2] via-[#d4af37] to-[#b38728] hover:from-[#fff0cd] hover:to-[#c69a35] text-xs sm:text-sm font-semibold text-[#160d13] shadow-lg shadow-[#d4af37]/25 flex items-center gap-2 cursor-pointer transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-[#160d13]" />
                <span>{t.heroJoinBtn}</span>
              </button>

              <button
                onClick={() => setIsCharterOpen(true)}
                className="px-5 py-3 rounded-xl border border-[#d4af37]/40 hover:border-[#d4af37] text-xs sm:text-sm font-medium text-[#f8ede8] hover:bg-[#d4af37]/10 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-[#f472b6]" />
                <span>{t.heroCharterBtn}</span>
              </button>
            </div>
          </div>

          {/* Prestige Key Pillars Box */}
          <div className="w-full lg:w-80 p-5 rounded-2xl bg-[#190f16]/90 border border-[#d4af37]/25 shadow-xl space-y-3.5 text-left rtl:text-right">
            <div className="text-xs font-serif font-semibold text-[#d4af37] uppercase tracking-wider">
              {t.pillarsTitle}
            </div>
            
            <div className="flex items-start gap-2.5 text-xs text-[#d6c4c9]">
              <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <span>{t.pillar1}</span>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-[#d6c4c9]">
              <Lock className="w-4 h-4 text-[#f472b6] shrink-0 mt-0.5" />
              <span>{t.pillar2}</span>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-[#d6c4c9]">
              <Heart className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <span>{t.pillar3}</span>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-[#d6c4c9]">
              <Smartphone className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
              <span>{t.pillar4}</span>
            </div>
          </div>

        </section>

        {/* Pioneer Quotas Live Counter */}
        <PioneerBanner
          stats={pioneerStats}
          onJoinPioneers={() => setIsVerificationOpen(true)}
          onOpenPricing={() => setIsPricingOpen(true)}
          t={t}
          lang={lang}
        />

        {/* Filter Bar with Interests, Exact Location & Favorites */}
        <FilterBar
          filters={filters}
          onChange={setFilters}
          totalResults={filteredProfiles.length}
          favoritesCount={favoriteIds.length}
          t={t}
          lang={lang}
        />

        {/* Active Favorites Banner if onlyFavorites is enabled */}
        {filters.onlyFavorites && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#281320] via-[#20111a] to-[#180e15] border border-[#f472b6]/40 shadow-lg shadow-black/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#f472b6]/20 border border-[#f472b6]/50 flex items-center justify-center text-[#f472b6] shrink-0">
                <Heart className="w-5 h-5 fill-[#f472b6]" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-[#f8ede8] flex items-center gap-2">
                  <span>{t.favoritesActiveBannerTitle}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#f472b6]/20 text-[#f472b6] font-mono text-[10px]">
                    {favoriteIds.length}
                  </span>
                </h3>
                <p className="text-[11px] text-[#b8a4aa]">
                  {t.favoritesActiveBannerDesc}
                </p>
              </div>
            </div>
            <button
              onClick={() => setFilters((f) => ({ ...f, onlyFavorites: false }))}
              className="text-xs text-[#fce0a2] hover:underline cursor-pointer font-medium whitespace-nowrap self-start sm:self-auto"
            >
              {t.showAllProfilesBtn}
            </button>
          </div>
        )}

        {/* Blocked Profiles Safety Banner */}
        {blockedUserIds.length > 0 && (
          <div className="mb-4 p-3.5 rounded-2xl bg-[#221019] border border-rose-500/35 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-rose-300 animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <Ban className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                {blockedUserIds.length} {lang === 'ar' ? 'عضو في قائمة الحظر الخاصة بك (ملفاتهم مخفية من البحث والمراسلة)' : 'profil(s) masqué(s) de votre recherche et messagerie (bloqué(s))'}
              </span>
            </div>
            <button
              onClick={() => {
                setBlockedUserIds([]);
                try {
                  localStorage.removeItem('mithaq_blocked_users');
                } catch {
                  // ignore
                }
                showToast(lang === 'ar' ? 'تمت إعادة ضبط قائمة الحظر وإلغاء حظر الجميع' : 'Tous les profils ont été débloqués.');
              }}
              className="text-xs text-rose-200 underline hover:text-white font-medium cursor-pointer self-end sm:self-auto"
            >
              {lang === 'ar' ? 'إلغاء حظر الكل' : 'Débloquer tous les profils'}
            </button>
          </div>
        )}

        {/* Profiles Grid */}
        <section aria-label="Profils matrimoniaux certifiés">
          {filteredProfiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  isFavorite={favoriteIds.includes(profile.id)}
                  onToggleFavorite={toggleFavorite}
                  onViewProfile={(p) => setSelectedProfile(p)}
                  onStartChat={handleOpenChatWithProfile}
                  t={t}
                  lang={lang}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-3xl border border-[#d4af37]/20 bg-[#160e14]">
              {filters.onlyFavorites ? (
                <>
                  <Heart className="w-12 h-12 text-[#f472b6]/40 mx-auto mb-3" />
                  <h3 className="font-serif text-lg font-semibold text-[#f8ede8]">
                    {t.noFavoritesFound}
                  </h3>
                  <p className="text-xs text-[#b8a4aa] mt-1 max-w-sm mx-auto">
                    {t.noFavoritesDesc}
                  </p>
                  <button
                    onClick={() => setFilters((f) => ({ ...f, onlyFavorites: false }))}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#fce0a2] via-[#d4af37] to-[#b38728] text-xs font-semibold text-[#160d13] cursor-pointer shadow-md"
                  >
                    {t.discoverProfilesBtn}
                  </button>
                </>
              ) : (
                <>
                  <Users className="w-12 h-12 text-[#d4af37]/40 mx-auto mb-3" />
                  <h3 className="font-serif text-lg font-semibold text-[#f8ede8]">
                    {t.noResultsFound}
                  </h3>
                  <p className="text-xs text-[#b8a4aa] mt-1 max-w-sm mx-auto">
                    {t.noResultsDesc}
                  </p>
                  <button
                    onClick={() => setFilters({
                      gender: 'tous',
                      city: 'toutes',
                      minAge: 20,
                      maxAge: 65,
                      education: 'tous',
                      maritalStatus: 'tous',
                      selectedInterests: [],
                      onlyVerified: true,
                      onlyFavorites: false,
                      searchQuery: ''
                    })}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 text-xs font-semibold text-[#fce0a2] hover:bg-[#d4af37]/30 transition-colors cursor-pointer"
                  >
                    {t.resetFilters}
                  </button>
                </>
              )}
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#d4af37]/20 bg-[#10090e] py-8 text-xs text-[#a89098]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-[#fce0a2] text-sm">{t.appName}</span>
            <span aria-hidden="true" className="text-[#d4af37]/40">·</span>
            <span>{t.footerPlatformSubtitle}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px]">
            <button 
              onClick={() => setIsCharterOpen(true)}
              className="hover:text-[#f8ede8] transition-colors cursor-pointer"
            >
              {t.navCharter}
            </button>
            <button 
              onClick={() => setIsPricingOpen(true)}
              className="hover:text-[#f8ede8] transition-colors cursor-pointer"
            >
              {t.pioneerDetailsFee}
            </button>
            <button 
              onClick={() => setIsAppGuideOpen(true)}
              className="hover:text-[#f8ede8] transition-colors cursor-pointer"
            >
              {t.navMobileApp}
            </button>
          </div>

          <div>
            © {new Date().getFullYear()} {t.footerRights}
          </div>
        </div>
      </footer>

      {/* Bottom Mobile Tab Bar */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'chat') setIsChatOpen(true);
          if (tab === 'charter') setIsCharterOpen(true);
          if (tab === 'pricing') setIsPricingOpen(true);
        }}
        isFavoritesOnly={filters.onlyFavorites}
        onToggleFavorites={() => setFilters((prev) => ({ ...prev, onlyFavorites: !prev.onlyFavorites }))}
        favoritesCount={favoriteIds.length}
        unreadCount={totalUnreadMessages}
        t={t}
        lang={lang}
      />

      {/* Modals */}
      <ProfileDetailModal
        profile={selectedProfile}
        isFavorite={selectedProfile ? favoriteIds.includes(selectedProfile.id) : false}
        onToggleFavorite={toggleFavorite}
        onClose={() => setSelectedProfile(null)}
        onStartChat={handleOpenChatWithProfile}
        onReportProfile={(p) => setReportingProfile(p)}
        isBlocked={selectedProfile ? blockedUserIds.includes(selectedProfile.id) : false}
        onToggleBlock={(p) => handleToggleBlockUser(p.id, p.fullName)}
        t={t}
        lang={lang}
      />

      <VerificationModal
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
        onVerificationComplete={handleVerificationComplete}
        menRemaining={Math.max(0, pioneerStats.menMax - pioneerStats.menRegistered)}
        womenRemaining={Math.max(0, pioneerStats.womenMax - pioneerStats.womenRegistered)}
        t={t}
        lang={lang}
      />

      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        activeConversation={activeConversation}
        targetProfile={chatTargetProfile}
        currentUser={currentUser}
        conversations={conversations}
        blockedUserIds={blockedUserIds}
        onToggleBlockUser={handleToggleBlockUser}
        onSelectConversation={(conv) => {
          setActiveConversation(conv);
          const found = profiles.find(p => p.id === conv.participantId) || null;
          setChatTargetProfile(found);
        }}
        t={t}
        lang={lang}
      />

      <EthicalCharterModal
        isOpen={isCharterOpen}
        onClose={() => setIsCharterOpen(false)}
        onAcceptCharter={() => {
          if (!currentUser) setIsVerificationOpen(true);
        }}
        t={t}
        lang={lang}
      />

      <SubscriptionModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        stats={pioneerStats}
        onStartRegistration={() => setIsVerificationOpen(true)}
        t={t}
        lang={lang}
      />

      <MobileAppModal
        isOpen={isAppGuideOpen}
        onClose={() => setIsAppGuideOpen(false)}
        t={t}
        lang={lang}
      />

      <ReportModal
        profile={reportingProfile}
        onClose={() => setReportingProfile(null)}
        t={t}
        lang={lang}
      />

      {/* Floating Welcome Animation (boys and girls floating from bottom to top upon app open) */}
      {showFloatingWelcome && (
        <FloatingProfilesWelcome
          onDismiss={() => setShowFloatingWelcome(false)}
          lang={lang}
          t={t}
        />
      )}

      {/* Floating Replay Trigger when welcome animation is closed */}
      {!showFloatingWelcome && (
        <button
          type="button"
          onClick={() => setShowFloatingWelcome(true)}
          className="fixed bottom-20 sm:bottom-6 left-5 rtl:left-auto rtl:right-5 z-30 px-3 py-2 rounded-full bg-[#1b1018]/90 hover:bg-[#281522] border border-[#d4af37]/40 text-[#fce0a2] shadow-xl shadow-black flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer backdrop-blur-md text-xs group"
          title={t.replayFloatingBtn}
          aria-label={t.replayFloatingBtn}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
          <span className="hidden sm:inline font-serif font-medium">
            {t.replayFloatingBtn}
          </span>
        </button>
      )}

      {/* Floating Safety Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-70 px-4 py-2.5 rounded-2xl bg-[#1e111a] border border-[#d4af37]/40 text-xs sm:text-sm text-[#fce0a2] shadow-2xl shadow-black flex items-center gap-2.5 animate-fadeIn pointer-events-none">
          <Ban className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
