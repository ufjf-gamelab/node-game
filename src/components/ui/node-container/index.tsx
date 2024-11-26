import React, { ReactNode } from "react";

export const NodeContainer: React.FC<{ children?: ReactNode; selected?: boolean; title?: string }> = ({ children, selected, ...restProps }) => {
  return (
    <div className={"py-1 px-4 rounded-sm border border-gray-400 cursor-move " + `${selected ? "bg-blue-200" : "bg-white"}`} {...restProps}>
      {children}
    </div>
  );
};
