import React from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { IDiceSumNode } from "@/config/types";
import { NodeContainer } from "@/components/ui/node-container";
import { NodeStatus } from "@/components/ui/node-status";

type IProps = NodeProps<IDiceSumNode>;

export const DiceSumNode: React.ComponentType<IProps> = ({ data, selected, isConnectable }: IProps) => {
  const [status, setStatus] = React.useState(data.status);

  React.useEffect(() => setStatus(data.status), [data]);

  return (
    <NodeContainer selected={selected}>
      <Handle type="target" position={Position.Left} id="sum-target-1" className="top-6" isConnectable={isConnectable} />
      <Handle type="target" position={Position.Left} id="sum-target-2" className="top-16" isConnectable={isConnectable} />
      <Handle
        type="source"
        id="c"
        position={Position.Right}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <h2 className="text-center">Dice Sum</h2>
      <div className="flex items-center">
        <GiPerspectiveDiceSixFacesOne className="text-5xl" />+<GiPerspectiveDiceSixFacesOne className="text-5xl" />
      </div>
      <NodeStatus status={status} />
    </NodeContainer>
  );
};
