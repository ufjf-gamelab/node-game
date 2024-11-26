import React from "react";
import { useReactFlow } from "@xyflow/react";
import { IDiceNode } from "@/config/types";
import { useDebounce } from "react-use";

export const DiceNodeDetails: React.FunctionComponent<{ node: IDiceNode }> = ({ node }) => {
  const flow = useReactFlow();
  const [min, setMin] = React.useState(1);
  const [max, setMax] = React.useState(1);

  React.useEffect(() => {
    if (node) {
      setMin(node.data.generator.min);
      setMax(node.data.generator.max);
    } else {
      setMin(1);
      setMax(1);
    }
  }, [node]);

  useDebounce(() => flow.setNodes(flow.getNodes()), 500, [min, max]);

  if (!node) return null;
  return (
    <div className="flex flex-col text-sm">
      <div className="border-b-2  py-4 text-center text-xl">
        <h2>Dice Node</h2>
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
          <label className="whitespace-nowrap w-full font-medium" htmlFor="min">
            Valor minimo
          </label>
          <input
            type="number"
            id="min"
            className="bg-gray-100 py-1 px-2 border shadow-none focus:ring-1 outline-none text-center w-24"
            placeholder="Mínimo"
            value={min}
            onChange={(e) => {
              const newValue = Number(e.target.value) || 1;
              setMin(newValue);
              node.data.generator.min = newValue;
            }}
          />
        </div>

        <div className="w-full flex items-center justify-between border-b py-2">
          <label className="whitespace-nowrap w-full font-medium" htmlFor="max">
            Valor máximo
          </label>
          <input
            type="number"
            id="max"
            className="bg-gray-100 py-1 px-2 border shadow-none focus:ring-1 outline-none text-center w-24"
            placeholder="Máximo"
            value={max}
            onChange={(e) => {
              const newValue = Number(e.target.value) || 1;
              setMax(newValue);
              node.data.generator.max = newValue;
            }}
          />
        </div>

        <div className="w-full flex items-center justify-between border-b py-2">
          <label className="whitespace-nowrap w-full font-medium">Status</label>
          <input
            type="text"
            value="Em espera"
            readOnly
            className="cursor-default bg-transparent py-1 px-2 border-none shadow-none ring-0 outline-none text-right w-full"
          />
        </div>
      </div>
    </div>
  );
};
