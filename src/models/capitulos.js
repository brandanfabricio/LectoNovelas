const { Schema, model } = require('mongoose');

const Capitulo = Schema({
    cap: {
        type: String
    },
    titulo: {
        type: String,
    },
    contenido: {
        type: String,
    },
    novela: {
        type: Schema.Types.ObjectId,
        ref: "novela"
    }
}, {
    timetamps: true,
    versionKey:false
})


module.exports = model('capitulo', Capitulo)