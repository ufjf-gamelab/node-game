import { i18n } from "@/config/i18n";
import { IBagGeneratorNode, IBagPullWithoutRepetitionNode, INodeService } from "@/config/types";

const TOTAL_SIMULATIONS = 10000;

export const BagPullWithoutRepetitionService: INodeService<IBagPullWithoutRepetitionNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "bagPullWithoutRepetition",
      data: {
        name: i18n.t("nodeShortName.bagPullWithoutRepetition"),
        status: "IDLE",
      },
    };
  },

  run(flow, node) {
    try {
      const edge = flow.getEdges().find((edge) => edge.target === node.id);
      if (!edge) throw new Error("Connection not found!");

      const sourceNode = flow.getNode(edge.source) as IBagGeneratorNode | undefined;
      if (!sourceNode) throw new Error("Source connection not found!");

      const resultState = pullBagWithoutRepetition(sourceNode.data.balls);
      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function pullBagWithoutRepetition(balls: string[]) {
  const result: string[] = [];

  for (let i = 0; i < TOTAL_SIMULATIONS; i++) {
    const bolasEmbaralhadas = [...balls];
    for (let j = bolasEmbaralhadas.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [bolasEmbaralhadas[j], bolasEmbaralhadas[k]] = [bolasEmbaralhadas[k], bolasEmbaralhadas[j]];
    }

    result.push(bolasEmbaralhadas.join("-"));
  }

  return result;
}
