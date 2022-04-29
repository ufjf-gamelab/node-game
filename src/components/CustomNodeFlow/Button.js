import React, { memo, useState } from "react";
import { useEffect } from "react";

import { Handle } from "react-flow-renderer";
import Button from "../Button";

export default memo(({ data, isConnectable }) => {
  const [status, setStatus] = useState(data.status);
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
    <>
      <Handle
        type="source"
        position="right"
        style={{ background: "#555", stroke: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div style={{}}>
        <Button name={data.label} onPress={() => null} />
        {/* <button
        name="Gerar aleatorios"
        type="button"
        onClick={() => console.log("clicado")}
        style={{ padding: 10 }}
      /> */}
      </div>
      <h5>status: {status}</h5>
    </>
  );
});
