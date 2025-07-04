import { FunctionComponent } from "react";
import { Accordion, ActionIcon, Select, Tooltip } from "@mantine/core";
import { GiGearStickPattern, GiPerspectiveDiceOne, GiPerspectiveDiceSixFacesRandom, GiSwapBag } from "react-icons/gi";
import { IoBarChartSharp, IoFilterSharp } from "react-icons/io5";
import { VscTrash } from "react-icons/vsc";
import { BiMath, BiWorld } from "react-icons/bi";
import { useReactFlow } from "@xyflow/react";
import { useTranslation } from "react-i18next";
import { INodeType } from "@/config/types";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

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
      <div className="px-4 mt-2 mb-2">
        <img src="logo/md.png" alt="Node Crafter logo" className="w-full pointer-events-none" draggable={false} />
      </div>

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
                {t("nodeFullName.diceExplode")}
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

              <li className="sidebar-item" onClick={() => addNewNode("bagPullWithoutRepetition")}>
                {t("nodeFullName.bagPullWithoutRepetition")}
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="operations">
          <Accordion.Control icon={<BiMath className="text-[22px]" />}>{t("common.operations")}</Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="sidebar-item" onClick={() => addNewNode("diceMath")}>
                {t("nodeShortName.diceMath")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceAbsolute")}>
                {t("nodeShortName.diceAbsolute")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("diceCountRepetition")}>
                {t("nodeShortName.diceCountRepetition")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("dicePoolSum")}>
                {t("nodeFullName.dicePoolSum")}
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="parameters">
          <Accordion.Control icon={<HiOutlineAdjustmentsHorizontal className="text-[22px]" />}>{t("common.parameters")}</Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="sidebar-item" onClick={() => addNewNode("integerValue")}>
                {t("nodeShortName.integerValue")}
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="logical">
          <Accordion.Control icon={<GiGearStickPattern className="text-[22px]" />}>{t("common.logical")}</Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
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
              <li className="sidebar-item" onClick={() => addNewNode("valueIsEven")}>
                {t("nodeShortName.valueIsEven")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("valueIsOdd")}>
                {t("nodeShortName.valueIsOdd")}
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="pools">
          <Accordion.Control icon={<GiSwapBag className="text-[22px]" />}>{t("common.pools")}</Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="sidebar-item" onClick={() => addNewNode("dicePool")}>
                {t("nodeFullName.dicePool")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("mergeDicePools")}>
                {t("nodeFullName.mergeDicePools")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("symbolicPool")}>
                {t("nodeShortName.symbolicPool")}
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="filters">
          <Accordion.Control icon={<IoFilterSharp className="text-[22px]" />}>{t("common.filters")}</Accordion.Control>

          <Accordion.Panel className="bg-white">
            <ul className="flex flex-col">
              <li className="sidebar-item" onClick={() => addNewNode("selectRandomDice")}>
                {t("nodeFullName.selectRandomDice")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("selectHighestDice")}>
                {t("nodeFullName.selectHighestDice")}
              </li>
              <li className="sidebar-item" onClick={() => addNewNode("selectRandomSymbol")}>
                {t("nodeShortName.selectRandomSymbol")}
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="output">
          <Accordion.Control icon={<IoBarChartSharp className="text-[22px]" />}>{t("common.output")}</Accordion.Control>

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
