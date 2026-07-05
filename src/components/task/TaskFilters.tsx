"use client";

interface Props {
  status: string;
  setStatus: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
}

export default function TaskFilters({
  status,
  setStatus,
  sort,
  setSort,
}: Props) {
  return (
    <div className="flex gap-4 my-4">
      <select
        className="border rounded p-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Running">Running</option>
        <option value="Completed">Completed</option>
        <option value="Failed">Failed</option>
      </select>

      <select
        className="border rounded p-2"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="title">Title</option>
        <option value="priority">Priority</option>
        <option value="createdAt">Created Date</option>
      </select>
    </div>
  );
}
