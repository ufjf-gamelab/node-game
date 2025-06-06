import { IDiceLogicalOperation, IDiceMathOperation, INodeStatus } from "./types";

export const NODE_STATUS_TO_LABEL: Record<INodeStatus, string> = {
  FINISHED: "Finished",
  IDLE: "Idle",
  ERROR: "Erro",
  LOADING: "Loading",
  MISSING_DATA: "Missing data",
};

export const DICE_MATH_OPERATIONS: IDiceMathOperation[] = ["sum", "subtract", "multiply", "divide (floor)", "divide (ceil)"] as const;
export const DICE_LOGICAL_OPERATIONS: IDiceLogicalOperation[] = ["A >= B", "A <= B", "A = B"] as const;
