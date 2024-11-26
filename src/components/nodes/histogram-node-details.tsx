import { IHistogramNode } from "@/config/types";
import { useReactFlow } from "@xyflow/react";

import React from "react";
import { useDebounce } from "react-use";

export const HistogramNodeDetails: React.FunctionComponent<{ node: IHistogramNode }> = ({ node }) => {
  const flow = useReactFlow();
  const [title, setTitle] = React.useState(node.data.title);

  useDebounce(() => flow.setNodes(flow.getNodes()), 500, [title]);

  return (
    <div>
      <div className="border-b border-gray-300 py-4 text-xl px-4 mb-8">
        <h2>Histogram Node</h2>
      </div>

      <div className="flex flex-col gap-2 px-4">
        <div className="flex justify-between items-center gap-4">
          <h5>Titulo:</h5>

          <input
            placeholder="Título do histograma"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              node.data.title = e.target.value;
            }}
          />
        </div>

        <h5>status: {node.data.status.replaceAll("_", " ")}</h5>
      </div>
    </div>
  );
};
