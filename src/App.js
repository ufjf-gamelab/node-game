import { useState } from "react";
import Button from "./components/Button";
import CustomNodeFlow from "./components/CustomNodeFlow";
import Flow from "./components/Flow";
import HistogramChart from "./components/HistogramChart";
import { Container, Description, Title } from "./styles";
import "@cloudscape-design/global-styles/index.css"

function App() {
  const generateRandomData = (aMin, aMax, aN) => {
    let lData = [];

    for (let i = 0; i < aN; i++) {
      let lX = parseInt(Math.floor(Math.random() * (aMax + 1 - aMin) + aMin));
      lData.push({ x: lX });
    }

    setDataHistogram(lData);
  };
  const [dataHistogram, setDataHistogram] = useState([
    { x: 0 },
    { x: 1 },
    { x: 1 },
    { x: 2 },
    { x: 3 },
    { x: 4 },
    { x: 4 },
  ]);

  return (
    <Container>
      <Title>Iniciando desenvolvimento</Title>
      <Description>
        Gerar uma determinada quantidade de número aleatórios e plotar um
        histograma dos dados.
      </Description>

      <CustomNodeFlow />
      {/* <Description>{JSON.stringify(dataHistogram)}</Description> */}
      {/* <Button
        name={"Gerar aleatórios"}
        onPress={() => generateRandomData(1, 6, 1000)}
      />

      <HistogramChart data={dataHistogram} /> */}
    </Container>
  );
}

export default App;
