import React from "react";
import { NodeContainer } from "@/components/ui/node-container";
import { NodeStatus } from "@/components/ui/node-status";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { GiGlassBall, GiSwapBag } from "react-icons/gi";
import { IBagGeneratorNode, INode, INodeType } from "@/config/types";

type IProps = NodeProps<IBagGeneratorNode>;

export const BagGeneratorNode: React.ComponentType<IProps> = ({ data, isConnectable, selected }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = ["bagPullWithoutRepetition"];
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

      <div className="flex flex-col items-center w-max">
        <h2 className="text-base max-w-24 break-words text-center w-max">{data.name}</h2>

        <div className="flex justify-center items-center text-5xl">
          <GiSwapBag />
          <GiGlassBall className="text-2xl" />
        </div>

        <span className="text-sm">{data.balls.length} faces</span>

        <NodeStatus status={data.status} />
      </div>
    </NodeContainer>
  );
};
