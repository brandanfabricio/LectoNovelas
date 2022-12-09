
const {Router} = require('express');
const Prueba = require('./prueba.controller')
const router = Router();

router.get('/',Prueba.HolaMundo)
module.exports = router

