const {Schema,  model} = require('mongoose');

const UserSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

const User = model('UserSchema', UserSchema);

module.exports = User;
