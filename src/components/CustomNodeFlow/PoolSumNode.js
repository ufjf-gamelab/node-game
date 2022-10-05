import React, { memo } from "react";
import { useState, useEffect } from "react";
import Container from "@cloudscape-design/components/container";

import { Handle, useReactFlow } from "react-flow-renderer";

export default memo(({ data, isConnectable }) => {
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
    <Container>
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
      <h3
        style={{
          padding: 2,
        }}
      >
        Pool Sum
      </h3>
      <h5>gera na saida um vetor com a soma de cada linha do pool.</h5>
      <h5>status: {status}</h5>
      {/* </div>
      </div> */}
    </Container>
  );
});
