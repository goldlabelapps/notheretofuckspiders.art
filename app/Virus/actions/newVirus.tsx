import { getFirebaseFirestore } from '../../NX/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { setFeedback } from '../../NX/DesignSystem';

// Creates a new Virus document in Firestore with the provided payload
export const newVirus = (payload: any, onSuccess?: () => void) => async (dispatch: any) => {
	try {
		const db = getFirebaseFirestore();
		const now = Date.now();
		await addDoc(collection(db, 'viruses'), {
			...payload,
			created: now,
			updated: now,
		});
		dispatch(setFeedback({
			severity: 'success',
			title: 'New Virus° created',
		}));
		if (onSuccess) onSuccess(); // e.g., to clear/reset form
	} catch (e: any) {
		dispatch(setFeedback({
			severity: 'error',
			title: e?.message
		}));
	}
};
