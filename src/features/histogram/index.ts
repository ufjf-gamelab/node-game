import { HistogramDetails } from "./details";
import { HistogramNode } from "./node";
import { HistogramService } from "./service";

export const Histogram = {
  component: HistogramNode,
  service: HistogramService,
  details: HistogramDetails,
};
