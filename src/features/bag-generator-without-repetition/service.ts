import { IBagGeneratorWithoutRepetition, INodeService } from "@/config/types";

export const BagGeneratorWithoutRepetitionService: INodeService<IBagGeneratorWithoutRepetition> = {
  new(flow, { id, position }) {
    const bagCount = flow.getNodes().reduce((acc, item) => (item.type === "diceGenerator" ? acc + 1 : acc), 1);

    return {
      id,
      position,
      type: "bagGeneratorWithoutRepetition",
      data: {
        status: "IDLE",
        detailsTitle: "Bag generator without repetition",
        name: "Bag without repetition " + bagCount,
        state: [],
        balls: ["red"],
      },
    };
  },

  run(flow, node) {
    node.data.status = "MISSING_DATA";
    flow.updateNode(node.id, node);
  },
};
