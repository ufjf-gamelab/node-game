import React from "react";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";
import { INode } from "@/config/types";

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

      <div className="flex flex-col px-2">
        <div className="w-full flex items-center justify-between border-b py-2">
          <label className="whitespace-nowrap font-medium">Node ID</label>
          <input
            type="text"
            value={node.id}
            readOnly
            className="cursor-default bg-transparent py-1 px-2 border-none shadow-none ring-0 outline-none text-right w-full"
          />
        </div>

        <div className="w-full flex items-center justify-between border-b py-2">
          <label className="whitespace-nowrap font-medium">Status</label>
          <input
            type="text"
            value={node.data.status}
            readOnly
            className="cursor-default bg-transparent py-1 px-2 border-none shadow-none ring-0 outline-none text-right w-full"
          />
        </div>

        <div className="w-full flex items-center justify-between border-b py-2">
          <label className="whitespace-nowrap font-medium" htmlFor="min">
            Name
          </label>
          <input
            type="text"
            id="min"
            className="bg-gray-100 py-1 px-2 border shadow-none focus:ring-1 outline-none text-center w-28"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              node.data.name = e.target.value;
            }}
          />
        </div>

        {children}
      </div>
    </div>
  );
};
