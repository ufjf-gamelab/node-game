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
        balls: ["red"],
      },
    };
  },

  run(flow, node) {
    flow.updateNodeData(node.id, { ...node.data, status: "MISSING_DATA" });
    return [];
  },
};
