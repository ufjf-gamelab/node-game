import { DiceGeneratorService } from "@/features/dice-generator";
import { ReactFlowInstance } from "@xyflow/react";
import { HistogramService } from "@/features/histogram";
import { DiceSumService } from "@/features/dice-sum";
import { DicePoolService } from "@/features/dice-pool";
import { DicePoolSumService } from "@/features/dice-pool-sum";
import { DiceSuccessService } from "@/features/dice-success";
import { DiceBetweenIntervalService } from "@/features/dice-between-interval";
import { DiceCountRepetitionService } from "@/features/dice-count-repetition";
import { DiceExplodeGeneratorService } from "@/features/dice-explode-generator";
import { BagGeneratorService } from "@/features/bag-generator";
import { generateHash } from "./generate-hash";
import { IEdge, INode, INodeType } from "@/config/types";

export function nodeFactory(type: INodeType, flow: ReactFlowInstance<INode, IEdge>): INode {
  const nodes = flow.getNodes();

  const defaultDefinitions = {
    id: generateHash(),
    position: getAdjustedPosition(flow, nodes),
  };

  switch (type) {
    case "diceGenerator":
      return { ...DiceGeneratorService.new(nodes), ...defaultDefinitions };
    case "histogram":
      return { ...HistogramService.new(nodes), ...defaultDefinitions };
    case "diceSum":
      return { ...DiceSumService.new(nodes), ...defaultDefinitions };
    case "dicePool":
      return { ...DicePoolService.new(nodes), ...defaultDefinitions };
    case "dicePoolSum":
      return { ...DicePoolSumService.new(nodes), ...defaultDefinitions };
    case "diceSuccess":
      return { ...DiceSuccessService.new(nodes), ...defaultDefinitions };
    case "diceBetweenInterval":
      return { ...DiceBetweenIntervalService.new(nodes), ...defaultDefinitions };
    case "diceCountRepetition":
      return { ...DiceCountRepetitionService.new(nodes), ...defaultDefinitions };
    case "diceExplodeGenerator":
      return DiceExplodeGeneratorService.new(nodes);
    case "bagGenerator":
      return BagGeneratorService.new(flow, defaultDefinitions);

    default:
      throw new Error("Node factory: Invalid node type!");
  }
}

function getAdjustedPosition(reactFlowInstance: ReactFlowInstance<INode, IEdge>, nodes: INode[], offset: number = 10): { x: number; y: number } {
  const { x, y, zoom } = reactFlowInstance.getViewport();
  const containerCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  let adjustedPosition = { x: (containerCenter.x - x) / zoom, y: (containerCenter.y - y) / zoom - 50 };
  while (nodes.some((node) => node.position.x === adjustedPosition.x && node.position.y === adjustedPosition.y)) {
    adjustedPosition = { x: adjustedPosition.x + offset, y: adjustedPosition.y + offset };
  }

  return adjustedPosition;
}
