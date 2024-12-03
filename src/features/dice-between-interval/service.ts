import { IDiceBetweenInterval, IDiceGeneratorNode, IEdge, INode } from "@/config/types";

export const DiceBetweenIntervalService = {
  new(nodes: INode[]): IDiceBetweenInterval {
    return {
      id: `dice-between-interval-${nodes.length}`,
      type: "diceBetweenInterval",
      position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },
      data: {
        name: "Dice between interval",
        detailsTitle: "Dice Between Interval",
        status: "IDLE",
        min: 1,
        max: 6,
        state: [],
      },
    };
  },

  run(node: IDiceBetweenInterval, nodes: INode[], edges: IEdge[]) {
    if (node.data.status === "FINISHED") {
      node.data = { ...node.data, status: "MISSING_DATA" };
      return;
    }

    const nodeEdges = edges.filter((edge) => edge.target === node.id);
    if (nodeEdges.length !== 1) {
      throw new Error("Dice success with Invalid number of connections!");
    }

    const nodeSource = nodes.find((item) => item.id === nodeEdges[0].source) as IDiceGeneratorNode | undefined;
    if (!nodeSource) {
      throw new Error("Dice success with invalid node connections!");
    }

    if (nodeSource.data.status !== "FINISHED") {
      throw new Error("Dice success connections not ready!");
    }

    node.data = {
      ...node.data,
      state: this.getArrayFaceBetween(nodeSource.data.state, node.data.min, node.data.max),
      status: "FINISHED",
    };
  },

  getArrayFaceBetween(data: number[], min: number, max: number) {
    const result = [];

    for (let i = 0; i < data.length; i++) {
      const dado1 = data[i];

      if (Array.isArray(dado1)) {
        dado1.forEach((valor) => {
          if (valor >= min && valor <= max) result.push(1);
          else result.push(0);
        });
      } else {
        if (dado1 >= min && dado1 <= max) result.push(1);
        else result.push(0);
      }
    }

    return result;
  },
};
