import React, { memo, useEffect } from "react";
import { useState } from "react";
// import Container from "@cloudscape-design/components/container";
import { Handle, useReactFlow } from "react-flow-renderer";
import { useDispatch } from "react-redux";
import { setUpdateNamesHistograms } from "../../redux/actions/AppActions";
import { useSelector } from "react-redux";
import Container from "../Container";

export default memo((props) => {
  const [titleHistogram, setTitleHistogram] = useState(
    props.data.histogramName
  );
  const [status, setStatus] = useState(props.data.status);
  const flow = useReactFlow()

  // const isValidConnection = (connection) => connection.source.includes(['sum', 'generator'])

  return (
    <Container selected={props.selected}>
      <Handle
        type="target"
        position="left"
        style={{ stroke: "#000" }}
        onConnect={(paramsm) => console.log("handle onConnect", paramsm)}
        isConnectable={props.isConnectable}
      // isValidConnection={isValidConnection}

      />
      <Handle
        type="source"
        position="right"
        style={{ background: "#555", stroke: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={props.isConnectable}
      />
      <h5
        style={{
          padding: 2,
        }}
      >
        Sucesso e Falha
      </h5>
      <h5>status: {flow.getNode(props.id).data.status}</h5>
    </Container>
  );
});
