import { normalizeTask, normalizeStatus } from "@/src/utils/normalize";
import { RawTask } from "@/src/types/api";

function makeRaw(overrides: Partial<RawTask> = {}): RawTask {
  return {
    id: "t1",
    title: "Task 1",
    type: "image",
    status: "in_progress",
    assignee: { id: "u1", name: "Asha" },
    annotationCount: 3,
    updatedAt: "2024-06-28T00:00:00.000Z",
    ...overrides,
  };
}

describe("normalizeStatus", () => {
  it("normalizes inconsistent casing/spelling to a known status", () => {
    expect(normalizeStatus("InProgress")).toBe("IN_PROGRESS");
    expect(normalizeStatus("QA")).toBe("QA");
    expect(normalizeStatus("BLOCKED")).toBe("BLOCKED");
  });

  it("falls back to UNKNOWN for unrecognized status strings", () => {
    expect(normalizeStatus("archived")).toBe("UNKNOWN");
  });
});

describe("normalizeTask", () => {
  it("parses ISO timestamps and epoch-ms timestamps to the same numeric shape", () => {
    const iso = normalizeTask(makeRaw({ updatedAt: "2024-06-28T00:00:00.000Z" }));
    const epoch = normalizeTask(makeRaw({ updatedAt: 1719532800000 }));

    expect(iso.updatedAt).toBe(1719532800000);
    expect(epoch.updatedAt).toBe(1719532800000);
  });

  it("coerces a string annotationCount into a number", () => {
    const task = normalizeTask(makeRaw({ annotationCount: "12" }));
    expect(task.annotationCount).toBe(12);
  });

  it("maps an unknown task type to 'unknown' instead of dropping the task", () => {
    const task = normalizeTask(makeRaw({ type: "video" }));
    expect(task.type).toBe("unknown");
    expect(task.id).toBe("t1");
  });

  it("preserves a null assignee rather than crashing", () => {
    const task = normalizeTask(makeRaw({ assignee: null }));
    expect(task.assignee).toBeNull();
  });
});
