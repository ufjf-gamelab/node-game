import { i18n } from "@/config/i18n";
import { ISelectRandomDiceNode, INodeService } from "@/config/types";

export const SelectRandomDiceService: INodeService<ISelectRandomDiceNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "selectRandomDice",
      data: {
        name: i18n.t("nodeShortName.selectRandomDice"),
        status: "IDLE",
        inputType: "numericPool",
        outputType: "numeric",
      },
    };
  },

  run({ inputs, iterations }) {
    const [source] = inputs;
    if (!source) throw new Error("Source connection state not found!");

    const sourceState = source.state as number[][];
    const resultState = selectRandomValueFromPool(sourceState, iterations);
    return resultState;
  },
};

function selectRandomValueFromPool(data: number[][], iterations: number) {
  const result: number[] = [];

  for (let i = 0; i < iterations; i++) {
    result[i] = data[i][Math.floor(Math.random() * data[i].length)];
  }
  return result;
}
