const port = 3000;

require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs')
const bcrypt = require('bcrypt')
const cors = require('cors');

app.use(cors())

const CustomerModel = require('./Models/customerModel')
const ContactModel = require('./Models/contactModel')
const UserModel = require('./Models/userModel')

const loginRouter = require('./Routers/loginRouter.js')
const getDetailsRouter = require('./Routers/getDetailsRouter.js')
const customerRouter = require('./Routers/customerRouter.js')
const contactRouter = require('./Routers/contactRouter.js')

app.use(bodyParser.json())

async function main() {
    await mongoose
        .connect(process.env.DATABASE)
        .then(() => {
            console.log("conected to Mongo");
        })
        .catch(() => {
            console.log("something in mongo went wrong");
        });
}

main();



app.use('/login', loginRouter)
app.use('/customers', customerRouter)
app.use('/contacts', contactRouter)
app.use('/getDetails', getDetailsRouter)

// http://localhost:3000/initilaize
app.get('/initilaize', async (req, res) => {
    try {
        let myData = JSON.parse(fs.readFileSync("./initalizeData.json").toString());

        // Insert users
        myData.users.forEach(async (user) => {
            user.password = await bcrypt.hash(user.password, 10)
            const newUser = new UserModel(user);
            await newUser.save();
        });

        // Insert customers
        myData.customers.forEach(async (customer) => {
            const newCustomer = new CustomerModel(customer);
            await newCustomer.save();
        });
        
        // Insert contacts
        myData.contacts.forEach(async (contact) => {
            const newContact = new ContactModel(contact);
            await newContact.save();
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
})

app.listen(port, () => {
    console.log('Server is running...');
})
