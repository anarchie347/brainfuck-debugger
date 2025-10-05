import { useState } from "react";
import { UploadFileBtn } from "./UploadFileBtn";

export function SnipperRunBtns({ runFunc }: SnippetRunBtnsProps) {
  const [snippets, setSnippets] = useState([] as Snippet[]);
  return (
    <div className="flex gap-2 overflow-x-auto">
      <div className="flex-none p-2">
        <UploadFileBtn
          text="+"
          onFileUploaded={(contents, filename) =>
            setSnippets((old) => [...old, { name: filename, code: contents }])
          }
        />
      </div>
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

function uploadNewSnippet() {}

interface Snippet {
  code: string;
  name: string;
}
export interface SnippetRunBtnsProps {
  runFunc: (source: string) => Promise<void>;
}
