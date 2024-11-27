import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { NodeStatus } from "@/components/ui/node-status";
import { NodeContainer } from "@/components/ui/node-container";
import { IDiceGeneratorNode } from "@/config/types";

type IProps = NodeProps<IDiceGeneratorNode>;

export const DiceGeneratorNode: React.ComponentType<IProps> = ({ data, selected, isConnectable }) => {
  return (
    <NodeContainer selected={selected}>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />

      <div className="flex flex-col items-center text-base">
        <h2>{data.name}</h2>

        <GiPerspectiveDiceSixFacesOne className="text-5xl" />

        <span>
          {data.min}-{data.max}
        </span>

        <NodeStatus status={data.status} />
      </div>
    </NodeContainer>
  );
};
