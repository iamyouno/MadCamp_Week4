var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cobuyReplySchema = new Schema({
    dorm: String,
    name: String,
    member: Number,
    info: String
});

module.exports = mongoose.model('cobuyReply', cobuyReplySchema);