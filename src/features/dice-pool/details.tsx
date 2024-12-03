import React from "react";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";
import { IDicePoolNode } from "@/config/types";

type IProps = { node: IDicePoolNode };

export const DicePoolDetails: React.FunctionComponent<IProps> = ({ node }) => {
  const flow = useReactFlow();

  const [name, setName] = React.useState(node.data.name);

  useDebounce(
    () => {
      flow.setNodes(flow.getNodes());
    },
    500,
    [name]
  );

  return (
    <div className="flex flex-col text-sm">
      <div className="border-b-2  py-4 text-center text-xl">
        <h2>Dice Pool Node</h2>
      </div>

      <div className="flex flex-col px-2">
        <div className="w-full flex items-center justify-between border-b py-2">
          <label className="whitespace-nowrap w-full font-medium">Node ID</label>
          <input
            type="text"
            value={node.id}
            readOnly
            className="cursor-default bg-transparent py-1 px-2 border-none shadow-none ring-0 outline-none text-right w-full"
          />
        </div>

        <div className="w-full flex items-center justify-between border-b py-2">
          <label className="whitespace-nowrap w-full font-medium">Status</label>
          <input
            type="text"
            value={node.data.status}
            readOnly
            className="cursor-default bg-transparent py-1 px-2 border-none shadow-none ring-0 outline-none text-right w-full"
          />
        </div>

        <div className="w-full flex items-center justify-between border-b py-2">
          <label className="whitespace-nowrap w-full font-medium" htmlFor="min">
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
      </div>
    </div>
  );
};
