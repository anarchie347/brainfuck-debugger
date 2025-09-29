import { CSSProperties, FocusEvent, KeyboardEvent } from "react";
import { Grid } from "react-window";

export function MemtapeRowDisplay({
  memtape,
  updateCellVal,
  blockDescription,
}: MemtapeRowDisplayProps) {
  const cellsPerBlock = blockDescription.length;
  const blockedVals = Array.from({
    length: Math.ceil(memtape.length / cellsPerBlock),
  }).map((_, i) => memtape.slice(i * cellsPerBlock, (i + 1) * cellsPerBlock));
  console.log(blockedVals.length);
  return (
    <div className="p-2 bg-gray-800 rounded-xl border-2 border-cyan-800 h-50">
      {/**TODO: remove hardcoded height */}
      <Grid
        cellComponent={GridCellComponent}
        cellProps={{
          blockedVals,
          updateCellVal,
          cellsPerBlock,
          columnIndex: undefined as never, //for TS linting
          style: undefined as never,
        }}
        columnCount={blockedVals.length}
        rowCount={1}
        rowHeight="100%"
        columnWidth={200}
      ></Grid>
    </div>
  );
}
function GridCellComponent({
  columnIndex,
  blockedVals,
  updateCellVal,
  cellsPerBlock,
  style,
}: GridCellComponentProp) {
  console.log(JSON.stringify(style));
  return (
    <div style={style}>
      <div className="p-2">
        <MemBlock
          values={blockedVals[columnIndex]}
          index={columnIndex}
          updateMemCell={(nv, co) =>
            updateCellVal(nv, columnIndex * cellsPerBlock + co)
          }
        />
      </div>
    </div>
  );
}

function MemBlock({ index, values, updateMemCell }: MemBlockProps) {
  const submit = (
    e: KeyboardEvent<HTMLDivElement> | FocusEvent<HTMLDivElement, Element>,
    offset: number
  ) => {
    const val = Number(e.currentTarget.innerHTML.replace(/\D/g, ""));
    e.currentTarget.innerHTML = val.toString();
    updateMemCell(val, offset);
  };
  const onKeydown = (e: KeyboardEvent<HTMLDivElement>, offset: number) => {
    console.log(e);
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
          // <div key={i} contentEditable="plaintext-only" suppressContentEditableWarning className="min-w-[3ch]" onInput={}>

          // </div>
          <div key={i}>
            <div
              contentEditable="plaintext-only"
              suppressContentEditableWarning
              className="mi-w-[3ch]"
              onBlur={(e) => submit(e, i)}
              onKeyDown={(e) => onKeydown(e, i)}
            >
              {values[i]}
            </div>
            {/* <input
              className="appearance-none min-w-[3ch] border-none p-0 m-0 focus:outline-none bg-emerald-700"
              value={v}
              onChange={(e) => onChange(e, i)}
              onKeyDown={(e) => onKeydown(e, i)}
              type="text"
              inputMode="numeric"
            /> */}
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
