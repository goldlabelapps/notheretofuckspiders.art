import Virus from './Virus';
import Viruses from './components/Viruses';
import Debug from './components/Debug';
import Score from './components/Score';
import VirusDialog from './components/VirusDialog';
import NewVirus from './components/NewVirus';
import TopViruses from './components/TopViruses';
import VirusPage from './components/VirusPage';
import Share from './components/Share';
import { virusOutbreak } from './prompts/virusOutbreak';
import { randomVirus } from './prompts/randomVirus';
import { initVirus } from './actions/initVirus';
import { setVirus } from './actions/setVirus';
import { getTopViruses } from './actions/getTopViruses';
import { useVirus } from './hooks/useVirus';
import { newFirestore } from './actions/newFirestore';

export {
    Virus,
    Viruses,
    initVirus,
    setVirus,
    useVirus,
    VirusDialog,
    NewVirus,
    Share,
    Debug,
    Score,
    virusOutbreak,
    randomVirus,
    TopViruses,
    VirusPage,
    getTopViruses,
    newFirestore,
};
