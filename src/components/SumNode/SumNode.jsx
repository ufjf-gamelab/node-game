import React, { memo } from "react";
import { useState, useEffect } from "react";
// import Container from "@cloudscape-design/components/container";

import { Handle } from "react-flow-renderer";
import Container from "../Container";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import styles from "./SumNode.module.css";
import Status from "../Status/Status";

export default memo(({ data, isConnectable, selected }) => {
  const [titleHistogram, setTitleHistogram] = useState("");
  const [status, setStatus] = useState(data.status);

  useEffect(() => {
    setStatus(data.status);
  }, [data]);

  return (
    <Container selected={selected}>
      <Handle
        type="target"
        position="left"
        id="a"
        style={{ top: 10, background: "#555", stroke: "#000" }}
        onConnect={(paramsm) => console.log("handle onConnect", paramsm)}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position="left"
        id="b"
        style={{ top: 70, background: "#00f", stroke: "#000" }}
        onConnect={(paramsm) => console.log("handle onConnect", paramsm)}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        id="c"
        position="right"
        style={{ background: "#555", stroke: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      <div className={styles.sumNode}>

        <h1><GiPerspectiveDiceSixFacesOne />+<GiPerspectiveDiceSixFacesOne /></h1>
        <Status status={status} />
      </div>

      {/* <h3
        style={{
          padding: 2,
        }}
      >
        Somar dois geradores
      </h3>
      <h5>status: {status}</h5> */}
    </Container>
  );
});
