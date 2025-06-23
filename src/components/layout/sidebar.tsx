import { FunctionComponent } from "react";
import { Accordion, ActionIcon, Select, Tooltip } from "@mantine/core";
import { GiPerspectiveDiceOne, GiPerspectiveDiceSixFacesRandom, GiSwapBag } from "react-icons/gi";
import { IoBarChartSharp } from "react-icons/io5";
import { VscTrash } from "react-icons/vsc";

import { INodeType } from "@/config/types";
import { useReactFlow } from "@xyflow/react";
import { useTranslation } from "react-i18next";
import { BiWorld } from "react-icons/bi";

type IProps = { addNewNode: (type: INodeType) => void };

const Sidebar: FunctionComponent<IProps> = ({ addNewNode }) => {
  const flow = useReactFlow();
  const { t, i18n } = useTranslation();

  function clearBoard() {
    flow.setEdges([]);
    flow.setNodes([]);
  }

  function changeLanguage(lang: string | null) {
    if (!lang) return;
    i18n.changeLanguage(lang);
  }

  return (
    <aside className="text-[14px] text-slate-900 fixed z-20 left-0 top-0 bg-white h-screen w-48 flex flex-col border-r select-none">
      <Accordion
        variant="contained"
        chevronPosition="right"
        defaultValue={["dice", "output"]}
        classNames={{ content: "p-0", item: "border-x-0" }}
        multiple>
        <Accordion.Item value="dice">
          <Accordion.Control icon={<GiPerspectiveDiceOne className="text-[22px]" />}>{t("common.dice")}</Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="sidebar-item" onClick={() => addNewNode("diceGenerator")}>
                {t("nodeFullName.diceGenerator")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceExplode")}>
                {t("nodeShortName.diceExplode")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceMath")}>
                {t("nodeShortName.diceMath")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("integerValue")}>
                {t("nodeShortName.integerValue")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceAbsolute")}>
                {t("nodeShortName.diceAbsolute")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("dicePool")}>
                {t("nodeShortName.dicePool")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("mergeDicePools")}>
                {t("nodeShortName.mergeDicePools")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("dicePoolSum")}>
                {t("nodeShortName.dicePoolSum")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("selectRandomDice")}>
                {t("nodeShortName.selectRandomDice")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceLogical")}>
                {t("nodeShortName.diceLogical")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("andLogical")}>
                {t("nodeShortName.andLogical")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("orLogical")}>
                {t("nodeShortName.orLogical")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceSuccess")}>
                {t("nodeShortName.diceSuccess")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceBetweenInterval")}>
                {t("nodeShortName.diceBetweenInterval")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceCountRepetition")}>
                {t("nodeShortName.diceCountRepetition")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("valueIsEven")}>
                {t("nodeShortName.valueIsEven")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("valueIsOdd")}>
                {t("nodeShortName.valueIsOdd")}
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="bag">
          <Accordion.Control icon={<GiSwapBag className="text-[22px]" />}>{t("common.bag")}</Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="sidebar-item" onClick={() => addNewNode("bagGenerator")}>
                {t("nodeFullName.bagGenerator")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("bagPullWithoutRepetition")}>
                {t("nodeShortName.bagPullWithoutRepetition")}
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="symbolic">
          <Accordion.Control icon={<GiPerspectiveDiceSixFacesRandom className="text-[22px]" />}>{t("common.symbolic")}</Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="sidebar-item" onClick={() => addNewNode("symbolicGenerator")}>
                {t("nodeFullName.symbolicGenerator")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("symbolicPool")}>
                {t("nodeShortName.symbolicPool")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("selectRandomSymbol")}>
                {t("nodeShortName.selectRandomSymbol")}
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="output">
          <Accordion.Control className="px-4 hover:bg-slate-100">
            <div className="flex gap-4 items-center justify-start">
              <IoBarChartSharp className="text-[22px]" />
              <span>{t("common.output")}</span>
            </div>
          </Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="sidebar-item" onClick={() => addNewNode("histogram")}>
                {t("nodeShortName.histogram")}
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <div className="flex justify-between gap-4 items-end h-full pb-2 px-2">
        <Tooltip label={t("sidebar.clearTooltip")}>
          <ActionIcon variant="filled" color="red" onClick={clearBoard}>
            <VscTrash />
          </ActionIcon>
        </Tooltip>

        <Select
          size="xs"
          leftSection={<BiWorld className="text-[18px]" />}
          value={i18n.language}
          onChange={changeLanguage}
          data={[
            { label: t("sidebar.english"), value: "en" },
            { label: t("sidebar.portuguese"), value: "pt-BR" },
          ]}
        />
      </div>
    </aside>
  );
};

export { Sidebar };
