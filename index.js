const express = require('express');
const bodyParser = require('body-parser')

const app = express()
const port = 3000;

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


const homeRoute = require('./routes/homeRoute');
app.use(homeRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});