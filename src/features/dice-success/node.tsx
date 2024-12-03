import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { NodeContainer } from "@/components/ui/node-container";
import { IHistogramNode } from "@/config/types";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { NodeStatus } from "@/components/ui/node-status";
import { BsChevronBarUp, BsFillQuestionSquareFill } from "react-icons/bs";

type IProps = NodeProps<IHistogramNode>;

export const DiceSuccessNode: React.ComponentType<IProps> = ({ data, selected, isConnectable }) => {
  return (
    <NodeContainer selected={selected}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />

      <div className="flex flex-col items-center">
        <h2 className="text-base">{data.name}</h2>

        <div className="flex items-center justify-center text-5xl">
          <GiPerspectiveDiceSixFacesRandom />
          <BsChevronBarUp className="text-4xl" />
          <BsFillQuestionSquareFill className="text-4xl" />
        </div>

        <NodeStatus status={data.status} />
      </div>
    </NodeContainer>
  );
};
