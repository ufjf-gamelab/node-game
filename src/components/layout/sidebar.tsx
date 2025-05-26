import { FunctionComponent } from "react";
import { Accordion, ActionIcon, Select, Tooltip } from "@mantine/core";
import { GiPerspectiveDiceOne, GiPerspectiveDiceSixFacesRandom, GiSwapBag, GiHistogram } from "react-icons/gi";
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

  return (
    <aside className="text-[14px] text-slate-900 fixed z-20 left-0 top-0 bg-white h-screen w-48 flex flex-col border-r select-none">
      <Accordion variant="contained" chevronPosition="right" defaultValue={["dice"]} classNames={{ content: "p-0", item: "border-x-0" }} multiple>
        <Accordion.Item value="dice">
          <Accordion.Control icon={<GiPerspectiveDiceOne className="text-[22px]" />}>{t("common.dice")}</Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="sidebar-item" onClick={() => addNewNode("diceGenerator")}>
                {t("sidebar.diceGenerator")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceExplodeGenerator")}>
                {t("sidebar.diceExplodeGenerator")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceLogical")}>
                {t("sidebar.diceLogical")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceMath")}>
                {t("sidebar.diceMath")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceAbsolute")}>
                {t("sidebar.diceAbsolute")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("dicePool")}>
                {t("sidebar.dicePool")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("dicePoolSum")}>
                {t("sidebar.dicePoolSum")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceSuccess")}>
                {t("sidebar.diceSuccess")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceBetweenInterval")}>
                {t("sidebar.diceBetweenInterval")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceCountRepetition")}>
                {t("sidebar.diceCountRepetition")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("valueIsEven")}>
                {t("sidebar.valueIsEven")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("valueIsOdd")}>
                {t("sidebar.valueIsOdd")}
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="bag">
          <Accordion.Control icon={<GiSwapBag className="text-[22px]" />}>{t("common.bag")}</Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="sidebar-item" onClick={() => addNewNode("bagGenerator")}>
                {t("sidebar.bagGenerator")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("bagPullWithoutRepetition")}>
                {t("sidebar.bagPullWithoutRepetition")}
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="symbolic">
          <Accordion.Control icon={<GiPerspectiveDiceSixFacesRandom className="text-[22px]" />}>{t("common.symbolic")}</Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="sidebar-item" onClick={() => addNewNode("symbolicGenerator")}>
                {t("sidebar.symbolicGenerator")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("symbolicPool")}>
                {t("sidebar.symbolicPool")}
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="output">
          <Accordion.Control className="px-4 hover:bg-slate-100">
            <div className="flex gap-4 items-center justify-start">
              <GiHistogram className="text-[22px]" />
              <span>{t("common.output")}</span>
            </div>
          </Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="sidebar-item" onClick={() => addNewNode("histogram")}>
                {t("sidebar.histogram")}
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
          onChange={(value) => value && i18n.changeLanguage(value)}
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
