
const {Router} = require('express');
const {Prueba,Novela,Capitulo} = require('../services')
const {Eror404} = require('../middleware')
const router = Router();
// const routerApi = Router();
router.use('/prueba', Prueba)
router.use('/capitulo', Capitulo)
router.use('/', Novela) 

// router.use('/v1/api/',routerApi)
router.use(Eror404)
module.exports = router;