import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge, Controls, MarkerType, MiniMap, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow
} from "react-flow-renderer";

import Generator from "../../class/Generator";
import HistogramChart from "../HistogramChart";
import ColorSelectorNode from "./ColorSelectorNode";
import GeneratorNode from "../GeneratorNode/GeneratorNode.jsx";
import HistogramNode from "../HistogramNode/HistogramNode";
import "./index.css";
import SumNode from "../SumNode/SumNode";

import Button from "@cloudscape-design/components/button";
import ButtonDropdown from "@cloudscape-design/components/button-dropdown";
import { useSelector } from "react-redux";
import ExplodingDiceNode from "../ExplodingDiceNode/ExplodingDiceNode";
import PoolNode from "../PoolNode/PoolNode";
import PoolSumNode from "../PoolSumNode/PoolSumNode";
import SaveAndLoadStates from "../SaveAndLoadStates";
import NodeDetailComponent from "./NodeDetailComponent";
import SuccessNode from "../SuccessNode/SuccessNode";
import FaceBetweenNode from "../FaceBetweenNode/FaceBetweenNode";

const initBgColor = "#1A192B";

const connectionLineStyle = { stroke: "#fff" };
const snapGrid = [20, 20];
const nodeTypes = {
  selectorNode: ColorSelectorNode,
  generator: GeneratorNode,
  histogramNode: HistogramNode,
  sumNode: SumNode,
  explodingDice: ExplodingDiceNode,
  poolNode: PoolNode,
  poolSumNode: PoolSumNode,
  successNode: SuccessNode,
  faceBetweenNode: FaceBetweenNode
};

const NodeSelectedOptions = () => {
  const flow = useReactFlow()
  const [selectedNode, setSelectedNode] = useState(null)

  useEffect(() => {
    flow.getNodes().forEach(node => {
      if (node.selected) {
        setSelectedNode(node.id)
      }
    })
  }, [flow.getNodes()])

  return <div style={{ flex: 1 }}>
    <h1>{selectedNode}</h1>
  </div>
}

const CustomNodeFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [canShowHistograms, setCanShowHistograms] = useState(false);
  const [bgColor, setBgColor] = useState(initBgColor);
  const [listHistogramNodes, setListHistogramNodes] = useState([]);

  // const flow = useReactFlow();
  const updateHistogramNames = useSelector(
    (state) => state.AppReducer.updateHistogramNames
  );

  useEffect(() => {
    const onChange = (event) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== "2") {
            return node;
          }

          const color = event.target.value;

          setBgColor(color);

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        })
      );
    };

    setNodes([
      // {
      //   id: "1",
      //   type: "input",
      //   data: { label: "An input node" },
      //   position: { x: 0, y: 50 },
      //   sourcePosition: "right",
      // },
      // {
      //   id: "2",
      //   type: "selectorNode",
      //   data: { onChange: onChange, color: initBgColor },
      //   style: { border: "1px solid #777", padding: 10 },
      //   position: { x: 300, y: 50 },
      // },
      // {
      //   id: "3",
      //   type: "output",
      //   data: { label: "Output A" },
      //   position: { x: 650, y: 25 },
      //   targetPosition: "left",
      // },
      // {
      //   id: "4",
      //   type: "output",
      //   data: { label: "Output B" },
      //   position: { x: 650, y: 100 },
      //   targetPosition: "left",
      // },
      // {
      //   id: "node-button",
      //   type: "button",
      //   position: { x: 300, y: 50 },
      //   data: {
      //     onClick: () => {
      //       setNodes([
      //         ...nodes,
      //         {
      //           id: `histogram-${nodes.length}`,
      //           type: "histogramNode",
      //           position: { x: 300, y: 50 },
      //           data: {
      // data: [
      //   { x: 0 },
      //   { x: 1 },
      //   { x: 1 },
      //   { x: 2 },
      //   { x: 3 },
      //   { x: 4 },
      //   { x: 4 },
      // ],
      //             label: `histogram-${nodes.length}`,
      //           },
      //         },
      //       ]);
      //     },
      //     label: "Add Nó Histograma",
      //   },
      // },
    ]);

    // setEdges([
    //   {
    //     id: "e1-2",
    //     source: "1",
    //     target: "2",
    //     animated: true,
    //     style: { stroke: "#000" },
    //   },
    //   {
    //     id: "e2a-3",
    //     source: "2",
    //     target: "3",
    //     sourceHandle: "a",
    //     animated: true,
    //     style: { stroke: "#000" },
    //   },
    //   {
    //     id: "e2b-4",
    //     source: "2",
    //     target: "4",
    //     sourceHandle: "b",
    //     animated: true,
    //     style: { stroke: "#000" },
    //   },
    // ]);
  }, []);

  const onConnect = useCallback((params) => {
    const source = nodes.find((n) => n.id === params.source);

    console.log(source.data);
    return (
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.Arrow, color: 'white', size: 3 },
            style: { stroke: 'white', strokeWidth: 4 },
          },
          eds
        )
      ),
      []
    );
  });

  const onConnectStart = (_, { nodeId, handleType }) =>
    console.log('on connect start', { nodeId, handleType });
  const onConnectEnd = (event) => console.log('on connect end', event);

  const addGeneratorNode = () => {
    console.log("Adicionando");
    setNodes([
      ...nodes,
      {
        id: `node-generator-button-${nodes.length}`,
        type: "generator",
        position: { x: 100 + nodes.length * 20, y: 50 + nodes.length * 20 },
        data: new Generator(),

        // data: {
        //   data: [],
        //   label: `Gerador de aleatorios`,
        //   hasData: false,
        //   isReady: false,
        //   min: 0,
        //   max: 6,
        //   status: "",
        // },
      },
    ]);
  };

  const addHistogramNode = () => {
    setNodes([
      ...nodes,
      {
        id: `node-histogram-${nodes.length}`,
        type: "histogramNode",
        position: { x: 300 + nodes.length * 20, y: 50 + nodes.length * 20 },
        data: {
          label: "Histograma",
          data: [],
          hasData: false,
          isReady: false,
          histogramName: "",
          isReady: false,
          status: "EM_ESPERA",
          error: false,
        },
        status: "",
      },
    ]);
  };

  const addExplodingDiceNode = () => {
    setNodes([
      ...nodes,
      {
        id: `node-exploding-dice-${nodes.length}`,
        type: "explodingDice",
        position: { x: 300 + nodes.length * 20, y: 50 + nodes.length * 20 },
        data: {
          label: "Explodir dado",
          data: [],
          faces: null,
          chosenFace: null,
          hasData: false,
          isReady: false,
          histogramName: "",
          isReady: false,
          status: "EM_ESPERA",
          error: false,
        },
        status: "",
      },
    ]);
  };

  const addSumNode = () => {
    setNodes([
      ...nodes,
      {
        id: `node-sum-${nodes.length}`,
        type: "sumNode",
        position: { x: 300 + nodes.length * 20, y: 50 + nodes.length * 20 },
        data: {
          data: [
          ],
          label: `Somar dois geradores`,
          histogramName: "",
          isReady: false,
          status: 'EM_ESPERA',
          error: false,
        },
      },
    ]);
  };

  const addPoolNode = () => {
    setNodes([
      ...nodes,
      {
        id: `node-pool-${nodes.length}`,
        type: "poolNode",
        position: { x: 300 + nodes.length * 20, y: 50 + nodes.length * 20 },
        data: {
          data: [

          ],
          label: `Pool`,
          histogramName: "",
          isReady: false,
          status: 'EM_ESPERA',
          error: false,
        },
      },
    ]);
  };

  const addPoolSumNode = () => {
    setNodes([
      ...nodes,
      {
        id: `node-pool-sum-${nodes.length}`,
        type: "poolSumNode",
        position: { x: 300 + nodes.length * 20, y: 50 + nodes.length * 20 },
        data: {
          data: [

          ],
          label: `Pool Sum`,
          histogramName: "",
          isReady: false,
          status: 'EM_ESPERA',
          error: false,
        },
      },
    ]);
  };

  const addSuccessNode = () => {
    setNodes([
      ...nodes,
      {
        id: `node-success-${nodes.length}`,
        type: "successNode",
        position: { x: 300 + nodes.length * 20, y: 50 + nodes.length * 20 },
        data: {
          data: [

          ],
          label: `Success`,
          face: 0,
          isReady: false,
          status: 'EM_ESPERA',
          error: false,
        },
      },
    ]);
  };

  const addFaceBetweenNode = () => {
    setNodes([
      ...nodes,
      {
        id: `node-face-between-${nodes.length}`,
        type: "faceBetweenNode",
        position: { x: 300 + nodes.length * 20, y: 50 + nodes.length * 20 },
        data: {
          data: [

          ],
          label: `Face entre intervalo`,
          faceMin: 1,
          faceMax: 6,
          isReady: false,
          status: "EM_ESPERA",
          error: false,
        },
      },
    ]);
  };

  const generateRandomData = (aMin, aMax, aN) => {
    let lData = [];

    for (let i = 0; i < aN; i++) {
      let lX = parseInt(Math.floor(Math.random() * (aMax + 1 - aMin) + aMin));
      lData.push(lX);
    }

    return lData;
  };

  const mapingdata = () => {
    edges.map((ed) => {
      //buscar em nós o
      let lNodeGeneratorIndex = nodes.findIndex((no) => no.id === ed.source);
      if (lNodeGeneratorIndex >= 0) {
        nodes[lNodeGeneratorIndex].data.data = generateRandomData(
          1,
          6,
          10000
        );
        let lNodeHistogramIndex = nodes.findIndex((no) => no.id === ed.target);
        if (lNodeHistogramIndex >= 0) {
          nodes[lNodeHistogramIndex].data = {
            ...nodes[lNodeHistogramIndex].data,
            data: nodes[lNodeGeneratorIndex].data.data,
          };
        }
      }
      console.log(ed);
    });

    setNodes(nodes);
  };

  const clearNodes = () => {
    nodes.map((node) => {
      node.data.data = [];
      node.data.isReady = false;
      node.data.status = "PREPARANDO";
      node.data.error = false;
    });

    setNodes([...nodes]);
  };

  const run = (aNode) => {
    switch (aNode.type) {
      case "generator":
        runGeneratorNode(aNode);
        break;

      case "histogramNode":
        runHistogramNode(aNode);
        break;

      case "sumNode":
        runSumNode(aNode);
        break;

      case "explodingDice":
        runExplodingDiceNode(aNode);
        break;

      case 'poolNode':
        runPoolNode(aNode);
        break;

      case 'poolSumNode':
        runPoolSumNode(aNode);
        break;

      case 'successNode':
        runSuccessNode(aNode);
        break;

      case 'faceBetweenNode':
        runFaceBetweenNode(aNode);
        break;


      default:
        break;
    }
  };

  const runGeneratorNode = (aNode) => {
    // if (!aNode.data.isReady) {
    // aNode.data.run();
    aNode.data = {
      ...aNode.data,
      data: generateRandomData(aNode.data.min, aNode.data.max, 10000),
      isReady: true,
      status: 'PRONTO',
    };
    updateNodes(aNode);
    // }
  };

  const runHistogramNode = (aNode) => {
    if (!aNode.data.isReady) {
      edges.map((no) => {
        if (no.target === aNode.id) {
          let lNoSrcIndex = nodes.findIndex((item) => item.id === no.source);
          if (lNoSrcIndex >= 0) {
            if (nodes[lNoSrcIndex].data.isReady) {
              aNode.data = {
                ...aNode.data,
                data: nodes[lNoSrcIndex].data.data,
                isReady: true,
                status: 'PRONTO',
              };
            }
          }
        }
      });
      updateNodes(aNode);
    }
  };

  const runSumNode = (aNode) => {
    console.log(aNode);
    if (!aNode.data.isReady) {
      let lEdWithTarget = edges.filter((ed) => ed.target === aNode.id);
      console.log(lEdWithTarget);
      if (lEdWithTarget.length === 2) {
        let lNode1 = nodes.filter((no) => no.id === lEdWithTarget[0].source);
        let lNode2 = nodes.filter((no) => no.id === lEdWithTarget[1].source);
        console.log("node1: ", lNode1);
        console.log("node2: ", lNode2);
        if (lNode1[0].data.isReady && lNode2[0].data.isReady) {
          console.log("entrou");
          aNode.data = {
            ...aNode.data,
            data: sumData(
              lNode1[0].data.data,
              lNode2[0].data.data
            ),
            status: 'PRONTO',
            isReady: true,
          };
        }
      }
      updateNodes(aNode);
    }
  };

  const runExplodingDiceNode = (aNode) => {
    if (aNode.data.faces && aNode.data.chosenFace && !aNode.isReady) {
      aNode.data = {
        ...aNode.data,
        data: explodingDice(aNode.data.faces, aNode.data.chosenFace, 10000),
        isReady: true,
        status: 'PRONTO',
      };

    } else {
      aNode.data = {
        ...aNode.data,
        isReady: false,
        status: 'FALTAM_DADOS',
        error: true
      };
    }
    updateNodes(aNode);
    // }
  };

  const runPoolNode = (aNode) => {
    // console.log(aNode)
    if (!aNode.data.isReady) {
      let lEdWithTarget = edges.filter((ed) => ed.target === aNode.id);

      if (lEdWithTarget.length === 2) {
        //tem duas conexoes
        let lNoSrcIndex1 = nodes.findIndex((item) => item.id === lEdWithTarget[0].source);
        let lNoSrcIndex2 = nodes.findIndex((item) => item.id === lEdWithTarget[1].source);

        if (nodes[lNoSrcIndex1].data.isReady && nodes[lNoSrcIndex2].data.isReady) {
          console.log('ta pronto');

          aNode.data = {
            ...aNode.data,
            data: poolNodes(nodes[lNoSrcIndex1], nodes[lNoSrcIndex2]),
            isReady: true,
            status: 'PRONTO',
          };
        }

      }
    } else {
      aNode.data = {
        ...aNode.data,
        isReady: false,
        status: 'FALTAM_DADOS',
        error: true
      };
    }
    updateNodes(aNode);
  };

  const runPoolSumNode = (aNode) => {
    // console.log(aNode)
    if (!aNode.data.isReady) {
      let lEdWithTarget = edges.filter((ed) => ed.target === aNode.id);

      console.log('lEdWithTarget', lEdWithTarget)
      if (lEdWithTarget.length === 1) {
        let lNoSrcIndex1 = nodes.findIndex((item) => item.id === lEdWithTarget[0].source);

        if (nodes[lNoSrcIndex1].data.isReady) {
          console.log('pool ta pronto');

          aNode.data = {
            ...aNode.data,
            data: poolSumNodes(nodes[lNoSrcIndex1]),
            isReady: true,
            status: 'PRONTO',
          };
        } else {
          console.log('pool ainda não está pronto')
        }

      }
    } else {
      aNode.data = {
        ...aNode.data,
        isReady: false,
        status: 'FALTAM_DADOS',
        error: true
      };
    }
    updateNodes(aNode);
  };

  const runSuccessNode = (aNode) => {
    // console.log(aNode)
    if (!aNode.data.isReady) {
      let lEdWithTarget = edges.filter((ed) => ed.target === aNode.id);

      console.log('lEdWithTarget', lEdWithTarget)
      if (lEdWithTarget.length === 1) {
        let lNoSrcIndex1 = nodes.findIndex((item) => item.id === lEdWithTarget[0].source);

        if (nodes[lNoSrcIndex1].data.isReady) {
          console.log('gerador ta pronto');

          aNode.data = {
            ...aNode.data,
            data: getArraySuccess(nodes[lNoSrcIndex1].data.data, aNode.data.face),
            isReady: true,
            status: 'PRONTO',
          };
        } else {
          console.log('gerador ainda não está pronto')
        }

      }
    } else {
      aNode.data = {
        ...aNode.data,
        isReady: false,
        status: 'FALTAM_DADOS',
        error: true
      };
    }
    updateNodes(aNode);
  };

  const runFaceBetweenNode = (aNode) => {
    // console.log(aNode)
    if (!aNode.data.isReady) {
      let lEdWithTarget = edges.filter((ed) => ed.target === aNode.id);

      console.log('lEdWithTarget', lEdWithTarget)
      if (lEdWithTarget.length === 1) {
        let lNoSrcIndex1 = nodes.findIndex((item) => item.id === lEdWithTarget[0].source);

        if (nodes[lNoSrcIndex1].data.isReady) {
          console.log('gerador ta pronto');

          aNode.data = {
            ...aNode.data,
            data: getArrayFaceBetween(nodes[lNoSrcIndex1].data.data, aNode.data.faceMin, aNode.data.faceMax),
            isReady: true,
            status: "PRONTO",
          };
        } else {
          console.log('gerador ainda não está pronto')
        }

      }
    } else {
      aNode.data = {
        ...aNode.data,
        isReady: false,
        status: "Preencha os campos obrigatórios",
        error: true
      };
    }
    updateNodes(aNode);
  };

  const poolNodes = (aInput1, aInput2) => {
    // let lData = [aDice1.data.data, aDice2.data.data];
    let lData = [];

    for (let i = 0; i < aInput1.data.data.length; i++) {
      const dado1 = aInput1.data.data[i];
      const dado2 = aInput2.data.data[i];

      lData[i] = [];

      if (Array.isArray(dado1)) {
        lData[i] = [...lData[i], ...dado1]
      } else {
        lData[i] = [...lData[i], dado1]
      }

      if (Array.isArray(dado2)) {
        lData[i] = [...lData[i], ...dado2]
      } else {
        lData[i] = [...lData[i], dado2]
      }

    }

    console.log(lData);

    return lData

  }

  const poolSumNodes = (aInput1) => {
    let lData = [];

    for (let i = 0; i < aInput1.data.data.length; i++) {
      const dado1 = aInput1.data.data[i];

      lData[i] = 0;

      if (Array.isArray(dado1)) {
        dado1.forEach(valor =>
          lData[i] += valor
        )
      } else {
        lData[i] += dado1
      }

    }

    console.log('saida pool sum: ', lData);

    return lData

  }

  const explodingDice = (aFaces, aFace, aN) => {
    let lCount = 0;
    let lX = [];

    for (let i = 0; i < aN; i++) {
      while (aFace === parseInt(Math.floor(Math.random() * (aFaces + 1 - 1) + 1))) {
        lCount++;
      }

      lX.push(lCount);
      lCount = 0;
    }

    console.log(lX);

    return lX;

  }

  const getArraySuccess = (aData, aFace) => {

    //0 falha e 1 sucesso
    let lData = []

    aData?.map(item => {
      if (item >= aFace)
        lData.push(1)
      else
        lData.push(0)
    })

    return lData

  }

  const getArrayFaceBetween = (aData, aMinFace, aMaxFace) => {

    //0 falha e 1 sucesso
    let lData = []

    for (let i = 0; i < aData.length; i++) {
      const dado1 = aData[i];

      // lData[i] = 0;

      if (Array.isArray(dado1)) {

        dado1.forEach(valor => {
          if (valor >= aMinFace && valor <= aMaxFace)
            lData.push(1)
          else
            lData.push(0)
        }
        )
      } else {
        if (dado1 >= aMinFace && dado1 <= aMaxFace)
          lData.push(1)
        else
          lData.push(0)
      }

    }

    console.log('saida pool sum: ', lData);

    return lData

    // aData?.map(item => {
    //   if (item >= aMinFace && item <= aMaxFace)
    //     lData.push(1)
    //   else
    //     lData.push(0)
    // })

    // return lData

  }

  const updateNodes = (aNode) => {
    // console.log(aNode);
    setNodes([...nodes.filter((no) => no.id !== aNode.id), aNode]);
  };

  const build = () => {
    //criar lista auxiliar que controla se os nós já estão prontos ou não
    //sempre percorrer essa lista e fazendo o run, caso o estado isReady for true, remove o item da lista
    //criar um controlador de quantidade de items, toda vez que chegar no final da lista, armazenar o tamanho restante de item e percorrer novamente
    //caso na proxima volta a quantidade de item se mantiver, os item presentes não podem ser preparador por algum motivo
    //criar função que verifica a causa de não ser possivel fazer o run e escrever o motivo

    clearNodes();
    // console.log(nodes);

    let lNotReadyLength = null;

    while (
      lNotReadyLength !== nodes.filter((no) => no.data.isReady === false).length
    ) {
      lNotReadyLength = nodes.filter((no) => no.data.isReady === false).length;
      reRun();
    }

    let lListNodes = []

    //função que faz a varredura nos nós que não conseguiram ser construidos corretamente
    nodes.map((no) => {
      if (!no.data.isReady)
        no.data = {
          ...no.data,
          status: "X - problema ao rodar run",
          error: true,
        };
      else if (no.type === 'histogramNode' && no.data.isReady) {
        lListNodes.push({ id: no.id, data: [...no.data.data] })
      }
    });


    setNodes([...nodes]);
    // setListHistogramNodes([...nodes.filter(node => node.type === 'histogramNode')])
    setListHistogramNodes([...lListNodes])
    setCanShowHistograms(true);
    // console.log(nodes);
  };

  const reRun = () => {
    console.log("reRun");

    nodes
      .filter((no) => no.data.isReady === false)
      .map((no) => {
        run(no);
      });
  };

  //------
  //percorrer as conexões de tras para frente
  // - buscar por nós histograma
  // - se o nó conectado não tem o array, procurar os nós conectados e gerar o data
  //------
  const buildBackwards = () => {
    // clearNodes();
    let lNodesHistograms = nodes.filter((no) => no.type === "histogramNode");
    lNodesHistograms.map((histogram, index) => {
      //buscar o item em que ele está conectado
      let lEdIndex = edges.findIndex((no) => no.target == histogram.id);

      //buscar source
      if (lEdIndex >= 0) {
        let lNoIndex = nodes.findIndex(
          (no) => no.id === edges[lEdIndex].source
        );
        if (lNoIndex >= 0) {
          if (nodes[lNoIndex].type === "generator") {
            console.log(nodes[lNoIndex].type);
            nodes[lNoIndex].data.run();
            nodes[lNoIndex].data = {
              ...nodes[lNoIndex].data,
              status: nodes[lNoIndex].data.status,
            };
            //verificar se o objeto já tem os dados aleatorios gerados, senão, deve sortear.
            // checkNodeGenerator(nodes[lNoIndex]);

            console.log(nodes[lNoIndex].data);

            histogram.data = {
              ...histogram.data,
              data: nodes[lNoIndex].data.getdata(),
              status: 'PRONTO',
              isReady: true,
            };

            histogram.data.run();

            // console.log(histogram);
          } else if (nodes[lNoIndex].type === "sumNode") {
            console.log(nodes[lNoIndex].type);
            console.log(edges[lEdIndex]);

            let lEdgesGenerators = edges.filter(
              (ed) => ed.target === edges[lEdIndex].source
            );
            let lNodesGenerators = [];

            lEdgesGenerators.map((ed) =>
              lNodesGenerators.push(nodes.find((no) => no.id === ed.source))
            );

            //observar o tipo de no que esta conectado no target, sendo assim direcionar para os processos
            if (lNodesGenerators.length > 0) {
              console.log("lNodesGenerators: ", lNodesGenerators);
              lNodesGenerators.map((generator) => {
                if (generator.type === "generator") {
                  // checkNodeGenerator(generator);
                  generator.run();
                  generator.data = {
                    ...generator.data,
                    status: 'PRONTO', //generator.data.status,
                  };
                  console.log(generator);
                } else if (generator.type === "sumNode") {
                  //pensar em como seria uma conexao continua com outros tipo de no que não sejam geradores diretamente
                  checkSumNode(generator, nodes, edges);
                }
              });

              console.log("lNodesGenerators Atualizado: ", lNodesGenerators);

              //agora fazer a concatenação dos dois datas e setar em sumNode
              // nodes[lNoIndex].data.data = [
              //   ...lNodesGenerators[0].data.data,
              //   ...lNodesGenerators[1].data.data,
              // ];
              nodes[lNoIndex].data.data = sumData(
                lNodesGenerators[0].data.data,
                lNodesGenerators[1].data.data
              );

              console.log(nodes[lNoIndex].data.data);
              nodes[lNoIndex].data.isReady = true;
              nodes[lNoIndex].data.status = 'PRONTO';

              histogram.data.data = nodes[lNoIndex].data.data;
              histogram.data.status = 'PRONTO';
              histogram.data.isReady = true;
              console.log(
                "tamanho dos dados do data: ",
                histogram.data.data.length
              );
            }
          }
        }
      }
      // console.log(edges[lEdIndex]);
    });
    console.log(lNodesHistograms);
    setNodes([
      ...nodes.filter((no) => no.type !== "histogramNode"),
      ...lNodesHistograms,
    ]);

    //exibir apenas se o atributo ready em histogram estiver ok
    setCanShowHistograms(true);
  };

  const checkNodeGenerator = (aNode) => {
    if (!aNode.data?.hasData) {
      console.log("nao tem dados... gerando", aNode.data);
      aNode.data.data = generateRandomData(
        aNode.data.min,
        aNode.data.max,
        10000
      );
      aNode.data.hasData = true;
      aNode.data.isReady = true;
      aNode.data.status = 'PRONTO';
    }
  };

  const checkSumNode = (aNode, aNodes, aEdges) => {
    if (!aNode.data.isReady) {
      console.log("não está preparado");
      //buscar todos os target
      let lEdWithTarget = aEdges.filter((ed) => ed.target === aNode.id);

      if (lEdWithTarget.length > 0) {
        console.log("lEdWithTarget: ", lEdWithTarget);

        lEdWithTarget.map((ed) => {
          let lNode = aNodes.find((no) => no.id === ed.source);
          console.log("lNode: ", lNode);

          if (lNode) {
            if (lNode.type === "generator") {
              checkNodeGenerator(lNode);
              //pegar o valor do dataHistogram e adicionar ao nó sumNode
              aNode.data.data = sumData(
                aNode.data.data,
                lNode.data.data
              );
            } else if (lNode.type === "sumNode")
              checkSumNode(lNode, aNodes, aEdges);
          }
        });
      }
      // aNode.data.data = generateRandomData(1, 6, 10000);
      // aNode.data.hasData = true;
      aNode.data.isReady = true;
      aNode.data.status = 'PRONTO';
      return;
    }
  };

  const sumData = (aData1, aData2) => {
    const sData = [];
    for (let i = 0; i < aData1.length; i++) {
      sData.push(aData1[i] + aData2[i]);
    }
    console.log("const", sData);
    return sData;
  };

  const formatDataToHistogram = (aData) => {
    return aData
    let lData = [];

    console.log('data: ', aData);
    aData.map(item => {
      lData.push({ x: item })
    })

    return lData
  }

  const addNoId = (aId) => {
    switch (aId) {
      case 'noGerador': addGeneratorNode()

        break;
      case 'noHistograma': addHistogramNode()

        break;

      case 'noExplodeDice': addExplodingDiceNode()

        break;

      case 'noSomador': addSumNode()

        break;

      case 'noPool': addPoolNode()

        break;

      case 'noPoolSum': addPoolSumNode()

        break;

      case 'noSuccess': addSuccessNode()

        break;
      case 'noFaceBetween': addFaceBetweenNode()

        break;
      case 'contruir': build()

        break;

      default:
        break;
    }
  }

  return (
    <div style={{ height: 550, width: "100%" }}>
      <ReactFlowProvider>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            padding: 10
          }}
        >
          <ButtonDropdown
            items={[
              { text: "Adicionar nó gerador", id: "noGerador", disabled: false },
              { text: "Adicionar nó histogram", id: "noHistograma", disabled: false },
              { text: "Adicionar explodir dado", id: "noExplodeDice", disabled: false },
              { text: "Adicionar nó somador", id: "noSomador", disabled: false },
              { text: "Adicionar nó pool", id: "noPool", disabled: false },
              { text: "Adicionar nó pool sum", id: "noPoolSum", disabled: false },
              { text: "Adicionar nó sucesso", id: "noSuccess", disabled: false },
              { text: "Adicionar nó face entre intervalo", id: "noFaceBetween", disabled: false },
              // { text: "Construir histogramas", id: "contruir", disabled: false },
              // { text: "Move", id: "mv", disabled: false },
              // { text: "Rename", id: "rn", disabled: true },
              // {
              //   text: "View metrics",
              //   href: "https://example.com",
              //   external: true,
              //   externalIconAriaLabel: "(opens in new tab)"
              // }
            ]}
            onItemClick={id => addNoId(id.detail.id)}
          >
            Adicionar
          </ButtonDropdown>

          <Button variant="primary" onClick={build} disabled={!nodes.length}>Construir</Button>
          <SaveAndLoadStates />

        </div>
        <div style={{
          flex: 1, display: "flex",
          height: '100%', width: '100%'
        }}>
          <div style={{ flex: 4, height: '100%' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              // onConnectStart={onConnectStart}
              // onConnectEnd={onConnectEnd}
              style={{ background: "grey", width: '100%' }}
              nodeTypes={nodeTypes}
              connectionLineStyle={connectionLineStyle}
              snapToGrid={true}
              snapGrid={snapGrid}
              defaultZoom={1.5}
              fitView
              attributionPosition="bottom-left"
            >
              <MiniMap
                nodeStrokeColor={(n) => {
                  if (n.type === "input") return "#0041d0";
                  if (n.type === "selectorNode") return bgColor;
                  if (n.type === "output") return "#ff0072";
                }}
                nodeColor={(n) => {
                  if (n.type === "selectorNode") return bgColor;
                  return "#aeaeae";
                }}
              />
              <Controls />
            </ReactFlow>
          </div>
          <div style={{ flex: 1, backgroundColor: '#f1f1f1', borderWidth: 1, borderColor: 'grey', padding: 5, margin: 5 }}>
            {/* <NodeSelectedOptions /> */}
            <NodeDetailComponent />
          </div>

          {/* <NodeSelectedOptions nodes={nodes} /> */}


        </div>


        {canShowHistograms &&
          listHistogramNodes.map(
            ({ id, data }) =>
              <div key={id}>
                {/* <h2>{node.data.histogramName}</h2> */}
                <HistogramChart data={formatDataToHistogram(data)} id={id} />
              </div>

          )}
      </ReactFlowProvider>
    </div>
  );
};

export default CustomNodeFlow;
