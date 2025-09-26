import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Grid } from "react-window";

export function MemtapeRowDisplay({
  memtape,
  updateCellVal,
  blockDescription,
}: MemtapeRowDisplayProps) {
  const cellsPerBlock = blockDescription.length;
  const blockedVals = Array.from({
    length: Math.ceil(1000 /*memtape.length / cellsPerBlock*/),
  }).map((_, i) => memtape.slice(i * cellsPerBlock, (i + 1) * cellsPerBlock));
  console.log(blockedVals.length);
  return (
    <div className="p-2 bg-gray-800 rounded-xl border-2 border-cyan-800">
      <Grid
        cellComponent={GridCellComponent}
        cellProps={{
          blockedVals,
          updateCellVal,
          cellsPerBlock,
          columnIndex: undefined as never, //for TS linting
          rowIndex: undefined as never,
        }}
        columnCount={1000}
        rowCount={1}
        rowHeight="100%"
        columnWidth={200}
      ></Grid>
    </div>
  );
}

/*blockedVals.map((b, i) => (
        <div className="flex-none p-2" key={i}>
          <MemBlock
            values={b}
            index={i}
            updateMemCell={(nv, co) =>
              updateCellVal(nv, i * cellsPerBlock + co)
            }
          />
        </div>
      ))*/

function GridCellComponent({
  rowIndex,
  columnIndex,
  blockedVals,
  updateCellVal,
  cellsPerBlock,
}: GridCellComponentProp) {
  return (
    <div className="JOO p-2">
      {`${rowIndex}.${columnIndex}`}
      <MemBlock
        values={blockedVals[columnIndex]}
        index={columnIndex}
        updateMemCell={(nv, co) =>
          updateCellVal(nv, columnIndex * cellsPerBlock + co)
        }
      />
    </div>
  );
}

function MemBlock({ index, values, updateMemCell }: MemBlockProps) {
  const [localVal, setLocalVal] = useState([...values]);
  const onChange = (e: ChangeEvent<HTMLInputElement>, offset: number) => {
    const val = Number(e.target.value.replace(/\D/g, ""));
    setLocalVal(localVal.toSpliced(offset, 1, val));
  };
  const onKeydown = (e: KeyboardEvent<HTMLInputElement>, offset: number) => {
    if (e.key !== "Enter") {
      return;
    }
    updateMemCell(localVal[offset], offset);
  };
  return (
    <div>
      <div className="p-2 bg-gradient-to-br from-orange-300 to-amber-300 rounded-md text-center">
        {index}
      </div>
      <div className="h-1"></div>
      <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 text-center rounded-md">
        {localVal.map((v, i) => (
          // <div key={i} contentEditable="plaintext-only" suppressContentEditableWarning className="min-w-[3ch]" onInput={}>

          // </div>
          <div key={i}>
            <input
              key={i}
              className="min-w-[3ch] border-none p-0 m-0 focus:outline-none w-auto bg-emerald-700"
              value={v}
              onChange={(e) => onChange(e, i)}
              onKeyDown={(e) => onKeydown(e, i)}
              type="text"
              inputMode="numeric"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export interface GridCellComponentProp {
  rowIndex: number;
  columnIndex: number;
  blockedVals: number[][];
  updateCellVal: (newVal: number, index: number) => void;
  cellsPerBlock: number;
}
export interface MemBlockProps {
  index: number;
  values: number[];
  updateMemCell: (newVal: number, cellOffset: number) => void;
}

export interface MemtapeRowDisplayProps {
  memtape: number[];
  updateCellVal: (newVal: number, index: number) => void;
  blockDescription: string[];
}
