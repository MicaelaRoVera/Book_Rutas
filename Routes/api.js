const router = require('express').Router();
const apiLibrosRouter = require('./api/libro');
const apiCategoriasRouter = require('./api/categoria');

router.use('/categoria', apiCategoriasRouter);
router.use('/libro',apiLibrosRouter);

module.exports = router; 

