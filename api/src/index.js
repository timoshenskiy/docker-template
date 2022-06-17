const express = require('express')
const { connectDb } = require('./helpers/db')
const { port, host, db } = require('./configuration')
const app = express();
const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    name: String
})

const Post = mongoose.model('Post', postSchema);

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port: ${port}`);
        console.log(`Started api service on host: ${host}`);
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

// запускаем сервер после коннекта к MongoDb
connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer)
