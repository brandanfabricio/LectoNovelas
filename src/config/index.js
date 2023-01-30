

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

module.exports = {
    PORT: process.env.PORT,
    MONGO: process.env.MONGO,
    HOST: process.env.HOST,
    DB: process.env.DB,
    PASS: process.env.PASS,
    USR: process.env.USS,
    PORT_DB:process.env.PORT_DB

};