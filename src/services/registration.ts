import { doc, onSnapshot, runTransaction, serverTimestamp, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import type { Gender, UserProfile } from '../types';

export const QUOTA_MAX = 100;

export interface QuotaCounts {
  men: number;
  women: number;
}

const quotaRef = () => doc(db, 'meta', 'quota');
const userRef = (uid: string) => doc(db, 'users', uid);

/** Compteurs de places gratuites, en temps réel. */
export function subscribeQuota(cb: (q: QuotaCounts) => void): () => void {
  return onSnapshot(
    quotaRef(),
    (snap) => {
      const d = snap.data();
      cb({ men: d?.men ?? 0, women: d?.women ?? 0 });
    },
    () => cb({ men: 0, women: 0 }),
  );
}

export type RegisterErrorCode = 'not-signed-in' | 'already-registered' | 'permission' | 'unknown';

export class RegisterError extends Error {
  constructor(public code: RegisterErrorCode) {
    super(code);
  }
}

/** Retire les `undefined` (refusés par Firestore). */
function clean<T extends object>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T;
}

/**
 * Crée le profil du membre connecté. Le numéro de pionnier et le plan sont attribués
 * dans une transaction : deux inscriptions simultanées ne peuvent pas dépasser 100 par genre,
 * et les règles Firestore refusent toute écriture qui contournerait ce chemin.
 */
export async function registerMember(
  profile: Omit<UserProfile, 'id' | 'pioneerNumber' | 'isVerifiedId' | 'isVerifiedPhone'>,
): Promise<UserProfile> {
  const user = auth.currentUser;
  if (!user) throw new RegisterError('not-signed-in');

  const field = (g: Gender) => (g === 'homme' ? 'men' : 'women');

  try {
    return await runTransaction(db, async (tx) => {
      const existing = await tx.get(userRef(user.uid));
      if (existing.exists()) throw new RegisterError('already-registered');

      const quota = await tx.get(quotaRef());
      const f = field(profile.gender);
      const taken: number = quota.exists() ? (quota.data()[f] ?? 0) : 0;
      const isPioneer = taken < QUOTA_MAX;

      const base = {
        ...profile,
        id: user.uid,
        uid: user.uid,
        isVerifiedId: false,
        isVerifiedPhone: true,
        status: 'phone_verified',
        plan: isPioneer ? 'pioneer' : 'none',
        ...(isPioneer ? { pioneerNumber: taken + 1 } : {}),
      };

      if (isPioneer) {
        if (quota.exists()) tx.update(quotaRef(), { [f]: taken + 1 });
        else tx.set(quotaRef(), { men: f === 'men' ? 1 : 0, women: f === 'women' ? 1 : 0 });
      }
      tx.set(userRef(user.uid), { ...clean(base), createdAt: serverTimestamp() });

      return clean(base) as unknown as UserProfile;
    });
  } catch (e) {
    if (e instanceof RegisterError) throw e;
    if ((e as { code?: string })?.code === 'permission-denied') throw new RegisterError('permission');
    throw new RegisterError('unknown');
  }
}

/** Profil du membre déjà inscrit (restauration de session). */
export async function loadMember(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(userRef(uid));
  if (!snap.exists()) return null;
  const { createdAt: _createdAt, ...data } = snap.data();
  return data as UserProfile;
}
