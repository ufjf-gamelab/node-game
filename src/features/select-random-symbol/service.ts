import { i18n } from "@/config/i18n";
import { ISelectRandomSymbolNode, INodeService } from "@/config/types";
import { NodeManager } from "@/utils/node-manager";

const TOTAL_DATA_VALUE = 10000;

export const SelectRandomSymbolService: INodeService<ISelectRandomSymbolNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "selectRandomSymbol",
      data: {
        name: i18n.t("nodeShortName.selectRandomSymbol"),
        status: "IDLE",
        inputType: "symbolicPool",
        outputType: "symbolic",
      },
    };
  },

  run(flow, node) {
    try {
      const edge = flow.getEdges().find((edge) => edge.target === node.id);
      if (!edge) throw new Error("Connection not found!");

      const sourceNode = flow.getNode(edge.source);
      if (!sourceNode) throw new Error("Source connection not found!");

      const sourceState = NodeManager.run(sourceNode, flow) as string[][];
      const resultState = getRandomFlattenData(sourceState);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function getRandomFlattenData(data: string[][]) {
  const result: string[] = [];

  for (let i = 0; i < TOTAL_DATA_VALUE; i++) {
    result[i] = data[i][Math.floor(Math.random() * data[i].length)];
  }
  return result;
}
