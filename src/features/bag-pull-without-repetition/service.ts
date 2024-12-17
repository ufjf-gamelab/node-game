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
        state: [],
        balls: ["red"],
      },
    };
  },

  run(flow, node) {
    node.data.status = "MISSING_DATA";
    flow.updateNode(node.id, node);
  },
};
