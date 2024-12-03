import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { NodeContainer } from "@/components/ui/node-container";
import { IHistogramNode } from "@/config/types";
import { GiHistogram } from "react-icons/gi";
import { NodeStatus } from "@/components/ui/node-status";

type IProps = NodeProps<IHistogramNode>;

export const DiceSuccessNode: React.ComponentType<IProps> = ({ data, selected, isConnectable }) => {
  return (
    <NodeContainer selected={selected}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />

      <div className="flex flex-col items-center">
        <h2 className="text-base">{data.name}</h2>

        <GiHistogram className="text-5xl" />
        <NodeStatus status={data.status} />
      </div>
    </NodeContainer>
  );
};
