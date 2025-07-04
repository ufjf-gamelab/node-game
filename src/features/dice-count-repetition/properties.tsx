import React from "react";
import { BaseNodeProperties } from "@/components/ui/base-node-properties";
import { IDiceCountRepetitionNode } from "@/config/types";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";
import { TextInput } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const DiceCountRepetitionProperties: React.FunctionComponent<{ node: IDiceCountRepetitionNode }> = ({ node }) => {
  const { t } = useTranslation();
  const flow = useReactFlow();
  const [face, setFace] = React.useState(node.data.face);

  function handleChangeFace(value: string) {
    setFace(value);
    node.data.face = value;
  }

  useDebounce(() => flow.updateNodeData(node.id, { ...node.data, face }), 500, [face]);

  return (
    <BaseNodeProperties
      node={node}
      children={<TextInput label={t("nodeProperties.valueToCount")} value={face} onChange={(e) => handleChangeFace(e.target.value)} />}
    />
  );
};
