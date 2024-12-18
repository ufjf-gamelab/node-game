import { FunctionComponent } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GiPerspectiveDiceOne, GiNetworkBars, GiPerspectiveDiceSixFacesRandom, GiSwapBag } from "react-icons/gi";
import { INodeType } from "@/config/types";

type IProps = { addNewNode: (type: INodeType) => void };

const Sidebar: FunctionComponent<IProps> = ({ addNewNode }) => {
  return (
    <aside className="text-slate-900 fixed z-20 left-0 top-0 bg-white h-screen w-48 flex flex-col">
      <Accordion type="multiple" defaultValue={["item-1"]} className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="px-4 hover:bg-slate-100">
            <div className="flex gap-4 items-center justify-start">
              <GiPerspectiveDiceOne className="text-[22px]" />
              <span>Dice</span>
            </div>
          </AccordionTrigger>

          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="px-4 hover:bg-slate-100">
            <div className="flex gap-4 items-center justify-start">
              <GiSwapBag className="text-[22px]" />
              <span>Bag</span>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <ul className="flex flex-col">
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("bagGenerator")}>
                Bag generator
              </li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("bagPullWithoutRepetition")}>
                Pull without repetition
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="px-4 hover:bg-slate-100">
            <div className="flex gap-4 items-center justify-start">
              <GiPerspectiveDiceSixFacesRandom className="text-[22px]" />
              <span>Symbolic</span>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <ul className="flex flex-col">
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("symbolicGenerator")}>
                Symbolic generator
              </li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("symbolicPool")}>
                Pool symbolic
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="px-4 hover:bg-slate-100">
            <div className="flex gap-4 items-center justify-start">
              <GiNetworkBars className="text-[22px]" />
              <span>Graphs</span>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <ul className="flex flex-col">
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("histogram")}>
                Bars
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export { Sidebar };
