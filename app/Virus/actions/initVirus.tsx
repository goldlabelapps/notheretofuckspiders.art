import type { T_UbereduxDispatch } from '../../NX/types';
import { setUbereduxKey } from '../../NX/Uberedux';
import { setVirus } from '../../Virus';

export const initVirus = (): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
        try {
            dispatch(setVirus('toggleText', 'Viruses°'));
            // Initialize topViruses if not present
            const state = getState();
            const virus = state?.redux?.virus || {};
            if (!('topViruses' in virus)) {
                dispatch(setVirus('topViruses', {
                    fetching: false,
                    fetched: false,
                    data: [],
                    error: null,
                }));
            }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };