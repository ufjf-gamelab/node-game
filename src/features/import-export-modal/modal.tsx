import { Button, Divider, FileInput, Modal } from "@mantine/core";
import { useReactFlow } from "@xyflow/react";
import { BiDownload } from "react-icons/bi";
import React from "react";
import { parseJsonFile } from "@/utils/parse-json-file";
import { IEdge, INode } from "@/config/types";
import { downloadFile } from "@/utils/download-file";

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

  React.useEffect(() => {
    if (!opened) {
      setError("");
      setInputFile(null);
    }
  }, [opened]);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Import & Export" classNames={{ title: "text-xl font-medium" }} centered>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-medium text-base">Import new board</span>
            <FileInput onChange={selectInputFile} accept=".txt" placeholder="Select file (.txt)" error={error} />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium text-base"> Export current board</span>
            <Button leftSection={<BiDownload />} color="green" onClick={exportBoard}>
              Download
            </Button>
          </div>
        </div>

        <Divider mt="xl" mb="lg" />

        <div className="flex justify-between gap-4">
          <Button color="gray" px="xl" onClick={close}>
            Cancelar
          </Button>
          <Button color="blue" px="xl" disabled={!inputFile} onClick={() => inputFile && importBoard(inputFile)}>
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};
