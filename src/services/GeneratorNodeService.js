export default class GeneratorNodeService {
    static generateRandomData = (aMin, aMax, aN) => {
        let lData = [];
    
        for (let i = 0; i < aN; i++) {
          let lX = parseInt(Math.floor(Math.random() * (aMax + 1 - aMin) + aMin));
          lData.push(lX);
        }
    
        return lData;
      };
}