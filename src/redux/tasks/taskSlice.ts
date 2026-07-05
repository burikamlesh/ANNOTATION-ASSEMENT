import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskAdapter, taskInitialState } from "./taskAdapter";

const taskSlice = createSlice({
  name: "tasks",
  initialState: taskInitialState,

  reducers: {
    setTasks: taskAdapter.setAll,

    upsertTask: taskAdapter.upsertOne,

    updateTask: taskAdapter.updateOne,

    removeTask: taskAdapter.removeOne,

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    setSelectedTask(state, action: PayloadAction<string | null>) {
      state.selectedTaskId = action.payload;
    },
setSortOrder(state, action: PayloadAction<string>) {
  state.sortOrder = action.payload;
},
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },

    setStatusFilter(state, action: PayloadAction<string>) {
      state.statusFilter = action.payload;
    },

    setTypeFilter(state, action: PayloadAction<string>) {
      state.typeFilter = action.payload;
    },

    setPagination(
      state,
      action: PayloadAction<{
        page: number;
        pageSize: number;
        total: number;
      }>
    ) {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.total = action.payload.total;
    },

    setCacheStale(state, action: PayloadAction<boolean>) {
      state.isCacheStale = action.payload;
    },
  },
});

export const {
  setTasks,
  upsertTask,
  updateTask,
  removeTask,
  setLoading,
    setError,
  setSortOrder,
  setSelectedTask,
  setSearch,
  setStatusFilter,
  setTypeFilter,
  setPagination,
  setCacheStale,
} = taskSlice.actions;

export default taskSlice.reducer;