import { i18n } from "@/config/i18n";
import { IDiceGeneratorNode, IAndLogicalNode, INodeService } from "@/config/types";
import { flattenArray } from "@/utils/flatten-array";
import { NodeManager } from "@/utils/node-manager";

export const AndLogicalService: INodeService<IAndLogicalNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "andLogical",
      data: {
        name: i18n.t("nodeShortName.andLogical"),
        status: "IDLE",
      },
    };
  },

  run(flow, node) {
    try {
      const nodeEdges = flow.getEdges().filter((edge) => edge.target === node.id);
      if (nodeEdges.length !== 2) throw new Error("Invalid connection!");

      const sourceNode1 = flow.getNode(nodeEdges[0].source) as IDiceGeneratorNode | undefined;
      const sourceNode2 = flow.getNode(nodeEdges[1].source) as IDiceGeneratorNode | undefined;
      if (!sourceNode1 || !sourceNode2) throw new Error("Source connection not found!");

      const sourceState1 = flattenArray(NodeManager.run(sourceNode1, flow) as number[] | number[][]);
      const sourceState2 = flattenArray(NodeManager.run(sourceNode2, flow) as number[] | number[][]);

      const resultState = executeAndLogical(sourceState1, sourceState2);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

const executeAndLogical = (input1: number[], input2: number[]) => {
  const result: number[] = [];
  for (let i = 0; i < input1.length; i++) {
    result.push(Number(input1[i] && input2[i]));
  }
  return result;
};
