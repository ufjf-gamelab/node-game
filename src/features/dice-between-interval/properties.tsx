import React from "react";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";
import { NumberInput } from "@mantine/core";
import { BaseNodeProperties } from "@/components/ui/base-node-properties";
import { IDiceBetweenIntervalNode } from "@/config/types";

type IProps = {
  node: IDiceBetweenIntervalNode;
};

export const DiceBetweenIntervalProperties: React.FunctionComponent<IProps> = ({ node }) => {
  const flow = useReactFlow();
  const [min, setMin] = React.useState(node.data.min);
  const [max, setMax] = React.useState(node.data.max);

  function handleChangeMax(value: string | number) {
    const newValue = isNaN(Number(value)) ? 0 : Number(value);
    setMax(newValue);
    node.data.max = newValue;
  }

  function handleChangeMin(value: string | number) {
    const newValue = isNaN(Number(value)) ? 0 : Number(value);
    setMin(newValue);
    node.data.min = newValue;
  }

  useDebounce(() => flow.updateNodeData(node.id, { ...node.data, min, max }), 500, [min, max]);

  return (
    <BaseNodeProperties
      node={node}
      children={
        <>
          <NumberInput label="Minimum value" value={min} onChange={handleChangeMin} max={max} />
          <NumberInput label="Maximum value" value={max} onChange={handleChangeMax} min={min} />
        </>
      }
    />
  );
};
