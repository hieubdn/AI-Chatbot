import React, { useState, useEffect } from 'react';
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import '../assets/styles/ChatInput.scss';

interface Props {
  onSend: (message: string) => void;
  loading: boolean;
  onTypingChange: (isTyping: boolean) => void;
}

export const ChatInput: React.FC<Props> = ({ onSend, loading, onTypingChange }) => {
  const [value, setValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(false);
      onTypingChange(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [value, onTypingChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    if (newValue.trim()) {
      setIsTyping(true);
      onTypingChange(true);
    } else {
      setIsTyping(false);
      onTypingChange(false);
    }
  };

  const handleSend = () => {
    if (value.trim()) {
      onSend(value.trim());
      setValue('');
      setIsTyping(false);
      onTypingChange(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSend();
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={e => { e.preventDefault(); handleSend(); }}
      className="chat-input"
      elevation={0}
    >
      <InputBase
        className="chat-input__input"
        placeholder="Type your message"
        inputProps={{ 'aria-label': 'Type your message' }}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={loading}
        autoFocus
      />
      <IconButton 
        className="chat-input__send-button" 
        onClick={handleSend} 
        disabled={loading || !value.trim()} 
        aria-label="send"
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}; 