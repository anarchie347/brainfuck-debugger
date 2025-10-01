export interface CodeSnippet {
  name: string;
  code: string;
}

export interface BFState {
  memtape: number[];
  memptr: number;
}
