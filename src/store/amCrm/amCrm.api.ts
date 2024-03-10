import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ActivityType,
  AmbassadorDataResponse,
  AmbassadorDataType,
  GoalType,
  MerchRequestListType,
  MerchRequestType,
  OnboardingMini,
  ProgramType,
  ReportQueryType,
  ReportType,
  RequestStatusType,
  StatusType,
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
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        headers.set('authorization', `Token ${authToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Comments', 'Ambassadors', 'Auth', 'Merch', 'AllReports'],
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
      {
        status: string | string[];
        limit?: number;
        page?: number;
        search?: string;
      }
    >({
      query: ({ status, limit = 15, page, search }) => {
        const searchParams = new URLSearchParams();

        if (Array.isArray(status)) {
          status.forEach(s => {
            searchParams.append('status', s);
          });
        } else {
          searchParams.set('status', status);
        }

        searchParams.set('limit', limit.toString());
        if (page) searchParams.set('page', page.toString());
        if (search) searchParams.set('search', search.toString());
        return {
          url: 'ambassador/',
          params: searchParams,
        };
      },
      providesTags: ['Ambassadors'],
    }),
    getPrograms: build.query<ProgramType[], void>({
      query: () => ({
        url: 'utility/programs',
      }),
    }),
    getGoals: build.query<GoalType[], void>({
      query: () => ({
        url: 'utility/goals',
      }),
    }),
    getActivities: build.query<ActivityType[], void>({
      query: () => ({
        url: 'utility/activities',
      }),
    }),
    getStatuses: build.query<StatusType[], void>({
      query: () => ({
        url: 'utility/ambassador_statuses',
      }),
    }),
    getReportStatuses: build.query<ReportType[], void>({
      query: () => ({
        url: 'utility/report_statuses',
      }),
    }),
    getAmbassadorInfo: build.query<AmbassadorDataType, { id: string }>({
      query: ({ id }) => ({
        url: `ambassador/${id}/`,
      }),
    }),
    getAmbassadorMerch: build.query<MerchRequestType[], { id: string }>({
      query: ({ id }) => ({
        url: `ambassador/${id}/merches/`,
      }),
      providesTags: ['Merch'],
    }),
    getAmbassadorReports: build.query<ReportQueryType[], { id: string }>({
      query: ({ id }) => ({
        url: `ambassador/${id}/reports/`,
      }),
    }),
    patchReport: build.mutation<
      unknown,
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
      invalidatesTags: ['AllReports'],
    }),
    getMerchStatuses: build.query<RequestStatusType[], void>({
      query: () => ({
        url: 'utility/delivery_statuses',
      }),
    }),
    getMerchRequests: build.query<MerchRequestListType[], void>({
      query: () => ({
        url: 'merch_request/',
      }),
      providesTags: ['Merch'],
    }),
    getAllReports: build.query<ReportQueryType[], void>({
      query: () => ({
        url: 'report/',
      }),
      providesTags: ['AllReports'],
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createOnboardingMini: build.mutation<any, OnboardingMini>({
      query: data => ({
        url: 'ambassador/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProgramsQuery,
  useGetGoalsQuery,
  useGetActivitiesQuery,
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
  useCreateOnboardingMiniMutation,
} = api;
