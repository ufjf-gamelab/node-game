import React from "react";
import { Button, Divider, FileInput, Modal, Menu } from "@mantine/core";
import { useReactFlow } from "@xyflow/react";
import { BiBarChart, BiDownload, BiChalkboard, BiSolidFileImport, BiSolidFile } from "react-icons/bi";
import { parseJsonFile } from "@/utils/parse-json-file";
import { IEdge, INode } from "@/config/types";
import { downloadFile } from "@/utils/download-file";
import { useLayoutContext } from "@/contexts/layout-context";
import { useSimulationContext } from "@/contexts/simulation-context";
import { waitAsync } from "@/utils/waitAsync";
import { downloadElementImage } from "@/utils/downloadElementImage";
import { useTranslation } from "react-i18next";

const FILE_TYPE = "text/plain";

type IBoardState = {
  nodes: INode[];
  edges: IEdge[];
};

type IProps = {
  opened: boolean;
  close: () => unknown;
};

export const ModalImportExport: React.ComponentType<IProps> = ({ opened, close }) => {
  const { t } = useTranslation();
  const flow = useReactFlow<INode, IEdge>();
  const { charts } = useSimulationContext();
  const { setSimulationOpen } = useLayoutContext();

  const [inputFile, setInputFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState("");

  function selectInputFile(file: File | null) {
    if (file && file.type !== FILE_TYPE) {
      setError(t("modalImportExport.invalidFile"));
      setInputFile(null);
    } else {
      setError("");
      setInputFile(file);
    }
  }

  async function importBoard(file: File) {
    try {
      const boardState = await parseJsonFile<IBoardState>(file);
      flow.setNodes(boardState.nodes);
      flow.setEdges(boardState.edges);
      close();
    } catch (error) {
      setError(t("modalImportExport.readFileError"));
    }
  }

  function exportBoard() {
    const boardState: IBoardState = {
      nodes: flow.getNodes().map((node) => ({ ...node, data: { ...node.data, status: "IDLE" } } as INode)),
      edges: flow.getEdges(),
    };
    const file = new Blob([JSON.stringify(boardState)], { type: FILE_TYPE });
    downloadFile(file, `node-crafter-export-${new Date().getTime()}.txt`);
  }

  async function exportGraphImages() {
    setSimulationOpen(true);
    await waitAsync(300);
    const chartElement = document.getElementById("charts-container");
    if (!chartElement) {
      alert(t("modalImportExport.chartNotFound"));
      return;
    }

    await downloadElementImage(chartElement, "chart-graphs");
  }

  React.useEffect(() => {
    if (!opened) {
      setError("");
      setInputFile(null);
    }
  }, [opened]);

  return (
    <Modal opened={opened} onClose={close} title={t("modalImportExport.modalTitle")} classNames={{ title: "text-xl font-medium" }} centered>
      <Divider mb="md" />

      <div className="flex flex-col gap-6 pb-4">
        <div className="flex flex-col gap-4">
          <span>{t("modalImportExport.exportTitle")}</span>

          <Menu withArrow shadow="md" width={200}>
            <Menu.Target>
              <Button leftSection={<BiDownload />} color="green">
                {t("modalImportExport.download")}
              </Button>
            </Menu.Target>

            <Menu.Dropdown w="100%" maw="250px">
              <Menu.Item leftSection={<BiChalkboard size={14} />} onClick={exportBoard}>
                {t("modalImportExport.downloadBoard")} <span className="text-gray-400">(.txt)</span>
              </Menu.Item>
              <Menu.Item leftSection={<BiBarChart size={14} />} onClick={exportGraphImages} disabled={charts.length === 0}>
                {t("modalImportExport.downloadGraphs")} <span className="text-gray-400">(.png)</span>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        <Divider />

        <div className="flex flex-col gap-4">
          <span>{t("modalImportExport.importTitle")}</span>

          <FileInput
            value={inputFile}
            onChange={selectInputFile}
            accept=".txt"
            placeholder={t("modalImportExport.filePlaceholder")}
            leftSection={<BiSolidFile />}
            error={error}
          />

          <Button leftSection={<BiSolidFileImport />} color="blue" px="xl" disabled={!inputFile} onClick={() => inputFile && importBoard(inputFile)}>
            {t("modalImportExport.import")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
