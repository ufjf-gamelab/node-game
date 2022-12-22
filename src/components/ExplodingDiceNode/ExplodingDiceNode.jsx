import React, { memo, useState } from "react";
import { useEffect } from "react";
// import Container from "@cloudscape-design/components/container";
import { Handle, useReactFlow } from "react-flow-renderer";
import Button from "../Button";
import Container from "../Container";
import { GiDiceTarget, GiRollingDiceCup } from "react-icons/gi";
import { TiArrowLoop } from "react-icons/ti";
import styles from "./ExplodingDiceNode.module.css";
import Status from "../Status/Status";

export default memo(({ id, data, isConnectable, selected }) => {
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


  return (
    <Container selected={selected}>
      <Handle
        type="source"
        position="right"
        style={{ background: "#555", stroke: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      <div className={styles.explodingDiceNode}>

        <h1><GiRollingDiceCup /><GiDiceTarget /><TiArrowLoop /></h1>
        <Status status={flow.getNode(id).data.status} />
      </div>
      {/* <h5>{data.label}</h5>
      
      <h5>status: {flow.getNode(id).data.status}</h5> */}

    </Container>
  );
});
