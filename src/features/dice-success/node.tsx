import React from "react";
import { Handle, Position, NodeProps, useReactFlow } from "@xyflow/react";
import { IHistogramNode, INode, INodeType } from "@/config/types";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { BsChevronBarUp, BsFillQuestionSquareFill } from "react-icons/bs";
import { BaseNode } from "@/components/ui/base-node";

type IProps = NodeProps<IHistogramNode>;

export const DiceSuccessNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = ["histogram", "diceSum", "dicePool", "dicePoolSum", "diceSuccess"];
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
          <div className="flex flex-col justify-center items-center -ml-1">
            <BsChevronBarUp className="text-2xl" />
            <BsFillQuestionSquareFill className="text-lg" />
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
