import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import taskReducer, { setTasks } from "@/src/redux/tasks/taskSlice";
import { selectFilteredTasks } from "@/src/redux/tasks/taskSelectors";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setStatusFilter } from "@/src/redux/tasks/taskSlice";
import TaskToolbar from "@/src/components/task/TaskToolbar";
import TaskTable from "@/src/components/task/TaskTable";
import { Task } from "@/src/types/task";

function makeTask(overrides: Partial<Task>): Task {
  return {
    id: "t1",
    title: "Untitled",
    type: "image",
    status: "TODO",
    assignee: null,
    annotationCount: 0,
    updatedAt: 0,
    ...overrides,
  };
}

function TestHarness() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((s) => s.tasks.statusFilter);
  const tasks = useAppSelector(selectFilteredTasks);

  return (
    <>
      <TaskToolbar
        search=""
        onSearch={() => {}}
        status={status}
        onStatus={(v) => dispatch(setStatusFilter(v))}
        type=""
        onType={() => {}}
        sort="updatedAt"
        onSort={() => {}}
      />
      <TaskTable tasks={tasks} onSelect={() => {}} />
    </>
  );
}

function renderWithStore() {
  const store = configureStore({ reducer: { tasks: taskReducer } });

  store.dispatch(
    setTasks([
      makeTask({ id: "t1", title: "Caption the photo", status: "TODO" }),
      makeTask({ id: "t2", title: "Transcribe interview", status: "DONE" }),
    ])
  );

  return render(
    <Provider store={store}>
      <TestHarness />
    </Provider>
  );
}

describe("task filtering UI", () => {
  it("shows all tasks by default and narrows the list when a status filter is applied", async () => {
    const user = userEvent.setup();
    renderWithStore();

    expect(screen.getByText("Caption the photo")).toBeInTheDocument();
    expect(screen.getByText("Transcribe interview")).toBeInTheDocument();

    await user.selectOptions(screen.getByDisplayValue("All Status"), "DONE");

    expect(screen.queryByText("Caption the photo")).not.toBeInTheDocument();
    expect(screen.getByText("Transcribe interview")).toBeInTheDocument();
  });
});
