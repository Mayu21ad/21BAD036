const express = require('express');
const router = express.Router();

class RandomNumbers {
  constructor(windowSize) {
    this.windowSize = windowSize;
    this.windowpreviousState = [];
    this.windowcurrentState = [];
    this.numbers = [];
    this.avg = 0;
  }

  generateNumbers() {
    for (let i = 0; i < this.windowSize; i++) {
      this.numbers.push(Math.floor(Math.random() * 10000));
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

const rand = new RandomNumbers(10); // default window size is 10

router.get('/', (req, res) => {
  rand.generateNumbers();
  res.json(rand.getResponse());
});

module.exports = router;