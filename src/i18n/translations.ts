export type Language = 'fr' | 'ar';

export interface Translations {
  appName: string;
  appTagline: string;
  navProfiles: string;
  navFavorites: string;
  navChat: string;
  navCharter: string;
  navPioneers: string;
  navMobileApp: string;
  verifyProfileBtn: string;
  certifiedBadge: string;
  pioneerMember: string;
  phoneVerifiedBadge: string;
  phoneVerifiedBadgeShort: string;
  idVerifiedBadge: string;
  idVerifiedBadgeShort: string;
  doubleVerifiedBadge: string;
  phoneVerifiedTooltip: string;
  idVerifiedTooltip: string;
  phonePendingTooltip: string;
  idPendingTooltip: string;
  welcomeFloatingTitle: string;
  replayFloatingBtn: string;
  dismissFloatingBtn: string;
  
  // Hero
  heroKicker: string;
  heroTitle1: string;
  heroTitleHighlight1: string;
  heroTitleAnd: string;
  heroTitleHighlight2: string;
  heroSubtitle: string;
  heroJoinBtn: string;
  heroCharterBtn: string;
  
  // Key Pillars
  pillarsTitle: string;
  pillar1: string;
  pillar2: string;
  pillar3: string;
  pillar4: string;

  // Pioneer Banner
  pioneerKicker: string;
  pioneerTitle: string;
  pioneerMenHighlight: string;
  pioneerAnd: string;
  pioneerWomenHighlight: string;
  pioneerDesc: string;
  pioneerMen: string;
  pioneerWomen: string;
  pioneerSpotsOffered: string;
  pioneerCertifiedRegistered: string;
  pioneerReserveBtn: string;
  pioneerDetailsFee: string;
  pioneerTrustDoubleCheck: string;
  pioneerTrustMatrimonial: string;
  pioneerTrustPrivacy: string;

  // Filters
  searchPlaceholder: string;
  searchByProfessionLabel: string;
  searchByInterestLabel: string;
  searchScopeAll: string;
  searchScopeProfession: string;
  searchScopeInterests: string;
  popularProfessionTags: string;
  popularInterestTags: string;
  clearSearchBtn: string;
  matchingProfessions: string;
  matchingInterests: string;
  searchFoundCount: string;
  allLocations: string;
  genderAll: string;
  genderWomen: string;
  genderMen: string;
  favoritesBtn: string;
  interestsBtn: string;
  keyInterestsLabel: string;
  resetFilters: string;
  advancedInterestsTitle: string;
  educationLabel: string;
  allEducation: string;
  maritalStatusLabel: string;
  allMaritalStatus: string;
  onlyVerifiedLabel: string;
  resultsCount: string;
  noFakeProfilesGuarantee: string;
  favoritesActiveBannerTitle: string;
  favoritesActiveBannerDesc: string;
  showAllProfilesBtn: string;
  noResultsFound: string;
  noResultsDesc: string;
  noFavoritesFound: string;
  noFavoritesDesc: string;
  discoverProfilesBtn: string;

  // Profile Card
  verificationCINandSMS: string;
  marriageVisionLabel: string;
  interestsLabel: string;
  viewDossierBtn: string;
  chatBtn: string;
  yearsOld: string;
  pudeurMode: string;
  quickPreviewBtn: string;
  quickPreviewTitle: string;
  closePreviewBtn: string;
  bioSnippetLabel: string;
  topInterestsLabel: string;
  openFullDossierFromPreview: string;

  // Profile Detail Modal
  dossierTitle: string;
  authenticityCertifiedTitle: string;
  authenticityCertifiedDesc: string;
  familyStageCINSectionTitle: string;
  familyStageCINSectionDesc: string;
  familyStageCINBtn: string;
  familyStageActivatedSuccess: string;
  personalDataTitle: string;
  maritalStatusHeader: string;
  educationHeader: string;
  childrenHeader: string;
  noChildren: string;
  hasChildren: string;
  heightHeader: string;
  practiceHeader: string;
  familyFrameworkHeader: string;
  waliAvailable: string;
  autonomousRespect: string;
  presentationLifestyleTitle: string;
  lifestyleLabel: string;
  reportMisconductBtn: string;
  blockUserBtn: string;
  unblockUserBtn: string;
  userBlockedNotice: string;
  userBlockedBannerTitle: string;
  userBlockedBannerDesc: string;
  blockedBadge: string;
  confirmBlockTitle: string;
  confirmBlockDesc: string;
  confirmBlockBtn: string;
  userBlockedSuccessToast: string;
  userUnblockedSuccessToast: string;
  backBtn: string;
  startExchangeBtn: string;
  saveFavoriteBtn: string;
  savedFavoriteActiveBtn: string;

  // Double Verification Modal
  verificationModalTitle: string;
  step1Title: string;
  step2Title: string;
  step3Title: string;
  step4Title: string;
  freeSpotsRemaining: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  youAreLabel: string;
  aWoman: string;
  aMan: string;
  ageLabel: string;
  countryLabel: string;
  cityLabel: string;
  professionLabel: string;
  customProfessionLabel: string;
  allProfessions: string;
  marriageVisionInputLabel: string;
  marriageVisionPlaceholder: string;
  interestsSelectionLabel: string;
  enablePudeurLabel: string;
  enablePudeurDesc: string;
  nextStepPhoneBtn: string;
  phoneStepTitle: string;
  phoneStepDesc: string;
  phoneOnly212Notice: string;
  phoneLabel: string;
  invalidMoroccanPhone: string;
  sendCodeBtn: string;
  sendingBtn: string;
  resendCodeBtn: string;
  smsReceivedFrom: string;
  copyCodeBtn: string;
  smsMessageText: string;
  enter6DigitLabel: string;
  invalidOtpError: string;
  backToInfoBtn: string;
  validatePhoneBtn: string;
  idStepTitle: string;
  idStepDesc: string;
  cinPostponedNoticeTitle: string;
  cinPostponedNoticeDesc: string;
  honorPledgeDeclaration: string;
  honorPledgeEthics: string;
  honorPledgeFamilyReady: string;
  analyzingBiometrics: string;
  idVerifiedSuccess: string;
  startComplianceAuditBtn: string;
  finishRegistrationBtn: string;
  pioneerCongratsTitle: string;
  certifiedSuccessTitle: string;
  pioneerCongratsDesc: string;
  certifiedSuccessDesc: string;
  accountHolder: string;
  smsValidated: string;
  cinConformed: string;
  appliedFee: string;
  freeFeePioneer: string;
  exploreProfilesSuccessBtn: string;

  // Chat
  conversationsTitle: string;
  conversationsActive: string;
  chatEncryptedNotice: string;
  decencyNotice: string;
  tenMatrimonialQuestionsBtn: string;
  askRecommendedQuestion: string;
  requestPhotoAccessBtn: string;
  chatInputPlaceholder: string;
  typingIndicator: string;
  proposeProjectsExchange: string;
  primeQualitiesPrompt: string;
  mutualPhotoPrompt: string;
  proposeFamilyStagePrompt: string;
  familyStageInviteMessage: string;

  // Charter Modal
  charterTitle: string;
  charterSubtitle: string;
  charterPreamble: string;
  charterPillar1Title: string;
  charterPillar1Desc: string;
  charterPillar2Title: string;
  charterPillar2Desc: string;
  charterPillar3Title: string;
  charterPillar3Desc: string;
  charterPillar4Title: string;
  charterPillar4Desc: string;
  charterSolemnCommitment: string;
  charterAdhereBtn: string;

  // Subscriptions Modal
  subscriptionsTitle: string;
  subscriptionsSubtitle: string;
  pioneerPlanTitle: string;
  limitedSpots: string;
  pioneerPerYearForever: string;
  pioneerPlanDesc: string;
  pioneerFeature1: string;
  pioneerFeature2: string;
  pioneerFeature3: string;
  pioneerFeature4: string;
  standardPlanTitle: string;
  postPioneerBadge: string;
  perYear: string;
  standardPlanDesc: string;
  standardFeature1: string;
  standardFeature2: string;
  standardFeature3: string;
  standardFeature4: string;
  whyFeeQuestion: string;
  whyFeeAnswer: string;
  securePaymentLabel: string;
  reservePioneerBtn: string;
  subscribeStandardBtn: string;

