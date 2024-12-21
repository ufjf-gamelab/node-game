import React from "react";
import { useOnSelectionChange } from "@xyflow/react";
import { DiceSuccessDetails } from "@/features/dice-success";
import { BaseNodeDetails } from "@/components/ui/base-node-details";
import { DiceGeneratorDetails } from "@/features/dice-generator";
import { DiceBetweenIntervalDetails } from "@/features/dice-between-interval";
import { DiceExplodeGeneratorDetails } from "@/features/dice-explode-generator";
import { DiceCountRepetitionDetails } from "@/features/dice-count-repetition";
import { BagGeneratorDetails } from "@/features/bag-generator";
import { SymbolicGeneratorDetails } from "@/features/symbolic-generator";
import { INode } from "@/config/types";
import { useLayoutContext } from "@/contexts/layout-context";

function renderDetails(node: INode) {
  switch (node.type) {
    case "diceGenerator":
      return <DiceGeneratorDetails node={node} key={node.id} />;
    case "diceSuccess":
      return <DiceSuccessDetails node={node} key={node.id} />;
    case "diceBetweenInterval":
      return <DiceBetweenIntervalDetails node={node} key={node.id} />;
    case "diceCountRepetition":
      return <DiceCountRepetitionDetails node={node} key={node.id} />;
    case "diceExplodeGenerator":
      return <DiceExplodeGeneratorDetails node={node} key={node.id} />;
    case "bagGenerator":
      return <BagGeneratorDetails node={node} key={node.id} />;
    case "symbolicGenerator":
      return <SymbolicGeneratorDetails node={node} key={node.id} />;
    default:
      return <BaseNodeDetails node={node} key={node.id} />;
  }
}

export const AsideDetails: React.FunctionComponent = () => {
  const [selectedNode, setSelectedNode] = React.useState<INode | null>(null);
  const layoutContext = useLayoutContext();

  useOnSelectionChange({ onChange: React.useCallback(({ nodes }) => setSelectedNode((nodes[0] as INode) || null), []) });

  React.useEffect(() => {
    layoutContext.setAsideDetailsOpen(!!selectedNode);
  }, [selectedNode]);

  if (!selectedNode) return null;
  return <div className="fixed right-0 top-0 h-screen bg-white z-20 w-60 border-l text-sm">{renderDetails(selectedNode)}</div>;
};
