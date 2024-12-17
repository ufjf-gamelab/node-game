import React from "react";
import { Handle, Position, NodeProps, useReactFlow } from "@xyflow/react";
import { NodeContainer } from "@/components/ui/node-container";
import { IHistogramNode, INode, INodeType } from "@/config/types";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { NodeStatus } from "@/components/ui/node-status";
import { BsChevronBarUp, BsFillQuestionSquareFill } from "react-icons/bs";

type IProps = NodeProps<IHistogramNode>;

export const DiceSuccessNode: React.ComponentType<IProps> = ({ data, selected, isConnectable }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = ["histogram", "diceSum", "dicePool", "dicePoolSum", "diceSuccess"];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <NodeContainer selected={selected}>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />

      <div className="flex flex-col items-center">
        <h2 className="text-base">{data.name}</h2>

        <div className="flex items-center justify-center text-5xl">
          <GiPerspectiveDiceSixFacesRandom />
          <div className="flex flex-col justify-center items-center text-2xl">
            <BsChevronBarUp />
            <BsFillQuestionSquareFill className="text-xl" />
          </div>
        </div>

        <NodeStatus status={data.status} />
      </div>
    </NodeContainer>
  );
};
