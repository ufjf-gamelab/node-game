import React, { memo, useState } from "react";
import { useEffect } from "react";

import { Handle, useReactFlow } from "react-flow-renderer";
import Button from "../Button";

export default memo(({ id, data, isConnectable }) => {
  const [status, setStatus] = useState(data.status);
  const [faces, setFaces] = useState(data.face);
  const [explodeFace, setExplodeFace] = useState(data.explodeFace);

  const flow = useReactFlow();

  const changeFaces = (aFaces) => {
    let nodes = flow.getNodes();

    nodes.map((node) => {
      if (node.id === id) {
        node.data.faces = aFaces;
      }
    });
    flow.setNodes([...nodes]);
  };

  const changeChosenFace = (aChosenFaces) => {
    let nodes = flow.getNodes();

    nodes.map((node) => {
      if (node.id === id) {
        node.data.chosenFace = aChosenFaces;
      }
    });
    flow.setNodes([...nodes]);
  };

  useEffect(() => {
    setStatus(data.status);
  }, [data]);

  // useEffect(() => {
  //   if(explodeFace > faces){
  //     setExplodeFace(faces)
  //     changeChosenFace(parseFloat(faces))
  //   }
  // },[faces, explodeFace])

  return (
    <div
      style={{
        backgroundColor: data.isReady ? "green" : data.error ? 'red' : "salmon",
        borderRadius: 5,
        width: '100%'
      }}
    >
      <Handle
        type="source"
        position="right"
        style={{ background: "#555", stroke: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <h2>{data.label}</h2>
      {/* <div style={{ flexDirection: "column" }}>
        <Button name={data.label} onPress={() => null} />
      </div> */}
      <input
        placeholder="Faces"
        onChange={(e) => {
          setFaces(e.target.value);
          changeFaces(parseFloat(e.target.value));
        }}
        type="number"
        min="2"
        value={faces}
      />
      
      <input
        placeholder="Explodir em qual face?"
        onChange={(e) => {
          setExplodeFace(e.target.value);
          changeChosenFace(parseFloat(e.target.value));
        }}
        // style={{ minWidth: '72%', maxWidth: '72%'}}
        type="number"
        min={"1"}
        // max={faces}
        value={explodeFace}
      />
      <h5>status: {flow.getNode(id).data.status}</h5>
    </div>
  );
});
