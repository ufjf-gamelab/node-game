import React from "react";
import { DiceGeneratorNode } from "@/features/dice-generator";
import { DiceSumNode } from "@/features/dice-sum";
import { HistogramNode } from "@/features/histogram";
import { DicePoolNode } from "@/features/dice-pool";
import { DicePoolSumNode } from "@/features/dice-pool-sum";
import { DiceSuccessNode } from "@/features/dice-success";
import { DiceBetweenIntervalNode } from "@/features/dice-between-interval";
import { DiceCountRepetitionNode } from "@/features/dice-count-repetition";
import { INodeStatus, INodeType } from "./types";

export const NODE_TYPES: Record<INodeType, React.ComponentType<any>> = {
  diceGenerator: DiceGeneratorNode,
  histogram: HistogramNode,
  diceSum: DiceSumNode,
  dicePool: DicePoolNode,
  dicePoolSum: DicePoolSumNode,
  diceSuccess: DiceSuccessNode,
  diceBetweenInterval: DiceBetweenIntervalNode,
  diceCountRepetition: DiceCountRepetitionNode,
};

export const NODE_STATUS_TO_LABEL: Record<INodeStatus, string> = {
  FINISHED: "Finished",
  IDLE: "Idle",
  ERROR: "Erro",
  LOADING: "Loading",
  MISSING_DATA: "Missing data",
};
