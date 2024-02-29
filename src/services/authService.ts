import axios from 'axios';

export const authService = {
  login: (email: string, password: string) => {
    return axios.post(
      'https://my-vercel-project-coral-six.vercel.app/api/v1/auth/token/login',
      {
        email,
        password,
      },
    );
  },
};
