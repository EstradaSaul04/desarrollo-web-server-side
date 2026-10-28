import express from 'express'
const router = express.Router();

router.get('/', function(req, res, _next) {
  res.send('<h1 style="color:red">LISTA DE AMIGAS</h1>');
});

export default router;