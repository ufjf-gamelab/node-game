import React from "react";
import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import { GiRollingDices } from "react-icons/gi";
import { VscSymbolString } from "react-icons/vsc";
import { IDicePoolNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";
import { NodeHandle } from "@/components/ui/node-handle";

type IProps = NodeProps<IDicePoolNode>;

export const SymbolicPoolNode: React.ComponentType<IProps> = ({ data, isConnectable, selected, id }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = ["histogram"];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <BaseNode
      selected={selected}
      name={data.name}
      status={data.status}
      icon={
        <>
          <GiRollingDices className="text-5xl" />
          <VscSymbolString className="text-2xl" />
        </>
      }>
      <NodeHandle
        id={"symbolic-pool-target-1-" + id}
        type="target"
        dataType="symbolic"
        position={Position.Left}
        isConnectable={isConnectable}
        className="top-8"
      />
      <NodeHandle
        id={"symbolic-pool-target-2-" + id}
        type="target"
        dataType="symbolic"
        position={Position.Left}
        isConnectable={isConnectable}
        className="top-16"
      />

      <NodeHandle
        id={"symbolic-pool-source-" + id}
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={isValidConnection}
      />
    </BaseNode>
  );
};
