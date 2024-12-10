import { IHistogramNode, INodeService } from "@/config/types";

export const HistogramService: INodeService<IHistogramNode> = {
  new(flow, { id, position }) {
    const histogramCount = flow.getNodes().reduce((acc, item) => (item.type === "histogram" ? acc + 1 : acc), 1);

    return {
      id,
      position,
      type: "histogram",
      data: {
        name: "Histogram " + histogramCount.toString(),
        detailsTitle: "Histogram",
        status: "IDLE",
      },
    };
  },

  run() {},
};
