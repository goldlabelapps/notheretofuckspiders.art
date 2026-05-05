import Virus from './Virus';
import Viruses from './components/Viruses';

import { virusOutbreak } from './prompts/virusOutbreak';
import { randomVirus } from './prompts/randomVirus';
import { initVirus } from './actions/initVirus';
import { setVirus } from './actions/setVirus';

import { subFingerprint } from './actions/fingerprint/subFingerprint';
import { checkFingerprint } from './actions/fingerprint/checkFingerprint';
import { updateFingerprint } from './actions/fingerprint/updateFingerprint';
import { deleteFingerprint } from './actions/fingerprint/deleteFingerprint';
import { forgetFingerprint } from './actions/fingerprint/forgetFingerprint';


import { useSubFingerprint } from './hooks/useSubFingerprint';

import { useVirus } from './hooks/useVirus';
import { useFingerprint } from './hooks/useFingerprint';
import { useDoc } from './hooks/useDoc';
import { newVirus } from './actions/newVirus';

import Debug from './components/Debug';
import Score from './components/Score';
import VirusDialog from './components/VirusDialog';
import VirusButton from './components/VirusButton';
import NewVirus from './components/NewVirus';
import VirusPage from './components/VirusPage';
import Share from './components/Share';
import Favourites from './components/Favourites';
import Fingerprint from './components/Fingerprint';

export {
    Virus,
    Viruses,
    initVirus,
    Favourites,
    Fingerprint,
    setVirus,
    useVirus,
    VirusDialog,
    VirusButton,
    NewVirus,
    Share,
    Debug,
    Score,
    virusOutbreak,
    randomVirus,
    VirusPage,
    newVirus,
    useFingerprint,
    checkFingerprint,
    subFingerprint,
    useSubFingerprint,
    deleteFingerprint,
    forgetFingerprint,
    useDoc,
    updateFingerprint,
};
