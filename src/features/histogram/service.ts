import { IHistogramNode, INode } from "@/config/types";

export const HistogramService = {
  new(nodes: INode[]): IHistogramNode {
    const histogramCount = nodes.reduce((acc, item) => (item.type === "histogram" ? acc + 1 : acc), 1);

    return {
      id: `histogram-${nodes.length}`,
      type: "histogram",
      position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },
      data: {
        name: "Histogram " + histogramCount.toString(),
        status: "IDLE",
      },
    };
  },

  run() {},
};
