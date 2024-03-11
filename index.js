
const express = require('express');
const mongoose = require('mongoose');

const app = express()
const PORT = process.env.PORT || 8081;

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/romanceapp', require('./routes/auth.routes'));

const PARAMS = `mongodb+srv://romanchernukha494:sezofu44@clusterromance.qwgbeck.mongodb.net/romance`

async function start(){

    try {

        await mongoose.connect(PARAMS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.once('open', () => {
            console.log('MongoDB is running');
        });

        app.listen(PORT, () => {
            console.log(`index - PORT: ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start();

