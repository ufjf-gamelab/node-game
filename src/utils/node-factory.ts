import { DiceGeneratorService } from "@/features/dice-generator";
import { DiceSumService } from "@/features/dice-sum";
import { HistogramService } from "@/features/histogram";
import { DicePoolService } from "@/features/dice-pool";
import { IEdge, INode, INodeType } from "@/config/types";
import { DicePoolSumService } from "@/features/dice-pool-sum";
import { DiceSuccessService } from "@/features/dice-success";
import { DiceBetweenIntervalService } from "@/features/dice-between-interval";
import { DiceCountRepetitionService } from "@/features/dice-count-repetition";
import { DiceExplodeGeneratorService } from "@/features/dice-explode-generator";
import { BagGeneratorService } from "@/features/bag-generator";
import { generateHash } from "./generate-hash";
import { ReactFlowInstance } from "@xyflow/react";

export function nodeFactory(type: INodeType, flow: ReactFlowInstance<INode, IEdge>): INode {
  const nodes = flow.getNodes();

  const defaultDefinition = {
    id: generateHash(),
    position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },
  };

  switch (type) {
    case "diceGenerator":
      return DiceGeneratorService.new(nodes);
    case "histogram":
      return HistogramService.new(nodes);
    case "diceSum":
      return DiceSumService.new(nodes);
    case "dicePool":
      return DicePoolService.new(nodes);
    case "dicePoolSum":
      return DicePoolSumService.new(nodes);
    case "diceSuccess":
      return DiceSuccessService.new(nodes);
    case "diceBetweenInterval":
      return DiceBetweenIntervalService.new(nodes);
    case "diceCountRepetition":
      return DiceCountRepetitionService.new(nodes);
    case "diceExplodeGenerator":
      return DiceExplodeGeneratorService.new(nodes);
    case "bagGenerator":
      return BagGeneratorService.new(flow, defaultDefinition);

    default:
      throw new Error("Node factory: Invalid node type!");
  }
}
