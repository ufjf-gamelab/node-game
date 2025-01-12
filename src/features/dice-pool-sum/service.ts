import { IDicePoolSumNode, INode, INodeService } from "@/config/types";
import { NodeManager } from "@/utils/node-manager";

export const DicePoolSumService: INodeService<IDicePoolSumNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "dicePoolSum",
      data: {
        name: "Dice pool sum",
        detailsTitle: "Dice Pool Sum",
        status: "IDLE",
        state: [],
      },
    };
  },

  run(flow, node) {
    try {
      const edge = flow.getEdges().find((edge) => edge.target === node.id);
      if (!edge) throw new Error("Connection not found!");

      const sourceNode = flow.getNode(edge.source) as INode | undefined;
      if (!sourceNode) throw new Error("Source connection not found!");

      const sourceState = NodeManager.run(sourceNode, flow) as number[];
      const resultState = poolSumNodes(sourceState);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function poolSumNodes(input: number[]) {
  let result = [];

  for (let i = 0; i < input.length; i++) {
    const dado1 = input[i];

    result[i] = 0;

    if (Array.isArray(dado1)) {
      dado1.forEach((valor) => (result[i] += valor));
    } else {
      result[i] += dado1;
    }
  }

  return result;
}
