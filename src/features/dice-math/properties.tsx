import React from "react";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";
import { IDiceMathNode } from "@/config/types";
import { BaseNodeProperties } from "@/components/ui/base-node-properties";
import { DICE_MATH_OPERATIONS } from "@/config/constants";
import { Select } from "@mantine/core";

export const DiceMathProperties: React.FunctionComponent<{ node: IDiceMathNode }> = ({ node }) => {
  const flow = useReactFlow();
  const [operation, setOperation] = React.useState(node.data.operation);

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
        <div className="w-full flex items-center justify-between border-b py-2 gap-4">
          <label className="whitespace-nowrap w- font-medium" htmlFor="operation">
            Operation
          </label>

          <Select
            placeholder="Pick value"
            value={operation}
            className="capitalize"
            onChange={(value) => handleChangeOperation(value)}
            data={DICE_MATH_OPERATIONS.map((operation) => ({
              value: operation,
              label: operation.charAt(0).toUpperCase() + operation.slice(1),
            }))}
          />
        </div>
      }
    />
  );
};
