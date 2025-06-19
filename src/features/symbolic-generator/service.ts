import { i18n } from "@/config/i18n";
import { INodeService, ISymbolicGeneratorNode } from "@/config/types";

export const SymbolicGeneratorService: INodeService<ISymbolicGeneratorNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "symbolicGenerator",
      data: {
        name: i18n.t("nodeShortName.symbolicGenerator"),
        status: "IDLE",
        faces: ["A", "B"],
        outputType: "symbolicGenerator",
      },
    };
  },

  run({ node, iterations }) {
    const resultState = generateRandomSymbolicData(node.data.faces, iterations);
    return resultState;
  },
};

function generateRandomSymbolicData(faces: string[], iterations: number) {
  const randomData: number[] = [];
  for (let i = 0; i < iterations; i++) {
    randomData.push(parseInt(Math.floor(Math.random() * faces.length + 1).toString()));
  }

  const result: string[] = [];
  randomData.forEach((data) => {
    const itemFound = faces.find((_item, index) => index + 1 === data);
    itemFound && result.push(itemFound);
  });

  return result;
}
