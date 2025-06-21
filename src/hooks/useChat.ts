import { useState, useRef, useCallback } from 'react';
import { ChatMessage } from '../types/chat';
import { sendMessage, sendImagePrompt } from '../services/chatService';
import { v4 as uuidv4 } from 'uuid';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userTyping, setUserTyping] = useState(false);
  const [assistantTyping, setAssistantTyping] = useState(false);
  const chatboxRef = useRef<HTMLDivElement | null>(null);

  const addMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
    setTimeout(() => {
      chatboxRef.current?.scrollTo({ top: chatboxRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  }, []);

  const send = useCallback(async (text: string) => {
    setError(null);
    setUserTyping(false);
    
    const userMsg: ChatMessage = {
      id: uuidv4(),
      text,
      sender: 'user',
      createdAt: Date.now(),
    };
    addMessage(userMsg);
    
    // Show assistant typing indicator
    setAssistantTyping(true);
    setLoading(true);
    
    try {
      const isImage = text.trim().startsWith('/image');
      const apiCall = isImage ? sendImagePrompt : sendMessage;
      const reply = await apiCall(text);
      
      // Hide assistant typing indicator
      setAssistantTyping(false);
      
      addMessage({
        id: uuidv4(),
        text: reply,
        sender: 'assistant',
        createdAt: Date.now(),
        isImage,
      });
    } catch (e) {
      setAssistantTyping(false);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [addMessage]);

  const handleUserTyping = useCallback((isTyping: boolean) => {
    setUserTyping(isTyping);
  }, []);

  return { 
    messages, 
    loading, 
    error, 
    send, 
    chatboxRef, 
    userTyping, 
    assistantTyping, 
    handleUserTyping 
  };
} 