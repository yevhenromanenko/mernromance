const {Schema,  model} = require('mongoose');

const sentGlobalLettersSchema = new Schema({
    id: {type: String},
    date: { type: Date, required: true },
    count: { type: Number, default: 0 }
});

const SentGlobalLetters = model('sentGlobalLettersSchema', sentGlobalLettersSchema);

module.exports = SentGlobalLetters;



