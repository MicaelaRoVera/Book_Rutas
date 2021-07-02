const router = require('express').Router();
//const apiLibrosRouter = require('./api/libro');
const apiCategoriasRouter = require('./api/categoria');

//router.use('/libro', apiLibrosRouter);
router.use('/categoria', apiCategoriasRouter);

module.exports = router; 

//pasa esto a categoria para ver si funciona asi y luego separalo de nuevo