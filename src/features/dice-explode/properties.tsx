import React from "react";
import { useDebounce } from "react-use";
import { useReactFlow } from "@xyflow/react";
import { NumberInput } from "@mantine/core";
import { BaseNodeProperties } from "@/components/ui/base-node-properties";
import { IDiceExplodeNode } from "@/config/types";
import { useTranslation } from "react-i18next";

export const DiceExplodeProperties: React.FunctionComponent<{ node: IDiceExplodeNode }> = ({ node }) => {
  const { t } = useTranslation();
  const flow = useReactFlow();
  const [explodeFace, setExplodeFace] = React.useState(node.data.explodeFace);

  function handleChangeExplodeFace(value: string | number) {
    const newValue = isNaN(Number(value)) ? 0 : Number(value);
    setExplodeFace(newValue);
    node.data.explodeFace = newValue;
  }

  useDebounce(() => flow.updateNodeData(node.id, { ...node.data, explodeFace }), 500, [explodeFace]);

  return (
    <BaseNodeProperties
      node={node}
      children={<NumberInput label={t("nodeProperties.explodeFace")} value={explodeFace} onChange={handleChangeExplodeFace} />}
    />
  );
};
