import React from "react";
import { GiRollingDices } from "react-icons/gi";
import { TbSum } from "react-icons/tb";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { IDicePoolSumNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";

type IProps = NodeProps<IDicePoolSumNode>;

export const DicePoolSumNode: React.ComponentType<IProps> = ({ data, isConnectable, selected, id }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = [
      "histogram",
      "diceMath",
      "dicePool",
      "diceSuccess",
      "diceBetweenInterval",
      "diceCountRepetition",
      "valueIsEven",
      "valueIsOdd",
    ];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <BaseNode
      selected={selected}
      name={data.name}
      status={data.status}
      icon={
        <>
          <TbSum />
          <GiRollingDices className="text-3xl -ml-2" />
        </>
      }>
      <Handle
        type="source"
        id={"pool-sum-source-" + id}
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
      <Handle type="target" id={"pool-sum-target-" + id} position={Position.Left} isConnectable={isConnectable} />{" "}
    </BaseNode>
  );
};
