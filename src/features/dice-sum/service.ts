import { IDiceSumNode, INodeService } from "@/config/types";

export const DiceSumService: INodeService<IDiceSumNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceSum",
      data: {
        name: "Sum dices",
        detailsTitle: "Sum Dices",
        status: "IDLE",
      },
    };
  },

  run(_flow, _node) {},
};
