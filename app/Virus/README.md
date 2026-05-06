# Virus°

**v2.0.0** — A gamified virus simulation module for Next.js / React.

## Overview

Virus° is a self-contained feature module. It generates procedurally-named viruses with randomised stats, tracks unique visitors via browser fingerprinting, and stores virus instances with real-time view counts in Firestore. It is not a literal biological simulation — the term "virus" is used metaphorically.

## Architecture

```
Virus/
├── Virus.tsx              # Root component — bootstraps state and fingerprinting
├── index.tsx              # Barrel exports (do not import from here within this module)
├── config.json            # Module version
├── types.d.ts             # Shared TypeScript types
├── actions/               # Uberedux async thunks
│   ├── initVirus.tsx      # Initialises Redux slice, loads FingerprintJS visitor ID
│   ├── newVirus.tsx       # Creates a new virus document in Firestore
│   ├── setVirus.tsx       # Sets a key on the virus Redux slice
│   └── fingerprint/
│       ├── checkFingerprint.tsx   # Looks up / creates fingerprint doc in Firestore
│       ├── updateFingerprint.tsx  # Updates an existing fingerprint doc
│       ├── deleteFingerprint.tsx  # Hard-deletes a fingerprint doc
│       ├── forgetFingerprint.tsx  # Soft-delete with session flag to suppress re-create
│       └── subFingerprint.tsx     # Firestore real-time subscription for fingerprint doc
├── components/
│   ├── VirusButton.tsx    # FAB / toggle button to open the dialog
│   ├── VirusDialog.tsx    # Main dialog — shows fingerprint info and actions
│   ├── Fingerprint.tsx    # Displays current fingerprint and returning-visitor state
│   ├── VirusPage.tsx      # Full-page view for a single virus (real-time Firestore)
│   ├── Viruses.tsx        # List / grid of all viruses
│   ├── NewVirus.tsx       # Form for creating a new virus
│   ├── Score.tsx          # Gradient avatar showing a 0–100 score
│   ├── Share.tsx          # Social share helper
│   ├── Favourites.tsx     # Saved / favourited viruses
│   └── Debug.tsx          # Dev-only state inspector
├── hooks/
│   ├── useVirus.tsx        # Selects the virus slice from Redux
│   ├── useFingerprint.tsx  # Selects fingerprint data from Redux
│   ├── useSubFingerprint.tsx # Mounts the Firestore fingerprint subscription
│   └── useDoc.tsx          # Generic Firestore document hook
└── utils/
    ├── randomVirus.tsx     # Generates a random virus object (name, rates, pandemic phase, transmission modes)
    └── virusOutbreak.tsx   # Prompt / copy for outbreak events
```

## Key Concepts

### Fingerprinting
On mount, `initVirus` loads [FingerprintJS](https://fingerprintjs.com/) and derives a stable `visitorId` from browser and device characteristics. This ID is stored in Redux and checked against Firestore to distinguish new from returning visitors. No personal data is collected.

### Random Virus Generation (`randomVirus`)
Produces a virus object with:
- Procedurally generated name (prefix + suffix combos)
- Randomised `infectionRate`, `mutationRate`, `mortalityRate`
- 2–4 transmission modes drawn from a pool (Airborne, Droplet, Waterborne, …)
- A pandemic phase (Emergence → Endemic)

### Real-time Score (`VirusPage`)
Each time a virus page is visited, Firestore `increment(1)` fires on the document's `score` field. `Score.tsx` renders this as a gradient avatar clamped to 0–100.

## State Management

Uses **Uberedux** (project-local Redux wrapper). The virus slice is keyed under `redux.virus`. Key slice fields:

| Field | Description |
|---|---|
| `fingerprint` | FingerprintJS visitor ID |
| `fingerprintDoc` | Firestore document for this fingerprint |
| `dialogOpen` | Controls `VirusDialog` visibility |
| `toggleText` | Label shown on `VirusButton` |
| `title` / `icon` | Dialog header |
| `topViruses` | Cached list of top viruses |

## Developer Notes

- **Avoid circular imports** — do not import from `app/Virus/index.tsx` inside this module. Use direct relative imports instead.
- All Firestore writes go through actions in `actions/fingerprint/`; components do not write directly.
- `VirusDialog` uses a two-step confirm flow (`ConfirmAction`) before deleting a fingerprint.

---
_Last updated: 5 May 2026_