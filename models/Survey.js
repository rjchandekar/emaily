const mongoose = require('mongoose');
const RecipientSchema = require('./Recipient');

const surveySchema = new mongoose.Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    subject: {
        type: String
    },
    recipients: [RecipientSchema],
    yes: {
        type: Number,
        default: 0
    },
    no: {
        type: Number,
        default: 0
    },
    _user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
    },
    dateSent: Date,
    lastResponde: Date
})

mongoose.model('Survey', surveySchema);