import { IBagGeneratorNode, IBagPullWithoutRepetitionNode, INodeService } from "@/config/types";
import { NodeManager } from "@/utils/node-manager";

export const BagGeneratorWithoutRepetitionService: INodeService<IBagPullWithoutRepetitionNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "bagPullWithoutRepetition",
      data: {
        status: "IDLE",
        detailsTitle: "Pull Bag without repetition",
        name: "Pull without repetition",
        balls: ["red"],
      },
    };
  },

  run(flow, node) {
    try {
      const edge = flow.getEdges().find((edge) => edge.target === node.id);
      if (!edge) throw new Error("Connection not found!");

      const sourceNode = flow.getNode(edge.source) as IBagGeneratorNode | undefined;
      if (!sourceNode) throw new Error("Source connection not found!");

      const sourceState = NodeManager.run(sourceNode, flow);
      const resultState = sourceState.map((item) => sourceNode.data.balls[item - 1]);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};
