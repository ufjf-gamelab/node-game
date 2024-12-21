import { IDicePoolSumNode, INodeService } from "@/config/types";

export const DicePoolSumService: INodeService<IDicePoolSumNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "dicePoolSum",
      data: {
        name: "Dice pool sum",
        detailsTitle: "Dice Pool Sum",
        status: "IDLE",
        state: [],
      },
    };
  },

  run(flow, node) {
    flow.updateNodeData(node.id, { ...node.data, status: "MISSING_DATA" });
    return [];
  },
};
