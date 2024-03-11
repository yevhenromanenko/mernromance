const {Schema,  model} = require('mongoose');

const sentInvitesSchema = new Schema({
    id: {type: String},
    date: { type: Date, required: true },
    count: { type: Number, default: 0 }
});

const SentInvites = model('sentInvitesSchema', sentInvitesSchema);

module.exports = SentInvites;



