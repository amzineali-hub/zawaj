# Mithaq Prestige — Plan de passage en production

État de départ : prototype d'interface (React 19 + Vite + Tailwind 4), 100 % simulé côté navigateur.
Objectif : plateforme réelle, sécurisée, iOS + Android, 200 premiers inscrits gratuits (100 H / 100 F), puis 100 DH/an.

## Principes
- Projet Firebase **dédié** (jamais celui de Mouda Palace) : données sensibles (CIN, photos).
- **Aucune règle ouverte** dans Firestore/Storage. Tout est refusé par défaut.
- Le client ne décide jamais d'un statut (badge, quota, abonnement) : c'est le serveur / les règles.
- Conformité loi 09-08 (CNDP) : consentement explicite, droit à la suppression, durée de conservation des CIN limitée.

## Phase 0 — Fondations (0,5 j)
- Projet Firebase, Auth (Phone), Firestore, Storage ; variables `.env` ; `src/firebase.ts`.
- Retrait de `@google/genai` / `express` si inutilisés ; `npm run lint` propre.
- Structure : `src/services/` (auth, profiles, chat, quota), `firestore.rules`, `storage.rules`.

## Phase 1 — Authentification + quota atomique (1-2 j)  ← prochaine étape
1. Phone Auth Firebase (+212 uniquement), reCAPTCHA invisible ; plus de code `123456`.
2. Modèle Firestore :
   - `users/{uid}` : profil, `gender`, `status` (`pending` | `phone_verified` | `id_verified` | `suspended`), `plan` (`pioneer` | `paid` | `none`), `pioneerNumber`.
   - `meta/quota` : `men`, `women` (compteurs).
3. Quota atomique : transaction Firestore (`runTransaction`) qui incrémente le compteur et crée le profil ensemble ; les règles interdisent tout autre moyen de modifier `meta/quota` et `pioneerNumber`. Au-delà de 100 : `plan = none` → paiement.
4. Champs protégés par les règles : `status`, `plan`, `pioneerNumber`, `isVerified*` non modifiables par le client.
5. Suppression de tous les défauts fictifs (« Amina Bennani », photo Unsplash, etc.) : champs obligatoires.
6. Les profils fictifs ne servent plus que pour une page de démonstration.

## Phase 2 — Profils réels + photos (1-2 j)
- CRUD profil, upload photos (Storage, compression côté client, 5 Mo max, types image uniquement).
- Mode pudeur : floutage appliqué côté serveur/URL signée, pas seulement en CSS.
- Filtres réels (ville, âge, centres d'intérêt, statut) via requêtes Firestore + index.
- Localisation précise : ville + coordonnées arrondies (pas d'adresse exacte exposée).

## Phase 3 — Vérification d'identité (2 j)
- Envoi CIN (recto/verso) + selfie dans un bucket **privé** (`verifications/{uid}/…`), lisible uniquement par l'utilisateur et l'admin.
- Espace admin (allowlist d'e-mails dans les règles) : file d'attente, Valider / Refuser avec motif.
- Le badge « Certifié » n'est posé que par l'admin. Suppression automatique des images après décision (délai à fixer).
- Option ultérieure : prestataire KYC automatisé.

## Phase 4 — Chat réel (2 j)
- `conversations/{id}` (membres) + sous-collection `messages` ; règles : seuls les 2 participants lisent/écrivent.
- Conversation ouverte uniquement entre profils vérifiés ; demande d'échange acceptée par l'autre partie.
- Blocage, signalement (collection `reports` lisible par l'admin), limite de débit, masquage des numéros de téléphone dans les messages.
- Photo révélée seulement après accord mutuel (donnée stockée côté serveur).

## Phase 5 — Abonnement 100 DH/an (1-2 j)
- Décision requise : CMI / Stripe (web) vs achats intégrés stores (commission 15-30 %).
- `subscriptions/{uid}` : `validUntil`, écrit uniquement par le serveur (webhook).
- Rappel d'expiration, accès restreint si expiré.

## Phase 6 — Mobile iOS + Android (1-2 j + délais stores)
- Capacitor (`@capacitor/ios`, `android`), icônes, splash, deep links.
- Comptes développeur : Apple 99 $/an, Google 25 $ une fois.
- Pour les stores : politique de confidentialité, conditions, suppression de compte dans l'app, modération UGC (obligatoire).

## Phase 7 — Éthique, juridique, modération (en parallèle)
- Charte acceptée à l'inscription (horodatage stocké), CGU, politique de confidentialité, déclaration CNDP.
- Procédure de sanction (avertissement → suspension → bannissement), contact de signalement.

## Phase 8 — Qualité & lancement
- Tests des règles Firestore (émulateur), tests des calculs critiques (quota, expiration).
- CI : lint + tests + déploiement des règles.
- Bêta fermée (≈ 20 personnes) avant ouverture des 200 places.

## Points de décision ouverts
1. Plan Firebase : SMS Phone Auth en production et Cloud Functions peuvent exiger le plan Blaze (paiement à l'usage) — à vérifier sur la console avant la Phase 1. Sans Functions, quota et badge restent possibles via transactions + règles + allowlist admin.
2. Moyen de paiement (Phase 5).
3. Rétention des CIN (durée) et hébergement des données (région Firebase, ex. `europe-west`).
4. Nom définitif : Mithaq Prestige (marque à vérifier).
