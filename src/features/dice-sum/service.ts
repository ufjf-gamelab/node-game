import { INode, IDiceSumNode } from "@/config/types";

export const DiceSumService = {
  new(nodes: INode[]): IDiceSumNode {
    return {
      id: `dice-sum-${nodes.length}`,
      type: "diceSum",
      position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },
      data: {
        name: "Sum dices",
        detailsTitle: "Sum Dices",
        status: "IDLE",
      },
    };
  },

  run(_node: IDiceSumNode) {},
};
