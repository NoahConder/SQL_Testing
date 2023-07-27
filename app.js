const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


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

app.use((req, res, next) => {
    res.status(404).render(__dirname + "/views/error.ejs",{ error_status: '404', error_res: "You've got lost! This page does not exist." });
});

app.listen(8080);

console.log("http://localhost:8080");
