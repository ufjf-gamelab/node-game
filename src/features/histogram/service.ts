import { IHistogramNode, INode, INodeService } from "@/config/types";
import { NodeManager } from "@/utils/node-manager";

export const HistogramService: INodeService<IHistogramNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "histogram",
      data: {
        name: "Histogram",
        detailsTitle: "Histogram",
        status: "IDLE",
        state: [],
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

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return sourceState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};
