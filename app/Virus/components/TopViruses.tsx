"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  CardHeader,
  Typography,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Divider,
  CircularProgress,
  IconButton,
} from '@mui/material';
import Score from "./Score";
import moment from "moment";
import { Icon } from '../../NX/DesignSystem';
import { useVirus, getTopViruses, setVirus } from "../../Virus";
import { useDispatch } from "../../NX/Uberedux";
import { navigateTo, CleverText } from "../../NX/DesignSystem";

export default function TopViruses() {

  const dispatch = useDispatch();
  const router = useRouter();
  const virus = useVirus();
  const topViruses = virus.topViruses || { fetching: false, fetched: false, data: [], error: null };
  const data = topViruses.data || [];
  React.useEffect(() => {
    if (!topViruses.fetching && !topViruses.fetched) {
      dispatch(getTopViruses());
    }
  }, [dispatch, topViruses.fetching, topViruses.fetched]);

  return (
    <Box sx={{mt:2}}>
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
      {topViruses.fetching && (
        <Box display="flex" alignItems="center" justifyContent="center" py={2}>
          <CircularProgress />
          <CleverText options={{
            markdown: "Loading Viruses°",
            id: "top-viruses-title",
            onFinish: () => {
              console.log('start fade timer');
            }
          }} />
        </Box>
      )}
      {topViruses.error && (
        <Typography color="text.secondary"variant="body2">
          {topViruses.error}
        </Typography>
      )}
      {!topViruses.fetching && !topViruses.error && data.length === 0 && (
        <Typography variant="body2">No viruses found.</Typography>
      )}

      <List dense>
        {data.slice(0, 3).map((virus: any, idx: number) => (
          <React.Fragment key={virus.id}>
            <ListItemButton 
              onClick={() => {
                //console.log('virus.id', virus.id);
                dispatch(navigateTo(router, `/viruses/${virus.id}`));
                dispatch(setVirus('dialogOpen', false))
              }}
              alignItems="flex-start"
            >
              <ListItemAvatar>
                <Score score={virus.score ?? 0} size={32} />
              </ListItemAvatar>
              <ListItemText
                primary={virus.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.secondary">
                      {virus.createdBy}
                    </Typography>
                    {virus.created && (
                      <Typography component="span" variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        {`Created ${moment(virus.created).fromNow()}`}
                      </Typography>
                    )}
                  </>
                }
              />
            </ListItemButton>
            {idx < Math.min(data.length, 3) - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>

  </Box>
  );
}

