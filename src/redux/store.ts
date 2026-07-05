import { configureStore } from "@reduxjs/toolkit";

import taskReducer from "./tasks/taskSlice";

import { taskApi } from "./services/taskApi";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,

    [taskApi.reducerPath]: taskApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;