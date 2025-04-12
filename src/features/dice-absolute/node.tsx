import React from "react";
import { Handle, Position, NodeProps, useReactFlow } from "@xyflow/react";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { IDiceBetweenIntervalNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";

type IProps = NodeProps<IDiceBetweenIntervalNode>;

export const DiceAbsoluteNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = ["histogram", "diceMath", "diceLogical", "dicePool", "diceSuccess", "valueIsEven", "valueIsOdd"];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <BaseNode
      selected={selected}
      name={data.name}
      status={data.status}
      icon={
        <>
          <span className="text-2xl font-semibold">|</span>
          <GiPerspectiveDiceSixFacesOne />
          <span className="text-2xl font-semibold">|</span>
        </>
      }>
      <Handle
        type="source"
        id={"absolute-source-" + id}
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
      <Handle type="target" id={"absolute-target-" + id} position={Position.Left} isConnectable={isConnectable} />
    </BaseNode>
  );
};
