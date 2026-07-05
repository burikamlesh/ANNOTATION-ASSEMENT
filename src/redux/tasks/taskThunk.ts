import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/src/services/api";
import { Task } from "@/src/types/task";
import { saveTasks, getTasks } from "@/src/db/localDb";
import { normalizeTask } from "@/src/utils/normalizeTask";
export const fetchTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: string }
>(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/tasks");

const normalizedTasks = response.map(normalizeTask);

await saveTasks(normalizedTasks);

return normalizedTasks;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Unable to fetch tasks"
      );
    }
  }
);

export const loadCachedTasks = createAsyncThunk(
  "tasks/loadCachedTasks",
  async () => {
    const cached = await getTasks();

    return cached.map(normalizeTask);
  }
);