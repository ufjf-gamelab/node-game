import React from "react";
import { NodeProps, Position } from "@xyflow/react";
import { GiGlassBall, GiSwapBag } from "react-icons/gi";
import { IBagGeneratorNode } from "@/config/types";
import { BaseNode } from "@/components/ui/base-node";
import { NodeHandle } from "@/components/ui/node-handle";

type IProps = NodeProps<IBagGeneratorNode>;

export const BagGeneratorNode: React.ComponentType<IProps> = ({ data, isConnectable, selected, id }) => {
  return (
    <BaseNode
      selected={selected}
      name={data.name}
      status={data.status}
      label={data.balls.length + " faces"}
      icon={
        <>
          <GiSwapBag className="text-5xl" />
          <GiGlassBall className="text-lg -ml-2" />
        </>
      }>
      <NodeHandle id={"bag-source-" + id} type="source" dataType={data.outputType} position={Position.Right} isConnectable={isConnectable} />
    </BaseNode>
  );
};
