import { i18n } from "@/config/i18n";
import { ISymbolicPoolNode, INodeService, ISymbolicGeneratorNode } from "@/config/types";

export const SymbolicPoolService: INodeService<ISymbolicPoolNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "symbolicPool",
      data: {
        name: i18n.t("nodeShortName.symbolicPool"),
        status: "IDLE",
        inputType: "symbolicGenerator",
        outputType: "symbolicPool",
        quantity: 2,
      },
    };
  },

  run({ node, inputs }) {
    const [source] = inputs;
    if (!source) throw new Error("Source connection state not found!");

    const sourceState = source.state as string[];
    const sourceNode = source.node as ISymbolicGeneratorNode;
    const resultState = getSymbolicPool(sourceState, node.data.quantity, sourceNode.data.faces);
    return resultState;
  },
};

export function getSymbolicPool(input: string[], quantity: number, faces: string[]) {
  let result: string[][] = [];

  for (let i = 0; i < input.length; i++) {
    result[i] = [input[i]];

    for (let j = 0; j < quantity - 1; j++) {
      const randomValue = faces[Math.floor(Math.random() * faces.length)];
      result[i].push(randomValue);
    }
  }

  return result;
}
