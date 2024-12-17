import React from "react";
import { Handle, Position, NodeProps, useReactFlow } from "@xyflow/react";
import { NodeContainer } from "@/components/ui/node-container";
import { IDiceCountRepetitionNode, INode, INodeType } from "@/config/types";
import { GiDiceTarget } from "react-icons/gi";
import { NodeStatus } from "@/components/ui/node-status";
import { AiOutlineFieldNumber } from "react-icons/ai";

type IProps = NodeProps<IDiceCountRepetitionNode>;

export const DiceCountRepetitionNode: React.ComponentType<IProps> = ({ data, selected, isConnectable }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = ["histogram"];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <NodeContainer selected={selected}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />

      <div className="flex flex-col items-center w-max">
        <h2 className="text-base max-w-24 break-words text-center w-max">{data.name}</h2>

        <div className="flex justify-center items-center text-5xl">
          <AiOutlineFieldNumber className="text-3xl" />
          <GiDiceTarget />
        </div>

        <NodeStatus status={data.status} />
      </div>
    </NodeContainer>
  );
};
