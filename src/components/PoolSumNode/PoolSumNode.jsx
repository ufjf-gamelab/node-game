import React, { memo } from "react";
import { useState, useEffect } from "react";
import { GiRollingDices } from "react-icons/gi";
import { TbSum } from "react-icons/tb";
import styles from "./PoolSumNode.module.css";
import Status from "../Status/Status";
// import Container from "@cloudscape-design/components/container";

import { Handle, useReactFlow } from "react-flow-renderer";
import Container from "../Container";

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

      <div className={styles.poolSumNode}>

        <h1><TbSum /><GiRollingDices /></h1>
        <Status status={status} />
      </div>
      {/* <h5
        style={{
          padding: 2,
        }}
      >
        Pool Sum
      </h5>
      <h5>status: {status}</h5> */}
    </Container>
  );
});
