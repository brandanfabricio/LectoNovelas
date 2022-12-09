
const { Router } = require('express');
const { HolaMundo, AgregarNovela, TodasLasNovela,formAgregar,MostraNovela } = require('./novela.controllers')
const router = Router();

// router.get('/', HolaMundo)

router.get('/', TodasLasNovela)
router.get('/novela', formAgregar)

router.get('/novela/:id/:desde', MostraNovela)

router.post('/agregarNovela', AgregarNovela)
module.exports = router

