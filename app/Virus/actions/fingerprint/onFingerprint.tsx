import type { T_UbereduxDispatch } from '../../../NX/types';
import { setUbereduxKey } from '../../../NX/Uberedux';
import { setFeedback } from '../../../NX/DesignSystem';

export const onFingerprint = (): any =>
	async (dispatch: T_UbereduxDispatch, getState: () => any) => {
		try {
			dispatch(setFeedback({
				severity: 'success',
				title: 'ONFINGERPIRINT',
			}));
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : String(e);
			dispatch(setUbereduxKey({ key: 'error', value: msg }));
		}
	};