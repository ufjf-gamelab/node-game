import { IHistogramNode, INode, IEdge, INodeState } from "@/config/types";
import { ReactFlowInstance } from "@xyflow/react";
import { NodeManager } from "./node-manager";

export function runIterative(flow: ReactFlowInstance<INode, IEdge>, histogramNode: IHistogramNode): INodeState<IHistogramNode> {
  const stack: INode[] = [histogramNode];
  const results = new Map<string, INodeState>();
  const visited = new Set<string>();
  let iterations = 0;

  while (stack.length > 0) {
    if (++iterations > 10000) {
      throw new Error("Execution aborted: possible infinite loop detected.");
    }

    const currentNode = stack[stack.length - 1];
    console.log(currentNode.id, currentNode.type);

    const nodeEdges = flow.getEdges().filter((edge) => edge.target === currentNode.id);
    const sourceNodes = nodeEdges.map((edge) => flow.getNode(edge.source)).filter(Boolean) as INode[];
    const inputs: { node: INode; state: INodeState }[] = [];

    let allInputsReady = true;
    for (const sourceNode of sourceNodes) {
      const resultState = results.get(sourceNode.id);
      if (!resultState) {
        if (!visited.has(sourceNode.id)) {
          stack.push(sourceNode);
          visited.add(sourceNode.id);
        }
        allInputsReady = false;
        break;
      }
      inputs.push({ node: sourceNode, state: resultState });
    }

    if (!allInputsReady) continue;

    try {
      const resultState = NodeManager.runIterative(currentNode, inputs);
      results.set(currentNode.id, resultState);
      flow.updateNodeData(currentNode.id, { ...currentNode.data, status: "FINISHED" });
      stack.pop();
    } catch (error) {
      flow.updateNodeData(currentNode.id, { ...currentNode.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  }

  const finalState = results.get(histogramNode.id) as INodeState<IHistogramNode> | undefined;
  console.log("finalState", finalState);

  if (!finalState) throw new Error("Histogram state not found!");
  return finalState;
}
