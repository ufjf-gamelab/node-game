import { INodeService, ISymbolicGeneratorNode } from "@/config/types";

export const SymbolicGeneratorService: INodeService<ISymbolicGeneratorNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "symbolicGenerator",
      data: {
        status: "IDLE",
        detailsTitle: "Symbolic generator",
        name: "Symbolic",
        state: [],
        faces: ["A"],
      },
    };
  },

  run(flow, node) {
    const isMissingFields = node.data.faces.some((item) => !item);
    if (isMissingFields) {
      throw new Error("Symbolic generator with invalid faces!");
    }

    if (node.data.status === "FINISHED") {
      node.data = { ...node.data, status: "MISSING_DATA" };
      flow.updateNode(node.id, node);
      return;
    }

    let randomData = generateRandomData(1, node.data.faces.length, 10000);
    let symbolicState: string[] = [];

    randomData.map((randomData) => {
      const itemFound = node.data.faces.find((item) => item.toString() === randomData.toString());
      itemFound && symbolicState.push(itemFound);
    });

    node.data = { ...node.data, state: symbolicState, status: "FINISHED" };
    flow.updateNode(node.id, node);
  },
};

function generateRandomData(aMin: number, aMax: number, aN: number) {
  let lData: number[] = [];
  for (let i = 0; i < aN; i++) {
    lData.push(parseInt(Math.floor(Math.random() * (aMax + 1 - aMin) + aMin).toString()));
  }
  return lData;
}
