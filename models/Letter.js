const {Schema,  model} = require('mongoose');

const letterSchema = new Schema({
    ladyId: String,
    subject: String,
    content: String,
    photoId: String,
});

const Letter = model('Letter', letterSchema);

module.exports = Letter;


