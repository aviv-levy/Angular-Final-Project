const port = 3000;

require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors())

const loginRouter = require('./Routers/loginRouter.js')
const getDetailsRouter = require('./Routers/getDetailsRouter.js')
const customerRouter = require('./Routers/customerRouter.js')

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
app.use('/getDetails', getDetailsRouter)

app.listen(port, () => {
    console.log('Server is running...');
})
