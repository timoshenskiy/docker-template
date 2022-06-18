const express = require('express')
const axios = require('axios')
const { connectDb } = require('./helpers/db')
const { port, db, apiUrl } = require('./configuration')
const app = express();

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started auth service on port: ${port}`);
        console.log(`Our database: ${db}`);
    })
}
app.get('/test', (req, res) => {
    res.send('Our auth server is working correctly')
});

app.get('/testwithapidata', (req, res) => {
    axios.get(apiUrl + '/testapidata')
        .then(response => {
            res.json({
                testapidata: response.data.testwithapi
            })
        })
        .catch(err => console.log(err))
});

app.get('/api/currentUser', (req, res) => {
    res.json({
        id: '123',
        email: 'foo@gmail.com'
    })
});

// запускаем сервер после коннекта к MongoDb
connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer)
