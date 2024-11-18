type DataItem = { x: number };
type Status = "EM_ESPERA" | "PRONTO";

export default class Generator {
  label = "";
  histogramData: DataItem[] = [];
  hasData = false;
  isReady = false;
  min = 1;
  max = 6;
  status: Status = "EM_ESPERA";
  error = false;

  constructor() {
    this.label = "Gerador de aleatórios";
  }

  generateRandomData(aMin: number, aMax: number, aN: number) {
    const lData: DataItem[] = [];

    for (let i = 0; i < aN; i++) {
      const lX = parseInt(Math.floor(Math.random() * (aMax + 1 - aMin) + aMin).toString());
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
      this.status = "PRONTO";
    }
  }

  run() {
    this.isReady = false;
    console.log("nao tem dados... gerando");
    this.histogramData = this.generateRandomData(this.min, this.max, 10000);
    this.hasData = true;
    this.status = "PRONTO";
    this.isReady = true;
  }

  getHistogramData = () => {
    return this.histogramData;
  };

  setMin(value: number) {
    this.min = value;
  }
}
