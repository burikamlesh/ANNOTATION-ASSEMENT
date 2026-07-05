
"use client";

import { useEffect, useRef, useState } from "react";

export default function useTaskSummary(taskId?: string) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!taskId) return;

    
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    setSummary("");
    setLoading(true);

    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${taskId}/summary`,
      {
        signal: controller.signal,
      }
    )
      .then(async (response) => {
        if (!response.body) return;

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = ""; 

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

         
          buffer += decoder.decode(value, { stream: true });

          
          const lines = buffer.split("\n");
          
          
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;

            if (trimmedLine.startsWith("data: ")) {
              const rawData = trimmedLine.replace("data: ", "").trim();

             
              if (rawData === '"end"' || rawData === "end") continue;

              try {
                
                const parsedContent = JSON.parse(rawData);
                setSummary((prev) => prev + parsedContent);
              } catch (e) {
               
                setSummary((prev) => prev + rawData);
              }
            }
          }
        }

        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Stream Fetch Error:", err);
        }
        
        setLoading(false); 
      });

    return () => {
      controller.abort();
    };
  }, [taskId]);

  return {
    summary,
    loading,
  };
}