import React from "react";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { GiGearStickPattern, GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { IDiceLogicalNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";

type IProps = NodeProps<IDiceLogicalNode>;

export const DiceLogicalNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }: IProps) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = ["histogram", "dicePool", "diceSuccess", "diceBetweenInterval", "diceCountRepetition"];

    return allowedTypes.includes(targetNode.type);
  }

  return (
    <BaseNode
      selected={selected}
      name={data.name}
      status={data.status}
      label={data.operation}
      icon={
        <>
          <GiPerspectiveDiceSixFacesOne className="text-5xl" />
          <GiGearStickPattern className="text-2xl -ml-1" />
        </>
      }>
      <Handle
        type="source"
        id={"logical-source-" + id}
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
      <Handle type="target" position={Position.Left} id={"logical-target-1-" + id} className="top-6" isConnectable={isConnectable} />
      <Handle type="target" position={Position.Left} id={"logical-target-2-" + id} className="top-16" isConnectable={isConnectable} />
    </BaseNode>
  );
};
