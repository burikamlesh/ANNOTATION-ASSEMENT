"use client";

import { useEffect } from "react";

import WebSocketManager from "@/src/services/WebSocketManager/WebSocketManager";

import { useAppDispatch } from "@/src/redux/hooks";

import { updateTask, incrementAnnotationCount } from "@/src/redux/tasks/taskSlice";
import { normalizeStatus } from "@/src/utils/normalize";

export default function useTaskFeed() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    WebSocketManager.connect((event) => {
      switch (event.kind) {
        case "task.updated":
          // updateOne is a no-op if the task hasn't been loaded yet,
          // which is the desired behavior for out-of-order events.
          dispatch(
            updateTask({
              id: event.payload.id,
              changes: {
                status: normalizeStatus(event.payload.status),
                updatedAt: event.payload.updatedAt,
              },
            })
          );
          break;

        case "task.assigned":
          dispatch(
            updateTask({
              id: event.payload.id,
              changes: { assignee: event.payload.assignee },
            })
          );
          break;

        case "annotation.created":
          dispatch(incrementAnnotationCount({ taskId: event.payload.taskId }));
          break;
      }
    });

    return () => WebSocketManager.disconnect();
  }, [dispatch]);
}
