const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

// http://localhost:3000/getDetails/getEmail/:token 
router.get('/getEmail/:token', (req, res) => {
    try {
        const token = req.params.token;
        jwt.verify(token, process.env.SECRET, (err, payload) => {
            if (err && err.message === "jwt expired") {
                return res.status(403).send("Your session has expired.");
            }

            if (err) {
                return res.status(401).send("You are not authorized to access this resource.");
            }
            return res.status(200).json({ email: payload.email })
        })
    } catch (err) {
        res.status(500).send(err.message);
    }
})

module.exports = router;