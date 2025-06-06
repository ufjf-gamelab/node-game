import React from "react";
import { useDebounce } from "react-use";
import { useReactFlow } from "@xyflow/react";
import { NumberInput } from "@mantine/core";
import { BaseNodeProperties } from "@/components/ui/base-node-properties";
import { IDiceExplodeGeneratorNode } from "@/config/types";

export const DiceExplodeGeneratorProperties: React.FunctionComponent<{ node: IDiceExplodeGeneratorNode }> = ({ node }) => {
  const flow = useReactFlow();
  const [explodeFace, setExplodeFace] = React.useState(node.data.explodeFace);

  function handleChangeExplodeFace(value: string | number) {
    const newValue = isNaN(Number(value)) ? 0 : Number(value);
    setExplodeFace(newValue);
    node.data.explodeFace = newValue;
  }

  useDebounce(() => flow.updateNodeData(node.id, { ...node.data, explodeFace }), 500, [explodeFace]);

  return <BaseNodeProperties node={node} children={<NumberInput label="Explode face" value={explodeFace} onChange={handleChangeExplodeFace} />} />;
};
