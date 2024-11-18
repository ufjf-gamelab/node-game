import React from "react";
import { useOnSelectionChange } from "@xyflow/react";
import { DiceNodeDetails } from "@/components/nodes/dice-node-details";
import { HistogramNodeDetails } from "@/components/nodes/histogram-node-details";
import { INode } from "@/config/types";

export const AsideDetails: React.FunctionComponent = () => {
  const [selectedNode, setSelectedNode] = React.useState<INode | null>(null);

  useOnSelectionChange({ onChange: React.useCallback(({ nodes }) => setSelectedNode((nodes[0] as INode) || null), []) });

  if (!selectedNode) return null;

  return (
    <div className="fixed right-0 top-0 h-screen bg-white z-20 w-60 border-l text-sm">
      {selectedNode.type === "dice" && <DiceNodeDetails node={selectedNode} />}
      {selectedNode.type === "histogram" && <HistogramNodeDetails node={selectedNode} />}
    </div>
  );
};
