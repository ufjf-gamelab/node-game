import { i18n } from "@/config/i18n";
import { IDicePoolSumNode, INodeService } from "@/config/types";

export const DicePoolSumService: INodeService<IDicePoolSumNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "dicePoolSum",
      data: {
        name: i18n.t("nodeShortName.dicePoolSum"),
        status: "IDLE",
        state: [],
        inputType: "numericPool",
        outputType: "numeric",
      },
    };
  },

  run({ inputs }) {
    const [source] = inputs;
    if (!source) throw new Error("Source connection state not found!");

    const sourceState = source.state as number[][];
    const resultState = executePoolSum(sourceState);
    return resultState;
  },
};

function executePoolSum(input: number[][]) {
  const result: number[] = [];

  for (let i = 0; i < input.length; i++) {
    result[i] = 0;
    input[i].forEach((valor) => (result[i] += valor));
  }

  return result;
}
