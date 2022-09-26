import React, { memo, useState } from "react";
import { useEffect } from "react";
import Container from "@cloudscape-design/components/container";
import { Handle, useReactFlow } from "react-flow-renderer";
import Button from "../Button";

export default memo(({ id, data, isConnectable }) => {
  const [status, setStatus] = useState(data.status);
  const [min, setMin] = useState(data.min);
  const [max, setMax] = useState(data.max);

  const flow = useReactFlow();

  const generateRandomData = (aMin, aMax, aN) => {
    let lData = [];

    for (let i = 0; i < aN; i++) {
      let lX = parseInt(Math.floor(Math.random() * (aMax + 1 - aMin) + aMin));
      lData.push({ x: lX });
    }

    data.histogramData = lData;
  };

  useEffect(() => {
    // generateRandomData(1, 6, 1000);
  }, []);

  useEffect(() => {
    setStatus(data.status);
  }, [data]);

  // const isValidConnection = (connection) => connection.target.includes(['poolNode'])

  return (
    <Container>
      <Handle
        type="source"
        position="right"
        style={{ background: "#555", stroke: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      // isValidConnection={isValidConnection}
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
      <h2>{data.label}</h2>
      {/* <input
        placeholder="Maximo"
        onChange={(e) => {
          setMax(e.target.value);
          data.max = parseFloat(e.target.value);
        }}
        type="number"
        value={max}
      /> */}
      <h5>status: {flow.getNode(id).data.status}</h5>
    </Container>
  );
});
