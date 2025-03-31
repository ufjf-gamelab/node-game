import { INodeStatus } from "@/config/types";
import React, { ReactNode } from "react";
import { NodeStatus } from "./node-status";

type IProps = {
  children?: ReactNode;
  selected?: boolean;
  name: string;
  label?: ReactNode;
  status: INodeStatus;
  icon: ReactNode;
  icons?: ReactNode[];
};

export const BaseNode: React.FC<IProps> = ({ children, selected, name, label, icon, status, ...restProps }) => {
  return (
    <div
      className={"w-[90px] h-[90px] rounded-sm border border-gray-400/80 cursor-move relative " + `${selected ? "bg-blue-200" : "bg-white"}`}
      {...restProps}>
      {children}

      <div className="flex flex-col items-center justify-center w-full h-full">
        <NodeStatus status={status} className="absolute top-1 left-1/2 -translate-x-1/2" />

        <div className="flex justify-center items-center text-5xl">{icon}</div>

        {label && <span className="text-[11px] absolute bottom-1 left-1/2 -translate-x-1/2">{label}</span>}

        <span className="absolute top-0 translate-y-[90px] w-full max-[110px] text-sm leading-tight break-words text-center">{name}</span>
      </div>
    </div>
  );
};
