'use client';
import * as React from 'react';
import {
    Avatar,
    Box,
    CardHeader,
    Tooltip,
    Typography,
    CardContent,
} from '@mui/material';
import { 
    Icon,
    CleverText,
} from '../../NX/DesignSystem';
import {
    geoString,
    identityCharacters,
    useDoc,
    useVirus,
} from '../../Virus'
import UpdateDialog from './UpdateDialog';

export default function Fingerprint() {
    const virus = useVirus();
    const doc = useDoc();
    const [identityEditorOpen, setIdentityEditorOpen] = React.useState(false);
    const identityTitle = typeof doc?.name === 'string' && doc.name.trim().length > 0
        ? doc.name
        : 'Add identity';
    const geoSubheader = geoString(doc?.geo) || doc?.id || '';
    const avatar = typeof doc?.avatar === 'string' && identityCharacters.includes(doc.avatar as any)
        ? doc.avatar
        : null;
    ;
    return (
        <Box>

            <UpdateDialog
                title="Identity"
                open={identityEditorOpen}
                onOpenChange={setIdentityEditorOpen}
                hideTrigger
                field="name"
                icon="async"
                label="Name"
                description="Choose a new identity for this fingerprint."
                valueType="string"
                required
                minLength={2}
                maxLength={80}
                confirmText="Save"
                cancelText="Not today thank you"
                validate={(nextValue) => {
                    const value = String(nextValue ?? '').trim();
                    if (!value) return 'Name is required';
                    return null;
                }}
            />

            <CardHeader
                component="button"
                type="button"
                onClick={() => setIdentityEditorOpen(true)}
                aria-label={avatar ? 'Change identity' : 'Add identity'}
                sx={{
                    width: '100%',
                    textAlign: 'left',
                    border: 0,
                    background: 'none',
                    cursor: 'pointer',
                }}
                avatar={<>
                    {avatar ? <Tooltip title={'Change identity'}>
                        <Avatar
                            src={avatar ?
                                `/shared/svg/characters/${avatar}.svg`
                                : undefined}
                            sx={{
                                width: 128,
                                height: 128,
                            }}
                        />
                    </Tooltip> : null }
                        
                    </>
                }
                title={<Typography variant="h6">
                        {identityTitle}
                    </Typography>} 
                subheader={geoSubheader}
            />
            <CardContent>
                <CleverText
                    options={{
                        id: 'fingerprint',
                        markdown: virus?.clever,
                        onFinish: () => {
                            // console.log('finished')
                        }
                    }}
                />
            </CardContent>
        </Box>
    );
}

