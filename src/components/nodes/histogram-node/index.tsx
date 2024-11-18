import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { NodeContainer } from "@/components/ui/node-container";
import { IHistogramNode } from "@/config/types";
import { GiHistogram } from "react-icons/gi";
import styles from "./styles.module.scss";
import { NodeStatus } from "@/components/ui/node-status";

type IProps = NodeProps<IHistogramNode>;

export const HistogramNode: React.ComponentType<IProps> = ({ data, selected, isConnectable }) => {
  return (
    <NodeContainer selected={selected}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />

      <div className={styles.histogramNode}>
        <h1>
          <GiHistogram />
        </h1>
        <NodeStatus status={data.status} />
      </div>
    </NodeContainer>
  );
};

// Adicionar input no proprio node?
