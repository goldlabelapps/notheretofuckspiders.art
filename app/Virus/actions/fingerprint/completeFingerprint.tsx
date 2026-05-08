import type { T_UbereduxDispatch } from '../../../NX/types';
import { setUbereduxKey } from '../../../NX/Uberedux';
import { setVirus } from '../../../Virus';
import { getFirebaseFirestore } from '../../utils/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const completeFingerprint = (): any =>
	async (dispatch: T_UbereduxDispatch, getState: () => any) => {
		try {
			const state = getState();
			const fingerprint = state?.redux?.virus?.fingerprint;

			if (!fingerprint || typeof fingerprint !== 'string') return;

			const db = getFirebaseFirestore();
			const docRef = doc(db, 'fingerprints', fingerprint);
			const snapshot = await getDoc(docRef);
			if (!snapshot.exists()) return;

			const data = snapshot.data() as Record<string, unknown>;
			const alreadyCompleted = typeof data.completed === 'number';
			if (alreadyCompleted) return;

			const name = typeof data.name === 'string' ? data.name : null;
			const hasGeo = !!data.geo;
			if (!hasGeo) return;

			await updateDoc(docRef, {
				completed: Date.now(),
				updated: Date.now(),
			});

			dispatch(setVirus('title', 'Identity ready'));
			dispatch(setVirus(
				'clever',
				`# Setup complete${name ? `, ${name}` : ''}
Your fingerprint profile is now fully initialised.
You can edit your name and avatar any time. Just tap 'em`
			));
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : String(e);
			dispatch(setUbereduxKey({ key: 'error', value: msg }));
		}
	};