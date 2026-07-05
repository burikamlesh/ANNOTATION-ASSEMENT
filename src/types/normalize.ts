import { RawTask } from "@/src/types/api";
import { Task, TaskStatus, TaskType } from "@/src/types/task";

const typeMap: Record<string, TaskType> = {
  image: "image",
  audio: "audio",
  text: "text",
};

const statusMap: Record<string, TaskStatus> = {
  todo: TaskStatus.TODO,
  in_progress: TaskStatus.IN_PROGRESS,
  inprogress: TaskStatus.IN_PROGRESS,
  done: TaskStatus.DONE,
  qa: TaskStatus.QA,
  blocked: TaskStatus.BLOCKED,
};

export function normalizeTask(raw: RawTask): Task {
  const normalizedType =
    typeMap[raw.type.toLowerCase()] ?? "unknown";

  const normalizedStatus =
    statusMap[raw.status.toLowerCase()] ??
    TaskStatus.UNKNOWN;

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