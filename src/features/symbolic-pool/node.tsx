import React from "react";
import { NodeProps, Position } from "@xyflow/react";
import { GiRollingDices } from "react-icons/gi";
import { VscSymbolString } from "react-icons/vsc";
import { ISymbolicPoolNode } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";
import { NodeHandle } from "@/components/ui/node-handle";

type IProps = NodeProps<ISymbolicPoolNode>;

export const SymbolicPoolNode: React.ComponentType<IProps> = ({ data, isConnectable, selected, id }) => {
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
        dataType={data.inputType}
        className="top-6"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <NodeHandle
        id={"symbolic-pool-target-2-" + id}
        type="target"
        dataType={data.inputType}
        className="top-16"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <NodeHandle
        id={"symbolic-pool-source-" + id}
        type="source"
        dataType={data.outputType}
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </BaseNode>
  );
};
