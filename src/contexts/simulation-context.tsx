import React from "react";
import { IChartData } from "@/components/ui/bar-chart";
import { IEdge, IHistogramNode, INode, INodeType } from "@/config/types";
import { NodeManager } from "@/utils/node-manager";
import { useReactFlow } from "@xyflow/react";
import { sortBy } from "@/utils/sort-by";
import { waitAsync } from "@/utils/waitAsync";

type IChart = { id: string; name: string; data: IChartData };

interface UIStateContextProps {
  loading: boolean;
  runSimulation: () => Promise<void>;
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
  const [loading, setLoading] = React.useState(false);

  async function runSimulation() {
    setLoading(true);
    const nodes = flow.getNodes();
    nodes.forEach((node) => flow.updateNodeData(node.id, { ...node.data, status: "LOADING" }));
    await waitAsync(200);

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

    await waitAsync(500);

    flow
      .getNodes()
      .filter((node) => node.data.status === "LOADING" && node.type !== "histogram")
      .forEach((node) => NodeManager.run(node, flow));

    setCharts(newCharts);
    setLoading(false);
  }

  function buildChart(histogramNode: IHistogramNode): IChart {
    const nodeState = NodeManager.run(histogramNode, flow);

    const successTypeNodes: INodeType[] = ["diceSuccess", "diceBetweenInterval"];
    const parentIsTypeSuccessNode = histogramNode.data.parentNodeType && successTypeNodes.includes(histogramNode.data.parentNodeType);

    const chartData: IChartData = nodeState.reduce((acc, item) => {
      let itemLabel = item.toString();
      if (parentIsTypeSuccessNode) itemLabel = item === 1 ? "Sucesso" : "Fracasso";

      const existingEntry = acc.find((entry) => entry.x === itemLabel);

      if (existingEntry) existingEntry.y += 1;
      else acc.push({ x: itemLabel, y: 1 });

      return acc;
    }, [] as IChartData);

    console.log("chartData", chartData);

    const sortedChartData = sortBy(chartData, "x", "asc");
    return { id: "chart_" + histogramNode.id, name: histogramNode.data.name, data: sortedChartData };
  }

  function clearSimulation() {
    setCharts([]);
    const nodes = flow.getNodes();
    nodes.forEach((node) => flow.updateNodeData(node.id, { ...node.data, status: "IDLE" }));
  }

  return <LayoutContent.Provider value={{ loading, runSimulation, clearSimulation, simulationCharts: charts }}>{children}</LayoutContent.Provider>;
};

export const useSimulationContext = (): UIStateContextProps => {
  const context = React.useContext(LayoutContent);
  if (context === undefined) {
    throw new Error("useUIState must be used within a SimulationProvider");
  }
  return context;
};
