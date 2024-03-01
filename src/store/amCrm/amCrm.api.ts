/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://my-vercel-project-coral-six.vercel.app/',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Comments', 'Ambassadors', 'Auth'],
  endpoints: build => ({
    // Список сотрудников команды
    getAmbassadors: build.query<unknown, unknown>({
      query: ({ gender, programm, sort_by, order }) => ({
        url: `users`,
        params: {
          gender,
          sort_by,
          order,
          programm,
        },
      }),
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: 'api/v1/auth/token/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const { useGetAmbassadorsQuery, useLoginMutation } = api;
