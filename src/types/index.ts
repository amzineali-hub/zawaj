export type Gender = 'homme' | 'femme';

export type MaritalStatus = 
  | 'Célibataire jamais marié(e)' 
  | 'Divorcé(e) sans enfant' 
  | 'Divorcé(e) avec enfant(s)' 
  | 'Veuf / Veuve';

export type EducationLevel = 
  | 'Doctorat / PhD' 
  | 'Master / Ingénieur (Bac+5)' 
  | 'Licence (Bac+3)' 
  | 'Formation supérieure';

export interface UserProfile {
  id: string;
  fullName: string;
  age: number;
  gender: Gender;
  city: string;
  country: string;
  profession: string;
  industry: string;
  education: EducationLevel;
  maritalStatus: MaritalStatus;
  heightCm: number;
  children: number;
  bio: string;
  marriageVision: string;
  lifestyle: string;
  religiousPractice: string;
  interests: string[];
  photoUrl: string;
  isPhotoBlurred: boolean; // Mode pudeur/discrétion
  isVerifiedId: boolean; // Statut certifié Mithaq
  isVerifiedPhone: boolean; // Numéro validé par SMS OTP
  isVerifiedHonorPledge?: boolean; // Serment d'Honneur et Engagement d'Authenticité
  familyStageReady?: boolean; // Seuil des familles & préparation vérification CIN officielle
  verifiedBadgeDate?: string;
  pioneerNumber?: number; // Ex: 42/100
  memberSince: string;
  waliContactAvailable?: boolean;
}

export interface FilterState {
  gender: 'tous' | 'homme' | 'femme';
  city: string;
  minAge: number;
  maxAge: number;
  education: string;
  maritalStatus: string;
  selectedInterests: string[];
  onlyVerified: boolean;
  onlyFavorites: boolean;
  searchQuery: string;
  searchScope?: 'all' | 'profession' | 'interests';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type?: 'text' | 'questionnaire' | 'photo_request' | 'audio';
  questionnaireAnswer?: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantCity: string;
  participantAge: number;
  participantProfession: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isVerified: boolean;
  photoRevealed: boolean;
}

export interface PioneerStats {
  menRegistered: number;
  menMax: number;
  womenRegistered: number;
  womenMax: number;
  annualFeeDH: number;
}
