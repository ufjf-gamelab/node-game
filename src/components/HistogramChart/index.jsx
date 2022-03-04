import React from "react";
import ReactDOM from "react-dom";
import { VictoryBar, VictoryHistogram, VictoryChart } from "victory";
import { Container, TextButton } from "./styles";

// const data = [
//   { x: 0 },
//   { x: 1 },
//   { x: 1 },
//   { x: 2 },
//   { x: 3 },
//   { x: 4 },
//   { x: 4 },
// ];

const HistogramChart: React.FC = ({ data }) => {
  return (
    <Container>
      <VictoryChart>
        <VictoryHistogram
          style={{
            data: {
              fill: "hsl(355, 88%, 67%)",
              stroke: "hsl(355, 10%, 25%)",
            },
          }}
          cornerRadius={5}
          labels={({ datum }) => `${datum.y}`}
          data={data}
          bins={[1, 2, 3, 4, 5, 6, 7]}
          animate={{
            duration: 500,
            onLoad: { duration: 200 },
          }}
        />
      </VictoryChart>
    </Container>
  );
};

export default HistogramChart;
