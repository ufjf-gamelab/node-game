import React from "react";
import { Background, BackgroundVariant, Connection, ReactFlow, addEdge, useEdgesState, useNodesState, useReactFlow, MarkerType } from "@xyflow/react";
import { NodeManager } from "@/utils/node-manager";
import { Sidebar } from "@/components/layout/sidebar";
import { TaskBar } from "./components/layout/task-bar";
import { AsideNodeProperties } from "@/components/layout/aside-node-properties";

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
      const targetAlreadyConnected = edges.some((edge) => edge.target === params.target && edge.targetHandle === params.targetHandle);
      if (targetAlreadyConnected) return;

      const existingEdges = edges.filter((edge) => edge.target === params.target && edge.targetHandle === params.targetHandle);
      if (existingEdges.length === 0) {
        setEdges((eds) =>
          addEdge(
            {
              ...params,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: "#00a63e",
              },
              style: { strokeWidth: 2 },
            },
            eds
          )
        );
      }
    },
    [edges, setEdges]
  );

  React.useEffect(() => {
    const dice = NodeManager.new("diceGenerator", flow);
    dice.position.x = 20;
    dice.position.y = 20;
    const betweenInterval = NodeManager.new("diceSuccess", flow);
    betweenInterval.position.x = 200;
    betweenInterval.position.y = 20;
    const histogram = NodeManager.new("histogram", flow);
    histogram.position.x = 400;
    histogram.position.y = 20;
    setNodes([dice, betweenInterval, histogram]);
    onConnect({ source: dice.id, target: betweenInterval.id, sourceHandle: null, targetHandle: null });
    onConnect({ source: betweenInterval.id, target: histogram.id, sourceHandle: null, targetHandle: null });
  }, []);

  return (
    <div className="relative">
      <Sidebar addNewNode={addNewNode} />
      <AsideNodeProperties />
      <TaskBar />

      <main className="w-screen h-screen">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={NodeManager.getNodeTypes()}
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
