import React from "react";
import { IChartData } from "@/components/ui/bar-chart";
import { IEdge, IHistogramNode, INode } from "@/config/types";
import { NodeFactory } from "@/utils/node-factory";
import { useReactFlow } from "@xyflow/react";
import { sortBy } from "@/utils/sort-by";

type IChart = { id: string; name: string; data: IChartData };

interface UIStateContextProps {
  runSimulation: () => void;
  clearSimulation: () => void;
  simulationCharts: IChart[];
}

const LayoutContent = React.createContext<UIStateContextProps | undefined>(undefined);

interface UIStateProviderProps {
  children: React.ReactNode;
}

export const SimulationProvider: React.ComponentType<UIStateProviderProps> = ({ children }) => {
  const flow = useReactFlow<INode, IEdge>();
  const [charts, setCharts] = React.useState<IChart[]>([]);

  function runSimulation() {
    const nodes = flow.getNodes();
    nodes.forEach((node) => flow.updateNodeData(node.id, { ...node.data, status: "LOADING" }));

    const newCharts: IChart[] = [];
    const histogramsNode = nodes.filter((node) => node.type === "histogram") as IHistogramNode[];

    histogramsNode.forEach((histogram) => {
      try {
        const chart = buildChart(histogram);
        newCharts.push(chart);
      } catch (error) {
        console.error("Error building chart", error);
      }
    });

    setCharts(newCharts);
  }

  function buildChart(node: IHistogramNode): IChart {
    const nodeState = NodeFactory.run(node, flow);

    const chartData: IChartData = nodeState.reduce((acc, item) => {
      const existingEntry = acc.find((entry) => entry.x === item.toString());
      if (existingEntry) existingEntry.y += 1;
      else acc.push({ x: item.toString(), y: 1 });

      return acc;
    }, [] as IChartData);

    const sortedChartData = sortBy(chartData, "x", "asc");
    return { id: "chart_" + node.id, name: node.data.name, data: sortedChartData };
  }

  function clearSimulation() {
    setCharts([]);
    const nodes = flow.getNodes();
    nodes.forEach((node) => flow.updateNodeData(node.id, { ...node.data, status: "IDLE" }));
  }

  return <LayoutContent.Provider value={{ runSimulation, clearSimulation, simulationCharts: charts }}>{children}</LayoutContent.Provider>;
};

export const useSimulationContext = (): UIStateContextProps => {
  const context = React.useContext(LayoutContent);
  if (context === undefined) {
    throw new Error("useUIState must be used within a SimulationProvider");
  }
  return context;
};