  // Mobile App Modal
  mobileAppTitle: string;
  mobileAppSubtitle: string;
  iosTab: string;
  androidTab: string;
  iosGuideTitle: string;
  iosStep1: string;
  iosStep2: string;
  iosStep3: string;
  androidGuideTitle: string;
  androidStep1: string;
  androidStep2: string;
  androidStep3: string;
  appAdvantageNotifications: string;
  appAdvantageBiometric: string;
  appInstalledSuccess: string;
  installAppBtn: string;

  // Report Modal
  reportTitle: string;
  reportRecorded: string;
  reportRecordedDesc: string;
  concernedProfile: string;
  mainReasonLabel: string;
  reason1: string;
  reason2: string;
  reason3: string;
  reason4: string;
  detailsLabel: string;
  detailsPlaceholder: string;
  cancelBtn: string;
  submitReportBtn: string;

  // Footer
  footerPlatformSubtitle: string;
  footerRights: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  fr: {
    appName: "Mithaq Prestige",
    appTagline: "Pour les Marocains & Marocains du Monde",
    navProfiles: "Profils Certifiés",
    navFavorites: "Favoris",
    navChat: "Messagerie",
    navCharter: "Charte d’Honneur",
    navPioneers: "Offre Pionniers (100 DH)",
    navMobileApp: "iOS & Android",
    verifyProfileBtn: "Double Vérification",
    certifiedBadge: "Certifié",
    pioneerMember: "Pionnier",
    phoneVerifiedBadge: "Téléphone SMS (+212)",
    phoneVerifiedBadgeShort: "Tél. SMS",
    idVerifiedBadge: "Identité & Honneur",
    idVerifiedBadgeShort: "ID & Honneur",
    doubleVerifiedBadge: "Double Vérifié",
    phoneVerifiedTooltip: "Numéro mobile marocain (+212) validé par SMS OTP",
    idVerifiedTooltip: "Identité et engagement matrimonial certifiés sur l'honneur",
    phonePendingTooltip: "Validation du téléphone par SMS en attente",
    idPendingTooltip: "Attestation d'identité en cours",
    welcomeFloatingTitle: "Cœurs nobles en quête de Sakina",
    replayFloatingBtn: "Animation d'accueil",
    dismissFloatingBtn: "Passer l'animation",
    
    heroKicker: "Plateforme Exclusive · Pour les Marocains et Marocains du Monde",
    heroTitle1: "Bâtir un foyer noble sur la",
    heroTitleHighlight1: "Sakina",
    heroTitleAnd: "et la",
    heroTitleHighlight2: "Dignité",
    heroSubtitle: "Mithaq Prestige est la plateforme matrimoniale d'excellence réservée exclusivement aux Marocains du Maroc et aux Marocains du Monde (MRE). Chaque membre est authentifié par double vérification (SMS OTP & Engagement d'Honneur). La vérification officielle de la CIN est réservée au seuil des familles pour les fiançaille (Al khotouba).",
    heroJoinBtn: "Rejoindre en tant que Membre Vérifié",
    heroCharterBtn: "Lire la Charte d'Honneur",
    
    pillarsTitle: "Les Piliers Mithaq Prestige",
    pillar1: "0 Faux Profil : Téléphone validé par SMS OTP & Engagement d'Honneur. CIN au seuil des familles.",
    pillar2: "Mode Pudeur : Floutage de photo et discrétion garantie.",
    pillar3: "Offre Pionniers : Gratuit pour 100 H & 100 F, puis 100 DH/an.",
    pillar4: "iOS & Android : PWA mobile discrète et fluide.",

    pioneerKicker: "Offre de Lancement Exclusif · Marocains du Maroc & du Monde",
    pioneerTitle: "Gratuit pour les",
    pioneerMenHighlight: "100 Premiers Hommes",
    pioneerAnd: "et",
    pioneerWomenHighlight: "100 Premières Femmes",
    pioneerDesc: "Dédié exclusivement aux Marocains du Royaume et de la diaspora (MRE). L’accès complet et vérifié est offert aux 200 pionniers. Les adhésions ultérieures seront de 100 DH / an pour garantir la sérénité et le filtrage rigoureux de notre communauté.",
    pioneerMen: "Hommes",
    pioneerWomen: "Femmes",
    pioneerSpotsOffered: "places offertes",
    pioneerCertifiedRegistered: "inscrits certifiés",
    pioneerReserveBtn: "Réserver ma place",
    pioneerDetailsFee: "Détails & Tarifs (100 DH/an)",
    pioneerTrustDoubleCheck: "Double vérification : SMS & Engagement d'Honneur (CIN au seuil des familles)",
    pioneerTrustMatrimonial: "Engagement matrimonial exclusif",
    pioneerTrustPrivacy: "Confidentialité et discrétion garanties (Mode Pudeur)",

    searchPlaceholder: "Rechercher par profession, centres d'intérêt, mot-clé...",
    searchByProfessionLabel: "Filtrer par profession",
    searchByInterestLabel: "Filtrer par centre d'intérêt",
    searchScopeAll: "Tout rechercher",
    searchScopeProfession: "Professions",
    searchScopeInterests: "Centres d'intérêt",
    popularProfessionTags: "Professions recherchées :",
    popularInterestTags: "Centres d'intérêt fréquents :",
    clearSearchBtn: "Effacer la recherche",
    matchingProfessions: "Professions suggérées :",
    matchingInterests: "Centres d'intérêt suggérés :",
    searchFoundCount: "profil(s) correspondant(s)",
    allLocations: "Toutes les localisations",
    genderAll: "Tous",
    genderWomen: "Femmes",
    genderMen: "Hommes",
    favoritesBtn: "Favoris",
    interestsBtn: "Centres d'intérêt",
    keyInterestsLabel: "Centres d'intérêt clés :",
    resetFilters: "Réinitialiser les filtres",
    advancedInterestsTitle: "Sélectionnez les affinités recherchées :",
    educationLabel: "Niveau d'études",
    allEducation: "Tous les niveaux",
    maritalStatusLabel: "Situation matrimoniale",
    allMaritalStatus: "Toutes situations",
    onlyVerifiedLabel: "Uniquement profils vérifiés (SMS & Honneur - CIN au seuil des familles)",
    resultsCount: "profils authentifiés correspondent à vos critères",
    noFakeProfilesGuarantee: "Garantie Mithaq : 0 faux profil",
    favoritesActiveBannerTitle: "Vos Profils Coups de Cœur",
    favoritesActiveBannerDesc: "Ces profils sont enregistrés sur votre appareil pour consultation privilégiée.",
    showAllProfilesBtn: "Afficher tous les profils →",
    noResultsFound: "Aucun profil ne correspond exactement à ces critères",
    noResultsDesc: "Modifiez vos filtres de localisation ou sélectionnez d'autres centres d'intérêt pour découvrir plus d'abonnés certifiés.",
    noFavoritesFound: "Aucun profil dans vos favoris pour le moment",
    noFavoritesDesc: "Cliquez sur le cœur rose présent sur chaque carte de profil pour sauvegarder les personnes qui correspondent à vos aspirations.",
    discoverProfilesBtn: "Découvrir les profils certifiés",

    verificationCINandSMS: "Vérifié SMS & Honneur · CIN Fiançailles",
    marriageVisionLabel: "Vision du mariage",
    interestsLabel: "Centres d'intérêt :",
    viewDossierBtn: "Consulter le dossier",
    chatBtn: "Échanger",
    yearsOld: "ans",
    pudeurMode: "Mode Pudeur",
    quickPreviewBtn: "Aperçu rapide",
    quickPreviewTitle: "Aperçu express du profil",
    closePreviewBtn: "Fermer l'aperçu",
    bioSnippetLabel: "Extrait de présentation",
    topInterestsLabel: "Top 3 Centres d'intérêt",
    openFullDossierFromPreview: "Consulter le dossier complet →",

    dossierTitle: "Dossier Matrimonial Officiel",
    authenticityCertifiedTitle: "Authenticité Certifiée par Mithaq Prestige",
    authenticityCertifiedDesc: "Numéro de téléphone validé par SMS OTP et Engagement d'Honneur solennel. (Conformément à la loi, la CIN n'est demandée qu'à l'étape ultérieure des fiançailles au seuil des familles).",
    familyStageCINSectionTitle: "Étape Fiançailles & Seuil des Familles (Khitba)",
    familyStageCINSectionDesc: "Lorsque vos échanges confirment une volonté sincère d'union, vous atteignez le seuil des familles. C'est à cette étape légitime que la présentation mutuelle des pièces d'identité officielles (CIN) et la coordination entre tuteurs/familles s'effectue en toute transparence.",
    familyStageCINBtn: "Initier l'Étape Fiançailles & Échange CIN Famille",
    familyStageActivatedSuccess: "Étape Fiançailles initiée avec succès ! L'invitation au seuil des familles et l'échange officiel des pièces d'identité (CIN) ont été transmis.",
    personalDataTitle: "Données Personnelles et Matrimoniales",
    maritalStatusHeader: "Situation",
    educationHeader: "Niveau d'études",
    childrenHeader: "Enfants",
    noChildren: "Aucun enfant",
    hasChildren: "enfant(s)",
    heightHeader: "Taille",
    practiceHeader: "Pratique & Éthique",
    familyFrameworkHeader: "Cadre familial",
    waliAvailable: "Tuteur/Famille consultable",
    autonomousRespect: "Autonome avec respect",
    presentationLifestyleTitle: "Présentation & Rythme quotidien",
    lifestyleLabel: "Mode de vie :",
    reportMisconductBtn: "Signaler un profil ou manquement éthique",
    blockUserBtn: "Bloquer ce membre",
    unblockUserBtn: "Débloquer ce membre",
    userBlockedNotice: "Ce membre est actuellement bloqué. Vos échanges sont interrompus pour votre confort et sécurité.",
    userBlockedBannerTitle: "Conversation suspendue : Membre bloqué",
    userBlockedBannerDesc: "Vous avez bloqué cet utilisateur. Vous ne recevrez plus de messages ni d'interactions de sa part.",
    blockedBadge: "Bloqué",
    confirmBlockTitle: "Bloquer ce profil ?",
    confirmBlockDesc: "En bloquant ce membre, il ne pourra plus vous contacter, son profil sera masqué de votre recherche et vos échanges seront suspendus.",
    confirmBlockBtn: "Confirmer le blocage",
    userBlockedSuccessToast: "Membre bloqué avec succès.",
    userUnblockedSuccessToast: "Membre débloqué. Vous pouvez à nouveau échanger.",
    backBtn: "Retour",
    startExchangeBtn: "Initier un échange sérieux",
    saveFavoriteBtn: "Sauvegarder",
    savedFavoriteActiveBtn: "Dans vos favoris",

    verificationModalTitle: "Inscription Sécurisée & Double Vérification",
    step1Title: "Profil Matrimonial",
    step2Title: "Téléphone SMS",
    step3Title: "Engagement d'Honneur",
    step4Title: "Statut Pionnier",
    freeSpotsRemaining: "Offre de lancement : Places gratuites restantes",
    fullNameLabel: "Prénom & Nom complet *",
    fullNamePlaceholder: "Ex: Amina Bennani",
    youAreLabel: "Vous êtes *",
    aWoman: "Une Femme",
    aMan: "Un Homme",
    ageLabel: "Âge *",
    countryLabel: "Pays de résidence *",
    cityLabel: "Ville de résidence *",
    professionLabel: "Profession / Activité *",
    customProfessionLabel: "Précisez votre spécialité professionnelle *",
    allProfessions: "Toutes les professions",
    marriageVisionInputLabel: "Votre vision du mariage et du foyer (essentiel) *",
    marriageVisionPlaceholder: "Quelles sont vos attentes, vos valeurs de couple, votre conception de la vie commune ?",
    interestsSelectionLabel: "Vos centres d'intérêt principaux (choisir jusqu'à 5) :",
    enablePudeurLabel: "Activer le Mode Pudeur (Photo Floutée par défaut)",
    enablePudeurDesc: "Votre photo reste floutée. Vous autorisez l'accès uniquement aux personnes de votre choix.",
    nextStepPhoneBtn: "Étape suivante : Vérification Téléphone",
    phoneStepTitle: "1ère Vérification : Numéro de Téléphone Mobile Marocain (+212)",
    phoneStepDesc: "Un code de sécurité unique à 6 chiffres va être envoyé par SMS. Seul l'indicatif officiel marocain (+212) est accepté pour garantir l'authenticité de notre communauté.",
    phoneOnly212Notice: "Plateforme exclusivement dédiée aux Marocains du Maroc et du Monde : seul l'indicatif +212 est admis.",
    phoneLabel: "Votre numéro de téléphone mobile marocain",
    invalidMoroccanPhone: "Veuillez saisir un numéro mobile marocain valide à 9 chiffres commençant par 6 ou 7 (ex: 6 12 34 56 78).",
    sendCodeBtn: "Envoyer Code",
    sendingBtn: "Envoi en cours...",
    resendCodeBtn: "Renvoyer SMS",
    smsReceivedFrom: "SMS Reçu de \"Mithaq-SMS\" :",
    copyCodeBtn: "Copier le code",
    smsMessageText: "Votre code de confirmation Mithaq est :",
    enter6DigitLabel: "Saisissez le code SMS à 6 chiffres",
    invalidOtpError: "Code SMS invalide. Utilisez le code affiché dans la notification sécurisée.",
    backToInfoBtn: "Retour aux informations",
    validatePhoneBtn: "Valider le téléphone",
    idStepTitle: "2ème Vérification : Déclaration d'Honneur & Engagement Matrimonial",
    idStepDesc: "Conformément à la réglementation et à la protection de la vie privée, seul un organisme officiel habilité peut exiger votre CIN. Mithaq ne vous demande donc pas votre pièce d'identité à l'inscription. Celle-ci sera présentée d'un commun accord lors de l'étape ultérieure des fiançailles (au seuil des familles).",
    cinPostponedNoticeTitle: "Pourquoi la CIN n'est pas demandée lors de l'inscription ?",
    cinPostponedNoticeDesc: "Pour protéger vos données personnelles : la présentation de la CIN est réservée au moment solennel où la démarche aboutit aux fiançailles et à la rencontre des deux familles.",
    honorPledgeDeclaration: "Je certifie sur l'honneur l'authenticité absolue de toutes les informations renseignées (nom, âge, situation familiale, profession).",
    honorPledgeEthics: "Je m'engage solennellement à n'utiliser la plateforme que dans le but pur et exclusif d'un mariage sérieux et honorable (Niyya).",
    honorPledgeFamilyReady: "J'accepte de présenter ma pièce d'identité officielle (CIN) lors de l'étape ultérieure des fiançailles au seuil des familles (Khitba).",
    analyzingBiometrics: "Validation du serment d'honneur et émission du sceau de confiance...",
    idVerifiedSuccess: "Serment d'honneur validé & Profil officiellement certifié Mithaq !",
    startComplianceAuditBtn: "Signer solennellement l'engagement d'honneur",
    finishRegistrationBtn: "Finaliser mon inscription sécurisée",
    pioneerCongratsTitle: "Bienvenue parmi les Membres Pionniers !",
    certifiedSuccessTitle: "Votre Profil est Certifié Mithaq Prestige",
    pioneerCongratsDesc: "Félicitations ! Vous faites partie des 100 premiers membres. Votre abonnement annuel d'une valeur de 100 DH / an vous est gracieusement offert pour récompenser votre sérieux.",
    certifiedSuccessDesc: "Votre profil a validé avec succès la double vérification d'identité. Vous accédez à notre communauté exclusive dédiée au mariage.",
    accountHolder: "Titulaire :",
    smsValidated: "Vérification SMS :",
    cinConformed: "Vérification CIN :",
    appliedFee: "Tarif appliqué :",
    freeFeePioneer: "Gratuit (Offre Pionnier)",
    exploreProfilesSuccessBtn: "Explorer les profils certifiés & démarrer",

    conversationsTitle: "Discussions Sérieuses",
    conversationsActive: "actives",
    chatEncryptedNotice: "🔒 Échanges chiffrés et placés sous la Charte d'Honneur Mithaq",
    decencyNotice: "Norme de bienséance : Propos courtois, respect absolu de la pudeur et intention sincère de mariage.",
    tenMatrimonialQuestionsBtn: "10 Questions Matrimoniales",
    askRecommendedQuestion: "Poser une question matrimoniale recommandée :",
    requestPhotoAccessBtn: "Accès Photo",
    chatInputPlaceholder: "Écrivez un message respectueux et constructif...",
    typingIndicator: "rédige avec attention...",
    proposeProjectsExchange: "🤝 Proposer un échange sur les projets",
    primeQualitiesPrompt: "🕊️ Qualités primordiales",
    mutualPhotoPrompt: "Demande réciproque photo",
    proposeFamilyStagePrompt: "💍 Proposer l'Étape Fiançailles & Échange CIN",
    familyStageInviteMessage: "💍 Proposition solennelle : Nos échanges confirmant la sincérité de nos intentions, je propose d'ouvrir l'Étape Fiançailles (Seuil des Familles) afin d'organiser la présentation mutuelle des pièces d'identité officielles (CIN) et la prise de contact avec nos familles / tuteurs respectifs.",

    charterTitle: "Charte d'Honneur, d'Éthique & de Confidentialité",
    charterSubtitle: "Les engagements sacrés régissant chaque membre de Mithaq Prestige",
    charterPreamble: "« Le mariage est un pacte solennel (Mithaqan Ghalidha), une alliance bâtie sur l’amour bienveillant (Mawadda), la miséricorde (Rahma) et la paix de l’âme (Sakina). »",
    charterPillar1Title: "1. Intention Pure et Exclusive de Mariage (Niyya)",
    charterPillar1Desc: "Chaque abonné s'engage sur l'honneur à n'utiliser la plateforme que dans le but sincère et noble d'aboutir à un mariage pérenne. Les démarches opportunistes, le badinage ou les relations éphémères sont strictement proscrits et entraînent la révocation immédiate du compte.",
    charterPillar2Title: "2. Respect Inconditionnel & Préservation de la Dignité",
    charterPillar2Desc: "Toute communication doit être empreinte de politesse, d'écoute et de bienveillance. Les propos dégradants, la vulgarité, le harcèlement ou les jugements hâtifs sont passibles d'exclusion définitive sans remboursement.",
    charterPillar3Title: "3. Confidentialité Absolue des Données & Droit à la Discrétion",
    charterPillar3Desc: "Le secret des échanges et des informations privées est inviolable. La diffusion de photos, de captures d'écran ou d'adresses sans consentement mutuel est rigoureusement interdite par la loi et notre règlement. Le Mode Pudeur (floutage de portrait) est un droit respecté de chaque membre.",
    charterPillar4Title: "4. Cadre Familial et Tradition d'Honneur (Wali)",
    charterPillar4Desc: "Mithaq encourage l'implication précoce et saine des familles et tuteurs légaux dès que les deux personnes confirment leur intérêt mutuel, afin de poser les jalons d'une union harmonieuse et bénie.",
    charterSolemnCommitment: "Approbation solennelle exigée pour chaque membre",
    charterAdhereBtn: "J'adhère à la Charte d'Honneur",

    subscriptionsTitle: "Formules d'Adhésion & Offre Pionniers",
    subscriptionsSubtitle: "Une tarification juste pour préserver le sérieux et l'authenticité",
    pioneerPlanTitle: "Offre Fondateurs",
    limitedSpots: "Places limitées",
    pioneerPerYearForever: "/ an à vie",
    pioneerPlanDesc: "Réservé aux 100 premiers hommes et 100 premières femmes avec double vérification CIN & Téléphone.",
    pioneerFeature1: "Double vérification offerte (CIN + SMS)",
    pioneerFeature2: "Dossier matrimonial complet illimité",
    pioneerFeature3: "Messagerie confidentielle instantanée",
    pioneerFeature4: "Badge exclusif Membre Pionnier",
    standardPlanTitle: "Adhésion Annuelle",
    postPioneerBadge: "Post-Pionniers",
    perYear: "/ année",
    standardPlanDesc: "Tarif symbolique et protecteur. Filtre les comptes non sérieux et finance l'audit d'identité manuel.",
    standardFeature1: "Audit et validation d'identité certifiée",
    standardFeature2: "Accès 365 jours à la plateforme",
    standardFeature3: "Espace de chat privé sans limite",
    standardFeature4: "Accompagnement et modération continue",
    whyFeeQuestion: "Pourquoi une participation de 100 DH/an ?",
    whyFeeAnswer: "Dans le mariage traditionnel marocain et universel, l'engagement moral commence par une preuve de considération. Cette contribution modeste mais essentielle garantit que chaque personne inscrite a une réelle motivation pour fonder un foyer et écarte tout utilisateur malveillant.",
    securePaymentLabel: "Chiffrement CMI & Stripe 256 bits",
    reservePioneerBtn: "Réserver ma place Pionnier (0 DH)",
    subscribeStandardBtn: "Adhérer pour 100 DH / an",

    mobileAppTitle: "Application Mobile iOS & Android",
    mobileAppSubtitle: "Une expérience fluide, discrète et sécurisée sur votre smartphone",
    iosTab: "Apple iOS (iPhone)",
    androidTab: "Android (Google)",
    iosGuideTitle: "Installation PWA directe sans passer par l'App Store :",
    iosStep1: "Ouvrez cette application dans le navigateur Safari de votre iPhone.",
    iosStep2: "Appuyez sur le bouton Partager au bas de votre écran.",
    iosStep3: "Sélectionnez « Sur l'écran d'accueil » puis confirmez.",
    androidGuideTitle: "Installation PWA instantanée sur Android :",
    androidStep1: "Ouvrez l'application sur Google Chrome ou Samsung Internet.",
    androidStep2: "Appuyez sur le bandeau « Installer Mithaq » ou les 3 points du menu.",
    androidStep3: "L'icône dorée Mithaq Prestige apparaît instantanément sur votre bureau mobile.",
    appAdvantageNotifications: "Notifications discrètes sans indiscrétion",
    appAdvantageBiometric: "Verrouillage Face ID / Empreinte",
    appInstalledSuccess: "Application installée avec succès !",
    installAppBtn: "Ajouter Mithaq Prestige à mon smartphone",

    reportTitle: "Signaler un manquement éthique",
    reportRecorded: "Signalement Enregistré",
    reportRecordedDesc: "Notre comité d'éthique examine le dossier sous 2 heures. La confidentialité de votre identité est strictement préservée.",
    concernedProfile: "Profil concerné :",
    mainReasonLabel: "Motif principal :",
    reason1: "Manquement à la courtoisie ou propos inappropriés",
    reason2: "Absence d'intention sérieuse de mariage (badinage)",
    reason3: "Suspicion sur l'identité ou fausses informations",
    reason4: "Non-respect de la pudeur ou sollicitation insistante",
    detailsLabel: "Précisions (confidentiel) :",
    detailsPlaceholder: "Décrivez les faits constatés...",
    cancelBtn: "Annuler",
    submitReportBtn: "Transmettre au Comité",

    footerPlatformSubtitle: "Plateforme matrimoniale de prestige exclusivement dédiée aux Marocains et Marocains du Monde (MRE)",
    footerRights: "Mithaq Prestige. Tous droits réservés."
  },

