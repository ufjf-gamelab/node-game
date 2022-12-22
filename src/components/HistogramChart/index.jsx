import React, { memo, useEffect, useState } from "react";
import { VictoryChart, VictoryHistogram } from "victory";
import { Container } from "./styles";
import BarChart from "@cloudscape-design/components/bar-chart";
import { Box, Button } from "@cloudscape-design/components";
import { useReactFlow } from "react-flow-renderer";

export default ({ data, id }) => {
  const [dataChart, setDataChart] = useState([]);
  const [xDomain, setXDomain] = useState([]);
  const [yDomain, setYDomain] = useState([]);
  const flow = useReactFlow()

  const getSourceNode = () => {
    let lEdge = flow.getEdges().filter((ed) => ed.target === id);

    if (lEdge.length > 0) {
      let lNode = flow.getNode(lEdge[0].source)
      return lNode.type
    }

    return ''
  }

  const prepareData = (aData) => {
    try {
      let lData = [];
      let lXDomain = []

      aData.map(item => {
        let lIndex = getIndex(lData, item);

        lData[lIndex] = { x: item, y: lData[lIndex]?.y ? lData[lIndex]?.y + 1 : 1 }
        lXDomain[lIndex] = item

      })

      console.log('data formatada: ', lData);

      lData.sort((a, b) => {
        if (a.x > b.x) return 1
        if (a.x < b.x) return -1
        return 0
      })

      let lMin = 0, lMax = 0

      lData.map(item => {
        // lXDomain.push(item.x)
        xDomain.push(item.x)

        if (item.y > lMax)
          lMax = item.y

        if (item.y < lMin)
          lMin = item.y
      })

      // setXDomain(lXDomain)
      console.log('x: ', lXDomain)
      setYDomain([lMin, lMax])
      setXDomain(xDomain)
      setDataChart(lData)

    } catch (error) {
      console.warn(error);
    }
  }

  const prepareSuccessData = (aData) => {
    // zero para falha e 1 para sucesso

    let lData = [{ x: 'Fracasso', y: 0 }, { x: 'Sucesso', y: 0 }], lXDomain = [], lYDomain = [];

    lXDomain = ['Fracasso', 'Sucesso'];
    lYDomain = [0, 10000];


    aData?.map(item => {
      if (item === 0) {
        lData[0] = { x: 'Fracasso', y: lData[0]?.y ? lData[0]?.y + 1 : 1 }
      } else {
        lData[1] = { x: 'Sucesso', y: lData[1]?.y ? lData[1]?.y + 1 : 1 }
      }
    })

    setXDomain(lXDomain);
    setYDomain(lYDomain);
    setDataChart(lData);
  }

  const getIndex = (aData, aItem) => {
    for (let i = 0; i < aData.length; i++) {
      if (aData[i]?.x === aItem) {
        return i
      }
    }

    return aData.length
  }

  const build = () => {
    switch (getSourceNode()) {
      case 'successNode':
        prepareSuccessData(data)
        break;

      case 'faceBetweenNode':
        prepareSuccessData(data)
        break;

      default: prepareData(data)
        break;
    }
  }

  useEffect(() => {
    build()//prepareData(data)
  }, [data])

  return (
    <div style={{ width: '50%' }}>
      <h2 style={{}}>{flow.getNode(id)?.data?.histogramName}</h2>
      <BarChart
        series={[
          {
            title: data?.histogramName,
            type: "bar",
            data: dataChart,

            valueFormatter: e =>
              e.toLocaleString("en-US")
          },
          // {
          //   title: "Average revenue",
          //   type: "threshold",
          //   y: 19104,
          //   valueFormatter: e =>
          //     "$" + e.toLocaleString("en-US")
          // }
        ]}
        xDomain={xDomain}
        yDomain={yDomain}
        i18nStrings={{
          filterLabel: "Filter displayed data",
          // filterPlaceholder: "Filter data",
          filterSelectedAriaLabel: "selected",
          detailPopoverDismissAriaLabel: "Dismiss",
          legendAriaLabel: "Legend",
          chartAriaRoleDescription: "line chart",
          // xTickFormatter: e =>
          //   e
          //     .toLocaleDateString("en-US", {
          //       month: "short",
          //       day: "numeric",
          //       hour: "numeric",
          //       minute: "numeric",
          //       hour12: !1
          //     })
          //     .split(",")
          //     .join("\n"),
          yTickFormatter: function o(e) {
            return Math.abs(e) >= 1e9
              ? (e / 1e9).toFixed(1).replace(/\.0$/, "") +
              "G"
              : Math.abs(e) >= 1e6
                ? (e / 1e6).toFixed(1).replace(/\.0$/, "") +
                "M"
                : Math.abs(e) >= 1e3
                  ? (e / 1e3).toFixed(1).replace(/\.0$/, "") +
                  "K"
                  : e.toFixed(2);
          }
        }}
        ariaLabel="Single data series line chart"
        errorText="Error loading data."
        hideFilter
        height={300}

        loadingText="Loading chart"
        // recoveryText="Retry"
        xScaleType="categorical"
        // xTitle="Time (UTC)"
        // yTitle="Revenue (USD)"
        empty={
          <Box textAlign="center" color="inherit">
            <b>No data available</b>
            <Box variant="p" color="inherit">
              There is no data available
            </Box>
          </Box>
        }
        noMatch={
          <Box textAlign="center" color="inherit">
            <b>No matching data</b>
            <Box variant="p" color="inherit">
              There is no matching data to display
            </Box>
            <Button>Clear filter</Button>
          </Box>
        }
      />
    </div>
  );
}


// export default memo(({ data, id }) => {
//   const [bins, setBins] = useState([]);
//   const [loadingBins, setLoadingBins] = useState(true);
//   const flow = useReactFlow()

//   const getArrayIntegers = (aArray) => {
//     let lCleanArray = getArrayClean(aArray);
//     let lMin = Math.min(...lCleanArray);
//     let lMax = Math.max(...lCleanArray);
//     let i = 0;
//     let lIntegers = [];

//     for (i = parseInt(lMin); i <= lMax; i++) {
//       lIntegers.push(i);
//     }
//     lIntegers.push(i++);
//     console.log("min: ", lMin);
//     console.log("max: ", lMax);
//     console.log(lIntegers);

//     return lIntegers;
//   };

//   const getArrayClean = (aArray) => {
//     let lArray = [];
//     aArray.map((item) => {
//       lArray.push(item.x);
//     });

//     return lArray;
//   };

//   useEffect(() => {
//     setLoadingBins(true);
//     setBins(getArrayIntegers(data));
//     setLoadingBins(false);
//   }, [data]);

//   return (
//     <Container>
//       {!loadingBins ? (
//         <div>
//           <h2>{flow.getNode(id).data.histogramName}</h2>

//           <VictoryChart>
//             <VictoryHistogram
//               style={{
//                 data: {
//                   fill: "hsl(355, 88%, 67%)",
//                   stroke: "hsl(355, 10%, 25%)",
//                 },
//               }}
//               cornerRadius={5}
//               labels={({ datum }) => `${datum.y}`}
//               data={data}
//               // bins={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
//               bins={bins}
//               animate={{
//                 duration: 500,
//                 onLoad: { duration: 200 },
//               }}
//             />
//           </VictoryChart>
//         </div>
//       ) : (
//         <></>
//       )}
//     </Container>
//   );
// });

// export default HistogramChart;
