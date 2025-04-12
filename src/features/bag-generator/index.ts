import { BagGeneratorDetails } from "./details";
import { BagGeneratorNode } from "./node";
import { BagGeneratorService } from "./service";

export const BagGenerator = {
  component: BagGeneratorNode,
  service: BagGeneratorService,
  details: BagGeneratorDetails,
};
