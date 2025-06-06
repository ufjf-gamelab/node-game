import React from "react";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";
import { IDiceMathNode } from "@/config/types";
import { BaseNodeProperties } from "@/components/ui/base-node-properties";
import { DICE_MATH_OPERATIONS } from "@/config/constants";
import { Select } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const DiceMathProperties: React.FunctionComponent<{ node: IDiceMathNode }> = ({ node }) => {
  const { t } = useTranslation();
  const flow = useReactFlow();
  const [operation, setOperation] = React.useState(node.data.operation);

  const operationOptions = DICE_MATH_OPERATIONS.map((operation) => ({
    value: operation,
    label: t(`nodeProperties.${operation}`),
  }));

  function handleChangeOperation(value: string | null) {
    const newValue = value as IDiceMathNode["data"]["operation"];
    setOperation(newValue);
    node.data.operation = newValue;
  }

  useDebounce(() => flow.updateNodeData(node.id, { ...node.data, operation }), 500, [operation]);

  return (
    <BaseNodeProperties
      node={node}
      children={
        <Select label={t("nodeProperties.operation")} value={operation} onChange={(value) => handleChangeOperation(value)} data={operationOptions} />
      }
    />
  );
};
