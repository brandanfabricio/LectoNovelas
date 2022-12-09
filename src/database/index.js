const mongoose = require('mongoose');

const ConecionMongo = async(uri)=>{

    try {
        await mongoose.connect(uri,{family: 4,})
        console.log('db conectado')

    } catch (error) {
        console.log(error)
    }

}

module.exports = ConecionMongo;