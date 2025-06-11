import React from "react";
import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import { GiRollingDiceCup } from "react-icons/gi";
import { IBagPullWithoutRepetitionNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";
import { NodeHandle } from "@/components/ui/node-handle";

type IProps = NodeProps<IBagPullWithoutRepetitionNode>;

export const BagPullWithoutRepetitionNode: React.ComponentType<IProps> = ({ data, isConnectable, selected, id }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = ["histogram", "bagPullWithoutRepetition"];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <BaseNode selected={selected} name={data.name} status={data.status} icon={<GiRollingDiceCup />}>
      <NodeHandle type="target" dataType="symbolic" id={"pull-target-" + id} position={Position.Left} isConnectable={isConnectable} />
      <NodeHandle
        type="source"
        dataType="symbolic"
        id={"pull-source-" + id}
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={isValidConnection}
      />
    </BaseNode>
  );
};
