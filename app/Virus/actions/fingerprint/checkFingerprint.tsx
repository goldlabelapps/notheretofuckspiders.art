import type { T_UbereduxDispatch } from '../../../NX/types';
import { setUbereduxKey } from '../../../NX/Uberedux';
import { setVirus } from '../../../Virus';
import { getFirebaseFirestore } from '../../utils/firebase';
import { randomIdentityProfile } from '../../utils/randomIdentity';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const VIRUS_JUST_DELETED_SESSION_KEY = 'virus.justDeletedFingerprint';

export const checkFingerprint = (): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
        try {
            
            const state = getState();
            const fingerprint = state?.redux?.virus?.fingerprint;
            // console.log('Checking fingerprint...', );

            if (!fingerprint || typeof fingerprint !== 'string') {
                console.log('checkFingerprint: no valid fingerprint, bailing.');
                return;
            }

            if (typeof window !== 'undefined') {
                const justDeleted = window.sessionStorage.getItem(VIRUS_JUST_DELETED_SESSION_KEY) === '1';
                if (justDeleted) {
                    // console.log('checkFingerprint: justDeleted flag set, bailing.');
                    window.sessionStorage.removeItem(VIRUS_JUST_DELETED_SESSION_KEY);
                    dispatch(setVirus('fingerprintDoc', null));
                    return;
                }
            }

            const db = getFirebaseFirestore();
            const docRef = doc(db, 'fingerprints', fingerprint);
            // console.log('checkFingerprint: calling getDoc for', fingerprint);
            const snapshot = await getDoc(docRef);
            // console.log('checkFingerprint: snapshot.exists() =', snapshot.exists());
            if (!snapshot.exists()) {
                console.log('No existing fingerprint found. Creating new document...');
                const now = Date.now();
                const profile = randomIdentityProfile();
                await setDoc(docRef, {
                    created: now,
                    updated: now,
                    avatar: profile.character,
                    name: profile.name,
                });
                dispatch(setVirus('title', 'Add identity'));
                dispatch(setVirus('fingerprinted', true));
                dispatch(setVirus(
                    'clever',
                    `# 1st time visitor
        We created a starter identity for you: **${profile.name}**.
        It looks a bit password-like on purpose so names stay unique.
        You can change your name and avatar any time.`
                ));
            } else {
                const snapshotData = snapshot.data();
                const existingName =
                    snapshotData && typeof snapshotData.name === 'string'
                        ? snapshotData.name
                        : null;
                const isCompleted =
                    snapshotData && typeof snapshotData.completed === 'number';
                await updateDoc(docRef, { updated: Date.now() });
                dispatch(setVirus('title', `Add identity`));
                if (isCompleted) {
                    dispatch(setVirus(
                        'clever',
                        `## Welcome back${existingName ? `, ${existingName}` : ''}`
                    ));
                }
            }

        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };