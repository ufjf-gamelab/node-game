import React from "react";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";
import { NumberInput } from "@mantine/core";
import { IIntegerValueNode } from "@/config/types";
import { BaseNodeProperties } from "@/components/ui/base-node-properties";
import { useTranslation } from "react-i18next";

export const IntegerValueProperties: React.FunctionComponent<{ node: IIntegerValueNode }> = ({ node }) => {
  const { t } = useTranslation();
  const flow = useReactFlow();
  const [value, setValue] = React.useState(node.data.value);

  function handleChangeMin(value: string | number) {
    const newValue = isNaN(Number(value)) ? 0 : Number(value);
    setValue(newValue);
    node.data.value = newValue;
  }

  useDebounce(() => flow.updateNodeData(node.id, { ...node.data, value }), 500, [value]);

  return <BaseNodeProperties node={node} children={<NumberInput label={t("nodeProperties.value")} value={value} onChange={handleChangeMin} />} />;
};
