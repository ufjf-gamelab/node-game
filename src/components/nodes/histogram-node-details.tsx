import { IHistogramNode } from "@/config/types";

import React from "react";

export const HistogramNodeDetails: React.FunctionComponent<{ node: IHistogramNode }> = ({ node }) => {
  const [title, setTitle] = React.useState(node.data.name);

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
            onBlur={() => {
              // flow.getNode(nodeId).data.histogramName = title;
              // console.log("nodes: ", flow.getNode(nodeId).data.histogramName);
              // flow.setNodes([...flow.getNodes()]);
            }}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <h5>status: {node.data.status.replaceAll("_", " ")}</h5>
      </div>
    </div>
  );
};
