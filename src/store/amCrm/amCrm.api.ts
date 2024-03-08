/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AmbassadorDataResponse,
  AmbassadorDataType,
  MerchRequestListType,
  ReportQueryType,
} from '../../types/types';

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
    getReportStatuses: build.query<any, void>({
      query: () => ({
        url: 'utility/report_statuses',
      }),
    }),
    getAmbassadorInfo: build.query<AmbassadorDataType, { id: string }>({
      query: ({ id }) => ({
        url: `ambassador/${id}/`,
      }),
    }),
    getAmbassadorMerch: build.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `ambassador/${id}/merches/`,
      }),
    }),
    getAmbassadorReports: build.query<ReportQueryType[], { id: string }>({
      query: ({ id }) => ({
        url: `ambassador/${id}/reports/`,
      }),
    }),
    patchReport: build.mutation<
      any,
      { report_id: string; grade?: number; status?: string }
    >({
      query: ({ report_id, grade, status }) => ({
        url: `report/${report_id}/`,
        method: 'PATCH',
        body: {
          grade: grade,
          status: status,
        },
      }),
    }),
    getMerchStatuses: build.query<any, void>({
      query: () => ({
        url: 'utility/delivery_statuses',
      }),
    }),
    getMerchRequests: build.query<MerchRequestListType[], void>({
      query: () => ({
        url: 'merch_request/',
      }),
    }),
    getAllReports: build.query<ReportQueryType[], void>({
      query: () => ({
        url: 'report/',
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
  useGetAmbassadorMerchQuery,
  useLazyGetAmbassadorsListQuery,
  useGetAmbassadorReportsQuery,
  usePatchReportMutation,
  useGetReportStatusesQuery,
  useGetMerchRequestsQuery,
  useGetMerchStatusesQuery,
  useGetAllReportsQuery,
} = api;
