export async function interpret(
  source: string,
  memtape: number[],
  memptr: number,
  onInstrFinish: () => Promise<void>,
  writeChr: (chr: string) => void,
  readChr: () => Promise<string>,
  cellMaxVal: number
) {
  const loopIndexStack: number[] = [];
  let codeIndex: number = 0;

  while (codeIndex < source.length) {
    switch (source[codeIndex]) {
      case "+":
        memtape[memptr] = wrapAdd(memtape[memptr], cellMaxVal);
        break;
      case "-":
        memtape[memptr] = wrapSub(memtape[memptr], cellMaxVal);
        break;
      case ">":
        memptr++;
        if (memptr === memtape.length) {
          throw new Error("BF Error: memptr exceeded memtape len");
        }
        break;
      case "<":
        memptr--;
        if (memptr === -1) {
          throw new Error("BF Error: memptr negative");
        }
        break;
      case ".":
        writeChr(String.fromCharCode(memtape[memptr]));
        break;
      case ",":
        memtape[memptr] = (await readChr()).charCodeAt(0);
        break;
      case "[":
        if (memtape[memptr]) {
          loopIndexStack.push(codeIndex);
        } else {
          let openBracketCounter = 0;
          while (openBracketCounter >= 0) {
            codeIndex++;
            if (codeIndex === source.length) {
              throw new Error("BF Syntax Error: Missing close bracket");
            }
            if (source[codeIndex] == "[") {
              openBracketCounter++;
            } else if (source[codeIndex] == "]") {
              openBracketCounter--;
            }
          }
        }
        break;
      case "]":
        if (memtape[memptr]) {
          if (loopIndexStack.length === 0) {
            throw new Error("BF Syntax Error: Missing open bracket");
          }
          codeIndex = loopIndexStack[loopIndexStack.length - 1];
        } else {
          loopIndexStack.pop();
        }
        break;
    }
    await onInstrFinish();
    codeIndex++;
  }
}

function wrapAdd(v: number, max: number) {
  if (v === max) {
    return 0;
  }
  return v + 1;
}
function wrapSub(v: number, max: number) {
  if (v === 0) {
    return max;
  }
  return v - 1;
}
