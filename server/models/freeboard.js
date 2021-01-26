var mongoose = require('mongoose')
var Schema = mongoose.Schema
var freeboardSchema = new Schema({
    // uid: String,
    userid: String,
    anonymous: Boolean,
    title: String,
    content:String,
    comment: {type: [{userid: String, anonymous: Boolean, commentcontent: String}], default: []}
});
module.exports = mongoose.model('freeboard', freeboardSchema); // when call module by require, this function is executed.