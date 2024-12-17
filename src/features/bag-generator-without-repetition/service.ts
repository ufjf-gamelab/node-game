import { IBagGeneratorWithoutRepetitionNode, INodeService } from "@/config/types";

export const BagGeneratorWithoutRepetitionService: INodeService<IBagGeneratorWithoutRepetitionNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "bagGeneratorWithoutRepetition",
      data: {
        status: "IDLE",
        detailsTitle: "Bag generator without repetition",
        name: "Bag without repetition",
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
