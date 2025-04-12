import { DiceExplodeGeneratorProperties } from "./properties";
import { DiceExplodeGeneratorNode } from "./node";
import { DiceExplodeGeneratorService } from "./service";

export const DiceExplodeGenerator = {
  component: DiceExplodeGeneratorNode,
  service: DiceExplodeGeneratorService,
  properties: DiceExplodeGeneratorProperties,
};
