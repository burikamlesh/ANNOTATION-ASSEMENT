import { Task } from "@/src/types/task";

const statusMap: Record<string, Task["status"]> = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",

  // Assignment ke possible values
  todo: "Pending",
  in_progress: "Running",
  done: "Completed",
  blocked: "Failed",
};

const priorityMap: Record<string, Task["priority"]> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export function normalizeTask(raw: any): Task {
  return {
    id: String(raw.id),

    title: raw.title ?? "Untitled",

    description: raw.description ?? "",

    status:
      statusMap[String(raw.status).toLowerCase()] ??
      "Pending",

    priority:
      priorityMap[String(raw.priority).toLowerCase()] ??
      "Medium",

    annotationCount: Number(raw.annotationCount ?? 0),

    createdAt: new Date(
      raw.createdAt ?? Date.now()
    ).toISOString(),

    updatedAt: new Date(
      raw.updatedAt ?? Date.now()
    ).toISOString(),
  };
}