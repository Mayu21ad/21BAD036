const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const primesRouter = require('./routes/primes');
const fiboRouter = require('./routes/fibo');
const evenRouter = require('./routes/even');
const randRouter = require('./routes/rand');

app.use(express.json());

app.use('/test/primes', primesRouter);
app.use('/test/fibo', fiboRouter);
app.use('/test/even', evenRouter);
app.use('/test/rand', randRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});