/* eslint-disable camelcase */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:3000/api/',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Comments', 'Ambassadors'],
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
  }),
});

export const { useGetAmbassadorsQuery } = api;
