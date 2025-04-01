import { IDiceAbsoluteNode, INodeService } from "@/config/types";
import { flattenArray } from "@/utils/flatten-array";
import { NodeManager } from "@/utils/node-manager";

export const DiceAbsoluteService: INodeService<IDiceAbsoluteNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceAbsolute",
      data: {
        name: "Dice absolute",
        detailsTitle: "Dice Absolute",
        status: "IDLE",
        state: [],
      },
    };
  },

  run(flow, node) {
    try {
      const edge = flow.getEdges().find((edge) => edge.target === node.id);
      if (!edge) throw new Error("Connection not found!");

      const sourceNode = flow.getNode(edge.source);
      if (!sourceNode) throw new Error("Source connection not found!");

      const sourceState = NodeManager.run(sourceNode, flow) as number[] | number[][];
      const resultState = getAbsoluteValue(flattenArray(sourceState));

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function getAbsoluteValue(data: number[]) {
  const result: number[] = [];
  data.map((item) => result.push(Math.abs(item)));
  return result;
}
