var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var replySchema = new Schema({
    roomNum: Number,
    text: String    
});

module.exports = mongoose.model('reply', replySchema);