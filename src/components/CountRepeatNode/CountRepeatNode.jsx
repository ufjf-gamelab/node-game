import React, { memo } from "react";
import { useState, useEffect } from "react";
import { GiDiceTarget, GiRollingDices } from "react-icons/gi";
import styles from "./CountRepeatNode.module.css";
import Status from "../Status/Status";
// import Container from "@cloudscape-design/components/container";

import { Handle, useReactFlow } from "react-flow-renderer";
import Container from "../Container";
import { AiOutlineFieldNumber } from "react-icons/ai";

export default memo(({ data, isConnectable, selected }) => {
  const [status, setStatus] = useState(data.status);
  const flow = useReactFlow();

  useEffect(() => {
    setStatus(data.status);
  }, [data]);

  const isValidConnection = (connection) => {
    return canConnectToNode(flow.getNode(connection.source).type)
  }

  const canConnectToNode = (aNodeType) => {
    let lCanConnect = false;
    const lAllowed = ['poolNode']

    lAllowed.forEach(type => {
      if (type === aNodeType) {

        lCanConnect = true;
      }
    })

    return lCanConnect;
  }

  return (
    <Container selected={selected}>
      <Handle
        type="target"
        position="left"
        id="a"
        style={{ background: "#555", stroke: "#000" }}
        onConnect={(paramsm) => console.log("handle onConnect", paramsm)}
        isConnectable={isConnectable}
        isValidConnection={isValidConnection}
      />
      <Handle
        type="source"
        id="c"
        position="right"
        style={{ background: "#555", stroke: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      <div className={styles.countRepeatNode}>

        <h1><AiOutlineFieldNumber /><GiDiceTarget /></h1>
        <Status status={status} />
      </div>
    </Container>
  );
});
