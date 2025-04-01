import React from "react";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { BiMath } from "react-icons/bi";
import { IDiceMathNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";

type IProps = NodeProps<IDiceMathNode>;

export const DiceMathNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }: IProps) => {
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
      label={data.operation.charAt(0).toUpperCase() + data.operation.slice(1)}
      icon={
        <>
          <GiPerspectiveDiceSixFacesOne className="text-5xl" />
          <BiMath className="text-2xl -ml-1" />
        </>
      }>
      <Handle
        type="source"
        id={"math-source-" + id}
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
      <Handle type="target" position={Position.Left} id={"math-target-1-" + id} className="top-6" isConnectable={isConnectable} />
      <Handle type="target" position={Position.Left} id={"math-target-2-" + id} className="top-16" isConnectable={isConnectable} />
    </BaseNode>
  );
};
