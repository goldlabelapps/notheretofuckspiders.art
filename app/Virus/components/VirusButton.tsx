"use client";
import React from "react";
import {
    Box,
    IconButton,
} from '@mui/material';
import { useDispatch } from '../../NX/Uberedux';
import { 
    Icon, 
    CleverText, 
} from '../../NX/DesignSystem';
import { setVirus, useVirus } from '../../Virus';

export default function VirusButton() {

    const dispatch = useDispatch();
    const virus = useVirus();
    const toggleText = virus?.toggleText || '';
    const icon = virus?.icon || 'virus';

    const handleIconClick = () => {
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
                        }, 2500);
                    }
                }} />
            </Box>
            <Box>
                <IconButton
                    sx={{ m: 1 }}
                    color="primary"
                    onClick={handleIconClick}>
                    <Icon icon={icon} />
                </IconButton>
            </Box>
        </Box>

    </>

}


/* 
<pre>{JSON.stringify(firestoreDoc, null, 2)}</pre> 
*/