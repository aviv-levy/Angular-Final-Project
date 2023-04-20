const mongoose = require("mongoose");
const JOI = require("joi");

const CustomerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: {
        type: String,
        unique: true,
    },
    address: {
        type: String,
        default: ''
    }
})

// JOI Validations
const baselineValidation = {
    firstName: JOI.string().required().min(3).pattern(new RegExp("^[a-zA-Z]+$")),
    lastName: JOI.string().required().min(2).pattern(new RegExp("^[a-zA-Z]+$")),
    phone: JOI.string().required().pattern(new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")),
    email: JOI.string().required().email(),
    address: JOI.string()
};

// Post Validation
CustomerSchema.statics.validatePost = (obj) => {
    return JOI.object({
        ...baselineValidation,
        id: JOI.string().forbidden()
    }).validate(obj, { abortEarly: false });
}


const customerModel = mongoose.model("customerModel", CustomerSchema, "customer");

customerModel.createIndexes();

module.exports = customerModel;
