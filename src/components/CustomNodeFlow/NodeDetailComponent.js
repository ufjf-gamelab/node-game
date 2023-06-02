import React, { useEffect } from "react";
import { useRef } from "react";
import { memo } from "react";
import { useState } from "react";
import { useReactFlow } from "react-flow-renderer";
import Input from "@cloudscape-design/components/input";
import TextContent from "@cloudscape-design/components/text-content";

const GeneratorDetail = ({ nodeId }) => {
  const flow = useReactFlow();
  const [min, setMin] = useState(flow.getNode(nodeId).data.min);
  const [max, setMax] = useState(flow.getNode(nodeId).data.max);

  return (
    <div>
      {/* <TextContent> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>Valor mínimo :</h5>
        <Input
          placeholder="Mínimo"
          onBlur={() => {
            flow.getNode(nodeId).data.min = min ? parseFloat(min) : 0;
            flow.setNodes(flow.getNodes());
          }}
          onChange={({ detail }) => {
            console.log(detail);
            setMin(detail.value);

            // flow.getNode(nodeId).data.min = detail.value ? parseFloat(detail.value) : 0;
          }}
          type="number"
          value={min}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>Valor máximo :</h5>
        <Input
          placeholder="Máximo"
          onBlur={() => {
            flow.getNode(nodeId).data.max = max ? parseFloat(max) : 0;
            flow.setNodes(flow.getNodes());
          }}
          onChange={({ detail }) => {
            setMax(detail.value);
            // flow.getNode(nodeId).data.max = detail.value ? parseFloat(detail.value) : 0;
            // setMax(flow.getNode(nodeId).data.max)
            // flow.setNodes(flow.getNodes())
          }}
          type="number"
          value={max}
        />
      </div>

      <h5>status: {flow.getNode(nodeId).data.status}</h5>
      {/* </TextContent> */}
    </div>
  );
};

const HistogramDetail = memo(({ nodeId }) => {
  const flow = useReactFlow();
  const [title, setTitle] = useState(flow.getNode(nodeId).data.histogramName);
  const titleRef = useRef(null);
  useEffect(() => {
    try {
      titleRef.current?.focus();
    } catch (error) {}
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>Titulo :</h5>

        <Input
          placeholder="Título do histograma"
          onBlur={() => {
            flow.getNode(nodeId).data.histogramName = title;
            console.log("nodes: ", flow.getNode(nodeId).data.histogramName);
            flow.setNodes([...flow.getNodes()]);
          }}
          onChange={({ detail }) => {
            setTitle(detail.value);
          }}
          value={title}
        />
        {/* <input
                placeholder="Titulo do histograma"
                onChange={(e) => {
                    setTitle(e.target.value);
                    flow.getNode(nodeId).data.histogramName = e.target.value;
                    console.log("nodes: ", flow.getNode(nodeId).data.histogramName);
                    flow.setNodes([...flow.getNodes()])
                }}
                ref={titleRef}
                type="text"
                value={title}
            /> */}
      </div>

      <h5>status: {flow.getNode(nodeId).data.status}</h5>
    </div>
  );
});

const ExplodeDiceDetail = ({ nodeId }) => {
  const flow = useReactFlow();
  const [faces, setFaces] = useState(flow.getNode(nodeId).data.faces);
  const [explodeFace, setExplodeFace] = useState(
    flow.getNode(nodeId).data.chosenFace
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>Faces :</h5>

        <Input
          placeholder="Faces"
          onBlur={() => {
            flow.getNode(nodeId).data.faces = parseInt(faces);
            flow.setNodes([...flow.getNodes()]);
          }}
          onChange={({ detail }) => {
            setFaces(detail.value);
          }}
          type="number"
          value={faces}
        />
        {/* <input
                placeholder="Faces"
                onChange={(e) => {
                    setFaces(e.target.value);
                    flow.getNode(nodeId).data.faces = e.target.value;
                    flow.setNodes([...flow.getNodes()])
                    //   changeFaces(parseFloat(e.target.value));
                }}
                style={{ height: 20 }}
                type="number"
                min="2"
                value={faces}
            /> */}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>Explodir em qual face?</h5>
        <Input
          placeholder="Face"
          onBlur={() => {
            flow.getNode(nodeId).data.chosenFace = parseInt(explodeFace);
            flow.setNodes([...flow.getNodes()]);
          }}
          onChange={({ detail }) => {
            setExplodeFace(detail.value);
          }}
          type="number"
          value={explodeFace}
        />
        {/* <input
                placeholder="Explodir em qual face?"
                onChange={(e) => {
                    setExplodeFace(e.target.value);
                    flow.getNode(nodeId).data.chosenFace = e.target.value;
                    flow.setNodes([...flow.getNodes()])

                    //   changeChosenFace(parseFloat(e.target.value));
                }}
                style={{ height: 20 }}
                type="number"
                min={"1"}
                // max={faces}
                value={explodeFace}
            /> */}
      </div>

      <h5>status: {flow.getNode(nodeId).data.status}</h5>
    </div>
  );
};

const SumNodeDetail = ({ nodeId }) => {
  const flow = useReactFlow();

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></div>

      <h5>status: {flow.getNode(nodeId).data.status}</h5>
    </div>
  );
};

