import React from "react";
import { ActionBar } from "./action-bar";
import { SimulationCharts } from "./simulation-charts";
import { useSimulationContext } from "@/contexts/simulation-context";

const TaskBar: React.FC = () => {
  const { charts, loading, runSimulation, clearSimulation } = useSimulationContext();

  return (
    <>
      <ActionBar loading={loading} runSimulation={runSimulation} clearSimulation={clearSimulation} />
      <SimulationCharts charts={charts} />
    </>
  );
};

export { TaskBar };
