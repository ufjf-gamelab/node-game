import React from "react";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { IDiceSumNode, INode, INodeType } from "@/config/types";
import { NodeContainer } from "@/components/ui/node-container";
import { NodeStatus } from "@/components/ui/node-status";

type IProps = NodeProps<IDiceSumNode>;

export const DiceSubtractNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }: IProps) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = [
      "histogram",
      "diceSum",
      "diceSubtract",
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
      <Handle type="target" position={Position.Left} id={"sub-target-1" + id} className="top-6" isConnectable={isConnectable} />
      <Handle type="target" position={Position.Left} id={"sub-target-2" + id} className="top-16" isConnectable={isConnectable} />
      <Handle
        type="source"
        id={"c" + id}
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
      <h2 className="text-center">Dice Subtract</h2>

      <div className="flex items-center justify-center text-5xl">
        <GiPerspectiveDiceSixFacesOne />
        <span className="text-base">-</span>
        <GiPerspectiveDiceSixFacesOne />
      </div>

      <NodeStatus status={data.status} />
    </NodeContainer>
  );
};
