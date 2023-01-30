// const { Schema, model } = require('mongoose');

// const Capitulo = Schema({
//     cap: {
//         type: String
//     },
//     titulo: {
//         type: String,
//     },
//     contenido: {
//         type: String,
//     },
//     novela: {
//         type: Schema.Types.ObjectId,
//         ref: "novela"
//     }
// }, {
//     timetamps: true,
//     versionKey:false
// })


// module.exports = model('capitulo', Capitulo)
const { DataTypes } = require('sequelize')
const { db } = require('../database');
const Novela = require('./novelas')

const Capitulo = db.define('capitulo', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,

    },

    cap: {
        type: DataTypes.STRING,
    },
    titulo: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    contenido: {
        type: DataTypes.TEXT,
        defaultValue: false,
    },
    Ncap:{
        type:DataTypes.INTEGER,
        defaultValue:false
    }
    
}, {
    timestamps: false
})


Novela.hasMany(Capitulo, {
    foreinkey: "NovelaId",
    sourceKey: "id",
});

Capitulo.belongsTo(Novela,
    {
        foreinkey: "NovelaId",
        targetId: "id"
    });


module.exports = Capitulo;