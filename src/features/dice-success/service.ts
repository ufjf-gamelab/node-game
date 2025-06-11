import { i18n } from "@/config/i18n";
import { IDiceSuccessNode, INodeService } from "@/config/types";
import { flattenArray } from "@/utils/flatten-array";

export const DiceSuccessService: INodeService<IDiceSuccessNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceSuccess",
      data: {
        name: i18n.t("nodeShortName.diceSuccess"),
        status: "IDLE",
        state: [],
        face: 6,
      },
    };
  },

  run(node, [source1]) {
    if (!source1) throw new Error("Source connection state not found!");

    const sourceState = flattenArray(source1.state as number[] | number[][]);
    const resultState = getArraySuccess(sourceState, node.data.face);
    return resultState;
  },
};

function getArraySuccess(data: number[], face: number) {
  const result: number[] = [];

  data.map((item) => {
    if (item >= face) {
      result.push(1);
    } else {
      result.push(0);
    }
  });

  return result;
}
