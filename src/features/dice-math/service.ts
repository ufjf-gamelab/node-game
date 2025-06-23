import { i18n } from "@/config/i18n";
import { IDiceMathNode, INodeService } from "@/config/types";

export const DiceMathService: INodeService<IDiceMathNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceMath",
      data: {
        name: i18n.t("nodeShortName.diceMath"),
        status: "IDLE",
        operation: "sum",
        inputType: "numeric",
        outputType: "numeric",
      },
    };
  },

  run({ node, inputs }) {
    const [source1, source2] = inputs;
    if (!source1 || !source2) throw new Error("Source connection state not found!");

    const sourceState1 = source1.state as number[];
    const sourceState2 = source2.state as number[];
    const resultState = executeMathOperationDataNodes(sourceState1, sourceState2, node.data.operation);
    return resultState;
  },
};

const executeMathOperationDataNodes = (input1: number[], input2: number[], operation: IDiceMathNode["data"]["operation"]) => {
  const result = [];
  for (let i = 0; i < input1.length; i++) {
    if (operation === "sum") result.push(input1[i] + input2[i]);
    else if (operation === "subtract") result.push(input1[i] - input2[i]);
    else if (operation === "multiply") result.push(input1[i] * input2[i]);
    else if (operation === "divide (floor)") result.push(Math.floor(input1[i] / input2[i]));
    else if (operation === "divide (ceil)") result.push(Math.ceil(input1[i] / input2[i]));
  }
  return result;
};
