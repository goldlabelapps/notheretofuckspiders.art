"use client";
import React from "react";
import config from '../config.json';
import { useRouter } from "next/navigation";
import {
    Box,
    Grid,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useDispatch } from '../../NX/Uberedux';
import { 
    Icon, 
    CleverText, 
    navigateTo,
} from '../../NX/DesignSystem';
import { setVirus, useVirus, Share, TopViruses } from '../../Virus';

export default function VirusDialog() {

    const dispatch = useDispatch();
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const virus = useVirus();
    const dialogOpen = !!virus.dialogOpen;
    // const toggleText = virus.toggleText || '';

    const toggleText = config.version;

    const handleVirusClick = () => {
        dispatch(setVirus('dialogOpen', true));
    };

    return <>
        <Box sx={{
            display: 'flex',
            gap: 1,
        }}>
            <Box>
                <CleverText options={{
                    id: 'infoPaneCleverText',
                    markdown: toggleText,
                    onFinish: () => {
                        setTimeout(() => {
                            dispatch(setVirus('toggleText', ''));
                            
                        }, 10000);
                        
                    }
                }} />
            </Box>
            <Box>
                <IconButton
                    sx={{ m: 1 }}
                    color="primary"
                    onClick={handleVirusClick}>
                    <Icon icon="virus" />
                </IconButton>
            </Box>
        </Box>

        <Dialog
            open={dialogOpen}
            onClose={() => dispatch(setVirus('dialogOpen', false))}
            fullScreen={isMobile}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{flexGrow: 1}}/>
                    <IconButton onClick={() => dispatch(setVirus('dialogOpen', false))}>
                        <Icon icon="close" />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent sx={{mb: 3}}>
                <Grid container spacing={2}>

                    <Grid size={{ xs: 12, sm: 7 }}>
                        <TopViruses />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 5 }}>
                        <Share />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>

    </>

}


/* 
<pre>{JSON.stringify(firestoreDoc, null, 2)}</pre> 
*/