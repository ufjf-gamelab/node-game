export default class Histogram {
  label = "";
  histogramData = [];
  hasData = false;
  isReady = false;
  histogramName = "";
  status = "EM_ESPERA";

  constructor() {}

  run = () => {
    if (this.histogramData.length === 0) {
      this.status = "ERROR";
    }
  };

  getHistogramData = () => {
    return this.histogramData;
  };
}
