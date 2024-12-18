import { IHistogramNode, INode } from "@/config/types";
import React from "react";
import { BarChart, IChartData } from "../ui/bar-chart";
import { useReactFlow } from "@xyflow/react";
import { BiArrowToBottom } from "react-icons/bi";

const ASIDE_DETAILS_WIDTH = 240;
const SIDEBAR_WIDTH = 192;

const SimulationSection: React.ComponentType = () => {
  const flow = useReactFlow<INode>();
  const [dataChart, setDataChart] = React.useState<IChartData>([]);

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
      className="absolute left-56 top-[calc(100vh-500px)] h-[500px] bg-white border-t-2 border-slate-700 -10 flex flex-col z-10 overflow-auto"
      style={{ width: `calc(100vw - ${ASIDE_DETAILS_WIDTH + SIDEBAR_WIDTH + 64}px)` }}>
      <button className="h-6 w-full bg-gray-300 flex justify-center items-center">
        <BiArrowToBottom />
      </button>

      <BarChart data={dataChart} />
    </div>
  );
};

export { SimulationSection };
