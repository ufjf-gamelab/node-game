import { i18n } from "@/config/i18n";
import { IHistogramNode, INode, INodeService } from "@/config/types";
import { flattenArray } from "@/utils/flatten-array";
import { NodeManager } from "@/utils/node-manager";

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
        parentNodeType: "",
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
      const resultState = flattenArray(sourceState);
      node.data.parentNodeType = sourceNode.type;

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};
