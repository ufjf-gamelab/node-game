import { INode, IDicePoolNode } from "@/config/types";

export const DicePoolService = {
  new(nodes: INode[]): IDicePoolNode {
    return {
      id: `dice-pool-${nodes.length}`,
      type: "dicePool",
      position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },
      data: {
        name: "Dice pool",
        status: "IDLE",
      },
    };
  },

  run(_node: IDicePoolNode) {},
};
