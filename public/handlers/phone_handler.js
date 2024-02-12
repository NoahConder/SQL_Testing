/* ./handlers/phone_handler.js */
const express = require('express');
const router = express.Router();
const axios = require('axios');
const space = process.env.SIGNALWIRE_SPACE
const api_key = process.env.SIGNALWIRE_API
const project = process.env.SIGNALWIRE_PROJECT

const combined = `${project}:${api_key}`;
const base64Result = Buffer.from(combined).toString('base64');
router.post("/phone_handler", function (req, res) {

    const resource = req.body.verto_resource_box; // Get the user's resource name for their verto endpoint.

    axios({
        method: 'post',
        url: `https://${space}/api/relay/rest/jwt?resource=${resource}`,
        headers: {
            'resource': `${resource}`,
            'Authorization': `Basic ${base64Result}`
        },
        data: {
            resource: `${resource}`
        }
    })
        .then(response => {
            console.log(response.data.jwt_token);
            const data = response.data;
            res.json(data.jwt_token); // Send the token to the client.
        })
        .catch(error => {
            console.error(error);
        });
});

module.exports = router;
