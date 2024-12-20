import React from "react";
import { Background, BackgroundVariant, Connection, ReactFlow, addEdge, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import { Sidebar } from "@/components/layout/sidebar";
import { AsideDetails } from "@/components/layout/aside-details";
import { NodeFactory } from "@/utils/node-factory";

import { INodeType, INode, IEdge, IHistogramNode } from "@/config/types";
import { NODE_TYPES } from "@/config/constants";
import { BiPlay, BiTrash } from "react-icons/bi";
import { SimulationSection } from "./components/layout/simulation-section";

function App() {
  const flow = useReactFlow<INode, IEdge>();
  const [edges, setEdges, onEdgesChange] = useEdgesState<IEdge>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState<INode>([]);
  const [finishedHistograms, setFinishedHistograms] = React.useState<IHistogramNode[]>([]);

  function addNewNode(type: INodeType) {
    setNodes([...nodes, NodeFactory.new(type, flow)]);
  }

  const onConnect = React.useCallback(
    (params: Connection) => {
      const existingEdges = edges.filter((edge) => edge.target === params.target && edge.targetHandle === params.targetHandle);
      if (existingEdges.length === 0) setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  function runSimulation() {
    nodes.map((node) => (node.data.status = "LOADING"));
    setNodes([...nodes]);

    nodes.forEach((node) => NodeFactory.run(node, flow));

    setNodes([...nodes]);
    setFinishedHistograms(nodes.filter((node) => node.type === "histogram" && node.data.status === "FINISHED") as IHistogramNode[]);
  }

  React.useEffect(() => {
    const dice = NodeFactory.new("diceGenerator", flow);
    dice.position.x = 20;
    dice.position.y = 20;
    const histogram = NodeFactory.new("histogram", flow);
    histogram.position.x = 200;
    histogram.position.y = 20;
    setNodes([dice, histogram]);
    setEdges([{ id: "init", source: dice.id, target: histogram.id }]);
  }, []);

  return (
    <div className="relative">
      <div className="absolute z-10 top-2 left-0 pl-56 w-screen h-7 flex items-center justify-start gap-4 overflow-hidden">
        <button className="btn h-full flex items-center w-max rounded-full !border-0" onClick={runSimulation}>
          <BiPlay /> Run simulation
        </button>
        <button className="btn h-full flex items-center w-max rounded-full !border-0">
          <BiTrash />
          Clear board
        </button>
      </div>

      <Sidebar addNewNode={addNewNode} />
      <AsideDetails />
      <SimulationSection histogramNodes={finishedHistograms} />

      <main className="w-screen h-screen">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={NODE_TYPES}
          deleteKeyCode={["Backspace", "Delete"]}
          className="react-flow-board"
          fitView>
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </main>
    </div>
  );
}

export default App;
