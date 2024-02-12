/* ./routes/sip_call.js */
const express = require('express');
const router = express.Router();

// TODO: Implement API request for pulling call logs from SW API.
//  Ideally I'd want to pull the following data: Price, Status, Callee, Called, Date & Time

router.get("/sip_call", function (req, res) {
    res.render("sip_call.ejs");

});
module.exports = router;
