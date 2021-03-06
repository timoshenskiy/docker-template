const mongoose = require("mongoose")
const { db } = require('../configuration')

// коннект к базе данных mongoDb
module.exports.connectDb = () => {
    mongoose.connect(db, { useNewUrlParser: true });

    return mongoose.connection;
}
