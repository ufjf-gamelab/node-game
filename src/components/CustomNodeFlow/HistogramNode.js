import React, { memo, useEffect } from "react";
import { useState } from "react";
import Container from "@cloudscape-design/components/container";
import { Handle, useReactFlow } from "react-flow-renderer";
import { useDispatch } from "react-redux";
import { setUpdateNamesHistograms } from "../../redux/actions/AppActions";
import { useSelector } from "react-redux";

export default memo((props) => {
  const [titleHistogram, setTitleHistogram] = useState(
    props.data.histogramName
  );
  const [status, setStatus] = useState(props.data.status);
  const flow = useReactFlow();

  const changeName = (aName) => {
    let nodes = flow.getNodes();

    nodes.map((node) => {
      if (node.id === props.id) {
        node.data.histogramName = aName;
      }
    });
    flow.setNodes([...nodes]);
  };

  const isValidConnection = (connection) => connection.source.includes(['sumNode', 'generator'])
  //(connection.type === 'generator' || connection.type === 'sumNode');

  return (
    <Container>
      <Handle
        type="target"
        position="left"
        style={{ background: "#555", stroke: "#000" }}
        onConnect={(paramsm) => console.log("handle onConnect", paramsm)}
        isConnectable={props.isConnectable}
        isValidConnection={isValidConnection}

      />
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
          console.log("nodes: ", flow.getNode(props.id).data.histogramName);
          changeName(e.target.value);
        }}
        type="text"
        value={titleHistogram}
      />
      <h5>status: {flow.getNode(props.id).data.status}</h5>
    </Container>
  );
});
