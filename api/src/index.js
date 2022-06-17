const express = require('express')
const { connectDb } = require('./helpers/db')
const { port, host, db } = require('./configuration')
const app = express();

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port: ${port}`);
        console.log(`Started api service on host: ${host}`);
        console.log(`Our database: ${db}`);
    })
}

app.get('/test', (req, res) => {
    res.send('Our api server is working correctly')
});

// запускаем сервер после коннекта к MongoDb
connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer)