  ar: {
    appName: "ميثاق برستيج",
    appTagline: "خاص بالمغاربة في العالم",
    navProfiles: "الملفات الموثقة",
    navFavorites: "المفضلة",
    navChat: "المراسلة",
    navCharter: "ميثاق الشرف",
    navPioneers: "عرض الرواد (100 درهم)",
    navMobileApp: "تطبيق الهاتف",
    verifyProfileBtn: "التحقق المزدوج",
    certifiedBadge: "موثق رسمي",
    pioneerMember: "عضو رائد",
    phoneVerifiedBadge: "الهاتف SMS (+212)",
    phoneVerifiedBadgeShort: "هاتف SMS",
    idVerifiedBadge: "الهوية والشرف",
    idVerifiedBadgeShort: "الهوية والشرف",
    doubleVerifiedBadge: "توثيق مزدوج",
    phoneVerifiedTooltip: "رقم هاتف محمول مغربي (+212) مؤكد برمز SMS سري",
    idVerifiedTooltip: "الهوية والتصريح بالزواج الشرعي مصادق عليهما بشرف",
    phonePendingTooltip: "تأكيد الهاتف برمز SMS قيد الانتظار",
    idPendingTooltip: "توثيق الهوية قيد المراجعة",
    welcomeFloatingTitle: "قلوب طيبة ترجو السكينة والوقار",
    replayFloatingBtn: "مشهد الترحيب",
    dismissFloatingBtn: "تخطي المشهد",
    
    heroKicker: "منصة حصرية · خاص بالمغاربة في العالم وداخل الوطن",
    heroTitle1: "لبناء بيت مبارك قوامه",
    heroTitleHighlight1: "السكينة",
    heroTitleAnd: "و",
    heroTitleHighlight2: "الوقار",
    heroSubtitle: "ميثاق برستيج هي المنصة الزوجية الراقية المخصصة حصرياً للمغاربة في أرض الوطن والمغاربة في العالم (المغتربين MRE)، لبناء بيت مبارك قوامه السكينة والوقار وفق تقاليدنا المغربية الأصيلة. كل عضو موثق عبر التحقق المزدوج برمز SMS وميثاق الشرف، وتُرجأ البطاقة الوطنية الرسمية إلى عتبة الأسرتين من أجل الخطوبة.",
    heroJoinBtn: "الانضمام كعضو موثق رسمياً",
    heroCharterBtn: "الاطلاع على ميثاق الشرف",
    
    pillarsTitle: "أركان ميثاق برستيج",
    pillar1: "0 حساب وهمي : تأكيد الهاتف برمز SMS وميثاق الشرف (البطاقة عند عتبة العائلات).",
    pillar2: "وضع الحشمة : خيار حجب الصورة لحفظ الخصوصية والحياء.",
    pillar3: "عرض الرواد : مجاني لأول 100 رجل و 100 امرأة، ثم 100 درهم/سنة.",
    pillar4: "iOS وأندرويد : تطبيق ويب تقدمي سريع وخفيف.",

    pioneerKicker: "عرض الانطلاق الحصري · خاص بالمغاربة في العالم والوطن",
    pioneerTitle: "مجاني بالكامل لأول",
    pioneerMenHighlight: "100 رجل جاد",
    pioneerAnd: "و",
    pioneerWomenHighlight: "100 امرأة كريمة",
    pioneerDesc: "مخصص حصرياً للمغاربة في أرض الوطن والمغتربين في العالم. نمنح العضوية الكاملة الموثقة مجاناً لأول 200 رائد ورائدة (100 رجل و 100 امرأة). الاشتراكات اللاحقة ستكون بمساهمة رمزية قدرها 100 درهم سنوياً لضمان الجدية.",
    pioneerMen: "الرجال",
    pioneerWomen: "النساء",
    pioneerSpotsOffered: "مقعد مجاني متبقي",
    pioneerCertifiedRegistered: "مسجلون موثقون",
    pioneerReserveBtn: "حجز مقعدي المجاني",
    pioneerDetailsFee: "تفاصيل الاشتراك (100 درهم/سنة)",
    pioneerTrustDoubleCheck: "تحقق مزدوج إلزامي (الهاتف عبر SMS وميثاق الشرف - البطاقة عند الخطوبة)",
    pioneerTrustMatrimonial: "التزام حصري بالزواج الشرعي",
    pioneerTrustPrivacy: "حماية تامة للخصوصية مع خيار حجب الصورة",

    searchPlaceholder: "بحث بالمهنة، مراكز الاهتمام، أو الكلمات المفتاحية...",
    searchByProfessionLabel: "تصفية حسب المهنة",
    searchByInterestLabel: "تصفية حسب الاهتمام",
    searchScopeAll: "بحث شامل",
    searchScopeProfession: "المهن",
    searchScopeInterests: "الاهتمامات",
    popularProfessionTags: "أبرز المهن :",
    popularInterestTags: "أبرز الاهتمامات :",
    clearSearchBtn: "مسح البحث",
    matchingProfessions: "مهن مطابقة :",
    matchingInterests: "اهتمامات مطابقة :",
    searchFoundCount: "ملف(ات) متطابق(ة)",
    allLocations: "جميع المدن والجهات",
    genderAll: "الكل",
    genderWomen: "نساء",
    genderMen: "رجال",
    favoritesBtn: "المفضلة",
    interestsBtn: "الاهتمامات",
    keyInterestsLabel: "الاهتمامات الرئيسية :",
    resetFilters: "إعادة ضبط التصفية",
    advancedInterestsTitle: "اختر الاهتمامات والقيم المشتركة :",
    educationLabel: "المستوى الدراسي",
    allEducation: "جميع المستويات",
    maritalStatusLabel: "الحالة العائلية",
    allMaritalStatus: "جميع الحالات",
    onlyVerifiedLabel: "فقط الحسابات المؤكدة برمز SMS وميثاق الشرف (البطاقة عند الخطوبة)",
    resultsCount: "ملف موثق يطابق معاييرك المختارة",
    noFakeProfilesGuarantee: "ضمان ميثاق : صفر حساب وهمي",
    favoritesActiveBannerTitle: "ملفاتك المفضلة المحفوظة",
    favoritesActiveBannerDesc: "هذه الملفات محفوظة في جهازك للرجوع إليها والاطلاع عليها بعناية.",
    showAllProfilesBtn: "عرض جميع الملفات الموثقة ←",
    noResultsFound: "لم يتم العثور على ملفات تطابق هذه المعايير",
    noResultsDesc: "يرجى تعديل خيارات المدينة أو الاهتمامات لاكتشاف المزيد من الأعضاء الموثقين.",
    noFavoritesFound: "لا توجد ملفات في قائمتك المفضلة حالياً",
    noFavoritesDesc: "اضغط على أيقونة القلب الوردي الموجودة على أي بطاقة لحفظ الشخص الذي يلائم تطلعاتك الزوجية.",
    discoverProfilesBtn: "استكشاف الملفات الموثقة",

    verificationCINandSMS: "موثق بـ SMS والشرف · البطاقة عند الخطوبة",
    marriageVisionLabel: "رؤية الزواج والبيت",
    interestsLabel: "الاهتمامات والميول :",
    viewDossierBtn: "الاطلاع على الملف الكامل",
    chatBtn: "مراسلة راقية",
    yearsOld: "سنة",
    pudeurMode: "وضع الحشمة",
    quickPreviewBtn: "معاينة سريعة",
    quickPreviewTitle: "معاينة موجزة للملف",
    closePreviewBtn: "إغلاق المعاينة",
    bioSnippetLabel: "نبذة عن السيرة الذاتية",
    topInterestsLabel: "أبرز 3 اهتمامات",
    openFullDossierFromPreview: "فتح الملف الزوجي الكامل ←",

    dossierTitle: "الملف الزوجي الرسمي المعتمد",
    authenticityCertifiedTitle: "مصداقية معتمدة ومحققة من ميثاق برستيج",
    authenticityCertifiedDesc: "تم التحقق من الهاتف برمز SMS وتوقيع ميثاق الشرف. صوناً للخصوصية والقانون، تُطلب البطاقة الوطنية فقط عند مرحلة الخطوبة الرسمية وعتبة الأسرتين.",
    familyStageCINSectionTitle: "مرحلة الخطوبة وعتبة الأسرتين (طلب المصاهرة)",
    familyStageCINSectionDesc: "عندما تتوافق الرغبة الصادقة في الارتباط، تصل العلاقة إلى عتبة الأسرتين. في هذه المحطة الكريمة والمشروعة، يتم التبادل المتبادل لبطاقات التعريف الوطنية (CIN) والتنسيق العائلي المباشر بالمعروف.",
    familyStageCINBtn: "تفعيل مرحلة الخطوبة وتبادل بطاقة التعريف (CIN)",
    familyStageActivatedSuccess: "تم تفعيل مرحلة الخطوبة بنجاح ! أُرسلت دعوة التواصل الأسري لتبادل البطاقات الرسمية بحضور العائلة.",
    personalDataTitle: "البيانات الشخصية والاجتماعية",
    maritalStatusHeader: "الحالة الاجتماعية",
    educationHeader: "المستوى العلمي",
    childrenHeader: "الأبناء",
    noChildren: "بدون أطفال",
    hasChildren: "طفل/أطفال",
    heightHeader: "الطول",
    practiceHeader: "الالتزام والأخلاق",
    familyFrameworkHeader: "الإطار الأسري",
    waliAvailable: "إمكانية التواصل مع الولي أو الأسرة",
    autonomousRespect: "مستقل بوقار",
    presentationLifestyleTitle: "التعريف الشخصي ونمط العيش",
    lifestyleLabel: "طبيعة الحياة اليومية :",
    reportMisconductBtn: "الإبلاغ عن مخالفة لأخلاقيات الميثاق",
    blockUserBtn: "حظر هذا العضو",
    unblockUserBtn: "إلغاء حظر العضو",
    userBlockedNotice: "هذا العضو محظور حالياً. تم إيقاف المراسلة حرصاً على راحتكم وسلامتكم.",
    userBlockedBannerTitle: "المحادثة معلقة : العضو محظور",
    userBlockedBannerDesc: "لقد قمت بحظر هذا المستخدم. لن تتلقى منه أية رسائل أو إشعارات بعد الآن.",
    blockedBadge: "محظور",
    confirmBlockTitle: "تأكيد حظر هذا الحساب ؟",
    confirmBlockDesc: "عند حظر هذا العضو، لن يتمكن من مراسلتك وسيتم إخفاء ملفه من قائمة البحث وتعليق المحادثة.",
    confirmBlockBtn: "تأكيد الحظر",
    userBlockedSuccessToast: "تم حظر هذا العضو بنجاح.",
    userUnblockedSuccessToast: "تم إلغاء الحظر، يمكنكم استئناف التواصل.",
    backBtn: "رجوع",
    startExchangeBtn: "بدء محادثة جادة ومحترمة",
    saveFavoriteBtn: "حفظ في المفضلة",
    savedFavoriteActiveBtn: "في قائمتك المفضلة",

    verificationModalTitle: "التسجيل الآمن والتحقق المزدوج من الهوية",
    step1Title: "الملف الزوجي",
    step2Title: "رمز الهاتف SMS",
    step3Title: "ميثاق الشرف",
    step4Title: "صفة الرائد",
    freeSpotsRemaining: "عرض الانطلاق : المقاعد المجانية المتبقية",
    fullNameLabel: "الاسم الكامل الكريم *",
    fullNamePlaceholder: "مثال: أمينة البناني أو كريم الفاسي",
    youAreLabel: "الجنس *",
    aWoman: "أنثى (امرأة)",
    aMan: "ذكر (رجل)",
    ageLabel: "العمر *",
    countryLabel: "بلد الإقامة *",
    cityLabel: "مدينة الإقامة *",
    professionLabel: "المهنة / التخصص *",
    customProfessionLabel: "يرجى تحديد التخصص المهني بدقة *",
    allProfessions: "جميع المهن",
    marriageVisionInputLabel: "رؤيتكم لبناء الأسرة والزواج (عنصر جوهري) *",
    marriageVisionPlaceholder: "ما هي مبادئكم في العلاقة الزوجية، وتصوركم للمودة والمسؤولية المشتركة في البيت ؟",
    interestsSelectionLabel: "أبرز الاهتمامات والقيم (اختر حتى 5) :",
    enablePudeurLabel: "تفعيل وضع الحشمة (حجب الصورة مبدئياً)",
    enablePudeurDesc: "تظل صورتك غير ظاهرة للعامة، وتمنح الإذن برؤيتها حصرياً لمن ترتضي خلقه بعد التعارف.",
    nextStepPhoneBtn: "المرحلة التالية : التحقق من الهاتف النقال",
    phoneStepTitle: "التحقق الأول : رقم الهاتف المحمول المغربي (+212)",
    phoneStepDesc: "سيصلك رمز أمان سري مكون من 6 أرقام. يُقبل حصرياً الرمز الهاتفي المغربي (+212) لضمان انتماء ومصداقية مجتمع ميثاق.",
    phoneOnly212Notice: "المنصة مخصصة حصرياً للمغاربة في الوطن والعالم : يُقبل فقط المفتاح الدولي المغربي +212.",
    phoneLabel: "رقم هاتفك النقال المغربي",
    invalidMoroccanPhone: "يرجى إدخال رقم هاتف محمول مغربي صحيح مكون من 9 أرقام يبدأ بـ 6 أو 7 (مثال: 612345678).",
    sendCodeBtn: "إرسال الرمز",
    sendingBtn: "جارٍ الإرسال...",
    resendCodeBtn: "إعادة إرسال الرمز",
    smsReceivedFrom: "رسالة نصية واردة من \"Mithaq-SMS\" :",
    copyCodeBtn: "نسخ الرمز",
    smsMessageText: "رمز تأكيد حسابك في ميثاق برستيج هو :",
    enter6DigitLabel: "أدخل الرمز المكون من 6 أرقام",
    invalidOtpError: "الرمز المدخل غير مطابق، يرجى كتابة الرمز الوارد في الإشعار الآمن.",
    backToInfoBtn: "الرجوع لتعديل البيانات",
    validatePhoneBtn: "تأكيد رقم الهاتف",
    idStepTitle: "التحقق الثاني : التصريح الشرفي والالتزام بالزواج الشرعي",
    idStepDesc: "امتثالاً للقانون وحمايةً لخصوصيتكم، فإن المؤسسات الرسمية فقط هي المخولة بطلب بطاقة التعريف. لذا، لا تطلب منصة ميثاق رفع البطاقة الوطنية عند التسجيل، وإنما يُشترط تبادلها لاحقاً عند الوصول إلى مرحلة الخطوبة الرسمية وعتبة الأسرتين.",
    cinPostponedNoticeTitle: "لماذا لا نطلب بطاقة التعريف الوطنية في هذه المرحلة ؟",
    cinPostponedNoticeDesc: "حمايةً لبياناتكم الشخصية وامتثالاً للقانون : يُرجأ الاطلاع على بطاقة التعريف إلى اللحظة الجادة التي يتقدم فيها الخاطب لطلب يد المخطوبة أمام الأسرتين.",
    honorPledgeDeclaration: "أصرح بشرفي وذمتي بصدق وصحة جميع المعلومات المدخلة في ملفي (الاسم، السن، الحالة الاجتماعية، المهنة).",
    honorPledgeEthics: "أعاهد الله تعالى على قصر مسعاي في المنصة بنية صادقة وخالصة للزواج الشرعي والبيت الصالح.",
    honorPledgeFamilyReady: "ألتزم بالاستعداد لتقديم بطاقتي الوطنية الرسمية متى ما وصلت العلاقة إلى عتبة الخطوبة الرسمية ولقاء الأسرتين.",
    analyzingBiometrics: "جارٍ توثيق ميثاق الشرف واعتماد الختم الذهبي للملف...",
    idVerifiedSuccess: "تم اعتماد ميثاق الشرف بنجاح ومنح شارة التوثيق الرسمية !",
    startComplianceAuditBtn: "المصادقة والتوقيع الشرفي على الميثاق",
    finishRegistrationBtn: "إتمام التسجيل الموثق بنجاح",
    pioneerCongratsTitle: "هنيئاً لكم الانضمام للأعضاء الرواد المؤسسين !",
    certifiedSuccessTitle: "تم توثيق وتأكيد حسابكم في ميثاق برستيج",
    pioneerCongratsDesc: "مبارك لكم ! أنتم ضمن أول 100 عضو رائد. نتشرف بمنحكم العضوية السنوية التي تبلغ قيمتها 100 درهم مجاناً مدى الحياة تقديراً لجدية مسعاكم.",
    certifiedSuccessDesc: "تمت مطابقة هويتكم ورقمكم بنجاح تام، وأصبح حسابكم متاحاً للتواصل الموثق والآمن في مجتمع ميثاق الراقي.",
    accountHolder: "صاحب الحساب :",
    smsValidated: "تأكيد الهاتف :",
    cinConformed: "مطابقة البطاقة :",
    appliedFee: "الاشتراك :",
    freeFeePioneer: "مجاني بالكامل (عرض الرواد)",
    exploreProfilesSuccessBtn: "تصفح الملفات الموثقة وبدء التعارف المبارك",

    conversationsTitle: "المحادثات الجادة الهادفة",
    conversationsActive: "نشطة",
    chatEncryptedNotice: "🔒 محادثات مشفرة وتخضع لضوابط ميثاق الشرف الأخلاقي",
    decencyNotice: "مبدأ اللياقة : كلام طيب، مراعاة تامة للحياء، وقصد نقي خالص لبناء بيت الزوجية.",
    tenMatrimonialQuestionsBtn: "الأسئلة العشرة الجوهرية للزواج",
    askRecommendedQuestion: "طرح سؤال زوجي جوهري موصى به :",
    requestPhotoAccessBtn: "طلب تبادل الصور",
    chatInputPlaceholder: "اكتب رسالة مهذبة، واضحة ومبنية على الاحترام...",
    typingIndicator: "يكتب بروية واهتمام...",
    proposeProjectsExchange: "🤝 اقتراح نقاش حول الرؤية المستقبلية",
    primeQualitiesPrompt: "🕊️ ما أهم الخصال التي تنشدها في شريك العمر ؟",
    mutualPhotoPrompt: "طلب تبادل الصور باحترام ومسؤولية",
    proposeFamilyStagePrompt: "💍 اقتراح مرحلة الخطوبة وتبادل البطاقة",
    familyStageInviteMessage: "💍 اقتراح مبارك : نظراً لتوافق رؤيتنا وجدية مسعانا، يشرفني أن أقترح الانتقال إلى مرحلة الخطوبة وعتبة الأسرتين، لتبادل بطاقات التعريف الوطنية الرسمية والتنسيق للتواصل مع الأسرة أو الولي بالمعروف.",

    charterTitle: "ميثاق الشرف والأخلاق والسرية التامة",
    charterSubtitle: "العهود الوثيقة التي يلتزم بها كل عضو في منصة ميثاق برستيج",
    charterPreamble: "« وَأَخَذْنَ مِنكُم مِّيثَاقًا غَلِيظًا » — الزواج عهد إلهي مقدس، ورابطة شريفة قائمة على المودة والرحمة والسكينة والوقار.",
    charterPillar1Title: "1. صدق النية وقصر القصد على الزواج الشرعي",
    charterPillar1Desc: "يتعهد كل عضو تعهداً قاطعاً بعدم استخدام المنصة إلا بنية جادة وصادقة للزواج الحلال الدائم. يمنع منعاً باتاً أي تسلية أو علاقات عابرة، ويؤدي ذلك للحظر الفوري والنهائي.",
    charterPillar2Title: "2. الاحترام المطلق وصيانة الحياء والكرامة",
    charterPillar2Desc: "يجب أن يتسم كل حوار باللباقة العالية وحسن الخلق وطيب المعاملة. لا تسامح مع أي كلام بذيء أو مضايقة أو تجاوز لحدود الأدب والحشمة.",
    charterPillar3Title: "3. السرية التامة وحفظ الخصوصية ووضع الحشمة",
    charterPillar3Desc: "أسرار الناس وأعراضهم وبياناتهم أمانة مقدسة. يمنع تصوير الشاشات أو نشر الصور أو مشاركة البيانات دون إذن صريح. وضع الحشمة بحجب الصورة هو حق أصيل لكل عضو يُحترم ويُصان.",
    charterPillar4Title: "4. الترحيب بدور الأسرة والولي الشرعي",
    charterPillar4Desc: "يشجع ميثاق برستيج إشراك العائلة والولي متى ما تلاقت الأرواح وتوافق الرأي، تيسيراً للبركة والوضوح والوفاق في الخطبة والمصاهرة.",
    charterSolemnCommitment: "الموافقة والالتزام إلزامي لكل عضو منضم",
    charterAdhereBtn: "أوافق وألتزم بميثاق الشرف",

    subscriptionsTitle: "باقات العضوية وعرض الرواد المؤسسين",
    subscriptionsSubtitle: "اشتراك عادل ومنصف لحفظ جدية المنصة وصيانة بيئة الزواج",
    pioneerPlanTitle: "عرض الأعضاء المؤسسين",
    limitedSpots: "مقاعد محدودة",
    pioneerPerYearForever: "/ سنة مدى الحياة",
    pioneerPlanDesc: "مخصص لأول 100 رجل و 100 امرأة بعد اجتياز التحقق المزدوج بالبطاقة الوطنية والهاتف.",
    pioneerFeature1: "تحقق مزدوج مجاني بالبطاقة و SMS",
    pioneerFeature2: "اطلاع غير محدود على الملفات الموثقة",
    pioneerFeature3: "مراسلة فورية سرية وآمنة بالكامل",
    pioneerFeature4: "شارة حصرية: عضو رائد مؤسس",
    standardPlanTitle: "الاشتراك السنوي المعتمد",
    postPioneerBadge: "بعد اكتمال الرواد",
    perYear: "/ سنوياً",
    standardPlanDesc: "مساهمة رمزية لحماية المجتمع من المتلاعبين وتمويل تكاليف التدقيق الإنساني والتقني للوثائق.",
    standardFeature1: "تدقيق واعتماد الهوية الرسمية",
    standardFeature2: "صلاحية 365 يوماً كاملة في المنصة",
    standardFeature3: "محادثات خاصة بدون حدود",
    standardFeature4: "مرافقة وإشراف أخلاقي مستمر",
    whyFeeQuestion: "لماذا مساهمة 100 درهم في السنة ؟",
    whyFeeAnswer: "في تقاليدنا وأعرافنا الكريمة، يبدأ الالتزام بالجدية ببرهان الاعتبار. هذه المساهمة الزهيدة تفصل بين الراغب بصدق في تكوين أسرة وبين المتطفلين، وتضمن بقاء المنصة نقية وخالصة لأصحاب النوايا الطيبة.",
    securePaymentLabel: "تشفير مصرفي آمن 256 بت عبر CMI و البطاقات البنكية",
    reservePioneerBtn: "حجز مقعدي الرائد مجاناً (0 درهم)",
    subscribeStandardBtn: "الاشتراك السنوي (100 درهم / سنة)",

    mobileAppTitle: "تطبيق الهاتف الذكي iOS و أندرويد",
    mobileAppSubtitle: "تجربة راقية، سريعة، مشفرة وخاصة على هاتفك النقال",
    iosTab: "أبل iOS (آيفون)",
    androidTab: "أندرويد (جوجل)",
    iosGuideTitle: "تثبيت فوري مباشر بدون الحاجة لـ App Store :",
    iosStep1: "افتح المنصة عبر متصفح Safari على جهاز الآيفون الخاص بك.",
    iosStep2: "اضغط على زر المشاركة (Share) في أسفل شاشة الهاتف.",
    iosStep3: "اختر « إضافة إلى الصفحة الرئيسية » (Sur l'écran d'accueil) ثم أكّد.",
    androidGuideTitle: "تثبيت سريع ومباشر على هواتف أندرويد :",
    androidStep1: "افتح المنصة على متصفح Google Chrome أو Samsung Internet.",
    androidStep2: "اضغط على شريط « تثبيت ميثاق برستيج » أو قائمة الثلاث نقاط.",
    androidStep3: "تظهر الأيقونة الذهبية للتطبيق مباشرة على شاشة هاتفك الرئيسية.",
    appAdvantageNotifications: "إشعارات هادئة وسرية بدون أي كشف للخصوصية",
    appAdvantageBiometric: "قفل التطبيق ببصمة الوجه أو الأصبع (Face ID)",
    appInstalledSuccess: "تم تثبيت التطبيق بنجاح !",
    installAppBtn: "إضافة ميثاق برستيج إلى هاتفي",

    reportTitle: "الإبلاغ عن مخالفة لأخلاقيات المنصة",
    reportRecorded: "تم تسجيل البلاغ بنجاح",
    reportRecordedDesc: "ستقوم لجنة الأخلاقيات بمراجعة السلوك خلال ساعتين مع الحفاظ التام والقطعي على سرية هويتكم.",
    concernedProfile: "الحساب المعني :",
    mainReasonLabel: "السبب الرئيسي للبلاغ :",
    reason1: "انعدام اللباقة أو استعمال ألفاظ غير لائقة",
    reason2: "عدم وجود نية صادقة للزواج (التسلية والمضيعة)",
    reason3: "اشتباه في انتحال شخصية أو تزوير بيانات",
    reason4: "عدم احترام الحشمة أو الإلحاح غير المقبول",
    detailsLabel: "توضيحات إضافية (سرية) :",
    detailsPlaceholder: "اكتب تفاصيل ما حدث باقتضاب ومصداقية...",
    cancelBtn: "إلغاء",
    submitReportBtn: "إرسال إلى لجنة الأخلاقيات",

    footerPlatformSubtitle: "المنصة الزوجية الحصرية للمغاربة في المغرب وحول العالم (خاص بالمغاربة في العالم)",
    footerRights: "ميثاق برستيج. جميع الحقوق محفوظة ومحمية."
  }
};

