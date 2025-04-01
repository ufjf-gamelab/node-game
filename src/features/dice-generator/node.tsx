import React from "react";
import { Handle, Position, NodeProps, useReactFlow } from "@xyflow/react";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { IDiceGeneratorNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";

type IProps = NodeProps<IDiceGeneratorNode>;

export const DiceGeneratorNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = [
      "histogram",
      "diceMath",
      "dicePool",
      "dicePoolSum",
      "diceSuccess",
      "diceBetweenInterval",
      "diceCountRepetition",
      "diceAbsolute",
    ];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <BaseNode
      selected={selected}
      name={data.name}
      status={data.status}
      label={data.min + "-" + data.max}
      icon={<GiPerspectiveDiceSixFacesOne className="text-5xl" />}>
      <Handle
        type="source"
        id={"dice-gen-source-" + id}
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
    </BaseNode>
  );
};
