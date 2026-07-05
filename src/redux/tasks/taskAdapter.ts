


import { createEntityAdapter } from "@reduxjs/toolkit";
import { Task } from "@/src/types/task";

export const taskAdapter = createEntityAdapter<Task>({
  sortComparer: (a, b) => b.updatedAt - a.updatedAt,
});

export const taskInitialState = taskAdapter.getInitialState({
  loading: false,
  error: null as string | null,

  page: 1,
  pageSize: 20,
  total: 0,

  search: "",
  statusFilter: "",
    typeFilter: "",
    sortOrder: "updatedAt",

  selectedTaskId: null as string | null,
  isCacheStale: false,
});