import { i18n } from "@/config/i18n";
import { IChartData, IHistogramNode, INodeService, INodeType } from "@/config/types";
import { flattenArray } from "@/utils/flatten-array";

import { sortBy } from "@/utils/sort-by";

export const HistogramService: INodeService<IHistogramNode> = {
  new(flow, { id, position }) {
    const histogramCount = flow.getNodes().filter((node) => node.type === "histogram").length;
    return {
      id,
      position,
      type: "histogram",
      data: {
        name: `${i18n.t("nodeShortName.histogram")} ${histogramCount + 1}`,
        status: "IDLE",
        sortDirection: "asc",
      },
    };
  },

  run(node, [source1]) {
    if (!source1) throw new Error("Source connection state not found!");

    const sourceState = source1.state;
    const sourceNode = source1.node;

    if (isArrayOfObjects(sourceState)) {
      const sortedChartData = sortBy(sourceState, "label", node.data.sortDirection);

      return sortedChartData;
    }

    const resultState = flattenArray<string | number>(sourceState).reduce((accumulator, currentItem) => {
      const existingEntry = accumulator.find((prevEntry) => prevEntry.label === currentItem);
      if (existingEntry) existingEntry.value += 1;
      else accumulator.push({ label: currentItem, value: 1 });

      return accumulator;
    }, [] as IChartData);

    const nodesTypeWithPercentage: INodeType[] = ["diceCountRepetition"];
    if (nodesTypeWithPercentage.includes(sourceNode.type)) {
      resultState.forEach((item) => {
        const percentage = ((item.value / sourceState.length) * 100).toFixed(2);
        item.label = `${item.label} (${percentage}%)`;
      });
    }

    const nodesTypeBoolean: INodeType[] = ["diceSuccess", "diceBetweenInterval", "diceLogical", "valueIsEven", "valueIsOdd"];
    const parentIsTypeBoolean = nodesTypeBoolean.includes(sourceNode.type);

    if (parentIsTypeBoolean) {
      resultState.forEach((item) => {
        const percentage = ((item.value / sourceState.length) * 100).toFixed(2);

        if (item.label === 1) item.label = `Success (${percentage}%)`;
        else item.label = `Failure (${percentage}%)`;
      });
    }

    const sortedChartData = sortBy(resultState, "label", node.data.sortDirection);

    return sortedChartData;
  },
};

function isArrayOfObjects(arr: any[]): arr is IChartData {
  return (typeof arr?.[0]?.label === "string" || typeof arr?.[0]?.label === "number") && typeof arr?.[0]?.value === "number";
}
