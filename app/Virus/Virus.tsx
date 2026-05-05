'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box,
} from '@mui/material';
import { useDispatch } from '../NX/Uberedux';
import { 
  initVirus,
  useVirus,
  VirusDialog,
  VirusButton,
  checkFingerprint,
  useSubFingerprint,
} from '../Virus';

export default function Virus() {
  const dispatch = useDispatch();
  const slice = useVirus();

  // checkFingerprint

  React.useEffect(() => {
    // If the virus slice is empty or uninitialized, initialize it
    if (!slice || Object.keys(slice).length === 0) {
      dispatch(initVirus());
    }
  }, [dispatch, slice]);

  React.useEffect(() => {
    if (slice?.fingerprint) {
      // console.log('Virus ready. fingerprint:', slice.fingerprint);
      dispatch(checkFingerprint());
    }
  }, [slice?.fingerprint]);

  useSubFingerprint();

  return (<Box>
            <VirusDialog />
            <VirusButton />
          </Box>);
}
