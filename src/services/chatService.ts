import axios from 'axios';
import { API, API_KEY } from '../constants/api';

export const sendMessage = async (prompt: string): Promise<string> => {
  const response = await axios.post(
    API.TEXT + '?pk=' + API_KEY,
    { prompt },
    { headers: { 'Content-Type': 'application/json' } }
  );
  if (response.data.status === 'success') {
    return response.data.text;
  }
  throw new Error('API Error');
};

export const sendImagePrompt = async (prompt: string): Promise<string> => {
  const response = await axios.post(
    API.IMAGE + '?pk=' + API_KEY,
    { prompt },
    { headers: { 'Content-Type': 'application/json' } }
  );
  if (response.data.status === 'success') {
    return response.data.text;
  }
  throw new Error('API Error');
}; 