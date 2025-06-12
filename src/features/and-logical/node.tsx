import React from "react";
import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import { GiGearStickPattern, GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { IAndLogicalNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";
import { NodeHandle } from "@/components/ui/node-handle";

type IProps = NodeProps<IAndLogicalNode>;

export const AndLogicalNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }: IProps) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = ["histogram", "andLogical", "orLogical"];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <BaseNode
      selected={selected}
      name={data.name}
      status={data.status}
      icon={
        <>
          <GiPerspectiveDiceSixFacesOne className="text-5xl" />
          <div className="flex flex-col items-center justify-center text-center -ml-1">
            <GiGearStickPattern className="text-xl " />
            <span className="text-base">&and;</span>
          </div>
        </>
      }>
      <NodeHandle
        id={"and-target-1-" + id}
        type="target"
        dataType="boolean"
        className="top-6"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <NodeHandle
        id={"and-target-2-" + id}
        type="target"
        dataType="boolean"
        className="top-16"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <NodeHandle
        id={"and-source-" + id}
        type="source"
        dataType="boolean"
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={isValidConnection}
      />
    </BaseNode>
  );
};
