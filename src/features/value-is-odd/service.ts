import { i18n } from "@/config/i18n";
import { IValueIsOddNode, INodeService } from "@/config/types";

export const ValueIsOddService: INodeService<IValueIsOddNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "valueIsOdd",
      data: {
        name: i18n.t("nodeShortName.valueIsOdd"),
        status: "IDLE",
        inputType: "numeric",
        outputType: "boolean",
      },
    };
  },

  run({ inputs }) {
    const [source] = inputs;
    if (!source) throw new Error("Source connection state not found!");

    const sourceState = source.state as number[];
    const resultState = getValueIsOdd(sourceState);
    return resultState;
  },
};

function getValueIsOdd(data: number[]) {
  const result: number[] = [];

  data.map((item) => {
    if (item % 2 !== 0) {
      result.push(1);
    } else {
      result.push(0);
    }
  });

  return result;
}
