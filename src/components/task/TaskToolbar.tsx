"use client";

interface Props {
  search: string;
  onSearch: (v: string) => void;

  status: string;
  onStatus: (v: string) => void;

  type: string;
  onType: (v: string) => void;

  sort: string;
  onSort: (v: string) => void;
}

export default function TaskToolbar({
  search,
  onSearch,
  status,
  onStatus,
  type,
  onType,
  sort,
  onSort,
}: Props) {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <input
        value={search}
        onChange={(e) =>
          onSearch(e.target.value)
        }
        placeholder="Search..."
        className="rounded border px-3 py-2"
      />

      <select
        value={type}
        onChange={(e) =>
          onType(e.target.value)
        }
        className="rounded border px-3 py-2"
      >
        <option value="">All Types</option>

        <option value="image">Image</option>

        <option value="audio">Audio</option>

        <option value="text">Text</option>
      </select>

      <select
        value={status}
        onChange={(e) =>
          onStatus(e.target.value)
        }
        className="rounded border px-3 py-2"
      >
        <option value="">All Status</option>

        <option value="TODO">Todo</option>

        <option value="IN_PROGRESS">
          In Progress
        </option>

        <option value="DONE">Done</option>

        <option value="QA">QA</option>

        <option value="BLOCKED">
          Blocked
        </option>
      </select>

      <select
        value={sort}
        onChange={(e) =>
          onSort(e.target.value)
        }
        className="rounded border px-3 py-2"
      >
        <option value="updatedAt">
          Updated
        </option>

        <option value="title">
          Title
        </option>
      </select>
    </div>
  );
}