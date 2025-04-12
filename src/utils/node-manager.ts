import { generateHash } from "./generate-hash";
import { IFlowInstance, INode, INodeState, INodeType } from "@/config/types";
import { DiceGeneratorService, DiceGeneratorNode } from "@/features/dice-generator";
import { HistogramNode, HistogramService } from "@/features/histogram";
import { DicePoolNode, DicePoolService } from "@/features/dice-pool";
import { DicePoolSumNode, DicePoolSumService } from "@/features/dice-pool-sum";
import { DiceSuccessNode, DiceSuccessService } from "@/features/dice-success";
import { DiceBetweenIntervalNode, DiceBetweenIntervalService } from "@/features/dice-between-interval";
import { DiceCountRepetitionNode, DiceCountRepetitionService } from "@/features/dice-count-repetition";
import { DiceExplodeGeneratorNode, DiceExplodeGeneratorService } from "@/features/dice-explode-generator";
import { BagGeneratorNode, BagGeneratorService } from "@/features/bag-generator";
import { BagGeneratorWithoutRepetitionService, BagPullWithoutRepetitionNode } from "@/features/bag-pull-without-repetition";
import { SymbolicGeneratorNode, SymbolicGeneratorService } from "@/features/symbolic-generator";
import { SymbolicPoolNode, SymbolicPoolService } from "@/features/symbolic-pool";
import { DiceMathNode, DiceMathService } from "@/features/dice-math";
import { DiceAbsoluteNode, DiceAbsoluteService } from "@/features/dice-absolute";
import { DiceLogicalNode, DiceLogicalService } from "@/features/dice-logical";
import { ValueIsEvenNode, ValueIsEvenService } from "@/features/value-is-even";

export const NODE_TYPES: Record<INodeType, React.ComponentType<any>> = {
  diceGenerator: DiceGeneratorNode,
  histogram: HistogramNode,
  dicePool: DicePoolNode,
  dicePoolSum: DicePoolSumNode,
  diceSuccess: DiceSuccessNode,
  diceBetweenInterval: DiceBetweenIntervalNode,
  diceCountRepetition: DiceCountRepetitionNode,
  diceExplodeGenerator: DiceExplodeGeneratorNode,
  bagGenerator: BagGeneratorNode,
  bagPullWithoutRepetition: BagPullWithoutRepetitionNode,
  symbolicGenerator: SymbolicGeneratorNode,
  symbolicPool: SymbolicPoolNode,
  diceMath: DiceMathNode,
  diceAbsolute: DiceAbsoluteNode,
  diceLogical: DiceLogicalNode,
  valueIsEven: ValueIsEvenNode,
};

export const NodeManager = {
  new(type: INodeType, flow: IFlowInstance): INode {
    const defaultDefinitions = {
      id: generateHash(),
      position: getAdjustedPosition(flow),
    };

    switch (type) {
      case "diceGenerator":
        return DiceGeneratorService.new(flow, defaultDefinitions);
      case "histogram":
        return HistogramService.new(flow, defaultDefinitions);
      case "dicePool":
        return DicePoolService.new(flow, defaultDefinitions);
      case "dicePoolSum":
        return DicePoolSumService.new(flow, defaultDefinitions);
      case "diceSuccess":
        return DiceSuccessService.new(flow, defaultDefinitions);
      case "diceBetweenInterval":
        return DiceBetweenIntervalService.new(flow, defaultDefinitions);
      case "diceCountRepetition":
        return DiceCountRepetitionService.new(flow, defaultDefinitions);
      case "diceExplodeGenerator":
        return DiceExplodeGeneratorService.new(flow, defaultDefinitions);
      case "bagGenerator":
        return BagGeneratorService.new(flow, defaultDefinitions);
      case "bagPullWithoutRepetition":
        return BagGeneratorWithoutRepetitionService.new(flow, defaultDefinitions);
      case "symbolicGenerator":
        return SymbolicGeneratorService.new(flow, defaultDefinitions);
      case "symbolicPool":
        return SymbolicPoolService.new(flow, defaultDefinitions);
      case "diceMath":
        return DiceMathService.new(flow, defaultDefinitions);
      case "diceAbsolute":
        return DiceAbsoluteService.new(flow, defaultDefinitions);
      case "diceLogical":
        return DiceLogicalService.new(flow, defaultDefinitions);
      case "valueIsEven":
        return ValueIsEvenService.new(flow, defaultDefinitions);

      default:
        throw new Error("Node creation: Invalid node type!");
    }
  },

  run<N extends INode>(node: N, flow: IFlowInstance): INodeState<N> {
    switch (node.type) {
      case "diceGenerator":
        return DiceGeneratorService.run(flow, node) as INodeState<N>;
      case "histogram":
        return HistogramService.run(flow, node) as INodeState<N>;
      case "dicePool":
        return DicePoolService.run(flow, node) as INodeState<N>;
      case "dicePoolSum":
        return DicePoolSumService.run(flow, node) as INodeState<N>;
      case "diceSuccess":
        return DiceSuccessService.run(flow, node) as INodeState<N>;
      case "diceBetweenInterval":
        return DiceBetweenIntervalService.run(flow, node) as INodeState<N>;
      case "diceCountRepetition":
        return DiceCountRepetitionService.run(flow, node) as INodeState<N>;
      case "diceExplodeGenerator":
        return DiceExplodeGeneratorService.run(flow, node) as INodeState<N>;
      case "bagGenerator":
        return BagGeneratorService.run(flow, node) as INodeState<N>;
      case "bagPullWithoutRepetition":
        return BagGeneratorWithoutRepetitionService.run(flow, node) as INodeState<N>;
      case "symbolicGenerator":
        return SymbolicGeneratorService.run(flow, node) as INodeState<N>;
      case "symbolicPool":
        return SymbolicPoolService.run(flow, node) as INodeState<N>;
      case "diceMath":
        return DiceMathService.run(flow, node) as INodeState<N>;
      case "diceAbsolute":
        return DiceAbsoluteService.run(flow, node) as INodeState<N>;
      case "diceLogical":
        return DiceLogicalService.run(flow, node) as INodeState<N>;
      case "valueIsEven":
        return ValueIsEvenService.run(flow, node) as INodeState<N>;

      default:
        throw new Error("Node factory run: Invalid node type!");
    }
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
