import { IHistogramNode, INode } from "@/config/types";
import { generateHash } from "@/utils/generate-hash";

export const HistogramService = {
  new(nodes: INode[]): IHistogramNode {
    const histogramCount = nodes.reduce((acc, item) => (item.type === "histogram" ? acc + 1 : acc), 1);

    return {
      id: generateHash(),
      type: "histogram",
      position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },
      data: {
        name: "Histogram " + histogramCount.toString(),
        detailsTitle: "Histogram",
        status: "IDLE",
      },
    };
  },

  run() {},
};
