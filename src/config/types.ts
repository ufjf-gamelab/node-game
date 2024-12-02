import { Node } from "@xyflow/react";

export type INodeType = "diceGenerator" | "histogram" | "diceSum" | "dicePool";
export type INodeStatus = "IDLE" | "FINISHED" | "ERROR" | "MISSING_DATA" | "LOADING";

type IBaseNode<NodeData extends Record<string, unknown> = Record<string, unknown>, NodeType extends INodeType = INodeType> = Node<
  NodeData,
  NodeType
> & { type: INodeType };

export type IDiceGeneratorNode = IBaseNode<
  { name: string; min: number; max: number; status: INodeStatus; generatedValues: number[] },
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
  },
  "dicePool"
>;

export type INode = IDiceGeneratorNode | IHistogramNode | IDiceSumNode | IDicePoolNode;
