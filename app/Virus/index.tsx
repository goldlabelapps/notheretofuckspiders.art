import Virus from './Virus';
import { initVirus } from './actions/initVirus';
import { fetchGeo } from './actions/geo/fetchGeo';
import { setVirus } from './actions/setVirus';
import { checkFingerprint } from './actions/fingerprint/checkFingerprint';
import { completeFingerprint } from './actions/fingerprint/completeFingerprint';
import { deleteFingerprint } from './actions/fingerprint/deleteFingerprint';
import { forgetFingerprint } from './actions/fingerprint/forgetFingerprint';
import { subFingerprint } from './actions/fingerprint/subFingerprint';
import { updateFingerprint } from './actions/fingerprint/updateFingerprint';
import { updateHistory } from './actions/history/updateHistory';
import { useFingerprint } from './hooks/useFingerprint';
import { useSubFingerprint } from './hooks/useSubFingerprint';
import { useVirus } from './hooks/useVirus';
import { useDoc } from './hooks/useDoc';
import {
    identityCharacters,
    geoString,
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
import { parseDevice } from './actions/device/parseDevice';
import Debug from './components/Debug';
import Favourites from './components/Favourites';
import Fingerprint from './components/Fingerprint';
import History from './components/History';
import Mapbox from './components/Mapbox/Mapbox';
import Score from './components/Score';
import Share from './components/Share';
import Identity from './components/Identity';
import GeoData from './components/GeoData';
import DeviceData from './components/DeviceData';
import VirusButton from './components/VirusButton';
import VirusDialog from './components/VirusDialog';
import VirusPage from './components/VirusPage';
import Viruses from './components/Viruses';
export type {
    T_IdentityCharacter,
    T_RandomIdentity,
} from './utils/randomIdentity';
export type { T_DeviceInfo, T_HistoryEntry } from './types';

export {
    Virus,
    initVirus,
    fetchGeo,
    setVirus,
    checkFingerprint,
    completeFingerprint,
    deleteFingerprint,
    forgetFingerprint,
    subFingerprint,
    updateFingerprint,
    updateHistory,
    useDoc,
    useFingerprint,
    useSubFingerprint,
    useVirus,
    identityCharacters,
    parseDevice,
    geoString,
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
    History,
    GeoData,
    DeviceData,
    Mapbox,
    Score,
    Share,
    Identity,
    VirusButton,
    VirusDialog,
    VirusPage,
    Viruses,
};
