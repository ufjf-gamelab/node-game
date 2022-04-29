import React, { memo } from "react";
import { useState } from "react";

import { Handle } from "react-flow-renderer";

export default memo(({ data, isConnectable }) => {
  const [titleHistogram, setTitleHistogram] = useState("");
  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: "#555", stroke: "#000" }}
        onConnect={(paramsm) => console.log("handle onConnect", paramsm)}
        isConnectable={isConnectable}
      />
      <div
        style={{
          borderWidth: 2,
          borderRadius: 5,
          padding: 10,
          borderColor: "#000",
        }}
      >
        <div
          style={{
            background: "lightgreen",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <h3
            style={{
              padding: 2,
            }}
          >
            Gerador de histograma
          </h3>
          <input
            placeholder="Titulo do histograma"
            onChange={(e) => {
              setTitleHistogram(e.target.value);
              data.histogramName = e.target.value;
            }}
            type="text"
            value={titleHistogram}
          />
          <h5>status: {data.status}</h5>
        </div>
      </div>
    </>
  );
});
