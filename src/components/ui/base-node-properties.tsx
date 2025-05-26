import React from "react";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";
import { INode } from "@/config/types";
import { Button, Modal, ScrollArea, TextInput } from "@mantine/core";
import { NodeDoc } from "./node-doc";
import { BiSolidCog, BiSolidHelpCircle } from "react-icons/bi";
import { useElementSize } from "@mantine/hooks";

type IProps = {
  node: INode;
  children?: React.ReactNode;
};

export const BaseNodeProperties: React.FunctionComponent<IProps> = ({ node, children }) => {
  const flow = useReactFlow();
  const { ref: titleElRef, height: titleHeight } = useElementSize();
  const [name, setName] = React.useState(node.data.name);
  const [helpModal, setHelpModal] = React.useState(false);

  useDebounce(() => flow.updateNodeData(node.id, { ...node.data, name }), 500, [name]);

  const scrollAreaHeight = React.useMemo(() => {
    if (!titleHeight) return 0;
    return window.innerHeight - (titleHeight + 10);
  }, [titleHeight]);

  return (
    <div className="flex flex-col h-full">
      <div className="border-b-1 px-2 py-4 text-center text-xl" ref={titleElRef}>
        <h2>{node.data.propertiesTitle}</h2>
      </div>

      <ScrollArea type="hover" h={scrollAreaHeight}>
        <Button
          variant="default"
          className="w-full border-x-0 pointer-events-none"
          radius="0"
          tabIndex={-1}
          leftSection={<BiSolidCog className="text-slate-700 text-[22px]" />}>
          Properties
        </Button>

        <div className="flex flex-col gap-2 px-3 pt-2 pb-4">
          <TextInput label="Node ID" value={node.id} readOnly />
          <TextInput label="Status" value={node.data.status} readOnly />
          <TextInput
            label="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              node.data.name = e.target.value;
            }}
          />

          {children}
        </div>

        <Button
          variant="default"
          className="w-full border-x-0 focus:outline-1 outline-offset-0"
          radius="0"
          onClick={() => setHelpModal(true)}
          leftSection={<BiSolidHelpCircle className="text-slate-700 text-[22px]" />}>
          Help
        </Button>
      </ScrollArea>

      <Modal opened={helpModal} onClose={() => setHelpModal(false)} size={"xl"} withCloseButton={false}>
        <NodeDoc nodeType={node.type} />
      </Modal>
    </div>
  );
};
