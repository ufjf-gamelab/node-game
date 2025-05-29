import { i18n } from "@/config/i18n";
import { IDiceExplodeGeneratorNode, INodeService } from "@/config/types";

const TOTAL_DATA_VALUE = 10000;

export const DiceExplodeGeneratorService: INodeService<IDiceExplodeGeneratorNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceExplodeGenerator",
      data: {
        name: i18n.t("nodeShortName.diceExplodeGenerator"),
        status: "IDLE",
        explodeFace: 1,
        maxFace: 6,
      },
    };
  },

  run(flow, node) {
    try {
      const resultState = explodeDice(node.data.maxFace, node.data.explodeFace, TOTAL_DATA_VALUE);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function explodeDice(maxFace: number, explodeFace: number, aN: number) {
  let lCount = 0;
  const result: number[] = [];

  for (let i = 0; i < aN; i++) {
    while (explodeFace === parseInt(Math.floor(Math.random() * (maxFace + 1 - 1) + 1).toString())) {
      lCount++;
    }

    result.push(lCount);
    lCount = 0;
  }

  return result;
}
