
class Prueba{

       async HolaMundo(req,res){
           return res.json({
               msj: "Hola mundo"
           })
       }

}

module.exports = new Prueba;
