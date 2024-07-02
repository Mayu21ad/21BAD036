const express = require('express');
const router = express.Router();

class Fibonacci {
  constructor() {
    this.windowSize = 10;
    this.windowpreviousState = [];
    this.windowcurrentState = [];
    this.numbers = [];
    this.avg = 0;
  }

  generateNumbers() {
    let a = 0, b = 1;
    for (let i = 0; i < this.windowSize; i++) {
      this.numbers.push(a);
      let temp = a;
      a = b;
      b = temp + b;
    }
    this.updateStates();
  }

  updateStates() {
    this.windowpreviousState = this.windowcurrentState;
    this.windowcurrentState = this.numbers.slice(-this.windowSize);
    this.avg = this.windowcurrentState.reduce((a, b) => a + b, 0) / this.windowSize;
  }

  getResponse() {
    return {
      windowpreviousState: this.windowpreviousState,
      windowcurrentState: this.windowcurrentState,
      numbers: this.numbers,
      avg: this.avg,
    };
  }
}

const fibonacci = new Fibonacci();

router.get('/', (req, res) => {
  fibonacci.generateNumbers();
  res.json(fibonacci.getResponse());
});

module.exports = router;