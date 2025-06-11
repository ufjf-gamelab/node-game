import React from "react";
import { Position, NodeProps } from "@xyflow/react";
import { IHistogramNode } from "@/config/types";
import { GiHistogram } from "react-icons/gi";
import { BaseNode } from "@/components/ui/base-node";
import { NodeHandle } from "@/components/ui/node-handle";

type IProps = NodeProps<IHistogramNode>;

export const HistogramNode: React.ComponentType<IProps> = ({ data, selected, isConnectable, id }) => {
  return (
    <BaseNode selected={selected} name={data.name} status={data.status} icon={<GiHistogram className="text-5xl" />}>
      <NodeHandle type="target" id={"histogram-target-" + id} position={Position.Left} isConnectable={isConnectable} />
    </BaseNode>
  );
};
