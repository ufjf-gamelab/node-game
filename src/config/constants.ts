import React from "react";
import { DiceGeneratorNode } from "@/features/dice-generator";
import { DiceSumNode } from "@/features/dice-sum";
import { HistogramNode } from "@/features/histogram";
import { INodeStatus, INodeType } from "./types";

export const NODE_TYPES: Record<INodeType, React.ComponentType<any>> = {
  diceGenerator: DiceGeneratorNode,
  histogram: HistogramNode,
  diceSum: DiceSumNode,
};

export const NODE_STATUS_TO_LABEL: Record<INodeStatus, string> = {
  FINISHED: "Finished",
  IDLE: "Idle",
  ERROR: "Erro",
  LOADING: "Loading",
  MISSING_DATA: "Missing data",
};
