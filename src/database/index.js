// const mongoose = require('mongoose');

// const ConecionMongo = async(uri)=>{

//     try {
//         await mongoose.connect(uri,{family: 4,})
//         console.log('db conectado')

//     } catch (error) {
//         console.log(error)
//     }

// }

// module.exports = ConecionMongo;

const Sequelize = require('sequelize')

const db = new Sequelize('misnovelas', 'root', 'root', {

    port: '3306',
    host: 'Mysql',
    dialect: 'mysql'
})




db.sync({force:false})
    .then(()=>{
        console.log('Tabalas Sincronizada')
    })
module.exports = {db};