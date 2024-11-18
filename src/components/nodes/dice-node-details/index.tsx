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
    <div className="flex flex-col">
      <div className="border-b border-gray-300 py-4 text-xl px-4 mb-8">
        <h2>Dice Node</h2>
      </div>

      <div className="flex flex-col gap-2 px-4">
        <h5 className="font-semibold">
          ID: <span className="font-normal">{node.id}</span>
        </h5>

        <div className="flex justify-between items-center">
          <h5 className="font-semibold">Valor mínimo:</h5>

          <input
            type="number"
            placeholder="Mínimo"
            value={min}
            className="w-20 text-center"
            onChange={(e) => {
              const newValue = Number(e.target.value) || 1;
              setMin(newValue);
              node.data.generator.min = newValue;
            }}
          />
        </div>

        <div className="flex justify-between items-center">
          <h5 className="font-semibold">Valor máximo:</h5>

          <input
            type="number"
            placeholder="Máximo"
            className="w-20 text-center"
            value={max}
            onChange={(e) => {
              const newValue = Number(e.target.value) || 1;
              setMax(newValue);
              node.data.generator.max = newValue;
            }}
          />
        </div>

        <h5 className="font-semibold">
          status: <span className="font-normal">{node.data.generator.status.replaceAll("_", " ")}</span>
        </h5>
      </div>
    </div>
  );
};
