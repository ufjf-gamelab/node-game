import { IBagGeneratorNode, INodeService } from "@/config/types";

const TOTAL_DATA_VALUE = 10000;

export const BagGeneratorService: INodeService<IBagGeneratorNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "bagGenerator",
      data: {
        status: "IDLE",
        detailsTitle: "Bag generator",
        name: "Bag",
        balls: ["red", "blue"],
      },
    };
  },

  run(flow, node) {
    try {
      const resultState = generateRandomData(1, node.data.balls.length, TOTAL_DATA_VALUE);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function generateRandomData(aMin: number, aMax: number, aN: number) {
  let lData: number[] = [];
  for (let i = 0; i < aN; i++) {
    lData.push(parseInt(Math.floor(Math.random() * (aMax + 1 - aMin) + aMin).toString()));
  }
  return lData;
}
