import { API } from './api';

export const sendMessage = async (message, payload) =>
  await API.post('/sendMessage', { message, payload });
