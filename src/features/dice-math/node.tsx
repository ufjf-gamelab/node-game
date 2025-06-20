import React from "react";
import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { BiMath } from "react-icons/bi";
import { IDiceMathNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";
import { NodeHandle } from "@/components/ui/node-handle";

type IProps = NodeProps<IDiceMathNode>;

export const DiceMathNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }: IProps) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = [
      "histogram",
      "diceMath",
      "diceLogical",
      "dicePool",
      "diceSuccess",
      "diceBetweenInterval",
      "diceCountRepetition",
      "valueIsEven",
      "valueIsOdd",
      "diceAbsolute",
    ];

    return allowedTypes.includes(targetNode.type);
  }

  return (
    <BaseNode
      selected={selected}
      name={data.name}
      status={data.status}
      label={data.operation.charAt(0).toUpperCase() + data.operation.slice(1)}
      icon={
        <>
          <GiPerspectiveDiceSixFacesOne className="text-5xl" />
          <BiMath className="text-2xl -ml-1" />
        </>
      }>
      <NodeHandle
        id={"math-target-1-" + id}
        type="target"
        dataType="numeric"
        position={Position.Left}
        className="top-6"
        isConnectable={isConnectable}
      />
      <NodeHandle
        id={"math-target-2-" + id}
        type="target"
        dataType="numeric"
        position={Position.Left}
        className="top-16"
        isConnectable={isConnectable}
      />

      <NodeHandle
        id={"math-source-" + id}
        type="source"
        dataType="numeric"
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={isValidConnection}
      />
    </BaseNode>
  );
};
