import { IBagPullWithoutRepetitionNode, INodeService } from "@/config/types";

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
    flow.updateNodeData(node.id, { ...node.data, status: "MISSING_DATA" });
    return [];
  },
};
