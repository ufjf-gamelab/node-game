import React, { memo, useEffect, useState } from "react";
import { VictoryChart, VictoryHistogram } from "victory";
import { Container } from "./styles";

// const data = [
//   { x: 0 },
//   { x: 1 },
//   { x: 1 },
//   { x: 2 },
//   { x: 3 },
//   { x: 4 },
//   { x: 4 },
// ];

export default memo(({ data }) => {
  const [bins, setBins] = useState([]);
  const [loadingBins, setLoadingBins] = useState(true);

  const getArrayIntegers = (aArray) => {
    let lCleanArray = getArrayClean(aArray);
    let lMin = Math.min(...lCleanArray);
    let lMax = Math.max(...lCleanArray);
    let i = 0;
    let lIntegers = [];

    for (i = parseInt(lMin); i <= lMax; i++) {
      lIntegers.push(i);
    }
    lIntegers.push(i++);
    console.log("min: ", lMin);
    console.log("max: ", lMax);
    console.log(lIntegers);

    return lIntegers;
  };

  const getArrayClean = (aArray) => {
    let lArray = [];
    aArray.map((item) => {
      lArray.push(item.x);
    });

    return lArray;
  };

  useEffect(() => {
    setLoadingBins(true);
    setBins(getArrayIntegers(data));
    setLoadingBins(false);
  }, [data]);

  return (
    <Container>
      {!loadingBins ? (
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
            // bins={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
            bins={bins}
            animate={{
              duration: 500,
              onLoad: { duration: 200 },
            }}
          />
        </VictoryChart>
      ) : (
        <></>
      )}
    </Container>
  );
});

// export default HistogramChart;