const PoolNodeDetail = ({ nodeId }) => {
  const flow = useReactFlow();

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></div>

      <h5>status: {flow.getNode(nodeId).data.status}</h5>
    </div>
  );
};

const PoolSumNodeDetail = ({ nodeId }) => {
  const flow = useReactFlow();

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></div>

      <h5>status: {flow.getNode(nodeId).data.status}</h5>
    </div>
  );
};

const SuccessNodeDetail = ({ nodeId }) => {
  const flow = useReactFlow();
  const [face, setFace] = useState(flow.getNode(nodeId).data.face);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>Sucesso na face maior ou igual a? </h5>

        <Input
          placeholder="Face maior ou igual"
          onBlur={() => {
            flow.getNode(nodeId).data.face = parseInt(face);
            flow.setNodes([...flow.getNodes()]);
          }}
          onChange={({ detail }) => {
            setFace(detail.value);
          }}
          type="number"
          value={face}
        />
      </div>

      <h5>status: {flow.getNode(nodeId).data.status}</h5>
    </div>
  );
};

const FaceBetweenNodeDetail = ({ nodeId }) => {
  const flow = useReactFlow();
  const [faceMin, setFaceMin] = useState(flow.getNode(nodeId).data.faceMin);
  const [faceMax, setFaceMax] = useState(flow.getNode(nodeId).data.faceMax);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>Face mínima? </h5>

        <Input
          placeholder="Face maior ou igual"
          onBlur={() => {
            flow.getNode(nodeId).data.faceMin = parseInt(faceMin);
            flow.setNodes([...flow.getNodes()]);
          }}
          onChange={({ detail }) => {
            setFaceMin(detail.value);
          }}
          type="number"
          value={faceMin}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>Face máxima? </h5>

        <Input
          placeholder="Face menor ou igual"
          onBlur={() => {
            flow.getNode(nodeId).data.faceMax = parseInt(faceMax);
            flow.setNodes([...flow.getNodes()]);
          }}
          onChange={({ detail }) => {
            setFaceMax(detail.value);
          }}
          type="number"
          value={faceMax}
        />
      </div>

      <h5>status: {flow.getNode(nodeId).data.status}</h5>
    </div>
  );
};

const CountRepeatedNodeDetail = ({ nodeId }) => {
  const flow = useReactFlow();
  const [face, setFace] = useState(flow.getNode(nodeId).data.face);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>Qual face contar quantas vezes saiu? </h5>

        <Input
          placeholder="Face"
          onBlur={() => {
            flow.getNode(nodeId).data.face = parseInt(face);
            flow.setNodes([...flow.getNodes()]);
          }}
          onChange={({ detail }) => {
            setFace(detail.value);
          }}
          type="number"
          value={face}
        />
      </div>

      <h5>status: {flow.getNode(nodeId).data.status}</h5>
    </div>
  );
};

const InputSymbol = ({ nodeId, index }) => {
  const flow = useReactFlow();
  const [symbol, setSymbol] = useState(
    flow.getNode(nodeId).data?.facesSymbols[index]?.symbol
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h5>Lado {index + 1} </h5>

      <Input
        placeholder={`Símbolo da face ${index + 1}`}
        onBlur={() => {
          if (flow.getNode(nodeId).data.facesSymbols[index].symbol !== symbol) {
            flow.getNode(nodeId).data.facesSymbols[index].symbol = symbol;
            flow.setNodes([...flow.getNodes()]);
          }
        }}
        onChange={({ detail }) => {
          setSymbol(detail.value);
        }}
        type="text"
        value={symbol}
      />
    </div>
  );
};

const InputBall = ({ nodeId, index }) => {
  const flow = useReactFlow();
  const [ball, setBall] = useState(
    flow.getNode(nodeId).data?.balls[index]?.color
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h5>Cor {index + 1} </h5>

      <Input
        placeholder={`Cor da bola ${index + 1}`}
        onBlur={() => {
          if (flow.getNode(nodeId).data.balls[index].color !== ball) {
            flow.getNode(nodeId).data.balls[index].color = ball;
            flow.setNodes([...flow.getNodes()]);
          }
        }}
        onChange={({ detail }) => {
          setBall(detail.value);
        }}
        type="text"
        value={ball}
      />
    </div>
  );
};

