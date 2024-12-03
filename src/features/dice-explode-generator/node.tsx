import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { NodeContainer } from "@/components/ui/node-container";
import { GiDiceTarget, GiRollingDiceCup } from "react-icons/gi";
import { NodeStatus } from "@/components/ui/node-status";
import { TiArrowLoop } from "react-icons/ti";
import { IDiceCountRepetition } from "@/config/types";

type IProps = NodeProps<IDiceCountRepetition>;

export const DiceExplodeGeneratorNode: React.ComponentType<IProps> = ({ data, selected, isConnectable }) => {
  return (
    <NodeContainer selected={selected}>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />

      <div className="flex flex-col items-center w-max">
        <h2 className="text-base max-w-24 break-words text-center w-max">{data.name}</h2>

        <div className="flex justify-center items-center text-5xl">
          <GiRollingDiceCup className="text-4xl" />
          <GiDiceTarget />
          <TiArrowLoop className="text-4xl" />
        </div>

        <NodeStatus status={data.status} />
      </div>
    </NodeContainer>
  );
};
