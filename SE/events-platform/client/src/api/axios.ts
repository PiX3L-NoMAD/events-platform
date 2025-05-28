import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    if (!config.headers) {
      config.headers = {} as typeof config.headers;
    }
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export { api };
