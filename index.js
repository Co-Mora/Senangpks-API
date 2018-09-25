const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const epxress = require('express');
const app = epxress();
const helmet = require('helmet');
const quotes = require('./routes/quotes');

const registerPolicies = require('./routes/policyManagement/policyRegisters');
const makeClaims = require('./routes/makeClaims');
const policyLogins = require('./routes/policyManagement/policyLogins');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/senangpks')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(helmet());
app.use(epxress.json());
app.use(epxress.urlencoded({extended: true}));
app.use('/api/v1/quotes', quotes);
app.use('/api/v1/registerPolicy', registerPolicies);
app.use('/api/v1/makeClaim', makeClaims);
app.use('/api/v1/loginPolicy', policyLogins);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server running on port ${port}....`);
});