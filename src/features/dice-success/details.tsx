import React from "react";
import { BaseNodeDetails } from "@/components/ui/base-node-details";
import { IDiceSuccessNode } from "@/config/types";

export const DiceSuccessDetails: React.FunctionComponent<{ node: IDiceSuccessNode }> = ({ node }) => {
  return <BaseNodeDetails node={node} children={<></>} />;
};
