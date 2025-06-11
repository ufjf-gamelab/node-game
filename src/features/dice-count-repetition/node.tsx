import React from "react";
import { Position, NodeProps, useReactFlow } from "@xyflow/react";
import { IDiceCountRepetitionNode, INode, INodeType } from "@/config/types";
import { GiDiceTarget } from "react-icons/gi";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { BaseNode } from "@/components/ui/base-node";
import { NodeHandle } from "@/components/ui/node-handle";

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
      label={data.face}
      icon={
        <>
          <AiOutlineFieldNumber className="text-xl" />
          <GiDiceTarget />
        </>
      }>
      <NodeHandle id={"count-target-" + id} type="target" dataType="numeric" position={Position.Left} isConnectable={isConnectable} />
      <NodeHandle
        id={"count-source-" + id}
        type="source"
        dataType="numeric"
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={isValidConnection}
      />
    </BaseNode>
  );
};
