import React from "react";

import { NodeProps, Position, Handle, useReactFlow } from "@xyflow/react";

import { GiRollingDices } from "react-icons/gi";

import { IDicePoolNode, INode, INodeType } from "@/config/types";
import { NodeStatus } from "@/components/ui/node-status";
import { NodeContainer } from "@/components/ui/node-container";

type IProps = NodeProps<IDicePoolNode>;

export const DicePoolNode: React.ComponentType<IProps> = ({ data, isConnectable, selected }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = [
      "dicePool",
      "diceSum",
      //  "poolSumNode", "faceBetweenNode", "countRepeatedNode"
    ];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <NodeContainer selected={selected}>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="top-5" />
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="bottom-5" />

      <div className="flex flex-col items-center">
        <h2 className="text-base">{data.name}</h2>

        <GiRollingDices className="text-5xl" />
        <NodeStatus status={data.status} />
      </div>
    </NodeContainer>
  );
};
