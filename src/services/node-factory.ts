import { INode, INodeType } from "@/config/types";
import Generator from "./generator";

export default class NodeFactory {
  static newNode(type: INodeType, nodes: INode[]): INode {
    switch (type) {
      case "dice":
        return {
          id: `dice-${nodes.length}`,
          type: "dice",
          position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },

          data: { generator: new Generator() },
        };

      case "histogram":
        const histogramCount = nodes.reduce((acc, item) => (item.type === "histogram" ? acc + 1 : acc), 1);
        return {
          id: `histogram-${nodes.length}`,
          type: "histogram",
          position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },

          data: { status: "EM_ESPERA", title: "Histogram " + histogramCount.toString() },
        };

      case "diceSum":
        return {
          id: `histogram-${nodes.length}`,
          type: "diceSum",
          position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },
          data: { status: "EM_ESPERA", title: "Soma de dois dados" },
        };

      default:
        throw new Error("Invalid node type!");
    }
  }
}
