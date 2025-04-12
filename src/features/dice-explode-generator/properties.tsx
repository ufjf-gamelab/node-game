import React from "react";
import { BaseNodeProperties } from "@/components/ui/base-node-properties";
import { IDiceExplodeGeneratorNode } from "@/config/types";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";

export const DiceExplodeGeneratorProperties: React.FunctionComponent<{ node: IDiceExplodeGeneratorNode }> = ({ node }) => {
  const flow = useReactFlow();
  const [maxFace, setMaxFace] = React.useState(node.data.maxFace);
  const [explodeFace, setExplodeFace] = React.useState(node.data.explodeFace);

  function handleChangeMaxFace(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = Number(e.target.value) || 1;
    setMaxFace(newValue);
    node.data.maxFace = newValue;
  }

  function handleChangeExplodeFace(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = Number(e.target.value) || 1;
    setExplodeFace(newValue);
    node.data.explodeFace = newValue;
  }

  useDebounce(() => flow.updateNodeData(node.id, { ...node.data, maxFace, explodeFace }), 500, [maxFace, explodeFace]);

  return (
    <BaseNodeProperties
      node={node}
      children={
        <>
          <div className="w-full flex items-center justify-between border-b py-2 gap-2">
            <label className=" w-full font-medium" htmlFor="faces">
              Faces
            </label>
            <input
              type="number"
              id="faces"
              className="bg-gray-100 py-1 px-2 border shadow-none focus:ring-1 outline-none text-center w-24"
              value={maxFace}
              onChange={handleChangeMaxFace}
            />
          </div>

          <div className="w-full flex items-center justify-between border-b py-2 gap-2">
            <label className=" w-full font-medium" htmlFor="explode">
              Explode face
            </label>
            <input
              type="number"
              id="explode"
              className="bg-gray-100 py-1 px-2 border shadow-none focus:ring-1 outline-none text-center w-24"
              value={explodeFace}
              onChange={handleChangeExplodeFace}
            />
          </div>
        </>
      }
    />
  );
};
