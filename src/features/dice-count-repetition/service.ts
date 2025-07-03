import { i18n } from "@/config/i18n";
import { IDiceCountRepetitionNode, INodeService } from "@/config/types";
import { flattenArray } from "@/utils/flatten-array";

export const DiceCountRepetitionService: INodeService<IDiceCountRepetitionNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceCountRepetition",
      data: {
        name: i18n.t("nodeShortName.diceCountRepetition"),
        status: "IDLE",
        face: "1",
        inputType: "any",
        outputType: "numeric",
      },
    };
  },

  run({ node, inputs }) {
    const [source] = inputs;
    if (!source) throw new Error("Source connection state not found!");

    const sourceState = source.state as string[] | string[][] | number[] | number[][];
    const resultState = countRepetition(sourceState, node.data.face);
    return resultState;
  },
};

function countRepetition(data: string[] | string[][] | number[] | number[][], face: string) {
  const result: number[] = [];

  flattenArray<string | number>(data).forEach((item, i) => {
    if (typeof item === "string") {
      if (item == face) result[i] = 1;
      else result[i] = 0;
    } else {
      const numericFace = Number(face);
      if (item == numericFace) result[i] = 1;
      else result[i] = 0;
    }
  });

  return result;
}
