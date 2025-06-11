import { i18n } from "@/config/i18n";
import { IIntegerValueNode, INodeService } from "@/config/types";

const TOTAL_DATA_VALUE = 10000;

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
      },
    };
  },

  run(flow, node) {
    try {
      const resultState = generateIntData(node.data.value);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function generateIntData(value: number) {
  const result: number[] = [];
  for (let i = 0; i < TOTAL_DATA_VALUE; i++) {
    result.push(value);
  }
  return result;
}
