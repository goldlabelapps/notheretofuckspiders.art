# Virus°

v2.1.0 - A client-side Virus feature module for Next.js + React, powered by Firebase and FingerprintJS.

## Overview

Virus° provides a complete visitor-identification and content loop:

- Fingerprint-aware visitor lifecycle (new vs returning visitor)
- Firestore-backed virus creation and live reads
- Virus score growth by page visits
- Drop-in UI entry points (`VirusButton`, `VirusDialog`) and pages (`Viruses`, `NewVirus`, `VirusPage`)

The term "virus" in this module is thematic/game-like.

## Runtime Flow

1. `Virus.tsx` mounts and dispatches `initVirus()` when the virus slice is empty.
2. `initVirus()` lazily loads FingerprintJS and stores `visitorId` at `redux.virus.fingerprint`.
3. When a fingerprint exists, `checkFingerprint()` creates or updates `fingerprints/{fingerprint}`.
4. `useSubFingerprint()` subscribes to fingerprint document updates.
5. If fingerprint doc has no `device` block, `parseDevice()` enriches it.
6. `newVirus()` writes a new record into `viruses`.
7. `VirusPage` increments `viruses/{id}.score` once per page mount.

## Folder Map

```text
Virus/
|- 2.1.0
|- config.json
|- index.tsx
|- README.md
|- types.d.ts
|- Virus.tsx
|- actions/
|  |- initVirus.tsx
|  |- newVirus.tsx
|  |- setVirus.tsx
|  `- fingerprint/
|     |- checkFingerprint.tsx
|     |- deleteFingerprint.tsx
|     |- forgetFingerprint.tsx
|     |- subFingerprint.tsx
|     `- updateFingerprint.tsx
|- components/
|  |- Debug.tsx
|  |- Device.tsx
|  |- Favourites.tsx
|  |- Fingerprint.tsx
|  |- NewVirus.tsx
|  |- Score.tsx
|  |- Share.tsx
|  |- UpdateDialog.tsx
|  |- VirusButton.tsx
|  |- VirusDialog.tsx
|  |- VirusPage.tsx
|  `- Viruses.tsx
|- hooks/
|  |- useDoc.tsx
|  |- useFingerprint.tsx
|  |- useSubFingerprint.tsx
|  `- useVirus.tsx
`- utils/
    |- README.md
    |- deviceModels.json
    |- firebase.ts
    |- index.tsx
    |- parseDevice.tsx
    |- randomIdentity.tsx
    |- randomVirus.tsx
    |- utils.ts
    `- virusOutbreak.tsx
```

## Public API

Exports from `index.tsx`:

- Root: `Virus`
- Actions: `initVirus`, `newVirus`, `setVirus`, `checkFingerprint`, `deleteFingerprint`, `forgetFingerprint`, `subFingerprint`, `updateFingerprint`
- Hooks: `useDoc`, `useFingerprint`, `useSubFingerprint`, `useVirus`
- Utilities: `identityCharacters`, `parseDevice`, `randomIdentity`, `randomIdentityProfile`, `randomVirus`, `virusOutbreak`, `deviceModels`
- Firebase helpers: `getFirebaseApp`, `getFirebaseAuth`, `getFirebaseFirestore`, `getFirebaseMessaging`, `getFirebaseStorage`
- UI components: `Debug`, `Favourites`, `Fingerprint`, `NewVirus`, `Score`, `Share`, `UpdateDialog`, `VirusButton`, `VirusDialog`, `VirusPage`, `Viruses`
- Types: `T_IdentityCharacter`, `T_RandomIdentity`

## State + Data

### Redux slice

Expected location: `state.redux.virus`.

Common keys used by this module include:

- `fingerprint`
- `fingerprintDoc`
- `title`
- `clever`
- `icon`
- `toggleText`
- `topViruses`

### Firestore collections

`fingerprints/{fingerprint}`

- `created: number` (epoch ms)
- `updated: number` (epoch ms)
- Optional `device` metadata set by `parseDevice()`

`viruses/{id}`

- user payload fields (for example `name`, `message`, optional `score`)
- `created: number` (epoch ms)
- `updated: number` (epoch ms)

## Environment Variables

Defined in `utils/firebase.ts`:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## Integration

1. Ensure dependencies and host app integrations are available:
    - Firebase SDK (`firebase/app`, `firebase/firestore`, etc.)
    - FingerprintJS (`@fingerprintjs/fingerprintjs`)
    - Redux/Uberedux host wiring (`NX/Uberedux`)
    - Design System actions/components used by this module (`NX/DesignSystem`)

2. Mount the root entry component:

```tsx
import Virus from './Virus/Virus';

export default function AppShell() {
  return <Virus />;
}
```

3. Add route screens:

```tsx
// app/viruses/page.tsx
import { Viruses } from '../Virus';

export default function Page() {
  return <Viruses />;
}
```

```tsx
// app/viruses/new/page.tsx
import { NewVirus } from '../../Virus';

export default function Page() {
  return <NewVirus />;
}
```

```tsx
// app/viruses/[id]/page.tsx
import { VirusPage } from '../../Virus';

export default function Page() {
  return <VirusPage />;
}
```

4. Confirm Firestore rules permit reads/writes to:
    - `fingerprints`
    - `viruses`

## Behavior Notes

- `deleteFingerprint()` removes the document and sets a session flag to suppress immediate recreation.
- `forgetFingerprint()` removes the document, clears the session flag, then redirects to Google.
- `checkFingerprint()` sets visitor-specific UI copy for new vs returning users.
- `getFirebaseMessaging()` returns `null` on SSR or unsupported browsers.

## Developer Notes

- Prefer relative imports inside this module to avoid barrel-driven circular dependencies.
- `Virus.tsx` currently imports from the module barrel, so future refactors should keep cycle risk in mind.
- Some files still use permissive `any` typing; tighten types if extending action payloads.

---
Last updated: 8 May 2026