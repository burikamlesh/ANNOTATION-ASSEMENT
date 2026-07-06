import { RawTask } from "@/src/types/api";
import type { Task, TaskStatus, TaskType } from "@/src/types/task";

const typeMap: Record<string, TaskType> = {
  image: "image",
  audio: "audio",
  text: "text",
};

const statusMap: Record<string, TaskStatus> = {
  todo: "TODO",
  in_progress: "IN_PROGRESS",
  inprogress: "IN_PROGRESS",
  done: "DONE",
  qa: "QA",
  blocked: "BLOCKED",
};

export function normalizeStatus(status: string): TaskStatus {
  return statusMap[status.toLowerCase()] ?? "UNKNOWN";
}

export function normalizeTask(raw: RawTask): Task {
  const normalizedType =
    typeMap[raw.type.toLowerCase()] ?? "unknown";

  const normalizedStatus = normalizeStatus(raw.status);

  const updatedAt =
    typeof raw.updatedAt === "string"
      ? new Date(raw.updatedAt).getTime()
      : raw.updatedAt;

  const annotationCount =
    typeof raw.annotationCount === "string"
      ? Number(raw.annotationCount)
      : raw.annotationCount;

  return {
    id: raw.id,
    title: raw.title,
    type: normalizedType,
    status: normalizedStatus,
    assignee: raw.assignee,
    annotationCount: Number.isNaN(annotationCount) ? 0 : annotationCount,
    updatedAt,
    priority:
      raw.meta?.priority === "high" ||
      raw.meta?.priority === "medium" ||
      raw.meta?.priority === "low"
        ? raw.meta.priority
        : undefined,
    note: raw.meta?.note,
  };
}