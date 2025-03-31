import React from "react";
import { Handle, Position, NodeProps, useReactFlow } from "@xyflow/react";
import { IDiceCountRepetitionNode, INode, INodeType } from "@/config/types";
import { GiDiceTarget } from "react-icons/gi";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { BaseNode } from "@/components/ui/base-node";

type IProps = NodeProps<IDiceCountRepetitionNode>;

export const DiceCountRepetitionNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = ["histogram"];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <BaseNode
      selected={selected}
      name={data.name}
      status={data.status}
      icon={
        <>
          <AiOutlineFieldNumber className="text-xl" />
          <GiDiceTarget />
        </>
      }>
      <Handle
        type="source"
        id={"count-source-" + id}
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
      <Handle type="target" id={"count-target-" + id} position={Position.Left} isConnectable={isConnectable} />
    </BaseNode>
  );
};
