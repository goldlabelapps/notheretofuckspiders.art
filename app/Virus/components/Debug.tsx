"use client";
import * as React from "react";
import { useVirus } from "../hooks/useVirus";

export default function Debug() {
  const virus = useVirus();
  return (
      <pre>virus: {JSON.stringify(virus, null, 2)}</pre>
  );
}

/*
<Box sx={{ display: 'flex', gap: 2}}>
        <Button
          variant='outlined'
          startIcon={<Icon icon="virus" />}
          onClick={() => {
            dispatch(navigateTo(router, '/viruses'));
          }}
        >
          All
        </Button>  
        
        <Button
          variant='outlined'
          startIcon={<Icon icon="new" />}
          onClick={() => {
            dispatch(navigateTo(router, '/viruses/new'));
          }}
        >
          New
        </Button>  
      </Box>
      */