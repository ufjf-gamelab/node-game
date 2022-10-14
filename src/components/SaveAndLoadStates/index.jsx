import React from "react";
import { useReactFlow } from "react-flow-renderer";
import Button from "@cloudscape-design/components/button";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Icon from "@cloudscape-design/components/icon";
import TextContent from "@cloudscape-design/components/text-content";

import { Container, TextButton } from "./styles";
import { useState } from "react";

export default function ({ name, onPress, style }) {
  const flow = useReactFlow()
  const [isVisible, setIsVisible] = useState(false);
  const [textFile, setTextFile] = useState('');

  const loadFile = async (aFile) => {
    aFile.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = (e.target.result)
      // console.log(text)
      setTextFile(text);
    };
    reader.readAsText(aFile.target.files[0])
  }

  const handleOK = async () => {
    if (textFile) {
      getStates(textFile);
    }

    setIsVisible(false)
  }

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([buildJson()], { type: 'text/plain' });
    const lDate = new Date();
    element.href = URL.createObjectURL(file);
    element.download = `Model-Node-Game-${lDate.getTime()}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  const buildJson = () => {
    let lObjs = {
      nodes: flow.getNodes(),
      edges: flow.getEdges()
    }

    return JSON.stringify(lObjs);
  }

  const getStates = (aTextJson) => {
    try {
      let lObj = JSON.parse(aTextJson);

      flow.setNodes(lObj.nodes);
      flow.setEdges(lObj.edges);
    } catch (error) {
      console.log(error)
    }
  }

  return <>
    <Modal
      onDismiss={() => setIsVisible(false)}
      visible={isVisible}
      closeAriaLabel="Close modal"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={() => setIsVisible(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handleOK} >Ok</Button>
          </SpaceBetween>
        </Box>
      }
      header="Configurações"
    >

      <Box >
        <SpaceBetween direction="vertical" size="xs">
          <TextContent>
            <h4>
              Carregar projeto existente

            </h4>
          </TextContent>
          <input type="file" onChange={loadFile} />
        </SpaceBetween>
      </Box>
      <Box >
        <SpaceBetween direction="vertical" size="xs">
          <TextContent>
            <h4>
              Projeto atual
            </h4>
          </TextContent>
          <Button variant="primary" onClick={downloadTxtFile} disabled={!flow.getNodes().length} >Baixar</Button>
        </SpaceBetween>
      </Box>
    </Modal>
    <Button variant="primary" onClick={() => setIsVisible(true)} >
      <Icon name="settings" size='medium' onClick={() => setIsVisible(true)} />
    </Button>


  </>
}
