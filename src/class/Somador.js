export default class Somador {
  label = "";
  histogramData = [];
  hasData = false;
  isReady = false;
  status = "";
  input1 = null;
  input2 = null;

  constructor() {
    this.label = "Somador";
  }

  run() {
    this.isReady = false;
    if (!this.input1.isReady) {
      this.input1.run();
    }
    if (!this.input2.isReady) {
      this.input2.run();
    }

    this.hasData = true;
    this.status = 'PRONTO';

    this.isReady = true;
  }
}
