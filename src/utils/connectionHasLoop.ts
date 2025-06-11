import { IEdge, INode } from "@/config/types";
import { ReactFlowInstance } from "@xyflow/react";

export function connectionHasLoop(flow: ReactFlowInstance<INode, IEdge>, sourceId: string, targetId: string) {
  const parentEdges = flow.getEdges().filter((edge) => edge.target === sourceId);

  for (const edge of parentEdges) {
    const parentNode = flow.getNode(edge.source);
    if (parentNode && parentNode.id === targetId) return true;
  }

  return false;
}
