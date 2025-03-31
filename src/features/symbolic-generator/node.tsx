import React from "react";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { INode, INodeType, ISymbolicGeneratorNode } from "@/config/types";
import { VscSymbolString } from "react-icons/vsc";
import { BaseNode } from "@/components/ui/base-node";

type IProps = NodeProps<ISymbolicGeneratorNode>;

export const SymbolicGeneratorNode: React.ComponentType<IProps> = ({ data, isConnectable, selected, id }) => {
  const flow = useReactFlow();

  function isValidConnection(targetId: string) {
    const targetNode = flow.getNode(targetId) as INode | undefined;
    if (!targetNode) return false;

    const allowedTypes: INodeType[] = ["histogram", "symbolicPool"];
    return allowedTypes.includes(targetNode.type);
  }

  return (
    <BaseNode
      selected={selected}
      name={data.name}
      status={data.status}
      label={data.faces.length + " faces"}
      icon={
        <>
          <GiPerspectiveDiceSixFacesRandom />
          <VscSymbolString className="text-3xl -ml-1" />
        </>
      }>
      <Handle
        type="source"
        id={"symbolic-gen-source-" + id}
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection) => isValidConnection(connection.target)}
      />
    </BaseNode>
  );
};
