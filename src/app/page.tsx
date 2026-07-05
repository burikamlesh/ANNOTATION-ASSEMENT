"use client";

import { useEffect, useMemo, useState } from "react";

import { useGetTasksQuery } from "@/src/redux/services/taskApi";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import {
  setTasks,
  setPagination,
  setSearch,
  setStatusFilter,
  setTypeFilter,
  setSortOrder,
} from "@/src/redux/tasks/taskSlice";

import { selectFilteredTasks } from "@/src/redux/tasks/taskSelectors";

import { syncTasks } from "@/src/services/syncTasks";
import useTaskFeed from "@/src/hooks/useTaskFeed";
import Loader from "@/src/components/common/Loader";
import ErrorState from "@/src/components/common/ErrorState";
import EmptyState from "@/src/components/common/EmptyState";

import TaskToolbar from "@/src/components/task/TaskToolbar";
import TaskTable from "@/src/components/task/TaskTable";
import Pagination from "@/src/components/task/Pagination";
import TaskDrawer from "@/src/components/task/TaskDrawer";

import { Task } from "@/src/types/task";
import { RootState } from "../redux/store";

export default function Home() {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);

  const pageSize = 20;
  const search = useAppSelector((state: RootState) => state.tasks.search);
  const statusFilter = useAppSelector(
    (state: RootState) => state.tasks.statusFilter
  );
  const typeFilter = useAppSelector(
    (state: RootState) => state.tasks.typeFilter
  );
  const sortOrder = useAppSelector(
    (state: RootState) => state.tasks.sortOrder || "updatedAt"
  );
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { data, isLoading, error } = useGetTasksQuery({
    page,
    pageSize,
  });

  const tasks = useAppSelector(selectFilteredTasks);

  useEffect(() => {
    async function load() {
      if (!data) return;

      const normalized = await syncTasks(data.items);

      dispatch(setTasks(normalized));

      dispatch(
        setPagination({
          page: data.page,
          pageSize: data.pageSize,
          total: data.total,
        })
      );
    }

    load();
  }, [data, dispatch]);

  const totalPages = useMemo(
    () => (data ? Math.ceil(data.total / data.pageSize) : 1),
    [data]
  );
  useTaskFeed();
  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Annotation Activity Console</h1>

      <TaskToolbar
        search={search}
        onSearch={(val) => dispatch(setSearch(val))}
        status={statusFilter}
        onStatus={(val) => dispatch(setStatusFilter(val))}
        type={typeFilter}
        onType={(val) => dispatch(setTypeFilter(val))}
        sort={sortOrder}
        onSort={(val) => dispatch(setSortOrder(val))}
      />

      {isLoading && <Loader />}

      {error && <ErrorState message="Unable to load tasks." />}

      {!isLoading && tasks.length === 0 && <EmptyState />}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <TaskTable
            tasks={tasks}
            onSelect={(id) => {
              const task = tasks.find((t) => t.id === id) ?? null;

              setSelectedTask(task);
            }}
          />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>

        <TaskDrawer task={selectedTask} />
      </div>
    </main>
  );
}
