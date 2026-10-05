import React, { useState } from 'react';
import { ShieldCheck, Smartphone, Eye, EyeOff, Lock, Check } from 'lucide-react';

interface PrestigeAvatarProps {
  photoUrl: string;
  name: string;
  isBlurred?: boolean;
  isVerified?: boolean;
  isVerifiedPhone?: boolean;
  isVerifiedId?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  showPrivacyControl?: boolean;
  onToggleBlur?: () => void;
  gender?: 'homme' | 'femme';
}

export const PrestigeAvatar: React.FC<PrestigeAvatarProps> = ({
  photoUrl,
  name,
  isBlurred = false,
  isVerified,
  isVerifiedPhone,
  isVerifiedId,
  size = 'md',
  className = '',
  showPrivacyControl = false,
  onToggleBlur,
  gender = 'femme'
}) => {
  const [imageError, setImageError] = useState(false);
  const [localBlurred, setLocalBlurred] = useState(isBlurred);

  // Compute effective verification flags
  const hasPhone = isVerifiedPhone ?? (isVerified ?? true);
  const hasId = isVerifiedId ?? (isVerified ?? true);
  const hasDouble = hasPhone && hasId;

  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-base',
    lg: 'w-24 h-24 text-xl',
    xl: 'w-32 h-32 text-2xl',
    hero: 'w-full aspect-[4/5] text-3xl'
  };

  const badgeSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
    hero: 'w-7 h-7'
  };

  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleBlur) {
      onToggleBlur();
    } else {
      setLocalBlurred(!localBlurred);
    }
  };

  const isCurrentBlurred = onToggleBlur ? isBlurred : localBlurred;

  return (
    <div className={`relative shrink-0 overflow-hidden ${sizeClasses[size]} ${className}`}>
      {/* Container with gold rim */}
      <div className="w-full h-full rounded-2xl overflow-hidden ring-1 ring-[#d4af37]/30 bg-gradient-to-br from-[#2a1720] via-[#1a1215] to-[#140c10] flex items-center justify-center">
        {!imageError && photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isCurrentBlurred ? 'blur-xl scale-110 filter saturate-75 contrast-125' : 'blur-0 scale-100'
            }`}
          />
        ) : (
          /* High-luxury fallback monogram container */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#3b1d28] via-[#24131b] to-[#120a0f] p-2 text-center">
            <div className="w-8 h-8 rounded-full border border-[#d4af37]/40 flex items-center justify-center mb-1 bg-[#d4af37]/10">
              <span className="font-display font-semibold text-[#f8ede8]">{initials}</span>
            </div>
            {size !== 'sm' && (
              <span className="text-[10px] text-[#d4af37]/80 font-serif tracking-wider uppercase">
                {gender === 'femme' ? 'Mithaq Dame' : 'Mithaq Homme'}
              </span>
            )}
          </div>
        )}

        {/* Privacy overlay if blurred */}
        {isCurrentBlurred && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[6px] flex flex-col items-center justify-center p-2 text-center pointer-events-none">
            <div className="w-8 h-8 rounded-full bg-[#1e1319]/80 border border-[#d4af37]/30 flex items-center justify-center text-[#f8ede8] mb-1">
              <Lock className="w-4 h-4 text-[#d4af37]" />
            </div>
            {size !== 'sm' && (
              <span className="text-[10px] font-sans font-medium text-[#fde2e4] px-2 py-0.5 rounded bg-black/50">
                Mode Pudeur
              </span>
            )}
          </div>
        )}

        {/* Privacy toggle button if requested */}
        {showPrivacyControl && (
          <button
            onClick={handleToggle}
            type="button"
            className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-[#fde2e4] border border-[#d4af37]/30 transition-colors"
            title={isCurrentBlurred ? "Révéler la photo" : "Activer le mode pudeur"}
            aria-label="Toggle photo blur"
          >
            {isCurrentBlurred ? <Eye className="w-3.5 h-3.5 text-[#d4af37]" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-300" />}
          </button>
        )}
      </div>

      {/* Visual Verified Badge (Dynamic style & color based on Phone vs ID vs Double) */}
      {hasDouble ? (
        <div 
          className="absolute -bottom-1 -right-1 z-10 bg-gradient-to-tr from-[#d4af37] via-[#f7e6a5] to-emerald-400 p-1 rounded-full shadow-md shadow-black/70 ring-2 ring-[#120a0f] flex items-center justify-center transition-transform hover:scale-110"
          title="Double Vérification : Téléphone SMS (+212) & Identité / Engagement d'Honneur"
        >
          <ShieldCheck className={`${badgeSizes[size]} text-[#160d13] stroke-[2.5]`} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#160d13] ring-1 ring-emerald-300" />
        </div>
      ) : hasPhone ? (
        <div 
          className="absolute -bottom-1 -right-1 z-10 bg-gradient-to-tr from-emerald-600 via-emerald-400 to-teal-300 p-1 rounded-full shadow-md shadow-black/70 ring-2 ring-[#120a0f] flex items-center justify-center text-[#092215] transition-transform hover:scale-110"
          title="Téléphone marocain vérifié par SMS OTP (+212)"
        >
          <Smartphone className={`${badgeSizes[size]} text-[#092215] stroke-[2.5]`} />
        </div>
      ) : hasId ? (
        <div 
          className="absolute -bottom-1 -right-1 z-10 bg-gradient-to-tr from-[#b8860b] via-[#d4af37] to-[#fce0a2] p-1 rounded-full shadow-md shadow-black/70 ring-2 ring-[#120a0f] flex items-center justify-center transition-transform hover:scale-110"
          title="Identité & Engagement d'Honneur certifiés"
        >
          <ShieldCheck className={`${badgeSizes[size]} text-[#160d13] stroke-[2.5]`} />
        </div>
      ) : null}
    </div>
  );
};
