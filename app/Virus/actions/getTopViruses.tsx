import { error } from 'console';
import type { T_UbereduxDispatch } from '../../NX/types';
import { setUbereduxKey } from '../../NX/Uberedux';
import { setVirus } from '../../Virus';
import { getFirebaseFirestore } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export const getTopViruses = (): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
        dispatch(setVirus('topViruses', {
            fetching: true,
            fetched: false,
            data: [],
            error: null,
        }));
        try {
            const db = getFirebaseFirestore();
            const virusesRef = collection(db, 'viruses');
            const q = query(virusesRef, orderBy('score', 'desc'));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            dispatch(setVirus('topViruses', {
                fetching: false,
                fetched: true,
                data,
                error: null,
            }));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setVirus('topViruses', {
                fetching: false,
                fetched: false,
                data: [],
                error: msg,
            }));
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };