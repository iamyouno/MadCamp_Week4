var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rchangeSchema = new Schema({
    roomNum: Number,
    select: Array
    //user Id 도 받기로
});

module.exports = mongoose.model('rchange', rchangeSchema);