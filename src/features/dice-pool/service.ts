import { INode, IEdge, IDicePoolNode, IDiceGeneratorNode } from "@/config/types";
import { poolNodes } from "@/utils/pool-nodes";

export const DicePoolService = {
  new(nodes: INode[]): IDicePoolNode {
    return {
      id: `dice-pool-${nodes.length}`,
      type: "dicePool",
      position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },
      data: {
        name: "Dice pool",
        status: "IDLE",
        state: [],
      },
    };
  },

  run(node: IDicePoolNode, nodes: INode[], edges: IEdge[]) {
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
