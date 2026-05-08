'use client';
import * as React from 'react';
import moment from 'moment';
import {
    Avatar,
    Box,
    CardHeader,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material';
import { 
    Icon,
} from '../../NX/DesignSystem';
import {
    identityCharacters,
    useFingerprint,
    useVirus,
    useDoc,
} from '../../Virus'
import UpdateDialog from './UpdateDialog';

export default function Fingerprint() {

    const virus = useVirus();
    const title = virus.title;
    const doc = useDoc();
    const [identityEditorOpen, setIdentityEditorOpen] = React.useState(false);
    const identityTitle = typeof doc?.name === 'string' && doc.name.trim().length > 0
        ? doc.name
        : 'Add identity';
    const avatar = typeof doc?.avatar === 'string' && identityCharacters.includes(doc.avatar as any)
        ? doc.avatar
        : null;
    // const fp = useFingerprint();
    // const firstSeen = doc?.created ? `First seen ${moment(doc.created).fromNow()}` : undefined;
    // const clever = virus?.clever || `This is the fingerprint of ${title}. It is a unique identifier that can be used to track the virus across different systems and networks. The fingerprint is generated using a combination of various attributes of the virus, such as its code, behavior, and network activity. By analyzing the fingerprint, security researchers can gain insights into the virus's capabilities and potential impact.`;
    return (
        <Box>

            <UpdateDialog
                title="Identity"
                open={identityEditorOpen}
                onOpenChange={setIdentityEditorOpen}
                hideTrigger
                field="name"
                label="Name"
                
                description="Choose a new name for this fingerprint."
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
                avatar={
                    <Tooltip title={avatar ? 'Change avatar' : 'Add avatar'}>
                        <IconButton
                            aria-label={avatar ? 'Change avatar' : 'Add avatar'}
                            onClick={() => setIdentityEditorOpen(true)}
                            color="primary"
                        >
                            <Avatar
                                src={avatar ? `/shared/svg/characters/${avatar}.svg` : undefined}
                                sx={{ width: 48, height: 48 }}
                            >
                                {!avatar ? <Icon icon="add" /> : null}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                }
                title={<Typography variant="h6">
                        {identityTitle}
                    </Typography>} 
                // subheader={firstSeen ?? fp}
            />
            {/* <CardContent>
                <CleverText
                    options={{
                        id: 'fingerprint',
                        markdown: clever,
                        onFinish: () => {
                            console.log('finished')
                        }
                    }}
                />
            </CardContent> */}
        </Box>
    );
}

