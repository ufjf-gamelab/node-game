import { i18n } from "@/config/i18n";
import { IDiceCountRepetitionNode, INodeService } from "@/config/types";

export const DiceCountRepetitionService: INodeService<IDiceCountRepetitionNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceCountRepetition",
      data: {
        name: i18n.t("nodeShortName.diceCountRepetition"),
        status: "IDLE",
        face: 1,
        inputType: "numeric",
        outputType: "numeric",
      },
    };
  },

  run({ node, inputs }) {
    const [source] = inputs;
    if (!source) throw new Error("Source connection state not found!");

    const sourceState = source.state as number[];
    const resultState = countRepetition(sourceState, node.data.face);
    return resultState;
  },
};

function countRepetition(data: number[], face: number) {
  const result: number[] = [];

  data.forEach((item, i) => {
    if (item === face) result[i] = 1;
    else result[i] = 0;
  });

  return result;
}
