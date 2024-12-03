import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { AiOutlineVerticalAlignMiddle } from "react-icons/ai";
import { NodeContainer } from "@/components/ui/node-container";
import { NodeStatus } from "@/components/ui/node-status";
import { IDiceBetweenInterval } from "@/config/types";

type IProps = NodeProps<IDiceBetweenInterval>;

export const DiceBetweenIntervalNode: React.ComponentType<IProps> = ({ data, selected, isConnectable }) => {
  return (
    <NodeContainer selected={selected}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />

      <div className="flex flex-col items-center">
        <h2 className="text-base text-center max-w-24">{data.name}</h2>

        <div className="flex text-5xl items-center justify-center">
          <GiPerspectiveDiceSixFacesRandom />
          <AiOutlineVerticalAlignMiddle className="text-4xl" />
        </div>
        <NodeStatus status={data.status} />
      </div>
    </NodeContainer>
  );
};
