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
} from '../Virus';

export default function Virus() {
  const dispatch = useDispatch();
  const slice = useVirus();

  React.useEffect(() => {
    // If the virus slice is empty or uninitialized, initialize it
    if (!slice || Object.keys(slice).length === 0) {
      dispatch(initVirus());
    }
  }, [dispatch, slice]);

  return (<Box>
            <VirusDialog />
          </Box>);
}
