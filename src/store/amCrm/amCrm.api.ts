/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AmbassadorDataResponse, AmbassadorInfoType } from '../../types/types';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  auth_token: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ambassadorsyapractice.ru/api/v1/',
    prepareHeaders: headers => {
      const auth_token = localStorage.getItem('auth_token');
      if (auth_token) {
        headers.set('authorization', `Token ${auth_token}`);
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
    getAmbassadorsList: build.query<
      AmbassadorDataResponse,
      { status: string | string[]; limit?: number; page?: number }
    >({
      query: ({ status, limit = 15, page }) => {
        const searchParams = new URLSearchParams();

        // Если 'status' - массив, добавляем все его значения.
        // В противном случае просто добавляем 'status' как строку.
        if (Array.isArray(status)) {
          status.forEach(s => {
            searchParams.append('status', s);
          });
        } else {
          searchParams.set('status', status);
        }

        searchParams.set('limit', limit.toString());
        if (page) searchParams.set('page', page.toString());
        return {
          url: 'ambassador/',
          params: searchParams,
        };
      },
      providesTags: ['Ambassadors'],
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
    getAmbassadorInfo: build.query<AmbassadorInfoType, { id: string }>({
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
  useLazyGetAmbassadorsListQuery,
} = api;
