import { configureStore } from "@reduxjs/toolkit";
import taskReducer, { setTasks, setStatusFilter, setSearch } from "./taskSlice";
import { selectFilteredTasks } from "./taskSelectors";
import { Task } from "@/src/types/task";
import type { RootState } from "@/src/redux/store";

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

function makeTestStore() {
  return configureStore({ reducer: { tasks: taskReducer } });
}

describe("selectFilteredTasks", () => {
  it("returns only tasks matching the active status filter", () => {
    const store = makeTestStore();

    store.dispatch(
      setTasks([
        makeTask({ id: "t1", title: "Review image", status: "TODO" }),
        makeTask({ id: "t2", title: "Review audio", status: "DONE" }),
      ])
    );
    store.dispatch(setStatusFilter("DONE"));

    const result = selectFilteredTasks(store.getState() as unknown as RootState);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("t2");
  });

  it("filters by case-insensitive search on the title", () => {
    const store = makeTestStore();

    store.dispatch(
      setTasks([
        makeTask({ id: "t1", title: "Caption the sunset photo" }),
        makeTask({ id: "t2", title: "Transcribe interview" }),
      ])
    );
    store.dispatch(setSearch("SUNSET"));

    const result = selectFilteredTasks(store.getState() as unknown as RootState);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("t1");
  });
});
