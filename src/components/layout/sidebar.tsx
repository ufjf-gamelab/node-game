import { FunctionComponent } from "react";
import { Accordion, ActionIcon, Tooltip } from "@mantine/core";
import { GiPerspectiveDiceOne, GiPerspectiveDiceSixFacesRandom, GiSwapBag, GiHistogram } from "react-icons/gi";
import { VscTrash } from "react-icons/vsc";

import { INodeType } from "@/config/types";
import { useReactFlow } from "@xyflow/react";

type IProps = { addNewNode: (type: INodeType) => void };

const Sidebar: FunctionComponent<IProps> = ({ addNewNode }) => {
  const flow = useReactFlow();

  function clearBoard() {
    flow.setEdges([]);
    flow.setNodes([]);
  }

  return (
    <aside className="text-[14px] text-slate-900 fixed z-20 left-0 top-0 bg-white h-screen w-48 flex flex-col border-r select-none">
      <Accordion classNames={{ content: "p-0" }} chevronPosition="right" variant="contained" multiple defaultValue={["dice"]} className="w-full">
        <Accordion.Item value="dice">
          <Accordion.Control icon={<GiPerspectiveDiceOne className="text-[22px]" />}>Dice</Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="sidebar-item" onClick={() => addNewNode("diceGenerator")}>
                Dice generator
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceExplodeGenerator")}>
                Dice explode generator
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceLogical")}>
                Logical
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceMath")}>
                Math
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceAbsolute")}>
                Absolute value
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("dicePool")}>
                Pool
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("dicePoolSum")}>
                Pool sum
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceSuccess")}>
                Success
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceBetweenInterval")}>
                Between interval
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceCountRepetition")}>
                Count repetition
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("valueIsEven")}>
                Is Even
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("valueIsOdd")}>
                Is Odd
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="bag">
          <Accordion.Control icon={<GiSwapBag className="text-[22px]" />}>Bag</Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="sidebar-item" onClick={() => addNewNode("bagGenerator")}>
                Bag generator
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("bagPullWithoutRepetition")}>
                Pull without repetition
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="symbolic">
          <Accordion.Control icon={<GiPerspectiveDiceSixFacesRandom className="text-[22px]" />}>Symbolic</Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="sidebar-item" onClick={() => addNewNode("symbolicGenerator")}>
                Symbolic generator
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("symbolicPool")}>
                Pool symbolic
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="output">
          <Accordion.Control className="px-4 hover:bg-slate-100">
            <div className="flex gap-4 items-center justify-start">
              <GiHistogram className="text-[22px]" />
              <span>Output</span>
            </div>
          </Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="sidebar-item" onClick={() => addNewNode("histogram")}>
                Histogram
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <div className="flex gap-2 items-end h-full pb-2 px-2">
        <Tooltip label="Clear all board nodes">
          <ActionIcon variant="filled" color="red" onClick={clearBoard}>
            <VscTrash />
          </ActionIcon>
        </Tooltip>
      </div>
    </aside>
  );
};

export { Sidebar };
