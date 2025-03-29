import React from "react";
import { Handle, Position, NodeProps, useReactFlow } from "@xyflow/react";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { NodeStatus } from "@/components/ui/node-status";
import { NodeContainer } from "@/components/ui/node-container";
import { IDiceGeneratorNode, INode, INodeType } from "@/config/types";

type IProps = NodeProps<IDiceGeneratorNode>;

export const DiceGeneratorNode: React.ComponentType<IProps> = ({ data, selected, isConnectable }) => {
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
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />

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
