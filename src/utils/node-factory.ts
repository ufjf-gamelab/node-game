import { DiceGeneratorService } from "@/features/dice-generator";
import { DiceSumService } from "@/features/dice-sum";
import { HistogramService } from "@/features/histogram";
import { DicePoolService } from "@/features/dice-pool";
import { INode, INodeType } from "@/config/types";
import { DicePoolSumService } from "@/features/dice-pool-sum";
import { DiceSuccessService } from "@/features/dice-success";

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

    default:
      throw new Error("Invalid node type!");
  }
}
