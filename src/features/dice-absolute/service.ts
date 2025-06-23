import { i18n } from "@/config/i18n";
import { IDiceAbsoluteNode, INodeService } from "@/config/types";

export const DiceAbsoluteService: INodeService<IDiceAbsoluteNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceAbsolute",
      data: {
        name: i18n.t("nodeShortName.diceAbsolute"),
        status: "IDLE",
        inputType: "numeric",
        outputType: "numeric",
      },
    };
  },

  run({ inputs }) {
    const [source] = inputs;
    if (!source) throw new Error("Source connection state not found!");

    const sourceState = source.state as number[];
    const resultState = getAbsoluteValue(sourceState);
    return resultState;
  },
};

function getAbsoluteValue(data: number[]) {
  const result: number[] = [];
  data.forEach((item) => result.push(Math.abs(item)));
  return result;
}
