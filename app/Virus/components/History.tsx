'use client';
import * as React from 'react';
import {
	Box,
	Avatar,
	Card,
	CardContent,
	Typography,
	Link,
} from '@mui/material';
import { T_HistoryEntry } from '../types';

interface HistoryProps {
	history?: T_HistoryEntry[];
}

export default function History({ history }: HistoryProps) {
	if (!history || history.length === 0) {
		return (
			<Box sx={{ p: 2 }}>
				<Typography variant="body2" color="textSecondary">
					No history yet
				</Typography>
			</Box>
		);
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			{history.map((entry, index) => (
				<Card key={`${entry.url}-${entry.timestamp}`} variant="outlined">
					<CardContent>
						<Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
							{entry.favicon && (
								<Avatar
									src={entry.favicon}
									sx={{ width: 48, height: 48, flexShrink: 0 }}
									alt={entry.siteName || 'Site'}
								/>
							)}
							<Box sx={{ flex: 1, minWidth: 0 }}>
								<Link
									href={entry.url}
									target="_blank"
									rel="noopener noreferrer"
									underline="hover"
									sx={{ display: 'block', mb: 0.5 }}
								>
									<Typography
										variant="subtitle2"
										sx={{
											fontWeight: 600,
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
										}}
									>
										{entry.title}
									</Typography>
								</Link>
								{entry.description && (
									<Typography
										variant="body2"
										color="textSecondary"
										sx={{
											mb: 0.5,
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
										}}
									>
										{entry.description}
									</Typography>
								)}
								<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
									{entry.siteName && (
										<Typography variant="caption" color="textSecondary">
											{entry.siteName}
										</Typography>
									)}
									{entry.tenant && (
										<Typography variant="caption" color="textSecondary">
											({entry.tenant})
										</Typography>
									)}
								</Box>
								<Typography variant="caption" color="textSecondary">
									{new Date(entry.timestamp).toLocaleString()}
								</Typography>
							</Box>
						</Box>
					</CardContent>
				</Card>
			))}
		</Box>
	);
}
