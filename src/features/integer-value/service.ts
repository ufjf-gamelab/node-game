import { i18n } from "@/config/i18n";
import { IIntegerValueNode, INodeService } from "@/config/types";

export const IntegerValueService: INodeService<IIntegerValueNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "integerValue",
      data: {
        name: i18n.t("nodeShortName.integerValue"),
        status: "IDLE",
        value: 1,
        outputType: "numeric",
      },
    };
  },

  run({ node, iterations }) {
    const resultState = generateIntData(node.data.value, iterations);
    return resultState;
  },
};

function generateIntData(value: number, iterations: number) {
  const result: number[] = [];
  for (let i = 0; i < iterations; i++) {
    result.push(value);
  }
  return result;
}
