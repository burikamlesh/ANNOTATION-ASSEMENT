import { normalizeTask } from "@/src/utils/normalize";
import { saveTasks } from "@/src/db/localDb";
import { RawTask } from "@/src/types/api";
import { Task } from "@/src/types/task";

export async function syncTasks(
  rawTasks: RawTask[]
): Promise<Task[]> {
  const normalized = rawTasks.map(normalizeTask);

  // Don't await if you want background write
  void saveTasks(normalized);

  return normalized;
}