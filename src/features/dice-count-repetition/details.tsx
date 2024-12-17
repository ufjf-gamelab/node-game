import React from "react";
import { BaseNodeDetails } from "@/components/ui/base-node-details";
import { IDiceCountRepetitionNode } from "@/config/types";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";

export const DiceCountRepetitionDetails: React.FunctionComponent<{ node: IDiceCountRepetitionNode }> = ({ node }) => {
  const flow = useReactFlow();
  const [face, setFace] = React.useState(node.data.face);

  function handleChangeFace(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = Number(e.target.value) || 1;
    setFace(newValue);
    node.data.face = newValue;
  }

  React.useEffect(() => {
    setFace(node.data.face);
  }, [node]);

  useDebounce(
    () => {
      flow.setNodes(flow.getNodes());
    },
    500,
    [face]
  );

  return (
    <BaseNodeDetails
      node={node}
      children={
        <>
          <div className="w-full flex items-center justify-between border-b py-2 gap-2">
            <label className=" w-full font-medium" htmlFor="face">
              Value to count
            </label>
            <input
              type="number"
              id="min"
              className="bg-gray-100 py-1 px-2 border shadow-none focus:ring-1 outline-none text-center w-24"
              value={face}
              onChange={handleChangeFace}
            />
          </div>
        </>
      }
    />
  );
};
