import narudzbeRouter from './routes/narudzbe.js';
const express = require('express');
const router = express.Router();
const app = express();

app.use(express.json());
app.use('/narudzbe', narudzbeRouter);
