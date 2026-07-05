import { Task } from "@/src/types/task";

export function mergeTaskUpdate(
  task: Task,
  payload: any
): Task {
  return {
    ...task,
    ...payload,
  };
}