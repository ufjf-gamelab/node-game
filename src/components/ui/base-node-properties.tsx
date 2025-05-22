import React from "react";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";
import { INode } from "@/config/types";
import { TextInput } from "@mantine/core";

type IProps = {
  node: INode;
  children?: React.ReactNode;
};

export const BaseNodeProperties: React.FunctionComponent<IProps> = ({ node, children }) => {
  const flow = useReactFlow();

  const [name, setName] = React.useState(node.data.name);

  useDebounce(() => flow.updateNodeData(node.id, { ...node.data, name }), 500, [name]);

  return (
    <div className="flex flex-col">
      <div className="border-b-2 px-2 py-4 text-center text-xl">
        <h2>{node.data.propertiesTitle}</h2>
      </div>

      <div className="flex flex-col p-2 gap-2 overflow-y-auto">
        <TextInput label="Node ID" value={node.id} styles={{ input: { outline: "none" } }} readOnly />
        <TextInput label="Status" value={node.data.status} readOnly />
        <TextInput
          label="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            node.data.name = e.target.value;
          }}
        />

        {children}
      </div>
    </div>
  );
};