const SymbolNodeDetail = ({ nodeId }) => {
  const flow = useReactFlow();
  const [faces, setFaces] = useState(flow.getNode(nodeId).data.faces);

  const addFace = () => {
    flow.getNode(nodeId).data.facesSymbols.push({
      symbol: "",
      face: flow.getNode(nodeId).data.facesSymbols.length + 1,
    });
    flow.setNodes([...flow.getNodes()]);
  };

  const removeFace = () => {
    flow.getNode(nodeId).data.facesSymbols?.pop();
    flow.setNodes([...flow.getNodes()]);
  };

  const updateList = () => {
    if (faces > flow.getNode(nodeId).data.facesSymbols.length) {
      for (
        let i = flow.getNode(nodeId).data.facesSymbols.length;
        i < faces;
        i++
      )
        addFace();
    } else {
      while (parseInt(faces) !== flow.getNode(nodeId).data.facesSymbols.length)
        removeFace();
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>Quantas faces? </h5>

        <Input
          placeholder="Faces"
          onBlur={() => {
            flow.getNode(nodeId).data.faces = parseInt(faces);
            flow.setNodes([...flow.getNodes()]);
            updateList();
          }}
          onChange={({ detail }) => {
            setFaces(detail.value);
          }}
          type="number"
          value={faces}
        />
      </div>
      {flow.getNode(nodeId).data?.facesSymbols.map((item, index) => (
        <InputSymbol nodeId={nodeId} index={index} />
      ))}

      <h5>status: {flow.getNode(nodeId).data.status}</h5>
    </div>
  );
};

const BagNodeDetail = ({ nodeId }) => {
  const flow = useReactFlow();
  const [qtd, setQtd] = useState(flow.getNode(nodeId).data.qtd);

  const addFace = () => {
    flow.getNode(nodeId).data.balls.push({ color: "", qtd: 1 });
    flow.setNodes([...flow.getNodes()]);
  };

  const removeFace = () => {
    flow.getNode(nodeId).data.balls?.pop();
    flow.setNodes([...flow.getNodes()]);
  };

  const updateList = () => {
    if (qtd > flow.getNode(nodeId).data.balls.length) {
      for (let i = flow.getNode(nodeId).data.balls.length; i < qtd; i++)
        addFace();
    } else {
      while (parseInt(qtd) !== flow.getNode(nodeId).data.balls.length)
        removeFace();
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>Quantas bolas? </h5>

        <Input
          placeholder="Bolas"
          onBlur={() => {
            flow.getNode(nodeId).data.qtd = parseInt(qtd);
            flow.setNodes([...flow.getNodes()]);
            updateList();
          }}
          onChange={({ detail }) => {
            setQtd(detail.value);
          }}
          type="number"
          value={qtd}
        />
      </div>
      {flow.getNode(nodeId).data?.balls.map((item, index) => (
        <InputBall nodeId={nodeId} index={index} />
      ))}

      <h5>status: {flow.getNode(nodeId).data.status}</h5>
    </div>
  );
};
export default function NodeDetailComponent() {
  const flow = useReactFlow();
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    flow.getNodes().forEach((node) => {
      if (node.selected) {
        setSelectedNode(node.id);
      }
    });
  }, [flow.getNodes()]);

  // selectorNode: ColorSelectorNode,
  // generator: GeneratorNode,
  // histogramNode: HistogramNode,
  // sumNode: SumNode,
  // explodingDice: ExplodingDiceNode,
  // poolNode: PoolNode,
  // poolSumNode: PoolSumNode,

  const SelectDetailsToShow = () => {
    if (selectedNode)
      switch (flow.getNode(selectedNode)?.type) {
        case "generator":
          return <GeneratorDetail nodeId={selectedNode} />;
          break;

        case "histogramNode":
          return <HistogramDetail nodeId={selectedNode} />;
          break;

        case "explodingDice":
          return <ExplodeDiceDetail nodeId={selectedNode} />;
          break;

        case "sumNode":
          return <SumNodeDetail nodeId={selectedNode} />;
          break;

        case "poolNode":
          return <PoolNodeDetail nodeId={selectedNode} />;
          break;

        case "poolSumNode":
          return <PoolSumNodeDetail nodeId={selectedNode} />;
          break;

        case "successNode":
          return <SuccessNodeDetail nodeId={selectedNode} />;
          break;

        case "faceBetweenNode":
          return <FaceBetweenNodeDetail nodeId={selectedNode} />;
          break;

        case "countRepeatedNode":
          return <CountRepeatedNodeDetail nodeId={selectedNode} />;
          break;

        case "symbolNode":
          return <SymbolNodeDetail nodeId={selectedNode} />;
          break;

        case "bagNode":
          return <BagNodeDetail nodeId={selectedNode} />;
          break;

        default:
          break;
      }

    return <></>;
  };

  return selectedNode ? (
    <div style={{ flex: 1 }}>
      <TextContent>
        <h4>{flow.getNode(selectedNode)?.data?.label}</h4>
        <h5>id: {flow.getNode(selectedNode)?.id}</h5>
      </TextContent>
      <SelectDetailsToShow />
    </div>
  ) : (
    <></>
  );
}