export const CITIES_ARABIC: Record<string, string> = {
  'Casablanca': 'الدار البيضاء',
  'Rabat': 'الرباط',
  'Marrakech': 'مراكش',
  'Tanger': 'طنجة',
  'Fès': 'فاس',
  'Agadir': 'أكادير',
  'Oujda': 'وجدة',
  'Tétouan': 'تطوان',
  'Meknès': 'مكناس',
  'Kénitra': 'القنيطرة',
  'Salé': 'سلا',
  'Nador': 'الناظور',
  'Mohammédia': 'المحمدية',
  'El Jadida': 'الجديدة',
  'Safi': 'آسفي',
  'Béni Mellal': 'بني ملال',
  'Laâyoune': 'العيون',
  'Dakhla': 'الداخلة',
  'Autre ville marocaine': 'مدينة مغربية أخرى',
  'Paris (Diaspora)': 'باريس (الجالية)',
  'Paris & Île-de-France': 'باريس وضواحيها',
  'Lyon': 'ليون',
  'Lyon (Diaspora)': 'ليون (الجالية)',
  'Marseille': 'مارسيليا',
  'Toulouse': 'تولوز',
  'Bordeaux': 'بوردو',
  'Lille': 'ليل',
  'Strasbourg': 'ستراسبورغ',
  'Montpellier': 'مونبلييه',
  'Nice': 'نيس',
  'Autre ville (France)': 'مدينة أخرى (فرنسا)',
  'Bruxelles': 'بروكسل',
  'Bruxelles (Diaspora)': 'بروكسل (الجالية)',
  'Anvers': 'أنتويرب',
  'Liège': 'لييج',
  'Charleroi': 'شارلروا',
  'Gand': 'غينت',
  'Autre ville (Belgique)': 'مدينة أخرى (بلجيكا)',
  'Madrid': 'مدريد',
  'Madrid (Diaspora)': 'مدريد (الجالية)',
  'Barcelone': 'برشلونة',
  'Valence': 'بلنسية',
  'Séville': 'إشبيلية',
  'Malaga': 'مالقة',
  'Alicante': 'أليكانتي',
  'Autre ville (Espagne)': 'مدينة أخرى (إسبانيا)',
  'Montréal': 'مونتريال',
  'Montréal (Diaspora)': 'مونتريال (الجالية)',
  'Québec': 'كيبك',
  'Toronto': 'تورونتو',
  'Ottawa': 'أوتاوا',
  'Calgary': 'كالغاري',
  'Autre ville (Canada)': 'مدينة أخرى (كندا)',
  'Dubaï': 'دبي',
  'Dubaï (Diaspora)': 'دبي (الجالية)',
  'Abou Dabi': 'أبو ظبي',
  'Sharjah': 'الشارقة',
  'Autre émirat': 'إمارة أخرى',
  'Amsterdam': 'أمستردام',
  'Rotterdam': 'روتردام',
  'La Haye': 'لاهاي',
  'Utrecht': 'أوتريخت',
  'Autre ville (Pays-Bas)': 'مدينة أخرى (هولندا)',
  'Francfort': 'فرانكفورت',
  'Düsseldorf / Cologne': 'دوسلدورف / كولونيا',
  'Berlin': 'برلين',
  'Munich': 'ميونخ',
  'Autre ville (Allemagne)': 'مدينة أخرى (ألمانيا)',
  'Milan & Lombardie': 'ميلانو ولومبارديا',
  'Turin': 'تورينو',
  'Bologne': 'بولونيا',
  'Rome': 'روما',
  'Autre ville (Italie)': 'مدينة أخرى (إيطاليا)',
  'Londres': 'لندن',
  'Manchester': 'مانشستر',
  'Birmingham': 'برمنغهام',
  'Autre ville (UK)': 'مدينة أخرى (بريطانيا)',
  'New York / New Jersey': 'نيويورك / نيوجيرسي',
  'Miami & Floride': 'ميامي وفلوريدا',
  'Washington DC / Virginie': 'واشنطن العاصمة وفيرجينيا',
  'Los Angeles / Californie': 'لوس أنجلوس وكاليفورنيا',
  'Autre ville (USA)': 'مدينة أخرى (أمريكا)',
  'Autre métropole internationale': 'عاصمة دولية أخرى'
};

