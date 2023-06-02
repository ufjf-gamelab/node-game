import React, { memo, useState } from "react";
import { useEffect } from "react";
import Container from "../Container";
import { Handle } from "react-flow-renderer";
import { GiGlassBall, GiSwapBag } from "react-icons/gi";
import styles from "./BagNode.module.css";
import Status from "../Status/Status";

export default memo(({ id, data, isConnectable, selected }) => {
  const [status, setStatus] = useState(data.status);
  const [faces, setFaces] = useState(data.faces);

  useEffect(() => {
    setFaces(data.faces);
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
      <div className={styles.symbolNode}>
        <h1>
          <GiSwapBag />
          <GiGlassBall />
        </h1>
        <h2>{faces}</h2>
        <Status status={status} />
      </div>
    </Container>
  );
});
