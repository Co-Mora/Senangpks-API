const Joi = require('joi');
const mongoose  = require('mongoose');



const Admin = mongoose.model('Admin', new mongoose.Schema({

    adminID: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },

    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 1024
    }

}));




const adminValidation = (admin) => {

    const schema = {
        username: Joi.string().min(2).max(255).required(),
        password: Joi.string().min(8).max(1024).required()
    };

    return Joi.validate(admin, schema);
};


module.exports = {
    Admin,
    adminValidation
};