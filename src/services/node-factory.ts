import { INode, INodeType } from "@/config/types";
import Generator from "./generator";

export default class NodeFactory {
  static newNode(type: INodeType, nodes: INode[]): INode {
    switch (type) {
      case "dice":
        return {
          id: `node-dice-${nodes.length}`,
          type: "dice",
          position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },
          data: { generator: new Generator() },
        };

      case "histogram":
        return {
          id: `node-dice-${nodes.length}`,
          type: "histogram",
          position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },
          data: { status: "EM_ESPERA", name: "" },
        };

      default:
        throw new Error("Invalid node type!");
    }
  }
}
