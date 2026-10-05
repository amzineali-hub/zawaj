import React, { useState } from 'react';
import { X, ShieldCheck, Smartphone, CheckCircle2, AlertCircle, ArrowRight, Upload, Sparkles, RefreshCw, KeyRound, Lock, MapPin, Briefcase, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Gender, UserProfile, EducationLevel, MaritalStatus } from '../types';
import { ALL_INTERESTS, CITIES_LIST, COUNTRIES_MRE, CITIES_BY_COUNTRY, PROFESSIONS_LIST } from '../data/mockProfiles';
import { Translations, Language, CITIES_ARABIC, INTERESTS_ARABIC, EDUCATION_ARABIC, MARITAL_STATUS_ARABIC, COUNTRIES_ARABIC, PROFESSIONS_ARABIC } from '../i18n/translations';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationComplete: (newProfile: UserProfile, isFreePioneer: boolean) => void;
  menRemaining: number;
  womenRemaining: number;
  t: Translations;
  lang: Language;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  onVerificationComplete,
  menRemaining,
  womenRemaining,
  t,
  lang
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State: Dropdowns for Country, City, Profession, Age, Education, Marital Status
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<Gender>('femme');
  const [age, setAge] = useState(28);
  const [country, setCountry] = useState('Maroc');
  const [city, setCity] = useState('Casablanca');
  const [profession, setProfession] = useState(PROFESSIONS_LIST[0]);
  const [customProfession, setCustomProfession] = useState('');
  const [education, setEducation] = useState<EducationLevel>('Master / Ingénieur (Bac+5)');
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>('Célibataire jamais marié(e)');
  const [marriageVision, setMarriageVision] = useState('');
  const [bio, setBio] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Littérature & Poésie', 'Voyages culturels']);
  const [photoUrl, setPhotoUrl] = useState('');
  const [isPhotoBlurred, setIsPhotoBlurred] = useState(false);
  const [hasWali, setHasWali] = useState(true);

  // Step 2: Phone Verification State - STRICTLY LOCKED TO +212 (Morocco only)
  const countryCode = '+212';
  const [phoneNumber, setPhoneNumber] = useState('661234567');
  const [phoneError, setPhoneError] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isSendingSms, setIsSendingSms] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [otpError, setOtpError] = useState('');

  // Step 3: Solemn Honor Pledge & Matrimonial Declaration (No CIN demanded at registration)
  const [pledgeInfoAccuracy, setPledgeInfoAccuracy] = useState(true);
  const [pledgeExclusiveMarriage, setPledgeExclusiveMarriage] = useState(true);
  const [pledgeFamilyCINReady, setPledgeFamilyCINReady] = useState(true);
  const [isScanningId, setIsScanningId] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [idVerified, setIdVerified] = useState(false);

  if (!isOpen) return null;

  const isEligibleForFreePioneer = gender === 'femme' ? womenRemaining > 0 : menRemaining > 0;

  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    const availableCities = CITIES_BY_COUNTRY[newCountry] || ['Autre ville'];
    setCity(availableCities[0] || 'Casablanca');
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      if (selectedInterests.length < 5) {
        setSelectedInterests([...selectedInterests, interest]);
      }
    }
  };

  const handleSendSms = () => {
    // Validate Moroccan phone number:
    // Strip non-digits and leading zero (e.g. 0661234567 -> 661234567)
    const cleanNum = phoneNumber.replace(/\D/g, '').replace(/^0/, '');
    if (!cleanNum || cleanNum.length !== 9 || (!cleanNum.startsWith('6') && !cleanNum.startsWith('7'))) {
      setPhoneError(t.invalidMoroccanPhone);
      return;
    }
    setPhoneError('');
    setIsSendingSms(true);
    setOtpError('');
    setTimeout(() => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);
      setIsSendingSms(false);
      setSmsSent(true);
    }, 900);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length !== 6) {
      setOtpError(t.enter6DigitLabel);
      return;
    }
    if (generatedCode && otpCode !== generatedCode && otpCode !== '123456') {
      setOtpError(t.invalidOtpError);
      return;
    }
    setOtpError('');
    setStep(3);
  };

  const handleSimulateIdScan = () => {
    setIsScanningId(true);
    setScanProgress(10);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanningId(false);
          setIdVerified(true);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const finalProfession = (profession === "Autre profession libérale / Spécialité" && customProfession.trim())
    ? customProfession.trim()
    : (lang === 'ar' ? (PROFESSIONS_ARABIC[profession] || profession) : profession);

  const handleFinishRegistration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#f472b6', '#ffffff', '#eab308']
    });

    const newProfile: UserProfile = {
      id: `prof-user-${Date.now()}`,
      fullName: fullName || (gender === 'femme' ? (lang === 'ar' ? 'أمينة البناني' : 'Amina Bennani') : (lang === 'ar' ? 'كريم الفاسي' : 'Karim El Fassi')),
      age: Number(age) || 28,
      gender,
      city,
      country: lang === 'ar' ? (COUNTRIES_ARABIC[country] || country) : country,
      profession: finalProfession,
      industry: lang === 'ar' ? 'إطارات وكفاءات مغربية' : 'Cadres & Professions Libérales',
      education,
      maritalStatus,
      heightCm: gender === 'femme' ? 168 : 180,
      children: maritalStatus.includes('avec enfant') ? 1 : 0,
      bio: bio || (lang === 'ar' ? 'إنسان ذو خلق ودين، محب للسكينة، حريص على إقامة بيت مبارك مبني على التقوى والوئام.' : 'Personne bienveillante, attachée aux traditions d’honneur, à la loyauté et à l’entente spirituelle.'),
      marriageVision: marriageVision || (lang === 'ar' ? 'بناء أسرة متماسكة قوامها التفاهم والصدق والرحمة المتبادلة.' : 'Fonder un foyer harmonieux bâti sur la communication, le respect mutuel et l’amour authentique.'),
      lifestyle: lifestyle || (lang === 'ar' ? 'حياة هادئة تجمع بين الالتزام الروحي، العمل المنتج، والاهتمام بالأسرة.' : 'Vie sereine, équilibre entre spiritualité, travail et moments familiaux.'),
      religiousPractice: lang === 'ar' ? 'ملتزم(ة) بصلاح واعتدال' : 'Pratiquant(e) sincère et équilibré(e)',
      interests: selectedInterests.length > 0 ? selectedInterests : ['Littérature & Poésie', 'Voyages culturels'],
      photoUrl: photoUrl || (gender === 'femme' 
        ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'),
      isPhotoBlurred,
      isVerifiedId: true,
      isVerifiedPhone: true,
      verifiedBadgeDate: lang === 'ar' ? 'اليوم' : "Aujourd'hui",
      pioneerNumber: isEligibleForFreePioneer 
        ? (gender === 'femme' ? 100 - womenRemaining + 1 : 100 - menRemaining + 1)
        : undefined,
      memberSince: lang === 'ar' ? 'أكتوبر 2026' : 'Octobre 2026',
      waliContactAvailable: hasWali
    };

    onVerificationComplete(newProfile, isEligibleForFreePioneer);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div className="relative w-full max-w-2xl bg-[#160e13] border border-[#d4af37]/35 rounded-3xl shadow-2xl shadow-black overflow-hidden my-6 text-left rtl:text-right">
        
        {/* Header with Step Tracker */}
        <div className="p-6 border-b border-[#d4af37]/20 bg-[#1c1119]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
              <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#fff8f0]">
                {t.verificationModalTitle}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-black/40 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper bar */}
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className={`flex flex-col gap-1 pb-1 border-b-2 transition-colors ${step >= 1 ? 'border-[#d4af37] text-[#fce0a2]' : 'border-zinc-800 text-zinc-600'}`}>
              <span className="font-mono text-[10px]">01</span>
              <span className="truncate">{t.step1Title}</span>
            </div>
            <div className={`flex flex-col gap-1 pb-1 border-b-2 transition-colors ${step >= 2 ? 'border-[#d4af37] text-[#fce0a2]' : 'border-zinc-800 text-zinc-600'}`}>
              <span className="font-mono text-[10px]">02</span>
              <span className="truncate">{t.step2Title}</span>
            </div>
            <div className={`flex flex-col gap-1 pb-1 border-b-2 transition-colors ${step >= 3 ? 'border-[#d4af37] text-[#fce0a2]' : 'border-zinc-800 text-zinc-600'}`}>
              <span className="font-mono text-[10px]">03</span>
              <span className="truncate">{t.step3Title}</span>
            </div>
            <div className={`flex flex-col gap-1 pb-1 border-b-2 transition-colors ${step >= 4 ? 'border-[#d4af37] text-[#fce0a2]' : 'border-zinc-800 text-zinc-600'}`}>
              <span className="font-mono text-[10px]">04</span>
              <span className="truncate">{t.step4Title}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: Profile & Intent */}
          {step === 1 && (
            <div className="space-y-4">
              {/* Moroccan & Diaspora Dedication Notice */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#2a1723]/90 to-[#1e111a]/90 border border-[#d4af37]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🇲🇦</span>
                  <span className="font-serif font-bold text-[#fce0a2]">
                    {lang === 'ar' ? 'التسجيل مخصص حصرياً للمغاربة في العالم وداخل الوطن' : 'Inscription réservée exclusivement aux Marocains et Marocains du Monde (MRE)'}
                  </span>
                </div>
                <span className="text-[10px] text-[#f472b6] font-medium self-start sm:self-auto font-serif">
                  {lang === 'ar' ? 'خاص بالمغاربة في العالم' : 'Pour les Marocains du Monde'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#22141d] border border-[#d4af37]/20 flex items-center justify-between text-xs">
                <span className="text-[#d6c4c9]">
                  {t.freeSpotsRemaining}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-[#38bdf8] font-mono font-medium">{menRemaining} {t.genderMen}</span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-[#f472b6] font-mono font-medium">{womenRemaining} {t.genderWomen}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#d6c4c9] mb-1">
                    {t.fullNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.fullNamePlaceholder}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#20131b] border border-[#d4af37]/25 text-sm text-[#f8ede8] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#d6c4c9] mb-1">
                    {t.youAreLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender('femme')}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                        gender === 'femme'
                          ? 'border-[#f472b6] bg-[#f472b6]/20 text-[#fce0a2]'
                          : 'border-[#d4af37]/20 bg-[#20131b] text-zinc-400'
                      }`}
                    >
                      {t.aWoman}
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('homme')}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                        gender === 'homme'
                          ? 'border-[#38bdf8] bg-[#38bdf8]/20 text-[#fce0a2]'
                          : 'border-[#d4af37]/20 bg-[#20131b] text-zinc-400'
                      }`}
                    >
                      {t.aMan}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* Âge Dropdown */}
                <div>
                  <label className="block text-xs font-medium text-[#d6c4c9] mb-1">
                    {t.ageLabel}
                  </label>
                  <select
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value) || 28)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#20131b] border border-[#d4af37]/25 text-xs sm:text-sm text-[#f8ede8] focus:outline-none focus:border-[#d4af37] cursor-pointer"
                  >
                    {Array.from({ length: 56 }, (_, i) => i + 20).map((a) => (
                      <option key={a} value={a}>
                        {a} {t.yearsOld}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pays de résidence Dropdown (Liste déroulante) */}
                <div>
                  <label className="block text-xs font-medium text-[#d6c4c9] mb-1">
                    {t.countryLabel}
                  </label>
                  <select
                    value={country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#20131b] border border-[#d4af37]/25 text-xs sm:text-sm text-[#f8ede8] focus:outline-none focus:border-[#d4af37] cursor-pointer"
                  >
                    {COUNTRIES_MRE.map((c) => (
                      <option key={c} value={c}>
                        {lang === 'ar' ? (COUNTRIES_ARABIC[c] || c) : c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ville de résidence Dropdown (Liste déroulante adaptée au pays) */}
                <div>
                  <label className="block text-xs font-medium text-[#d6c4c9] mb-1">
                    {t.cityLabel}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#20131b] border border-[#d4af37]/25 text-xs sm:text-sm text-[#f8ede8] focus:outline-none focus:border-[#d4af37] cursor-pointer"
                  >
                    {(CITIES_BY_COUNTRY[country] || CITIES_LIST).map((ct) => (
                      <option key={ct} value={ct}>
                        {lang === 'ar' ? (CITIES_ARABIC[ct] || ct) : ct}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Profession Dropdown (Liste déroulante) */}
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-[#d6c4c9] mb-1">
                    {t.professionLabel}
                  </label>
                  <select
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#20131b] border border-[#d4af37]/25 text-xs sm:text-sm text-[#f8ede8] focus:outline-none focus:border-[#d4af37] cursor-pointer"
                  >
                    {PROFESSIONS_LIST.map((p) => (
                      <option key={p} value={p}>
                        {lang === 'ar' ? (PROFESSIONS_ARABIC[p] || p) : p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Profession Input if other */}
                {profession === "Autre profession libérale / Spécialité" && (
                  <div className="animate-fadeIn">
                    <label className="block text-[11px] font-medium text-[#fce0a2] mb-1">
                      {t.customProfessionLabel}
                    </label>
                    <input
                      type="text"
                      placeholder={lang === 'ar' ? 'اكتب تخصصك المهني بالتحديد...' : 'Ex: Consultante en Stratégie, Chirurgien...'}
                      value={customProfession}
                      onChange={(e) => setCustomProfession(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#20131b] border border-[#d4af37]/40 text-xs sm:text-sm text-[#f8ede8] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#d6c4c9] mb-1">
                    {t.educationLabel}
                  </label>
                  <select
                    value={education}
                    onChange={(e) => setEducation(e.target.value as EducationLevel)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#20131b] border border-[#d4af37]/25 text-xs sm:text-sm text-[#f8ede8] focus:outline-none focus:border-[#d4af37] cursor-pointer"
                  >
                    <option value="Doctorat / PhD">{lang === 'ar' ? EDUCATION_ARABIC['Doctorat / PhD'] : 'Doctorat / PhD'}</option>
                    <option value="Master / Ingénieur (Bac+5)">{lang === 'ar' ? EDUCATION_ARABIC['Master / Ingénieur (Bac+5)'] : 'Master / Ingénieur (Bac+5)'}</option>
                    <option value="Licence (Bac+3)">{lang === 'ar' ? EDUCATION_ARABIC['Licence (Bac+3)'] : 'Licence (Bac+3)'}</option>
                    <option value="Formation supérieure">{lang === 'ar' ? EDUCATION_ARABIC['Formation supérieure'] : 'Formation supérieure'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#d6c4c9] mb-1">
                    {t.maritalStatusLabel}
                  </label>
                  <select
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value as MaritalStatus)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#20131b] border border-[#d4af37]/25 text-xs sm:text-sm text-[#f8ede8] focus:outline-none focus:border-[#d4af37] cursor-pointer"
                  >
                    <option value="Célibataire jamais marié(e)">{lang === 'ar' ? MARITAL_STATUS_ARABIC['Célibataire jamais marié(e)'] : 'Célibataire jamais marié(e)'}</option>
                    <option value="Divorcé(e) sans enfant">{lang === 'ar' ? MARITAL_STATUS_ARABIC['Divorcé(e) sans enfant'] : 'Divorcé(e) sans enfant'}</option>
                    <option value="Divorcé(e) avec enfant(s)">{lang === 'ar' ? MARITAL_STATUS_ARABIC['Divorcé(e) avec enfant(s)'] : 'Divorcé(e) avec enfant(s)'}</option>
                    <option value="Veuf / Veuve">{lang === 'ar' ? MARITAL_STATUS_ARABIC['Veuf / Veuve'] : 'Veuf / Veuve'}</option>
                  </select>
                </div>
              </div>

              {/* Marriage Vision */}
              <div>
                <label className="block text-xs font-medium text-[#d6c4c9] mb-1">
                  {t.marriageVisionInputLabel}
                </label>
                <textarea
                  rows={2}
                  placeholder={t.marriageVisionPlaceholder}
                  value={marriageVision}
                  onChange={(e) => setMarriageVision(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#20131b] border border-[#d4af37]/25 text-xs text-[#f8ede8] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Interests (Max 5) */}
              <div>
                <label className="block text-xs font-medium text-[#d6c4c9] mb-1.5">
                  {t.interestsSelectionLabel}
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                  {ALL_INTERESTS.map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    const displayInterest = lang === 'ar' ? (INTERESTS_ARABIC[interest] || interest) : interest;
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#d4af37] text-[#160d13] font-semibold'
                            : 'bg-[#20131b] border border-[#d4af37]/20 text-zinc-300 hover:text-white'
                        }`}
                      >
                        {displayInterest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mode Pudeur option */}
              <div className="p-3 rounded-xl bg-[#20131b] border border-[#d4af37]/15 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Lock className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-[#f8ede8] block">
                      {t.enablePudeurLabel}
                    </span>
                    <span className="text-[11px] text-[#b8a4aa]">
                      {t.enablePudeurDesc}
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isPhotoBlurred}
                  onChange={(e) => setIsPhotoBlurred(e.target.checked)}
                  className="w-4 h-4 rounded border-[#d4af37] accent-[#d4af37] cursor-pointer"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#fce0a2] via-[#d4af37] to-[#b38728] text-xs font-semibold text-[#160d13] flex items-center gap-2 cursor-pointer shadow-md shadow-[#d4af37]/20"
                >
                  <span>{t.nextStepPhoneBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Phone Verification (SMS OTP - Strictly +212) */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-[#22141c] border border-[#d4af37]/25 flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-[#f472b6] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold text-[#fff8f0]">
                    {t.phoneStepTitle}
                  </h3>
                  <p className="text-[11px] text-[#b8a4aa] mt-0.5 leading-relaxed">
                    {t.phoneStepDesc}
                  </p>
                </div>
              </div>

              {/* Exclusivity Notice for Moroccan phone number */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#2a1723] via-[#21111b] to-[#1a0f16] border border-[#d4af37]/35 flex items-center gap-3">
                <span className="text-xl shrink-0">🇲🇦</span>
                <div className="text-xs text-[#fce0a2] leading-snug">
                  <span className="font-semibold block text-[#fff8f0]">
                    {lang === 'ar' ? 'شرط الانتماء والتوثيق الرسمي :' : 'Condition de nationalité & d’adhésion :'}
                  </span>
                  <span>{t.phoneOnly212Notice}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#d6c4c9] mb-1.5">
                  {t.phoneLabel}
                </label>
                <div className="flex gap-2">
                  {/* Fixed Moroccan Prefix (+212) */}
                  <div className="px-3.5 py-2.5 rounded-xl bg-[#1c0f18] border border-[#d4af37]/40 text-xs text-[#fce0a2] font-semibold flex items-center gap-1.5 shrink-0 select-none shadow-inner">
                    <span className="text-base leading-none">🇲🇦</span>
                    <span className="font-mono text-sm tracking-wide text-[#fce0a2]">+212</span>
                    <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 font-medium">
                      {lang === 'ar' ? 'المغرب' : 'Maroc'}
                    </span>
                  </div>

                  <input
                    type="tel"
                    placeholder="6 12 34 56 78"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (phoneError) setPhoneError('');
                    }}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#20131b] border border-[#d4af37]/25 text-sm text-[#f8ede8] font-mono focus:outline-none focus:border-[#d4af37]"
                  />

                  <button
                    type="button"
                    onClick={handleSendSms}
                    disabled={isSendingSms}
                    className="px-4 py-2.5 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/50 hover:bg-[#d4af37]/30 text-xs font-semibold text-[#fce0a2] transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                  >
                    {isSendingSms ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <KeyRound className="w-3.5 h-3.5" />
                    )}
                    <span>{smsSent ? t.resendCodeBtn : t.sendCodeBtn}</span>
                  </button>
                </div>
                {phoneError && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{phoneError}</span>
                  </p>
                )}
              </div>

              {/* Simulated SMS Notification Banner */}
              {smsSent && generatedCode && (
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/60 to-emerald-900/40 border border-emerald-500/40 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-semibold text-emerald-300">
                        {t.smsReceivedFrom}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtpCode(generatedCode)}
                      className="text-[11px] text-emerald-200 underline font-medium cursor-pointer"
                    >
                      {t.copyCodeBtn}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-emerald-100 font-mono">
                    « {t.smsMessageText} <strong className="text-white text-sm tracking-widest">{generatedCode}</strong> »
                  </p>
                </div>
              )}

              {/* OTP Input Form */}
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#d6c4c9] mb-1.5">
                    {t.enter6DigitLabel}
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="••••••"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full tracking-widest text-center text-xl font-mono py-2.5 rounded-xl bg-[#20131b] border border-[#d4af37]/40 text-[#fce0a2] focus:outline-none focus:border-[#d4af37]"
                  />
                  {otpError && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{otpError}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-[#a89098] hover:underline cursor-pointer"
                  >
                    {t.backToInfoBtn}
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#fce0a2] via-[#d4af37] to-[#b38728] text-xs font-semibold text-[#160d13] flex items-center gap-2 cursor-pointer shadow-md shadow-[#d4af37]/20"
                  >
                    <span>{t.validatePhoneBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: Solemn Honor Pledge & Matrimonial Declaration (No CIN demanded at registration) */}
          {step === 3 && (
            <div className="space-y-5">
              {/* Step Header */}
              <div className="p-4 rounded-2xl bg-[#22141c] border border-[#d4af37]/25 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold text-[#fff8f0]">
                    {t.idStepTitle}
                  </h3>
                  <p className="text-[11px] text-[#b8a4aa] mt-0.5 leading-relaxed">
                    {t.idStepDesc}
                  </p>
                </div>
              </div>

              {/* Informative Law & Privacy Notice Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#291722]/80 via-[#21121b]/80 to-[#190e15]/80 border border-[#d4af37]/35 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#fce0a2]">
                  <Lock className="w-4 h-4 text-[#d4af37]" />
                  <span>{t.cinPostponedNoticeTitle}</span>
                </div>
                <p className="text-[11px] text-[#d6c4c9] leading-relaxed">
                  {t.cinPostponedNoticeDesc}
                </p>
              </div>

              {/* 3 Solemn Pledges / Serment d'Honneur */}
              <div className="space-y-3 bg-[#1d111a] p-4 rounded-2xl border border-[#d4af37]/20">
                <div className="text-xs font-serif font-semibold text-[#d4af37] uppercase tracking-wider mb-2">
                  {lang === 'ar' ? 'بنود ميثاق الشرف والتصريح بالهوية :' : 'Engagements Solennels sur l’Honneur :'}
                </div>

                {/* Pledge 1: Authenticity of Information */}
                <label className="flex items-start gap-3 p-2.5 rounded-xl bg-[#23141f] border border-[#d4af37]/15 hover:border-[#d4af37]/30 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pledgeInfoAccuracy}
                    onChange={(e) => setPledgeInfoAccuracy(e.target.checked)}
                    className="w-4 h-4 rounded border-[#d4af37] accent-[#d4af37] mt-0.5 shrink-0 cursor-pointer"
                  />
                  <span className="text-xs text-[#f8ede8] leading-relaxed">
                    {t.honorPledgeDeclaration}
                  </span>
                </label>

                {/* Pledge 2: Purity of Intent (Niyya) */}
                <label className="flex items-start gap-3 p-2.5 rounded-xl bg-[#23141f] border border-[#d4af37]/15 hover:border-[#d4af37]/30 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pledgeExclusiveMarriage}
                    onChange={(e) => setPledgeExclusiveMarriage(e.target.checked)}
                    className="w-4 h-4 rounded border-[#d4af37] accent-[#d4af37] mt-0.5 shrink-0 cursor-pointer"
                  />
                  <span className="text-xs text-[#f8ede8] leading-relaxed">
                    {t.honorPledgeEthics}
                  </span>
                </label>

                {/* Pledge 3: Ready to present CIN at engagement / family threshold */}
                <label className="flex items-start gap-3 p-2.5 rounded-xl bg-[#23141f] border border-[#d4af37]/15 hover:border-[#d4af37]/30 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pledgeFamilyCINReady}
                    onChange={(e) => setPledgeFamilyCINReady(e.target.checked)}
                    className="w-4 h-4 rounded border-[#d4af37] accent-[#d4af37] mt-0.5 shrink-0 cursor-pointer"
                  />
                  <span className="text-xs text-[#f8ede8] leading-relaxed">
                    {t.honorPledgeFamilyReady}
                  </span>
                </label>
              </div>

              {/* Seal Stamp / Interactive Validation Area */}
              <div className="border border-[#d4af37]/30 rounded-2xl p-4 text-center bg-[#20131b]/60">
                {isScanningId ? (
                  <div className="p-3 bg-black/50 rounded-xl border border-[#d4af37]/30">
                    <div className="flex items-center justify-between text-xs text-[#d4af37] mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>{t.analyzingBiometrics}</span>
                      </span>
                      <span className="font-mono">{scanProgress}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-[#d4af37] to-emerald-400 h-full transition-all duration-300"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>
                ) : idVerified ? (
                  <div className="p-3.5 bg-emerald-950/40 rounded-xl border border-emerald-500/40 flex items-center justify-center gap-2.5 text-xs text-emerald-300 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-medium">{t.idVerifiedSuccess}</span>
                  </div>
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={handleSimulateIdScan}
                      disabled={!pledgeInfoAccuracy || !pledgeExclusiveMarriage || !pledgeFamilyCINReady}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37]/30 to-[#aa771c]/30 border border-[#d4af37]/60 text-xs font-semibold text-[#fce0a2] hover:bg-[#d4af37]/40 transition-colors cursor-pointer disabled:opacity-40"
                    >
                      {t.startComplianceAuditBtn}
                    </button>
                    {(!pledgeInfoAccuracy || !pledgeExclusiveMarriage || !pledgeFamilyCINReady) && (
                      <p className="text-[11px] text-zinc-400 mt-2">
                        {lang === 'ar' ? 'يرجى الموافقة على جميع بنود ميثاق الشرف أعلاه للتأكيد' : 'Veuillez cocher les trois engagements solennels ci-dessus pour valider.'}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-[#a89098] hover:underline cursor-pointer"
                >
                  {t.backBtn}
                </button>

                <button
                  type="button"
                  onClick={handleFinishRegistration}
                  disabled={!idVerified || isScanningId}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#fce0a2] via-[#d4af37] to-[#b38728] text-xs font-semibold text-[#160d13] flex items-center gap-2 cursor-pointer shadow-md shadow-[#d4af37]/20 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-[#160d13]" />
                  <span>{t.finishRegistrationBtn}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Success & Pioneer Badge Congratulations */}
          {step === 4 && (
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#aa771c] p-1 mx-auto shadow-xl shadow-[#d4af37]/20 flex items-center justify-center">
                <ShieldCheck className="w-9 h-9 text-[#160d13]" />
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#fff8f0]">
                {isEligibleForFreePioneer ? t.pioneerCongratsTitle : t.certifiedSuccessTitle}
              </h3>

              <p className="text-xs sm:text-sm text-[#d6c4c9] max-w-md mx-auto leading-relaxed">
                {isEligibleForFreePioneer ? t.pioneerCongratsDesc : t.certifiedSuccessDesc}
              </p>

              <div className="p-4 rounded-2xl bg-[#20131b] border border-[#d4af37]/30 max-w-sm mx-auto text-left rtl:text-right text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">{t.accountHolder}</span>
                  <span className="font-semibold text-white">{fullName || (lang === 'ar' ? 'مشترك ميثاق' : 'Abonné Mithaq')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">{lang === 'ar' ? 'بلد ومدار الإقامة :' : 'Résidence :'}</span>
                  <span className="font-medium text-white">{city}, {lang === 'ar' ? (COUNTRIES_ARABIC[country] || country) : country}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">{lang === 'ar' ? 'المهنة / النشاط :' : 'Profession :'}</span>
                  <span className="text-[#fce0a2] truncate max-w-[180px] font-medium">{finalProfession}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">{t.smsValidated}</span>
                  <span className="text-emerald-400 font-mono">({countryCode} {phoneNumber})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">{t.cinConformed}</span>
                  <span className="text-[#fce0a2] text-[11px] font-medium">
                    {lang === 'ar' ? 'مؤجلة لعتبة الأسرتين ومرحلة الخطوبة' : 'Réservée au seuil des familles pour les fiançailles (Al Khotouba)'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">{t.appliedFee}</span>
                  <span className="text-[#d4af37] font-semibold">{isEligibleForFreePioneer ? t.freeFeePioneer : '100 DH / an'}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#fce0a2] via-[#d4af37] to-[#b38728] text-xs font-semibold text-[#160d13] shadow-lg shadow-[#d4af37]/25 cursor-pointer"
                >
                  {t.exploreProfilesSuccessBtn}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
