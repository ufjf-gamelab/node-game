import { i18n } from "@/config/i18n";
import { IValueIsEvenNode, INodeService } from "@/config/types";

export const ValueIsEvenService: INodeService<IValueIsEvenNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "valueIsEven",
      data: {
        name: i18n.t("nodeShortName.valueIsEven"),
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
    const resultState = getValueIsEven(sourceState);
    return resultState;
  },
};

function getValueIsEven(data: number[]) {
  const result: number[] = [];

  data.map((item) => {
    if (item % 2 === 0) result.push(1);
    else result.push(0);
  });

  return result;
}
