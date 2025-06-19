import { i18n } from "@/config/i18n";
import { IDiceGeneratorNode, IDicePoolNode, INodeService } from "@/config/types";
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
        inputType: "numericGenerator",
        outputType: "numericPool",
        quantity: 2,
      },
    };
  },

  run(flow, node) {
    try {
      const edge = flow.getEdges().find((edge) => edge.target === node.id);
      if (!edge) throw new Error("Connection not found!");

      const sourceNode = flow.getNode(edge.source) as IDiceGeneratorNode | undefined;
      if (!sourceNode) throw new Error("Source connection not found!");

      const sourceState = NodeManager.run(sourceNode, flow);
      const resultState = poolNodes(sourceState, node.data.quantity, sourceNode.data.min, sourceNode.data.max);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

export function poolNodes(aInput1: number[], quantity: number, min: number, max: number) {
  let result: number[][] = [];

  for (let i = 0; i < aInput1.length; i++) {
    result[i] = [aInput1[i]];

    for (let j = 0; j < quantity - 1; j++) {
      const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
      result[i].push(randomValue);
    }
  }

  return result;
}
