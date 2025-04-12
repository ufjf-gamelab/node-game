import React from "react";
import { Handle, Position, NodeProps, useReactFlow } from "@xyflow/react";
import { IHistogramNode, INode, INodeType } from "@/config/types";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { BaseNode } from "@/components/ui/base-node";

type IProps = NodeProps<IHistogramNode>;

export const ValueIsEvenNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = ["histogram", "diceLogical", "diceMath", "dicePool", "diceSuccess"];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <BaseNode
      selected={selected}
      name={data.name}
      status={data.status}
      icon={
        <>
          <GiPerspectiveDiceSixFacesRandom />
          <div className="flex flex-col justify-center items-center -ml-1 ">
            <span className="text-lg -mb-2 font-bold">%</span>
            <span className="text-lg font-semibold">0</span>
          </div>
        </>
      }>
      <Handle
        type="source"
        id={"success-source-" + id}
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
      <Handle type="target" id={"success-target-" + id} position={Position.Left} isConnectable={isConnectable} />
    </BaseNode>
  );
};
