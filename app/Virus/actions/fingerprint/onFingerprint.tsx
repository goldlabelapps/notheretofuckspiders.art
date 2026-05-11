import type { T_UbereduxDispatch } from '../../../NX/types';
import { setUbereduxKey } from '../../../NX/Uberedux';
import { setFeedback } from '../../../NX/DesignSystem';
// import { useDoc } from '../../../Virus';

export const onFingerprint = (): any =>
	async (dispatch: T_UbereduxDispatch, getState: () => any) => {
		try {

			const pythonUrl = process.env.NEXT_PUBLIC_PYTHON_URL;
			if (!pythonUrl) {
				throw new Error('NEXT_PUBLIC_PYTHON_URL not set');
			}

			const doc = getState().redux?.virus?.fingerprintDoc;
			if (!doc) {
				throw new Error('Fingerprint document not found in state');
			}

			const { id, name, created, device, geo } = doc;

			const html = `
				Hi,<br />
				A new fingerprint was created<br /><br />
				<strong>ID:</strong> ${id}<br />
				<strong>Name:</strong> ${name}<br />
				<strong>Device:</strong> ${device?.browser} on ${device?.os}<br />
				<strong>Location:</strong> ${geo?.city}, ${geo?.country_name} (${geo?.ip})
			`;

			const emailData = {
				to: "goldlabel.apps@gmail.com",
				subject: "Fingerprint°",
				cta_label: "View",
				cta_url: `https://nx-admin.goldlabel.pro/fingerprints/${id}`,
				html,
			};

			const response = await fetch(`${pythonUrl}notify/email`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(emailData),
			});

			if (!response.ok) {
				throw new Error(`Email send failed: ${response.status}`);
			}

			dispatch(setFeedback({
				severity: 'success',
				title: `Hello ${name}`,
			}));


		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : String(e);
			dispatch(setUbereduxKey({ key: 'error', value: msg }));
			dispatch(setFeedback({
				severity: 'error',
				title: msg,
			}));
		}
	};