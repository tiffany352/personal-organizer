// Required since it's not a publicly exposed type in markdown-it
export type Token = {
  attrGet: (name: string) => string | null;
  attrIndex: (name: string) => number;
  attrJoin: (name: string, value: string) => void;
  attrPush: (attrData: string[]) => void;
  attrSet: (name: string, value: string) => void;

  attrs: string[][];
  block: boolean;
  children: Token[];
  content: string;
  hidden: boolean;
  info: string;
  level: number;
  map: number[];
  markup: string;
  meta: any;
  nesting: number;
  tag: string;
  type: string;
}
