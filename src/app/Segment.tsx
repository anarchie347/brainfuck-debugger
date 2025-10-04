import { ReactNode } from "react";

export function Segment({ children }: SegmentProps) {
  return (
    <div className="p-2 bg-gray-800 rounded-xl border-2 border-cyan-800">
      {children}
    </div>
  );
}

export interface SegmentProps {
  children: ReactNode;
}
