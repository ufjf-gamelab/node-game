import React from "react";
import { NodeManager } from "@/utils/node-manager";
import { useOnSelectionChange } from "@xyflow/react";
import { useLayoutContext } from "@/contexts/layout-context";
import { BaseNodeProperties } from "@/components/ui/base-node-properties";
import { INode } from "@/config/types";

export const AsideNodeProperties: React.FunctionComponent = () => {
  const [selectedNode, setSelectedNode] = React.useState<INode | null>(null);
  const layoutContext = useLayoutContext();

  useOnSelectionChange({ onChange: React.useCallback(({ nodes }) => setSelectedNode((nodes[0] as INode) || null), []) });

  React.useEffect(() => {
    layoutContext.setAsidePropertiesOpen(!!selectedNode);
  }, [selectedNode]);

  if (!selectedNode) return null;
  return (
    <div className="fixed right-0 top-0 h-screen bg-white z-20 border-l text-sm" style={{ width: layoutContext.asidePropertiesWidth + "px" }}>
      {renderNodeProperties(selectedNode)}
    </div>
  );
};

function renderNodeProperties(node: INode) {
  const Component = (NodeManager.getProperties(node) || BaseNodeProperties) as React.FunctionComponent<{ node: INode }>;
  return <Component node={node} key={node.id} />;
}
