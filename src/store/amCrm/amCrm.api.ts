/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AmbassadorDataType } from '../../types/types';

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
    login: build.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: 'auth/token/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    getAmbassadorsList: build.query<AmbassadorDataType[], { status: string }>({
      query: ({ status }) => ({
        url: 'ambassador/',
        params: {
          status,
        },
      }),
    }),
    getPrograms: build.query<any, void>({
      query: () => ({
        url: 'utility/programs',
      }),
    }),
    getStatuses: build.query<any, void>({
      query: () => ({
        url: 'utility/ambassador_statuses',
      }),
    }),
    getAmbassadorInfo: build.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `ambassador/${id}/`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProgramsQuery,
  useGetStatusesQuery,
  useGetAmbassadorsListQuery,
  useGetAmbassadorInfoQuery,
} = api;
