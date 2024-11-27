import React from "react";
import { AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineLoading } from "react-icons/ai";
import { MdReportProblem } from "react-icons/md";
import { cls } from "@/utils/cls";
import { INodeStatus } from "@/config/types";

const STATUS_TO_ICON = (status: INodeStatus) => {
  switch (status) {
    case "IDLE":
      return <AiOutlineClockCircle />;
    case "FINISHED":
      return <AiOutlineCheckCircle />;
    case "ERROR":
      return <MdReportProblem />;
    case "LOADING":
      return <AiOutlineLoading />;
    case "MISSING_DATA":
      return <MdReportProblem />;
    default:
      return <MdReportProblem />;
  }
};

const statusClasses: Record<INodeStatus, string> = {
  IDLE: "text-orange-500",
  ERROR: "text-red-500 opacity-80",
  MISSING_DATA: "text-red-500 opacity-80",
  LOADING: "text-orange-500",
  FINISHED: "text-green-500",
};

export const NodeStatus: React.ComponentType<{ status: INodeStatus }> = ({ status }) => {
  return (
    <div
      className={cls("flex items-center justify-center text-[0.6rem] font-bold uppercase tracking-[0.1rem] text-center opacity-40")}
      data-status={status}>
      <span className={cls(statusClasses[status])}>{STATUS_TO_ICON(status)}</span>
    </div>
  );
};
