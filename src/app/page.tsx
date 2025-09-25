"use client";
import { useState } from "react";
import { MemtapeRowDisplay } from "./MemtapeRowDisplay";
import { SnipperRunBtns } from "./SnippetRunBtns";

export default function Page() {
  const [memtape, setMemtape] = useState<number[]>(tmpMemtapeInit);

  return (
    <div className="p-3 ">
      <SnipperRunBtns
        snippets={Array.from({ length: 50 }).map((_, i) => ({
          code: i.toString(),
          name: `Func${i}`,
        }))}
        runFunc={async (s: string) => {
          alert(s);
        }}
      />
      <div className="h-3"></div>
      <MemtapeRowDisplay
        memtape={memtape}
        blockDescription={tmpBlockDescription}
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
const tmpMemtapeInit = Array.from({ length: 30000 }).fill(0) as number[];
const tmpBlockDescription = ["W", "D", "F"];
