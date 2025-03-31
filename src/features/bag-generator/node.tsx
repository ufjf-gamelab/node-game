import React from "react";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { GiGlassBall, GiSwapBag } from "react-icons/gi";
import { IBagGeneratorNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";

type IProps = NodeProps<IBagGeneratorNode>;

export const BagGeneratorNode: React.ComponentType<IProps> = ({ data, isConnectable, selected, id }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = ["bagPullWithoutRepetition"];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <BaseNode
      selected={selected}
      name={data.name}
      status={data.status}
      label={data.balls.length + " faces"}
      icon={
        <>
          <GiSwapBag className="text-5xl" />
          <GiGlassBall className="text-lg -ml-2" />
        </>
      }>
      <Handle
        type="source"
        id={"bag-source-" + id}
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
    </BaseNode>
  );
};
