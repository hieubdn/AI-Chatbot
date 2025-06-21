import React from 'react';
import { Box, Typography } from '@mui/material';
import { useChat } from '../hooks/useChat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import '../assets/styles/ChatBox.scss';
import { Notification, SettingIcon, UserLogout } from '../assets/svg';

export const ChatBox: React.FC = () => {
  const {
    messages,
    loading,
    error,
    send,
    chatboxRef,
    userTyping,
    assistantTyping,
    handleUserTyping
  } = useChat();

  return (
    <div className='chat-box-container'>
      <div className='chat-box-header'>IG AI Chatbot</div>
      <Box className="chat-box">
        <Box className="chat-box__header">
          <div className='chat-box-header-title'>
            IG AI Chatbot
          </div>
          <div className="header-service-right-options">
            <div className="icon-wrapper notification-icon">
              <Notification />
            </div>
            <div className="icon-wrapper setting-icon">
              <SettingIcon />
            </div>
            <div className="icon-wrapper">
              <UserLogout />
            </div>
          </div>
        </Box>
        <Box
          ref={chatboxRef}
          className="chat-box__messages"
        >
          {messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {/* User typing indicator */}
          <TypingIndicator isTyping={userTyping} sender="user" />

          {/* Assistant typing indicator */}
          <TypingIndicator isTyping={assistantTyping} sender="assistant" />
        </Box>

        {error && (
          <Typography className="chat-box__error">{error}</Typography>
        )}

        <Box className="chat-box__input-container">
          <ChatInput onSend={send} loading={loading} onTypingChange={handleUserTyping} />
        </Box>
      </Box>
    </div>
  );
}; 