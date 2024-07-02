const express = require('express');
const router = express.Router();

class Primes {
  constructor() {
    this.windowSize = 10;
    this.windowpreviousState = [];
    this.windowcurrentState = [];
    this.numbers = [];
    this.avg = 0;
  }

  generateNumbers() {
    for (let i = 0; i < this.windowSize; i++) {
      let isPrime = true;
      for (let j = 2; j * j <= i; j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) {
        this.numbers.push(i);
      }
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

const primes = new Primes();

router.get('/', (req, res) => {
  primes.generateNumbers();
  res.json(primes.getResponse());
});

module.exports = router;