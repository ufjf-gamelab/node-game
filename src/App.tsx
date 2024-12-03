import React from "react";
import { Background, BackgroundVariant, Connection, MiniMap, ReactFlow, addEdge, useEdgesState, useNodesState } from "@xyflow/react";
import { Sidebar } from "@/components/layout/sidebar";
import { AsideDetails } from "@/components/layout/aside-details";
import { nodeFactory } from "@/utils/node-factory";

import { INodeType, INode, IEdge } from "@/config/types";
import { NODE_TYPES } from "@/config/constants";

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<INode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<IEdge>([]);

  function addNewNode(type: INodeType) {
    setNodes([...nodes, nodeFactory(type, nodes)]);
  }

  const onConnect = React.useCallback(
    (params: Connection) => {
      const existingEdges = edges.filter((edge) => edge.target === params.target && edge.targetHandle === params.targetHandle);

      if (existingEdges.length === 0) setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  return (
    <div className="relative">
      <div className="absolute z-10 top-2 left-0 pl-56 w-full h-7 flex items-center justify-start gap-4 overflow-hidden">
        <button className="btn h-full w-max rounded-full !border-0">view results</button>
        <button className="btn h-full w-max rounded-full !border-0">clear board</button>
      </div>

      <Sidebar addNewNode={addNewNode} />
      <AsideDetails />

      <main className="w-screen h-screen">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={NODE_TYPES}
          fitView
          deleteKeyCode={["Backspace", "Delete"]}>
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          <MiniMap />
        </ReactFlow>
      </main>
    </div>
  );
}

export default App;
