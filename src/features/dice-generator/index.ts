import { DiceGeneratorDetails } from "./details";
import { DiceGeneratorNode } from "./node";
import { DiceGeneratorService } from "./service";

export const DiceGenerator = {
  component: DiceGeneratorNode,
  service: DiceGeneratorService,
  details: DiceGeneratorDetails,
};
