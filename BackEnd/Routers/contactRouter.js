const express = require("express");
const router = express.Router();
const verifyToken = require('../verifyToken')
const contactModel = require('../Models/contactModel')

// http://localhost:3000/contacts
router.get('/', verifyToken, async (req, res) => {
    try {
        const contacts = await contactModel.find({});

        res.status(200).send(contacts);
    } catch (err) {
        res.status(500).send(err.message);
    }
})


// http://localhost:3000/customers/addCustomer
router.post('/addcontact', async (req, res) => {
    try {
        const valRes = contactModel.validatePost(req.body);
        if (valRes.error)
            return res.status(400).send(valRes.error);

        const contact = new contactModel(req.body);
        await contact.save();

        res.status(201).send()
    } catch (err) {
        res.status(500).send(err.message);
    }
})


module.exports = router;