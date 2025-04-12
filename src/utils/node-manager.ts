import { generateHash } from "./generate-hash";
import { IFlowInstance, INode, INodeState, INodeType } from "@/config/types";
import { DiceGenerator } from "@/features/dice-generator";
import { Histogram } from "@/features/histogram";
import { DicePool } from "@/features/dice-pool";
import { DicePoolSum } from "@/features/dice-pool-sum";
import { DiceSuccess } from "@/features/dice-success";
import { DiceBetweenInterval } from "@/features/dice-between-interval";
import { DiceCountRepetition } from "@/features/dice-count-repetition";
import { DiceExplodeGenerator } from "@/features/dice-explode-generator";
import { BagGenerator } from "@/features/bag-generator";
import { BagPullWithoutRepetition } from "@/features/bag-pull-without-repetition";
import { SymbolicGenerator } from "@/features/symbolic-generator";
import { SymbolicPool } from "@/features/symbolic-pool";
import { DiceMath } from "@/features/dice-math";
import { DiceAbsolute } from "@/features/dice-absolute";
import { DiceLogical } from "@/features/dice-logical";
import { ValueIsEven } from "@/features/value-is-even";
import { ValueIsOdd } from "@/features/value-is-odd";

const NODE_MODULES = {
  diceGenerator: DiceGenerator,
  histogram: Histogram,
  dicePool: DicePool,
  dicePoolSum: DicePoolSum,
  diceSuccess: DiceSuccess,
  diceBetweenInterval: DiceBetweenInterval,
  diceCountRepetition: DiceCountRepetition,
  diceExplodeGenerator: DiceExplodeGenerator,
  bagGenerator: BagGenerator,
  bagPullWithoutRepetition: BagPullWithoutRepetition,
  symbolicGenerator: SymbolicGenerator,
  symbolicPool: SymbolicPool,
  diceMath: DiceMath,
  diceAbsolute: DiceAbsolute,
  diceLogical: DiceLogical,
  valueIsEven: ValueIsEven,
  valueIsOdd: ValueIsOdd,
} as const;

export const NodeManager = {
  new(type: INodeType, flow: IFlowInstance): INode {
    const defaultDefinitions = {
      id: generateHash(),
      position: getAdjustedPosition(flow),
    };

    const service = NODE_MODULES[type].service;
    if (!service) throw new Error(`Node type ${type} not registered`);
    return service.new(flow, defaultDefinitions);
  },

  run<N extends INode>(node: N, flow: IFlowInstance): INodeState<N> {
    const service = NODE_MODULES[node.type].service;
    if (!service) throw new Error(`Node type ${node.type} not registered`);
    return service.run(flow, node as any) as INodeState<N>;
  },

  getDetails(node: INode) {
    return NODE_MODULES[node.type].details;
  },

  getNodeTypes(): Record<INodeType, React.ComponentType<any>> {
    return Object.entries(NODE_MODULES).reduce((acc, [key, value]) => {
      acc[key as INodeType] = value.component;
      return acc;
    }, {} as Record<INodeType, React.ComponentType<any>>);
  },
};

function getAdjustedPosition(flow: IFlowInstance, offset: number = 10): { x: number; y: number } {
  const { x, y, zoom } = flow.getViewport();
  const containerCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  let adjustedPosition = { x: (containerCenter.x - x) / zoom, y: (containerCenter.y - y) / zoom - 50 };
  while (flow.getNodes().some((node) => node.position.x === adjustedPosition.x && node.position.y === adjustedPosition.y)) {
    adjustedPosition = { x: adjustedPosition.x + offset, y: adjustedPosition.y + offset };
  }

  return adjustedPosition;
}
