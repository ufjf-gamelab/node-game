import { Node } from "@xyflow/react";
import { Generator } from "@/services";

export type INodeType = "dice" | "histogram";

type BaseNode<NodeData extends Record<string, unknown> = Record<string, unknown>, NodeType extends INodeType = INodeType> = Node<NodeData, NodeType>;

export type IDiceNode = BaseNode<{ generator: Generator }, "dice">;
export type IHistogramNode = BaseNode<{ status: string; name: string }, "histogram">;

export type INode = IDiceNode | IHistogramNode;
