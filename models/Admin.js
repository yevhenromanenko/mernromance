const {Schema,  model} = require('mongoose');

const AdminSchema = new Schema({
    login: {type: String, required: true, unique: true},
    pass: {type: String, required: true},
})

const Admin = model('AdminSchema', AdminSchema);

module.exports = Admin;
