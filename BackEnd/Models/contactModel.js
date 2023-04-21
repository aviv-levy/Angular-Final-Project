const mongoose = require("mongoose");
const JOI = require("joi");

const ContactSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    birthday: String,
    phones: [String],
})

// JOI Validations
const baselineValidation = {
    name: JOI.string().required().min(3).pattern(new RegExp("^[a-zA-Z ]+$")),
    email: JOI.string().required().email(),
    birthday: JOI.string().required().pattern(new RegExp(/^(\d{2})\/(\d{2})\/(\d{4})$/)),
    phones: JOI.array().items(JOI.string().required().pattern(new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"))),
};

// Post Validation
ContactSchema.statics.validatePost = (obj) => {
    return JOI.object({
        ...baselineValidation,
        id: JOI.string().forbidden()
    }).validate(obj, { abortEarly: false });
}


const contactModel = mongoose.model("contactModel", ContactSchema, "contact");

contactModel.createIndexes();

module.exports = contactModel;
