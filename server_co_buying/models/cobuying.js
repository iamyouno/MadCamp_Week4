var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cobuyingSchema = new Schema({
    dorm: String,
    name: String,
    member: Number,
    info: String,
    reply: Array
});

module.exports = mongoose.model('cobuying', cobuyingSchema);