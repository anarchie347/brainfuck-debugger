import { Segment } from "./Segment";

export function IOBuffers() {
  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <Segment>
          <div className="w-full text-center white text-white text-4xl">
            IN Buffer
          </div>
          <input className="w-full bg-gradient-to-br from-cyan-200 to-blue-300 align-top text-2xl" />
        </Segment>
      </div>
      <div className="flex-1">
        <Segment>
          <div className="w-full text-center white text-white text-4xl">
            OUT Buffer
          </div>
          <input
            className="w-full bg-gradient-to-br from-cyan-200 to-blue-300 align-top text-2xl"
            disabled
            defaultValue={"HELLO"}
          />
        </Segment>
      </div>
    </div>
  );
}

export interface IOBuffersProps {
  copyTnToOut: boolean;
}
