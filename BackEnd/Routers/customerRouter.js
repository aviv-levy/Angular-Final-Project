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

// http://localhost:3000/customers/getCustomerDetails/:id
router.get('/getCustomerDetails/:id', async (req, res) => {
    try {
        const CustomerId = req.params.id;
        const customer = await customerModel.findOne({ _id: CustomerId });
        res.status(200).send(customer);
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

// http://localhost:3000/customers/editCustomer/:id
router.put('/editCustomer/:id', async (req, res) => {
    try {
        const CustomerId = req.params.id;
        const valRes = customerModel.validatePost(req.body);
        if (valRes.error)
            return res.status(400).send(valRes.error);

        await customerModel.updateOne({ _id: CustomerId }, req.body);
        res.status(200).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
})


// http://localhost:3000/customers/deleteCustomer/:email
router.delete('/deleteCustomer/:email', async (req, res) => {
    try {
        const customerEmail = req.params.email;
        await customerModel.deleteOne({ email: customerEmail });
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
})


module.exports = router;