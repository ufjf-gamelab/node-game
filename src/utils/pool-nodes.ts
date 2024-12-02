import { IDiceGeneratorNode } from "@/config/types";

export function poolNodes(aInput1: IDiceGeneratorNode, aInput2: IDiceGeneratorNode) {
  let result: number[][] = [];

  for (let i = 0; i < aInput1.data.state.length; i++) {
    const dado1 = aInput1.data.state[i];
    const dado2 = aInput2.data.state[i];

    result[i] = [];

    if (Array.isArray(dado1)) {
      result[i] = [...result[i], ...dado1];
    } else {
      result[i] = [...result[i], dado1];
    }

    if (Array.isArray(dado2)) {
      result[i] = [...result[i], ...dado2];
    } else {
      result[i] = [...result[i], dado2];
    }
  }

  return result;
}
