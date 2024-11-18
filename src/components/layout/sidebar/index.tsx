import { FunctionComponent } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GiPerspectiveDiceOne, GiNetworkBars, GiPlayButton } from "react-icons/gi";
import { INodeType } from "@/config/types";

type IProps = {
  addNewNode: (type: INodeType) => void;
};

const Sidebar: FunctionComponent<IProps> = ({ addNewNode }) => {
  return (
    <aside className="text-slate-900 fixed z-10 left-0 top-0 bg-white h-screen w-48 flex flex-col">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="px-4 hover:bg-slate-100">
            <div className="flex gap-4 items-center justify-start">
              <GiPerspectiveDiceOne className="text-[20px]" />
              <span>Generators</span>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <ul className="flex flex-col">
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("dice")}>
                Dice
              </li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("dice")}>
                Symbolic
              </li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("dice")}>
                Bag
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="px-4 hover:bg-slate-100">
            <div className="flex gap-4 items-center justify-start">
              <GiPlayButton className="text-[20px]" />
              <span>Methods</span>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <ul className="flex flex-col">
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer">Dice</li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer">Symbolic</li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer">Bag</li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer">Bag without repetition</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="px-4 hover:bg-slate-100">
            <div className="flex gap-4 items-center justify-start">
              <GiNetworkBars className="text-[20px]" />
              <span>Graphs</span>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <ul className="flex flex-col">
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("histogram")}>
                Bars
              </li>
              <li className="px-2 pl-8 py-1 hover:bg-slate-100 cursor-pointer" onClick={() => addNewNode("histogram")}>
                Line
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export { Sidebar };
