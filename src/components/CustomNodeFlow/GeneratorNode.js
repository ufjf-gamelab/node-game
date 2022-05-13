import React, { memo, useState } from "react";
import { useEffect } from "react";

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
  return (
    <div style={{ backgroundColor: "salmon", borderRadius: 5 }}>
      <Handle
        type="source"
        position="right"
        style={{ background: "#555", stroke: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <h2>{data.label}</h2>
      {/* <div style={{ flexDirection: "column" }}>
        <Button name={data.label} onPress={() => null} />
      </div> */}
      <input
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
      />
      <h5>status: {flow.getNode(id).data.status}</h5>
    </div>
  );
});
