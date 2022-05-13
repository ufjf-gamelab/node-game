import React, { memo, useEffect } from "react";
import { useState } from "react";

import { Handle, useReactFlow } from "react-flow-renderer";
import { useDispatch } from "react-redux";
import { setUpdateNamesHistograms } from "../../redux/actions/AppActions";
import { useSelector } from "react-redux";

export default memo((props) => {
  const [titleHistogram, setTitleHistogram] = useState("");
  const [status, setStatus] = useState(props.data.status);
  const flow = useReactFlow();

  const changeName = (aName) => {
    let nodes = flow.getNodes();

    nodes.map((node) => {
      if (node.id === props.id) {
        node.data.histogramName = aName;
      }
    });
    flow.setNodes(nodes);
  };

  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: "#555", stroke: "#000" }}
        onConnect={(paramsm) => console.log("handle onConnect", paramsm)}
        isConnectable={props.isConnectable}
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
              props.data.histogramName = e.target.value;
              console.log("nodes: ", props.data.nodes);
              changeName(e.target.value);
              // props.data.setNodes(props.data.nodes);
            }}
            type="text"
            value={titleHistogram}
          />
          <h5>status: {flow.getNode(props.id).data.status}</h5>
        </div>
      </div>
    </>
  );
});
