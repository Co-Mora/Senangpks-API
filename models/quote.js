const mongoose = require('mongoose');
const Joi = require('joi');

const quoteSchema = new mongoose.Schema({
    
    companyID: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    industryName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    businessType: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    specifyIndustry: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    companyNumber: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 50
    },
    phoneNo: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 20,
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
    typeOfBusiness: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255,
    },
    postalCode: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 20,
    },
    building: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255,
    },
    machineryEquipments: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255,
    },
    furnitureFittings: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255,
    },
    miscellanous: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255,
    },
    additionalCoverage: [{
        indBuss : String,
        price: String,
    }],
    basicPremium: {
        type: String,
        trim: true,
        required: true
    },
    grandTotalAmount: {
        type: String,
        required: true,
        trim: true
    }  

});


const Quote = mongoose.model('Quote', quoteSchema);

const quoteValidation = (quote) => {

    const schema = {
        industryName: Joi.string().min(2).max(255).required(),
        businessType: Joi.string().min(2).max(255).required(),
        specifyIndustry: Joi.string().min(2).max(255).required(),
        companyName:  Joi.string().min(2).max(255).required(),
        companyNumber:  Joi.string().min(2).max(255).required(),
        email:  Joi.string().min(8).max(50).email().required(),
        phoneNo:  Joi.string().min(10).max(20).required(),
        address:  Joi.string().min(5).max(255).required(),
        typeOfBusiness:  Joi.string().min(2).max(255).required(),
        postalCode:  Joi.string().min(2).max(255).required(),
        building:  Joi.string().min(2).max(255).required(),
        machineryEquipments:  Joi.string().min(2).max(255).required(),
        furnitureFittings:  Joi.string().min(2).max(255).required(),
        miscellanous:  Joi.string().min(2).max(255).required(),
        additionalCoverage: Joi.array().required(),
        basicPremium:  Joi.string().min(2).max(255).required(),
        grandTotalAmount:  Joi.string().min(2).max(255).required(),

    }

    return Joi.validate(quote, schema);

}


module.exports = {
    Quote,
    quoteValidation,
    quoteSchema
}