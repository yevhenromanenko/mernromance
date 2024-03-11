const {Schema,  model} = require('mongoose');

const UsersSchemaSpamLetter = new Schema({
    id: String,
    ladyId: String,
    date: Date,
})

const UsersSpamLetter = model('UsersSchemaSpamLetter', UsersSchemaSpamLetter);

module.exports = UsersSpamLetter;
