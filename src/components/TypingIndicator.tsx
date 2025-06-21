import React from 'react';
import { Box, Typography } from '@mui/material';
import '../assets/styles/TypingIndicator.scss';

interface Props {
  isTyping: boolean;
  sender: 'user' | 'assistant';
}

export const TypingIndicator: React.FC<Props> = ({ isTyping, sender }) => {
  if (!isTyping) return null;

  return (
    <Box
      className={`typing-indicator ${sender === 'user' ? 'typing-indicator--user' : ''}`}
    >
      <Typography className="typing-indicator__dots" variant="body2">
        <span className="dot dot--1">•</span>
        <span className="dot dot--2">•</span>
        <span className="dot dot--3">•</span>
      </Typography>
    </Box>
  );
}; 