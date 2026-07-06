"use client";

import { Task } from "@/src/types/task";
import useTaskSummary from "@/src/hooks/useTaskSummary";
import TaskSummary from "../summary/TaskSummary";

interface Props {
  task: Task | null;
}

export default function TaskDrawer({ task }: Props) {
  const { summary, loading } = useTaskSummary(task?.id);

  if (!task) {
    return (
      <div className="rounded-xl border p-6 bg-zinc-950 border-zinc-800 text-zinc-500 italic text-sm h-full flex items-center justify-center">
        Select a task to view details and live analysis stream.
      </div>
    );
  }

  return (
    <div className="rounded-xl border p-6 shadow-xl bg-zinc-950 border-zinc-800 text-zinc-200 flex flex-col gap-5 h-full">
      {/* Header Info */}
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">
          {task.title}
        </h2>
        <span className="text-xs font-mono text-zinc-500 block mt-1 uppercase tracking-wider">
          ID: {task.id}
        </span>
      </div>

      <div className="space-y-4 border-t border-zinc-900 pt-4 text-sm">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div>
            <span className="text-xs text-zinc-500 block mb-0.5">Type</span>
            <span className="font-medium text-zinc-300 capitalize">
              {task.type}
            </span>
          </div>

          <div>
            <span className="text-xs text-zinc-500 block mb-0.5">Status</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-800 uppercase tracking-wider">
              {task.status?.replace("_", " ")}
            </span>
          </div>

          <div>
            <span className="text-xs text-zinc-500 block mb-0.5">Assignee</span>
            <span className="font-medium text-zinc-300">
              {task.assignee?.name ?? (
                <span className="text-zinc-600 italic">Unassigned</span>
              )}
            </span>
          </div>

          <div>
            <span className="text-xs text-zinc-500 block mb-0.5">
              Annotations
            </span>
            <span className="font-mono text-zinc-300 font-semibold">
              {task.annotationCount}
            </span>
          </div>
        </div>

        {task.priority && (
          <div className="border-t border-zinc-900/60 pt-2">
            <span className="text-xs text-zinc-500 block mb-0.5">Priority</span>
            <span className="text-rose-400 font-medium capitalize">
              {task.priority}
            </span>
          </div>
        )}

        {task.note && (
          <div className="border-t border-zinc-900/60 pt-2">
            <span className="text-xs text-zinc-500 block mb-0.5">Notes</span>
            <p className="text-zinc-400 text-xs italic bg-zinc-900/30 border border-zinc-900 rounded p-2 mt-1">
              {task.note}
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-900 pt-2">
        <TaskSummary summary={summary} loading={loading} />
      </div>

      <div className="mt-auto pt-4 border-t border-zinc-900 flex justify-between items-center text-[11px] text-zinc-500 font-mono">
        <span>Updated:</span>
        <span>{new Date(task.updatedAt).toLocaleString()}</span>
      </div>
    </div>
  );
}
