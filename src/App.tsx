import { GiPerspectiveDiceOne, GiNetworkBars, GiSwapBag, GiPlayButton, GiSaveArrow } from "react-icons/gi";
import { Background, BackgroundVariant, Connection, Edge, MiniMap, Node, ReactFlow, addEdge, useEdgesState, useNodesState } from "@xyflow/react";
import { useCallback } from "react";
import "@xyflow/react/dist/style.css";

const initialNodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: -100, y: 100 }, data: { label: "2" } },
  { id: "3", position: { x: 0, y: 200 }, data: { label: "3" } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e1-3", source: "1", target: "3" },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div className="relative">
      <div className="absolute z-10 top-2 right-2 w-full h-7 flex items-center justify-end gap-4 overflow-hidden">
        <button className="btn h-full w-max rounded-full !border-0">view results</button>
        <button className="btn h-full w-max rounded-full !border-0">clear board</button>
      </div>

      <div className="absolute z-10 text-white px-4  gap-2  cursor-pointer top-14  left-10 flex flex-col text-sm bg-gray-700">
        <span> Nó gerador</span>
        <span> Nó pool</span>
      </div>

      <aside className="text-gray-50 text-[28px] absolute z-10 top-12 rounded-full left-2 bg-gray-600 h-[calc(100vh-120px)] w-7 flex flex-col">
        <button className="w-full hover:bg-gray-700 flex justify-center items-center h-14 border-b-2 border-gray-400 px-1" title="Dice">
          <GiPerspectiveDiceOne />
        </button>

        <button className="w-full hover:bg-gray-700 flex justify-center items-center h-14 border-b-2 border-gray-400 px-1" title="Bag">
          <GiSwapBag />
        </button>
        <button className="w-full hover:bg-gray-700 flex justify-center items-center h-14 border-b-2 border-gray-400 px-1" title="Methods">
          <GiPlayButton />
        </button>
        <button className="w-full hover:bg-gray-700 flex justify-center items-center h-14 border-b-2 border-gray-400 px-1" title="Graphs">
          <GiNetworkBars />
        </button>

        <button className="mt-auto w-full hover:bg-gray-700 flex justify-center items-center h-14 border-t border-gray-400 px-1" title="Histogram">
          <GiSaveArrow />
        </button>
      </aside>

      <main className="w-screen h-screen">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
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
