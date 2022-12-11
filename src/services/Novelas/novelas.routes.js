
const { Router } = require('express');
const { AgregarNovela, TodasLasNovela,formAgregar,MostraNovela } = require('./novela.controllers')
const router = Router();



router.get('/', TodasLasNovela)
router.get('/novela', formAgregar)

router.get('/novela/:id/:desde', MostraNovela)

router.post('/agregarNovela', AgregarNovela)
module.exports = router

