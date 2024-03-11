const {Schema,  model} = require('mongoose');

const InvitesPersonalSchema = new Schema({
    text: String,
    id: String,
    ladyId: {type: String},
    smile: { type: Boolean }
});

const InvitePersonal = model('InvitesPersonalSchema', InvitesPersonalSchema);

module.exports = InvitePersonal;


