import React, { memo, useState } from "react";
import { useEffect } from "react";
// import Container from "@cloudscape-design/components/container";
import { Handle, useReactFlow } from "react-flow-renderer";
import Button from "../Button";
import Container from "../Container";
import { GiRollingDices } from "react-icons/gi";
import { VscSymbolString } from "react-icons/vsc";
import styles from "./SymbolPoolNode.module.css";
import Status from "../Status/Status";


export default memo(({ id, data, isConnectable, selected }) => {
  const [status, setStatus] = useState(data.status);
  const [min, setMin] = useState(data.min);
  const [max, setMax] = useState(data.max);

  const flow = useReactFlow();


  useEffect(() => {
    setStatus(data.status);
  }, [data]);

  const isValidConnection = (connection) => {
    return canConnectToNode(flow.getNode(connection.target).type)
  }

  const canConnectToNode = (aNodeType) => {
    let lCanConnect = false;
    const lAllowed = ['poolNode', 'sumNode', 'poolSumNode', 'faceBetweenNode', 'countRepeatedNode', 'histogramNode']

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
        type="source"
        position="right"
        style={{ stroke: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
        isValidConnection={isValidConnection}
      />
      <Handle
        type="target"
        position="left"
        id="a"
        style={{ top: 20, background: "#555", stroke: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position="left"
        id="b"
        style={{ bottom: 20, background: "#555", stroke: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      <div className={styles.poolNode}>

        <h1><GiRollingDices /><VscSymbolString /></h1>
        <Status status={flow.getNode(id).data.status} />
      </div>
    </Container>
  );
});