export const INTERESTS_ARABIC: Record<string, string> = {
  'Littérature & Poésie': 'الأدب والشعر',
  'Voyages culturels': 'الأسفار والرحلات الثقافية',
  'Randonnée & Nature': 'الطبيعة والتجوال الجبلي',
  'Gastronomie saine': 'التغذية الصحية والطبخ',
  'Sciences & Tech': 'العلوم والتكنولوجيا',
  'Architecture & Design': 'العمارة والتصميم',
  'Bénévolat & Entraide': 'العمل الخيري والتطوع',
  'Art & Calligraphie': 'الفن والخط العربي',
  'Sport équestre': 'الفروسية وركوب الخيل',
  'Développement personnel': 'التطوير الذاتي والقراءة',
  'Jardinage & Botanique': 'البستنة وعلم النبات',
  'Histoire & Patrimoine': 'التاريخ والتراث الأصيل',
  'Natation & Fitness': 'السباحة واللياقة البدنية',
  'Économie & Finance': 'الاقتصاد وريادة الأعمال'
};

export const EDUCATION_ARABIC: Record<string, string> = {
  'Doctorat / PhD': 'دكتوراه / PhD',
  'Master / Ingénieur (Bac+5)': 'ماستر / مهندس دولة (Bac+5)',
  'Licence (Bac+3)': 'إجازة / باك+3 (Bac+3)',
  'Formation supérieure': 'دراسات عليا وتكوين مهني'
};

