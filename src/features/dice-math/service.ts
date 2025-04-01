import { IDiceGeneratorNode, IDiceMathNode, INodeService } from "@/config/types";
import { flattenArray } from "@/utils/flatten-array";
import { NodeManager } from "@/utils/node-manager";

export const DiceMathService: INodeService<IDiceMathNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceMath",
      data: {
        name: "Dice math",
        detailsTitle: "Dice Math",
        status: "IDLE",
        operation: "add",
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

      const resultState = executeMathOperationDataNodes(sourceState1, sourceState2, node.data.operation);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

const executeMathOperationDataNodes = (input1: number[], input2: number[], operation: IDiceMathNode["data"]["operation"]) => {
  const result = [];
  for (let i = 0; i < input1.length; i++) {
    if (operation === "add") result.push(input1[i] + input2[i]);
    else if (operation === "subtract") result.push(input1[i] - input2[i]);
    else if (operation === "multiply") result.push(input1[i] * input2[i]);
    else if (operation === "divide (floor)") result.push(Math.floor(input1[i] / input2[i]));
    else if (operation === "divide (ceil)") result.push(Math.ceil(input1[i] / input2[i]));
  }
  return result;
};
