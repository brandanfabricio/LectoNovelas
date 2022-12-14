const { DataTypes } = require('sequelize')
const { db } = require('../database');
const Novela = require('./novelas')

const Pagina = db.define('pagina', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,

    },
    pagina: {
        type: DataTypes.STRING,
        defaultValue: false,
    }
}, {
    timestamps: false
})


Novela.hasMany(Pagina, {
    foreinkey: "NovelaId",
    sourceKey: "id",
});



Pagina.belongsTo(Novela,
    {
        foreinkey: "NovelaId",
        targetId: "id"
    });


module.exports = Pagina;