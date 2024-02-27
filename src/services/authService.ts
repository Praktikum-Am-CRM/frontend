import axios from 'axios';

export const authService = {
  login: (email: string, password: string) => {
    return axios.post('/api/login', { email, password });
  },
};
