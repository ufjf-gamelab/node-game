import React from "react";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";
import { IDiceLogicalNode } from "@/config/types";
import { BaseNodeDetails } from "@/components/ui/base-node-details";
import { DICE_LOGICAL_OPERATIONS } from "@/config/constants";
import { Select } from "@mantine/core";

export const DiceLogicalDetails: React.FunctionComponent<{ node: IDiceLogicalNode }> = ({ node }) => {
  const flow = useReactFlow();
  const [operation, setOperation] = React.useState(node.data.operation);

  function handleChangeOperation(value: string | null) {
    const newValue = value as IDiceLogicalNode["data"]["operation"];
    setOperation(newValue);
    node.data.operation = newValue;
  }

  useDebounce(() => flow.updateNodeData(node.id, { ...node.data, operation }), 500, [operation]);

  return (
    <BaseNodeDetails
      node={node}
      children={
        <div className="w-full flex items-center justify-between border-b py-2 gap-4">
          <label className="whitespace-nowrap w- font-medium" htmlFor="operation">
            Operation
          </label>

          <Select
            placeholder="Pick value"
            value={operation}
            onChange={(value) => handleChangeOperation(value)}
            data={DICE_LOGICAL_OPERATIONS.map((operation) => ({
              value: operation,
              label: operation,
            }))}
          />
        </div>
      }
    />
  );
};
