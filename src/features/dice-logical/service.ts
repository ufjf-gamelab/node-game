import { i18n } from "@/config/i18n";
import { IDiceGeneratorNode, IDiceLogicalNode, INodeService } from "@/config/types";
import { flattenArray } from "@/utils/flatten-array";
import { NodeManager } from "@/utils/node-manager";

export const DiceLogicalService: INodeService<IDiceLogicalNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceLogical",
      data: {
        name: i18n.t("nodeShortName.diceLogical"),
        status: "IDLE",
        operation: "A = B",
      },
    };
  },

  run(flow, node) {
    try {
      const nodeEdges = flow.getEdges().filter((edge) => edge.target === node.id);
      if (nodeEdges.length !== 2) throw new Error("Invalid connection!");

      const edgeSourceNodeA = nodeEdges.find((edge) => edge.id.includes("logical-target-1-"));
      const edgeSourceNodeB = nodeEdges.find((edge) => edge.id.includes("logical-target-2-"));
      if (!edgeSourceNodeA || !edgeSourceNodeB) throw new Error("Source connection not found!");

      const sourceNodeA = flow.getNode(edgeSourceNodeA.source) as IDiceGeneratorNode;
      const sourceNodeB = flow.getNode(edgeSourceNodeB.source) as IDiceGeneratorNode;
      if (!sourceNodeA || !sourceNodeB) throw new Error("Source nodes not found!");

      const sourceState1 = flattenArray(NodeManager.run(sourceNodeA, flow) as number[] | number[][]);
      const sourceState2 = flattenArray(NodeManager.run(sourceNodeB, flow) as number[] | number[][]);

      const resultState = executeLogicalOperation(sourceState1, sourceState2, node.data.operation);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

const executeLogicalOperation = (input1: number[], input2: number[], operation: IDiceLogicalNode["data"]["operation"]) => {
  const result: number[] = [];
  for (let i = 0; i < input1.length; i++) {
    if (operation === "A = B") result.push(Number(input1[i] == input2[i]));
    else if (operation === "A >= B") result.push(Number(input1[i] >= input2[i]));
    else if (operation === "A <= B") result.push(Number(input1[i] <= input2[i]));
  }
  return result;
};
