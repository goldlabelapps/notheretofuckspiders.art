"use client";
// Ensures this file is treated as a client component
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    CircularProgress,
    Divider,
    List,
    ListItemAvatar,
    ListItemButton,
    IconButton,
    ListItemText,
    Typography,
} from '@mui/material';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import moment from 'moment';
import { getFirebaseFirestore } from '../../NX/lib/firebase';
import { Icon, navigateTo } from '../../NX/DesignSystem';
import { useDispatch } from '../../NX/Uberedux';
import D3ScoreChart from '../../NX/NXAdmin/components/Prospects/components/D3ScoreChart';
import Score from './Score';

interface VirusDoc {
    id: string;
    name?: string;
    score?: number;
    message?: string;
    created?: number;
    updated?: number;
    createdBy?: string;
}

export default function VirusSurface() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [viruses, setViruses] = React.useState<VirusDoc[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const db = getFirebaseFirestore();
        const q = query(collection(db, 'viruses'), orderBy('score', 'desc'));
        const unsub = onSnapshot(q, (snapshot) => {
            setViruses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const scores = React.useMemo(
        () => viruses.map(v => typeof v.score === 'number' ? v.score : null).filter((s): s is number => s !== null),
        [viruses],
    );

    const avgScore = React.useMemo(
        () => scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
        [scores],
    );

    const topByScore = React.useMemo(() => viruses.slice(0, 5), [viruses]);

    const newest = React.useMemo(
        () => viruses.length
            ? [...viruses].sort((a, b) => (b.created ?? 0) - (a.created ?? 0))[0]
            : null,
        [viruses],
    );

    return (
        <Card variant="outlined">
            <CardHeader
                avatar={<Icon icon="virus" />}
                action={<>
                    <IconButton
                        color="primary"
                        onClick={() => dispatch(navigateTo(router, `/viruses/new`))}
                    >
                        <Icon icon="add" />
                    </IconButton>
                </>}
                title={
                    <Typography variant="h6">
                        <Box component="span"><b>{loading ? '…' : viruses.length}</b></Box>{' '}
                        Viruses°
                    </Typography>
                }
                // subheader={
                //     !loading && viruses.length > 0
                //         ? `Avg score ${avgScore}`
                //         : undefined
                // }
            />

            {loading ? (
                <CardContent>
                    <Box display="flex" alignItems="center" gap={1}>
                        <CircularProgress size={20} />
                        <Typography variant="body2" color="text.secondary">Loading…</Typography>
                    </Box>
                </CardContent>
            ) : viruses.length === 0 ? (
                <CardContent>
                    <Typography variant="body2" color="text.secondary">No viruses found.</Typography>
                </CardContent>
            ) : (
                <>
                    {/* Stat chips */}
                    {/* <CardContent sx={{ pt: 0, pb: 1 }}>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            
                            {scores.length > 0 && (
                                <Chip
                                    size="small"
                                    label={`Top score ${scores[0]}`}
                                    color="primary"
                                    variant="outlined"
                                />
                            )}
                            {newest && newest.created && newest.created > 0 && (
                                <Chip
                                    size="small"
                                    label={`Newest ${moment(newest.created).fromNow()}`}
                                    variant="outlined"
                                />
                            )}
                        </Box>
                    </CardContent>

                    <Divider /> */}

                    {/* Score gauge + top list */}
                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 2,
                                alignItems: 'flex-start',
                            }}
                        >


                            {/* Top viruses */}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                
                                <List dense disablePadding>
                                    {topByScore.map((virus, idx) => (
                                        <React.Fragment key={virus.id}>
                                            <ListItemButton
                                                sx={{ px: 0 }}
                                                onClick={() => dispatch(navigateTo(router, `/viruses/${virus.id}`))}
                                            >
                                                <ListItemAvatar>
                                                    <Score score={virus.score ?? 0} size={32} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="body2" noWrap>
                                                            {virus.name}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        virus.created
                                                            ? moment(virus.created).fromNow()
                                                            : undefined
                                                    }
                                                />
                                            </ListItemButton>
                                            {idx < topByScore.length - 1 && <Divider component="li" />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Box>
                        </Box>
                    </CardContent>
                </>
            )}
        </Card>
    );
}
