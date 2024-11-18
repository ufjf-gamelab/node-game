import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { NodeStatus } from "@/components/ui/node-status";
import { NodeContainer } from "@/components/ui/node-container";
import { IDiceNode } from "@/config/types";
import styles from "./styles.module.scss";

type IProps = NodeProps<IDiceNode>;

export const DiceNode: React.ComponentType<IProps> = (props) => {
  return (
    <NodeContainer selected={props.selected} title={props.data.generator.label}>
      <Handle type="source" position={Position.Right} style={{ background: "#555", stroke: "#000" }} isConnectable={props.isConnectable} />

      <div className={styles.generatorNode}>
        <h1>
          <GiPerspectiveDiceSixFacesOne />
        </h1>
        <h2>
          {props.data.generator.min}-{props.data.generator.max}
        </h2>
        <NodeStatus status={props.data.generator.status} />
      </div>
    </NodeContainer>
  );
};
