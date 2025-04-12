import { IValueIsEvenNode, INodeService } from "@/config/types";
import { flattenArray } from "@/utils/flatten-array";
import { NodeManager } from "@/utils/node-manager";

export const ValueIsEvenService: INodeService<IValueIsEvenNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "valueIsEven",
      data: {
        name: "Is even",
        detailsTitle: "Is Even",
        status: "IDLE",
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
      const resultState = getValueIsEven(sourceState);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function getValueIsEven(data: number[]) {
  const result: number[] = [];

  data.map((item) => {
    if (item % 2 === 0) {
      result.push(1);
    } else {
      result.push(0);
    }
  });

  return result;
}
