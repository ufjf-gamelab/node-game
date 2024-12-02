import { Edge, Node } from "@xyflow/react";

export type INodeType = "diceGenerator" | "histogram" | "diceSum" | "dicePool";
export type INodeStatus = "IDLE" | "FINISHED" | "ERROR" | "MISSING_DATA" | "LOADING";
export type IEdge = Edge;

type IBaseNode<NodeData extends Record<string, unknown> = Record<string, unknown>, NodeType extends INodeType = INodeType> = Node<
  NodeData,
  NodeType
> & { type: INodeType };

export type IDiceGeneratorNode = IBaseNode<
  {
    name: string;
    min: number;
    max: number;
    status: INodeStatus;
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

export type IDiceSumNode = IBaseNode<
  {
    name: string;
    status: INodeStatus;
  },
  "diceSum"
>;

export type IDicePoolNode = IBaseNode<
  {
    name: string;
    status: INodeStatus;
    state: number[][];
  },
  "dicePool"
>;

export type INode = IDiceGeneratorNode | IHistogramNode | IDiceSumNode | IDicePoolNode;
