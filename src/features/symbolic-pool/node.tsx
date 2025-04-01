import React from "react";
import { NodeProps, Position, Handle, useReactFlow } from "@xyflow/react";
import { GiRollingDices } from "react-icons/gi";
import { VscSymbolString } from "react-icons/vsc";
import { IDicePoolNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";

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
      <Handle
        type="source"
        id={"symbolic-pool-source-" + id}
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
      <Handle type="target" id={"symbolic-pool-target-1-" + id} position={Position.Left} isConnectable={isConnectable} className="top-8" />
      <Handle type="target" id={"symbolic-pool-target-2-" + id} position={Position.Left} isConnectable={isConnectable} className="top-16" />
    </BaseNode>
  );
};
