const {Schema,  model} = require('mongoose');

const UserSchemaMassLetter = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    ladyId: { type: String }
})

const UsersMassLetter = model('UserSchemaMassLetter', UserSchemaMassLetter);

module.exports = UsersMassLetter;
