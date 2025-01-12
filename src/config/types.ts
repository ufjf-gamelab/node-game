import { Edge, Node, ReactFlowInstance } from "@xyflow/react";

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

type INodeStateMap = {
  diceGenerator: number[];
  histogram: (number | string)[];
  diceSum: number[];
  dicePool: number[][];
  dicePoolSum: number[];
  diceSuccess: number[];
  diceBetweenInterval: number[];
  diceCountRepetition: number[];
  diceExplodeGenerator: number[];
  bagGenerator: number[];
  bagPullWithoutRepetition: string[];
  symbolicGenerator: string[];
  symbolicPool: string[][];
};

export type INodeType = keyof INodeStateMap;
export type INodeState<N extends INode> = N extends { type: infer T } ? (T extends INodeType ? INodeStateMap[T] : never) : never;

export type INodeStatus = "IDLE" | "FINISHED" | "ERROR" | "MISSING_DATA" | "LOADING";
export type IEdge = Edge;
export type IFlowInstance = ReactFlowInstance<INode, IEdge>;

export type INodeService<N extends INode> = {
  new: (flow: ReactFlowInstance<INode, IEdge>, defaultValue: Pick<N, "id" | "position">) => N;
  run: (flow: ReactFlowInstance<INode, IEdge>, node: N) => INodeState<N>;
};

type IBaseNode<NodeData extends Record<string, unknown> = Record<string, unknown>, NodeType extends INodeType = INodeType> = Node<
  NodeData,
  NodeType
> & {
  type: INodeType;
  data: {
    name: string;
    status: INodeStatus;
    detailsTitle: string;
    errorMessage?: string;
  };
};

export type IDiceGeneratorNode = IBaseNode<{ min: number; max: number }, "diceGenerator">;
export type IHistogramNode = IBaseNode<{ name: string; status: INodeStatus; parentNodeType: INodeType | "" }, "histogram">;
export type IDiceSumNode = IBaseNode<{}, "diceSum">;
export type IDicePoolNode = IBaseNode<{}, "dicePool">;
export type IDicePoolSumNode = IBaseNode<{}, "dicePoolSum">;
export type IDiceSuccessNode = IBaseNode<{ face: number }, "diceSuccess">;
export type IDiceBetweenIntervalNode = IBaseNode<{ min: number; max: number }, "diceBetweenInterval">;
export type IDiceCountRepetitionNode = IBaseNode<{ face: number }, "diceCountRepetition">;
export type IDiceExplodeGeneratorNode = IBaseNode<{ explodeFace: number; maxFace: number }, "diceExplodeGenerator">;
export type IBagGeneratorNode = IBaseNode<{ balls: string[] }, "bagGenerator">;
export type IBagPullWithoutRepetitionNode = IBaseNode<{ balls: string[] }, "bagPullWithoutRepetition">;
export type ISymbolicGeneratorNode = IBaseNode<{ faces: string[] }, "symbolicGenerator">;
export type ISymbolicPoolNode = IBaseNode<{}, "symbolicPool">;
