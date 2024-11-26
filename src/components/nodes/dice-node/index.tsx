import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { NodeStatus } from "@/components/ui/node-status";
import { NodeContainer } from "@/components/ui/node-container";
import { IDiceNode } from "@/config/types";

type IProps = NodeProps<IDiceNode>;

export const DiceNode: React.ComponentType<IProps> = (props) => {
  return (
    <NodeContainer selected={props.selected} title={props.data.generator.label}>
      <Handle type="source" position={Position.Right} isConnectable={props.isConnectable} />

      <div className="flex flex-col items-center text-base">
        <h2>Dice</h2>

        <GiPerspectiveDiceSixFacesOne className="text-5xl" />

        <span>
          {props.data.generator.min}-{props.data.generator.max}
        </span>

        <NodeStatus status={props.data.generator.status} />
      </div>
    </NodeContainer>
  );
};
