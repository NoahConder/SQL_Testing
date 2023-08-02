/* ./handlers/weather_handler.js */
const express = require('express');
const axios = require('axios').default;
const router = express.Router();
require('dotenv').config()
const weather_key = process.env.OPENWEATHER_API


router.post("/weather_handle", function (req, res) {
    const lat = req.body.latitude;
    const lon = req.body.longitude;
    console.log(lat)
    console.log(lon)
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_key}&units=imperial`;

    if (lat != null)
        axios.get(url)
            .then(response => {
                // Handle the API response data here
                console.log(response.data);
                let results = response.data.main.temp
                console.log(results)
                res.render("sql.ejs");

            })
            .catch(error => {
                // Handle any errors that occurred during the API call
                console.error(error);

            });
});


module.exports = router;
