const {Schema,model} = require('mongoose');

const Novela = Schema({
    titulo:{
        type:String,
        require:true
    },
    imagen:{
        type:String,
    }
},{
    timetamps:true,
    versionKey:false

})


module.exports = model('novela',Novela)