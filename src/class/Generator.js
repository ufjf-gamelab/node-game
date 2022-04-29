export default class Generator {
  label = "";
  histogramData = [];
  hasData = false;
  isReady = false;
  min = 0;
  max = 6;
  status = "";

  constructor() {
    this.label = "Gerador de aleatórios";
  }

  generateRandomData(aMin, aMax, aN) {
    let lData = [];

    for (let i = 0; i < aN; i++) {
      let lX = parseInt(Math.floor(Math.random() * (aMax + 1 - aMin) + aMin));
      lData.push({ x: lX });
    }

    return lData;
  }

  checkNodeGenerator() {
    if (!this.hasData) {
      console.log("nao tem dados... gerando");
      this.histogramData = this.generateRandomData(this.min, this.max, 10000);
      this.hasData = true;
      this.isReady = true;
      this.status = "pronto";
    }
  }

  run = (aNodes) => {
    // console.log("abstraindo...");
    this.checkNodeGenerator();
  };

  getHistogramData = () => {
    return this.histogramData;
  };
}
