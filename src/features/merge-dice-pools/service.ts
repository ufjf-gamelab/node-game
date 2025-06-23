import { i18n } from "@/config/i18n";
import { IMergeDicePoolsNode, INodeService } from "@/config/types";

export const MergeDicePoolsService: INodeService<IMergeDicePoolsNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "mergeDicePools",
      data: {
        name: i18n.t("nodeShortName.mergeDicePools"),
        status: "IDLE",
        inputType: "numericPool",
        outputType: "numericPool",
      },
    };
  },

  run({ inputs }) {
    const [source1, source2] = inputs;
    if (!source1 || !source2) throw new Error("Source connection state not found!");

    const sourceState1 = source1.state as number[][];
    const sourceState2 = source2.state as number[][];
    const resultState = mergePools(sourceState1, sourceState2);
    return resultState;
  },
};

function mergePools(data1: number[][], data2: number[][]) {
  const result: number[][] = [];

  for (let i = 0; i < data1.length; i++) {
    result[i] = [...data1[i], ...data2[i]];
  }

  return result;
}
