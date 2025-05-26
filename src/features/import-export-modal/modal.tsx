import React from "react";
import html2canvas from "html2canvas";
import { Button, Divider, FileInput, Modal, Menu } from "@mantine/core";
import { useReactFlow } from "@xyflow/react";
import { BiBarChart, BiDownload, BiChalkboard, BiSolidFileImport } from "react-icons/bi";
import { parseJsonFile } from "@/utils/parse-json-file";
import { IEdge, INode } from "@/config/types";
import { downloadFile } from "@/utils/download-file";
import { useLayoutContext } from "@/contexts/layout-context";
import { useSimulationContext } from "@/contexts/simulation-context";
import { waitAsync } from "@/utils/waitAsync";

const FILE_TYPE = "text/plain";

type IBoardState = {
  nodes: INode[];
  edges: IEdge[];
};

type IProps = {
  opened: boolean;
  close: () => unknown;
};

export const ImportExportModal: React.ComponentType<IProps> = ({ opened, close }) => {
  const flow = useReactFlow<INode, IEdge>();
  const { charts } = useSimulationContext();
  const { setSimulationOpen } = useLayoutContext();

  const [inputFile, setInputFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState("");

  function selectInputFile(file: File | null) {
    if (file && file.type !== FILE_TYPE) {
      setError("Select a valid .txt file!");
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
      setError(error?.message || "Error trying to read the selected file!");
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
      alert("Chart not found");
      return;
    }

    const canvas = await html2canvas(chartElement);
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "chart-graphs.png".toLowerCase();
    link.click();
  }

  React.useEffect(() => {
    if (!opened) {
      setError("");
      setInputFile(null);
    }
  }, [opened]);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Import & Export" classNames={{ title: "text-xl font-medium" }} centered>
        <Divider mb="md" />

        <div className="flex flex-col gap-6 pb-4">
          <div className="flex flex-col gap-4">
            <span className="font-medium text-base m-0">Export current state</span>

            <Menu withArrow shadow="md" width={200}>
              <Menu.Target>
                <Button leftSection={<BiDownload />} color="green">
                  Download
                </Button>
              </Menu.Target>

              <Menu.Dropdown w="100%" maw="250px">
                <Menu.Item leftSection={<BiChalkboard size={14} />} onClick={exportBoard}>
                  Board <span className="text-gray-400">(.txt)</span>
                </Menu.Item>
                <Menu.Item leftSection={<BiBarChart size={14} />} onClick={exportGraphImages} disabled={charts.length === 0}>
                  Graphs <span className="text-gray-400">(.png)</span>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>

          <Divider />

          <div className="flex flex-col gap-4">
            <span className="font-medium text-base">Import new board</span>
            <FileInput onChange={selectInputFile} accept=".txt" placeholder="Select file (.txt)" error={error} />

            <Button
              leftSection={<BiSolidFileImport />}
              color="blue"
              px="xl"
              disabled={!inputFile}
              onClick={() => inputFile && importBoard(inputFile)}>
              Import
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
