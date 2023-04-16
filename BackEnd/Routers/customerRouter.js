const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const customerModel = require('../Models/customerModel')

// http://localhost:3000/customers
router.get('/', async (req, res) => {
    try {
        const customers = await customerModel.find({});

        res.status(200).send(customers);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// http://localhost:3000/customers/addCustomer
router.post('/addCustomer', async (req, res) => {
    try {
        const valRes = customerModel.validatePost(req.body);
        if (valRes.error)
            return res.status(400).send(valRes.error);

        const customer = new customerModel(req.body);
        await customer.save();

        res.status(201).send()
    } catch (err) {
        res.status(500).send(err.message);
    }
})




module.exports = router;