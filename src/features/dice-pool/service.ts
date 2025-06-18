import { i18n } from "@/config/i18n";
import { IDicePoolNode, INodeService } from "@/config/types";
import { NodeManager } from "@/utils/node-manager";

export const DicePoolService: INodeService<IDicePoolNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "dicePool",
      data: {
        name: i18n.t("nodeShortName.dicePool"),
        status: "IDLE",
        inputType: "numeric",
        outputType: "numericPool",
      },
    };
  },

  run(flow, node) {
    try {
      const nodeEdges = flow.getEdges().filter((edge) => edge.target === node.id);
      if (nodeEdges.length !== 2) throw new Error("Invalid connection!");

      const sourceNode1 = flow.getNode(nodeEdges[0].source);
      const sourceNode2 = flow.getNode(nodeEdges[1].source);
      if (!sourceNode1 || !sourceNode2) throw new Error("Source connection not found!");

      const sourceState1 = NodeManager.run(sourceNode1, flow) as number[] | number[][];
      const sourceState2 = NodeManager.run(sourceNode2, flow) as number[] | number[][];
      const resultState = poolNodes(sourceState1, sourceState2);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

export function poolNodes(aInput1: number[] | number[][], aInput2: number[] | number[][]) {
  let result: number[][] = [];

  for (let i = 0; i < aInput1.length; i++) {
    const dado1 = aInput1[i];
    const dado2 = aInput2[i];

    result[i] = [];

    if (Array.isArray(dado1)) {
      result[i] = [...result[i], ...dado1];
    } else {
      result[i] = [...result[i], dado1];
    }

    if (Array.isArray(dado2)) {
      result[i] = [...result[i], ...dado2];
    } else {
      result[i] = [...result[i], dado2];
    }
  }

  return result;
}
