import { SymbolicGeneratorProperties } from "./properties";
import { SymbolicGeneratorNode } from "./node";
import { SymbolicGeneratorService } from "./service";

export const SymbolicGenerator = {
  component: SymbolicGeneratorNode,
  service: SymbolicGeneratorService,
  properties: SymbolicGeneratorProperties,
};
