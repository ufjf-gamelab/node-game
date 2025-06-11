import React from "react";
import { Position, NodeProps, useReactFlow } from "@xyflow/react";
import { GiDiceTarget, GiRollingDiceCup } from "react-icons/gi";
import { TiArrowLoop } from "react-icons/ti";
import { IDiceExplodeNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";
import { NodeHandle } from "@/components/ui/node-handle";

type IProps = NodeProps<IDiceExplodeNode>;

export const DiceExplodeNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }) => {
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
    ];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <BaseNode
      selected={selected}
      name={data.name}
      status={data.status}
      label={data.explodeFace}
      icon={
        <>
          <GiDiceTarget />
          <div className="flex flex-col text-2xl -ml-1">
            <GiRollingDiceCup />
            <TiArrowLoop />
          </div>
        </>
      }>
      <NodeHandle id={"explode-target-" + id} type="target" dataType="numeric" position={Position.Left} isConnectable={isConnectable} />
      <NodeHandle
        id={"explode-source-" + id}
        type="source"
        dataType="numeric"
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={isValidConnection}
      />
    </BaseNode>
  );
};
