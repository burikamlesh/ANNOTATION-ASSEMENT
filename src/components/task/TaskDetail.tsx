import { Task } from "@/src/types/task";

interface Props {
  task: Task | null;
}

export default function TaskDetail({ task }: Props) {
  if (!task) {
    return (
      <div className="h-full flex items-center justify-center border border-zinc-800 rounded-xl bg-zinc-950/50 p-8 text-zinc-500 italic text-sm">
        Select a task from the list to view its details.
      </div>
    );
  }

  const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case "done":
        return "bg-emerald-950/40 text-emerald-400 border-emerald-800/60";
      case "todo":
        return "bg-zinc-800 text-zinc-300 border-zinc-700";
      case "in_progress":
      case "in progress":
        return "bg-sky-950/40 text-sky-400 border-sky-800/60";
      case "qa":
        return "bg-purple-950/40 text-purple-400 border-purple-800/60";
      case "blocked":
        return "bg-rose-950/40 text-rose-400 border-rose-800/60";
      default:
        return "bg-zinc-900 text-zinc-400 border-zinc-800";
    }
  };

  return (
    <div className="h-full border border-zinc-800 rounded-xl bg-zinc-950 p-6 shadow-xl flex flex-col justify-between">
      <div>
        {/* Header (ID & Title) */}
        <div className="mb-6">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-1">
            Task ID: {task.id || "N/A"}
          </span>
          <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">
            {task.title || (
              <span className="text-zinc-600 italic">— No Title —</span>
            )}
          </h2>
        </div>

        {/* Description Section */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Description
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900/40 border border-zinc-900 rounded-lg p-3 min-h-[80px]">
            {task.description || (
              <span className="text-zinc-600 italic">
                No description provided for this task.
              </span>
            )}
          </p>
        </div>

        {/* Metadata Grid */}
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          Details
        </h3>
        <div className="grid grid-cols-2 gap-4 bg-zinc-900/20 border border-zinc-900 rounded-xl p-4">
          <div>
            <span className="text-xs text-zinc-500 block mb-1">Status</span>
            {task.status ? (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider ${getStatusStyles(
                  task.status
                )}`}
              >
                {task.status.replace("_", " ")}
              </span>
            ) : (
              <span className="text-sm text-zinc-600 italic">—</span>
            )}
          </div>

          <div>
            <span className="text-xs text-zinc-500 block mb-1">Priority</span>
            <span className="text-sm font-medium text-zinc-300 capitalize">
              {task.priority || "Normal"}
            </span>
          </div>

          <div>
            <span className="text-xs text-zinc-500 block mb-1">Assignee</span>
            <span className="text-sm font-medium text-zinc-300">
              {task.assignee ? (
                (task.assignee as any)?.name ?? String(task.assignee)
              ) : (
                <span className="text-zinc-600 italic">Unassigned</span>
              )}
            </span>
          </div>

          <div>
            <span className="text-xs text-zinc-500 block mb-1">
              Annotations
            </span>
            <span className="text-sm font-mono text-zinc-300">
              {("annotationCount" in task
                ? (task as any).annotationCount
                : (task as any).annotationCount) ?? 0}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Timestamp */}
      <div className="mt-8 pt-4 border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-500 font-mono">
        <span>Updated:</span>
        <span>{task.createdAt || "Just now"}</span>
      </div>
    </div>
  );
}
