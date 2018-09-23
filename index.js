const epxress = require('express');
const app = epxress();
const quotes = require('./routes/quotes');
const registerPolicies = require('./routes/policyRegisters');

const debug = require('debug')('app:startup')


app.use('/api/v1/quotes', quotes);
app.use('/api/v1/registerPolicy', registerPolicies)




const port = process.env.PORT || 3000;

app.listen(port, () => {
    debug(`server running on port ${port}....`);
})