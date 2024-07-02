const express = require('express');
const router = express.Router();

class Even {
  constructor() {
    this.windowSize = 10;
    this.windowpreviousState = [];
    this.windowcurrentState = [];
    this.numbers = [];
    this.avg = 0;
  }

  generateNumbers() {
    for (let i = 0; i < this.windowSize; i++) {
      if (i % 2 === 0) {
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

const even = new Even();

router.get('/', (req, res) => {
  even.generateNumbers();
  res.json(even.getResponse());
});

module.exports = router;