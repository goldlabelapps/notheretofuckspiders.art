'use client';
import * as React from 'react';
import {
    Box,
    CardHeader,
    CardContent,
    Typography,
} from '@mui/material';
import { 
    Icon,
    CleverText,
} from '../../NX/DesignSystem';
import {
    useFingerprint,
    useVirus
} from '../../Virus'

export default function Fingerprint() {

    const virus = useVirus();
    const title = virus.title;
    // const clever = typeof virus.clever === 'string' ? virus.clever : '';
    const fp = useFingerprint();

    return (
        <Box>
            <CardHeader
                avatar={<><Icon icon="fingerprint" /></>}
                // sx={{ alignItems: 'flex-start' }}
                title={<Typography variant="body1">
                        {title}
                    </Typography>} 
                subheader={fp}
            />
            <CardContent>
                {/* <CleverText
                    options={{
                        id: 'fingerprint',
                        markdown: clever,
                        onFinish: () => {
                            console.log('finished')
                        }
                    }}
                /> */}
            </CardContent>
        </Box>
    );
}

