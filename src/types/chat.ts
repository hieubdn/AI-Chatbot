export type ChatMessage = {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  createdAt: number;
}; 