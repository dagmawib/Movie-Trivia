const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const app = express()
const port = 3000;
dotenv.config();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Failed to connect to MongoDB", err);
});


const homeRoute = require('./routes/homeRoute');
app.use(homeRoute);

const gameRoute = require('./routes/gameRoute');
app.use(gameRoute);

const userScore = require('./routes/UserScore');
app.use(userScore);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});