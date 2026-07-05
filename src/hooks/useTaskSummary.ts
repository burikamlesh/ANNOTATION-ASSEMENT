// "use client";

// import { useEffect, useRef, useState } from "react";

// export default function useTaskSummary(taskId?: string) {
//   const [summary, setSummary] = useState("");
//   const [loading, setLoading] = useState(false);

//   const controllerRef = useRef<AbortController | null>(null);

//   useEffect(() => {
//     if (!taskId) return;

//     // Cancel previous request
//     controllerRef.current?.abort();

//     const controller = new AbortController();
//     controllerRef.current = controller;

//     setSummary("");
//     setLoading(true);

//     fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${taskId}/summary`,
//       {
//         signal: controller.signal,
//       }
//     )
//       .then(async (response) => {
//         if (!response.body) return;

//         const reader = response.body.getReader();
//         const decoder = new TextDecoder();

//         while (true) {
//           const { value, done } = await reader.read();

//           if (done) break;

//           const chunk = decoder.decode(value);

//           setSummary((prev) => prev + chunk);
//         }

//         setLoading(false);
//       })
//       .catch((err) => {
//         if (err.name !== "AbortError") {
//           console.error(err);
//         }

//         setLoading(false);
//       });

//     return () => {
//       controller.abort();
//     };
//   }, [taskId]);

//   return {
//     summary,
//     loading,
//   };
// }
"use client";

import { useEffect, useRef, useState } from "react";

export default function useTaskSummary(taskId?: string) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!taskId) return;

    // Cancel previous ongoing stream request instantly
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
        let buffer = ""; // Partial buffers ko hold karne ke liye wrapper

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          // Buffer stream data assemble karein
          buffer += decoder.decode(value, { stream: true });

          // SSE frames standard newlines (\n) par divide hote hain
          const lines = buffer.split("\n");
          
          // Aakhri incomplete chunk line ko buffer me hold rakhein
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;

            if (trimmedLine.startsWith("data: ")) {
              const rawData = trimmedLine.replace("data: ", "").trim();

              // Streaming boundary end parameters skip karein
              if (rawData === '"end"' || rawData === "end") continue;

              try {
                // CRUCIAL SYNC STEP: JSON.parse double escaped string blocks ("\\n") 
                // ko clean system native line-breaks (\n) me normalize karega
                const parsedContent = JSON.parse(rawData);
                setSummary((prev) => prev + parsedContent);
              } catch (e) {
                // Safe fallback agar stream chunk plain raw encoded string text hai
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
        // Faillures silent lock na ho, isliye trigger clear rakhein
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