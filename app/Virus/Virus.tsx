'use client';
import * as React from 'react';
import { useDispatch } from '../NX/Uberedux';
import config from './config.json';
import { 
  initVirus,
  useDoc,
  useVirus,
  VirusDialog,
  VirusButton,
  checkFingerprint,
  fetchGeo,
  useSubFingerprint,
  parseDevice,
} from '../Virus';

export default function Virus() {
  if (!config.enabled) {
    return null;
  }

  const dispatch = useDispatch();
  const slice = useVirus();
  const doc = useDoc();

  React.useEffect(() => {
    if (!slice || Object.keys(slice).length === 0) {
      dispatch(initVirus());
    }
  }, [dispatch, slice]);

  React.useEffect(() => {
    if (slice?.fingerprint) {
      dispatch(checkFingerprint());
    }
  }, [slice?.fingerprint]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (doc && Object.keys(doc).length > 0 && !doc.device) {
      // 2. use a proper device parser and store the whole obj
      dispatch(parseDevice());
    }
  }, [doc]);


  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (doc && Object.keys(doc).length > 0 && !doc.geo) {
      dispatch(fetchGeo());
    }
  }, [doc]);


  useSubFingerprint();

  return (<>
            <VirusDialog />
            <VirusButton />
          </>);
}