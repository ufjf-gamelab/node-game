import React from "react";
import { useDebounce } from "react-use";
import { useReactFlow } from "@xyflow/react";
import { ActionIcon, Button, TextInput, Tooltip } from "@mantine/core";
import { BiPlus, BiTrash } from "react-icons/bi";
import { BaseNodeProperties } from "@/components/ui/base-node-properties";
import { IBagGeneratorNode } from "@/config/types";

type IProps = {
  node: IBagGeneratorNode;
};

export const BagGeneratorProperties: React.FunctionComponent<IProps> = ({ node }) => {
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

  useDebounce(() => flow.updateNodeData(node.id, { ...node.data, balls }), 500, [balls]);

  return (
    <BaseNodeProperties
      node={node}
      children={
        <>
          {balls.map((_item, index) => (
            <div className="border-b py-2 w-full flex flex-col gap-2" key={"ball_key" + index}>
              <div className="w-full flex items-center justify-between gap-2">
                <label className="w-32 font-medium flex items-center gap-2" htmlFor={"ball_id" + index}>
                  <Tooltip variant="" label="Remove face">
                    <ActionIcon variant="light" color="red" onClick={() => removeBall(index)} disabled={index === 0 && balls.length === 1}>
                      <BiTrash />
                    </ActionIcon>
                  </Tooltip>
                  <span>Face {index + 1}</span>
                </label>

                <TextInput
                  type="text"
                  id={"ball_id" + index}
                  value={balls[index]}
                  placeholder="Face name"
                  onChange={(e) => handleChangeFace(e, index)}
                />
              </div>
            </div>
          ))}

          <Button color="blue" variant="light" leftSection={<BiPlus className="text-lg " />} size="sm" onClick={addNewBall}>
            Add New face
          </Button>
        </>
      }
    />
  );
};
