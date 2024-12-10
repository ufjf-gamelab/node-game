import { IDiceGeneratorNode, INodeService } from "@/config/types";

const TOTAL_DATA_VALUE = 10000;

export const DiceGeneratorService: INodeService<IDiceGeneratorNode> = {
  new(flow, { id, position }) {
    const diceCount = flow.getNodes().reduce((acc, item) => (item.type === "diceGenerator" ? acc + 1 : acc), 1);
    return {
      id,
      position,
      type: "diceGenerator",
      data: {
        name: "Dice " + diceCount,
        detailsTitle: "Dice Generator",
        status: "IDLE",
        min: 1,
        max: 6,
        state: [],
      },
    };
  },

  run(_flow, node) {
    node.data = {
      ...node.data,
      state: generateRandomData(node.data.min, node.data.max, TOTAL_DATA_VALUE),
      status: "FINISHED",
    };
  },
};

function generateRandomData(aMin: number, aMax: number, aN: number) {
  let lData: number[] = [];
  for (let i = 0; i < aN; i++) {
    lData.push(parseInt(Math.floor(Math.random() * (aMax + 1 - aMin) + aMin).toString()));
  }
  return lData;
}
