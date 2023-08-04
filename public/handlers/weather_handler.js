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
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_key}&units=imperial`;

    if (lat != null)
        axios.get(url)
            .then(response => {
                console.log(response.data);
                // Weather Data Variables
                let temp = Math.round(response.data.main.temp)
                let feels_like = Math.round(response.data.main.feels_like)
                let location_name = response.data.name
                let humidity = response.data.main.humidity
                let conditions = response.data.weather[0].main
                let detailed_conditions = response.data.weather[0].description
                detailed_conditions = detailed_conditions.charAt(0).toUpperCase() + detailed_conditions.slice(1);

                console.log(temp + '°')
                console.log(feels_like + '°')
                console.log(location_name)
                console.log(humidity)
                console.log(conditions)
                console.log(detailed_conditions)

                return res.render("weather_results.ejs");

            })
            .catch(error => {
                // Handle any errors that occurred during the API call
                res.render("error.ejs");
                console.error(error);

            });

    else if (form_box != null) {
        const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${form_box}&limit=5&appid=${weather_key}`;
        axios.get(apiUrl)
            .then((response) => {
                console.log(response.data[0].lon)
                console.log(response.data[0].lat)
                let lat = response.data[0].lat;
                let lon = response.data[0].lon;
                let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_key}&units=imperial`;
                axios.get(url)
                    .then(response => {
                        console.log(response.data);
                        // Weather Data Variables
                        let temp = Math.round(response.data.main.temp)
                        let feels_like = Math.round(response.data.main.feels_like)
                        let location_name = response.data.name
                        let humidity = response.data.main.humidity
                        let conditions = response.data.weather[0].main
                        let detailed_conditions = response.data.weather[0].description
                        detailed_conditions = detailed_conditions.charAt(0).toUpperCase() + detailed_conditions.slice(1);

                        console.log(temp + '°')
                        console.log(feels_like + '°')
                        console.log(location_name)
                        console.log(humidity)
                        console.log(conditions)
                        console.log(detailed_conditions)

                        return res.render("weather_results.ejs");

                    })
                    .catch(error => {
                        // Handle any errors that occurred during the API call
                        res.render("error.ejs");
                        console.error(error);

                    });
            })
            .catch((error) => {
                console.log(error)
            });
    }
});


module.exports = router;
