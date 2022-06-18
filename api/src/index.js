const express = require('express')
const { connectDb } = require('./helpers/db')
const { port, db, authApiUrl } = require('./configuration')
const app = express();
const mongoose = require("mongoose")
const axios = require("axios")

const postSchema = new mongoose.Schema({
    name: String
})

const Post = mongoose.model('Post', postSchema);

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port: ${port}`);
        console.log(`Our database: ${db}`);

        const silence = new Post({ name: "Silence"})

        silence.save((err, savedSilence)=>{
            if (err) return console.error(err);
            console.log("saved silence with volumes", savedSilence);
        })
    })
}

app.get('/test', (req, res) => {
    res.send('Our api server is working correctly')
});

app.get('/api/testapidata', (req, res) => {
    res.json({
        testwithapi: true
    })
});

app.get('/testwithcurrentuser', (req, res) => {
    axios.get(authApiUrl + '/currentUser')
        .then(response => {
        res.json({
            testwithcurrentuser: true,
            currentUserFromAuth: response.data
        })
        .catch(err => console.log(err))
    })
});

// запускаем сервер после коннекта к MongoDb
connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer)
