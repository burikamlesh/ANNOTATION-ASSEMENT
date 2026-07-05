import localforage from "localforage";
import { Task } from "@/src/types/task";

const taskStore = localforage.createInstance({
  name: "annotation-console",
  storeName: "tasks",
});

const summaryStore = localforage.createInstance({
  name: "annotation-console",
  storeName: "summaries",
});

export async function saveTasks(tasks: Task[]) {
  await taskStore.setItem("task-list", tasks);
}

export async function getTasks(): Promise<Task[]> {
  const tasks = await taskStore.getItem<Task[]>("task-list");
  return tasks ?? [];
}

export async function clearTasks() {
  await taskStore.removeItem("task-list");
}

export async function saveSummary(
  taskId: string,
  summary: string
) {
  await summaryStore.setItem(taskId, summary);
}

export async function getSummary(
  taskId: string
): Promise<string | null> {
  return summaryStore.getItem<string>(taskId);
}