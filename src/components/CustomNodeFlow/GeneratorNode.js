import React, { memo, useState } from "react";
import { useEffect } from "react";
// import Container from "@cloudscape-design/components/container";
import Container from "../Container";
import { Handle, useReactFlow } from "react-flow-renderer";
import Button from "../Button";

export default memo(({ id, data, isConnectable, selected }) => {
  const [status, setStatus] = useState(data.status);
  const [min, setMin] = useState(data.min);
  const [max, setMax] = useState(data.max);

  const flow = useReactFlow();

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
      <h5>{data.label}</h5>
      {/* <h6>{`De ${data.min} a ${data.max}`}</h6> */}
      {/* <input
        placeholder="Minimo"
        onChange={(e) => {
          setMin(e.target.value);
          data.min = parseFloat(e.target.value);
        }}
        type="number"
        value={min}
      />
      <input
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
