import React from "react";
import { DiceGeneratorNode } from "@/features/dice-generator";
import { DiceSumNode } from "@/features/dice-sum";
import { HistogramNode } from "@/features/histogram";
import { DicePoolNode } from "@/features/dice-pool";
import { DicePoolSumNode } from "@/features/dice-pool-sum";
import { INodeStatus, INodeType } from "./types";
import { DiceSuccessNode } from "@/features/dice-success";

export const NODE_TYPES: Record<INodeType, React.ComponentType<any>> = {
  diceGenerator: DiceGeneratorNode,
  histogram: HistogramNode,
  diceSum: DiceSumNode,
  dicePool: DicePoolNode,
  dicePoolSum: DicePoolSumNode,
  diceSuccess: DiceSuccessNode,
};

export const NODE_STATUS_TO_LABEL: Record<INodeStatus, string> = {
  FINISHED: "Finished",
  IDLE: "Idle",
  ERROR: "Erro",
  LOADING: "Loading",
  MISSING_DATA: "Missing data",
};
