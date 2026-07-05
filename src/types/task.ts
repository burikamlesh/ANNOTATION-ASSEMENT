
export type TaskType =
  | "image"
  | "audio"
  | "text"
  | "unknown";

export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "DONE"
  | "QA"
  | "BLOCKED"
  | "UNKNOWN";

export interface User {
  id: string;
  name: string;
}

export interface Task {
  id: string;

  title: string;

  type: TaskType;

  status: TaskStatus;

  assignee: User | null;

  annotationCount: number;

  updatedAt: number;
    description?: string;
    createdAt?: string;
  priority?: "high" | "medium" | "low";

  note?: string;
}