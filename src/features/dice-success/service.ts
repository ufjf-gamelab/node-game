import { i18n } from "@/config/i18n";
import { IDiceSuccessNode, INodeService } from "@/config/types";

export const DiceSuccessService: INodeService<IDiceSuccessNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceSuccess",
      data: {
        name: i18n.t("nodeShortName.diceSuccess"),
        status: "IDLE",
        face: 6,
        inputType: "numeric",
        outputType: "boolean",
      },
    };
  },

  run({ node, inputs }) {
    const [source1] = inputs;
    if (!source1) throw new Error("Source connection state not found!");

    const sourceState = source1.state as number[];
    const resultState = getArraySuccess(sourceState, node.data.face);
    return resultState;
  },
};

function getArraySuccess(data: number[], face: number) {
  const result: number[] = [];

  data.forEach((item) => {
    if (item >= face) result.push(1);
    else result.push(0);
  });

  return result;
}
