import { DiceGeneratorProperties } from "./properties";
import { DiceGeneratorNode } from "./node";
import { DiceGeneratorService } from "./service";

export const DiceGenerator = {
  component: DiceGeneratorNode,
  service: DiceGeneratorService,
  properties: DiceGeneratorProperties,
};
