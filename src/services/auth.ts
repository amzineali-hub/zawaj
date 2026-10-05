import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
  type User,
} from 'firebase/auth';
import { auth } from '../firebase';

export type OtpErrorCode =
  | 'invalid-phone'
  | 'too-many-requests'
  | 'invalid-code'
  | 'code-expired'
  | 'no-session'
  | 'unknown';

export class OtpError extends Error {
  constructor(public code: OtpErrorCode) {
    super(code);
  }
}

let recaptcha: RecaptchaVerifier | null = null;
let confirmation: ConfirmationResult | null = null;

/** Numéro marocain mobile (6xx / 7xx) → E.164, ou null s'il est invalide. */
export function toMoroccanE164(input: string): string | null {
  const digits = input.replace(/\D/g, '').replace(/^212/, '').replace(/^0/, '');
  if (digits.length !== 9 || !/^[67]/.test(digits)) return null;
  return `+212${digits}`;
}

function resetRecaptcha() {
  recaptcha?.clear();
  recaptcha = null;
}

function mapError(e: unknown): OtpError {
  const code = (e as { code?: string })?.code ?? '';
  if (code === 'auth/invalid-phone-number') return new OtpError('invalid-phone');
  if (code === 'auth/too-many-requests' || code === 'auth/quota-exceeded') {
    return new OtpError('too-many-requests');
  }
  if (code === 'auth/invalid-verification-code') return new OtpError('invalid-code');
  if (code === 'auth/code-expired') return new OtpError('code-expired');
  return new OtpError('unknown');
}

/** Envoie le SMS. `containerId` : id d'un élément du DOM qui accueille le reCAPTCHA invisible. */
export async function sendOtp(phoneInput: string, containerId: string): Promise<void> {
  const e164 = toMoroccanE164(phoneInput);
  if (!e164) throw new OtpError('invalid-phone');
  try {
    if (!recaptcha) {
      recaptcha = new RecaptchaVerifier(auth, containerId, { size: 'invisible' });
    }
    confirmation = await signInWithPhoneNumber(auth, e164, recaptcha);
  } catch (e) {
    resetRecaptcha();
    throw mapError(e);
  }
}

/** Valide le code côté Firebase : l'utilisateur est alors connecté (jeton sign_in_provider = 'phone'). */
export async function confirmOtp(code: string): Promise<User> {
  if (!confirmation) throw new OtpError('no-session');
  try {
    const result = await confirmation.confirm(code);
    confirmation = null;
    return result.user;
  } catch (e) {
    throw mapError(e);
  }
}
