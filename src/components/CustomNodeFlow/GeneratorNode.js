import React, { memo, useState } from "react";
import { useEffect } from "react";
// import Container from "@cloudscape-design/components/container";
import Container from "../Container";
import { Handle, useReactFlow } from "react-flow-renderer";
import Button from "../Button";
import {GiPerspectiveDiceSixFacesOne} from "react-icons/gi";
import styles from "./GeneratorNode.module.css";
import Status from "../Status/Status";

export default memo(({ id, data, isConnectable, selected }) => {
  const [status, setStatus] = useState(data.status);
  const [min, setMin] = useState(data.min);
  const [max, setMax] = useState(data.max);

  const flow = useReactFlow();

  useEffect(() => {
    setStatus(data.status);
  }, [data]);
  return (
    <Container selected={selected} title={data.label}>
      <Handle
        type="source"
        position="right"
        style={{ background: "#555", stroke: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div className={styles.generatorNode}>

      <h1><GiPerspectiveDiceSixFacesOne /></h1>
      <h2>{min}-{max}</h2>
      <Status status={flow.getNode(id).data.status} />
      </div>
    </Container>
  );
});
