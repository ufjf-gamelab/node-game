import React from "react";
import { useReactFlow } from "@xyflow/react";
import { NodeManager } from "@/utils/node-manager";
import { waitAsync } from "@/utils/waitAsync";
import { IChart, IEdge, IHistogramNode, INode } from "@/config/types";

interface UIStateContextProps {
  loading: boolean;
  runSimulation: () => Promise<void>;
  clearSimulation: () => void;
  charts: IChart[];
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
        const chartData = NodeManager.run(histogram, flow);
        newCharts.push({ id: "chart_" + histogram.id, name: histogram.data.name, data: chartData });
      } catch (error) {
        alert("Error building chart!");
        console.error("Error building chart", error);
        setLoading(false);
      }
    });

    await waitAsync(500);

    flow
      .getNodes()
      .filter((node) => node.data.status === "LOADING" && node.type !== "histogram")
      .forEach((node) => {
        try {
          NodeManager.run(node, flow);
        } catch (error) {
          console.log("Error running node", error);
        }
      });

    setCharts(newCharts);
    setLoading(false);
  }

  function clearSimulation() {
    setCharts([]);
    const nodes = flow.getNodes();
    nodes.forEach((node) => flow.updateNodeData(node.id, { ...node.data, status: "IDLE" }));
  }

  return <LayoutContent.Provider value={{ loading, runSimulation, clearSimulation, charts }}>{children}</LayoutContent.Provider>;
};

export const useSimulationContext = (): UIStateContextProps => {
  const context = React.useContext(LayoutContent);
  if (context === undefined) {
    throw new Error("useUIState must be used within a SimulationProvider");
  }
  return context;
};
