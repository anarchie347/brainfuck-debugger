"use client";
import { SnipperRunBtns } from "./SnippetRunBtns";

export default function Page() {
  return (
    <div className="p-3">
      <SnipperRunBtns
        snippets={Array.from({ length: 50 }).map((_, i) => ({
          code: i.toString(),
          name: `Func${i}`,
        }))}
        runFunc={async (s: string) => {
          alert(s);
        }}
      />
    </div>
  );
}

const tmpSnips = [
  { code: "1", name: "Func1" },
  { code: "2", name: "Func2" },
  { code: "3", name: "Func3" },
  { code: "4", name: "Func4" },
  { code: "5", name: "Func5" },
  { code: "6", name: "Func6" },
];
