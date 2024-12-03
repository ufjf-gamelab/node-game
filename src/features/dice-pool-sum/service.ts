import { INode, IEdge, IDicePoolSumNode } from "@/config/types";
import { generateHash } from "@/utils/generate-hash";

export const DicePoolSumService = {
  new(nodes: INode[]): IDicePoolSumNode {
    return {
      id: generateHash(),
      type: "dicePoolSum",
      position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },
      data: {
        name: "Dice pool sum",
        detailsTitle: "Dice Pool Sum",
        status: "IDLE",
        state: [],
      },
    };
  },

  run(_node: IDicePoolSumNode, _nodes: INode[], _edges: IEdge[]) {},
};
