import { i18n } from "@/config/i18n";
import { IBagGeneratorNode, INodeService } from "@/config/types";

const TOTAL_DATA_VALUE = 10000;

export const BagGeneratorService: INodeService<IBagGeneratorNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "bagGenerator",
      data: {
        name: i18n.t("nodeShortName.bagGenerator"),
        status: "IDLE",
        balls: ["red", "blue"],
      },
    };
  },

  run(flow, node) {
    try {
      const resultState = generateRandomData(node.data.balls);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function generateRandomData(balls: string[]) {
  let result: string[] = [];
  for (let i = 0; i < TOTAL_DATA_VALUE; i++) {
    const randomIndex = Math.floor(Math.random() * balls.length);
    result.push(balls[randomIndex]);
  }
  return result;
}
