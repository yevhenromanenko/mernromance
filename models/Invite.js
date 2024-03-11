const {Schema,  model} = require('mongoose');

const InvitesSchema = new Schema({
    text: String,
    id: String,
    ladyId: {type: String},
});

const Invite = model('Invite', InvitesSchema);

module.exports = Invite;


