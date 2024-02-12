/* ./routes/sip_call.js */
const express = require('express');
const router = express.Router();

router.get("/verto_call", function (req, res) {
    res.render("verto_call.ejs");
});
module.exports = router;
