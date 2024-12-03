import { INode, IDiceSumNode } from "@/config/types";
import { generateHash } from "@/utils/generate-hash";

export const DiceSumService = {
  new(nodes: INode[]): IDiceSumNode {
    return {
      id: generateHash(),
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
