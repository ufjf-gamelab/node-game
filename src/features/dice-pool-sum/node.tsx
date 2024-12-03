import React from "react";
import { GiRollingDices } from "react-icons/gi";
import { TbSum } from "react-icons/tb";
import { NodeStatus } from "@/components/ui/node-status";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { NodeContainer } from "@/components/ui/node-container";
import { IDicePoolSumNode } from "@/config/types";

type IProps = NodeProps<IDicePoolSumNode>;

export const DicePoolSumNode: React.ComponentType<IProps> = ({ data, isConnectable, selected }) => {
  return (
    <NodeContainer selected={selected}>
      <Handle type="target" position={Position.Left} id="pool-sum-target" isConnectable={isConnectable} />

      <Handle type="source" id="pool-sum-source" position={Position.Right} className="bg=" isConnectable={isConnectable} />

      <div className="flex flex-col items-center">
        <h2 className="text-base">{data.name}</h2>

        <div className="flex text-5xl items-center justify-center">
          <TbSum className="text-4xl" />
          <GiRollingDices />
        </div>

        <NodeStatus status={data.status} />
      </div>
    </NodeContainer>
  );
};
