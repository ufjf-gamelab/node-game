import React from "react";
import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import { GiGearStickPattern, GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { IDiceLogicalNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";
import { NodeHandle } from "@/components/ui/node-handle";

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
      <NodeHandle
        id={"logical-target-1-" + id}
        type="target"
        dataType="numeric"
        className="top-6"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <NodeHandle
        id={"logical-target-2-" + id}
        type="target"
        dataType="numeric"
        className="top-16"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <NodeHandle
        id={"logical-source-" + id}
        type="source"
        dataType="boolean"
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={isValidConnection}
      />
    </BaseNode>
  );
};
