import { INode, IDiceGeneratorNode } from "@/config/types";

export const DiceGeneratorService = {
  TOTAL_DATA_VALUE: 10000,

  new(nodes: INode[]): IDiceGeneratorNode {
    const diceCount = nodes.reduce((acc, item) => (item.type === "diceGenerator" ? acc + 1 : acc), 1);
    return {
      id: `dice-${nodes.length}`,
      type: "diceGenerator",
      position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },
      data: {
        name: "Dice " + diceCount,
        status: "IDLE",
        min: 1,
        max: 6,
        state: [],
      },
    };
  },

  run(node: IDiceGeneratorNode) {
    node.data = {
      ...node.data,
      state: this.generateRandomData(node.data.min, node.data.max, this.TOTAL_DATA_VALUE),
      status: "FINISHED",
    };
  },

  generateRandomData(aMin: number, aMax: number, aN: number) {
    let lData: number[] = [];
    for (let i = 0; i < aN; i++) {
      lData.push(parseInt(Math.floor(Math.random() * (aMax + 1 - aMin) + aMin).toString()));
    }
    return lData;
  },
};
