import React from "react";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";
import { IDiceBetweenIntervalNode } from "@/config/types";
import { BaseNodeDetails } from "@/components/ui/base-node-details";

type IProps = {
  node: IDiceBetweenIntervalNode;
};

export const DiceBetweenIntervalDetails: React.FunctionComponent<IProps> = ({ node }) => {
  const flow = useReactFlow();
  const [min, setMin] = React.useState(node.data.min);
  const [max, setMax] = React.useState(node.data.max);

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

  useDebounce(() => flow.updateNodeData(node.id, { ...node.data, min, max }), 500, [min, max]);

  return (
    <BaseNodeDetails
      node={node}
      children={
        <>
          <div className="w-full flex items-center justify-between border-b py-2">
            <label className="whitespace-nowrap w-full font-medium" htmlFor="min">
              Min value
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
              Max value
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
        </>
      }
    />
  );
};
