import { i18n } from "@/config/i18n";
import { IDiceBetweenIntervalNode, INodeService } from "@/config/types";
import { NodeManager } from "@/utils/node-manager";

export const DiceBetweenIntervalService: INodeService<IDiceBetweenIntervalNode> = {
  new(_flow, { id, position }) {
    return {
      id,
      position,
      type: "diceBetweenInterval",
      data: {
        name: i18n.t("nodeShortName.diceBetweenInterval"),
        status: "IDLE",
        min: 1,
        max: 2,
        inputType: "numeric",
        outputType: "boolean",
      },
    };
  },

  run(flow, node) {
    try {
      const edge = flow.getEdges().find((edge) => edge.target === node.id);
      if (!edge) throw new Error("Connection not found!");

      const sourceNode = flow.getNode(edge.source);
      if (!sourceNode) throw new Error("Source connection not found!");

      const sourceState = NodeManager.run(sourceNode, flow) as number[];
      const resultState = getArrayFaceBetween(sourceState, node.data.min, node.data.max);

      flow.updateNodeData(node.id, { ...node.data, status: "FINISHED" });
      return resultState;
    } catch (error) {
      flow.updateNodeData(node.id, { ...node.data, status: "ERROR", errorMessage: error?.message });
      throw error;
    }
  },
};

function getArrayFaceBetween(data: number[], min: number, max: number) {
  const result = [];

  for (let i = 0; i < data.length; i++) {
    const dado1 = data[i];

    if (dado1 >= min && dado1 <= max) result.push(1);
    else result.push(0);
  }

  return result;
}
