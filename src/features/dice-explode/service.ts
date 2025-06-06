import { i18n } from "@/config/i18n";
import { IDiceExplodeNode, IDiceGeneratorNode, INodeService } from "@/config/types";
import { NodeManager } from "@/utils/node-manager";

export const DiceExplodeService: INodeService<IDiceExplodeNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceExplode",
      data: {
        name: i18n.t("nodeShortName.diceExplode"),
        status: "IDLE",
        explodeFace: 1,
      },
    };
  },

  run(flow, node) {
    try {
      const edge = flow.getEdges().find((edge) => edge.target === node.id);
      if (!edge) throw new Error("Connection not found!");

      const sourceNode = flow.getNode(edge.source) as IDiceGeneratorNode;
      if (!sourceNode) throw new Error("Source connection not found!");

      if (sourceNode.data.max < node.data.explodeFace) throw new Error("Explode face can't be greater than dice generator max face!");

      const sourceState = NodeManager.run(sourceNode, flow) as number[] | number[][];
      const resultState = explodeDice(sourceState, node.data.explodeFace);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function explodeDice(data: number[] | number[][], explodeFace: number): number[] {
  const result: number[] = [];
  let count = 0;

  if (Array.isArray(data[0])) {
    for (const group of data as number[][]) {
      const hasExplosion = group.some((val) => val === explodeFace);
      if (hasExplosion) {
        count++;
      } else {
        if (count > 0) {
          result.push(count);
          count = 0;
        }
      }
    }
  } else {
    for (const val of data as number[]) {
      if (val === explodeFace) {
        count++;
      } else {
        if (count > 0) {
          result.push(count);
          count = 0;
        }
      }
    }
  }

  if (count > 0) {
    result.push(count);
  }

  return result;
}
