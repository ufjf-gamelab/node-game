import { IDiceExplodeGenerator, INode } from "@/config/types";
import { generateHash } from "@/utils/generate-hash";

export const DiceExplodeGeneratorService = {
  TOTAL_DATA_VALUE: 10000,

  new(nodes: INode[]): IDiceExplodeGenerator {
    return {
      id: generateHash(),
      type: "diceExplodeGenerator",
      position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },
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

  run(node: IDiceExplodeGenerator) {
    if (node.data.status === "FINISHED") {
      node.data = { ...node.data, status: "MISSING_DATA" };
      return;
    }

    node.data = {
      ...node.data,
      state: this.explodeDice(node.data.maxFace, node.data.explodeFace, this.TOTAL_DATA_VALUE),
      status: "FINISHED",
    };
  },

  explodeDice(maxFace: number, explodeFace: number, aN: number) {
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
  },
};
