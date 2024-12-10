import { IBagGenerator, INodeService } from "@/config/types";

export const BagGeneratorService: INodeService<IBagGenerator> = {
  new(flow, defaultValues) {
    const bagCount = flow.getNodes().reduce((acc, item) => (item.type === "diceGenerator" ? acc + 1 : acc), 1);

    return {
      ...defaultValues,
      type: "bagGenerator",
      data: {
        status: "IDLE",
        detailsTitle: "Bag generator",
        name: "Bag " + bagCount,
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
