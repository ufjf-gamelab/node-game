import React from "react";
import { useOnSelectionChange } from "@xyflow/react";
import { DiceGeneratorDetails } from "@/features/dice-generator";
import { HistogramDetails } from "@/features/histogram";
import { DicePoolDetails } from "@/features/dice-pool";
import { DiceSumDetails } from "@/features/dice-sum";
import { INode } from "@/config/types";

export const AsideDetails: React.FunctionComponent = () => {
  const [selectedNode, setSelectedNode] = React.useState<INode | null>(null);

  useOnSelectionChange({ onChange: React.useCallback(({ nodes }) => setSelectedNode((nodes[0] as INode) || null), []) });

  if (!selectedNode) return null;
  return (
    <div className="fixed right-0 top-0 h-screen bg-white z-20 w-60 border-l text-sm">
      {selectedNode.type === "diceGenerator" && <DiceGeneratorDetails node={selectedNode} />}
      {selectedNode.type === "diceSum" && <DiceSumDetails node={selectedNode} />}
      {selectedNode.type === "histogram" && <HistogramDetails node={selectedNode} />}
      {selectedNode.type === "dicePool" && <DicePoolDetails node={selectedNode} />}
    </div>
  );
};
