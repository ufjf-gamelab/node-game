import { IHistogramNode, INode } from "@/config/types";
import React from "react";
import { BarChart, IChartData } from "../ui/bar-chart";
import { useReactFlow } from "@xyflow/react";
import { BiArrowToBottom } from "react-icons/bi";
import { useLayoutContext } from "@/contexts/layout-context";

const DETAILS_WIDTH = 240;
const SIDEBAR_WIDTH = 192;

const SimulationSection: React.ComponentType = () => {
  const flow = useReactFlow<INode>();
  const [dataChart, setDataChart] = React.useState<IChartData>([]);
  const layoutContext = useLayoutContext();

  function getIndex(chartData: IChartData, item: number) {
    const index = chartData.findIndex((entry) => entry.x === item.toString());
    return index !== -1 ? index : chartData.length;
  }

  function buildChart(node: IHistogramNode) {
    let edge = flow.getEdges().find((ed) => ed.target === node.id);
    if (!edge) return;

    const sourceNode = flow.getNode(edge.source);
    if (!sourceNode) return;

    prepareData(node.data.state);
  }

  function prepareData(state: number[]) {
    try {
      const newDataChart: { x: string; y: number }[] = [];

      state.forEach((item) => {
        const index = getIndex(newDataChart, item);

        newDataChart[index] = {
          x: item.toString(),
          y: newDataChart[index]?.y ? newDataChart[index]?.y + 1 : 1,
        };
      });

      newDataChart.sort((a, b) => {
        if (a.x > b.x) return 1;
        if (a.x < b.x) return -1;
        return 0;
      });
      setDataChart(newDataChart);
    } catch (error) {
      console.warn(error);
    }
  }

  React.useEffect(() => {
    const histogramNode = flow.getNodes().filter((node) => node.type === "histogram" && node.data.status === "FINISHED") as IHistogramNode[];
    if (histogramNode[0]) buildChart(histogramNode[0]);
  }, []);

  return (
    <div
      className="absolute transform -translate-x-1/2 top-[calc(100vh-450px)] h-[450px] max-w-[900px] bg-white border-t-2 border-blue-700 flex flex-col z-10 transition-all"
      style={{
        left: `calc(${SIDEBAR_WIDTH}px + (100vw - ${SIDEBAR_WIDTH}px - ${layoutContext.asideDetailsOpen ? DETAILS_WIDTH : 0}px) / 2)`,
        width: `calc(100vw - ${(layoutContext.asideDetailsOpen ? DETAILS_WIDTH : 0) + SIDEBAR_WIDTH + 64}px)`,
      }}>
      <button className="h-6 w-full bg-blue-200 flex justify-center items-center">
        <BiArrowToBottom />
      </button>

      <div className="w-full h-full flex-1 overflow-auto flex flex-col items-center p-4 gap-2">
        <div className="w-full flex flex-col items-center">
          <h2 className="pl-2 font-medium">Histogram</h2>
          <BarChart data={dataChart} />
        </div>
        <hr className="w-full border-t-4 border-gray-400" />

        <div className="w-full flex flex-col items-center">
          <h2 className="pl-2 font-medium">Histogram</h2>
          <BarChart data={dataChart} />
        </div>
      </div>
    </div>
  );
};

export { SimulationSection };
