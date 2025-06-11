import { IEdge } from "@/config/types";

export function connectionHasLoop(edges: IEdge[], sourceId: string, targetId: string): boolean {
  const adjacencyList = new Map<string, string[]>();
  for (const edge of edges) {
    if (!adjacencyList.has(edge.source)) {
      adjacencyList.set(edge.source, []);
    }
    adjacencyList.get(edge.source)!.push(edge.target);
  }

  function hasPathDFS(current: string, target: string, visited: Set<string>): boolean {
    if (current === target) return true;
    if (visited.has(current)) return false;

    visited.add(current);

    const neighbors = adjacencyList.get(current) || [];
    for (const neighbor of neighbors) {
      if (hasPathDFS(neighbor, target, visited)) return true;
    }

    return false;
  }

  // Se já há caminho de targetId até sourceId, a nova conexão criaria um ciclo
  return hasPathDFS(targetId, sourceId, new Set());
}
