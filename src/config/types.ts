import { Edge, Node } from "@xyflow/react";

export type INodeType =
  | "diceGenerator"
  | "histogram"
  | "diceSum"
  | "dicePool"
  | "dicePoolSum"
  | "diceSuccess"
  | "diceBetweenInterval"
  | "diceCountRepetition"
  | "diceExplodeGenerator";

export type INodeStatus = "IDLE" | "FINISHED" | "ERROR" | "MISSING_DATA" | "LOADING";
export type IEdge = Edge;

type IBaseNodeData = {
  name: string;
  status: INodeStatus;
  detailsTitle: string;
};

type IBaseNode<NodeData extends Record<string, unknown> = Record<string, unknown>, NodeType extends INodeType = INodeType> = Node<
  NodeData,
  NodeType
> & { data: IBaseNodeData };

export type IDiceGeneratorNode = IBaseNode<
  {
    min: number;
    max: number;
    state: number[];
  },
  "diceGenerator"
>;

export type IHistogramNode = IBaseNode<
  {
    name: string;
    status: INodeStatus;
  },
  "histogram"
>;

export type IDiceSumNode = IBaseNode<{}, "diceSum">;

export type IDicePoolNode = IBaseNode<
  {
    state: number[][];
  },
  "dicePool"
>;

export type IDicePoolSumNode = IBaseNode<
  {
    state: number[][];
  },
  "dicePoolSum"
>;

export type IDiceSuccessNode = IBaseNode<
  {
    face: number;
    state: number[];
  },
  "diceSuccess"
>;

export type IDiceBetweenInterval = IBaseNode<
  {
    min: number;
    max: number;
    state: number[];
  },
  "diceBetweenInterval"
>;

export type IDiceCountRepetition = IBaseNode<
  {
    face: number;
    state: number[];
  },
  "diceCountRepetition"
>;

export type IDiceExplodeGenerator = IBaseNode<
  {
    explodeFace: number;
    maxFace: number;
    state: number[];
  },
  "diceExplodeGenerator"
>;

export type INode =
  | IDiceGeneratorNode
  | IHistogramNode
  | IDiceSumNode
  | IDicePoolNode
  | IDicePoolSumNode
  | IDiceSuccessNode
  | IDiceBetweenInterval
  | IDiceCountRepetition
  | IDiceExplodeGenerator;
