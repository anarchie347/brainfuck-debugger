import { Ref, useCallback, useImperativeHandle, useRef, useState } from "react";
import { Segment } from "./Segment";

export function IOBuffers({ ref, copyInToOut }: IOBuffersProps) {
  const [inContents, setInContents] = useState("");
  const inContentsRef = useRef(""); // See bottom for explanation
  const [outContnets, setOutContents] = useState("");

  // keep ref updated with any state change from either 'read' or use input
  inContentsRef.current = inContents;
  const write = useCallback(
    (chr: string) => {
      setOutContents((old) => old + chr);
    },
    [setOutContents]
  );
  const read = useCallback(() => {
    console.log(inContentsRef.current);
    const firstChar = inContentsRef.current[0];
    setInContents(inContentsRef.current.substring(1));
    if (copyInToOut) {
      write(firstChar);
    }
    return firstChar;
  }, [setInContents, copyInToOut, write, inContentsRef]);

  useImperativeHandle(ref, () => ({ write, read } satisfies IOBuffersHandle), [
    write,
    read,
  ]);

  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <Segment>
          <div className="w-full text-center white text-white text-4xl">
            IN Buffer
          </div>
          <input
            className="w-full bg-gradient-to-br from-cyan-200 to-blue-300 align-top text-2xl"
            onChange={(e) => setInContents(e.target.value)}
            value={inContents}
          />
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
            value={outContnets}
          />
        </Segment>
      </div>
    </div>
  );
}

export interface IOBuffersProps {
  ref: Ref<unknown>;
  copyInToOut: boolean;
}

export interface IOBuffersHandle {
  write: (chr: string) => void;
  read: () => string;
}

// InConentsRef explanation
/*
because the 'read' function is exposed through 'useImperativeHandle', changes to 'read' do not trigger a React Re-render
 for the parent.
 This means if that the value from refToIOBuffer.current.read would give an out of date function if the paretn has
 not re-rendered since the last change to 'read'
 The solution to this is 'useCallback' to cache the 'read' callback, meaning it never changes.
 Problem is 'read' inherently depends on the state 'inContents' so needs to change whenever inContents does.
 The solution to this is store the true value (used by 'read') in a useRef because then although the value of the in buffer changes,
 the object created by the ref is only mutated and is always the same object. This means the ref never changes,
 so will not cause a re-calculation of the useCallback which defines 'read'.
 The problem of the 'read' function being re-asssigned is especially paramount because calling 'read' mutates what 'read' will do

 'write' does not depend on any possibly-re-assigned values as it uses an anonymous update function to mutate the outCOntents buffer,
 so that is set once by useCallback and never changes.
 */
