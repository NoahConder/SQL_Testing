/* ./routes/weather.js */
const express = require('express');
const router = express.Router();

// TODO: Implement API Request for weather data. Start with US and expand to global countries eventually.
router.get("/weather", function (req, res) {
    res.render("weather.ejs");

});
module.exports = router;
