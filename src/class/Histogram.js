export default class Histogram {
  label = "";
  histogramData = [];
  hasData = false;
  isReady = false;
  histogramName = "";
  isReady = false;
  status = "EM_ESPERA";

  constructor() {}

  run = () => {
    console.log("abstraindo histograma...");
    if (this.histogramData.length === 0) {
      this.status = "ERROR";
    }
    // this.checkNodeGenerator();
  };

  getHistogramData = () => {
    return this.histogramData;
  };
}
