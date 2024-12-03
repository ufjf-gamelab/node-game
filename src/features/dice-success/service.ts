import { IDiceSuccessNode, IEdge, INode } from "@/config/types";
import { generateHash } from "@/utils/generate-hash";

export const DiceSuccessService = {
  new(nodes: INode[]): IDiceSuccessNode {
    return {
      id: generateHash(),
      type: "diceSuccess",
      position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },
      data: {
        name: "Dice success",
        detailsTitle: "Dice Success",
        status: "IDLE",
        state: [],
        face: 0,
      },
    };
  },

  run(node: IDiceSuccessNode, nodes: INode[], edges: IEdge[]) {
    if (node.data.status === "FINISHED") {
      node.data = { ...node.data, status: "MISSING_DATA" };
      return;
    }

    const nodeEdges = edges.filter((edge) => edge.target === node.id);
    if (nodeEdges.length !== 1) {
      throw new Error("Dice success with Invalid number of connections!");
    }

    const nodeSource = nodes.find((item) => item.id === nodeEdges[0].source);
    if (!nodeSource || nodeSource.type !== "diceGenerator") {
      throw new Error("Dice success with invalid node connections!");
    }

    if (nodeSource.data.status !== "FINISHED") {
      throw new Error("Dice success connections not ready!");
    }

    node.data = {
      ...node.data,
      state: this.getArraySuccess(nodeSource.data.state, node.data.face),
      status: "FINISHED",
    };
  },

  getArraySuccess(data: number[], face: number) {
    const result: number[] = [];

    data?.map((item) => {
      if (item >= face) result.push(1);
      else result.push(0);
    });

    return result;
  },
};
