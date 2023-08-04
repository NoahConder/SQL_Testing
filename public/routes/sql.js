/* ./routes/sql.js */
const express = require('express');
const router = express.Router();

// TODO: Implement the Database solution. Should be SQL/SQLite. (Maybe MongoDB?)
router.get("/sql", function (req, res) {
    res.render("sql.ejs");

});
module.exports = router;
