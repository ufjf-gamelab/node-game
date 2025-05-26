import React from "react";
import { cls } from "@/utils/cls";
import { useTranslation } from "react-i18next";
import { BiImport, BiPlay, BiReset, BiSolidChevronUp } from "react-icons/bi";
import { Button, Tooltip } from "@mantine/core";
import { ImportExportModal } from "@/features/import-export-modal";
import { useLayoutContext } from "@/contexts/layout-context";

type IProps = {
  loading: boolean;
  runSimulation: () => Promise<void>;
  clearSimulation: () => void;
};

export const ActionBar: React.FC<IProps> = ({ loading, runSimulation, clearSimulation }) => {
  const { t } = useTranslation();
  const [importModal, setImportModal] = React.useState(false);
  const { simulationOpen, setSimulationOpen, asidePropertiesOpen, sidebarWidth, asidePropertiesWidth } = useLayoutContext();

  async function startSimulation() {
    await runSimulation();
    setSimulationOpen(true);
  }

  const containerStyles: React.CSSProperties = {
    left: `calc(${sidebarWidth}px + (100vw - ${sidebarWidth}px - ${asidePropertiesOpen ? asidePropertiesWidth : 0}px) / 2)`,
    top: "calc(100vh - 52px)",
  };

  return (
    <>
      <div
        className="absolute z-[15] flex gap-4 h-16 justify-center transform -translate-x-1/2 transition-all duration-300 p-2 pb-8 rounded-md bg-white border border-gray-300 select-none"
        style={containerStyles}>
        <Tooltip label={t("taskBar.startTooltip")}>
          <Button color="green" loading={loading} leftSection={<BiPlay className="text-xl" />} onClick={startSimulation}>
            {t("taskBar.start")}
          </Button>
        </Tooltip>

        <Tooltip label={t("taskBar.clearTooltip")}>
          <Button color="red" leftSection={<BiReset className="text-xl" />} onClick={clearSimulation}>
            {t("taskBar.clear")}
          </Button>
        </Tooltip>

        <Button leftSection={<BiImport className="text-xl" />} onClick={() => setImportModal(true)}>
          {t("taskBar.importExport")}
        </Button>

        <Tooltip label={simulationOpen ? t("taskBar.openSectionTooltip") : t("taskBar.closeSectionTooltip")}>
          <Button color="gray" onClick={() => setSimulationOpen(!simulationOpen)}>
            <BiSolidChevronUp className={cls("text-xl transition-transform duration-700", { "transform rotate-180": simulationOpen })} />
          </Button>
        </Tooltip>
      </div>

      <ImportExportModal opened={importModal} close={() => setImportModal(false)} />
    </>
  );
};
