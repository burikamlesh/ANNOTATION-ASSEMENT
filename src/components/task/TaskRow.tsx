import { Task } from "@/src/types/task";
import Badge from "../common/Badge";
const getStatusStyles = (status: string) => {
  switch (status?.toLowerCase()) {
    case "done":
      return "bg-emerald-950/40 text-emerald-400 border-emerald-800/60 uppercase text-[10px] tracking-wider";
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
      return "bg-zinc-900 text-zinc-500 border-zinc-800";
  }
};
interface Props {
  task: Task;
  onSelect: (id: string) => void;
}

export default function TaskRow({ task, onSelect }: Props) {
  return (
    <tr
      key={task.id}
      className=" cursor-pointer hover:bg-zinc-900/40 transition-colors"
      onClick={() => onSelect(task.id)}
    >
      {/* Title column */}
      <td className="px-4 py-3 text-sm text-zinc-200 font-medium truncate">
        {task.title || (
          <span className="text-zinc-600 italic">— No Title —</span>
        )}
      </td>

      {/* Type column */}
      <td className="px-4 py-3 text-sm text-zinc-400">
        {task.type || <span className="text-zinc-600 italic">—</span>}
      </td>

      {/* Status Column */}
      <td className="px-4 py-3 text-sm">
        {task.status ? (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(
              task.status
            )}`}
          >
            {task.status.toLowerCase().replace("_", " ")}
          </span>
        ) : (
          <span className="text-zinc-600 italic">—</span>
        )}
      </td>

      
      <td className="px-4 py-3 text-sm text-zinc-400">
        {task.assignee ? (
          
          typeof task.assignee === "string" ? (
            task.assignee
          ) : (
           
            (task.assignee as any).name ?? String(task.assignee)
          )
        ) : (
          <span className="text-zinc-600">Unassigned</span>
        )}
      </td>

      <td className="px-4 py-3 text-sm text-right text-zinc-400 font-mono">
        {(task as any).annotationCount ?? 0}
      </td>
    </tr>
  );
}
