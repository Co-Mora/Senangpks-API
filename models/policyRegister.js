const mongoose = require('mongoose');
const Joi = require('joi');


const PolicyRegister = mongoose.model('PolicyRegister', new mongoose.Schema({
    registerID: {
        type: mongoose.Types.ObjectId()
    },
    companyName: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    phoneNo: {
        type: String,
        trim: true,
        required: true,
        minlength: 10,
        minlength: 20
    }
}));

const registerValidation = (register) => {

    const schema = {
        companyName: Joi.string().min(2).max(255).required(),
        phoneNo: Joi.string().min(10).max(20).required()
    }

    return Joi.validate(register, schema);

}


module.exports = {
    PolicyRegister,
    registerValidation
}