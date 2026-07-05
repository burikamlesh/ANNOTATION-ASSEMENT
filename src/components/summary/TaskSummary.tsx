

"use client";

import ReactMarkdown from "react-markdown";
import DOMPurify from "isomorphic-dompurify"; 
interface Props {
  summary: string;
  loading: boolean;
}

export default function TaskSummary({ summary, loading }: Props) {
  return (
    <div className="border border-zinc-800 bg-zinc-950 p-5 rounded-xl shadow-lg mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-sm text-zinc-400 uppercase tracking-wider">
          AI Summary Stream
        </h2>

        {loading && (
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        )}
      </div>

      <div className="bg-zinc-900/40 border border-zinc-900 rounded-lg p-4 min-h-[120px]">
        {loading && !summary && (
          <p className="text-zinc-500 text-sm italic animate-pulse">
            Connecting to summary stream...
          </p>
        )}

      
        <div className="prose prose-invert max-w-none text-sm text-zinc-300 leading-relaxed">
          <ReactMarkdown
            components={{
              
              html: ({ node }: any) => {
                
                const raw = (node && (node.value ?? node.children?.[0]?.value)) || "";
                const cleanHtml = DOMPurify.sanitize(String(raw), {
                  ALLOWED_TAGS: ["b", "i", "em", "strong", "code"],
                });
                return <span dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
              },
            }}
          >
            {summary}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
