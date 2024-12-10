import { IDiceExplodeGenerator, INodeService } from "@/config/types";

const TOTAL_DATA_VALUE = 10000;

export const DiceExplodeGeneratorService: INodeService<IDiceExplodeGenerator> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceExplodeGenerator",
      data: {
        name: "Dice explode",
        detailsTitle: "Dice Explode Generator",
        status: "IDLE",
        state: [],
        explodeFace: 1,
        maxFace: 6,
      },
    };
  },

  run(_flow, node) {
    if (node.data.status === "FINISHED") {
      node.data = { ...node.data, status: "MISSING_DATA" };
      return;
    }

    node.data = {
      ...node.data,
      state: explodeDice(node.data.maxFace, node.data.explodeFace, TOTAL_DATA_VALUE),
      status: "FINISHED",
    };
  },
};

function explodeDice(maxFace: number, explodeFace: number, aN: number) {
  let lCount = 0;
  const result: number[] = [];

  for (let i = 0; i < aN; i++) {
    while (explodeFace === parseInt(Math.floor(Math.random() * (maxFace + 1 - 1) + 1).toString())) {
      lCount++;
    }

    result.push(lCount);
    lCount = 0;
  }

  return result;
}
