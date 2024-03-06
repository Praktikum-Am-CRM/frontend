/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  auth_token: string;
}

// interface AmbassadorsResponse {
//   auth_token: string;
// }

// interface AmbassadorsRequest {
//   email: string;
//   password: string;
// }

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ambassadorsyapractice.ru/api/v1/',
    prepareHeaders: headers => {
      const auth_token = localStorage.getItem('auth_token');
      if (auth_token) {
        headers.set('authorization', `Bearer ${auth_token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Comments', 'Ambassadors', 'Auth'],
  endpoints: build => ({
    // Список сотрудников команды
    // getAmbassadors: build.query<AmbassadorsResponse, AmbassadorsRequest>({
    //   query: ({ gender, programm, sort_by, order }) => ({
    //     url: `users`,
    //     params: {
    //       gender,
    //       sort_by,
    //       order,
    //       programm,
    //     },
    //   }),
    // }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: 'auth/token/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    getPrograms: build.query<any, any>({
      query: () => ({
        url: 'utility/programs',
      }),
    }),
    getStatuses: build.query<any, any>({
      query: () => ({
        url: 'utility/ambassador_statuses',
      }),
    }),
  }),
});

// export const { useGetAmbassadorsQuery, useLoginMutation } = api;
export const { useLoginMutation, useGetProgramsQuery, useGetStatusesQuery } =
  api;
