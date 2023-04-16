const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../Models/userModel')

// http://localhost:3000/login
router.post('/', async (req, res) => {

    try {
        let { email, password } = req.body;
        // 1**. Validate the request with the JOI model
        const valRes = UserModel.validatePost(req.body); // synchronized method for running validations
        if (valRes.error)
            return res.status(400).send(valRes.error);

        // 2**. Create a Mongoose Model based on the JOI Model

        const user = await UserModel.findOne({ email: email });
        if (await bcrypt.compare(password, user.password.toString())) {
            res.json({ token: jwt.sign({ id: user.id, email: email }, process.env.SECRET, { expiresIn: '45m' }) });
        }

        //Create a new user
        // req.body.password = await bcrypt.hash(req.body.password, 10)
        // const user = new UserModel(req.body);
        // await user.save();
        else
            res.status(401).send('Unauthorized');
    } catch (err) {
        res.status(500).send(err.message);
    }
})



module.exports = router;