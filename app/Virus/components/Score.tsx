"use client";

import * as React from "react";
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';

export interface ScoreProps {
  score: number;
  size?: number;
}

export default function Score({ score, size = 40 }: ScoreProps) {
  const theme = useTheme();
  // Clamp score between 0 and 100
  const pct = Math.max(0, Math.min(100, score));
  // Gradient from light grey to theme.palette.primary.main
  const bg = `linear-gradient(135deg, #e0e0e0 0%, ${theme.palette.primary.main} ${pct}%)`;
  // Text color: white if score > 50, else primary.main
  const color = '#000';
  return (
    <Avatar
      sx={{
        background: bg,
        color,
        fontWeight: 'bold',
        width: size,
        height: size,
        fontSize: size * 0.5,
        border: `2px solid ${theme.palette.primary.main}`,
      }}
    >
      {pct}
    </Avatar>
  );
}

/*
<Avatar
  sx={{
    bgcolor: `rgba(25, 118, 210, ${Math.max(0.1, Math.min(1, (virus.score ?? 0) / 100))})`,
    color: (virus.score ?? 0) > 50 ? '#fff' : 'primary.main',
    fontWeight: 'bold',
  }}
>
  {virus.score}
</Avatar>
*/