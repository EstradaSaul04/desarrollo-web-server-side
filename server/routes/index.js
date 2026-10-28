import express from 'express'
const router = express.Router();

let counter = 0;
const numbers = []

router.get('/', function(req, res, _next) {
  counter++;
  numbers.push(counter);
  res.render('index', {
    title: 'Ivan Rivalcoba',
    counter,
    numbers
  });
});

export default router;