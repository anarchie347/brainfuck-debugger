import { CodeSnippet } from "./types";

export function SnipperRunBtns({ snippets, runFunc }: SnippetRunBtnsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto p-2 bg-gray-800 rounded-xl border-2 border-cyan-800">
      {snippets.map((s, i) => (
        <div className="flex-none p-2" key={i}>
          <button
            className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 content-center rounded-md"
            onClick={() => runFunc(s.code)}
          >
            {s.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export interface SnippetRunBtnsProps {
  snippets: CodeSnippet[];
  runFunc: (source: string) => Promise<void>;
}
