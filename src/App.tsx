import React from "react";
import { Background, BackgroundVariant, Connection, ReactFlow, addEdge, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import { NodeManager } from "@/utils/node-manager";
import { Sidebar } from "@/components/layout/sidebar";
import { TaskBar } from "./components/layout/task-bar";
import { AsideDetails } from "@/components/layout/aside-details";
import { NODE_TYPES } from "@/config/constants";
import { INodeType, INode, IEdge } from "@/config/types";

function App() {
  const flow = useReactFlow<INode, IEdge>();
  const [edges, setEdges, onEdgesChange] = useEdgesState<IEdge>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState<INode>([]);

  function addNewNode(type: INodeType) {
    setNodes([...nodes, NodeManager.new(type, flow)]);
  }

  const onConnect = React.useCallback(
    (params: Connection) => {
      const existingEdges = edges.filter((edge) => edge.target === params.target && edge.targetHandle === params.targetHandle);
      if (existingEdges.length === 0) setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  React.useEffect(() => {
    const dice = NodeManager.new("diceGenerator", flow);
    dice.position.x = 20;
    dice.position.y = 20;
    const betweenInterval = NodeManager.new("diceBetweenInterval", flow);
    betweenInterval.position.x = 200;
    betweenInterval.position.y = 20;
    const histogram = NodeManager.new("histogram", flow);
    histogram.position.x = 400;
    histogram.position.y = 20;
    setNodes([dice, betweenInterval, histogram]);
    setEdges([
      { id: "1-2", source: dice.id, target: betweenInterval.id },
      { id: "2-3", source: betweenInterval.id, target: histogram.id },
    ]);
  }, []);

  return (
    <div className="relative">
      <Sidebar addNewNode={addNewNode} />
      <AsideDetails />
      <TaskBar />

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
