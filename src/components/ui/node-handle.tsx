import React from "react";
import { Tooltip } from "@mantine/core";
import { Handle, Position } from "@xyflow/react";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { IoMdSwitch } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { BiText } from "react-icons/bi";
import { GrEmergency } from "react-icons/gr";
import { cls } from "@/utils/cls";

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

  return (
    <Tooltip
      label={props.dataType ? t(`nodeHandleTooltip.${props.type}.${props.dataType}`) : t(`nodeHandleTooltip.${props.type}`)}
      className="pointer-events-none">
      <Handle
        id={props.id}
        type={props.type}
        position={props.position}
        isConnectable={props.isConnectable}
        isValidConnection={(connection) => (props.isValidConnection ? props.isValidConnection(connection.target) : true)}
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
