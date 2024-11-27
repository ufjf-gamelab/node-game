import React from "react";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";
import { IDiceGeneratorNode } from "@/config/types";

export const DiceGeneratorDetails: React.FunctionComponent<{ node: IDiceGeneratorNode }> = ({ node }) => {
  const flow = useReactFlow();
  const [min, setMin] = React.useState(1);
  const [max, setMax] = React.useState(1);

  function handleChangeMax(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = Number(e.target.value) || 1;
    setMax(newValue);
    node.data.max = newValue;
  }

  function handleChangeMin(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = Number(e.target.value) || 1;
    setMin(newValue);
    node.data.min = newValue;
  }

  React.useEffect(() => {
    setMin(node.data.min);
    setMax(node.data.max);
  }, [node]);

  useDebounce(
    () => {
      flow.setNodes(flow.getNodes());
    },
    500,
    [min, max]
  );

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
            Valor minimo
          </label>
          <input
            type="number"
            id="min"
            className="bg-gray-100 py-1 px-2 border shadow-none focus:ring-1 outline-none text-center w-24"
            placeholder="Mínimo"
            value={min}
            onChange={handleChangeMin}
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
            onChange={handleChangeMax}
          />
        </div>
      </div>
    </div>
  );
};
