import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { ChatMessage as ChatMessageType } from '../types/chat';
import { ChatBot, User } from '../assets/svg';
import '../assets/styles/ChatMessage.scss';

interface Props {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <Box className={`chat-message ${isUser ? 'chat-message--user' : ''}`}>
      <Avatar
        className={`chat-message__avatar ${!isUser ? 'chat-message__avatar--assistant' : ''}`}
      >
        {isUser ? <User width="20px" height="20px" /> : <ChatBot width="20px" height="20px" />}
      </Avatar>
      
      <Box
        className={`chat-message__bubble ${isUser ? 'chat-message__bubble--user' : 'chat-message__bubble--assistant'}`}
        aria-label={isUser ? 'User message' : 'Assistant message'}
      >
        <Typography className="chat-message__text" variant="body1">{message.text}</Typography>
      </Box>
    </Box>
  );
}; 