import React from "react";
import { NodeContainer } from "@/components/ui/node-container";
import { NodeStatus } from "@/components/ui/node-status";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { ISymbolicGeneratorNode } from "@/config/types";
import { VscSymbolString } from "react-icons/vsc";

type IProps = NodeProps<ISymbolicGeneratorNode>;

export const SymbolicGeneratorNode: React.ComponentType<IProps> = ({ data, isConnectable, selected }) => {
  return (
    <NodeContainer selected={selected}>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />

      <div className="flex flex-col items-center w-max">
        <h2 className="text-base max-w-24 break-words text-center w-max">{data.name}</h2>

        <div className="flex justify-center items-center text-5xl">
          <GiPerspectiveDiceSixFacesRandom />
          <VscSymbolString className="text-4xl" />
        </div>

        <span className="text-sm">{data.faces.length} faces</span>

        <NodeStatus status={data.status} />
      </div>
    </NodeContainer>
  );
};
