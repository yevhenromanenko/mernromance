const {Schema,  model} = require('mongoose');

const sentLettersSchema = new Schema({
    id: {type: String},
    date: { type: Date, required: true },
    count: { type: Number, default: 0 }
});

const SentLetters = model('sentLettersSchema', sentLettersSchema);

module.exports = SentLetters;



