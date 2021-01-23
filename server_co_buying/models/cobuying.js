var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cobuyingSchema = new Schema({
    dorm: String,
    name: String,
    member: Number,
    info: String
});

module.exports = mongoose.model('cobuying', cobuyingSchema);