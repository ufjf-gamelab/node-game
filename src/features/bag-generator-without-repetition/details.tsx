import React from "react";
import { BaseNodeDetails } from "@/components/ui/base-node-details";
import { IBagGeneratorWithoutRepetition } from "@/config/types";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";
import { BiPlus, BiTrash } from "react-icons/bi";

type IProps = {
  node: IBagGeneratorWithoutRepetition;
};

export const BagGeneratorWithoutRepetitionDetails: React.FunctionComponent<IProps> = ({ node }) => {
  const flow = useReactFlow();
  const [balls, setBalls] = React.useState(node.data.balls);

  function handleChangeFace(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const newValue = e.target.value || "";
    const newBalls = [...balls];
    newBalls[index] = newValue;

    setBalls(newBalls);
    node.data.balls = newBalls;
  }

  function addNewBall() {
    const newValue = [...balls, ""];
    setBalls(newValue);
    node.data.balls = newValue;
  }

  function removeBall(index: number) {
    const newValue = balls.filter((_item, sourceIndex) => sourceIndex !== index);
    setBalls(newValue);
    node.data.balls = newValue;
  }

  useDebounce(
    () => {
      flow.updateNode(node.id, { data: node.data });
    },
    500,
    [balls]
  );

  return (
    <BaseNodeDetails
      node={node}
      children={
        <>
          {balls.map((_item, index) => (
            <div className="border-b py-2 w-full flex flex-col gap-2" key={"ball_key" + index}>
              <div className="w-full flex items-center justify-between gap-2">
                <label className="w-full font-medium flex items-center gap-2" htmlFor={"ball_id" + index}>
                  <button
                    title="Remove face"
                    className="disabled:text-gray-400 text-red-400 text-lg transition-colors"
                    disabled={index === 0 && balls.length === 1}
                    onClick={() => removeBall(index)}>
                    <BiTrash />
                  </button>
                  <span>Face {index + 1}</span>
                </label>
                <input
                  type="text"
                  id={"ball_id" + index}
                  className="bg-gray-100 py-1 px-2 border shadow-none focus:ring-1 outline-none text-center w-28"
                  value={balls[index]}
                  placeholder="Face name"
                  onChange={(e) => handleChangeFace(e, index)}
                />
              </div>
            </div>
          ))}

          <button
            className="flex items-center justify-center gap-2 py-1 bg-blue-100 hover:bg-blue-200 transition-colors rounded-sm my-2 font-semibold"
            onClick={addNewBall}>
            <BiPlus className="text-lg text-blue-600" />
            Add New face
          </button>
        </>
      }
    />
  );
};
