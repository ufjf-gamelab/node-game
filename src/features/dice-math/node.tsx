import React from "react";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { BiMath } from "react-icons/bi";
import { connectionHasLoop } from "@/utils/connectionHasLoop";
import { BaseNode } from "@/components/ui/base-node";
import { IDiceMathNode, IEdge, INode, INodeType } from "@/config/types";

type IProps = NodeProps<IDiceMathNode>;

export const DiceMathNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }: IProps) => {
  const flow = useReactFlow<INode, IEdge>();

  function isValidConnection(targetId: string) {
    if (targetId === id) return false;

    const targetNode = flow.getNode(targetId);
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
    if (!allowedTypes.includes(targetNode.type)) return false;

    const hasLoop = connectionHasLoop(flow, id, targetId);
    if (hasLoop) return false;

    return true;
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
      <Handle
        type="target"
        position={Position.Left}
        id={"math-target-1-" + id}
        className="top-6"
        isConnectable={isConnectable}
        isConnectableStart={false}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={"math-target-2-" + id}
        className="top-16"
        isConnectable={isConnectable}
        isConnectableStart={false}
      />

      <Handle
        type="source"
        id={"math-source-" + id}
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
    </BaseNode>
  );
};
