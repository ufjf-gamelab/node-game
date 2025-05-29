import { i18n } from "@/config/i18n";
import { IBagGeneratorNode, IBagPullWithoutRepetitionNode, INodeService } from "@/config/types";
import { NodeManager } from "@/utils/node-manager";

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
