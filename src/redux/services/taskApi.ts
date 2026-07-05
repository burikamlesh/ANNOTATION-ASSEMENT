import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {RawTasksResponse, TasksResponse, RawTask } from "@/src/types/api";
import { syncTasks } from "@/src/services/syncTasks";
export const taskApi = createApi({
  reducerPath: "taskApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),

  tagTypes: ["Tasks"],

  endpoints: (builder) => ({
   getTasks: builder.query<
  TasksResponse,
  {
    page: number;
    pageSize: number;
  }
>({
  query: ({ page, pageSize }) =>
    `/tasks?page=${page}&pageSize=${pageSize}`,

  transformResponse: async (
    response: RawTasksResponse
  ) => {
    const items = await syncTasks(response.items);

    return {
      ...response,
      items,
    };
  },

  providesTags: ["Tasks"],
}),
    getTask: builder.query<RawTask, string>({
      query: (id) => `/tasks/${id}`,
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
} = taskApi;