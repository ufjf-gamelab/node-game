import React from "react";
import { BaseNodeProperties } from "@/components/ui/base-node-properties";
import { IHistogramNode } from "@/config/types";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";
import { Select } from "@mantine/core";

export const HistogramProperties: React.FunctionComponent<{ node: IHistogramNode }> = ({ node }) => {
  const flow = useReactFlow();
  const [sortDirection, setSortDirection] = React.useState(node.data.sortDirection);
  const sortOptions: Array<IHistogramNode["data"]["sortDirection"]> = ["asc", "desc"];

  function handleChangeOperation(value: string | null) {
    const newValue = value as IHistogramNode["data"]["sortDirection"];
    setSortDirection(newValue);
    node.data.sortDirection = newValue;
  }

  useDebounce(() => flow.updateNodeData(node.id, { ...node.data, sortDirection }), 500, [sortDirection]);

  return (
    <BaseNodeProperties
      node={node}
      children={
        <Select
          label="Sort"
          placeholder="Pick value"
          className="capitalize"
          value={sortDirection}
          onChange={(value) => handleChangeOperation(value)}
          data={sortOptions}
        />
      }
    />
  );
};
