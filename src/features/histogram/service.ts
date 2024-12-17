import { IHistogramNode, INodeService } from "@/config/types";

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
      },
    };
  },

  run() {},
};
