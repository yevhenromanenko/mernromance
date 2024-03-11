const {Schema,  model} = require('mongoose');

const templatesSchema = new Schema({
    ladyId: String,
    subject: String,
    content: String,
});

const Templates = model('templatesSchema', templatesSchema);

module.exports = Templates;


