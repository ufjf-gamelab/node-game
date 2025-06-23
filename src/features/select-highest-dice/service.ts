import { i18n } from "@/config/i18n";
import { ISelectHighestDiceNode, INodeService } from "@/config/types";

export const SelectHighestDiceService: INodeService<ISelectHighestDiceNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "selectHighestDice",
      data: {
        name: i18n.t("nodeShortName.selectHighestDice"),
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
    const resultState = selectHighestValueFromPool(sourceState, iterations);
    return resultState;
  },
};

function selectHighestValueFromPool(data: number[][], iterations: number) {
  const result: number[] = [];

  for (let i = 0; i < iterations; i++) {
    result[i] = Math.max(...data[i]);
  }
  return result;
}
