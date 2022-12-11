
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PORT, MONGO } = require('../config')
const router = require('../routes/index.routes')
// const ConecionDB = require('../database')
const path = require('path');
const { create } = require('express-handlebars');


class Servidor {
    constructor() {
        this.PORT = PORT;
        this.MONGO = MONGO;
        this.app = express();
        this.middleware()
        this.ConectarDB();

        this.Rutas()
    }

    Rutas() {
        this.app.use(router)

    }
    middleware() {
        this.app.use(cors())
        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.static('public'))
        this.app.set("views");
        this.app.engine(
            ".hbs",
            create({
                layoutsDir: path.join(this.app.get("views"), "layouts"),
                defaulLayout: "main",
                extname: ".hbs",
            }).engine
        );
        this.app.set("view engine", ".hbs");



    }
    async ConectarDB() {
        // await ConecionDB(this.MONGO)
         require('../database')
    }
    Start() {

        this.app.listen(this.PORT, () => {
            console.log('Servidor andando en el puerto', this.PORT)
        })
    }
}

module.exports = Servidor;
