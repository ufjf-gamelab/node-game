import { BagGeneratorProperties } from "./properties";
import { BagGeneratorNode } from "./node";
import { BagGeneratorService } from "./service";

export const BagGenerator = {
  component: BagGeneratorNode,
  service: BagGeneratorService,
  properties: BagGeneratorProperties,
};
