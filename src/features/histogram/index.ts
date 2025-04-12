import { HistogramProperties } from "./properties";
import { HistogramNode } from "./node";
import { HistogramService } from "./service";

export const Histogram = {
  component: HistogramNode,
  service: HistogramService,
  properties: HistogramProperties,
};
