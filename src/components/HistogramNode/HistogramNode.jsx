import React, { memo, useEffect } from "react";
import { useState } from "react";
// import Container from "@cloudscape-design/components/container";
import { Handle, useReactFlow } from "react-flow-renderer";
import { useDispatch } from "react-redux";
import { setUpdateNamesHistograms } from "../../redux/actions/AppActions";
import { useSelector } from "react-redux";
import Container from "../Container";
import { GiHistogram } from "react-icons/gi";
import styles from "./HistogramNode.module.css";
import Status from "../Status/Status";

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
      <div className={styles.histogramNode}>

        <h1><GiHistogram /></h1>
        <Status status={flow.getNode(props.id).data.status} />
      </div>
      {/* <h5
        style={{
          padding: 2,
        }}
      >
        Gerador de histograma
      </h5>
      <h5>status: {flow.getNode(props.id).data.status}</h5> */}
    </Container>
  );
});
