import React from "react";
import { Position, NodeProps, useReactFlow } from "@xyflow/react";
import { IDiceSuccessNode, INode, INodeType } from "@/config/types";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { BsChevronBarUp, BsFillQuestionSquareFill } from "react-icons/bs";
import { BaseNode } from "@/components/ui/base-node";
import { NodeHandle } from "@/components/ui/node-handle";

type IProps = NodeProps<IDiceSuccessNode>;

export const DiceSuccessNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }) => {
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
      label={data.face}
      icon={
        <>
          <GiPerspectiveDiceSixFacesRandom />
          <div className="flex flex-col justify-center items-center -ml-1">
            <BsChevronBarUp className="text-2xl" />
            <BsFillQuestionSquareFill className="text-lg" />
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
