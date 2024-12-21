import { IDiceCountRepetitionNode, INodeService } from "@/config/types";
import { NodeManager } from "@/utils/node-manager";

export const DiceCountRepetitionService: INodeService<IDiceCountRepetitionNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceCountRepetition",
      data: {
        name: "Dice count repetition",
        detailsTitle: "Dice Count Repetition",
        status: "IDLE",
        face: 1,
      },
    };
  },

  run(flow, node) {
    try {
      const edge = flow.getEdges().find((edge) => edge.target === node.id);
      if (!edge) throw new Error("Connection not found!");

      const sourceNode = flow.getNode(edge.source);
      if (!sourceNode) throw new Error("Source connection not found!");

      const sourceState = NodeManager.run(sourceNode, flow) as number[];
      const resultState = countRepetition(sourceState, node.data.face);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function countRepetition(data: number[], face: number) {
  const result: number[] = [];

  for (let i = 0; i < data.length; i++) {
    const dado = data[i];
    result[i] = 0;

    if (Array.isArray(dado)) {
      dado.forEach((valor) => {
        if (valor === face) result[i]++;
      });
    } else {
      if (dado === face) result[i]++;
    }
  }

  return result;
}
