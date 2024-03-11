const {Schema,  model} = require('mongoose');

const globalLetterSchema = new Schema({
    ladyId: String,
    subject: String,
    content: String,
    photoId: String,
});

const GlobalLetter = model('globalLetterSchema', globalLetterSchema);

module.exports = GlobalLetter;


