import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://192.168.0.104:3333',
});

export default apiClient;
