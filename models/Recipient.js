const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
    email: String,
    responded: {type: Boolean, default: false}
})


module.exports = recipientSchema;