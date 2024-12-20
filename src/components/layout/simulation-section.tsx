import React from "react";
import { BiNoSignal, BiSolidChevronUp } from "react-icons/bi";
import { BarChart, IChartData } from "@/components/ui/bar-chart";
import { useLayoutContext } from "@/contexts/layout-context";
import { cls } from "@/utils/cls";
import { IHistogramNode } from "@/config/types";
import { sortBy } from "@/utils/sort-by";

type IProps = {
  histogramNodes: IHistogramNode[];
};

export const SimulationSection: React.ComponentType<IProps> = ({ histogramNodes }) => {
  const { simulationOpen, setSimulationOpen, asideDetailsOpen, sidebarWidth, asideDetailsWidth } = useLayoutContext();
  const [charts, setCharts] = React.useState<{ id: string; name: string; data: IChartData }[]>([]);

  function buildChart(node: IHistogramNode) {
    const chartData: IChartData = node.data.state.reduce((acc, item) => {
      const existingEntry = acc.find((entry) => entry.x === item.toString());
      if (existingEntry) existingEntry.y += 1;
      else acc.push({ x: item.toString(), y: 1 });

      return acc;
    }, [] as IChartData);

    const sortedChartData = sortBy(chartData, "x", "asc");
    setCharts((prevCharts) => [...prevCharts, { id: "chart_" + node.id, name: node.data.name, data: sortedChartData }]);
  }

  React.useEffect(() => {
    histogramNodes.forEach((node) => buildChart(node));
  }, [histogramNodes]);

  return (
    <div
      className="absolute transform -translate-x-1/2  h-[450px] max-w-[900px] bg-white border-t-2 border-blue-700 border-x border-x-gray-300 flex flex-col z-10 transition-all duration-300"
      style={{
        left: `calc(${sidebarWidth}px + (100vw - ${sidebarWidth}px - ${asideDetailsOpen ? asideDetailsWidth : 0}px) / 2)`,
        width: `calc(100vw - ${(asideDetailsOpen ? asideDetailsWidth : 0) + sidebarWidth + 64}px)`,
        top: simulationOpen ? "calc(100vh - 450px)" : "calc(100vh - 24px)",
      }}>
      <button
        className="h-6 w-full bg-blue-200 flex justify-center items-center text-xl hover:bg-blue-300"
        title={simulationOpen ? "Hide section" : "Show section"}
        onClick={() => setSimulationOpen(!simulationOpen)}>
        <BiSolidChevronUp className={cls({ "transform rotate-180": simulationOpen, "transition-transform duration-700": true })} />
      </button>

      <div className="w-full h-full flex-1 overflow-auto flex flex-col items-center p-4 gap-2">
        {!charts.length && (
          <div className="flex flex-col h-full items-center justify-center text-gray-400">
            <BiNoSignal className="text-7xl" />

            <h2 className="text-center">No histograms found to display, try to run another connection</h2>
          </div>
        )}

        {charts.map((chart) => (
          <div key={chart.id} className="w-full flex flex-col items-center">
            <h3 className="pl-2 font-medium">{chart.name}</h3>
            <BarChart data={chart.data} />
          </div>
        ))}
      </div>
    </div>
  );
};
