import { IDiceCountRepetition, IEdge, INode } from "@/config/types";

export const DiceCountRepetitionService = {
  new(nodes: INode[]): IDiceCountRepetition {
    return {
      id: `dice-success-${nodes.length}`,
      type: "diceCountRepetition",
      position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },
      data: {
        name: "Dice count repetition",
        detailsTitle: "Dice Count Repetition",
        status: "IDLE",
        state: [],
        face: 1,
      },
    };
  },

  run(node: IDiceCountRepetition, nodes: INode[], edges: IEdge[]) {
    if (node.data.status === "FINISHED") {
      node.data = { ...node.data, status: "MISSING_DATA" };
      return;
    }

    const nodeEdges = edges.filter((edge) => edge.target === node.id);
    if (nodeEdges.length !== 1) {
      throw new Error("Dice count repetition with Invalid number of connections!");
    }

    const nodeSource = nodes.find((item) => item.id === nodeEdges[0].source);
    if (!nodeSource || nodeSource.type !== "diceGenerator") {
      throw new Error("Dice count repetition with invalid node connections!");
    }

    if (nodeSource.data.status !== "FINISHED") {
      throw new Error("Dice count repetition connections not ready!");
    }

    node.data = {
      ...node.data,
      state: this.countRepetition(nodeSource.data.state, node.data.face),
      status: "FINISHED",
    };
  },

  countRepetition(data: number[], face: number) {
    const result: number[] = [];

    for (let i = 0; i < data.length; i++) {
      const dado = data[i];
      result[i] = 0;

      if (Array.isArray(dado)) {
        dado.forEach((valor) => {
          if (valor === face) result[i]++;
        });
      } else {
        if (dado === face) result[i]++;
      }
    }

    return result;
  },
};
