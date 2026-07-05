import { User, Task } from "./task";

export interface RawTask {
  id: string;
  title: string;
  type: string;
  status: string;
  assignee: User | null;
  annotationCount: number | string;
  updatedAt: number | string;
  meta?: {
    priority?: string;
    note?: string;
  };
}

export interface RawTasksResponse {
  page: number;
  pageSize: number;
  total: number;
  items: RawTask[];
}

export interface TasksResponse {
  page: number;
  pageSize: number;
  total: number;
  items: Task[];
}