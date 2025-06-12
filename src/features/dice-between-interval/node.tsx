import React from "react";
import { Position, NodeProps, useReactFlow } from "@xyflow/react";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { AiOutlineVerticalAlignMiddle } from "react-icons/ai";
import { IDiceBetweenIntervalNode, INode, INodeType } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";
import { NodeHandle } from "@/components/ui/node-handle";

type IProps = NodeProps<IDiceBetweenIntervalNode>;

export const DiceBetweenIntervalNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }) => {
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
      label={"[" + data.min + " , " + data.max + "]"}
      icon={
        <>
          <GiPerspectiveDiceSixFacesRandom className="text-5xl" />
          <AiOutlineVerticalAlignMiddle className="text-2xl" />
        </>
      }>
      <NodeHandle id={"between-target-" + id} type="target" dataType="numeric" position={Position.Left} isConnectable={isConnectable} />
      <NodeHandle
        id={"between-source-" + id}
        type="source"
        dataType="boolean"
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={isValidConnection}
      />
    </BaseNode>
  );
};
