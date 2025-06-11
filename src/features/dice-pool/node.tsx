import React from "react";
import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import { GiRollingDices } from "react-icons/gi";
import { IDicePoolNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";
import { NodeHandle } from "@/components/ui/node-handle";

type IProps = NodeProps<IDicePoolNode>;

export const DicePoolNode: React.ComponentType<IProps> = ({ data, isConnectable, selected, id }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = [
      "dicePoolSum",
      "diceSuccess",
      "diceBetweenInterval",
      "diceCountRepetition",
      "valueIsEven",
      "valueIsOdd",
      "dicePool",
      "histogram",
    ];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <BaseNode selected={selected} name={data.name} status={data.status} icon={<GiRollingDices />}>
      <NodeHandle
        id={"pool-target-1-" + id}
        type="target"
        dataType="numeric"
        className="top-5"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <NodeHandle
        id={"pool-target-2-" + id}
        type="target"
        dataType="numeric"
        className="top-16"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <NodeHandle
        id={"pool-source-" + id}
        type="source"
        dataType="numeric"
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={isValidConnection}
      />
    </BaseNode>
  );
};
