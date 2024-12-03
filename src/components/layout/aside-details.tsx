import React from "react";
import { useOnSelectionChange } from "@xyflow/react";
import { INode } from "@/config/types";
import { DiceGeneratorDetails } from "@/features/dice-generator";
import { DiceSuccessDetails } from "@/features/dice-success";
import { BaseNodeDetails } from "../ui/base-node-details";
import { DiceBetweenIntervalDetails } from "@/features/dice-between-interval";
import { DiceExplodeGeneratorDetails } from "@/features/dice-explode-generator";
import { DiceCountRepetitionDetails } from "@/features/dice-count-repetition";

function renderDetails(node: INode) {
  switch (node.type) {
    case "diceGenerator":
      return <DiceGeneratorDetails node={node} />;
    case "diceSuccess":
      return <DiceSuccessDetails node={node} />;
    case "diceBetweenInterval":
      return <DiceBetweenIntervalDetails node={node} />;
    case "diceCountRepetition":
      return <DiceCountRepetitionDetails node={node} />;
    case "diceExplodeGenerator":
      return <DiceExplodeGeneratorDetails node={node} />;
    default:
      return <BaseNodeDetails node={node} />;
  }
}

export const AsideDetails: React.FunctionComponent = () => {
  const [selectedNode, setSelectedNode] = React.useState<INode | null>(null);

  useOnSelectionChange({ onChange: React.useCallback(({ nodes }) => setSelectedNode((nodes[0] as INode) || null), []) });

  if (!selectedNode) return null;
  return <div className="fixed right-0 top-0 h-screen bg-white z-20 w-60 border-l text-sm">{renderDetails(selectedNode)}</div>;
};
