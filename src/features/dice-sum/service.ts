import { IDiceGeneratorNode, IDiceSumNode, INodeService } from "@/config/types";
import { NodeManager } from "@/utils/node-manager";

export const DiceSumService: INodeService<IDiceSumNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceSum",
      data: {
        name: "Sum dices",
        detailsTitle: "Sum Dices",
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

      const sourceState1 = NodeManager.run(sourceNode1, flow) as number[];
      const sourceState2 = NodeManager.run(sourceNode2, flow) as number[];
      const resultState = sumDataNodes(sourceState1, sourceState2);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

const sumDataNodes = (input1: number[], input2: number[]) => {
  const result = [];
  for (let i = 0; i < input1.length; i++) {
    result.push(input1[i] + input2[i]);
  }
  return result;
};
