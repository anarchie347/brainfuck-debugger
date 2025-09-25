export function MemtapeRowDisplay({
  memtape,
  blockDescription,
}: MemtapeRowDisplayProps) {
  const cellsPerBlock = blockDescription.length;
  const blocked = Array.from({
    length: Math.ceil(memtape.length / cellsPerBlock),
  }).map((_, i) => memtape.slice(i * cellsPerBlock, (i + 1) * cellsPerBlock));
  return (
    <div className="flex gap-2 overflow-x-auto p-2 bg-gray-800 rounded-xl border-2 border-cyan-800">
      {blocked.map((b, i) => (
        <div className="flex-none p-2" key={i}>
          <MemBlock values={b} index={i} />
        </div>
      ))}
    </div>
  );
}

function MemBlock({ index, values }: MemBlockProps) {
  return (
    <div>
      <div className="p-2 bg-gradient-to-br from-orange-300 to-amber-300 rounded-md text-center">
        {index}
      </div>
      <div className="h-1"></div>
      <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 text-center rounded-md">
        {values.map((v, i) => (
          <div key={i} className="min-w-[3ch]">
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}

export interface MemBlockProps {
  index: number;
  values: number[];
}

export interface MemtapeRowDisplayProps {
  memtape: number[];
  blockDescription: string[];
}
