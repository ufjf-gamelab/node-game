import { DiceGeneratorService } from "@/features/dice-generator";
import { HistogramService } from "@/features/histogram";
import { DiceSumService } from "@/features/dice-sum";
import { DicePoolService } from "@/features/dice-pool";
import { DicePoolSumService } from "@/features/dice-pool-sum";
import { DiceSuccessService } from "@/features/dice-success";
import { DiceBetweenIntervalService } from "@/features/dice-between-interval";
import { DiceCountRepetitionService } from "@/features/dice-count-repetition";
import { DiceExplodeGeneratorService } from "@/features/dice-explode-generator";
import { BagGeneratorService } from "@/features/bag-generator";
import { BagGeneratorWithoutRepetitionService } from "@/features/bag-generator-without-repetition";
import { generateHash } from "./generate-hash";
import { IFlowInstance, INode, INodeType } from "@/config/types";
import { SymbolicGeneratorService } from "@/features/symbolic-generator";

export function nodeFactory(type: INodeType, flow: IFlowInstance): INode {
  const defaultDefinitions = {
    id: generateHash(),
    position: getAdjustedPosition(flow),
  };

  switch (type) {
    case "diceGenerator":
      return DiceGeneratorService.new(flow, defaultDefinitions);
    case "histogram":
      return HistogramService.new(flow, defaultDefinitions);
    case "diceSum":
      return DiceSumService.new(flow, defaultDefinitions);
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
    case "bagGeneratorWithoutRepetition":
      return BagGeneratorWithoutRepetitionService.new(flow, defaultDefinitions);
    case "symbolicGenerator":
      return SymbolicGeneratorService.new(flow, defaultDefinitions);

    default:
      throw new Error("Node factory: Invalid node type!");
  }
}

function getAdjustedPosition(flow: IFlowInstance, offset: number = 10): { x: number; y: number } {
  const { x, y, zoom } = flow.getViewport();
  const containerCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  let adjustedPosition = { x: (containerCenter.x - x) / zoom, y: (containerCenter.y - y) / zoom - 50 };
  while (flow.getNodes().some((node) => node.position.x === adjustedPosition.x && node.position.y === adjustedPosition.y)) {
    adjustedPosition = { x: adjustedPosition.x + offset, y: adjustedPosition.y + offset };
  }

  return adjustedPosition;
}
