import { i18n } from "@/config/i18n";
import { IDiceSuccessNode, INodeService } from "@/config/types";
import { flattenArray } from "@/utils/flatten-array";
import { NodeManager } from "@/utils/node-manager";

export const DiceSuccessService: INodeService<IDiceSuccessNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceSuccess",
      data: {
        name: i18n.t("nodeShortName.diceSuccess"),
        status: "IDLE",
        state: [],
        face: 6,
      },
    };
  },

  run(flow, node) {
    try {
      const edge = flow.getEdges().find((edge) => edge.target === node.id);
      if (!edge) throw new Error("Connection not found!");

      const sourceNode = flow.getNode(edge.source);
      if (!sourceNode) throw new Error("Source connection not found!");

      const sourceState = flattenArray(NodeManager.run(sourceNode, flow) as number[] | number[][]);
      const resultState = getArraySuccess(sourceState, node.data.face);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function getArraySuccess(data: number[], face: number) {
  const result: number[] = [];

  data.map((item) => {
    if (item >= face) {
      result.push(1);
    } else {
      result.push(0);
    }
  });

  return result;
}
