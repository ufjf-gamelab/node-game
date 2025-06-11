import React from "react";
import { useTranslation } from "react-i18next";
import { cls } from "@/utils/cls";
import { connectionHasLoop } from "@/utils/connectionHasLoop";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Tooltip } from "@mantine/core";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { IoMdSwitch } from "react-icons/io";
import { BiText } from "react-icons/bi";
import { GrEmergency } from "react-icons/gr";
import { IEdge, INode } from "@/config/types";

type IProps = {
  type: "source" | "target";
  dataType?: "numeric" | "boolean" | "symbolic";
  id: string;
  position: Position;
  isConnectable: boolean;
  isValidConnection?: (targetId: string) => boolean;
  className?: string;
};

const NodeHandle: React.FunctionComponent<IProps> = (props) => {
  const { t } = useTranslation();
  const flow = useReactFlow<INode, IEdge>();

  function handleValidConnection(sourceId: string, targetId: string) {
    if (targetId === sourceId) return false;

    const hasLoop = connectionHasLoop(flow.getEdges(), sourceId, targetId);
    if (hasLoop) return false;

    if (props.isValidConnection) return props.isValidConnection(targetId);
    return true;
  }

  return (
    <Tooltip
      label={props.dataType ? t(`nodeHandleTooltip.${props.type}.${props.dataType}`) : t(`nodeHandleTooltip.${props.type}`)}
      className="pointer-events-none">
      <Handle
        id={props.id}
        type={props.type}
        position={props.position}
        isConnectable={props.isConnectable}
        isValidConnection={(connection) => handleValidConnection(connection.source, connection.target)}
        isConnectableStart={props.type === "source"}
        className={cls("flex items-center justify-center !pointer-events-auto", props.className)}>
        {props.dataType === "numeric" && <AiOutlineFieldNumber className="text-white w-3  pointer-events-none" />}
        {props.dataType === "boolean" && <IoMdSwitch className="text-white w-3 pointer-events-none" />}
        {props.dataType === "symbolic" && <BiText className="text-white w-3 pointer-events-none" />}
        {!props.dataType && <GrEmergency className="text-white w-2 pointer-events-none" />}
      </Handle>
    </Tooltip>
  );
};

export { NodeHandle };
