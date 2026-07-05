"use client";

import { useEffect } from "react";

import  WebSocketManager from "@/src/services/WebSocketManager/WebSocketManager";

import { useAppDispatch } from "@/src/redux/hooks";

import {
  upsertTask,
} from "@/src/redux/tasks/taskSlice";

export default function useTaskFeed() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    WebSocketManager.connect(
      (event) => {
        switch (event.kind) {
          case "task.updated":
            dispatch(
              upsertTask({
                id: event.payload.id,
                status:
                  event.payload.status,
                updatedAt:
                  event.payload.updatedAt,
              } as any)
            );

            break;

          case "task.assigned":
            dispatch(
              upsertTask({
                id: event.payload.id,
                assignee:
                  event.payload.assignee,
              } as any)
            );

            break;

          case "annotation.created":
            dispatch(
              upsertTask({
                id: event.payload.taskId,
                annotationCount: 1,
              } as any)
            );

            break;
        }
      }
    );

    return () =>
      WebSocketManager.disconnect();
  }, [dispatch]);
}