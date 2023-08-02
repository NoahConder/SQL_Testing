/* ./routes/phone_logger.js */
const express = require('express');
const router = express.Router();

// TODO: Implement API request for pulling call logs from SW API.
//  Ideally I'd want to pull the following data: Price, Status, Callee, Called, Date & Time

router.get("/phone_logger", function (req, res) {
    res.render("phone_logger.ejs");

});
module.exports = router;
