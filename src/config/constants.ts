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
import { DiceExplodeGeneratorNode } from "@/features/dice-explode-generator";
import { BagGeneratorNode } from "@/features/bag-generator";
import { BagPullWithoutRepetitionNode } from "@/features/bag-pull-without-repetition";
import { SymbolicGeneratorNode } from "@/features/symbolic-generator";
import { SymbolicPoolNode } from "@/features/symbolic-pool";
import { DiceSubtractNode } from "@/features/dice-subtract";

export const NODE_TYPES: Record<INodeType, React.ComponentType<any>> = {
  diceGenerator: DiceGeneratorNode,
  histogram: HistogramNode,
  diceSum: DiceSumNode,
  dicePool: DicePoolNode,
  dicePoolSum: DicePoolSumNode,
  diceSuccess: DiceSuccessNode,
  diceBetweenInterval: DiceBetweenIntervalNode,
  diceCountRepetition: DiceCountRepetitionNode,
  diceExplodeGenerator: DiceExplodeGeneratorNode,
  bagGenerator: BagGeneratorNode,
  bagPullWithoutRepetition: BagPullWithoutRepetitionNode,
  symbolicGenerator: SymbolicGeneratorNode,
  symbolicPool: SymbolicPoolNode,
  diceSubtract: DiceSubtractNode,
};

export const NODE_STATUS_TO_LABEL: Record<INodeStatus, string> = {
  FINISHED: "Finished",
  IDLE: "Idle",
  ERROR: "Erro",
  LOADING: "Loading",
  MISSING_DATA: "Missing data",
};
