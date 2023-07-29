const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const axios = require('axios').default;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// TODO: Possibly implement a registration system? This system would save SignalWire API information
//  and OpenWeather API key rather than manually entering it each time when testing.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router();

app.use('/', router);

router.get("/", function (req, res) {
  res.render(__dirname + "/views/index.ejs");

});
// TODO: Implement the Database solution. Should be SQL/SQLite. (Maybe MongoDB?)
router.get("/sql", function (req, res) {
    res.render(__dirname + "/views/sql.ejs");

});

// TODO: Implement API request for pulling call logs from SW API.
//  Ideally I'd want to pull the following data: Price, Status, Callee, Called, Date & Time

router.get("/phone_logger", function (req, res) {
    res.render(__dirname + "/views/phone_logger.ejs");

});
// TODO: Implement API Request for weather data. Start with US and expand to global countries eventually.
router.get("/weather_lookup", function (req, res) {
    res.render(__dirname + "/views/weather_lookup.ejs");

});
router.get("/weather_handle", function (req, res) {

});
// TODO: Add proper error handling. Currently only displays 404 errors. Should also return 500 errors if necessary.
app.use((req, res, next) => {
    res.status(404).render(__dirname + "/views/error.ejs",{ error_status: '404', error_res: "You've gotten lost! This page does not exist." });
});

app.listen(8080);

console.log("http://localhost:8080");
