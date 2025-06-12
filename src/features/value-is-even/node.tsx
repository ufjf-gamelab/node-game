import React from "react";
import { Position, NodeProps, useReactFlow } from "@xyflow/react";
import { IHistogramNode, INode, INodeType } from "@/config/types";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { BaseNode } from "@/components/ui/base-node";
import { NodeHandle } from "@/components/ui/node-handle";

type IProps = NodeProps<IHistogramNode>;

export const ValueIsEvenNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = ["histogram", "andLogical", "orLogical"];
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
      <NodeHandle id={"success-target-" + id} type="target" dataType="numeric" position={Position.Left} isConnectable={isConnectable} />
      <NodeHandle
        id={"success-source-" + id}
        type="source"
        dataType="boolean"
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={isValidConnection}
      />
    </BaseNode>
  );
};
