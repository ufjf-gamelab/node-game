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
        inputType: "symbolic",
        outputType: "symbolicPool",
      },
    };
  },

  run(flow, node) {
    try {
      const nodeEdges = flow.getEdges().filter((edge) => edge.target === node.id);
      if (nodeEdges.length !== 2) throw new Error("Invalid connection!");

      const sourceNode1 = flow.getNode(nodeEdges[0].source) as ISymbolicGeneratorNode | undefined;
      const sourceNode2 = flow.getNode(nodeEdges[1].source) as ISymbolicGeneratorNode | undefined;
      if (!sourceNode1 || !sourceNode2) throw new Error("Source connection not found!");

      const sourceState1 = NodeManager.run(sourceNode1, flow);
      const sourceState2 = NodeManager.run(sourceNode2, flow);
      const resultState = poolSymbolicNodes(sourceState1, sourceState2);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

export function poolSymbolicNodes(input1: string[], input2: string[]) {
  let result: string[][] = [];

  for (let i = 0; i < input1.length; i++) {
    const dado1 = input1[i];
    const dado2 = input2[i];

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
