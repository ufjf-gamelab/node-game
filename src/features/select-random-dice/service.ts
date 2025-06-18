import { i18n } from "@/config/i18n";
import { ISelectRandomDiceNode, INodeService } from "@/config/types";
import { NodeManager } from "@/utils/node-manager";

const TOTAL_DATA_VALUE = 10000;

export const SelectRandomDiceService: INodeService<ISelectRandomDiceNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "selectRandomDice",
      data: {
        name: i18n.t("nodeShortName.selectRandomDice"),
        status: "IDLE",
        inputType: "numericPool",
        outputType: "numeric",
      },
    };
  },

  run(flow, node) {
    try {
      const edge = flow.getEdges().find((edge) => edge.target === node.id);
      if (!edge) throw new Error("Connection not found!");

      const sourceNode = flow.getNode(edge.source);
      if (!sourceNode) throw new Error("Source connection not found!");

      const sourceState = NodeManager.run(sourceNode, flow) as number[][];
      const resultState = getRandomFlattenData(sourceState);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function getRandomFlattenData(data: number[][]) {
  const result: number[] = [];

  for (let i = 0; i < TOTAL_DATA_VALUE; i++) {
    result[i] = data[i][Math.floor(Math.random() * data[i].length)];
  }
  return result;
}
