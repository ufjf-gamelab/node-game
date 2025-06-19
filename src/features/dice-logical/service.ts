import { i18n } from "@/config/i18n";
import { IDiceLogicalNode, INodeService } from "@/config/types";

export const DiceLogicalService: INodeService<IDiceLogicalNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceLogical",
      data: {
        name: i18n.t("nodeShortName.diceLogical"),
        status: "IDLE",
        operation: "A = B",
        inputType: "numeric",
        outputType: "boolean",
      },
    };
  },

  run({ node, inputs }) {
    const [source1, source2] = inputs;
    if (!source1 || !source2) throw new Error("Source connection state not found!");

    const sourceState1 = source1.state as number[];
    const sourceState2 = source2.state as number[];
    const resultState = executeLogicalOperation(sourceState1, sourceState2, node.data.operation);
    return resultState;
  },
};

const executeLogicalOperation = (input1: number[], input2: number[], operation: IDiceLogicalNode["data"]["operation"]) => {
  const result: number[] = [];
  for (let i = 0; i < input1.length; i++) {
    if (operation === "A = B") result.push(Number(input1[i] == input2[i]));
    else if (operation === "A >= B") result.push(Number(input1[i] >= input2[i]));
    else if (operation === "A <= B") result.push(Number(input1[i] <= input2[i]));
  }
  return result;
};
