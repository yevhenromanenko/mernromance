const {Schema,  model} = require('mongoose');

const profitSchema = new Schema({
    id: { type: String },
    today: { type: String },
    month: { type: String },
});

const Profit = model('Profit', profitSchema);

module.exports = Profit;
