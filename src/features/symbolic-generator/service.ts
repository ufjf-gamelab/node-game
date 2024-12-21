import { INodeService, ISymbolicGeneratorNode } from "@/config/types";

const TOTAL_DATA_VALUE = 10000;

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
        faces: ["A"],
      },
    };
  },

  run(flow, node) {
    try {
      const isMissingFields = node.data.faces.some((item) => !item);
      if (isMissingFields) throw new Error("Symbolic generator with invalid faces!");

      const resultState = generateRandomSymbolicData(1, node.data.faces, TOTAL_DATA_VALUE);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function generateRandomSymbolicData(aMin: number, faces: string[], aN: number) {
  const randomData: number[] = [];
  for (let i = 0; i < aN; i++) {
    randomData.push(parseInt(Math.floor(Math.random() * (faces.length + 1 - aMin) + aMin).toString()));
  }

  const result: string[] = [];
  randomData.forEach((data) => {
    const itemFound = faces.find((item) => item === data.toString());
    itemFound && result.push(itemFound);
  });
  return result;
}
