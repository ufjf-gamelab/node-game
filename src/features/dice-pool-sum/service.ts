import { INode, IEdge, IDicePoolSumNode } from "@/config/types";

export const DicePoolSumService = {
  new(nodes: INode[]): IDicePoolSumNode {
    return {
      id: `dice-pool-sum-${nodes.length}`,
      type: "dicePoolSum",
      position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },
      data: {
        name: "Dice pool sum",
        status: "IDLE",
        state: [],
      },
    };
  },

  run(node: IDicePoolSumNode, nodes: INode[], edges: IEdge[]) {},
};
