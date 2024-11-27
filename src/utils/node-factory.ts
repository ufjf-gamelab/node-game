import { DiceGeneratorService } from "@/features/dice-generator";
import { DiceSumService } from "@/features/dice-sum";
import { HistogramService } from "@/features/histogram";
import { INode, INodeType } from "@/config/types";

export function nodeFactory(type: INodeType, nodes: INode[]): INode {
  switch (type) {
    case "diceGenerator":
      return DiceGeneratorService.new(nodes);
    case "histogram":
      return HistogramService.new(nodes);
    case "diceSum":
      return DiceSumService.new(nodes);

    default:
      throw new Error("Invalid node type!");
  }
}
