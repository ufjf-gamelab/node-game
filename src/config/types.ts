import { Node } from "@xyflow/react";
import { Generator } from "@/services";

export type INodeType = "dice" | "histogram" | "diceSum";

type BaseNode<NodeData extends Record<string, unknown> = Record<string, unknown>, NodeType extends INodeType = INodeType> = Node<NodeData, NodeType>;

export type IDiceNode = BaseNode<{ generator: Generator }, "dice">;
export type IHistogramNode = BaseNode<{ status: string; title: string }, "histogram">;
export type IDiceSumNode = BaseNode<{ status: string; title: string }, "diceSum">;

export type INode = IDiceNode | IHistogramNode | IDiceSumNode;
