import { IDiceSuccessNode, INodeService } from "@/config/types";

export const DiceSuccessService: INodeService<IDiceSuccessNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceSuccess",
      data: {
        name: "Dice success",
        detailsTitle: "Dice Success",
        status: "IDLE",
        state: [],
        face: 0,
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
      state: getArraySuccess(nodeSource.data.state, node.data.face),
      status: "FINISHED",
    };
  },
};

function getArraySuccess(data: number[], face: number) {
  const result: number[] = [];

  data.map((item) => {
    if (item >= face) result.push(1);
    else result.push(0);
  });

  return result;
}
