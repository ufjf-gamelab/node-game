import React from "react";
import { NodeProps, Position } from "@xyflow/react";
import { GiRollingDices } from "react-icons/gi";
import { IDicePoolNode } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";
import { NodeHandle } from "@/components/ui/node-handle";

type IProps = NodeProps<IDicePoolNode>;

export const DicePoolNode: React.ComponentType<IProps> = ({ data, isConnectable, selected, id }) => {
  return (
    <BaseNode selected={selected} name={data.name} status={data.status} icon={<GiRollingDices />}>
      <NodeHandle
        id={"pool-target-1-" + id}
        type="target"
        dataType={data.inputType}
        className="top-6"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <NodeHandle
        id={"pool-target-2-" + id}
        type="target"
        dataType={data.inputType}
        className="top-16"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <NodeHandle id={"pool-source-" + id} type="source" dataType={data.outputType} position={Position.Right} isConnectable={isConnectable} />
    </BaseNode>
  );
};
