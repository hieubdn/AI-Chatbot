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
      <div className='chat-box-header'>
        <span className='chat-box-header-title'>_hiubdn AI Chatbot</span>
        <div className="chat-box-header__badges">
          <div className='header-badges-rowone'>
          <img src="https://img.shields.io/github/last-commit/hieulee1102/ai-chabot?style=flat" alt="Last Commit" />
          <img src="https://img.shields.io/badge/Updated-June%202025-blue?style=flat" alt="Updated" />
          <img src="https://img.shields.io/github/languages/top/hieulee1102/ai-chabot?style=flat" alt="Top Language" />
          </div>
          <div className='header-badges-row-two'>
          <img src="https://img.shields.io/github/languages/count/hieulee1102/ai-chabot?style=flat" alt="Language Count" />
          </div>
        </div>
        <div className='built-technologies-container'>
          <span className='built-technologies-title'>Built with the tools and technologies:</span>

          <div className='built-technologies'>
            <div className='built-technologies-row-one'>
            <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" alt='' />
            <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" alt='' />
            <img src="https://img.shields.io/badge/Sass-CC6699?style=flat&logo=sass&logoColor=white" alt='' />
            <img src="https://img.shields.io/badge/Markdown-000000?style=flat&logo=markdown&logoColor=white" alt='' />
            <img src="https://img.shields.io/badge/Material--UI-0081CB?style=flat&logo=mui&logoColor=white" alt='' />
            </div>
            <div className='built-technologies-row-two'>
            <img src="https://img.shields.io/badge/React%20Query-FF4154?style=flat&logo=react-query&logoColor=white" alt='' /> 
            <img src="https://img.shields.io/badge/React--Syntax--Highlighter-282C34?style=flat&logo=react&logoColor=61DAFB" alt='' />
            <img src="https://img.shields.io/badge/Axios-671ddf?style=flat&logo=axios&logoColor=white" alt='' />
            <img src="https://img.shields.io/badge/NPM-CB3837?style=flat&logo=npm&logoColor=white" alt='' />
            </div>
          </div>
        </div>
      </div>
      <Box className="chat-box">
        <Box className="chat-box__header">
          <div className='chat-box-header-title'>
            _hiubdn AI Chatbot
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