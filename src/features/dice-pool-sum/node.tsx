import React from "react";
import { GiRollingDices } from "react-icons/gi";
import { TbSum } from "react-icons/tb";
import { NodeStatus } from "@/components/ui/node-status";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { NodeContainer } from "@/components/ui/node-container";
import { IDicePoolSumNode, INode, INodeType } from "@/config/types";

type IProps = NodeProps<IDicePoolSumNode>;

export const DicePoolSumNode: React.ComponentType<IProps> = ({ data, isConnectable, selected }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = [
      "histogram",
      "diceSum",
      "dicePool",
      "dicePoolSum",
      "diceSuccess",
      "diceBetweenInterval",
      "diceCountRepetition",
    ];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <NodeContainer selected={selected}>
      <Handle
        type="source"
        id="pool-sum-source"
        position={Position.Right}
        className="bg="
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
      <Handle type="target" position={Position.Left} id="pool-sum-target" isConnectable={isConnectable} />

      <div className="flex flex-col items-center">
        <h2 className="text-base">{data.name}</h2>

        <div className="flex text-5xl items-center justify-center">
          <TbSum />
          <GiRollingDices className="text-4xl" />
        </div>

        <NodeStatus status={data.status} />
      </div>
    </NodeContainer>
  );
};
