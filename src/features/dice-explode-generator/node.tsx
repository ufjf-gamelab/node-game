import React from "react";
import { Handle, Position, NodeProps, useReactFlow } from "@xyflow/react";
import { GiDiceTarget, GiRollingDiceCup } from "react-icons/gi";
import { TiArrowLoop } from "react-icons/ti";
import { IDiceCountRepetitionNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";

type IProps = NodeProps<IDiceCountRepetitionNode>;

export const DiceExplodeGeneratorNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = [
      "histogram",
      "diceMath",
      "dicePool",
      "dicePoolSum",
      "diceSuccess",
      "diceBetweenInterval",
      "diceCountRepetition",
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
          <GiDiceTarget />
          <div className="flex flex-col text-2xl -ml-1">
            <GiRollingDiceCup />
            <TiArrowLoop />
          </div>
        </>
      }>
      <Handle
        type="source"
        id={"explode-gen-source-" + id}
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
    </BaseNode>
  );
};
