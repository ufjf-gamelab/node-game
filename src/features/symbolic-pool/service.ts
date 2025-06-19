import { i18n } from "@/config/i18n";
import { ISymbolicPoolNode, INodeService, ISymbolicGeneratorNode } from "@/config/types";
import { NodeManager } from "@/utils/node-manager";

export const SymbolicPoolService: INodeService<ISymbolicPoolNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "symbolicPool",
      data: {
        name: i18n.t("nodeShortName.symbolicPool"),
        status: "IDLE",
        inputType: "symbolicGenerator",
        outputType: "symbolicPool",
        quantity: 2,
      },
    };
  },

  run(flow, node) {
    try {
      const edge = flow.getEdges().find((edge) => edge.target === node.id);
      if (!edge) throw new Error("Connection not found!");

      const sourceNode = flow.getNode(edge.source) as ISymbolicGeneratorNode | undefined;
      if (!sourceNode) throw new Error("Source connection not found!");

      const sourceState = NodeManager.run(sourceNode, flow);
      const resultState = getSymbolicPool(sourceState, node.data.quantity, sourceNode.data.faces);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

export function getSymbolicPool(input: string[], quantity: number, faces: string[]) {
  let result: string[][] = [];

  for (let i = 0; i < input.length; i++) {
    result[i] = [input[i]];

    for (let j = 0; j < quantity - 1; j++) {
      const randomValue = faces[Math.floor(Math.random() * faces.length)];
      result[i].push(randomValue);
    }
  }

  return result;
}
