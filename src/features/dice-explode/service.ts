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
        inputType: "numericGenerator",
        outputType: "numeric",
      },
    };
  },

  run(flow, node) {
    try {
      const edge = flow.getEdges().find((edge) => edge.target === node.id);
      if (!edge) throw new Error("Connection not found!");

      const sourceNode = flow.getNode(edge.source) as IDiceGeneratorNode | undefined;
      if (!sourceNode) throw new Error("Source connection not found!");
      if (sourceNode.data.max < node.data.explodeFace) throw new Error("Explode face can't be greater than dice generator max face!");

      const sourceState = NodeManager.run(sourceNode, flow);
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

//  mc die explode
function explodeDicePool(data: number[][], explodeFace: number): number[] {
  const MAX_DEPTH = 20;

  // Simula uma rolagem de dado d6 (pode adaptar)
  function rollDie(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Conta explosões recursivamente para um grupo
  function countGroupExplosions(group: number[]): number {
    let explosions = 0;
    const diceQueue = [...group]; // fila dos dados para verificar explosão
    let depth = 0;

    while (diceQueue.length > 0 && depth < MAX_DEPTH) {
      const die = diceQueue.shift()!;
      if (die === explodeFace) {
        explosions++;
        const newDie = rollDie();
        diceQueue.push(newDie); // novo dado pode explodir também
      }
      depth++;
    }

    return explosions;
  }

  // Para cada grupo, conta as explosões
  return data.map((group) => countGroupExplosions(group));
}
