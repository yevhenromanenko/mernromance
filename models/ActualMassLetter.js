const {Schema,  model} = require('mongoose');

const ActualMassLetterSchema = new Schema({
    id: String,
    date: Date,
})

const ActualMassLetter = model('ActualMassLetterSchema', ActualMassLetterSchema);

module.exports = ActualMassLetter;
