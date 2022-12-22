import React, { memo, useEffect } from "react";
import { useState } from "react";
// import Container from "@cloudscape-design/components/container";
import { Handle, useReactFlow } from "react-flow-renderer";
import { useDispatch } from "react-redux";
import { setUpdateNamesHistograms } from "../../redux/actions/AppActions";
import { useSelector } from "react-redux";
import Container from "../Container";
import { GiPerspectiveDiceSixFacesRandom, } from "react-icons/gi";
import { AiOutlineVerticalAlignMiddle } from "react-icons/ai";
import styles from "./FaceBetweenNode.module.css";
import Status from "../Status/Status";

export default memo((props) => {
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
      <div className={styles.faceBetweenNode}>

        <h1><GiPerspectiveDiceSixFacesRandom /><AiOutlineVerticalAlignMiddle /></h1>
        <Status status={flow.getNode(props.id).data.status} />
      </div>
      {/* <h5
        style={{
          // padding: 2,
        }}
      >
        Face entre intervalo
      </h5>
      <h5>status: {flow.getNode(props.id).data.status}</h5> */}
    </Container>
  );
});
