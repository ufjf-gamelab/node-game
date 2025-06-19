import { i18n } from "@/config/i18n";
import { IDiceGeneratorNode, IDicePoolNode, INodeService } from "@/config/types";

export const DicePoolService: INodeService<IDicePoolNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "dicePool",
      data: {
        name: i18n.t("nodeShortName.dicePool"),
        status: "IDLE",
        inputType: "numericGenerator",
        outputType: "numericPool",
        quantity: 2,
      },
    };
  },

  run({ node, inputs }) {
    const [source] = inputs;
    if (!source) throw new Error("Source connection state not found!");

    const sourceState = source.state as number[];
    const sourceNode = source.node as IDiceGeneratorNode;
    const resultState = getDicePool(sourceState, node.data.quantity, sourceNode.data.min, sourceNode.data.max);
    return resultState;
  },
};

export function getDicePool(aInput1: number[], quantity: number, min: number, max: number) {
  let result: number[][] = [];

  for (let i = 0; i < aInput1.length; i++) {
    result[i] = [aInput1[i]];

    for (let j = 0; j < quantity - 1; j++) {
      const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
      result[i].push(randomValue);
    }
  }

  return result;
}
