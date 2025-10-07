import { CSSProperties, FocusEvent, KeyboardEvent } from "react";
import { Grid, useGridRef } from "react-window";

export function MemtapeRowDisplay({
  memtape,
  memptr,
  updateCellVal,
  blockDescription,
}: MemtapeRowDisplayProps) {
  console.warn("MTRD");
  const gridRef = useGridRef(null);
  const cellsPerBlock = blockDescription.length;
  const blockedVals = Array.from({
    length: Math.ceil(memtape.length / cellsPerBlock),
  }).map((_, i) => memtape.slice(i * cellsPerBlock, (i + 1) * cellsPerBlock));
  return (
    <div className=" h-50">
      {/**TODO: remove hardcoded height */}
      <Grid
        gridRef={gridRef}
        cellComponent={GridCellComponent}
        cellProps={{
          blockedVals,
          updateCellVal,
          cellsPerBlock,
          memptr,
          columnIndex: undefined as never, //for TS linting
          style: undefined as never,
        }}
        columnCount={blockedVals.length}
        rowCount={1}
        rowHeight="100%"
        columnWidth={100}
      ></Grid>
    </div>
  );
}
function GridCellComponent({
  columnIndex,
  blockedVals,
  updateCellVal,
  cellsPerBlock,
  memptr,
  style,
}: GridCellComponentProp) {
  const highlightIndex =
    memptr >= columnIndex * cellsPerBlock &&
    memptr < (columnIndex + 1) * cellsPerBlock
      ? memptr % cellsPerBlock
      : undefined;
  return (
    <div style={style} className="p-2">
      <MemBlock
        values={blockedVals[columnIndex]}
        index={columnIndex}
        updateMemCell={(nv, co) =>
          updateCellVal(nv, columnIndex * cellsPerBlock + co)
        }
        highlightIndex={highlightIndex}
      />
    </div>
  );
}

function MemBlock({
  index,
  values,
  updateMemCell,
  highlightIndex,
}: MemBlockProps) {
  const submit = (
    e: KeyboardEvent<HTMLSpanElement> | FocusEvent<HTMLSpanElement, Element>,
    offset: number
  ) => {
    const val = Number(e.currentTarget.innerHTML.replace(/\D/g, ""));
    e.currentTarget.innerHTML = val.toString();
    updateMemCell(val, offset);
  };
  const onKeydown = (e: KeyboardEvent<HTMLSpanElement>, offset: number) => {
    if (e.key !== "Enter") {
      return;
    }
    e.preventDefault();
    e.currentTarget.blur();
    submit(e, offset);
  };
  return (
    <div>
      <div className="p-2 bg-gradient-to-br from-orange-300 to-amber-300 rounded-md text-center">
        {index}
      </div>
      <div className="h-1"></div>
      <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 text-center rounded-md">
        {values.map((v, i) => (
          <div
            key={i}
            contentEditable="plaintext-only"
            suppressContentEditableWarning
            className={`min-w-[3ch] ${
              highlightIndex === i ? "bg-emerald-600" : "bg-cyan-500"
            } w-auto p-0`}
            onBlur={(e) => submit(e, i)}
            onKeyDown={(e) => onKeydown(e, i)}
          >
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}
export interface GridCellComponentProp {
  style: CSSProperties; // auto-added by react-window
  columnIndex: number; // auto-added by react-window
  blockedVals: number[][];
  updateCellVal: (newVal: number, index: number) => void;
  cellsPerBlock: number;
  memptr: number;
}
export interface MemBlockProps {
  index: number;
  values: number[];
  updateMemCell: (newVal: number, cellOffset: number) => void;
  highlightIndex?: number;
}

export interface MemtapeRowDisplayProps {
  memtape: number[];
  memptr: number;
  updateCellVal: (newVal: number, index: number) => void;
  blockDescription: string[];
}
