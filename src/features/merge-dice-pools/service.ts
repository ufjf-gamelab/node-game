import { i18n } from "@/config/i18n";
import { IMergeDicePoolsNode, INodeService } from "@/config/types";
import { NodeManager } from "@/utils/node-manager";

export const MergeDicePoolsService: INodeService<IMergeDicePoolsNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "mergeDicePools",
      data: {
        name: i18n.t("nodeShortName.mergeDicePools"),
        status: "IDLE",
        inputType: "numericPool",
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

      const sourceState1 = NodeManager.run(sourceNode1, flow) as number[][];
      const sourceState2 = NodeManager.run(sourceNode2, flow) as number[][];
      const resultState = mergePools(sourceState1, sourceState2);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function mergePools(data1: number[][], data2: number[][]) {
  const result: number[][] = [];

  for (let i = 0; i < data1.length; i++) {
    result[i] = [...data1[i], ...data2[i]];
  }

  return result;
}
