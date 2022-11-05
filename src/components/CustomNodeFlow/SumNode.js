import React, { memo } from "react";
import { useState, useEffect } from "react";
// import Container from "@cloudscape-design/components/container";

import { Handle } from "react-flow-renderer";
import Container from "../Container";

export default memo(({ data, isConnectable, selected }) => {
  const [titleHistogram, setTitleHistogram] = useState("");
  const [status, setStatus] = useState(data.status);

  useEffect(() => {
    setStatus(data.status);
  }, [data]);

  // const isValidConnection = (connection) => {
  //   return canConnectToNode(flow.getNode(connection.target).type)
  // }

  // const canConnectToNode = (aNodeType) => {
  //   let lCan = false;
  //   const lAllowed = ['poolNode', 'sumNode']

  //   lAllowed.forEach(type => {
  //     if (type === aNodeType) {

  //       lCan = true;
  //     }
  //   })

  //   return lCan;
  // }

  return (
    <Container selected={selected}>
      <Handle
        type="target"
        position="left"
        id="a"
        style={{ top: 30, background: "#555", stroke: "#000" }}
        onConnect={(paramsm) => console.log("handle onConnect", paramsm)}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position="left"
        id="b"
        style={{ background: "#00f", stroke: "#000" }}
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
      {/* <div
        style={{
          borderWidth: 2,
          borderRadius: 5,
          padding: 10,
          paddingVertical: 20,
          borderColor: "#000",
        }}
      >
        <div
          style={{
            background: "lightblue",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        > */}
      <h3
        style={{
          padding: 2,
        }}
      >
        Somar dois geradores
      </h3>
      <h5>status: {status}</h5>
      {/* </div>
      </div> */}
    </Container>
  );
});
