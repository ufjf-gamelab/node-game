import React from "react";
import { NodeProps, Position, Handle, useReactFlow } from "@xyflow/react";
import { GiRollingDices } from "react-icons/gi";
import { IDicePoolNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";

type IProps = NodeProps<IDicePoolNode>;

export const DicePoolNode: React.ComponentType<IProps> = ({ data, isConnectable, selected, id }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = ["dicePoolSum", "diceSuccess", "diceBetweenInterval", "diceCountRepetition", "valueIsEven", "valueIsOdd"];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <BaseNode selected={selected} name={data.name} status={data.status} icon={<GiRollingDices />}>
      <Handle
        type="source"
        id={"pool-source-" + id}
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
      <Handle type="target" id={"pool-target-1-" + id} position={Position.Left} isConnectable={isConnectable} className="top-5" />
      <Handle type="target" id={"pool-target-2-" + id} position={Position.Left} isConnectable={isConnectable} className="top-16" />
    </BaseNode>
  );
};
