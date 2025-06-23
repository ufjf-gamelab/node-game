import { i18n } from "@/config/i18n";
import { IBagGeneratorNode, INodeService } from "@/config/types";

export const BagGeneratorService: INodeService<IBagGeneratorNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "bagGenerator",
      data: {
        name: i18n.t("nodeShortName.bagGenerator"),
        status: "IDLE",
        balls: ["A", "B"],
        outputType: "symbolicGenerator",
      },
    };
  },

  run({ node, iterations }) {
    const resultState = generateRandomData(node.data.balls, iterations);
    return resultState;
  },
};

function generateRandomData(balls: string[], iterations: number) {
  let result: string[] = [];
  for (let i = 0; i < iterations; i++) {
    const randomIndex = Math.floor(Math.random() * balls.length);
    result.push(balls[randomIndex]);
  }
  return result;
}
