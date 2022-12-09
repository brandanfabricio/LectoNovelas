
const { Router } = require('express');
const { HolaMundo,AgregarCapitulo,VerFormulario,LeerTodoLosCapitulo } = require('./capitulos.controllers')
const router = Router();

// router.get('/', HolaMundo)
router.get('/:id',VerFormulario )
router.post('/agregar/:id',AgregarCapitulo )

router.get('/leer/:id/:desde',LeerTodoLosCapitulo)

module.exports = router

