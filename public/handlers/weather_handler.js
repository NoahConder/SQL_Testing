/* ./handlers/weather_handler.js */
const express = require('express');
const axios = require('axios').default;
const router = express.Router();
require('dotenv').config()
const weather_key = process.env.OPENWEATHER_API

router.post("/weather_handle", function (req, res) {
    let lat = req.body.latitude;
    let lon = req.body.longitude;
    console.log(lat)
    console.log(lon)
    const form_box = req.body.location_input_box
    console.log(form_box)

    if (lat != null) {
        fetch_weather_data(lat, lon)
            .then((response) => {
                const weatherData = extract_weather_data(response.data);
                res.render("weather_results.ejs", { weatherData });
            })
            .catch((error) => {
                res.render("error.ejs");
                console.error(error);
            });
    } else if (form_box != null) {
        fetch_geocoding(form_box)
            .then((response) => {
                lat = response.data[0].lat;
                lon = response.data[0].lon;
                fetch_weather_data(lat, lon)
                    .then((response) => {
                        const weatherData = extract_weather_data(response.data);
                        res.render("weather_results.ejs", { weatherData });
                    })
                    .catch((error) => {
                        res.render("error.ejs");
                        console.error(error);
                    });
            })
            .catch((error) => {
                res.render("error.ejs");
                console.log(error);
            });
    }
});

const extract_weather_data = (data) => {
    return {
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        location_name: data.name,
        humidity: data.main.humidity,
        conditions: data.weather[0].main,
        detailed_conditions: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
    };
};

const fetch_geocoding = (form_box) => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${form_box}&limit=5&appid=${weather_key}`;
    return axios.get(url)
}

const fetch_weather_data = (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_key}&units=imperial`;
    return axios.get(url);
};

module.exports = router;
