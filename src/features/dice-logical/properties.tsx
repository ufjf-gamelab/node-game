import React from "react";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";
import { IDiceLogicalNode } from "@/config/types";
import { BaseNodeProperties } from "@/components/ui/base-node-properties";
import { DICE_LOGICAL_OPERATIONS } from "@/config/constants";
import { Select } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const DiceLogicalProperties: React.FunctionComponent<{ node: IDiceLogicalNode }> = ({ node }) => {
  const { t } = useTranslation();
  const flow = useReactFlow();
  const [operation, setOperation] = React.useState(node.data.operation);
  const operationOptions = DICE_LOGICAL_OPERATIONS.map((operation) => ({ value: operation, label: operation }));

  function handleChangeOperation(value: string | null) {
    const newValue = value as IDiceLogicalNode["data"]["operation"];
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
