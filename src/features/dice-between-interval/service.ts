import { i18n } from "@/config/i18n";
import { IDiceBetweenIntervalNode, INodeService } from "@/config/types";

export const DiceBetweenIntervalService: INodeService<IDiceBetweenIntervalNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceBetweenInterval",
      data: {
        name: i18n.t("nodeShortName.diceBetweenInterval"),
        status: "IDLE",
        min: 1,
        max: 2,
        inputType: "numeric",
        outputType: "boolean",
      },
    };
  },

  run({ node, inputs }) {
    const [source] = inputs;
    if (!source) throw new Error("Source connection state not found!");

    const sourceState = source.state as number[];
    const resultState = getValuesBetweenInterval(sourceState, node.data.min, node.data.max);
    return resultState;
  },
};

function getValuesBetweenInterval(data: number[], min: number, max: number) {
  const result = [];

  for (let i = 0; i < data.length; i++) {
    const dado1 = data[i];

    if (dado1 >= min && dado1 <= max) result.push(1);
    else result.push(0);
  }

  return result;
}