export const MARITAL_STATUS_ARABIC: Record<string, string> = {
  'Célibataire jamais marié(e)': 'أعزب / عزباء (لم يسبق الزواج)',
  'Divorcé(e) sans enfant': 'مطلق(ة) بدون أطفال',
  'Divorcé(e) avec enfant(s)': 'مطلق(ة) مع أطفال',
  'Veuf / Veuve': 'أرمل / أرملة'
};

export const COUNTRIES_ARABIC: Record<string, string> = {
  'Maroc': 'المغرب',
  'France': 'فرنسا',
  'Belgique': 'بلجيكا',
  'Espagne': 'إسبانيا',
  'Canada': 'كندا',
  'Émirats Arabes Unis': 'الإمارات العربية المتحدة',
  'Pays-Bas': 'هولندا',
  'Allemagne': 'ألمانيا',
  'Italie': 'إيطاليا',
  'Royaume-Uni': 'المملكة المتحدة',
  'États-Unis': 'الولايات المتحدة',
  'Autre pays (MRE)': 'بلد آخر (الجالية)'
};

export const PROFESSIONS_ARABIC: Record<string, string> = {
  "Cadre Supérieur / Consultant / Finance & Banque": "إطار سامٍ / مستشار / مالية وأبناك",
  "Ingénieur d'État / Tech & Informatique": "مهندس دولة / تكنولوجيا ومعلوماتيات",
  "Médecin / Chirurgien / Dentiste / Pharmacien": "طبيب / جراح / طبيب أسنان / صيدلي",
  "Enseignant / Professeur Universitaire / Chercheur": "أستاذ / باحث جامعي / تعليم عالٍ",
  "Avocat / Notaire / Magistrat / Juriste d'Affaires": "محامٍ / موثق / قاضٍ / مستشار قانوني",
  "Architecte / Designer / Ingénieur BTP": "مهندس معماري / تصميم وهندسة مدنية",
  "Chef d'Entreprise / Entrepreneur / Commerçant": "مسير مقاولة / رائد أعمال / تاجر",
  "Fonctionnaire d'État / Administrateur Public": "موظف دولة / إداري في القطاع العام",
  "Expert-Comptable / Analyste Financier / Contrôleur de Gestion": "خبير محاسب / محلل مالي / تدبير مالي",
  "Cadre Ressources Humaines / Marketing & Communication": "إطار موارد بشرية / تسويق وتواصل",
  "Profession Paramédicale / Santé": "مهنة شبه طبية / تمريض / ترويض طبي",
  "Pilote de Ligne / Officier Aviation & Marine": "ربان طائرة / ضابط ملاحة",
  "Artisan d'Art / Métier d'Excellence": "صانع تقليدي / حرفي مغربي أصيل",
  "Étudiant(e) en Cycle Supérieur (Master / Doctorat)": "طالب(ة) دراسات عليا (ماستر / دكتوراه)",
  "Autre profession libérale / Spécialité": "مهنة حرة أخرى / تخصص آخر"
};

export const MATRIMONIAL_QUESTIONS_ARABIC = [
  "ما هي القيم الثلاث الأهم بالنسبة لكم في بناء عش الزوجية ؟",
  "كيف تتصورون التوازن بين الطموح المهني ومسؤوليات الحياة الأسرية ؟",
  "ما هي المكانة التي تحتلها الروحانيات والتقاليد في حياتكم اليومية ؟",
  "ما هو دور الأسرة الممتدة (الوالدين والإخوة) في قراراتكم ومشاريعكم ؟",
  "كيف تفضلون إدارة الخلافات أو لحظات التعب داخل فضاء البيت ؟",
  "ما هو مشروعكم الأسري بعد خمس سنوات بإذن الله (الاستقرار، الأبناء) ؟"
];
