//Imports
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const geocodingHandler = require('./public/handlers/geocoding_handler');
const phoneHandler = require('./public/handlers/phone_handler');
const weatherHandler = require('./public/handlers/weather_handler');
const index = require('./public/routes/index');
const sql = require('./public/routes/sql');
const weather = require('./public/routes/weather');
const calls = require('./public/routes/calls');

const app = express();

function configureExpress() {
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
}

function installRoutes() {
    app.use('/', index);
    app.use('/', calls);
    app.use('/', sql);
    app.use('/', weather);
    app.use('/', weatherHandler);
    app.use('/', phoneHandler);
    app.use('/', geocodingHandler);

    app.use((req, res, next) => {
        res.status(404).render("error.ejs", {
            error_status: '404',
            error_res: "You've gotten lost! This page does not exist."
        });
    });

    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).render("error.ejs", {
            error_status: '500',
            error_res: "Something went wrong. Please try again later."
        });
    });
}

function startServer() {
    app.listen(8080, "0.0.0.0");
    console.log("http://127.0.0.1:8080");
}

configureExpress();
installRoutes();
startServer();
