import { i18n } from "@/config/i18n";
import { IChartData, IHistogramNode, INode, INodeService, INodeType } from "@/config/types";
import { flattenArray } from "@/utils/flatten-array";
import { NodeManager } from "@/utils/node-manager";
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

  run(flow, node) {
    try {
      const edge = flow.getEdges().find((edge) => edge.target === node.id);
      if (!edge) throw new Error("Connection not found!");

      const sourceNode = flow.getNode(edge.source) as INode | undefined;
      if (!sourceNode) throw new Error("Source connection not found!");

      const sourceState = NodeManager.run(sourceNode, flow);

      if (isArrayOfObjects(sourceState)) {
        const sortedChartData = sortBy(sourceState, "label", node.data.sortDirection);
        flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
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
      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return sortedChartData;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function isArrayOfObjects(arr: any[]): arr is IChartData {
  return (typeof arr?.[0]?.label === "string" || typeof arr?.[0]?.label === "number") && typeof arr?.[0]?.value === "number";
}
