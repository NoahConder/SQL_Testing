const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const db = require("./public/javascripts/database")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router();

// Import routes
const geocoding_handler = require('./public/handlers/geocoding_handler')
const phone_handler = require('./public/handlers/phone_handler')
const weather_handler = require('./public/handlers/weather_handler')
const index = require('./public/routes/index')
const sql = require('./public/routes/sql')
const weather = require('./public/routes/weather')
const phone_lookup = require('./public/routes/phone_logger')

app.use('/', index);

app.use('/', sql);

app.use('/', phone_lookup);

app.use('/', weather);

app.use('/', weather_handler);

app.use('/', phone_handler);

app.use('/', geocoding_handler);

// Route for handling 404 errors
app.use((req, res, next) => {
    res.status(404).render("error.ejs", {
        error_status: '404',
        error_res: "You've gotten lost! This page does not exist."
    });
});

// Route for handling 500 errors
app.use((err, req, res, next) => {
    console.error(err); // Log the error for debugging purposes
    res.status(500).render("error.ejs", {
        error_status: '500',
        error_res: "Something went wrong. Please try again later."
    });
});

app.listen(8080, host="0.0.0.0");

console.log("http://127.0.0.1:8080");
