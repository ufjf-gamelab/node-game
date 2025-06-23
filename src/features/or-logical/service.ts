import { i18n } from "@/config/i18n";
import { IOrLogicalNode, INodeService } from "@/config/types";

export const OrLogicalService: INodeService<IOrLogicalNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "orLogical",
      data: {
        name: i18n.t("nodeShortName.orLogical"),
        status: "IDLE",
        inputType: "boolean",
        outputType: "boolean",
      },
    };
  },

  run({ inputs }) {
    const [source1, source2] = inputs;
    if (!source1 || !source2) throw new Error("Source connection state not found!");

    const sourceState1 = source1.state as number[];
    const sourceState2 = source2.state as number[];
    const resultState = executeOrLogical(sourceState1, sourceState2);
    return resultState;
  },
};

const executeOrLogical = (input1: number[], input2: number[]) => {
  const result: number[] = [];
  for (let i = 0; i < input1.length; i++) {
    result.push(Number(input1[i] || input2[i]));
  }
  return result;
};
