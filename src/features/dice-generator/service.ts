import { i18n } from "@/config/i18n";
import { IDiceGeneratorNode, INodeService } from "@/config/types";

export const DiceGeneratorService: INodeService<IDiceGeneratorNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceGenerator",
      data: {
        name: i18n.t("nodeShortName.diceGenerator"),
        status: "IDLE",
        min: 1,
        max: 6,
        state: [],
        outputType: "numericGenerator",
      },
    };
  },

  run({ node, iterations }) {
    const resultState = generateRandomData(node.data.min, node.data.max, iterations);
    return resultState;
  },
};

function generateRandomData(min: number, max: number, iterations: number) {
  const result: number[] = [];
  for (let i = 0; i < iterations; i++) {
    result.push(parseInt(Math.floor(Math.random() * (max + 1 - min) + min).toString()));
  }
  return result;
}
