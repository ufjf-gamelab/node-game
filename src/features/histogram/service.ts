import { IDiceGeneratorNode, IHistogramNode, INodeService } from "@/config/types";

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
    if (node.data.status === "FINISHED") {
      return;
    }

    const nodes = flow.getNodes();

    flow.getEdges().map((edge) => {
      if (edge.target === node.id) {
        let sourceNode = nodes.find((item) => item.id === edge.source) as IDiceGeneratorNode | undefined;
        if (!sourceNode) return;

        if (sourceNode.data.status === "FINISHED" && sourceNode.data?.state) {
          node.data = {
            ...node.data,
            state: sourceNode.data.state,
            status: "FINISHED",
          };
        }
      }
    });
  },
};
