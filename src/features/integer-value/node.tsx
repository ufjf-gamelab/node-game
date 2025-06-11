import React from "react";
import { Handle, Position, NodeProps, useReactFlow } from "@xyflow/react";

import { IIntegerValueNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";

type IProps = NodeProps<IIntegerValueNode>;

export const IntegerValueNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }) => {
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
      "diceAbsolute",
      "valueIsEven",
      "valueIsOdd",
    ];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <BaseNode selected={selected} name={data.name} status={data.status} label={data.value} icon={<span className="font-semibold">&#8484;</span>}>
      <Handle
        type="source"
        id={"dice-gen-source-" + id}
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
    </BaseNode>
  );
};
