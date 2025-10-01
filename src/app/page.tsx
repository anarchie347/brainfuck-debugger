"use client";
import { useState } from "react";
import { MemtapeRowDisplay } from "./MemtapeRowDisplay";
import { SnipperRunBtns } from "./SnippetRunBtns";
import { interpret } from "./bfInterpreter";

export default function Page() {
  const [memtape, setMemtape] = useState(tmpMemtapeInit);
  const [memptr, setMemptr] = useState(0);
  const updateCellVal = (nv: number, i: number) => {
    setMemtape((old) => old.toSpliced(i, 1, nv));
    console.log("nv: ", nv);
  };
  console.log("QQQ", memtape[memptr]);
  return (
    <div className="p-3">
      <SnipperRunBtns
        snippets={tmpSnips}
        runFunc={async (s: string) => {
          const result = await interpret(
            s,
            memtape,
            memptr,
            async () => {},
            console.log,
            async () => "T",
            255
          );
          setMemtape([...result.memtape]);
          setMemptr(result.memptr);
          console.log(memtape);
        }}
      />
      <div className="h-3"></div>
      <MemtapeRowDisplay
        memtape={memtape}
        memptr={memptr}
        blockDescription={tmpBlockDescription}
        updateCellVal={updateCellVal}
      />
    </div>
  );
}

const tmpSnips = [
  { code: ">", name: "R1" },
  { code: ">>>", name: "R1B" },
  { code: "+++++", name: "+5" },
  { code: "4", name: "Func4" },
  { code: "5", name: "Func5" },
  { code: "6", name: "Func6" },
];
const tmpMemtapeInit = Array.from({ length: 30000 }).fill(0) as number[];
const tmpBlockDescription = ["W", "D", "F"];
