import { Edge, Node, ReactFlowInstance } from "@xyflow/react";

export type IChartData = { label: string | number; value: number }[];
export type IChart = { id: string; name: string; data: IChartData };

export type INodeStateMap = {
  diceGenerator: number[];
  histogram: IChartData;
  dicePool: number[][];
  dicePoolSum: number[];
  diceSuccess: number[];
  diceBetweenInterval: number[];
  diceCountRepetition: number[];
  diceExplode: number[];
  bagGenerator: string[];
  bagPullWithoutRepetition: string[];
  symbolicGenerator: string[];
  symbolicPool: string[][];
  diceMath: number[];
  diceAbsolute: number[];
  diceLogical: number[];
  valueIsEven: number[];
  valueIsOdd: number[];
  integerValue: number[];
  andLogical: number[];
  orLogical: number[];
  selectRandomDice: number[];
  selectRandomSymbol: string[];
  mergeDicePools: number[][];
};

export type INodeType = keyof INodeStateMap;
export type INodeState<N extends INode> = N extends { type: infer T } ? (T extends INodeType ? INodeStateMap[T] : never) : never;
export type INodeStateType = "numeric" | "symbolic" | "boolean" | "numericPool" | "symbolicPool" | "any";
export type INodeStatus = "IDLE" | "FINISHED" | "ERROR" | "MISSING_DATA" | "LOADING";
export type IEdge = Edge;
export type IFlowInstance = ReactFlowInstance<INode, IEdge>;
export type IDiceMathOperation = "sum" | "subtract" | "multiply" | "divide (floor)" | "divide (ceil)";
export type IDiceLogicalOperation = "A >= B" | "A <= B" | "A = B";
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
    errorMessage?: string;
    inputType?: INodeStateType;
    outputType?: INodeStateType;
  };
};

export type IDiceGeneratorNode = IBaseNode<{ min: number; max: number }, "diceGenerator">;
export type IHistogramNode = IBaseNode<{ sortDirection: "asc" | "desc" }, "histogram">;
export type IDicePoolNode = IBaseNode<{}, "dicePool">;
export type IDicePoolSumNode = IBaseNode<{}, "dicePoolSum">;
export type IDiceSuccessNode = IBaseNode<{ face: number }, "diceSuccess">;
export type IDiceBetweenIntervalNode = IBaseNode<{ min: number; max: number }, "diceBetweenInterval">;
export type IDiceCountRepetitionNode = IBaseNode<{ face: number }, "diceCountRepetition">;
export type IDiceExplodeNode = IBaseNode<{ explodeFace: number }, "diceExplode">;
export type IBagGeneratorNode = IBaseNode<{ balls: string[] }, "bagGenerator">;
export type IBagPullWithoutRepetitionNode = IBaseNode<{}, "bagPullWithoutRepetition">;
export type ISymbolicGeneratorNode = IBaseNode<{ faces: string[] }, "symbolicGenerator">;
export type ISymbolicPoolNode = IBaseNode<{}, "symbolicPool">;
export type IDiceAbsoluteNode = IBaseNode<{}, "diceAbsolute">;
export type IDiceMathNode = IBaseNode<{ operation: IDiceMathOperation }, "diceMath">;
export type IDiceLogicalNode = IBaseNode<{ operation: IDiceLogicalOperation }, "diceLogical">;
export type IValueIsEvenNode = IBaseNode<{}, "valueIsEven">;
export type IValueIsOddNode = IBaseNode<{}, "valueIsOdd">;
export type IIntegerValueNode = IBaseNode<{ value: number }, "integerValue">;
export type IAndLogicalNode = IBaseNode<{}, "andLogical">;
export type IOrLogicalNode = IBaseNode<{}, "orLogical">;
export type ISelectRandomDiceNode = IBaseNode<{}, "selectRandomDice">;
export type ISelectRandomSymbolNode = IBaseNode<{}, "selectRandomSymbol">;
export type IMergeDicePoolsNode = IBaseNode<{}, "mergeDicePools">;

export type INode =
  | IDiceGeneratorNode
  | IHistogramNode
  | IDicePoolNode
  | IDicePoolSumNode
  | IDiceSuccessNode
  | IDiceBetweenIntervalNode
  | IDiceCountRepetitionNode
  | IDiceExplodeNode
  | IBagGeneratorNode
  | IBagPullWithoutRepetitionNode
  | ISymbolicGeneratorNode
  | ISymbolicPoolNode
  | IDiceMathNode
  | IDiceAbsoluteNode
  | IDiceLogicalNode
  | IValueIsEvenNode
  | IValueIsOddNode
  | IIntegerValueNode
  | IAndLogicalNode
  | IOrLogicalNode
  | ISelectRandomDiceNode
  | ISelectRandomSymbolNode
  | IMergeDicePoolsNode;
