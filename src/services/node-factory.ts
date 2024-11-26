import { INode, INodeType } from "@/config/types";
import Generator from "./generator";
import { generateHash } from "@/utils/generate-hash";

export default class NodeFactory {
  static newNode(type: INodeType, nodes: INode[]): INode {
    switch (type) {
      case "dice":
        return {
          id: `dice-${generateHash(nodes.length)}`,
          type: "dice",
          position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },

          data: { generator: new Generator() },
        };

      case "histogram":
        const histogramCount = nodes.reduce((acc, item) => (item.type === "histogram" ? acc + 1 : acc), 1);
        return {
          id: `histogram-${generateHash(nodes.length)}`,
          type: "histogram",
          position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },

          data: { status: "EM_ESPERA", title: "Histogram " + histogramCount.toString() },
        };

      default:
        throw new Error("Invalid node type!");
    }
  }
}
