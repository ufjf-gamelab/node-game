import { FunctionComponent } from "react";
import { Accordion } from "@mantine/core";
import { GiPerspectiveDiceOne, GiNetworkBars, GiPerspectiveDiceSixFacesRandom, GiSwapBag } from "react-icons/gi";
import { INodeType } from "@/config/types";

type IProps = { addNewNode: (type: INodeType) => void };

const Sidebar: FunctionComponent<IProps> = ({ addNewNode }) => {
  return (
    <aside className="text-[14px] text-slate-900 fixed z-20 left-0 top-0 bg-white h-screen w-48 flex flex-col border-r">
      <Accordion classNames={{ content: "p-0" }} chevronPosition="right" variant="contained" multiple defaultValue={["dice"]} className="w-full">
        <Accordion.Item value="dice">
          <Accordion.Control icon={<GiPerspectiveDiceOne className="text-[22px]" />}>Dice</Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("diceGenerator")}>
                Dice generator
              </li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("diceExplodeGenerator")}>
                Dice explode generator
              </li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("diceSum")}>
                Sum
              </li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("diceSubtract")}>
                Subtract
              </li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("dicePool")}>
                Pool
              </li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("dicePoolSum")}>
                Pool sum
              </li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("diceSuccess")}>
                Success
              </li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("diceBetweenInterval")}>
                Between interval
              </li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("diceCountRepetition")}>
                Count repetition
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Control icon={<GiSwapBag className="text-[22px]" />}>Bag</Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("bagGenerator")}>
                Bag generator
              </li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("bagPullWithoutRepetition")}>
                Pull without repetition
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="item-3">
          <Accordion.Control icon={<GiPerspectiveDiceSixFacesRandom className="text-[22px]" />}>Symbolic</Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("symbolicGenerator")}>
                Symbolic generator
              </li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("symbolicPool")}>
                Pool symbolic
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="item-4">
          <Accordion.Control className="px-4 hover:bg-slate-100">
            <div className="flex gap-4 items-center justify-start">
              <GiNetworkBars className="text-[22px]" />
              <span>Graphs</span>
            </div>
          </Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("histogram")}>
                Histogram
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </aside>
  );
};

export { Sidebar };
