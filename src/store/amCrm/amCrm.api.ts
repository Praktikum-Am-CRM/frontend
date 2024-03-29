/* eslint-disable camelcase */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { REPORT_STATUSES } from '../../utils/constants';

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
  tagTypes: [
    'Comments',
    'Ambassadors',
    'Ambassador',
    'Auth',
    'Merch',
    'AllReports',
    'AmbassadorMessages',
  ],
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
      DataResponseFromServer<AmbassadorDataType>,
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
      providesTags: ['Ambassador'],
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
      providesTags: ['AllReports'],
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
          report_status: status,
        },
      }),
      invalidatesTags: ['AllReports'],
    }),

    patchDataAmbassador: build.mutation<
      unknown,
      AmbassadorDataPartialWithStringStatus
    >({
      query: formData => ({
        url: `ambassador/${formData.id}/`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['Ambassador', 'Ambassadors'],
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
    getAllReports: build.query<
      DataResponseFromServer<ReportQueryType>,
      { limit?: number; page?: number }
    >({
      query: ({ limit = 15, page = 1 }) => {
        const searchParams = new URLSearchParams();

        searchParams.append('status', REPORT_STATUSES.ACCEPT);
        searchParams.append('status', REPORT_STATUSES.REJECT);
        searchParams.set('limit', limit.toString());
        searchParams.set('page', page.toString());

        return {
          url: 'report/',
          params: searchParams,
        };
      },
    }),
    getUnreadReports: build.query<
      DataResponseFromServer<ReportQueryType>,
      { limit?: number; page?: number }
    >({
      query: ({ limit = 15, page = 1 }) => ({
        url: 'report/unread_reports/',
        params: {
          limit,
          page,
        },
      }),
      providesTags: ['AllReports'],
    }),

    getStatisticsOnProgram: build.query<AmbassadorProgramStatisticType[], void>(
      {
        query: () => ({
          url: 'statistic/ambassador_program/',
        }),
      },
    ),
    getStatisticsOnAmbassadors: build.query<
      AmbassadorStatusStatisticType[],
      void
    >({
      query: () => ({
        url: 'statistic/ambassador_status/',
      }),
    }),
    createOnboardingMini: build.mutation<void, OnboardingMiniType>({
      query: data => ({
        url: 'ambassador/',
        method: 'POST',
        body: data,
      }),
    }),
    postReportBot: build.mutation<void, ReportBotType>({
      query: data => ({
        url: 'report/bot/',
        method: 'POST',
        body: data,
      }),
    }),
    postNewMessage: build.mutation<void, NewMessageType>({
      query: data => ({
        url: 'bot_message/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'AmbassadorMessages', id: arg.ambassadors?.[0] },
      ],
    }),
    getAmbassadorMessages: build.query<
      MessageHistoryItemType[],
      { id: string }
    >({
      query: ({ id }) => ({
        url: `ambassador/${id}/messages/`,
      }),
      providesTags: (_result, _error, arg) => [
        { type: 'AmbassadorMessages', id: arg.id },
      ],
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
  useLazyGetAllReportsQuery,
  useLazyGetUnreadReportsQuery,
  useCreateOnboardingMiniMutation,
  usePostReportBotMutation,
  usePatchDataAmbassadorMutation,
  usePostNewMessageMutation,
  useGetStatisticsOnProgramQuery,
  useGetStatisticsOnAmbassadorsQuery,
  useGetAmbassadorMessagesQuery,
} = api;
