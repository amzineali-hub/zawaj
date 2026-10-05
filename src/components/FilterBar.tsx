import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Search, MapPin, SlidersHorizontal, Check, X, 
  ShieldCheck, Heart, Briefcase, Sparkles, RotateCcw
} from 'lucide-react';
import { FilterState } from '../types';
import { ALL_INTERESTS, CITIES_LIST, PROFESSIONS_LIST } from '../data/mockProfiles';
import { 
  Translations, Language, CITIES_ARABIC, INTERESTS_ARABIC, 
  EDUCATION_ARABIC, MARITAL_STATUS_ARABIC, PROFESSIONS_ARABIC 
} from '../i18n/translations';

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalResults: number;
  favoritesCount: number;
  t: Translations;
  lang: Language;
}

// Popular Profession shortcuts directly available on the main interface
const POPULAR_PROFESSIONS = [
  { id: 'medecin', fr: 'Médecin / Santé', ar: 'طبيب / صحة', query: 'Médecin' },
  { id: 'ingenieur', fr: 'Ingénieur d’État', ar: 'مهندس دولة', query: 'Ingénieur' },
  { id: 'architecte', fr: 'Architecte / Design', ar: 'معماري / تصميم', query: 'Architecte' },
  { id: 'avocat', fr: 'Avocat / Juriste', ar: 'محامٍ / قانون', query: 'Avocat' },
  { id: 'finance', fr: 'Finance & Conseil', ar: 'مالية واستشارات', query: 'Finance' },
  { id: 'chercheur', fr: 'Enseignant / Chercheur', ar: 'أستاذ / باحث', query: 'Enseignant' },
  { id: 'entrepreneur', fr: 'Chef d’Entreprise', ar: 'رائد أعمال', query: 'Entreprise' },
  { id: 'pharmacien', fr: 'Pharmacien(ne)', ar: 'صيدلي(ة)', query: 'Pharmacien' }
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  totalResults,
  favoritesCount,
  t,
  lang
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGenderChange = (gender: 'tous' | 'homme' | 'femme') => {
    onChange({ ...filters, gender });
  };

  const handleCityChange = (city: string) => {
    onChange({ ...filters, city });
  };

  const toggleOnlyFavorites = () => {
    onChange({ ...filters, onlyFavorites: !filters.onlyFavorites });
  };

  const handleScopeChange = (scope: 'all' | 'profession' | 'interests') => {
    onChange({ ...filters, searchScope: scope });
  };

  const handleClearSearch = () => {
    onChange({ ...filters, searchQuery: '', searchScope: 'all' });
  };

  const handleToggleProfessionChip = (profQuery: string) => {
    if (filters.searchQuery === profQuery && filters.searchScope === 'profession') {
      // Toggle off
      onChange({ ...filters, searchQuery: '', searchScope: 'all' });
    } else {
      // Set profession search
      onChange({ ...filters, searchQuery: profQuery, searchScope: 'profession' });
    }
  };

  const toggleInterest = (interest: string) => {
    const exists = filters.selectedInterests.includes(interest);
    const updated = exists
      ? filters.selectedInterests.filter(i => i !== interest)
      : [...filters.selectedInterests, interest];
    onChange({ ...filters, selectedInterests: updated });
  };

  const resetFilters = () => {
    onChange({
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
  };

  const hasActiveFilters = 
    filters.gender !== 'tous' || 
    filters.city !== 'toutes' || 
    filters.selectedInterests.length > 0 || 
    filters.searchQuery.trim() !== '' ||
    (filters.searchScope && filters.searchScope !== 'all') ||
    filters.education !== 'tous' ||
    filters.maritalStatus !== 'tous' ||
    filters.onlyFavorites;

  // Real-time suggestions for autocomplete popover
  const suggestions = useMemo(() => {
    const q = filters.searchQuery.trim().toLowerCase();
    if (!q || q.length < 1) {
      return { professions: [], interests: [] };
    }

    const matchedProfessions = POPULAR_PROFESSIONS.filter(p => {
      const matchFr = p.fr.toLowerCase().includes(q) || p.query.toLowerCase().includes(q);
      const matchAr = p.ar.includes(q);
      return matchFr || matchAr;
    });

    const matchedInterests = ALL_INTERESTS.filter(i => {
      const matchFr = i.toLowerCase().includes(q);
      const arLabel = INTERESTS_ARABIC[i] || '';
      const matchAr = arLabel.includes(q);
      return matchFr || matchAr;
    });

    return {
      professions: matchedProfessions.slice(0, 4),
      interests: matchedInterests.slice(0, 4)
    };
  }, [filters.searchQuery]);

  const hasSuggestions = isSearchFocused && filters.searchQuery.trim().length >= 1 && 
    (suggestions.professions.length > 0 || suggestions.interests.length > 0);

  const currentScope = filters.searchScope || 'all';

  return (
    <div className="bg-[#150d12]/95 border border-[#d4af37]/25 rounded-2xl p-4 sm:p-5 shadow-xl shadow-black/40 mb-8 backdrop-blur-md">
      
      {/* Primary Row: Robust Search Bar + City + Gender + Favorites + Advanced Drawer Toggle */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        
        {/* Robust Text Search Bar with Integrated Scope & Clear Controls */}
        <div ref={searchContainerRef} className="relative flex-1">
          <div className="relative flex items-center">
            {/* Search Icon with golden accent */}
            <div className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center text-[#d4af37]">
              <Search className="w-4 h-4" />
            </div>

            {/* Main Search Input */}
            <input
              type="text"
              placeholder={
                currentScope === 'profession'
                  ? (lang === 'ar' ? 'بحث حسب المهنة (مثال: طبيب، مهندس، معماري...)' : 'Rechercher une profession (ex: Médecin, Ingénieur, Avocat...)')
                  : currentScope === 'interests'
                  ? (lang === 'ar' ? 'بحث حسب الاهتمامات (مثال: أسفار، قراءة، طبيعة...)' : 'Rechercher un centre d’intérêt (ex: Voyages, Lecture, Art...)')
                  : t.searchPlaceholder
              }
              value={filters.searchQuery}
              onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full pl-10 pr-24 rtl:pr-10 rtl:pl-24 py-2.5 rounded-xl bg-[#20131b] border border-[#d4af37]/35 text-sm text-[#f8ede8] placeholder-zinc-400 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/30 transition-all text-left rtl:text-right shadow-inner"
            />

            {/* Right-aligned Input Controls: Results Badge + Clear Button */}
            <div className="absolute right-2 rtl:right-auto rtl:left-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-10">
              {filters.searchQuery.trim() !== '' && (
                <>
                  <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#2a1722] text-[#fce0a2] border border-[#d4af37]/25">
                    {totalResults} {t.searchFoundCount}
                  </span>
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    title={t.clearSearchBtn}
                    aria-label={t.clearSearchBtn}
                    className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Autocomplete Dropdown Popover */}
          {hasSuggestions && (
            <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#1a0f17] border border-[#d4af37]/40 rounded-xl shadow-2xl shadow-black/80 overflow-hidden divide-y divide-[#d4af37]/15 animate-fadeIn">
              {/* Profession Matches */}
              {suggestions.professions.length > 0 && (
                <div className="p-2.5">
                  <span className="text-[10px] font-serif uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5 mb-1.5">
                    <Briefcase className="w-3 h-3" />
                    <span>{t.matchingProfessions}</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.professions.map((p) => {
                      const label = lang === 'ar' ? p.ar : p.fr;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            onChange({ ...filters, searchQuery: p.query, searchScope: 'profession' });
                            setIsSearchFocused(false);
                          }}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#241420] hover:bg-[#d4af37] hover:text-[#140c12] border border-[#d4af37]/30 text-[#fce0a2] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Briefcase className="w-3 h-3 opacity-70" />
                          <span>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Interests Matches */}
              {suggestions.interests.length > 0 && (
                <div className="p-2.5">
                  <span className="text-[10px] font-serif uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>{t.matchingInterests}</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.interests.map((interest) => {
                      const displayInterest = lang === 'ar' ? (INTERESTS_ARABIC[interest] || interest) : interest;
                      return (
                        <button
                          key={interest}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            onChange({ ...filters, searchQuery: interest, searchScope: 'interests' });
                            setIsSearchFocused(false);
                          }}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#241420] hover:bg-[#d4af37] hover:text-[#140c12] border border-[#d4af37]/30 text-[#fce0a2] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3 opacity-70" />
                          <span>{displayInterest}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Localisation Précise (City Selector) */}
        <div className="relative min-w-[190px]">
          <MapPin className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]/70 pointer-events-none" />
          <select
            value={filters.city}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full pl-10 pr-8 rtl:pr-10 rtl:pl-8 py-2.5 rounded-xl bg-[#20131b] border border-[#d4af37]/25 text-sm text-[#f8ede8] appearance-none focus:outline-none focus:border-[#d4af37] cursor-pointer text-left rtl:text-right"
          >
            <option value="toutes">{t.allLocations}</option>
            {CITIES_LIST.map((city) => (
              <option key={city} value={city}>
                {lang === 'ar' ? (CITIES_ARABIC[city] || city) : city}
              </option>
            ))}
          </select>
          <span className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 pointer-events-none">▼</span>
        </div>

        {/* Gender Segmented Control */}
        <div className="flex items-center p-1 bg-[#20131b] rounded-xl border border-[#d4af37]/25 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => handleGenderChange('tous')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filters.gender === 'tous'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#b38728] text-[#120a0f] font-semibold shadow-sm'
                : 'text-[#d6c4c9] hover:text-[#f8ede8]'
            }`}
          >
            {t.genderAll}
          </button>
          <button
            type="button"
            onClick={() => handleGenderChange('femme')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              filters.gender === 'femme'
                ? 'bg-[#f472b6] text-[#1a0c14] font-semibold shadow-sm'
                : 'text-[#d6c4c9] hover:text-[#f8ede8]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f472b6]" />
            {t.genderWomen}
          </button>
          <button
            type="button"
            onClick={() => handleGenderChange('homme')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              filters.gender === 'homme'
                ? 'bg-[#38bdf8] text-[#081824] font-semibold shadow-sm'
                : 'text-[#d6c4c9] hover:text-[#f8ede8]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
            {t.genderMen}
          </button>
        </div>

        {/* Mes Favoris Quick Filter Button */}
        <button
          type="button"
          onClick={toggleOnlyFavorites}
          title={filters.onlyFavorites ? "Afficher tous les profils" : "Afficher uniquement mes profils favoris"}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            filters.onlyFavorites
              ? 'border-[#f472b6] bg-[#2a1420] text-[#f472b6] shadow-sm shadow-[#f472b6]/25 font-semibold'
              : 'border-[#d4af37]/25 bg-[#20131b] text-[#d6c4c9] hover:text-[#f472b6] hover:border-[#f472b6]/50'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${filters.onlyFavorites ? 'fill-[#f472b6] text-[#f472b6]' : ''}`} />
          <span>{t.favoritesBtn}</span>
          <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold font-mono ${
            filters.onlyFavorites 
              ? 'bg-[#f472b6] text-[#1a0c14]' 
              : 'bg-[#2a1722] text-[#fce0a2] border border-[#d4af37]/20'
          }`}>
            {favoritesCount}
          </span>
        </button>

        {/* Advanced Filters Button */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            showAdvanced || filters.selectedInterests.length > 0
              ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#fce0a2]'
              : 'border-[#d4af37]/25 bg-[#20131b] text-[#d6c4c9] hover:text-[#f8ede8]'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>{t.interestsBtn}</span>
          {filters.selectedInterests.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#d4af37] text-[#160d13] text-[10px] flex items-center justify-center font-bold">
              {filters.selectedInterests.length}
            </span>
          )}
        </button>

      </div>

      {/* Scope Selector Bar: Tout / Professions / Centres d'intérêt */}
      <div className="mt-3 pt-3 border-t border-[#d4af37]/15 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-[#d6c4c9]">
          <span className="text-[11px] font-serif text-[#d4af37] uppercase tracking-wider font-semibold">
            {t.searchByProfessionLabel} & {t.searchByInterestLabel} :
          </span>
          <div className="inline-flex p-0.5 rounded-lg bg-[#20131b] border border-[#d4af37]/20">
            <button
              type="button"
              onClick={() => handleScopeChange('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                currentScope === 'all'
                  ? 'bg-[#d4af37] text-[#140c12] font-semibold shadow-sm'
                  : 'text-[#d6c4c9] hover:text-[#f8ede8]'
              }`}
            >
              {t.searchScopeAll}
            </button>
            <button
              type="button"
              onClick={() => handleScopeChange('profession')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                currentScope === 'profession'
                  ? 'bg-[#d4af37] text-[#140c12] font-semibold shadow-sm'
                  : 'text-[#d6c4c9] hover:text-[#f8ede8]'
              }`}
            >
              <Briefcase className="w-3 h-3" />
              <span>{t.searchScopeProfession}</span>
            </button>
            <button
              type="button"
              onClick={() => handleScopeChange('interests')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                currentScope === 'interests'
                  ? 'bg-[#d4af37] text-[#140c12] font-semibold shadow-sm'
                  : 'text-[#d6c4c9] hover:text-[#f8ede8]'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>{t.searchScopeInterests}</span>
            </button>
          </div>
        </div>

        {/* Reset All Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-[11px] text-[#f472b6] hover:underline flex items-center gap-1 cursor-pointer font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.resetFilters}</span>
          </button>
        )}
      </div>

      {/* Row 1: Direct Filter by Popular Professions */}
      <div className="mt-2.5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Briefcase className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-xs font-medium text-[#fce0a2]">{t.popularProfessionTags}</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {POPULAR_PROFESSIONS.map((prof) => {
            const isProfActive = filters.searchQuery === prof.query && filters.searchScope === 'profession';
            const label = lang === 'ar' ? prof.ar : prof.fr;
            return (
              <button
                key={prof.id}
                onClick={() => handleToggleProfessionChip(prof.query)}
                type="button"
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isProfActive
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-[#12090e] font-semibold shadow-md shadow-[#d4af37]/25 ring-1 ring-[#fce0a2]'
                    : 'bg-[#22131c] border border-[#d4af37]/25 text-[#d6c4c9] hover:border-[#d4af37]/60 hover:text-[#f8ede8] hover:bg-[#2c1725]'
                }`}
              >
                {isProfActive ? <Check className="w-3 h-3 stroke-[3]" /> : <Briefcase className="w-3 h-3 opacity-60" />}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 2: Direct Filter by Key Interests */}
      <div className="mt-3 pt-2.5 border-t border-[#d4af37]/15">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#f472b6]" />
          <span className="text-xs font-medium text-[#fce0a2]">{t.popularInterestTags}</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {ALL_INTERESTS.slice(0, 8).map((interest) => {
            const isSelected = filters.selectedInterests.includes(interest);
            const displayLabel = lang === 'ar' ? (INTERESTS_ARABIC[interest] || interest) : interest;
            return (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                type="button"
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#d4af37] text-[#160d13] font-semibold shadow-sm'
                    : 'bg-[#22151e] border border-[#d4af37]/20 text-[#d6c4c9] hover:border-[#d4af37]/50 hover:text-[#f8ede8]'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                <span>{displayLabel}</span>
              </button>
            );
          })}
          {ALL_INTERESTS.length > 8 && (
            <button
              onClick={() => setShowAdvanced(true)}
              className="text-xs text-[#d4af37] hover:underline px-2 py-1 cursor-pointer font-medium"
            >
              + {ALL_INTERESTS.length - 8} ...
            </button>
          )}
        </div>
      </div>

      {/* Expanded Advanced Drawer (All Interests, Education, Marital Status, Verification Only) */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-[#d4af37]/20 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* All Interests Multi-Select */}
          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-[#fce0a2] mb-2 text-left rtl:text-right">
              {t.advancedInterestsTitle}
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
              {ALL_INTERESTS.map((interest) => {
                const isSelected = filters.selectedInterests.includes(interest);
                const displayLabel = lang === 'ar' ? (INTERESTS_ARABIC[interest] || interest) : interest;
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    type="button"
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#d4af37] text-[#160d13] font-semibold'
                        : 'bg-[#20131b] border border-[#d4af37]/20 text-zinc-300 hover:text-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    <span>{displayLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Education Level */}
          <div>
            <label className="block text-xs font-medium text-[#d6c4c9] mb-1.5 text-left rtl:text-right">
              {t.educationLabel}
            </label>
            <select
              value={filters.education}
              onChange={(e) => onChange({ ...filters, education: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#20131b] border border-[#d4af37]/25 text-xs text-[#f8ede8] focus:outline-none focus:border-[#d4af37] text-left rtl:text-right"
            >
              <option value="tous">{t.allEducation}</option>
              <option value="Doctorat / PhD">{lang === 'ar' ? EDUCATION_ARABIC['Doctorat / PhD'] : 'Doctorat / PhD'}</option>
              <option value="Master / Ingénieur (Bac+5)">{lang === 'ar' ? EDUCATION_ARABIC['Master / Ingénieur (Bac+5)'] : 'Master / Ingénieur (Bac+5)'}</option>
              <option value="Licence (Bac+3)">{lang === 'ar' ? EDUCATION_ARABIC['Licence (Bac+3)'] : 'Licence (Bac+3)'}</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-xs font-medium text-[#d6c4c9] mb-1.5 text-left rtl:text-right">
              {t.maritalStatusLabel}
            </label>
            <select
              value={filters.maritalStatus}
              onChange={(e) => onChange({ ...filters, maritalStatus: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#20131b] border border-[#d4af37]/25 text-xs text-[#f8ede8] focus:outline-none focus:border-[#d4af37] text-left rtl:text-right"
            >
              <option value="tous">{t.allMaritalStatus}</option>
              <option value="Célibataire jamais marié(e)">{lang === 'ar' ? MARITAL_STATUS_ARABIC['Célibataire jamais marié(e)'] : 'Célibataire jamais marié(e)'}</option>
              <option value="Divorcé(e) sans enfant">{lang === 'ar' ? MARITAL_STATUS_ARABIC['Divorcé(e) sans enfant'] : 'Divorcé(e) sans enfant'}</option>
              <option value="Divorcé(e) avec enfant(s)">{lang === 'ar' ? MARITAL_STATUS_ARABIC['Divorcé(e) avec enfant(s)'] : 'Divorcé(e) avec enfant(s)'}</option>
              <option value="Veuf / Veuve">{lang === 'ar' ? MARITAL_STATUS_ARABIC['Veuf / Veuve'] : 'Veuf / Veuve'}</option>
            </select>
          </div>

          {/* Verification Badge Filter */}
          <div className="flex items-center gap-3 pt-4 md:pt-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#f8ede8]">
              <input
                type="checkbox"
                checked={filters.onlyVerified}
                onChange={(e) => onChange({ ...filters, onlyVerified: e.target.checked })}
                className="w-4 h-4 rounded border-[#d4af37]/40 bg-[#20131b] accent-[#d4af37]"
              />
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                {t.onlyVerifiedLabel}
              </span>
            </label>
          </div>

        </div>
      )}

      {/* Result Counter & Guarantee Footer */}
      <div className="mt-3 flex items-center justify-between text-xs text-[#b8a4aa]">
        <span>
          <strong className="text-[#fce0a2] font-semibold">{totalResults}</strong> {t.resultsCount}
        </span>
        <span className="text-[11px] text-[#d4af37] font-serif">
          {t.noFakeProfilesGuarantee}
        </span>
      </div>

    </div>
  );
};
