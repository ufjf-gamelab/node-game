import { Edge, Node, ReactFlowInstance } from "@xyflow/react";

export type INodeType =
  | "diceGenerator"
  | "histogram"
  | "diceSum"
  | "dicePool"
  | "dicePoolSum"
  | "diceSuccess"
  | "diceBetweenInterval"
  | "diceCountRepetition"
  | "diceExplodeGenerator"
  | "bagGenerator"
  | "bagPullWithoutRepetition"
  | "symbolicGenerator"
  | "symbolicPool";

export type INodeStatus = "IDLE" | "FINISHED" | "ERROR" | "MISSING_DATA" | "LOADING";
export type IEdge = Edge;
export type IFlowInstance = ReactFlowInstance<INode, IEdge>;

type IBaseNode<NodeData extends Record<string, unknown> = Record<string, unknown>, NodeType extends INodeType = INodeType> = Node<
  NodeData,
  NodeType
> & {
  type: INodeType;
  data: {
    name: string;
    status: INodeStatus;
    detailsTitle: string;
  };
};

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
    state: number[];
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

export type IDiceBetweenIntervalNode = IBaseNode<
  {
    min: number;
    max: number;
    state: number[];
  },
  "diceBetweenInterval"
>;

export type IDiceCountRepetitionNode = IBaseNode<
  {
    face: number;
    state: number[];
  },
  "diceCountRepetition"
>;

export type IDiceExplodeGeneratorNode = IBaseNode<
  {
    explodeFace: number;
    maxFace: number;
    state: number[];
  },
  "diceExplodeGenerator"
>;

export type IBagGeneratorNode = IBaseNode<
  {
    state: number[];
    balls: string[];
  },
  "bagGenerator"
>;

export type IBagPullWithoutRepetitionNode = IBaseNode<
  {
    state: number[];
    balls: string[];
  },
  "bagPullWithoutRepetition"
>;

export type ISymbolicGeneratorNode = IBaseNode<
  {
    state: string[];
    faces: string[];
  },
  "symbolicGenerator"
>;

export type ISymbolicPoolNode = IBaseNode<
  {
    state: string[][];
  },
  "symbolicPool"
>;

export type INode =
  | IDiceGeneratorNode
  | IHistogramNode
  | IDiceSumNode
  | IDicePoolNode
  | IDicePoolSumNode
  | IDiceSuccessNode
  | IDiceBetweenIntervalNode
  | IDiceCountRepetitionNode
  | IDiceExplodeGeneratorNode
  | IBagGeneratorNode
  | IBagPullWithoutRepetitionNode
  | ISymbolicGeneratorNode
  | ISymbolicPoolNode;

export type INodeService<N extends INode> = {
  new: (flow: ReactFlowInstance<INode, IEdge>, defaultValue: Pick<N, "id" | "position">) => N;
  run: (flow: ReactFlowInstance<INode, IEdge>, node: N) => void;
};
