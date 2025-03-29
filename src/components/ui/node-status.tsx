import React from "react";
import { BiCheckCircle, BiErrorCircle, BiLoader, BiTime } from "react-icons/bi";
import { INodeStatus } from "@/config/types";
import { cls } from "@/utils/cls";

const STATUS_TO_ICON = (status: INodeStatus) => {
  switch (status) {
    case "IDLE":
      return <BiTime />;
    case "FINISHED":
      return <BiCheckCircle />;
    case "ERROR":
      return <BiErrorCircle />;
    case "LOADING":
      return <BiLoader />;
    case "MISSING_DATA":
      return <BiErrorCircle />;
    default:
      return null;
  }
};

const statusClasses: Record<INodeStatus, string> = {
  IDLE: "text-orange-500",
  ERROR: "text-red-500 opacity-80",
  MISSING_DATA: "text-red-500 opacity-80",
  LOADING: "text-orange-500",
  FINISHED: "text-green-500",
};

export const NodeStatus: React.ComponentType<{ status: INodeStatus; className?: string }> = ({ status, className }) => {
  return (
    <div
      className={cls("flex items-center justify-center text-[0.75rem] font-bold uppercase tracking-[0.1rem] text-center opacity-40", className)}
      data-status={status}>
      <span className={cls(statusClasses[status])}>{STATUS_TO_ICON(status)}</span>
    </div>
  );
};
