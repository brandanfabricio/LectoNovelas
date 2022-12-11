// const {Schema,model} = require('mongoose');

// const Novela = Schema({
//     titulo:{
//         type:String,
//         require:true
//     },
//     imagen:{
//         type:String,
//     }
// },{
//     timetamps:true,
//     versionKey:false

// })


// module.exports = model('novela',Novela)}

const {DataTypes} = require('sequelize');
const {db} = require('../database');

const Novela = db.define('novela',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    titulo:{
        type:DataTypes.STRING,
        defaultValue: false,
    },
    imagen:{
        type:DataTypes.STRING,
    }
},{
    timestamps: false

});





module.exports = Novela