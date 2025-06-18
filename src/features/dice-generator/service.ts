import { i18n } from "@/config/i18n";
import { IDiceGeneratorNode, INodeService } from "@/config/types";

const TOTAL_DATA_VALUE = 10000;

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
        outputType: "numeric",
      },
    };
  },

  run(flow, node) {
    try {
      const resultState = generateRandomData(node.data.min, node.data.max, TOTAL_DATA_VALUE);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function generateRandomData(aMin: number, aMax: number, aN: number) {
  let lData: number[] = [];
  for (let i = 0; i < aN; i++) {
    lData.push(parseInt(Math.floor(Math.random() * (aMax + 1 - aMin) + aMin).toString()));
  }
  return lData;
}
