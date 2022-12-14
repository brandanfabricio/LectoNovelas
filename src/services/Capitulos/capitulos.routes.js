
const { Router } = require('express');
const {AgregarCapitulo,VerFormulario,UltimaPagina,LeerTodoLosCapitulo } = require('./capitulos.controllers')
const router = Router();

router.get('/:id',VerFormulario )
router.post('/agregar/:id',AgregarCapitulo )

router.get('/leer/:id/:desde',LeerTodoLosCapitulo)

router.get('/leer/ultimo/:id/:desde',UltimaPagina)


module.exports = router

