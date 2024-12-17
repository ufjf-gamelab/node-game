import { IBagGeneratorNode, INodeService } from "@/config/types";

export const BagGeneratorService: INodeService<IBagGeneratorNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "bagGenerator",
      data: {
        status: "IDLE",
        detailsTitle: "Bag generator",
        name: "Bag",
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
