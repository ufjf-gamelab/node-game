import React from "react";
import { Handle, Position, NodeProps, useReactFlow } from "@xyflow/react";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { AiOutlineVerticalAlignMiddle } from "react-icons/ai";
import { NodeContainer } from "@/components/ui/node-container";
import { NodeStatus } from "@/components/ui/node-status";
import { IDiceBetweenIntervalNode, INode, INodeType } from "@/config/types";

type IProps = NodeProps<IDiceBetweenIntervalNode>;

export const DiceBetweenIntervalNode: React.ComponentType<IProps> = ({ data, selected, isConnectable }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = ["histogram"];
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
        <h2 className="text-base text-center max-w-24">{data.name}</h2>

        <div className="flex text-5xl items-center justify-center">
          <GiPerspectiveDiceSixFacesRandom />
          <AiOutlineVerticalAlignMiddle className="text-2xl" />
        </div>
        <NodeStatus status={data.status} />
      </div>
    </NodeContainer>
  );
};
