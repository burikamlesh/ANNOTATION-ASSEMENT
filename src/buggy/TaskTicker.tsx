"use client";

import React, { useEffect, useState } from "react";

type Task = { id: string; title: string; updatedAt: number };

export function TaskTicker({ apiBase }: { apiBase: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((prevTick) => prevTick + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!selectedId) return;

    fetch(`${apiBase}/api/tasks/${selectedId}`)
      .then((r) => r.json())
      .then((t) => {
        if (!t || !t.id) return;

        setTasks((prev) => {
          const exists = prev.some((task) => task.id === t.id);
          if (exists) return prev;
          return [...prev, t];
        });
      })
      .catch((err) => console.error("Ticker fetch failure:", err));
  }, [selectedId, apiBase]);

  const sorted = [...tasks].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <ul className="space-y-2 border border-zinc-900 rounded-xl bg-zinc-950 p-4">
      {sorted.map((t) => (
        <li
          key={t.id}
          onClick={() => setSelectedId(t.id)}
          className={`cursor-pointer p-2 rounded-lg text-sm text-zinc-300 transition-colors hover:bg-zinc-900 ${
            selectedId === t.id
              ? "bg-zinc-900 border border-zinc-800 font-medium"
              : ""
          }`}
        >
          {t.title}{" "}
          <span className="text-zinc-500 font-mono text-xs">
            (updated{" "}
            {Math.max(0, Math.floor((Date.now() - t.updatedAt) / 1000))}s ago)
          </span>
        </li>
      ))}
    </ul>
  );
}
