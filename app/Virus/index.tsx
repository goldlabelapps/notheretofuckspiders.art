import Virus from './Virus';
import { initVirus } from './actions/initVirus';
import { newVirus } from './actions/newVirus';
import { setVirus } from './actions/setVirus';
import { checkFingerprint } from './actions/fingerprint/checkFingerprint';
import { deleteFingerprint } from './actions/fingerprint/deleteFingerprint';
import { forgetFingerprint } from './actions/fingerprint/forgetFingerprint';
import { subFingerprint } from './actions/fingerprint/subFingerprint';
import { updateFingerprint } from './actions/fingerprint/updateFingerprint';
import { useFingerprint } from './hooks/useFingerprint';
import { useSubFingerprint } from './hooks/useSubFingerprint';
import { useVirus } from './hooks/useVirus';
import { useDoc } from './hooks/useDoc';
import {
    identityCharacters,
    parseDevice,
    randomIdentity,
    randomIdentityProfile,
    randomVirus,
    virusOutbreak,
    getFirebaseApp,
    getFirebaseAuth,
    getFirebaseFirestore,
    getFirebaseMessaging,
    getFirebaseStorage,
} from './utils';
import Debug from './components/Debug';
import Favourites from './components/Favourites';
import Fingerprint from './components/Fingerprint';
import NewVirus from './components/NewVirus';
import Score from './components/Score';
import Share from './components/Share';
import UpdateDialog from './components/UpdateDialog';
import VirusButton from './components/VirusButton';
import VirusDialog from './components/VirusDialog';
import VirusPage from './components/VirusPage';
import Viruses from './components/Viruses';
export type {
    T_IdentityCharacter,
    T_RandomIdentity,
} from './utils/randomIdentity';

export {
    Virus,
    initVirus,
    newVirus,
    setVirus,
    checkFingerprint,
    deleteFingerprint,
    forgetFingerprint,
    subFingerprint,
    updateFingerprint,
    useDoc,
    useFingerprint,
    useSubFingerprint,
    useVirus,
    identityCharacters,
    parseDevice,
    randomIdentity,
    randomIdentityProfile,
    randomVirus,
    virusOutbreak,
    getFirebaseApp,
    getFirebaseAuth,
    getFirebaseFirestore,
    getFirebaseMessaging,
    getFirebaseStorage,
    Debug,
    Favourites,
    Fingerprint,
    NewVirus,
    Score,
    Share,
    UpdateDialog,
    VirusButton,
    VirusDialog,
    VirusPage,
    Viruses,
};
