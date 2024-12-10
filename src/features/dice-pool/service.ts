import { IDicePoolNode, IDiceGeneratorNode, INodeService } from "@/config/types";
import { poolNodes } from "@/utils/pool-nodes";

export const DicePoolService: INodeService<IDicePoolNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "dicePool",
      data: {
        name: "Dice pool",
        detailsTitle: "Dice Pool",
        status: "IDLE",
        state: [],
      },
    };
  },

  run(flow, node) {
    const nodes = flow.getNodes();
    const edges = flow.getEdges();

    if (node.data.status === "FINISHED") {
      node.data = { ...node.data, status: "MISSING_DATA" };
      return;
    }

    const nodeEdges = edges.filter((edge) => edge.target === node.id);

    if (nodeEdges.length !== 2) {
      throw new Error("Dice pool with Invalid number of connections!");
    }

    const nodeSource1 = nodes.find((item) => item.id === nodeEdges[0].source) as IDiceGeneratorNode | undefined;
    const nodeSource2 = nodes.find((item) => item.id === nodeEdges[1].source) as IDiceGeneratorNode | undefined;

    if (!nodeSource1 || !nodeSource2) {
      throw new Error("Dice pool with invalid node connections!");
    }

    if (nodeSource1.data.status !== "FINISHED" || nodeSource2.data.status !== "FINISHED") {
      throw new Error("Dice pool connections not ready!");
    }

    node.data = {
      ...node.data,
      state: poolNodes(nodeSource1, nodeSource2),
      status: "FINISHED",
    };
  },
};
