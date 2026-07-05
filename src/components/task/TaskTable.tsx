import { Task } from "@/src/types/task";
import TaskRow from "./TaskRow";

interface Props {
  tasks: Task[];
  onSelect: (id: string) => void;
}

export default function TaskTable({
  tasks,
  onSelect,
}: Props) {
    return (
      <div className="overflow-x-auto bg-zinc-950 p-6 rounded-lg border border-zinc-800">
  <table className="w-full min-w-full table-fixed border-collapse">
    <thead>
      <tr className="border-b border-zinc-800 text-left text-zinc-400 text-sm">
        <th className="w-1/3 px-4 py-3 font-medium">Title</th>
        <th className="w-1/6 px-4 py-3 font-medium">Type</th>
        <th className="w-1/6 px-4 py-3 font-medium">Status</th>
        <th className="w-1/6 px-4 py-3 font-medium">Assignee</th>
        <th className="w-1/12 px-4 py-3 font-medium text-right">Count</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-zinc-900">
                    {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onSelect={onSelect}
          />
        
      ))}
    </tbody>
  </table>
</div>
    
  );
}