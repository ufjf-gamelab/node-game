import React from "react";
import { NodeManager } from "@/utils/node-manager";
import { useOnSelectionChange } from "@xyflow/react";
import { useLayoutContext } from "@/contexts/layout-context";
import { BaseNodeDetails } from "@/components/ui/base-node-details";
import { INode } from "@/config/types";

export const AsideDetails: React.FunctionComponent = () => {
  const [selectedNode, setSelectedNode] = React.useState<INode | null>(null);
  const layoutContext = useLayoutContext();

  useOnSelectionChange({ onChange: React.useCallback(({ nodes }) => setSelectedNode((nodes[0] as INode) || null), []) });

  React.useEffect(() => {
    layoutContext.setAsideDetailsOpen(!!selectedNode);
  }, [selectedNode]);

  if (!selectedNode) return null;
  return <div className="fixed right-0 top-0 h-screen bg-white z-20 w-60 border-l text-sm">{renderNodeDetails(selectedNode)}</div>;
};

function renderNodeDetails(node: INode) {
  const Component = (NodeManager.getDetails(node) || BaseNodeDetails) as React.FunctionComponent<{ node: INode }>;
  return <Component node={node} key={node.id} />;
}
