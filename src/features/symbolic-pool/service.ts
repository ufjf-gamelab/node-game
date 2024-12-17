import { ISymbolicPoolNode, INodeService, ISymbolicGeneratorNode } from "@/config/types";

export const SymbolicPoolService: INodeService<ISymbolicPoolNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "symbolicPool",
      data: {
        name: "Symbolic pool",
        detailsTitle: "Symbolic Pool",
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
      throw new Error("Symbolic pool missing data!");
    }

    const nodeEdges = edges.filter((edge) => edge.target === node.id);

    if (nodeEdges.length !== 2) {
      node.data = { ...node.data, status: "ERROR" };
      throw new Error("Symbolic pool with Invalid number of connections!");
    }

    const nodeSource1 = nodes.find((item) => item.id === nodeEdges[0].source) as ISymbolicGeneratorNode | undefined;
    const nodeSource2 = nodes.find((item) => item.id === nodeEdges[1].source) as ISymbolicGeneratorNode | undefined;

    if (!nodeSource1 || !nodeSource2) {
      node.data = { ...node.data, status: "ERROR" };
      throw new Error("Dice pool with invalid node connections!");
    }

    if (nodeSource1.data.status !== "FINISHED" || nodeSource2.data.status !== "FINISHED") {
      node.data = { ...node.data, status: "ERROR" };
      throw new Error("Dice pool connections not ready!");
    }

    node.data = { ...node.data, state: poolSymbolicNodes(nodeSource1, nodeSource2), status: "FINISHED" };
  },
};

export function poolSymbolicNodes(aInput1: ISymbolicGeneratorNode, aInput2: ISymbolicGeneratorNode) {
  let result: string[][] = [];

  for (let i = 0; i < aInput1.data.state.length; i++) {
    const dado1 = aInput1.data.state[i];
    const dado2 = aInput2.data.state[i];

    result[i] = [];

    if (Array.isArray(dado1)) {
      result[i] = [...result[i], ...dado1];
    } else {
      result[i] = [...result[i], dado1];
    }

    if (Array.isArray(dado2)) {
      result[i] = [...result[i], ...dado2];
    } else {
      result[i] = [...result[i], dado2];
    }
  }

  return result;
}
