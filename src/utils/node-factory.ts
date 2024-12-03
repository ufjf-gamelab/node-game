import { DiceGeneratorService } from "@/features/dice-generator";
import { DiceSumService } from "@/features/dice-sum";
import { HistogramService } from "@/features/histogram";
import { DicePoolService } from "@/features/dice-pool";
import { INode, INodeType } from "@/config/types";
import { DicePoolSumService } from "@/features/dice-pool-sum";
import { DiceSuccessService } from "@/features/dice-success";
import { DiceBetweenIntervalService } from "@/features/dice-between-interval";
import { DiceCountRepetitionService } from "@/features/dice-count-repetition";

export function nodeFactory(type: INodeType, nodes: INode[]): INode {
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

    default:
      throw new Error("Node factory: Invalid node type!");
  }
}
