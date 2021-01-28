var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rchangeSchema = new Schema({
    roomNum: Number,
    select: Array
});

module.exports = mongoose.model('rchange', rchangeSchema);