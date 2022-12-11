
const { Router } = require('express');
const {AgregarCapitulo,VerFormulario,LeerTodoLosCapitulo } = require('./capitulos.controllers')
const router = Router();

router.get('/:id',VerFormulario )
router.post('/agregar/:id',AgregarCapitulo )

router.get('/leer/:id/:desde',LeerTodoLosCapitulo)

module.exports = router

